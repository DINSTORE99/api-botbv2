import { useEffect, useState } from "react";
import "./style.css";

import Docs from "./doc/Docs";
import CaseDocs from "./case/case";

const API = "";

// Ganti dengan nomor WhatsApp admin untuk layanan sewa
const RENTAL_WA = "628xxxxxxxxxx";

// =====================================================
// BROWSER INFO
// =====================================================

function getBrowserInfo() {
  const ua = navigator.userAgent;

  let browser = "Browser";
  if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";

  let device = "PC";
  if (/Android/i.test(ua)) device = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) device = "iPhone/iOS";

  return {
    browser,
    device,
  };
}

// =====================================================
// VISITOR NOTIFICATION
// =====================================================

async function sendOpenNotif() {
  try {
    const info = getBrowserInfo();

    await fetch(`${API}/api/visitor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device: info.device,
        browser: info.browser,
        time: new Date().toLocaleString("id-ID"),
        url: window.location.href,
      }),
    });
  } catch (err) {
    console.log("Visitor notification unavailable");
  }
}

// =====================================================
// VISITOR TRACKER
// =====================================================

function VisitorTracker() {
  useEffect(() => {
    sendOpenNotif();
  }, []);

  return null;
}

// =====================================================
// NAVIGATION
// =====================================================

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// =====================================================
// ICON
// =====================================================

function Icon({ children }) {
  return <span className="sibot-icon">{children}</span>;
}

// =====================================================
// HEADER
// =====================================================

function Header({ page }) {
  const [menu, setMenu] = useState(false);

  const go = (path) => {
    setMenu(false);
    navigate(path);
  };

  return (
    <header className="sibot-header">
      <div className="header-inner">

        <button
          className="brand"
          onClick={() => go("/")}
        >
          <img
            src="/logo.png"
            alt="SIBOT"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="brand-text">
            <strong>SIBOT</strong>
            <span>WHATSAPP AUTOMATION</span>
          </div>
        </button>

        <nav className={`main-nav ${menu ? "show" : ""}`}>

          <button
            className={page === "home" ? "active" : ""}
            onClick={() => go("/")}
          >
            Beranda
          </button>

          <button
            className={page === "gratis" ? "active" : ""}
            onClick={() => go("/gratis")}
          >
            Bot Gratis
          </button>

          <button
            className={page === "sewa" ? "active" : ""}
            onClick={() => go("/sewa")}
          >
            Sewa Bot
          </button>

          <button
            className={page === "paket" ? "active" : ""}
            onClick={() => go("/paket")}
          >
            Paket
          </button>

          <button
            onClick={() => {
              setMenu(false);
              document
                .getElementById("contact")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Kontak
          </button>

        </nav>

        <div className="header-right">
          <span className="online-badge">
            <i></i>
            ONLINE
          </span>

          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

      </div>
    </header>
  );
}

// =====================================================
// FOOTER
// =====================================================

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-grid">

        <div className="footer-brand">

          <div className="footer-logo">
            <img
              src="/logo.png"
              alt="SIBOT"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <strong>SIBOT</strong>
          </div>

          <p>
            Platform WhatsApp automation yang simpel,
            cepat dan aman untuk kebutuhan personal
            maupun bisnis.
          </p>

          <div className="footer-status">
            <span></span>
            Semua sistem berjalan normal
          </div>

        </div>

        <div className="footer-column">
          <h4>Layanan</h4>

          <button onClick={() => navigate("/gratis")}>
            Bot Gratis
          </button>

          <button onClick={() => navigate("/sewa")}>
            Sewa Bot
          </button>

          <button onClick={() => navigate("/paket")}>
            Paket
          </button>
        </div>

        <div className="footer-column">
          <h4>Dokumentasi</h4>

          <button onClick={() => navigate("/doc")}>
            API Docs
          </button>

          <button onClick={() => navigate("/case")}>
            Case Docs
          </button>
        </div>

        <div className="footer-column">
          <h4>Kontak</h4>

          <p>DIN STORE</p>
          <p>WhatsApp Support</p>
          <p>Telegram Support</p>
        </div>

      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} SIBOT. All rights reserved.
        </span>

        <span>
          Powered by <b>DIN STORE</b>
        </span>
      </div>

    </footer>
  );
}

// =====================================================
// HOME
// =====================================================

function HomePage() {

  const features = [
    {
      icon: "✦",
      title: "AI Chat",
      text: "Bot pintar dengan fitur AI untuk menjawab pesan secara otomatis.",
    },
    {
      icon: "↓",
      title: "Downloader",
      text: "Download berbagai media langsung melalui WhatsApp.",
    },
    {
      icon: "✎",
      title: "Sticker Maker",
      text: "Buat sticker WhatsApp dengan cepat dan mudah.",
    },
    {
      icon: "↻",
      title: "Auto Respon",
      text: "Balas pesan secara otomatis sesuai command yang kamu buat.",
    },
    {
      icon: "♟",
      title: "Group Tools",
      text: "Berbagai tools untuk membantu mengelola grup WhatsApp.",
    },
    {
      icon: "◉",
      title: "Multi Device",
      text: "Kelola banyak session WhatsApp dengan lebih mudah.",
    },
  ];

  return (
    <>
      <Header page="home" />

      <main>

        {/* ==============================================
            HERO
        ============================================== */}

        <section className="hero">

          <div className="hero-grid"></div>

          <div className="hero-content">

            <div className="hero-label">
              <span></span>
              WHATSAPP AUTOMATION PLATFORM
            </div>

            <h1>
              Otomatisasi{" "}
              <span>WhatsApp</span>
              <br />
              Tanpa Ribet.
            </h1>

            <p>
              Gunakan bot WhatsApp sendiri secara gratis
              atau pilih layanan sewa bot untuk kebutuhan
              bisnis kamu.
            </p>

            <div className="hero-buttons">

              <button
                className="btn btn-blue"
                onClick={() => navigate("/gratis")}
              >
                Mulai Bot Gratis
                <b>→</b>
              </button>

              <button
                className="btn btn-outline"
                onClick={() => navigate("/sewa")}
              >
                Sewa Bot
                <b>→</b>
              </button>

            </div>

            <div className="hero-trust">

              <div>
                <strong>100%</strong>
                <span>Gratis</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Online</span>
              </div>

              <div>
                <strong>Multi</strong>
                <span>Session</span>
              </div>

            </div>

          </div>

          {/* ROBOT */}
          <div className="hero-visual">

            <div className="glow"></div>

            <div className="robot-card">

              <div className="robot-head">
                <div className="robot-ear left"></div>
                <div className="robot-ear right"></div>

                <div className="robot-face">

                  <div className="robot-eyes">
                    <span></span>
                    <span></span>
                  </div>

                  <div className="robot-mouth"></div>

                </div>
              </div>

              <div className="robot-body">

                <div className="robot-dot"></div>

                <div className="robot-message">
                  <span>●</span>
                  SIBOT ONLINE
                </div>

              </div>

            </div>

            <div className="floating-card floating-one">
              <span>✓</span>
              Auto Respon
            </div>

            <div className="floating-card floating-two">
              <span>✦</span>
              AI Chat
            </div>

          </div>

        </section>

        {/* ==============================================
            SERVICES
        ============================================== */}

        <section className="services section">

          <div className="section-heading">

            <div className="section-label">
              PILIH LAYANAN
            </div>

            <h2>
              Mulai Menggunakan <span>SIBOT</span>
            </h2>

            <p>
              Pilih layanan yang paling sesuai dengan
              kebutuhan kamu.
            </p>

          </div>

          <div className="service-grid">

            {/* FREE */}

            <article className="service-card free-card">

              <div className="service-top">
                <div className="service-icon">
                  ⚡
                </div>

                <span className="service-badge blue">
                  GRATIS
                </span>
              </div>

              <h3>Bot WhatsApp Gratis</h3>

              <p>
                Buat bot WhatsApp kamu sendiri dengan
                pairing code dan berbagai fitur menarik.
              </p>

              <ul>
                <li>
                  <span>✓</span>
                  Pairing Code
                </li>

                <li>
                  <span>✓</span>
                  Banyak fitur bot
                </li>

                <li>
                  <span>✓</span>
                  Multi Session
                </li>

                <li>
                  <span>✓</span>
                  Gratis digunakan
                </li>
              </ul>

              <button
                className="service-button blue-button"
                onClick={() => navigate("/gratis")}
              >
                Mulai Bot Gratis
                <b>→</b>
              </button>

            </article>

            {/* RENTAL */}

            <article className="service-card rental-card">

              <div className="service-top">
                <div className="service-icon">
                  ◈
                </div>

                <span className="service-badge red">
                  SEWA
                </span>
              </div>

              <h3>Sewa Bot untuk Bisnis</h3>

              <p>
                Bot WhatsApp siap pakai untuk bisnis,
                toko online, komunitas dan kebutuhan
                profesional.
              </p>

              <ul>
                <li>
                  <span>✓</span>
                  Bot online 24/7
                </li>

                <li>
                  <span>✓</span>
                  Dashboard management
                </li>

                <li>
                  <span>✓</span>
                  Support & maintenance
                </li>

                <li>
                  <span>✓</span>
                  Paket mulai Rp15.000/bulan
                </li>
              </ul>

              <button
                className="service-button red-button"
                onClick={() => navigate("/sewa")}
              >
                Lihat Paket Sewa
                <b>→</b>
              </button>

            </article>

          </div>

        </section>

        {/* ==============================================
            FEATURES
        ============================================== */}

        <section className="features section">

          <div className="section-heading">

            <div className="section-label">
              FITUR UNGGULAN
            </div>

            <h2>
              Semua yang Kamu Butuhkan
              <br />
              Dalam Satu <span>Bot WhatsApp</span>
            </h2>

            <p>
              SIBOT dilengkapi berbagai fitur untuk
              membuat aktivitas WhatsApp menjadi lebih
              mudah dan otomatis.
            </p>

          </div>

          <div className="feature-grid">

            {features.map((feature, index) => (
              <article
                className="feature-card"
                key={index}
              >

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

              </article>
            ))}

          </div>

        </section>

        {/* ==============================================
            CTA
        ============================================== */}

        <section className="cta section">

          <div className="cta-box">

            <div>

              <div className="section-label">
                SIAP MULAI?
              </div>

              <h2>
                Siap Menggunakan <span>SIBOT?</span>
              </h2>

              <p>
                Pilih layanan yang sesuai dengan
                kebutuhanmu dan mulai otomatisasi
                WhatsApp sekarang.
              </p>

            </div>

            <div className="cta-buttons">

              <button
                className="btn btn-blue"
                onClick={() => navigate("/gratis")}
              >
                Bot Gratis →
              </button>

              <button
                className="btn btn-red"
                onClick={() => navigate("/sewa")}
              >
                Sewa Bot →
              </button>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

// =====================================================
// FREE BOT PAGE
// =====================================================

function FreeBotPage() {

  const [number, setNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===================================================
  // GET STATUS
  // ===================================================

  async function loadStatus() {
    try {

      const res = await fetch(`${API}/api/status`);

      if (!res.ok) {
        throw new Error("Status API error");
      }

      const data = await res.json();

      setStatus(data);

      const list =
        data?.sessions ||
        data?.data?.sessions ||
        [];

      setSessions(
        Array.isArray(list)
          ? list
          : []
      );

    } catch (err) {

      setStatus({
        online: false,
      });

    }
  }

  // ===================================================
  // INITIAL
  // ===================================================

  useEffect(() => {

    loadStatus();

    const interval = setInterval(
      loadStatus,
      10000
    );

    return () => clearInterval(interval);

  }, []);

  // ===================================================
  // PAIR
  // ===================================================

  async function createPairing() {

    setError("");
    setMessage("");
    setPairingCode("");

    const cleanNumber =
      number.replace(/\D/g, "");

    if (!cleanNumber) {
      setError(
        "Masukkan nomor WhatsApp terlebih dahulu."
      );
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        `${API}/api/pair`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            number: cleanNumber,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
          data?.error ||
          "Gagal membuat pairing code."
        );
      }

      const code =
        data?.code ||
        data?.pairingCode ||
        data?.data?.code ||
        "";

      if (!code) {
        throw new Error(
          "Pairing code tidak ditemukan dari server."
        );
      }

      setPairingCode(code);

      setMessage(
        "Pairing code berhasil dibuat."
      );

      loadStatus();

    } catch (err) {

      setError(
        err?.message ||
        "Terjadi kesalahan."
      );

    } finally {

      setLoading(false);

    }
  }

  // ===================================================
  // COPY
  // ===================================================

  async function copyCode() {

    if (!pairingCode) return;

    try {

      await navigator.clipboard.writeText(
        pairingCode
      );

      setMessage(
        "Pairing code berhasil disalin."
      );

    } catch {

      setError(
        "Gagal menyalin pairing code."
      );

    }
  }

  // ===================================================
  // LOGOUT
  // ===================================================

  async function logoutSession(session) {

    const sessionId =
      typeof session === "string"
        ? session
        : session?.id ||
          session?.sessionId ||
          session?.jid ||
          session?.number;

    if (!sessionId) return;

    try {

      const res = await fetch(
        `${API}/api/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            sessionId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
          "Gagal logout."
        );
      }

      setMessage(
        "Session berhasil dihapus."
      );

      loadStatus();

    } catch (err) {

      setError(
        err?.message ||
        "Gagal menghapus session."
      );

    }
  }

  const online =
    status?.online !== undefined
      ? status.online
      : status?.server !== undefined
        ? status.server
        : status?.status
          ? status.status === "online"
          : true;

  return (
    <>
      <Header page="gratis" />

      <main className="inner-page">

        {/* BACK */}

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Kembali ke Beranda
        </button>

        {/* TITLE */}

        <section className="page-heading">

          <div className="service-badge blue">
            GRATIS
          </div>

          <h1>
            Buat Bot WhatsApp
            <span> Gratis.</span>
          </h1>

          <p>
            Hubungkan nomor WhatsApp kamu menggunakan
            pairing code dan gunakan berbagai fitur
            SIBOT secara gratis.
          </p>

        </section>

        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <span className="stat-icon">
              ◉
            </span>

            <div>
              <small>API SERVER</small>

              <strong
                className={
                  online
                    ? "online-text"
                    : "offline-text"
                }
              >
                {online
                  ? "ONLINE"
                  : "OFFLINE"}
              </strong>
            </div>

          </div>

          <div className="stat-card">

            <span className="stat-icon">
              ◇
            </span>

            <div>
              <small>WHATSAPP</small>

              <strong>
                SIAP PAIRING
              </strong>
            </div>

          </div>

          <div className="stat-card">

            <span className="stat-icon">
              ◎
            </span>

            <div>
              <small>SESSIONS</small>

              <strong>
                {sessions.length}
              </strong>
            </div>

          </div>

        </section>

        {/* PAIRING */}

        <section className="pair-layout">

          <div className="pair-card">

            <div className="card-label">
              PAIRING CODE
            </div>

            <h2>
              Hubungkan WhatsApp
            </h2>

            <p>
              Masukkan nomor WhatsApp yang ingin
              digunakan untuk bot.
            </p>

            <label>
              Nomor WhatsApp
            </label>

            <div className="phone-input">

              <span>+62</span>

              <input
                value={number}
                onChange={(e) =>
                  setNumber(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="812xxxxxxxx"
                inputMode="numeric"
              />

            </div>

            <button
              className="pair-button"
              onClick={createPairing}
              disabled={loading}
            >
              {loading
                ? "MEMPROSES..."
                : "DAPATKAN PAIRING CODE →"}
            </button>

            {error && (
              <div className="alert error">
                {error}
              </div>
            )}

            {message && (
              <div className="alert success">
                {message}
              </div>
            )}

            {pairingCode && (
              <div className="pair-result">

                <small>
                  PAIRING CODE
                </small>

                <div className="code-box">
                  <strong>
                    {pairingCode}
                  </strong>

                  <button
                    onClick={copyCode}
                  >
                    COPY
                  </button>
                </div>

                <p>
                  Buka WhatsApp → Perangkat
                  tertaut → Tautkan perangkat
                  → Tautkan dengan nomor telepon.
                </p>

              </div>
            )}

          </div>

          <div className="how-card">

            <div className="card-label">
              CARA MENGGUNAKAN
            </div>

            <h2>
              Hanya 3 Langkah
            </h2>

            <div className="steps">

              <div className="step">

                <span>01</span>

                <div>
                  <h3>
                    Masukkan Nomor
                  </h3>

                  <p>
                    Masukkan nomor WhatsApp
                    yang ingin kamu gunakan.
                  </p>
                </div>

              </div>

              <div className="step">

                <span>02</span>

                <div>
                  <h3>
                    Dapatkan Code
                  </h3>

                  <p>
                    Klik tombol pairing untuk
                    mendapatkan kode.
                  </p>
                </div>

              </div>

              <div className="step">

                <span>03</span>

                <div>
                  <h3>
                    Hubungkan
                  </h3>

                  <p>
                    Masukkan kode pada WhatsApp
                    kamu dan bot siap digunakan.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SESSIONS */}

        <section className="sessions-card">

          <div className="sessions-heading">

            <div>
              <div className="card-label">
                ACTIVE SESSIONS
              </div>

              <h2>
                Session Bot
              </h2>
            </div>

            <button
              onClick={loadStatus}
              className="refresh-button"
            >
              ↻ Refresh
            </button>

          </div>

          {sessions.length === 0 ? (

            <div className="empty-session">
              <span>◎</span>
              <p>
                Belum ada session aktif.
              </p>
            </div>

          ) : (

            <div className="session-list">

              {sessions.map(
                (session, index) => {

                  const id =
                    typeof session === "string"
                      ? session
                      : session?.id ||
                        session?.sessionId ||
                        session?.number ||
                        `session-${index}`;

                  const display =
                    typeof session === "string"
                      ? session
                      : session?.number ||
                        session?.jid ||
                        id;

                  return (
                    <div
                      className="session-item"
                      key={id}
                    >

                      <div>
                        <span className="session-dot"></span>

                        <strong>
                          {display}
                        </strong>
                      </div>

                      <button
                        onClick={() =>
                          logoutSession(session)
                        }
                      >
                        Hapus
                      </button>

                    </div>
                  );

                }
              )}

            </div>

          )}

        </section>

        {/* FEATURES */}

        <section className="mini-features">

          <div>
            <span>✓</span>
            <strong>Gratis</strong>
            <small>Tidak ada biaya bulanan</small>
          </div>

          <div>
            <span>✓</span>
            <strong>Multi Session</strong>
            <small>Kelola banyak bot</small>
          </div>

          <div>
            <span>✓</span>
            <strong>Pairing Code</strong>
            <small>Login tanpa password</small>
          </div>

          <div>
            <span>✓</span>
            <strong>Real-time</strong>
            <small>Status session langsung</small>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

// =====================================================
// RENTAL PAGE
// =====================================================

function RentalPage() {

  function order(packageName, price) {

    const text =
      `Halo DIN STORE, saya ingin menyewa SIBOT.%0A%0A` +
      `Paket: ${packageName}%0A` +
      `Harga: ${price}%0A%0A` +
      `Mohon informasi selanjutnya.`;

    window.open(
      `https://wa.me/${RENTAL_WA}?text=${text}`,
      "_blank"
    );
  }

  return (
    <>
      <Header page="sewa" />

      <main className="inner-page rental-page">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Kembali ke Beranda
        </button>

        <section className="page-heading rental-heading">

          <div className="service-badge red">
            UNTUK BISNIS
          </div>

          <h1>
            Sewa Bot WhatsApp
            <span> Siap Pakai.</span>
          </h1>

          <p>
            Fokus menjalankan bisnis, biarkan SIBOT
            membantu otomatisasi WhatsApp kamu
            selama 24 jam.
          </p>

        </section>

        {/* BENEFITS */}

        <section className="rental-benefits">

          <div>
            <span>◉</span>
            <h3>Online 24/7</h3>
            <p>
              Bot aktif sepanjang hari tanpa perlu
              menjalankan perangkat sendiri.
            </p>
          </div>

          <div>
            <span>▣</span>
            <h3>Dashboard</h3>
            <p>
              Kelola bot dan session melalui dashboard
              yang mudah digunakan.
            </p>
          </div>

          <div>
            <span>⚙</span>
            <h3>Maintenance</h3>
            <p>
              Update dan maintenance sistem dilakukan
              secara berkala.
            </p>
          </div>

          <div>
            <span>◆</span>
            <h3>Support</h3>
            <p>
              Dapatkan bantuan ketika membutuhkan
              konfigurasi atau bantuan teknis.
            </p>
          </div>

        </section>

        {/* PRICING */}

        <section className="pricing-section">

          <div className="section-heading">

            <div className="section-label">
              PILIH PAKET
            </div>

            <h2>
              Paket Sewa <span>SIBOT</span>
            </h2>

            <p>
              Harga terjangkau untuk kebutuhan
              personal maupun bisnis.
            </p>

          </div>

          <div className="pricing-grid">

            {/* STARTER */}

            <article className="pricing-card">

              <div className="pricing-name">
                STARTER
              </div>

              <p>
                Untuk kebutuhan sederhana
              </p>

              <div className="price">
                <small>Rp</small>
                15.000
                <span>/bulan</span>
              </div>

              <ul>
                <li>✓ Bot WhatsApp</li>
                <li>✓ Online 24/7</li>
                <li>✓ Fitur dasar</li>
                <li>✓ Support</li>
              </ul>

              <button
                onClick={() =>
                  order(
                    "STARTER",
                    "Rp15.000/bulan"
                  )
                }
              >
                Pilih Paket
              </button>

            </article>

            {/* BUSINESS */}

            <article className="pricing-card popular">

              <div className="popular-label">
                POPULAR
              </div>

              <div className="pricing-name">
                BUSINESS
              </div>

              <p>
                Untuk toko dan bisnis
              </p>

              <div className="price">
                <small>Rp</small>
                30.000
                <span>/bulan</span>
              </div>

              <ul>
                <li>✓ Semua fitur Starter</li>
                <li>✓ Dashboard</li>
                <li>✓ Auto Respon</li>
                <li>✓ Downloader</li>
                <li>✓ Priority Support</li>
              </ul>

              <button
                onClick={() =>
                  order(
                    "BUSINESS",
                    "Rp30.000/bulan"
                  )
                }
              >
                Pilih Paket
              </button>

            </article>

            {/* PRO */}

            <article className="pricing-card">

              <div className="pricing-name">
                PRO
              </div>

              <p>
                Untuk kebutuhan profesional
              </p>

              <div className="price">
                <small>Rp</small>
                50.000
                <span>/bulan</span>
              </div>

              <ul>
                <li>✓ Semua fitur Business</li>
                <li>✓ Multi Session</li>
                <li>✓ Fitur premium</li>
                <li>✓ Monitoring</li>
                <li>✓ Priority Support</li>
              </ul>

              <button
                onClick={() =>
                  order(
                    "PRO",
                    "Rp50.000/bulan"
                  )
                }
              >
                Pilih Paket
              </button>

            </article>

          </div>

        </section>

        {/* CUSTOM */}

        <section className="custom-package">

          <div>

            <div className="section-label">
              BUTUH LEBIH?
            </div>

            <h2>
              Paket Custom untuk Bisnis
            </h2>

            <p>
              Butuh fitur khusus, jumlah session lebih
              banyak atau konfigurasi sesuai kebutuhan?
              Hubungi kami untuk paket custom.
            </p>

          </div>

          <button
            onClick={() =>
              order(
                "CUSTOM",
                "Custom Package"
              )
            }
          >
            Hubungi Admin →
          </button>

        </section>

      </main>

      <Footer />
    </>
  );
}

// =====================================================
// PACKAGE PAGE
// =====================================================

function PackagePage() {

  return (
    <>
      <Header page="paket" />

      <main className="inner-page">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Kembali ke Beranda
        </button>

        <section className="page-heading">

          <div className="section-label">
            HARGA SIBOT
          </div>

          <h1>
            Pilih Paket
            <span> Sesuai Kebutuhan.</span>
          </h1>

          <p>
            Mulai dari bot gratis sampai paket bisnis
            profesional.
          </p>

        </section>

        <section className="package-simple-grid">

          <div
            className="package-simple free"
            onClick={() => navigate("/gratis")}
          >
            <span>GRATIS</span>
            <h2>Bot Gratis</h2>
            <strong>Rp0</strong>
            <p>
              Untuk penggunaan personal dan mencoba
              fitur SIBOT.
            </p>
            <button>
              Mulai Sekarang →
            </button>
          </div>

          <div
            className="package-simple rental"
            onClick={() => navigate("/sewa")}
          >
            <span>SEWA</span>
            <h2>Bot Bisnis</h2>
            <strong>
              Rp15K
              <small>/bulan</small>
            </strong>
            <p>
              Bot siap pakai untuk bisnis dengan
              layanan 24/7.
            </p>
            <button>
              Lihat Paket →
            </button>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

// =====================================================
// APP
// =====================================================

function App() {

  const [path, setPath] = useState(
    window.location.pathname
  );

  useEffect(() => {

    const handlePopState = () => {
      setPath(
        window.location.pathname
      );
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };

  }, []);

  // ===================================================
  // EXISTING DOCS
  // ===================================================

  if (path === "/doc") {
    return (
      <>
        <VisitorTracker />
        <Docs />
      </>
    );
  }

  // ===================================================
  // EXISTING CASE DOCS
  // ===================================================

  if (path === "/case") {
    return (
      <>
        <VisitorTracker />
        <CaseDocs />
      </>
    );
  }

  // ===================================================
  // ROUTES
  // ===================================================

  return (
    <>
      <VisitorTracker />

      {path === "/" && <HomePage />}

      {path === "/gratis" && (
        <FreeBotPage />
      )}

      {path === "/sewa" && (
        <RentalPage />
      )}

      {path === "/paket" && (
        <PackagePage />
      )}

      {![
        "/",
        "/gratis",
        "/sewa",
        "/paket",
        "/doc",
        "/case",
      ].includes(path) && (
        <HomePage />
      )}

    </>
  );
}

export default App;
