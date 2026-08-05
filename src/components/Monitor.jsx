export default function Monitor({
  serverOnline,
  botConnected,
  ping,
  uptime,
  lastUpdate,
  sessions,
  loadStatus,
  setPage,
}) {
  return (
    <div className="page-content">

      {/* HEADER */}

      <header className="topbar">

        <div>

          <span className="eyebrow">
            MONITORING SERVER
          </span>

          <h1>Realtime Monitoring</h1>

          <p>
            Informasi server dan bot secara realtime.
          </p>

        </div>

        <div className="dashboard-buttons">

          <button
            className="refresh-button"
            onClick={loadStatus}
          >
            ↻ Refresh
          </button>

          <button
            className="monitor-button"
            onClick={() => setPage("dashboard")}
          >
            ← Dashboard
          </button>

        </div>

      </header>

      {/* STATUS */}

      <section className="monitor-grid">

        <div className="monitor-card">

          <div className="monitor-icon">
            ⚡
          </div>

          <span>Ping</span>

          <h2>
            {serverOnline ? `${ping} ms` : "--"}
          </h2>

        </div>

        <div className="monitor-card">

          <div className="monitor-icon">
            🌐
          </div>

          <span>API Server</span>

          <h2>
            {serverOnline ? "ONLINE" : "OFFLINE"}
          </h2>

        </div>

        <div className="monitor-card">

          <div className="monitor-icon">
            🤖
          </div>

          <span>Bot Status</span>

          <h2>
            {botConnected
              ? "CONNECTED"
              : "DISCONNECTED"}
          </h2>

        </div>

        <div className="monitor-card">

          <div className="monitor-icon">
            📱
          </div>

          <span>Session</span>

          <h2>{sessions.length}</h2>

        </div>

      </section>

      {/* UPTIME */}

      <section className="content-card">

        <div className="section-title">

          <div>

            <span className="eyebrow">
              UPTIME
            </span>

            <h2>
              Lama Server Aktif
            </h2>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              📅
            </div>

            <div>

              <span>Hari</span>

              <h3>{uptime.hari}</h3>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              🕒
            </div>

            <div>

              <span>Jam</span>

              <h3>{uptime.jam}</h3>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              ⏱️
            </div>

            <div>

              <span>Menit</span>

              <h3>{uptime.menit}</h3>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              ⏲️
            </div>

            <div>

              <span>Detik</span>

              <h3>{uptime.detik}</h3>

            </div>

          </div>

        </div>

      </section>

      {/* INFORMASI */}

      <section className="content-card">

        <div className="section-title">

          <div>

            <span className="eyebrow">
              DETAIL SERVER
            </span>

            <h2>
              Informasi Sistem
            </h2>

          </div>

        </div>

        <div className="info-grid">

          <div className="info-item">
            <span>Server</span>
            <strong>
              {serverOnline ? "Online" : "Offline"}
            </strong>
          </div>

          <div className="info-item">
            <span>Bot</span>
            <strong>
              {botConnected ? "Connected" : "Disconnected"}
            </strong>
          </div>

          <div className="info-item">
            <span>Session Aktif</span>
            <strong>{sessions.length}</strong>
          </div>

          <div className="info-item">
            <span>Last Update</span>
            <
