import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBot,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiCopy,
  FiCpu,
  FiDownload,
  FiExternalLink,
  FiGamepad2,
  FiHeart,
  FiHome,
  FiImage,
  FiLayers,
  FiMenu,
  FiMessageCircle,
  FiPlay,
  FiRefreshCw,
  FiServer,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiTrash2,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

const API = "";

const RENTAL_WA = "6287776581216";

const features = [
  {
    icon: <FiMessageCircle />,
    title: "AI Chat",
    text: "Chat dengan AI langsung melalui WhatsApp.",
    blue: true,
  },
  {
    icon: <FiDownload />,
    title: "Downloader",
    text: "Download berbagai media dengan cepat.",
    blue: true,
  },
  {
    icon: <FiImage />,
    title: "Sticker Maker",
    text: "Buat sticker WhatsApp dengan mudah.",
    blue: true,
  },
  {
    icon: <FiZap />,
    title: "Auto Respon",
    text: "Otomatis membalas pesan sesuai command.",
    blue: true,
  },
  {
    icon: <FiUsers />,
    title: "Group Tools",
    text: "Kelola dan gunakan berbagai tools grup.",
    blue: true,
  },
  {
    icon: <FiSmartphone />,
    title: "Multi Device",
    text: "Support banyak session dan perangkat.",
    blue: true,
  },
];

const rentalPackages = [
  {
    name: "STARTER",
    price: "15.000",
    description: "Untuk penggunaan pribadi.",
    features: [
      "Bot WhatsApp 24/7",
      "Pairing Code",
      "Fitur dasar bot",
      "1 Session",
      "Support",
    ],
  },
  {
    name: "BUSINESS",
    price: "30.000",
    description: "Pilihan terbaik untuk bisnis.",
    popular: true,
    features: [
      "Bot WhatsApp 24/7",
      "Pairing Code",
      "Semua fitur bot",
      "Multi Session",
      "Dashboard",
      "Priority Support",
    ],
  },
  {
    name: "PRO",
    price: "50.000",
    description: "Untuk kebutuhan yang lebih besar.",
    features: [
      "Bot WhatsApp 24/7",
      "Semua fitur",
      "Multi Session",
      "Dashboard",
      "Monitoring",
      "Priority Support",
      "Custom fitur",
    ],
  },
];

function getPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

export default function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const onPop = () => setPath(getPath());

    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (url) => {
    window.history.pushState({}, "", url);
    setPath(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (path === "/doc") {
    return <DocsPage navigate={navigate} />;
  }

  if (path === "/gratis") {
    return <FreeBotPage navigate={navigate} />;
  }

  if (path === "/sewa" || path === "/paket") {
    return <RentalPage navigate={navigate} />;
  }

  return <HomePage navigate={navigate} />;
}

/* =========================================================
   HEADER
========================================================= */

function Header({ navigate }) {
  const [menu, setMenu] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <button
          className="brand"
          onClick={() => {
            navigate("/");
            setMenu(false);
          }}
        >
          <div className="brand-logo">
            <img src="/logo.png" alt="SIBOT" />
          </div>

          <div className="brand-text">
            <strong>SIBOT</strong>
            <span>WhatsApp Automation</span>
          </div>
        </button>

        <nav className={`nav-menu ${menu ? "open" : ""}`}>
          <button
            className="nav-link active"
            onClick={() => {
              navigate("/");
              setMenu(false);
            }}
          >
            Beranda
          </button>

          <button
            className="nav-link"
            onClick={() => {
              navigate("/gratis");
              setMenu(false);
            }}
          >
            Bot Gratis
          </button>

          <button
            className="nav-link"
            onClick={() => {
              navigate("/sewa");
              setMenu(false);
            }}
          >
            Sewa Bot
          </button>

          <button
            className="nav-link"
            onClick={() => {
              navigate("/paket");
              setMenu(false);
            }}
          >
            Paket
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document
                .getElementById("kontak")
                ?.scrollIntoView({ behavior: "smooth" });
              setMenu(false);
            }}
          >
            Kontak
          </button>
        </nav>

        <div className="nav-status">
          <span className="status-dot" />
          ONLINE
        </div>

        <button
          className="mobile-menu"
          onClick={() => setMenu((value) => !value)}
          aria-label="Menu"
        >
          {menu ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomePage({ navigate }) {
  return (
    <div className="app-shell">
      <Header navigate={navigate} />

      <main>
        <section className="hero">
          <div className="hero-grid container">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                WHATSAPP AUTOMATION PLATFORM
              </div>

              <h1>
                Otomatisasi
                <br />
                <span>WhatsApp</span> Tanpa Ribet.
              </h1>

              <p className="hero-description">
                Buat bot WhatsApp sendiri secara gratis atau gunakan bot
                profesional untuk kebutuhan bisnis kamu.
              </p>

              <div className="hero-buttons">
                <button
                  className="btn btn-blue"
                  onClick={() => navigate("/gratis")}
                >
                  <FiBot />
                  Mulai Bot Gratis
                  <FiArrowRight />
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/sewa")}
                >
                  Sewa Bot untuk Bisnis
                  <FiArrowRight />
                </button>
              </div>

              <div className="hero-mini-stats">
                <div>
                  <strong>FREE</strong>
                  <span>Bot Gratis</span>
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>Bot Aktif</span>
                </div>

                <div>
                  <strong>FAST</strong>
                  <span>Server Cepat</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-glow" />

              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />

              <div className="bot-orb">
                <div className="bot-ring" />

                <img src="/logo.png" alt="SIBOT" />

                <div className="bot-scan" />
              </div>

              <div className="floating-card floating-top">
                <FiShield />
                <div>
                  <strong>Secure</strong>
                  <span>Connection</span>
                </div>
              </div>

              <div className="floating-card floating-bottom">
                <FiZap />
                <div>
                  <strong>24/7</strong>
                  <span>Online Bot</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services section">
          <div className="container">
            <SectionHeading
              label="PILIH LAYANAN"
              title="Mulai dari yang"
              highlight="Kamu Butuhkan."
              text="Gunakan bot gratis atau pilih bot sewaan untuk kebutuhan bisnis."
            />

            <div className="service-grid">
              <ServiceCard
                type="free"
                icon={<FiBot />}
                label="GRATIS"
                title="Mulai Bot WhatsApp Gratis"
                text="Buat dan gunakan bot WhatsApp kamu sendiri tanpa biaya bulanan."
                list={[
                  "Pairing Code",
                  "Banyak fitur bot",
                  "Multi Session",
                  "Dashboard modern",
                ]}
                button="Mulai Sekarang"
                onClick={() => navigate("/gratis")}
              />

              <ServiceCard
                type="rental"
                icon={<FiLayers />}
                label="SEWA BOT"
                title="Sewa Bot untuk Bisnis"
                text="Bot WhatsApp siap pakai untuk membantu kebutuhan bisnis kamu 24/7."
                list={[
                  "Bot aktif 24/7",
                  "Dashboard",
                  "Support",
                  "Paket mulai Rp15K/bulan",
                ]}
                button="Lihat Paket"
                onClick={() => navigate("/sewa")}
              />
            </div>
          </div>
        </section>

        <section className="features section">
          <div className="container">
            <SectionHeading
              label="FITUR UNGGULAN"
              title="Semua yang Kamu Butuhkan"
              highlight="Dalam Satu Bot WhatsApp"
              text="Berbagai fitur siap digunakan untuk membuat aktivitas WhatsApp lebih mudah."
            />

            <div className="feature-grid">
              {features.map((item) => (
                <div className="feature-card" key={item.title}>
                  <div className="feature-icon">{item.icon}</div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  <FiArrowRight className="feature-arrow" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-glow" />

              <div className="cta-content">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  SIBOT PLATFORM
                </div>

                <h2>
                  Siap Menggunakan <span>SIBOT?</span>
                </h2>

                <p>
                  Pilih layanan yang sesuai dengan kebutuhanmu dan mulai
                  otomatisasi WhatsApp sekarang.
                </p>
              </div>

              <div className="cta-buttons">
                <button
                  className="btn btn-blue"
                  onClick={() => navigate("/gratis")}
                >
                  Bot Gratis
                  <FiArrowRight />
                </button>

                <button
                  className="btn btn-red"
                  onClick={() => navigate("/sewa")}
                >
                  Sewa Bot
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function SectionHeading({ label, title, highlight, text }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span className="eyebrow-dot" />
        {label}
      </div>

      <h2>
        {title}
        <br />
        <span>{highlight}</span>
      </h2>

      <p>{text}</p>
    </div>
  );
}

function ServiceCard({
  type,
  icon,
  label,
  title,
  text,
  list,
  button,
  onClick,
}) {
  return (
    <div className={`service-card ${type}`}>
      <div className="service-icon">{icon}</div>

      <div className="service-info">
        <div className="service-label">{label}</div>

        <h3>{title}</h3>

        <p>{text}</p>

        <div className="service-list">
          {list.map((item) => (
            <div key={item}>
              <FiCheck />
              {item}
            </div>
          ))}
        </div>

        <button className="service-button" onClick={onClick}>
          {button}
          <FiArrowRight />
        </button>
      </div>

      <div className="service-number">
        {type === "free" ? "01" : "02"}
      </div>
    </div>
  );
}

/* =========================================================
   FREE BOT
========================================================= */

function FreeBotPage({ navigate }) {
  const [number, setNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [logoutId, setLogoutId] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch(`${API}/api/status`);

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setStatus(data);

      if (Array.isArray(data.sessions)) {
        setSessions(data.sessions);
      } else if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch {
      setStatus(null);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const requestPairing = async () => {
    setError("");
    setPairingCode("");

    const cleanNumber = number.replace(/\D/g, "");

    if (!cleanNumber) {
      setError("Masukkan nomor WhatsApp terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/pair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: cleanNumber,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Gagal mendapatkan pairing code.");
      }

      const code =
        data.code ||
        data.pairingCode ||
        data.pairing ||
        data.data?.code ||
        "";

      if (!code) {
        throw new Error("Pairing code tidak ditemukan dari server.");
      }

      setPairingCode(String(code).toUpperCase());
      await loadData();
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!pairingCode) return;

    try {
      await navigator.clipboard.writeText(pairingCode);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Tidak dapat menyalin kode.");
    }
  };

  const logoutSession = async (sessionId) => {
    try {
      await fetch(`${API}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      });

      setLogoutId(null);
      await loadData();
    } catch {
      setError("Gagal menghapus session.");
    }
  };

  const online =
    status?.online ??
    status?.server ??
    status?.status === "online" ??
    true;

  return (
    <div className="app-shell">
      <Header navigate={navigate} />

      <main className="inner-page">
        <div className="container">
          <button className="back-button" onClick={() => navigate("/")}>
            <FiArrowLeft />
            Kembali ke Beranda
          </button>

          <section className="page-hero free-page-hero">
            <div className="page-badge blue-badge">
              <span />
              BOT GRATIS
            </div>

            <h1>
              Buat Bot WhatsApp
              <br />
              <span>Gratis.</span>
            </h1>

            <p>
              Hubungkan nomor WhatsApp kamu menggunakan pairing code dan
              kelola bot langsung dari SIBOT.
            </p>
          </section>

          <div className="stats-grid">
            <StatCard
              icon={<FiServer />}
              title="API SERVER"
              value={online ? "ONLINE" : "OFFLINE"}
              online={online}
            />

            <StatCard
              icon={<FiSmartphone />}
              title="WHATSAPP"
              value="SIAP PAIRING"
              online
            />

            <StatCard
              icon={<FiLayers />}
              title="SESSIONS"
              value={String(sessions.length)}
              online
            />
          </div>

          <div className="free-layout">
            <section className="pair-card">
              <div className="card-top">
                <div>
                  <div className="small-label">
                    <FiZap />
                    QUICK START
                  </div>

                  <h2>Mulai Sekarang</h2>

                  <p>
                    Masukkan nomor WhatsApp yang ingin digunakan untuk bot.
                  </p>
                </div>

                <div className="card-icon">
                  <FiSmartphone />
                </div>
              </div>

              <div className="pair-form">
                <label>Nomor WhatsApp</label>

                <div className="input-wrap">
                  <span>+</span>

                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="628xxxxxxxxxx"
                  />
                </div>

                <small>
                  Gunakan format internasional, contoh: 628123456789.
                </small>

                <button
                  className="btn btn-blue full"
                  onClick={requestPairing}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <FiZap />
                      Dapatkan Pairing Code
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="error-box">
                  <FiX />
                  {error}
                </div>
              )}

              {pairingCode && (
                <div className="pair-result">
                  <div className="result-label">
                    <span className="online-pulse" />
                    PAIRING CODE BERHASIL
                  </div>

                  <div className="pair-code">{pairingCode}</div>

                  <button className="copy-button" onClick={copyCode}>
                    {copied ? <FiCheck /> : <FiCopy />}
                    {copied ? "Tersalin" : "Salin Code"}
                  </button>

                  <div className="pair-note">
                    Buka WhatsApp → Perangkat Tertaut → Tautkan Perangkat →
                    Tautkan dengan nomor telepon.
                  </div>
                </div>
              )}
            </section>

            <section className="info-card">
              <div className="small-label">
                <FiShield />
                PRIVACY & SECURITY
              </div>

              <h2>Aman & Mudah Digunakan</h2>

              <div className="security-list">
                <SecurityItem
                  title="Tanpa Password WhatsApp"
                  text="Kamu tidak perlu memberikan password WhatsApp."
                />

                <SecurityItem
                  title="Pairing Code"
                  text="Koneksi menggunakan sistem pairing resmi."
                />

                <SecurityItem
                  title="Session Pribadi"
                  text="Session bot hanya digunakan untuk koneksi bot."
                />

                <SecurityItem
                  title="Kelola Session"
                  text="Kamu dapat menghapus session kapan saja."
                />
              </div>
            </section>
          </div>

          <section className="sessions-section">
            <div className="section-row">
              <div>
                <div className="small-label">
                  <FiLayers />
                  ACTIVE SESSIONS
                </div>

                <h2>Session Bot</h2>
              </div>

              <button className="refresh-button" onClick={loadData}>
                <FiRefreshCw />
                Refresh
              </button>
            </div>

            {sessions.length === 0 ? (
              <div className="empty-sessions">
                <FiBot />
                <strong>Belum ada session</strong>
                <span>Session bot yang aktif akan muncul di sini.</span>
              </div>
            ) : (
              <div className="session-list">
                {sessions.map((session, index) => {
                  const id =
                    session.id ||
                    session.sessionId ||
                    session.jid ||
                    session.number ||
                    index;

                  const sessionNumber =
                    session.number ||
                    session.phone ||
                    session.jid ||
                    "WhatsApp Session";

                  return (
                    <div className="session-item" key={id}>
                      <div className="session-avatar">
                        <FiSmartphone />
                      </div>

                      <div className="session-main">
                        <strong>{maskNumber(String(sessionNumber))}</strong>
                        <span>
                          <i />
                          Connected
                        </span>
                      </div>

                      <button
                        className="delete-session"
                        onClick={() => setLogoutId(id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {logoutId !== null && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <button
              className="modal-close"
              onClick={() => setLogoutId(null)}
            >
              <FiX />
            </button>

            <div className="danger-icon">
              <FiTrash2 />
            </div>

            <h3>Hapus Session?</h3>

            <p>
              Session WhatsApp ini akan diputus dari SIBOT.
            </p>

            <div className="modal-buttons">
              <button
                className="btn btn-outline"
                onClick={() => setLogoutId(null)}
              >
                Batal
              </button>

              <button
                className="btn btn-danger"
                onClick={() => logoutSession(logoutId)}
              >
                Hapus Session
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer navigate={navigate} />
    </div>
  );
}

function StatCard({ icon, title, value, online }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{title}</span>

        <strong className={online ? "green-text" : "red-text"}>
          {value}
        </strong>
      </div>
    </div>
  );
}

function SecurityItem({ title, text }) {
  return (
    <div className="security-item">
      <div className="security-check">
        <FiCheck />
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function maskNumber(value) {
  if (!value) return "Unknown";

  const clean = value.replace(/\D/g, "");

  if (clean.length <= 7) return value;

  return `${clean.slice(0, 4)}******${clean.slice(-3)}`;
}

/* =========================================================
   RENTAL
========================================================= */

function RentalPage({ navigate }) {
  const order = (pkg) => {
    const message = encodeURIComponent(
      `Halo DIN STORE, saya ingin sewa Bot WhatsApp.\n\nPaket: ${pkg}\n\nMohon informasi selanjutnya.`
    );

    if (RENTAL_WA.includes("x")) {
      alert("Silakan isi nomor WhatsApp admin di RENTAL_WA pada App.jsx.");
      return;
    }

    window.open(`https://wa.me/${RENTAL_WA}?text=${message}`, "_blank");
  };

  return (
    <div className="app-shell">
      <Header navigate={navigate} />

      <main className="inner-page rental-page">
        <div className="container">
          <button className="back-button" onClick={() => navigate("/")}>
            <FiArrowLeft />
            Kembali ke Beranda
          </button>

          <section className="page-hero rental-hero">
            <div className="page-badge red-badge">
              <span />
              UNTUK BISNIS
            </div>

            <h1>
              Sewa Bot WhatsApp
              <br />
              <span>Siap Pakai.</span>
            </h1>

            <p>
              Fokus menjalankan bisnis, biarkan SIBOT menangani otomatisasi
              WhatsApp kamu selama 24/7.
            </p>
          </section>

          <div className="business-benefits">
            <Benefit
              icon={<FiZap />}
              title="Aktif 24/7"
              text="Bot siap digunakan kapan saja."
            />

            <Benefit
              icon={<FiSettings />}
              title="Mudah Dikelola"
              text="Kelola bot dari dashboard."
            />

            <Benefit
              icon={<FiShield />}
              title="Stabil & Aman"
              text="Koneksi bot dirancang stabil."
            />

            <Benefit
              icon={<FiMessageCircle />}
              title="Support"
              text="Bantuan ketika kamu membutuhkannya."
            />
          </div>

          <section className="pricing-section">
            <div className="section-heading">
              <div className="eyebrow red-eyebrow">
                <span className="eyebrow-dot" />
                PILIH PAKET
              </div>

              <h2>
                Paket Sewa Bot
                <br />
                <span>Untuk Bisnis Kamu.</span>
              </h2>

              <p>
                Pilih paket sesuai kebutuhan. Bisa upgrade kapan saja.
              </p>
            </div>

            <div className="pricing-grid">
              {rentalPackages.map((pkg) => (
                <div
                  className={`price-card ${
                    pkg.popular ? "popular" : ""
                  }`}
                  key={pkg.name}
                >
                  {pkg.popular && (
                    <div className="popular-label">PALING POPULER</div>
                  )}

                  <div className="price-top">
                    <span>{pkg.name}</span>

                    {pkg.popular ? <FiZap /> : <FiBot />}
                  </div>

                  <h3>
                    <small>Rp</small>
                    {pkg.price}
                  </h3>

                  <div className="per-month">/ bulan</div>

                  <p className="price-description">{pkg.description}</p>

                  <div className="price-divider" />

                  <div className="price-features">
                    {pkg.features.map((feature) => (
                      <div key={feature}>
                        <FiCheck />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    className={
                      pkg.popular
                        ? "price-button popular-button"
                        : "price-button"
                    }
                    onClick={() => order(pkg.name)}
                  >
                    Pilih Paket
                    <FiArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="custom-package">
            <div>
              <div className="small-label">
                <FiMessageCircle />
                CUSTOM PACKAGE
              </div>

              <h2>Butuh paket khusus?</h2>

              <p>
                Hubungi kami jika membutuhkan fitur, kapasitas, atau
                konfigurasi khusus untuk bisnis.
              </p>
            </div>

            <button
              className="btn btn-red"
              onClick={() => order("CUSTOM")}
            >
              Hubungi Admin
              <FiExternalLink />
            </button>
          </section>
        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

/* =========================================================
   DOC
========================================================= */

function DocsPage({ navigate }) {
  return (
    <div className="app-shell">
      <Header navigate={navigate} />

      <main className="inner-page">
        <div className="container">
          <button className="back-button" onClick={() => navigate("/")}>
            <FiArrowLeft />
            Kembali
          </button>

          <section className="page-hero">
            <div className="page-badge blue-badge">
              <span />
              DOCUMENTATION
            </div>

            <h1>
              SIBOT
              <br />
              <span>Documentation.</span>
            </h1>

            <p>
              Dokumentasi dan informasi penggunaan platform SIBOT.
            </p>
          </section>

          <div className="doc-grid">
            <div className="doc-card">
              <FiBot />
              <h3>Bot Gratis</h3>
              <p>
                Gunakan pairing code untuk menghubungkan WhatsApp ke SIBOT.
              </p>
            </div>

            <div className="doc-card">
              <FiLayers />
              <h3>Multi Session</h3>
              <p>
                Kelola beberapa session bot dari satu dashboard.
              </p>
            </div>

            <div className="doc-card">
              <FiShield />
              <h3>Keamanan</h3>
              <p>
                Jangan pernah membagikan kode pairing atau data sensitif
                kepada pihak lain.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({ navigate }) {
  return (
    <footer className="footer" id="kontak">
      <div className="container footer-grid">
        <div className="footer-brand">
          <button className="brand" onClick={() => navigate("/")}>
            <div className="brand-logo">
              <img src="/logo.png" alt="SIBOT" />
            </div>

            <div className="brand-text">
              <strong>SIBOT</strong>
              <span>WhatsApp Automation</span>
            </div>
          </button>

          <p>
            Platform otomatisasi WhatsApp untuk kebutuhan pribadi maupun
            bisnis.
          </p>

          <div className="footer-status">
            <span className="status-dot" />
            All Systems Operational
          </div>
        </div>

        <div className="footer-column">
          <h4>LAYANAN</h4>

          <button onClick={() => navigate("/gratis")}>
            Bot Gratis
          </button>

          <button onClick={() => navigate("/sewa")}>
            Sewa Bot
          </button>

          <button onClick={() => navigate("/paket")}>
            Paket Sewa
          </button>
        </div>

        <div className="footer-column">
          <h4>INFORMASI</h4>

          <button onClick={() => navigate("/")}>Beranda</button>

          <button onClick={() => navigate("/doc")}>
            Dokumentasi
          </button>
        </div>

        <div className="footer-column">
          <h4>KONTAK</h4>

          <span>DIN STORE</span>
          <span>WhatsApp Support</span>
          <span>Online 24/7</span>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} SIBOT</span>
        <span>
          Powered by <strong>DIN STORE</strong>
        </span>
      </div>
    </footer>
  );
}
