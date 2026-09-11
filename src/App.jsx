import { useEffect, useState } from "react";
import "./style.css";

import Docs from "./doc/Docs";

const API = "";

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function Logo({ small = false }) {
  return (
    <div className={`brand ${small ? "brand-small" : ""}`}>
      <div className="brand-icon">
        <span>◉</span>
      </div>

      <div className="brand-text">
        <b>SI</b>BOT
      </div>
    </div>
  );
}

function Header({ onMenu }) {
  return (
    <header className="site-header">
      <Logo />

      <div className="header-right">
        <div className="online-badge">
          <span className="online-dot"></span>
          Online 24/7
        </div>

        <button className="menu-btn" onClick={onMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="site">
      <Header onMenu={() => setMenu(!menu)} />

      {menu && (
        <div className="mobile-menu">
          <button onClick={() => navigate("/")}>Beranda</button>
          <button onClick={() => navigate("/gratis")}>Bot Gratis</button>
          <button onClick={() => navigate("/sewa")}>Sewa Bot</button>
        </div>
      )}

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              ⚡ SIBOT — BOT WHATSAPP MODERN
            </div>

            <h1>
              Otomatisasi
              <span> WhatsApp </span>
              Tanpa Ribet.
            </h1>

            <p>
              Buat bot WhatsApp sendiri secara gratis,
              atau gunakan bot siap pakai untuk kebutuhan
              bisnis dan toko online kamu.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/gratis")}
              >
                🚀 Mulai Bot Gratis
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/sewa")}
              >
                💼 Sewa Bot Bisnis
              </button>
            </div>

            <div className="trust-row">
              <span>✓ Gratis</span>
              <span>✓ Pairing Code</span>
              <span>✓ Mudah digunakan</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glow-circle"></div>

            <div className="robot-card">
              <div className="robot-face">
                <span>◠</span>
                <span>◠</span>
              </div>

              <div className="robot-mouth"></div>
            </div>

            <div className="whatsapp-bubble">
              W
            </div>

            <div className="floating-feature feature-1">
              ⚡ Auto Respon
            </div>

            <div className="floating-feature feature-2">
              ☁ Downloader
            </div>

            <div className="floating-feature feature-3">
              ✦ AI Chat
            </div>
          </div>
        </section>

        {/* PILIHAN LAYANAN */}
        <section className="choice-section">
          <div className="section-heading">
            <span>PILIH LAYANAN</span>
            <h2>Mau mulai dari mana?</h2>
            <p>
              Pilih layanan SIBOT yang sesuai dengan kebutuhan kamu.
            </p>
          </div>

          <div className="choice-grid">

            {/* FREE */}
            <article className="choice-card free-card">
              <div className="choice-icon">
                🤖
              </div>

              <div className="choice-content">
                <span className="choice-label blue">
                  GRATIS
                </span>

                <h3>
                  Mulai Bot <em>Gratis</em>
                </h3>

                <p>
                  Buat dan hubungkan bot WhatsApp kamu
                  sendiri tanpa biaya.
                </p>

                <ul>
                  <li>✓ Pairing Code</li>
                  <li>✓ Banyak fitur bot</li>
                  <li>✓ Kelola session</li>
                  <li>✓ Gratis</li>
                </ul>

                <button
                  className="choice-btn blue-btn"
                  onClick={() => navigate("/gratis")}
                >
                  Mulai Gratis
                  <span>→</span>
                </button>
              </div>
            </article>

            {/* RENT */}
            <article className="choice-card rent-card">
              <div className="choice-icon rent-icon">
                💼
              </div>

              <div className="choice-content">
                <span className="choice-label red">
                  UNTUK BISNIS
                </span>

                <h3>
                  Sewa Bot untuk <em>Bisnis</em>
                </h3>

                <p>
                  Bot siap digunakan untuk toko,
                  UMKM, customer service dan bisnis.
                </p>

                <ul>
                  <li>✓ Bot berjalan 24/7</li>
                  <li>✓ Tidak perlu setup sendiri</li>
                  <li>✓ Dashboard & monitoring</li>
                  <li>✓ Support</li>
                </ul>

                <button
                  className="choice-btn red-btn"
                  onClick={() => navigate("/sewa")}
                >
                  Lihat Paket
                  <span>→</span>
                </button>
              </div>
            </article>

          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <div className="section-heading">
            <span>FITUR UNGGULAN</span>

            <h2>
              Semua yang kamu butuhkan
              <br />
              <strong>Dalam satu bot WhatsApp</strong>
            </h2>
          </div>

          <div className="feature-grid">
            <Feature
              icon="✦"
              title="AI Chat"
              text="Chat pintar dengan teknologi AI."
            />

            <Feature
              icon="↓"
              title="Downloader"
              text="Download video, foto, audio dan lainnya."
            />

            <Feature
              icon="☺"
              title="Sticker Maker"
              text="Buat sticker WhatsApp dengan mudah."
            />

            <Feature
              icon="⚡"
              title="Auto Respon"
              text="Balas pesan otomatis 24 jam."
            />

            <Feature
              icon="♟"
              title="Group Tools"
              text="Kelola grup WhatsApp dengan lebih mudah."
            />

            <Feature
              icon="▣"
              title="Multi Device"
              text="Gunakan bot pada banyak perangkat."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bottom-cta">
          <div>
            <span>🚀</span>

            <div>
              <h3>Siap menggunakan SIBOT?</h3>
              <p>
                Pilih layanan yang sesuai dengan kebutuhanmu.
              </p>
            </div>
          </div>

          <button onClick={() => navigate("/gratis")}>
            Mulai Sekarang →
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Logo small />

      <div className="footer-links">
        <button onClick={() => navigate("/")}>Beranda</button>
        <button onClick={() => navigate("/gratis")}>Bot Gratis</button>
        <button onClick={() => navigate("/sewa")}>Paket</button>
      </div>

      <p>
        Powered by <strong>♥ DIN STORE</strong>
      </p>
    </footer>
  );
}

/* =====================================================
   HALAMAN SEWA BOT
===================================================== */

function RentalPage() {
  const plans = [
    {
      name: "STARTER",
      price: "15.000",
      desc: "Untuk kebutuhan pribadi dan bisnis kecil.",
      features: [
        "1 Bot WhatsApp",
        "Bot aktif 24/7",
        "Auto Respon",
        "Menu Bot",
        "Downloader",
        "Support",
      ],
    },
    {
      name: "BUSINESS",
      price: "30.000",
      desc: "Cocok untuk toko online dan UMKM.",
      popular: true,
      features: [
        "1 Bot WhatsApp",
        "Bot aktif 24/7",
        "Semua fitur Starter",
        "AI Chat",
        "Group Tools",
        "Dashboard",
        "Monitoring",
        "Priority Support",
      ],
    },
    {
      name: "PRO",
      price: "50.000",
      desc: "Untuk bisnis dengan kebutuhan lebih besar.",
      features: [
        "Bot WhatsApp 24/7",
        "Semua fitur Business",
        "Multi Session",
        "Advanced Tools",
        "Monitoring penuh",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="site">
      <Header onMenu={() => navigate("/")} />

      <main className="inner-page">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Kembali
        </button>

        <div className="inner-heading">
          <span>💼 SIBOT BUSINESS</span>

          <h1>
            Sewa Bot untuk
            <strong> Bisnis</strong>
          </h1>

          <p>
            Bot WhatsApp siap pakai untuk membantu
            mengelola pelanggan, toko dan bisnis kamu.
          </p>
        </div>

        <div className="business-benefits">
          <Benefit icon="⚡" text="Aktif 24/7" />
          <Benefit icon="☁" text="Server dikelola kami" />
          <Benefit icon="🛡" text="Support" />
          <Benefit icon="📊" text="Monitoring" />
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              className={`pricing-card ${
                plan.popular ? "popular" : ""
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="popular-label">
                  PALING POPULER
                </div>
              )}

              <span className="plan-name">
                {plan.name}
              </span>

              <h2>
                <small>Rp</small>
                {plan.price}
                <span>/bulan</span>
              </h2>

              <p className="plan-desc">
                {plan.desc}
              </p>

              <div className="plan-line"></div>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="plan-btn"
                onClick={() =>
                  window.open(
                    "https://wa.me/628384375",
                    "_blank"
                  )
                }
              >
                Sewa Paket →
              </button>
            </div>
          ))}
        </div>

        <div className="business-note">
          <strong>Butuh paket khusus?</strong>

          <p>
            Hubungi admin untuk kebutuhan bot bisnis,
            custom fitur atau jumlah bot lebih banyak.
          </p>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/628384375",
                "_blank"
              )
            }
          >
            Hubungi Admin
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Benefit({ icon, text }) {
  return (
    <div className="benefit">
      <span>{icon}</span>
      {text}
    </div>
  );
}

/* =====================================================
   BOT GRATIS
===================================================== */

function FreeBotPage() {
  const [page, setPage] = useState("dashboard");

  const [serverOnline, setServerOnline] =
    useState(true);

  const [botConnected, setBotConnected] =
    useState(false);

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [pairingCode, setPairingCode] =
    useState("");

  const [pairingLoading, setPairingLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [logoutTarget, setLogoutTarget] =
    useState(null);

  const [logoutNumber, setLogoutNumber] =
    useState("");

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const normalizeNumber = (number) => {
    let value = String(number || "")
      .replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = "62" + value.substring(1);
    }

    if (value.startsWith("8")) {
      value = "62" + value;
    }

    return value;
  };

  const maskNumber = (number) => {
    if (!number) return "-";

    const value = String(number);

    if (value.length <= 4) return value;

    return (
      value.substring(0, 5) +
      "*".repeat(
        Math.max(2, value.length - 7)
      ) +
      value.substring(value.length - 2)
    );
  };

  const loadStatus = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/api/status`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setServerOnline(
        data.success === true ||
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
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

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

      const response = await fetch(
        `${API}/api/pair`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ number }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        showMessage(
          data.message ||
          "Gagal memulai pairing."
        );
        return;
      }

      if (data.pairingCode) {
        setPairingCode(
          data.pairingCode
        );

        showMessage(
          "Kode pairing berhasil dibuat!"
        );
      }

      loadStatus();
    } catch {
      showMessage(
        "Tidak dapat menghubungi server API."
      );
    } finally {
      setPairingLoading(false);
    }
  };

  const copyPairingCode = async () => {
    if (!pairingCode) return;

    await navigator.clipboard.writeText(
      pairingCode
    );

    setCopied(true);

    showMessage(
      "Kode pairing berhasil disalin."
    );

    setTimeout(
      () => setCopied(false),
      2500
    );
  };

  const confirmLogout = async () => {
    if (!logoutTarget) return;

    const input =
      normalizeNumber(logoutNumber);

    const target =
      normalizeNumber(
        logoutTarget.number ||
        logoutTarget.sessionId
      );

    if (!input) {
      showMessage(
        "Masukkan nomor WhatsApp lengkap."
      );
      return;
    }

    if (input !== target) {
      showMessage(
        "Nomor tidak cocok dengan sesi."
      );
      return;
    }

    try {
      setLogoutLoading(true);

      const response = await fetch(
        `${API}/api/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            sessionId:
              logoutTarget.sessionId ||
              logoutTarget,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setLogoutTarget(null);
        setLogoutNumber("");

        showMessage(
          "Sesi berhasil dihapus."
        );

        loadStatus();
      } else {
        showMessage(
          data.message ||
          "Gagal logout sesi."
        );
      }
    } catch {
      showMessage(
        "Gagal menghubungi server API."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="site">
      {message && (
        <div className="toast">
          {message}
        </div>
      )}

      <header className="bot-header">
        <button
          className="back-mini"
          onClick={() => navigate("/")}
        >
          ←
        </button>

        <Logo small />

        <div className="bot-online">
          <span></span>
          {serverOnline
            ? "Online"
            : "Offline"}
        </div>
      </header>

      <main className="free-panel">

        <div className="free-title">
          <span>🆓 SIBOT GRATIS</span>

          <h1>
            Buat Bot WhatsApp
            <strong> Gratis.</strong>
          </h1>

          <p>
            Hubungkan WhatsApp kamu menggunakan
            pairing code dan mulai menggunakan bot.
          </p>
        </div>

        {page === "dashboard" && (
          <>
            <div className="free-stats">
              <div>
                <span>API SERVER</span>
                <strong>
                  {serverOnline
                    ? "ONLINE"
                    : "OFFLINE"}
                </strong>
              </div>

              <div>
                <span>WHATSAPP</span>
                <strong>
                  {botConnected
                    ? "TERHUBUNG"
                    : "SIAP PAIRING"}
                </strong>
              </div>

              <div
                onClick={() =>
                  setPage("sessions")
                }
              >
                <span>SESSIONS</span>
                <strong>
                  {sessions.length}
                </strong>
              </div>
            </div>

            <div className="free-hero">
              <span>BOT WHATSAPP GRATIS</span>

              <h2>
                Mulai buat bot kamu
                sekarang.
              </h2>

              <p>
                Tidak perlu bayar.
                Hubungkan WhatsApp
                dengan pairing code.
              </p>

              <button
                onClick={() =>
                  setPage("pairing")
                }
              >
                Hubungkan WhatsApp →
              </button>
            </div>

            <div className="free-feature-list">
              <FreeFeature
                icon="⚡"
                title="Auto Respon"
              />

              <FreeFeature
                icon="↓"
                title="Downloader"
              />

              <FreeFeature
                icon="✦"
                title="AI Chat"
              />

              <FreeFeature
                icon="☺"
                title="Sticker Maker"
              />
            </div>
          </>
        )}

        {page === "pairing" && (
          <div className="pairing-panel">

            <button
              className="panel-back"
              onClick={() =>
                setPage("dashboard")
              }
            >
              ← Kembali
            </button>

            <div className="pairing-icon">
              W
            </div>

            <span>
              CONNECT WHATSAPP
            </span>

            <h2>
              Hubungkan WhatsApp
            </h2>

            <p>
              Masukkan nomor WhatsApp
              yang ingin digunakan sebagai bot.
            </p>

            <label>
              Nomor WhatsApp
            </label>

            <div className="phone-input">
              <span>+62</span>

              <input
                type="tel"
                placeholder="81234567890"
                value={phoneNumber.replace(
                  /^62/,
                  ""
                )}
                onChange={(e) =>
                  setPhoneNumber(
                    "62" +
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                disabled={pairingLoading}
              />
            </div>

            <button
              className="pair-btn"
              onClick={startPairing}
              disabled={pairingLoading}
            >
              {pairingLoading
                ? "Memproses..."
                : "Dapatkan Pairing Code"}
            </button>

            {pairingCode && (
              <div className="pair-result">
                <span>
                  KODE PAIRING
                </span>

                <div>
                  <strong>
                    {pairingCode}
                  </strong>

                  <button
                    onClick={
                      copyPairingCode
                    }
                  >
                    {copied
                      ? "✓"
                      : "Salin"}
                  </button>
                </div>

                <ol>
                  <li>
                    Buka WhatsApp.
                  </li>

                  <li>
                    Masuk ke
                    Perangkat Tertaut.
                  </li>

                  <li>
                    Pilih Tautkan Perangkat.
                  </li>

                  <li>
                    Gunakan kode pairing
                    di atas.
                  </li>
                </ol>
              </div>
            )}
          </div>
        )}

        {page === "sessions" && (
          <div className="session-panel">

            <button
              className="panel-back"
              onClick={() =>
                setPage("dashboard")
              }
            >
              ← Kembali
            </button>

            <h2>
              Session Bot
            </h2>

            <p>
              Perangkat WhatsApp yang
              sedang terhubung.
            </p>

            <button
              className="refresh"
              onClick={loadStatus}
            >
              {loading
                ? "Memuat..."
                : "↻ Refresh"}
            </button>

            {sessions.length === 0 ? (
              <div className="empty">
                Belum ada session aktif.
              </div>
            ) : (
              sessions.map(
                (sess, index) => {
                  const raw =
                    sess.sessionId ||
                    sess;

                  return (
                    <div
                      className="session-card"
                      key={index}
                    >
                      <div>
                        <span>
                          SESSION
                        </span>

                        <strong>
                          {maskNumber(raw)}
                        </strong>

                        <small>
                          ● TERHUBUNG
                        </small>
                      </div>

                      <button
                        onClick={() =>
                          setLogoutTarget(
                            sess
                          )
                        }
                      >
                        Hapus
                      </button>
                    </div>
                  );
                }
              )
            )}
          </div>
        )}

        {logoutTarget && (
          <div className="modal">
            <div className="modal-box">
              <h3>
                Hapus Session?
              </h3>

              <p>
                Masukkan nomor WhatsApp
                untuk mengonfirmasi.
              </p>

              <div className="phone-input">
                <span>+62</span>

                <input
                  type="tel"
                  placeholder="81234567890"
                  value={logoutNumber.replace(
                    /^62/,
                    ""
                  )}
                  onChange={(e) =>
                    setLogoutNumber(
                      "62" +
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />
              </div>

              <div className="modal-buttons">
                <button
                  onClick={() =>
                    setLogoutTarget(null)
                  }
                >
                  Batal
                </button>

                <button
                  className="danger"
                  onClick={confirmLogout}
                >
                  {logoutLoading
                    ? "Memproses..."
                    : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function FreeFeature({ icon, title }) {
  return (
    <div>
      <span>{icon}</span>
      <strong>{title}</strong>
    </div>
  );
}

/* =====================================================
   ROUTER SEDERHANA
===================================================== */

function App() {
  const [path, setPath] =
    useState(window.location.pathname);

  useEffect(() => {
    const update = () =>
      setPath(window.location.pathname);

    window.addEventListener(
      "popstate",
      update
    );

    return () =>
      window.removeEventListener(
        "popstate",
        update
      );
  }, []);

  if (path === "/doc") {
    return <Docs />;
  }

  if (path === "/gratis") {
    return <FreeBotPage />;
  }

  if (path === "/sewa") {
    return <RentalPage />;
  }

  return <Home />;
}

export default App;
