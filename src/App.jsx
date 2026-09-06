import { useEffect, useState } from "react";
import "./style.css";
import Docs from "./doc/Docs";
const API = "";

const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";

function sendOpenNotif() {
  const info = getBrowserInfo();
  const message = `
🌐 WEBSITE DIKUNJUNGI
📱 Device: ${info.device}
🌍 Browser: ${info.browser}
⏰ Waktu: ${new Date().toLocaleString()}
🔗 URL: ${window.location.href}
  `;
  
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT, text: message })
    }).catch(err => console.log("Telegram ERROR:", err));
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : "Safari";
  let device = ua.includes("Android") ? "Android" : ua.includes("iPhone") ? "iPhone" : "PC/Desktop";
  return { browser, device };
}

window.addEventListener("load", () => {
  sendOpenNotif();
});

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (window.location.pathname === "/doc") {
    return <Docs />;
  }

  const [page, setPage] = useState("dashboard");
  const [serverOnline, setServerOnline] = useState(true);
  const [botConnected, setBotConnected] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [pairingLoading, setPairingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const loadStatus = async () => {
    setLoading(true);
    setTimeout(() => {
      setServerOnline(true);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const startPairing = async () => {
    if (!phoneNumber.trim()) {
      showMessage("Masukkan nomor WhatsApp terlebih dahulu.");
      return;
    }
    setPairingLoading(true);
    setTimeout(() => {
      setPairingCode("DIN-" + Math.floor(100000 + Math.random() * 900000));
      setPairingLoading(false);
      showMessage("Kode pairing berhasil dibuat!");
    }, 1500);
  };

  const copyPairingCode = async () => {
    if (!pairingCode) return;
    await navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    showMessage("Kode berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="app-layout">
      {/* BACKGROUND GRID & GLOW EFFECT */}
      <div className="tech-grid-bg"></div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {showSplash && (
        <div className="splash-screen">
          <div className="splash-content">
            <div className="splash-logo">⚡</div>
            <h2>DIN STORE PANEL</h2>
            <p>Memuat sistem server berkecepatan tinggi...</p>
            <div className="splash-loader"></div>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="cyber-sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">⚡</span>
          <h3>PteroPanel</h3>
        </div>
        <div className="sidebar-menu">
          <button 
            className={page === "dashboard" ? "active" : ""} 
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>
          <button 
            className={page === "pairing" ? "active" : ""} 
            onClick={() => setPage("pairing")}
          >
            🔗 Pairing Server
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="cyber-main">
        {message && <div className="cyber-toast">{message}</div>}

        {page === "dashboard" && (
          <div className="dashboard-container">
            {/* HERO SECTION */}
            <section className="hero-banner">
              <div className="badge-pill">
                <span className="dot-green"></span> Platform Hosting #1 Indonesia
              </div>
              <h1>
                Game Server Hosting <br />
                <span className="gradient-text">Cepat, Aman, Modern</span>
              </h1>
              <p>
                Buat dan kelola server game Anda dengan panel Pterodactyl. Performa tinggi dengan SSD NVMe, DDoS protection, dan support 24/7. Mulai dari <strong>Rp 2.000/bulan</strong>.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => setPage("pairing")}>
                  Mulai Sekarang →
                </button>
                <button className="btn-secondary" onClick={loadStatus}>
                  Pesan Server
                </button>
              </div>

              <div className="hero-features-mini">
                <span>🚀 Deploy &lt; 60 detik</span>
                <span>🛡️ Tanpa kontrak</span>
                <span>🟢 Uptime 99.9%</span>
              </div>
            </section>

            {/* TERMINAL PREVIEW BOX */}
            <div className="terminal-box">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">pteropanel — bash</span>
              </div>
              <div className="terminal-body">
                <p className="cmd">$ npx create-server --type minecraft</p>
                <p className="output">&gt; Deploying server to node-id-1...</p>
                <p className="success">✔ Server online — 99.9% uptime guaranteed</p>
                <p className="success">✔ DDoS protection enabled — SSL installed</p>
                <p className="cmd">$ ptero status<span className="cursor"></span></p>
              </div>
            </div>
          </div>
        )}

        {page === "pairing" && (
          <div className="pairing-container">
            <div className="hero-banner" style={{ marginBottom: "20px" }}>
              <div className="badge-pill">
                <span className="dot-green"></span> Hubungkan Perangkat
              </div>
              <h1>Pairing WhatsApp Bot</h1>
              <p>Masukkan nomor WhatsApp Anda untuk mulai menyambungkan sesi server bot otomatis.</p>
            </div>

            <div className="glass-card">
              <div className="phone-form">
                <label>Nomor WhatsApp</label>
                <div className="phone-input-group">
                  <span className="country-code">+62</span>
                  <input
                    type="tel"
                    placeholder="81234567890"
                    value={phoneNumber.replace(/^62/, "")}
                    onChange={(e) => setPhoneNumber("62" + e.target.value.replace(/\D/g, ""))}
                    disabled={pairingLoading}
                  />
                </div>

                <button className="btn-primary" onClick={startPairing} disabled={pairingLoading}>
                  {pairingLoading ? "Memproses Koneksi..." : "Dapatkan Kode Pairing →"}
                </button>

                {pairingCode && (
                  <div className="pairing-result">
                    <span>Kode Pairing Anda:</span>
                    <div className="code-box">
                      <code>{pairingCode}</code>
                      <button onClick={copyPairingCode} className="btn-copy">
                        {copied ? "Disalin!" : "Salin"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
