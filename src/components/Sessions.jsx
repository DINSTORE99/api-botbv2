import React from "react";

export default function Sessions({
  sessions = [],
  setPage,
  deleteSession,
}) {
  return (
    <div className="sessions-page">

      <div className="page-header">

        <div>
          <span className="eyebrow">
            DIN BOT / SESSIONS
          </span>

          <h1>Daftar Session</h1>

          <p>
            Semua perangkat WhatsApp yang sedang terhubung.
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => setPage("dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      {sessions.length === 0 ? (

        <div className="empty-card">

          <div className="empty-icon">
            📱
          </div>

          <h2>Belum Ada Session</h2>

          <p>
            Hubungkan WhatsApp terlebih dahulu.
          </p>

        </div>

      ) : (

        <div className="session-grid">

          {sessions.map((item, index) => (

            <div
              className="session-card"
              key={index}
            >

              <div className="session-top">

                <div className="session-avatar">
                  📱
                </div>

                <div>

                  <h3>
                    {item.name || "WhatsApp"}
                  </h3>

                  <span>
                    {item.id}
                  </span>

                </div>

              </div>

              <div className="session-status">

                <span className="online-dot"></span>

                Connected

              </div>

              <button
                className="delete-btn"
                onClick={() => deleteSession(item.id)}
              >
                Hapus Session
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
