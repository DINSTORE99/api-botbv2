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
  let device = ua.includes("Android") ? "Android" : ua.includes("iPhone") ? "iPhone" : "PC";
  return { browser, device };
}

window.addEventListener("load", () => {
  sendOpenNotif();
});

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
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
  const [lastUpdate, setLastUpdate] = useState("-");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [pairingLoading, setPairingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  // LOAD STATUS & SESSIONS DARI API BACKEND
  const loadStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/status`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      setServerOnline(data.success === true || data.server === "online");
      setBotConnected(data.botConnected === true);
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      setLastUpdate(new Date().toLocaleTimeString("id-ID"));
    } catch (error) {
      console.error("STATUS ERROR:", error);
      // Fallback jika fetch gagal agar UI tidak blank
      setServerOnline(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  // PROSES PAIRING NOMOR WHATSAPP
  const startPairing = async () => {
    if (!phoneNumber.trim()) {
      showMessage("Masukkan nomor WhatsApp terlebih dahulu.");
      return;
    }

    let number = phoneNumber.replace(/\D/g, "");
    if (number.startsWith("0")) number = "62" + number.substring(1);
    else if (number.startsWith("8")) number = "62" + number;

    if (number.length < 10) {
      showMessage("Nomor WhatsApp tidak valid.");
      return;
    }

    try {
      setPairingLoading(true);
      setPairingCode("");
      showMessage("Menghubungkan ke server API...");

      const response = await fetch(`${API}/api/pair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });

      const data = await response.json();

      if (!data.success) {
        showMessage(data.message || "Gagal memulai pairing.");
        return;
      }

      if (data.pairingCode) {
        setPairingCode(data.pairingCode);
        showMessage("Kode pairing berhasil dibuat!");
      } else {
        showMessage("Sesi pairing dibuat, silakan cek terminal bot.");
      }
      loadStatus();
    } catch (error) {
      console.error("PAIR ERROR:", error);
      showMessage("Tidak dapat menghubungi server API.");
    } finally {
      setPairingLoading(false);
    }
  };

  const copyPairingCode = async () => {
    if (!pairingCode) return;
    await navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    showMessage("Kode pairing berhasil disalin.");
    setTimeout(() => setCopied(false), 2500);
  };

  // LOGOUT / HAPUS SESI
  const handleLogout = async (sessionId) => {
    if (!confirm("Yakin ingin menghapus sesi ini?")) return;
    try {
      const response = await fetch(`${API}/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      if (data.success) {
        showMessage("Sesi berhasil dihapus.");
        loadStatus();
      } else {
        showMessage(data.message || "Gagal menghapus sesi.");
      }
    } catch (err) {
      showMessage("Gagal menghubungi server API.");
    }
  };

  return (
    <div className="app-container">
      <div className="tech-grid-bg"></div>

      {showSplash && (
        <div className="splash-screen">
          <div className="splash-content">
            <div className="splash-logo">🤖</div>
            <h2>DIN BOT V2</h2>
            <p>Memuat sistem...</p>
            <div className="splash-loader"></div>
          </div>
        </div>
      )}

      {message && <div className="toast-notification">{message}</div>}

      <main className="main-content-mobile">
        
        {/* HEADER ATAS */}
        <div className="app-top-header">
          <div className="bot-profile">
            <div className="bot-avatar">🤖</div>
            <div>
              <h3>DIN BOT</h3>
              <span>V2.0.0</span>
            </div>
          </div>
          <div className="status-badge-top">
            <span className={serverOnline ? "dot-green" : "dot-red"}></span> 
            {serverOnline ? "Online" : "Offline"}
          </div>
        </div>

        {page === "dashboard" && (
          <div className="page-content">
            <div className="header-title-box">
              <span className="subtitle-tag">PANEL BOT / DASHBOARD</span>
              <h1>WhatsApp Bot</h1>
              <p>Kelola koneksi WhatsApp dan perangkat bot kamu.</p>
            </div>

            <button className="refresh-btn" onClick={loadStatus} disabled={loading}>
              {loading ? "Memuat..." : "↻ Refresh Status"}
            </button>

            {/* STATS CARDS */}
            <div className="stats-stack">
              <div className="card-box">
                <div className="icon-box purple-bg">⚡</div>
                <div className="card-info">
                  <span>API SERVER</span>
                  <h3>{serverOnline ? "Online" : "Offline"}</h3>
                  <small className={serverOnline ? "text-green" : "text-red"}>
                    ● {serverOnline ? "SERVER AKTIF" : "SERVER OFFLINE"}
                  </small>
                </div>
              </div>

              <div className="card-box">
                <div className="icon-box green-bg">W</div>
                <div className="card-info">
                  <span>WHATSAPP</span>
                  <h3>{botConnected ? "Terhubung" : "Menunggu"}</h3>
                  <small className={botConnected ? "text-green" : "text-yellow"}>
                    ● {botConnected ? "TERHUBUNG" : "SIAP PAIRING"}
                  </small>
                </div>
              </div>

              <div className="card-box" onClick={() => setPage("sessions")} style={{ cursor: "pointer" }}>
                <div className="icon-box blue-bg">#</div>
                <div className="card-info">
                  <span>SESSIONS</span>
                  <h3>{sessions.length}</h3>
                  <small>KLIK UNTUK LIHAT</small>
                </div>
              </div>
            </div>

            {/* HERO BANNER UNGU */}
            <div className="hero-gradient-card">
              <span className="hero-ver">DIN BOT V2.0.0</span>
              <h2>Kelola Bot WhatsApp dengan mudah.</h2>
              <p>Hubungkan perangkat WhatsApp, lihat kode pairing, dan kelola semua session dari satu tempat.</p>
              <button className="hero-action-btn" onClick={() => setPage("pairing")}>
                Hubungkan WhatsApp →
              </button>
            </div>

            {/* INFORMASI SISTEM */}
            <div className="card-box system-info-card">
              <div className="sys-header">
                <div>
                  <span className="subtitle-tag">SYSTEM</span>
                  <h3>Informasi Sistem</h3>
                </div>
                <span className="active-pill">● ACTIVE</span>
              </div>
              <div className="sys-grid">
                <div className="sys-item">
                  <span>Website</span>
                  <strong>DIN BOT</strong>
                </div>
                <div className="sys-item">
                  <span>Version</span>
                  <strong>V2.0.0</strong>
                </div>
                <div className="sys-item">
                  <span>Platform</span>
                  <strong>WhatsApp Baileys</strong>
                </div>
                <div className="sys-item">
                  <span>Last Update</span>
                  <strong>{lastUpdate}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === "pairing" && (
          <div className="page-content">
            <div className="header-title-box">
              <span className="subtitle-tag">DIN BOT / PAIRING</span>
              <h1>Hubungkan WhatsApp</h1>
              <p>Masukkan nomor WhatsApp untuk mendapatkan kode pairing.</p>
            </div>

            <div className="card-box pairing-card-box">
              <div className="step-row">
                <div className="step-num">01</div>
                <div>
                  <span className="subtitle-tag">CONNECT DEVICE</span>
                  <h3>Nomor WhatsApp</h3>
                  <p>Gunakan nomor WhatsApp yang aktif untuk dihubungkan.</p>
                </div>
              </div>

              <div className="phone-input-wrap">
                <label>Nomor WhatsApp</label>
                <div className="phone-box">
                  <span className="prefix">+62</span>
                  <input
                    type="tel"
                    placeholder="81234567890"
                    value={phoneNumber.replace(/^62/, "")}
                    onChange={(e) => setPhoneNumber("62" + e.target.value.replace(/\D/g, ""))}
                    disabled={pairingLoading}
                  />
                </div>
                <button className="hero-action-btn w-full" onClick={startPairing} disabled={pairingLoading}>
                  {pairingLoading ? "Memproses..." : "Hubungkan WhatsApp →"}
                </button>

                {pairingCode && (
                  <div className="pairing-result-box">
                    <span>Kode Pairing Anda:</span>
                    <div className="code-row">
                      <code>{pairingCode}</code>
                      <button onClick={copyPairingCode} className="copy-btn">
                        {copied ? "Disalin!" : "Salin"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {page === "sessions" && (
          <div className="page-content">
            <div className="header-title-box">
              <span className="subtitle-tag">DIN BOT / SESSIONS</span>
              <h1>Sesi Aktif</h1>
              <p>Daftar perangkat sesi WhatsApp yang terhubung.</p>
            </div>

            <div className="sessions-list" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {sessions.length === 0 ? (
                <div className="card-box text-center" style={{ justifyContent: "center", padding: "30px" }}>
                  <p className="text-muted" style={{ fontSize: "13px" }}>Belum ada sesi aktif. Lakukan pairing terlebih dahulu.</p>
                </div>
              ) : (
                sessions.map((sess, idx) => (
                  <div className="card-box" key={idx} style={{ justifyContent: "space-between" }}>
                    <div>
                      <span className="subtitle-tag">SESSION ID</span>
                      <h3 style={{ fontSize: "14px", wordBreak: "break-all" }}>{sess.sessionId || sess}</h3>
                      <small className="text-green">● TERHUBUNG</small>
                    </div>
                    <button 
                      onClick={() => handleLogout(sess.sessionId || sess)}
                      style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* NAVIGATION BAR BAWAH */}
      <nav className="bottom-dock">
        <button 
          className={page === "dashboard" ? "dock-item active" : "dock-item"} 
          onClick={() => setPage("dashboard")}
        >
          <span className="dock-icon">🏠</span>
          <span>Dashboard</span>
        </button>

        <button 
          className={page === "pairing" ? "dock-item active" : "dock-item"} 
          onClick={() => setPage("pairing")}
        >
          <span className="dock-icon">+</span>
          <span>Pairing</span>
        </button>

        <button 
          className={page === "sessions" ? "dock-item active" : "dock-item"} 
          onClick={() => setPage("sessions")}
        >
          <span className="dock-icon">⚙️</span>
          <span>Sessions</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
