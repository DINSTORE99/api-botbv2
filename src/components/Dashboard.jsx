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

<section className="hero">

  <span className="hero-subtitle">
    Selamat datang!
  </span>

  <h1>
    WhatsApp Bot
  </h1>

  <p>
    Kelola koneksi WhatsApp dan perangkat bot kamu.
  </p>

</section>

{/* ACTION */}

<section className="action-grid">

  <button
    className="action-card"
    onClick={loadStatus}
  >
    <div className="action-icon purple">
      ↻
    </div>

    <div className="action-text">
      <h3>Refresh</h3>
      <p>Perbarui data bot</p>
    </div>
  </button>

  <button
    className="action-card"
    onClick={() => navigate("/monitor")}
  >
    <div className="action-icon green">
      🖥️
    </div>

    <div className="action-text">
      <h3>Monitoring Server</h3>
      <p>Lihat status server</p>
    </div>

    <span className="arrow">
      ›
    </span>
  </button>

</section>        

 <section className="stats-grid">

  <div className="stat-card">

    <div className="stat-icon purple">
      🗄️
    </div>

    <span className="title">
      API SERVER
    </span>

    <h3 className={serverOnline ? "green" : "red"}>
      {serverOnline ? "Online" : "Offline"}
    </h3>

    <small>
      ● {serverOnline ? "Server aktif" : "Server mati"}
    </small>

  </div>

  <div className="stat-card">

    <div className="stat-icon green">
      💬
    </div>

    <span className="title">
      WHATSAPP
    </span>

    <h3 className={botConnected ? "green" : "orange"}>
      {botConnected ? "Terhubung" : "Menunggu"}
    </h3>

    <small>
      ● {botConnected ? "Bot connected" : "Waiting"}
    </small>

  </div>

  <div
    className="stat-card"
    onClick={() => navigate("/sessions")}
  >

    <div className="stat-icon blue">
      👥
    </div>

    <span className="title">
      SESSIONS
    </span>

    <h3 className="blue">
      {sessions.length} Session
    </h3>

    <small>
      Perangkat terhubung
    </small>

  </div>

</section>     

 <section className="hero-card">

  <div className="hero-left">

    <span className="hero-badge">
      DIN BOT v1.0
    </span>

    <h2>
      Kelola Bot WhatsApp
      <br />
      dengan Mudah
    </h2>

    <p>
      Hubungkan perangkat WhatsApp menggunakan Pairing Code,
      pantau status server secara realtime,
      dan kelola semua session dalam satu dashboard modern.
    </p>

    <button
      className="hero-button"
      onClick={() => navigate("/pairing")}
    >
      Hubungkan WhatsApp →
    </button>

  </div>

  <div className="hero-right">

    <div className="robot-glow"></div>

    <img
      src="/robot.png"
      alt="Robot"
      className="robot-image"
    />

  </div>

</section>     

   <section className="system-card">

  <div className="section-header">

    <div>

      <small>SYSTEM</small>

      <h2>Informasi Sistem</h2>

    </div>

    <span className="status-online">
      ● ACTIVE
    </span>

  </div>

  <div className="system-grid">

    <div className="system-item">
      <span>Website</span>
      <strong>DIN BOT</strong>
    </div>

    <div className="system-item">
      <span>Version</span>
      <strong>v1.0.0</strong>
    </div>

    <div className="system-item">
      <span>Platform</span>
      <strong>WhatsApp</strong>
    </div>

    <div className="system-item">
      <span>Last Update</span>
      <strong>{lastUpdate}</strong>
    </div>

  </div>

</section>   
      
    </div>
);
}

export default Dashboard;
