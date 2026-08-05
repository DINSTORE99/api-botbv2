export default function Sessions({
  sessions,
  setPage,
  loadStatus,
  openLogoutModal,
}) {
  return (
    <div className="page-content">

      {/* HEADER */}

      <header className="topbar">

        <div>

          <span className="eyebrow">
            WHATSAPP SESSIONS
          </span>

          <h1>Daftar Session</h1>

          <p>
            Semua perangkat WhatsApp yang sedang
            terhubung ke server.
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

      {sessions.length === 0 ? (

        <section className="content-card">

          <div className="empty-code">

            <div className="empty-icon">
              📱
            </div>

            <h2>Belum Ada Session</h2>

            <p>
              Belum ada perangkat WhatsApp
              yang terhubung.
            </p>

          </div>

        </section>

      ) : (

        <section className="session-grid">

          {sessions.map((session, index) => (

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
                    {session.name || "WhatsApp"}
                  </h3>

                  <small>
                    {session.number}
                  </small>

                </div>

              </div>

              <div className="session-info">

                <div>

                  <span>Status</span>

                  <strong
                    className={
                      session.connected
                        ? "online"
                        : "offline"
                    }
                  >
                    {session.connected
                      ? "Connected"
                      : "Disconnected"}
                  </strong>

                </div>

                <div>

                  <span>Session ID</span>

                  <strong>
                    {session.sessionId}
                  </strong>

                </div>

              </div>

              <button
                className="logout-button"
                onClick={() =>
                  openLogoutModal(session)
                }
              >
                Logout Session
              </button>

            </div>

          ))}

        </section>

      )}

    </div>
  );
}
