import React from "react";

export default function Monitor({
  serverOnline,
  botConnected,
  ping,
  uptime,
  lastUpdate,
  loadStatus,
  setPage,
}) {
  return (
    <div className="page-content">

      <header className="topbar">

        <div>
          <span className="eyebrow">
            DIN BOT / MONITORING
          </span>

          <h1>Monitoring Server</h1>

          <p>
            Monitoring server bot secara realtime.
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

      <section className="content-card">

        <div className="section-title">

          <div>
            <span className="eyebrow">
              API STATUS
            </span>

            <h2>Monitoring Server</h2>

            <p>
              Monitoring server bot secara realtime
            </p>
          </div>

          <div
            className={
              serverOnline
                ? "status-pill"
                : "status-pill offline"
            }
          >
            <span></span>

            {serverOnline
              ? `Online | ${ping} ms`
              : "Offline"}
          </div>

        </div>

      </section>

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon purple">
            📅
          </div>

          <div>

            <span>HARI</span>

            <h3>{uptime.hari}</h3>

            <small>UPTIME</small>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon blue">
            🕒
          </div>

          <div>

            <span>JAM</span>

            <h3>{uptime.jam}</h3>

            <small>UPTIME</small>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">
            ⏱️
          </div>

          <div>

            <span>MENIT</span>

            <h3>{uptime.menit}</h3>

            <small>UPTIME</small>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon purple">
            ⏲️
          </div>

          <div>

            <span>DETIK</span>

            <h3>{uptime.detik}</h3>

            <small>UPTIME</small>

          </div>

        </div>

      </section>

      <section className="content-card">

        <div className="section-title">

          <div>

            <span className="eyebrow">
              INFORMASI
            </span>

            <h2>Detail Server</h2>

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
            <span>Ping</span>
            <strong>{ping} ms</strong>
          </div>

          <div className="info-item">
            <span>Bot</span>
            <strong>
              {botConnected
                ? "Connected"
                : "Disconnected"}
            </strong>
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
