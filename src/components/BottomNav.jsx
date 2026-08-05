export default function BottomNav({
  page,
  setPage,
  loadStatus,
}) {
  return (
    <nav className="bottom-nav">

      <button
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        <span>🏠</span>
        <small>Home</small>
      </button>

      <button
        className={page === "monitor" ? "active" : ""}
        onClick={() => {
          loadStatus();
          setPage("monitor");
        }}
      >
        <span>📊</span>
        <small>Monitor</small>
      </button>

      <button
        className={page === "pairing" ? "active" : ""}
        onClick={() => setPage("pairing")}
      >
        <span>🔗</span>
        <small>Pairing</small>
      </button>

      <button
        className={page === "sessions" ? "active" : ""}
        onClick={() => {
          loadStatus();
          setPage("sessions");
        }}
      >
        <span>📱</span>
        <small>Sessions</small>
      </button>

    </nav>
  );
}
