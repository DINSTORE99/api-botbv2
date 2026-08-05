import React from "react";

export default function Dashboard({
  serverOnline,
  botConnected,
  ping,
  sessions,
  lastUpdate,
  setPage,
  loadStatus,
  loading,
}) {
  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="hero-top">

        <div className="brand">

          <img src="/logo.png" alt="logo" />

          <div>
            <h2>DIN BOT</h2>
            <small>V1.0.0</small>
          </div>

        </div>

        <div className="status-pill">
          <span className="dot"></span>
          {serverOnline ? "Online" : "Offline"} | {ping} ms
        </div>

      </div>

      <h3 className="welcome">
        Selamat datang!
      </h3>

      <h1 className="title">
        WhatsApp Bot
      </h1>

      <p className="subtitle">
        Kelola koneksi WhatsApp dan perangkat bot kamu.
      </p>

      {/* ACTION */}

      <div className="action-grid">

        <button
          className="action-card"
          onClick={loadStatus}
        >

          <div className="icon purple">
            ↻
          </div>

          <div>

            <h4>Refresh</h4>

            <span>
              {loading
                ? "Memuat..."
                : "Perbarui data bot"}
            </span>

          </div>

        </button>

        <button
          className="action-card"
          onClick={() => setPage("monitor")}
        >

          <div className="icon green">
            🖥️
          </div>

          <div>

            <h4>Monitoring Server</h4>

            <span>
              Lihat status server
            </span>

          </div>

        </button>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="icon purple">
            💾
          </div>

          <span>API SERVER</span>

          <h2>
            {serverOnline ? "Online" : "Offline"}
          </h2>

          <small>
            {serverOnline
              ? "🟢 Server aktif"
              : "🔴 Server mati"}
          </small>

        </div>

        <div className="stat-card">

          <div className="icon green">
            💬
          </div>

          <span>WHATSAPP</span>

          <h2>
            {botConnected
              ? "Terhubung"
              : "Belum"}
          </h2>

          <small>
            {botConnected
              ? "🟢 Bot connected"
              : "🟡 Waiting"}
          </small>

        </div>

        <div
          className="stat-card"
          onClick={() => setPage("sessions")}
        >

          <div className="icon blue">
            👥
          </div>

          <span>SESSIONS</span>

          <h2>
            {sessions.length} Session
          </h2>

          <small>
            Perangkat terhubung
          </small>

        </div>

      </div>

      {/* CONNECT */}

      <div className="connect-card">

        <img
          src="/robot.png"
          alt="robot"
        />

        <div className="connect-right">

          <span>SIAP DIGUNAKAN</span>

          <h2>DIN BOT V1.0.0</h2>

          <p>
            Kelola Bot WhatsApp kamu dengan mudah
            dan aman.
          </p>

          <button
            className="connect-btn"
            onClick={() => setPage("pairing")}
          >
            Hubungkan WhatsApp →
          </button>

        </div>

      </div>

      {/* SYSTEM INFO */}

      <div className="info-card">

        <h3>SYSTEM INFO</h3>

        <div className="info-grid">

          <div>

            <span>Website</span>

            <strong>DIN BOT</strong>

          </div>

          <div>

            <span>Version</span>

            <strong>V1.0.0</strong>

          </div>

          <div>

            <span>Platform</span>

            <strong>WhatsApp</strong>

          </div>

          <div>

            <span>Last Update</span>

            <strong>{lastUpdate}</strong>

          </div>

        </div>

      </div>

    </div>
  );
}
