import { useState } from "react";

export default function Pairing({ API }) {
  const [number, setNumber] = useState("");
  const [pairCode, setPairCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectBot() {
    if (!number) {
      alert("Masukkan nomor WhatsApp.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/pair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number,
        }),
      });

      const data = await res.json();

      if (data.code) {
        setPairCode(data.code);
      } else {
        alert(data.message || "Gagal mendapatkan pairing code");
      }
    } catch (e) {
      alert("Server tidak dapat dihubungi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pairing-page">

      <div className="pair-card">

        <div className="pair-icon">
          📱
        </div>

        <h2>Hubungkan WhatsApp</h2>

        <p>
          Masukkan nomor WhatsApp yang akan dijadikan bot.
        </p>

        <input
          type="text"
          placeholder="628xxxxxxxxxx"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button
          className="pair-btn"
          onClick={connectBot}
          disabled={loading}
        >
          {loading ? "Menghubungkan..." : "Hubungkan WhatsApp"}
        </button>

        {pairCode && (
          <div className="pair-result">

            <span>PAIRING CODE</span>

            <h1>{pairCode}</h1>

            <button
              onClick={() => {
                navigator.clipboard.writeText(pairCode);
                alert("Pairing Code disalin");
              }}
            >
              Salin
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
