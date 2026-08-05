export default function Pairing({
  phoneNumber,
  setPhoneNumber,
  pairingLoading,
  pairingCode,
  pairingSession,
  copied,
  serverOnline,
  startPairing,
  copyPairingCode,
  setPage,
}) {
  return (
    <div className="page-content">

      {/* HEADER */}

      <header className="topbar">

        <div>

          <span className="eyebrow">
            PAIRING WHATSAPP
          </span>

          <h1>Hubungkan WhatsApp</h1>

          <p>
            Masukkan nomor WhatsApp untuk mendapatkan
            Pairing Code.
          </p>

        </div>

        <div className="dashboard-buttons">

          <button
            className="monitor-button"
            onClick={() => setPage("dashboard")}
          >
            ← Dashboard
          </button>

        </div>

      </header>

      <section className="pairing-layout">

        {/* INPUT */}

        <div className="content-card">

          <div className="section-title">

            <div>

              <span className="eyebrow">
                LANGKAH 1
              </span>

              <h2>Nomor WhatsApp</h2>

            </div>

          </div>

          <div className="phone-form">

            <label>Nomor WhatsApp</label>

            <div className="phone-input">

              <div className="country-code">
                +62
              </div>

              <input
                type="tel"
                placeholder="81234567890"
                value={phoneNumber.replace(/^62/, "")}
                onChange={(e) => {

                  const value = e.target.value.replace(/\D/g, "");

                  setPhoneNumber("62" + value);

                }}
              />

            </div>

            <button
              className="pair-button"
              onClick={startPairing}
              disabled={pairingLoading || !serverOnline}
            >
              {pairingLoading
                ? "Memproses..."
                : "Hubungkan WhatsApp"}
            </button>

          </div>

        </div>

        {/* HASIL */}

        <div className="content-card">

          <div className="section-title">

            <div>

              <span className="eyebrow">
                LANGKAH 2
              </span>

              <h2>Pairing Code</h2>

            </div>

          </div>

          {!pairingCode ? (

            <div className="empty-code">

              <div className="empty-icon">
                📱
              </div>

              <h3>
                Belum Ada Pairing Code
              </h3>

              <p>
                Masukkan nomor WhatsApp kemudian
                tekan tombol Hubungkan WhatsApp.
              </p>

            </div>

          ) : (

            <div className="code-result">

              <div className="success-icon">
                ✅
              </div>

              <h1>{pairingCode}</h1>

              <p>
                Pairing Code berhasil dibuat.
              </p>

              <small>
                Session ID
                <br />
                {pairingSession}
              </small>

              <button
                className="pair-button"
                onClick={copyPairingCode}
              >
                {copied
                  ? "✔ Berhasil Disalin"
                  : "📋 Salin Pairing Code"}
              </button>

            </div>

          )}

        </div>

      </section>

      {/* PANDUAN */}

      <section className="content-card">

        <div className="section-title">

          <div>

            <span className="eyebrow">
              PANDUAN
            </span>

            <h2>Cara Pairing</h2>

          </div>

        </div>

        <div className="info-grid">

          <div className="info-item">
            <span>1</span>
            <strong>Masukkan Nomor WhatsApp</strong>
          </div>

          <div className="info-item">
            <span>2</span>
            <strong>Klik Hubungkan WhatsApp</strong>
          </div>

          <div className="info-item">
            <span>3</span>
            <strong>Masukkan Pairing Code</strong>
          </div>

          <div className="info-item">
            <span>4</span>
            <strong>Tunggu Hingga Connected</strong>
          </div>

        </div>

      </section>

    </div>
  );
}
