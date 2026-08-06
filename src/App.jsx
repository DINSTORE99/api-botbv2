// =====================================================
// IMPORT
// =====================================================

import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";


// =====================================================
// API CONFIG
// =====================================================

const API = import.meta.env.VITE_API_URL;


// =====================================================
// MAIN APP
// =====================================================

function App() {


// =====================================================
// PAGE STATE
// =====================================================

const [page, setPage] = useState("dashboard");


// =====================================================
// SERVER STATE
// =====================================================

const [serverOnline, setServerOnline] = useState(false);
const [botConnected, setBotConnected] = useState(false);


// =====================================================
// SESSION STATE
// =====================================================

const [sessions, setSessions] = useState([]);
const [sessionId, setSessionId] = useState("");
const [pairingCode, setPairingCode] = useState("");


// =====================================================
// FORM STATE
// =====================================================

const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);


// =====================================================
// TOAST STATE
// =====================================================

const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("success");


// =====================================================
// SERVER INFO
// =====================================================

const [stats, setStats] = useState({
  cpu: "-",
  ram: "-",
  uptime: "-",
  version: "-"
});


// =====================================================
// TOAST
// =====================================================

function showToast(text, type = "success") {

  setMessage(text);
  setMessageType(type);

  setTimeout(() => {
    setMessage("");
  }, 3000);

}


// =====================================================
// LOAD SERVER STATUS
// =====================================================

async function loadStatus() {

  try {

    const { data } = await axios.get(`${API}/api/status`);

    setServerOnline(true);

    setBotConnected(data.connected || false);

    setStats({
      cpu: data.cpu || "-",
      ram: data.ram || "-",
      uptime: data.uptime || "-",
      version: data.version || "-"
    });

  } catch (err) {

    setServerOnline(false);

  }

}


// =====================================================
// LOAD SESSION
// =====================================================

async function loadSessions() {

  try {

    const { data } = await axios.get(`${API}/api/sessions`);

    setSessions(data.sessions || []);

  } catch (err) {

    setSessions([]);

  }

}


// =====================================================
// CREATE PAIRING
// =====================================================

async function createPairing() {

  if (!phone) {

    showToast("Masukkan nomor WhatsApp", "error");

    return;

  }

  setLoading(true);

  try {

    const { data } = await axios.post(`${API}/api/pair`, {
      number: phone
    });

    setSessionId(data.sessionId);

    showToast("Membuat pairing...");

  } catch (err) {

    showToast("Gagal membuat pairing", "error");

  }

  setLoading(false);

}


// =====================================================
// LOAD PAIR CODE
// =====================================================

async function loadPairCode() {

  if (!sessionId) return;

  try {

    const { data } = await axios.get(
      `${API}/api/pairing/${sessionId}`
    );

    if (data.code) {

      setPairingCode(data.code);

    }

  } catch (err) {}

}


// =====================================================
// LOGOUT SESSION
// =====================================================

async function logoutSession(id) {

  try {

    await axios.delete(`${API}/api/logout/${id}`);

    showToast("Session berhasil dihapus");

    loadSessions();

  } catch {

    showToast("Gagal logout", "error");

  }

}
  // =====================================================
// AUTO REFRESH
// =====================================================

useEffect(() => {

  loadStatus();
  loadSessions();

  const interval = setInterval(() => {

    loadStatus();
    loadSessions();
    loadPairCode();

  }, 2000);

  return () => clearInterval(interval);

}, [sessionId]);


// =====================================================
// DASHBOARD PAGE
// =====================================================

function renderDashboard() {

  return (

    <div className="page">

      <h2>Dashboard</h2>

      <div className="grid">

        <div className="card">
          <h3>Server Status</h3>

          <span className={serverOnline ? "online" : "offline"}>
            {serverOnline ? "ONLINE" : "OFFLINE"}
          </span>

        </div>

        <div className="card">

          <h3>Bot Status</h3>

          <span className={botConnected ? "online" : "offline"}>
            {botConnected ? "CONNECTED" : "DISCONNECTED"}
          </span>

        </div>

        <div className="card">

          <h3>Total Session</h3>

          <h1>{sessions.length}</h1>

        </div>

        <div className="card">

          <h3>CPU</h3>

          <p>{stats.cpu}</p>

        </div>

        <div className="card">

          <h3>RAM</h3>

          <p>{stats.ram}</p>

        </div>

        <div className="card">

          <h3>Uptime</h3>

          <p>{stats.uptime}</p>

        </div>

      </div>

    </div>

  );

}


// =====================================================
// PAIRING PAGE
// =====================================================

function renderPairing() {

  return (

    <div className="page">

      <h2>Pair WhatsApp</h2>

      <div className="card">

        <label>Nomor WhatsApp</label>

        <input
          type="text"
          placeholder="628xxxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className="btn"
          onClick={createPairing}
          disabled={loading}
        >

          {loading ? "Loading..." : "Pair Sekarang"}

        </button>

      </div>

      <div className="card">

        <h3>Pairing Code</h3>

        <div className="pair-box">

          {pairingCode || "Menunggu Pairing..."}

        </div>

        {pairingCode && (

          <button
            className="btn"
            onClick={() => {

              navigator.clipboard.writeText(pairingCode);

              showToast("Pairing Code berhasil disalin");

            }}
          >

            Copy Pairing Code

          </button>

        )}

      </div>

    </div>

  );

}


// =====================================================
// SESSION PAGE
// =====================================================

function renderSessions() {

  return (

    <div className="page">

      <h2>Session Aktif</h2>

      <div className="session-list">

        {sessions.length === 0 && (

          <div className="card">

            Belum ada session

          </div>

        )}

        {sessions.map((item, index) => (

          <div className="card session-card" key={index}>

            <div>

              <h3>{item.id || item.sessionId}</h3>

              <small>

                {item.status || "CONNECTED"}

              </small>

            </div>

            <button
              className="logout-btn"
              onClick={() =>
                logoutSession(item.id || item.sessionId)
              }
            >

              Logout

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}


// =====================================================
// MONITOR PAGE
// =====================================================

function renderMonitor() {

  return (

    <div className="page">

      <h2>Monitor</h2>

      <div className="grid">

        <div className="card">

          <h3>API</h3>

          <p>

            {serverOnline ? "ONLINE" : "OFFLINE"}

          </p>

        </div>

        <div className="card">

          <h3>BOT</h3>

          <p>

            {botConnected ? "CONNECTED" : "DISCONNECTED"}

          </p>

        </div>

        <div className="card">

          <h3>SESSION</h3>

          <p>

            {sessions.length}

          </p>

        </div>

        <div className="card">

          <h3>UPTIME</h3>

          <p>

            {stats.uptime}

          </p>

        </div>

      </div>

    </div>

  );

}
  // =====================================================
// MAIN RENDER
// =====================================================

return (
  <div className="app">

    {/* ================= SIDEBAR ================= */}

    <aside className="sidebar">

      <div className="logo">

        <h2>🤖 DIN BOT</h2>

        <small>WhatsApp Dashboard</small>

      </div>

      <button
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        className={page === "pairing" ? "active" : ""}
        onClick={() => setPage("pairing")}
      >
        📱 Pairing
      </button>

      <button
        className={page === "sessions" ? "active" : ""}
        onClick={() => setPage("sessions")}
      >
        👥 Sessions
      </button>

      <button
        className={page === "monitor" ? "active" : ""}
        onClick={() => setPage("monitor")}
      >
        📈 Monitor
      </button>

    </aside>


    {/* ================= CONTENT ================= */}

    <main className="content">

      {/* HEADER */}

      <div className="topbar">

        <div>

          <h1>DIN BOT WEB</h1>

          <p>
            Kelola Session WhatsApp dengan mudah
          </p>

        </div>

        <div className="status-box">

          <span
            className={
              serverOnline
                ? "online"
                : "offline"
            }
          >
            {serverOnline
              ? "🟢 Server Online"
              : "🔴 Server Offline"}
          </span>

        </div>

      </div>


      {/* PAGE */}

      {page === "dashboard" && renderDashboard()}

      {page === "pairing" && renderPairing()}

      {page === "sessions" && renderSessions()}

      {page === "monitor" && renderMonitor()}

    </main>


    {/* ================= TOAST ================= */}

    {message && (

      <div className={`toast ${messageType}`}>

        {message}

      </div>

    )}

  </div>
);


// =====================================================
// EXPORT
// =====================================================

}

export default App;
