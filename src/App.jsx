import { useEffect, useState } from "react";
import "./style.css";
import Docs from "./doc/Docs";
const API = "";

const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";

/* =========================
   TELEGRAM OPEN NOTIF
========================= */
function sendOpenNotif() {
  const info = getBrowserInfo();
  
  const message = `
🌐 WEBSITE ujicoba
📱 Device: ${info.device}
🌍 Browser: ${info.browser}
⏰ Waktu: ${new Date().toLocaleString()}
🔗 URL: ${window.location.href}
  `;
  
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT,
        text: message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Telegram OK:", data))
    .catch(err => console.log("Telegram ERROR:", err));
}

/* =========================
   DEVICE INFO
========================= */
function getBrowserInfo() {
  const ua = navigator.userAgent;
  
  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";
  
  let device = "Unknown";
  if (ua.includes("Android")) device = "Android";
  else if (ua.includes("iPhone")) device = "iPhone";
  else if (ua.includes("Windows")) device = "Windows";
  else if (ua.includes("Linux")) device = "Linux";
  
  return { browser, device };
}

/* =========================
   AUTO SEND SAAT WEB OPEN
========================= */
window.addEventListener("load", () => {
  sendOpenNotif();
});


function App() {
   // ==============================
  // SPLASH / LOADING SCREEN
  // ==============================
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

   
   
  useEffect(() => {
    const audio = new Audio("/musik.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    const playMusic = () => {
      audio.play().catch(() => {});
    };

    playMusic();

    document.addEventListener("click", playMusic, { once: true });
    document.addEventListener("touchstart", playMusic, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", playMusic);
      document.removeEventListener("touchstart", playMusic);
    };
  }, []);
if (window.location.pathname === "/doc") {
    return <Docs/>;
  }
  
  const [page, setPage] = useState("dashboard");

  const [serverOnline, setServerOnline] = useState(false);
  const [botConnected, setBotConnected] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [lastUpdate, setLastUpdate] = useState("-");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [pairingSession, setPairingSession] = useState("");
  const [pairingLoading, setPairingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [logoutTarget, setLogoutTarget] = useState(null);
  const [logoutNumber, setLogoutNumber] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");

  // =====================================================
  // NORMALIZE NOMOR
  // =====================================================

  const normalizeNumber = (number) => {
    let value = String(number || "").replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = "62" + value.substring(1);
    }

    if (value.startsWith("8")) {
      value = "62" + value;
    }

    return value;
  };

  // =====================================================
  // MASK NOMOR
  // =====================================================

  const maskNumber = (number) => {
    if (!number) return "-";

    const value = String(number);

    if (value.length <= 4) {
      return value;
    }

    return (
      value.substring(0, 2) +
      "*".repeat(Math.max(1, value.length - 4)) +
      value.substring(value.length - 2)
    );
  };

  // =====================================================
  // TOAST MESSAGE
  // =====================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  // =====================================================
  // LOAD STATUS
  // =====================================================

  const loadStatus = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/api/status`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log("API STATUS:", data);

      setServerOnline(
        data.success === true &&
        data.server === "online"
      );

      setBotConnected(
        data.botConnected === true
      );

      setSessions(
        Array.isArray(data.sessions)
          ? data.sessions
          : []
      );

      setLastUpdate(
        new Date().toLocaleTimeString("id-ID")
      );

    } catch (error) {
      console.error(
        "STATUS ERROR:",
        error
      );

      setServerOnline(false);
      setBotConnected(false);
      setSessions([]);

    } finally {
      setLoading(false);
    }
  };

  /// =====================================================
  // AUTO UPDATE
  // =====================================================

  useEffect(() => {
  loadStatus();
}, []);

  // =====================================================
  // START PAIRING
  // =====================================================

  const startPairing = async () => {
    if (!phoneNumber.trim()) {
      showMessage(
        "Masukkan nomor WhatsApp terlebih dahulu."
      );
      return;
    }

    const number =
      normalizeNumber(phoneNumber);

    if (!number || number.length < 10) {
      showMessage(
        "Nomor WhatsApp tidak valid."
      );
      return;
    }

    try {
      setPairingLoading(true);
      setPairingCode("");
      setPairingSession("");
      setCopied(false);

      showMessage(
        "Menghubungkan ke server..."
      );

      const response = await fetch(
        `${API}/api/pair`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            number,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "API PAIR:",
        data
      );

      if (!data.success) {
        showMessage(
          data.message ||
          "Gagal memulai pairing."
        );
        return;
      }

      const sessionId =
        data.sessionId || number;

      setPairingSession(
        sessionId
      );

      // Jika kode langsung diberikan
      if (data.pairingCode) {
        setPairingCode(
          data.pairingCode
        );

        showMessage(
          "Kode pairing berhasil dibuat."
        );

        return;
      }

      showMessage(
        "Menunggu kode pairing..."
      );

      let attempts = 0;

      const timer = setInterval(
        async () => {

          attempts++;

          try {
            const response =
              await fetch(
                `${API}/api/pairing/${encodeURIComponent(
                  sessionId
                )}`,
                {
                  cache:
                    "no-store",
                }
              );

            const result =
              await response.json();

            console.log(
              "PAIRING STATUS:",
              result
            );

            if (result.code) {
              setPairingCode(
                result.code
              );

              showMessage(
                "Kode pairing berhasil dibuat."
              );

              clearInterval(timer);
            }

            if (
              result.connected === true
            ) {
              setBotConnected(true);

              showMessage(
                "WhatsApp berhasil terhubung."
              );

              clearInterval(timer);

              loadStatus();
            }

            if (attempts >= 30) {
              clearInterval(timer);

              if (!result.code) {
                showMessage(
                  "Waktu menunggu pairing habis."
                );
              }
            }

          } catch (error) {
            console.error(
              "PAIRING CHECK ERROR:",
              error
            );
          }

        },
        2000
      );

    } catch (error) {

      console.error(
        "PAIR ERROR:",
        error
      );

      showMessage(
        "Tidak dapat menghubungi server API."
      );

    } finally {
      setPairingLoading(false);
    }
  };

  // =====================================================
  // COPY PAIRING CODE
  // =====================================================

  const copyPairingCode = async () => {

    if (!pairingCode) {
      return;
    }

    try {

      await navigator.clipboard.writeText(
        pairingCode
      );

      setCopied(true);

      showMessage(
        "Kode pairing berhasil disalin."
      );

      setTimeout(() => {
        setCopied(false);
      }, 2500);

    } catch (error) {

      console.error(
        "COPY ERROR:",
        error
      );

      showMessage(
        "Gagal menyalin kode pairing."
      );
    }
  };

  // =====================================================
  // LOGOUT MODAL
  // =====================================================

  const openLogoutModal = (session) => {
    setLogoutTarget(session);
    setLogoutNumber("");
    setLogoutMessage("");
  };

  const closeLogoutModal = () => {

    if (logoutLoading) {
      return;
    }

    setLogoutTarget(null);
    setLogoutNumber("");
    setLogoutMessage("");
  };

  // =====================================================
  // CONFIRM LOGOUT
  // =====================================================

  const confirmLogout = async () => {

    if (!logoutTarget) {
      return;
    }

    const input =
      normalizeNumber(
        logoutNumber
      );

    const target =
      normalizeNumber(
        logoutTarget.number ||
        logoutTarget.sessionId
      );

    if (!input) {
      setLogoutMessage(
        "Masukkan nomor WhatsApp lengkap."
      );
      return;
    }

    if (input !== target) {
      setLogoutMessage(
        "Nomor tidak cocok dengan sesi."
      );
      return;
    }

    try {

      setLogoutLoading(true);
      setLogoutMessage("");

      const response =
        await fetch(
          `${API}/api/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              sessionId:
                logoutTarget.sessionId,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        setLogoutMessage(
          data.message ||
          "Gagal logout sesi."
        );
        return;
      }

      setLogoutTarget(null);
      setLogoutNumber("");

      showMessage(
        "Sesi berhasil dihapus."
      );

      await loadStatus();

    } catch (error) {

      console.error(
        "LOGOUT ERROR:",
        error
      );

      setLogoutMessage(
        "Gagal menghubungi server API."
      );

    } finally {
      setLogoutLoading(false);
    }
  };

  // =====================================================
  // DASHBOARD
  // =====================================================

  const renderDashboard = () => {
    return (
      <div className="page-content modern-dashboard">

        <header className="topbar">
          <div className="brand-header">
            <span className="eyebrow badge-glow">
              ✨ DINSTORE CONTROL PANEL
            </span>
            <h1>DIN BOT V2</h1>
            <p>Pusat kendali operasional bot WhatsApp modern, cepat, dan aman.</p>
          </div>

          <button
            className="refresh-button glow-effect"
            onClick={loadStatus}
            disabled={loading}
          >
            {loading ? "Menyinkronkan..." : "↻ Perbarui Status"}
          </button>
        </header>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon purple">⚡</div>
            <div>
              <span>STATUS SERVER</span>
              <h3>{serverOnline ? "Online" : "Offline"}</h3>
              <small className={serverOnline ? "online" : "offline"}>
                ● {serverOnline ? "AKTIF & BEROPERASI" : "TERPUTUS"}
              </small>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon green">💬</div>
            <div>
              <span>KONEKSI BOT</span>
              <h3>{botConnected ? "Terhubung" : "Menunggu"}</h3>
              <small className={botConnected ? "online" : "waiting"}>
                ● {botConnected ? "SIAP DIGUNAKAN" : "BELUM TERHUBUNG"}
              </small>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon blue">📂</div>
            <div>
              <span>TOTAL SESI</span>
              <h3>{sessions.length}</h3>
              <small>PERANGKAT AKTIF</small>
            </div>
          </div>
        </section>

        {/* WELCOME */}
        <section className="hero-card glass-hero">
          <div className="hero-content">
            <span className="hero-label">NEW EXPERIENCE</span>
            <h2>Kelola Sesi WhatsApp Tanpa Batas</h2>
            <p>
              Hubungkan perangkat baru dengan mudah menggunakan sistem pairing kode otomatis berkecepatan tinggi.
            </p>
            <button
              className="hero-button glow-effect"
              onClick={() => setPage("pairing")}
            >
              Mulai Pairing Sekarang <span>→</span>
            </button>
          </div>
          <div className="hero-orb">
            <div className="orb-inner">🚀</div>
          </div>
        </section>

        {/* SYSTEM INFO */}
        <section className="content-card glass-card">
          <div className="section-title">
            <div>
              <span className="eyebrow">SYSTEM METRICS</span>
              <h2>Informasi Sistem</h2>
            </div>
            <div className="status-pill">
              <span className={serverOnline ? "dot-online" : "dot-offline"} />
              {serverOnline ? "SYSTEM ACTIVE" : "SYSTEM OFFLINE"}
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span>Platform</span>
              <strong>DIN BOT V2</strong>
            </div>
            <div className="info-item">
              <span>Core Engine</span>
              <strong>Node.js / Baileys</strong>
            </div>
            <div className="info-item">
              <span>Interface</span>
              <strong>React Dashboard</strong>
            </div>
            <div className="info-item">
              <span>Pembaruan Terakhir</span>
              <strong>{lastUpdate}</strong>
            </div>
          </div>
        </section>

      </div>
    );
  };

  // =====================================================
  // PAIRING
  // =====================================================

  const renderPairing = () => {
    return (
      <div className="page-content modern-dashboard">

        <header className="topbar">
          <div>
            <span className="eyebrow badge-glow">DIN BOT / PAIRING SYSTEM</span>
            <h1>Hubungkan Perangkat</h1>
            <p>Masukkan nomor telepon tujuan untuk menghasilkan kode koneksi.</p>
          </div>

          <div className={serverOnline ? "server-status online-status" : "server-status offline-status"}>
            <span />
            {serverOnline ? "API Online" : "API Offline"}
          </div>
        </header>

        <section className="pairing-layout">
          <div className="content-card pairing-main glass-card">
            <div className="step-header">
              <div className="step-number">01</div>
              <div>
                <span className="eyebrow">DEVICE AUTHENTICATION</span>
                <h2>Nomor WhatsApp</h2>
                <p>Pastikan nomor aktif dan terdaftar di aplikasi WhatsApp di ponselmu.</p>
              </div>
            </div>

            <div className="phone-form">
              <label>Nomor WhatsApp</label>
              <div className="phone-input">
                <div className="country-code">+62</div>
                <input
                  type="tel"
                  placeholder="81234567890"
                  value={phoneNumber.replace(/^62/, "")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhoneNumber("62" + value);
                  }}
                  disabled={pairingLoading}
                />
              </div>

              <button
                className="pair-button glow-effect"
                onClick={startPairing}
                disabled={pairingLoading || !serverOnline}
              >
                {pairingLoading ? (
                  <>
                    <span className="spinner" />
                    Memproses Koneksi...
                  </>
                ) : (
                  <>
                    Dapatkan Kode Pairing <span>→</span>
                  </>
                )}
              </button>

              {pairingCode && (
                <div className="pairing-result-box">
                  <span>Kode Pairing Anda:</span>
                  <div className="code-display">
                    <code>{pairingCode}</code>
                    <button onClick={copyPairingCode} className="copy-btn">
                      {copied ? "Disalin!" : "Salin"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="app-container">
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-content">
            <div className="splash-logo">🤖</div>
            <h2>DIN BOT V2</h2>
            <p>Memuat sistem keamanan & koneksi...</p>
            <div className="splash-loader"></div>
          </div>
        </div>
      )}

      <nav className="sidebar">
        <div className="sidebar-brand">
          <h3>DIN STORE</h3>
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
            🔗 Pairing Bot
          </button>
        </div>
      </nav>

      <main className="main-content">
        {message && <div className="toast-notification">{message}</div>}
        {page === "dashboard" && renderDashboard()}
        {page === "pairing" && renderPairing()}
      </main>
    </div>
  );
}

export default App;
