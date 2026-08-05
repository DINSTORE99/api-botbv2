import React from "react";

export default function BottomNav({
  page,
  setPage,
}) {
  return (
    <nav className="bottom-nav">

      <button
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        <span className="nav-icon">🏠</span>
        <span>Dashboard</span>
      </button>

      <button
        className={page === "pairing" ? "active" : ""}
        onClick={() => setPage("pairing")}
      >
        <span className="nav-icon">＋</span>
        <span>Pairing</span>
      </button>

      <button
        className={page === "sessions" ? "active" : ""}
        onClick={() => setPage("sessions")}
      >
        <span className="nav-icon">👥</span>
        <span>Sessions</span>
      </button>

    </nav>
  );
}
