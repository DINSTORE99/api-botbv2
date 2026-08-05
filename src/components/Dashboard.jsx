export default function Dashboard({
  loading,
  loadStatus,
  serverOnline,
  botConnected,
  ping,
  sessions,
  lastUpdate,
  setPage,
}) {
  return (
    <div className="page-content">

      {/* HEADER */}

      <header className="topbar">

        <div>

          <span className="eyebrow">
            PANEL BOT
          </span>

          <h1>WhatsApp Bot Dashboard</h1>

          <p>
            Kelola koneksi WhatsApp dan monitoring server
            dari satu dashboard.
          </p>

        </div>

        <div className="dashboard-buttons">

          <button
            className="refresh-button"
            onClick={loadStatus}
            disabled={loading}
          >
            {loading ? "Memuat..." : "↻ Refresh"}
          </button>

          <button
            className="monitor-button"
            onClick={() => setPage("monitor")}
          >
            📊 Monitoring
          </button>

        </div>

      </header>

      {/* STATUS */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon purple">
            ⚡
          </div>

          <div>

            <span>API SERVER</span>

            <h3>
              {serverOnline ? "Online" : "Offline"}
            </h3>

            <small
              className={
                serverOnline
                  ? "online"
                  : "offline"
              }
            >
              ● {serverOnline
                ? `${ping} ms`
                : "Server Offline"}
            </small>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">
            💬
          </div>

          <div>

            <span>WHATSAPP</span>

            <h3>
              {botConnected
                ? "Connected"
                : "Disconnected"}
            </h3>

            <small
              className={
                botConnected
                  ? "online"
                  : "offline"
              }
            >
              ● {botConnected
                ? "ACTIVE"
                : "WAITING"}
            </small>

          </div>

        </div>

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => setPage("sessions")}
        >

          <div className="stat-icon blue">
            📱
          </div>

          <div>

            <span>SESSIONS</span>

            <h3>{sessions.length}</h3>

            <small>
              Lihat Semua Session
            </small>

          </div>

        </div>

      </section>

      {/* HERO */}

      <section className="hero-card">

        <div className="hero-content">

          <span className="hero-label">
            DIN BOT V1
          </span>

          <h2>
            Kelola Bot WhatsApp Lebih Mudah
          </h2>

          <p>
            Pairing WhatsApp, monitoring server,
            melihat session aktif, dan mengelola
            bot dalam satu dashboard modern.
          </p>

          <button
            className="hero-button"
            onClick={() => setPage("pairing")}
          >
            Hubungkan WhatsApp →
          </button>

        </div>

        <div className="hero-orb">

          <div className="orb-inner">
            🤖
          </div>

        </div>

      </section>

      {/* SYSTEM */}

      <section className="content-card">

        <div className="section-title">

          <div>

            <span className="eyebrow">
              SYSTEM
            </span>

            <h2>
              Informasi Sistem
            </h2>

          </div>

          <div className="status-pill">

            <span />

            {serverOnline
              ? "ACTIVE"
              : "OFFLINE"}

          </div>

        </div>

        <div className="info-grid">

          <div className="info-item">
            <span>Website</span>
            <strong>DIN BOT</strong>
          </div>

          <div className="info-item">
            <span>Version</span>
            <strong>v1.0.0</strong>
          </div>

          <div className="info-item">
            <span>Platform</span>
            <strong>WhatsApp</strong>
          </div>

          <div className="info-item">
            <span>Last Update</span>
            <strong>{lastUpdate}</strong>
          </div>

        </div>

      </section>

    </div>
  );
}
