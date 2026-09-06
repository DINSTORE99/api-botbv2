// =========================
// SWITCH COMMAND / CASE HANDLER
// =========================
const fs = require("fs");

module.exports = async (sock, m) => {
    try {
        const body = m.message?.conversation || m.message?.extendedTextMessage?.text || m.message?.imageMessage?.caption || "";
        const budy = typeof body === "string" ? body : "";
        const prefix = /^[°•π÷×¶∆£¢€¥®™+=|~<>#/$%.,^&?!@]/.test(budy) ? budy.match(/^[°•π÷×¶∆£¢€¥®™+=|~<>#/$%.,^&?!@]/)[0] : "";
        const isCmd = budy.startsWith(prefix);
        const command = isCmd ? budy.slice(prefix.length).trim().split(" ")[0].toLowerCase() : "";
        const args = budy.trim().split(/ +/).slice(1);
        const sender = m.key.remoteJid;

        if (!isCmd) return;

        console.log(`[CMD] ${command} dari ${sender}`);

        switch (command) {
            case "menu":
            case "help": {
                let thumbnailBuffer = null;
                try {
                    const thumbData = JSON.parse(fs.readFileSync("./collection/thumbnail.json"));
                    thumbnailBuffer = Buffer.from(thumbData.image || thumbData, "base64");
                } catch (e) {
                    thumbnailBuffer = null; 
                }

                let start = Date.now();
                let uptime = typeof runtime === 'function' ? runtime(process.uptime()) : `${Math.floor(process.uptime() / 60)} menit`;
                let time = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
                let ping = Date.now() - start;

                let ucapanWaktu = typeof global.ucapan === 'function' ? global.ucapan() : "Halo 👋";
                let botMode = typeof mode !== 'undefined' ? mode : "Public";

                let teks = `┏━━━〔 🤖 *WHATSAPP ASISTEN* 〕━━━┓
┃ 👤 User    : @${sender.split("@")[0]}
┃ ☀️ ${ucapanWaktu}
┃ 🤖 Mode    : ${botMode}
┃ 🕒 Time    : ${time}
┃ ⏱️ Uptime  : ${uptime}
┃ 📶 Ping    : ${ping} ms
┗━━━━━━━━━━━━━━━━━━━━━━┛

╭──〔 👤 MAIN MENU 〕
│ ❖ .menu
│ ❖ .config
╰─────────────

╭──〔 📥 DOWNLOADER 〕
│ ❖ .tt
│ ❖ .ig
│ ❖ .play
│ ❖ .capcut
│ ❖ .fb
╰─────────────

╭──〔 🔍 SEARCH & STALK 〕
│ ❖ .am
│ ❖ .pinterest
╰─────────────

╭──〔 🤖 AI 〕
│ ❖ .ai
│ ❖ .gpt
╰─────────────

╭──〔 🛠️ TOOLS 〕
│ ❖ .rvo
│ ❖ .catbox
│ ❖ .rvbg
│ ❖ .yml
│ ❖ .bratvid
│ ❖ .ssweb
╰─────────────

╭──〔 🌸 RANDOM IMAGE 〕
│ ❖ .waifu
│ ❖ .cecanindo
│ ❖ .cecankorea
│ ❖ .cecanjapan
│ ❖ .cecanchina
│ ❖ .cecanthai
│ ❖ .cecanvietnam
╰─────────────

╭──〔 🔮 PRIMBON 〕
│ ❖ .artinama
│ ❖ .mimpi
│ ❖ .zodiak
│ ❖ .usaha
│ ❖ .jodoh
╰─────────────

╭──〔 📺 ANIME 〕
│ ❖ .animequotes
│ ❖ .ongoing
│ ❖ .schedule
│ ❖ .latest
│ ❖ .detail
╰─────────────

╭──〔 🌐 OTHER 〕
│ ❖ .ceksubdo
╰─────────────

> *© 2026 BOT DIN - DINN STORE*`;

                await sock.sendMessage(sender, {
                    text: teks,
                    mentions: [sender],
                    ...(thumbnailBuffer ? { image: thumbnailBuffer, caption: teks } : {})
                }, { quoted: m });
                break;
            }

            case "ping": {
                await sock.sendMessage(sender, { text: "Pong! Bot Aktif ⚡" }, { quoted: m });
                break;
            }

            default:
                break;
        }
    } catch (err) {
        console.error("CASE ERROR:", err);
    }
};
