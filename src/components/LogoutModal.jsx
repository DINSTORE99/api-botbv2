export default function LogoutModal({
  logoutTarget,
  logoutNumber,
  setLogoutNumber,
  logoutLoading,
  logoutMessage,
  closeLogoutModal,
  confirmLogout,
}) {

  if (!logoutTarget) return null;

  return (
    <div className="modal-overlay">

      <div className="logout-modal">

        <h2>Logout Session</h2>

        <p>
          Masukkan nomor WhatsApp untuk
          konfirmasi logout.
        </p>

        <strong>
          {logoutTarget.number}
        </strong>

        <input
          type="tel"
          placeholder="628xxxxxxxxxx"
          value={logoutNumber}
          onChange={(e) =>
            setLogoutNumber(e.target.value)
          }
        />

        {logoutMessage && (
          <div className="warning-box">
            {logoutMessage}
          </div>
        )}

        <div className="modal-buttons">

          <button
            className="cancel-button"
            onClick={closeLogoutModal}
            disabled={logoutLoading}
          >
            Batal
          </button>

          <button
            className="logout-button"
            onClick={confirmLogout}
            disabled={logoutLoading}
          >
            {logoutLoading
              ? "Memproses..."
              : "Logout"}
          </button>

        </div>

      </div>

    </div>
  );
}
