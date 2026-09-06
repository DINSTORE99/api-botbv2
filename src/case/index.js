"use strict";
               
// ======================================================
// DINSTORE WHATSAPP BOT - INDEX.JS
// ======================================================

const { server, io } = require("./server");

// ======================================================
// TELEGRAM CONFIG ADMIN
// ======================================================
const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";

function sendAdminTelegram(text) {
    console.log("[DEBUG] Mengirim notifikasi ke Telegram...");
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT,
            text: text,
            parse_mode: "Markdown"
        })
    })
    .then(res => res.json())
    .then(data => console.log("[DEBUG] Respon Telegram:", data))
    .catch(err => console.log("Admin Telegram Error:", err));
}

// ======================================================
// SETTING & LIB
// ======================================================

try {
    require("./setting.js");
} catch (error) {
    console.log("[INFO] setting.js tidak ditemukan, dilewati.");
}

try {
    require("./lib/myfunction.js");
} catch (error) {
    console.log("[INFO] lib/myfunction.js tidak ditemukan, dilewati.");
}

// ======================================================
// BAILEYS & MODULES
// ======================================================
require("./lib/myfunction.js");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
} = require("baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Memanggil message handler dari folder src/case/index.js
const messageHandler = require("./src/case/index.js");

// ======================================================
// MULTI SESSION MAPS & GLOBAL STORAGE
// ======================================================

const sessions = new Map();
const pairingCodes = new Map();
const botStatus = new Map();

global.sessions = sessions;
global.pairingCodes = pairingCodes;
global.botStatus = botStatus;

global.groupMetadataCache = global.groupMetadataCache || new Map();

// ======================================================
// SESSION FOLDER
// ======================================================

const sessionsFolder = path.join(process.cwd(), "sessions");
if (!fs.existsSync(sessionsFolder)) {
    fs.mkdirSync(sessionsFolder, { recursive: true });
}

// ======================================================
// NORMALIZE NUMBER
// ======================================================

function normalizeNumber(number) {
    let value = String(number || "").replace(/\D/g, "");
    if (value.startsWith("0")) {
        value = "62" + value.substring(1);
    }
    if (value.startsWith("8")) {
        value = "62" + value;
    }
    return value;
}

// ======================================================
// EMIT STATUS & PAIRING
// ======================================================

function emitBotStatus(sessionId, connected, number = null, name = null) {
    io.emit("bot-status", { sessionId, connected: connected === true, number, name });
}

function emitPairingCode(sessionId, number, code) {
    io.emit("pairing-code", { sessionId, number, code });
}

// ======================================================
// START BOT FUNCTION
// ======================================================

async function startBot(sessionId, phoneNumber = null) {
    try {
        sessionId = String(sessionId);
        if (phoneNumber) {
            phoneNumber = normalizeNumber(phoneNumber);
        }

        console.log(chalk.cyan(`\n[START BOT] Session: ${sessionId}`));
        console.log(chalk.cyan(`Number: ${phoneNumber || "-"}`));

        if (sessions.has(sessionId)) {
            const existingSock = sessions.get(sessionId);
            if (existingSock) {
                console.log(chalk.yellow(`Session ${sessionId} sudah aktif.`));
                return existingSock;
            }
        }

        const sessionPath = path.join(sessionsFolder, sessionId);
        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }

        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

        botStatus.set(sessionId, { connected: false, number: phoneNumber, name: null });
        emitBotStatus(sessionId, false, phoneNumber, null);

        let version;
        try {
            const result = await fetchLatestBaileysVersion();
            version = result.version;
        } catch (error) {
            console.log(chalk.yellow("Gagal mengambil versi Baileys terbaru."));
        }

        const store = makeInMemoryStore({
            logger: pino({ level: "silent" })
        });

        const sock = makeWASocket({
            version,
            auth: state,
            logger: pino({ level: "silent" }),
            printQRInTerminal: false,
            generateHighQualityLinkPreview: true,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            getMessage: async (key) => {
                try {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg?.message || undefined;
                } catch (error) {
                    return undefined;
                }
            }
        });

        sessions.set(sessionId, sock);

        if (store && typeof store.bind === "function") {
            store.bind(sock.ev);
        }

        sock.ev.on("creds.update", saveCreds);

        // ==================================================
        // CONNECTION UPDATE & TELEGRAM NOTIFIKASI
        // ==================================================

        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === "open") {
                const activeNumber = phoneNumber || sessionId;
                console.log(chalk.green(`[CONNECTED] Session ${sessionId} terhubung dengan nomor: ${activeNumber}`));

                botStatus.set(sessionId, {
                    connected: true,
                    number: activeNumber,
                    name: sock.user?.name || null
                });

                emitBotStatus(sessionId, true, activeNumber, sock.user?.name || null);

                sendAdminTelegram(`🚨 *DIN BOT NOTIF*\n\n🎉 WhatsApp Berhasil *TERHUBUNG*!\n📱 Nomor/Session: \`+${activeNumber}\``);
            }

            if (connection === "close") {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

                console.log(chalk.yellow(`[DISCONNECTED] Session ${sessionId} terputus.`));

                botStatus.set(sessionId, {
                    connected: false,
                    number: phoneNumber,
                    name: null
                });

                emitBotStatus(sessionId, false, phoneNumber, null);

                if (!shouldReconnect) {
                    sendAdminTelegram(`⚠️ *DIN BOT NOTIF*\n\n❌ Sesi WhatsApp terputus / *LOGOUT*!\n📱 Nomor/Session: \`+${phoneNumber || sessionId}\``);
                }
            }
        });

        // ======================================================
        // MESSAGE HANDLER (Menghubungkan ke src/case/index.js)
        // ======================================================
               
        sock.ev.on("messages.upsert", async ({ messages, type }) => {
            try {
                if (type !== "notify") return;

                for (const msg of messages) {
                    if (!msg || !msg.message) continue;
                    const jid = msg.key.remoteJid;
                    if (jid === "status@broadcast") continue;

                    // Jalankan penanganan pesan dari handler terpisah
                    await messageHandler(sock, msg);
                }
            } catch (error) {
                console.error("MESSAGE HANDLER ERROR:", error);
            }
        });          
            
        // ==================================================
        // PAIRING CODE HANDLING
        // ==================================================

        if (!state.creds.registered) {
            if (!phoneNumber) {
                console.log(chalk.red("Nomor WhatsApp tidak tersedia."));
            } else {
                console.log(chalk.white("• Script By DINSTORE"));
                console.log(chalk.white("• Pembuat t.me/DINN_STORE"));
                console.log(chalk.white(`• Meminta Code Pair untuk ${phoneNumber}`));

                setTimeout(async () => {
                    try {
                        if (sock.user) {
                            console.log(chalk.yellow("Bot sudah terhubung."));
                            return;
                        }

                        const code = await sock.requestPairingCode(phoneNumber.trim(), "DINSTORE");
                        pairingCodes.set(sessionId, code);

                        console.log(chalk.green(`• Kode Pairing [${sessionId}]: ${code}`));
                        emitPairingCode(sessionId, phoneNumber, code);
                        console.log(chalk.green("• Pairing code dikirim ke website."));
                    } catch (error) {
                        console.error("Gagal request pairing code:", error);
                    }
                }, 3000);
            }
        }

        return sock;

    } catch (error) {
        console.error("START BOT ERROR:", error);
        return null;
    }
}

module.exports = {
    startBot
};
