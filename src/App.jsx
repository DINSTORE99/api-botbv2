import React, { useEffect, useState } from "react";
import { 
  RefreshCcw, Monitor, Server, MessageCircle, Users, 
  Bot, Info, Globe, Tag, Layers, Clock, Home, Plus, Circle, ChevronRight, Copy, Trash2
} from "lucide-react";
import "./style.css";

const API = "";
const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";

/* =========================
   TELEGRAM OPEN NOTIF
========================= */
function sendOpenNotif() {
  const info = getBrowserInfo();
  const message = `
🌐 WEBSITE dinbot DIBUKA 
📱 Device: ${info.device}
🌍 Browser: ${info.browser}
⏰ Waktu: ${new Date().toLocaleString()}
🔗 URL: ${window.location.href}
  `;
  
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT,
        text: message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Telegram OK:", data))
    .catch(err => console.log("Telegram ERROR:", err));
}

/* =========================
   DEVICE INFO
========================= */
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";
  
  let device = "Unknown";
  if (ua.includes("Android")) device = "Android";
  else if (ua.includes("iPhone")) device = "iPhone";
  else if (ua.includes("Windows")) device = "Windows";
  else if (ua.includes("Linux")) device = "Linux";
  
  return { browser, device };
}

export default function App() {
  // =====================================================
  // AUTO SEND SAAT WEB OPEN & MUSIC
  // =====================================================
  useEffect(() => {
    sendOpenNotif();

    const audio = new Audio("/musik.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    const playMusic = () => {
      audio.play().catch(() => {});
    };

    playMusic();
    document.addEventListener("click", playMusic, { once: true });
    document.addEventListener("touchstart", playMusic, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", playMusic);
      document.removeEventListener("touchstart", playMusic);
    };
  }, []);

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const [page, setPage] = useState("dashboard");
  const [serverOnline, setServerOnline] = useState(false);
  const [botConnected, setBotConnected] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [lastUpdate, setLastUpdate] = useState("-");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pairingCode, setPairingCode] = useState("");
  const [pairingSession, setPairingSession] = useState("");
  const [pairingLoading, setPairingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [logoutTarget, setLogoutTarget] = useState(null);
  const [logoutNumber, setLogoutNumber] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");

  // =====================================================
  // HELPERS
  // =====================================================
  const normalizeNumber = (number) => {
    let value = String(number || "").replace(/\D/g, "");
    if (value.startsWith("0")) value = "62" + value.substring(1);
    if (value.startsWith("8")) value = "62" + value;
    return value;
  };

  const maskNumber = (number) => {
    if (!number) return "-";
    const value = String(number);
    if (value.length <= 4) return value;
    return value.substring(0, 2) + "*".repeat(Math.max(1, value.length - 4)) + value.substring(value.length - 2);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  // =====================================================
  // API CALLS
  // =====================================================
  const loadStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/status`, { method: "GET", cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      setServerOnline(data.success === true && data.server === "online");
      setBotConnected(data.botConnected === true);
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      setLastUpdate(new Date().toLocaleTimeString("id-ID"));
    } catch (error) {
      setServerOnline(false);
      setBotConnected(false);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    const timer = setInterval(() => loadStatus(), 5000);
    return () => clearInterval(timer);
  }, []);

  const startPairing = async () => {
    if (!phoneNumber.trim()) return showMessage("Masukkan nomor WhatsApp terlebih dahulu.");
    const number = normalizeNumber(phoneNumber);
    if (!number || number.length < 10) return showMessage("Nomor WhatsApp tidak valid.");

    try {
      setPairingLoading(true);
      setPairingCode("");
      setPairingSession("");
      setCopied(false);
      showMessage("Menghubungkan ke server...");

      const response = await fetch(`${API}/api/pair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      const data = await response.json();

      if (!data.success) return showMessage(data.message || "Gagal memulai pairing.");

      const sessionId = data.sessionId || number;
      setPairingSession(sessionId);

      if (data.pairingCode) {
        setPairingCode(data.pairingCode);
        return showMessage("Kode pairing berhasil dibuat.");
      }

      showMessage("Menunggu kode pairing...");
      let attempts = 0;
      const timer = setInterval(async () => {
        attempts++;
        try {
          const res = await fetch(`${API}/api/pairing/${encodeURIComponent(sessionId)}`, { cache: "no-store" });
          const result = await res.json();

          if (result.code) {
            setPairingCode(result.code);
            showMessage("Kode pairing berhasil dibuat.");
            clearInterval(timer);
          }

          if (result.connected === true) {
            setBotConnected(true);
            showMessage("WhatsApp berhasil terhubung.");
            clearInterval(timer);
            loadStatus();
          }

          if (attempts >= 30) {
            clearInterval(timer);
            if (!result.code) showMessage("Waktu menunggu pairing habis.");
          }
        } catch (error) {
          console.error("PAIRING CHECK ERROR:", error);
        }
      }, 2000);
    } catch (error) {
      showMessage("Tidak dapat menghubungi server API.");
    } finally {
      setPairingLoading(false);
    }
  };

  const copyPairingCode = async () => {
    if (!pairingCode) return;
    try {
      await navigator.clipboard.writeText(pairingCode);
      setCopied(true);
      showMessage("Kode pairing berhasil disalin.");
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      showMessage("Gagal menyalin kode pairing.");
    }
  };

  const openLogoutModal = (session) => {
    setLogoutTarget(session);
    setLogoutNumber("");
    setLogoutMessage("");
  };

  const closeLogoutModal = () => {
    if (logoutLoading) return;
    setLogoutTarget(null);
    setLogoutNumber("");
    setLogoutMessage("");
  };

  const confirmLogout = async () => {
    if (!logoutTarget) return;
    const input = normalizeNumber(logoutNumber);
    const target = normalizeNumber(logoutTarget.number || logoutTarget.sessionId);

    if (!input) return setLogoutMessage("Masukkan nomor WhatsApp lengkap.");
    if (input !== target) return setLogoutMessage("Nomor tidak cocok dengan sesi.");

    try {
      setLogoutLoading(true);
      setLogoutMessage("");
      const response = await fetch(`${API}/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: logoutTarget.sessionId }),
      });
      const data = await response.json();

      if (!data.success) return setLogoutMessage(data.message || "Gagal logout sesi.");

      setLogoutTarget(null);
      setLogoutNumber("");
      showMessage("Sesi berhasil dihapus.");
      await loadStatus();
    } catch (error) {
      setLogoutMessage("Gagal menghubungi server API.");
    } finally {
      setLogoutLoading(false);
    }
  };

  // =====================================================
  // RENDER UI DASHBOARD (Sesuai Foto)
  // =====================================================
  const renderDashboard = () => (
    <div className="animate-fade-in">
      <section className="px-5 mt-2">
        <h2 className="text-indigo-400 font-semibold text-sm">Selamat datang!</h2>
        <h1 className="text-3xl font-bold mt-1">WhatsApp Bot</h1>
        <p className="text-gray-400 text-sm mt-2">Kelola koneksi WhatsApp dan perangkat bot kamu.</p>
      </section>

      <section className="px-5 mt-6 grid grid-cols-2 gap-4">
        <div onClick={loadStatus} className="bg-[#151822] border border-gray-800 rounded-2xl p-4 flex items-center gap-3 hover:bg-[#1A1D29] cursor-pointer transition">
          <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-500">
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Refresh</h3>
            <p className="text-gray-500 text-xs">Perbarui data bot</p>
          </div>
        </div>
        
        <div className="bg-[#151822] border border-gray-800 rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A1D29] cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <Monitor size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Monitoring Server</h3>
              <p className="text-gray-500 text-xs">Lihat status server</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </div>
      </section>

      <section className="px-5 mt-4 grid grid-cols-3 gap-3">
        <div className="bg-[#151822] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-500 mb-3">
            <Server size={20} />
          </div>
          <p className="text-[10px] text-gray-500 font-semibold mb-1 uppercase">API SERVER</p>
          <h3 className={`${serverOnline ? "text-green-500" : "text-red-500"} font-bold text-lg`}>
            {serverOnline ? "Online" : "Offline"}
          </h3>
          <div className="flex items-center gap-1 mt-2">
            <div className={`w-1.5 h-1.5 ${serverOnline ? "bg-green-500" : "bg-red-500"} rounded-full`}></div>
            <p className="text-[10px] text-gray-400">Server {serverOnline ? "aktif" : "mati"}</p>
          </div>
        </div>

        <div className="bg-[#151822] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-3">
            <MessageCircle size={20} />
          </div>
          <p className="text-[10px] text-gray-500 font-semibold mb-1 uppercase">WHATSAPP</p>
          <h3 className={`${botConnected ? "text-green-500" : "text-yellow-500"} font-bold text-lg`}>
            {botConnected ? "Terhubung" : "Menunggu"}
          </h3>
          <div className="flex items-center gap-1 mt-2">
            <div className={`w-1.5 h-1.5 ${botConnected ? "bg-green-500" : "bg-yellow-500"} rounded-full`}></div>
            <p className="text-[10px] text-gray-400">Bot {botConnected ? "connected" : "standby"}</p>
          </div>
        </div>

        <div className="bg-[#151822] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-3">
            <Users size={20} />
          </div>
          <p className="text-[10px] text-gray-500 font-semibold mb-1 uppercase">SESSIONS</p>
          <h3 className="text-blue-500 font-bold text-lg">{sessions.length} Session</h3>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <p className="text-[10px] text-gray-400">Perangkat terhubung</p>
          </div>
        </div>
      </section>

      <section className="px-5 mt-4">
        <div className="bg-[#151822] border border-gray-800 rounded-3xl p-5 flex flex-col md:flex-row gap-5 items-center">
          <div className="w-32 h-32 bg-indigo-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
            <Bot size={60} className="text-indigo-400" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <p className="text-indigo-400 text-xs font-bold tracking-wider mb-1">SIAP DIGUNAKAN</p>
            <h2 className="text-2xl font-bold text-white mb-2">DIN BOT V1.0.0</h2>
            <p className="text-gray-400 text-sm mb-5">Kelola Bot WhatsApp kamu dengan mudah dan aman.</p>
            <button 
              onClick={() => setPage("pairing")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition">
              <MessageCircle size={18} />
              Hubungkan WhatsApp
              <ChevronRight size={18} className="ml-auto md:ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 mt-4">
        <div className="bg-[#151822] border border-gray-800 rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400">
              <Info size={14} />
            </div>
            <h3 className="font-bold text-sm tracking-widest text-gray-300">SYSTEM INFO</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <p className="text-sm font-medium">DIN BOT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Version</p>
                <p className="text-sm font-medium">V1.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Platform</p>
                <p className="text-sm font-medium">WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Last Update</p>
                <p className="text-sm font-medium text-indigo-400">{lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // =====================================================
  // RENDER UI PAIRING
  // =====================================================
  const renderPairing = () => (
    <div className="animate-fade-in px-5 mt-2">
      <h2 className="text-indigo-400 font-semibold text-sm">Hubungkan Bot</h2>
      <h1 className="text-3xl font-bold mt-1">Pairing WhatsApp</h1>
      <p className="text-gray-400 text-sm mt-2 mb-6">Masukkan nomor WhatsApp kamu untuk mendapatkan kode pairing.</p>

      <div className="bg-[#151822] border border-gray-800 rounded-3xl p-5 mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Nomor WhatsApp</label>
        <div className="flex items-center bg-[#0B0D14] border border-gray-800 rounded-xl overflow-hidden focus-within:border-indigo-500 transition">
          <div className="px-4 py-3 bg-[#1A1D29] text-gray-400 border-r border-gray-800 font-medium">+62</div>
          <input 
            type="tel"
            className="flex-1 bg-transparent px-4 py-3 text-white outline-none"
            placeholder="81234567890"
            value={phoneNumber.replace(/^62/, "")}
            onChange={(e) => setPhoneNumber("62" + e.target.value.replace(/\D/g, ""))}
            disabled={pairingLoading}
          />
        </div>

        <button 
          onClick={startPairing}
          disabled={pairingLoading || !serverOnline}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-medium py-3 rounded-xl transition flex justify-center items-center gap-2">
          {pairingLoading ? <RefreshCcw size={18} className="animate-spin" /> : <MessageCircle size={18} />}
          {pairingLoading ? "Memproses..." : "Dapatkan Kode Pairing"}
        </button>

        {!serverOnline && (
          <p className="text-red-400 text-xs mt-3 text-center">API Server Offline. Pastikan server menyala.</p>
        )}
      </div>

      {pairingCode && (
        <div className="bg-[#151822] border border-indigo-500/30 rounded-3xl p-6 text-center shadow-[0_0_20px_rgba(79,70,229,0.1)]">
          <p className="text-gray-400 text-sm mb-2">Kode Pairing Kamu:</p>
          <h2 className="text-4xl font-bold tracking-widest text-white mb-4 bg-[#0B0D14] py-4 rounded-xl border border-gray-800">
            {pairingCode}
          </h2>
          <button 
            onClick={copyPairingCode}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-[#1A1D29] text-white hover:bg-gray-800 border border-gray-700'}`}>
            <Copy size={18} />
            {copied ? "Tersalin!" : "Salin Kode"}
          </button>
        </div>
      )}
    </div>
  );

  // =====================================================
  // RENDER UI SESSIONS
  // =====================================================
  const renderSessions = () => (
    <div className="animate-fade-in px-5 mt-2">
      <h2 className="text-indigo-400 font-semibold text-sm">Manajemen</h2>
      <h1 className="text-3xl font-bold mt-1">Sesi Terhubung</h1>
      <p className="text-gray-400 text-sm mt-2 mb-6">Kelola perangkat WhatsApp yang terhubung ke sistem bot.</p>

      {loading && sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <RefreshCcw size={30} className="animate-spin mb-3 text-indigo-500" />
          <p>Memuat sesi...</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-[#151822] border border-gray-800 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
            <Users size={30} />
          </div>
          <h3 className="text-white font-medium text-lg mb-2">Belum ada sesi</h3>
          <p className="text-gray-400 text-sm mb-5">Hubungkan perangkat kamu untuk memulai bot.</p>
          <button 
            onClick={() => setPage("pairing")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition">
            Hubungkan Sekarang
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session, idx) => (
            <div key={idx} className="bg-[#151822] border border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold">+{maskNumber(session.number || session.sessionId)}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-green-400">Connected</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => openLogoutModal(session)}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2.5 rounded-xl transition font-medium text-sm">
                <Trash2 size={16} />
                Hapus Sesi
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0D14] text-white font-sans pb-24">
      {/* HEADER GLOBAL */}
      <header className="p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-600/20">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">DIN BOT</h1>
            <p className="text-gray-400 text-xs">V1.0.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#1A1D29] px-3 py-1.5 rounded-full border border-gray-800">
          <div className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-300">{serverOnline ? "Online" : "Offline"} | {lastUpdate}</span>
        </div>
      </header>

      {/* RENDER KONTEN SESUAI PAGE */}
      {page === "dashboard" && renderDashboard()}
      {page === "pairing" && renderPairing()}
      {page === "sessions" && renderSessions()}

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0B0D14]/95 backdrop-blur-lg border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50">
        <div onClick={() => setPage("dashboard")} className={`flex flex-col items-center gap-1 cursor-pointer w-16 relative transition ${page === "dashboard" ? "text-indigo-500" : "text-gray-500 hover:text-gray-300"}`}>
          {page === "dashboard" && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-full"></div>}
          <Home size={22} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </div>
        
        <div onClick={() => setPage("pairing")} className={`flex flex-col items-center gap-1 cursor-pointer w-16 relative transition ${page === "pairing" ? "text-indigo-500" : "text-gray-500 hover:text-gray-300"}`}>
          {page === "pairing" && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-full"></div>}
          <Plus size={22} />
          <span className="text-[10px] font-medium">Pairing</span>
        </div>
        
        <div onClick={() => setPage("sessions")} className={`flex flex-col items-center gap-1 cursor-pointer w-16 relative transition ${page === "sessions" ? "text-indigo-500" : "text-gray-500 hover:text-gray-300"}`}>
          {page === "sessions" && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-full"></div>}
          <Circle size={22} />
          <span className="text-[10px] font-medium">Sessions</span>
        </div>
      </nav>

      {/* TOAST MESSAGE NOTIFICATION */}
      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1A1D29] border border-gray-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Info size={18} className="text-indigo-400" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* MODAL LOGOUT */}
      {logoutTarget && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5 animate-fade-in">
          <div className="bg-[#151822] border border-gray-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-[#1A1D29]">
              <h2 className="font-bold text-white">Konfirmasi Hapus Sesi</h2>
              <button onClick={closeLogoutModal} disabled={logoutLoading} className="text-gray-500 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-4">
                Untuk menghapus sesi <strong>{logoutTarget.sessionId}</strong>, ketik nomor WhatsApp secara lengkap.
              </p>
              <input 
                type="tel"
                value={logoutNumber}
                onChange={(e) => setLogoutNumber(e.target.value)}
                disabled={logoutLoading}
                placeholder="Cth: 62812345..."
                className="w-full bg-[#0B0D14] border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition mb-2"
              />
              {logoutMessage && <p className="text-red-400 text-xs font-medium">{logoutMessage}</p>}
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3 bg-[#1A1D29]">
              <button onClick={closeLogoutModal} disabled={logoutLoading} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-medium transition">
                Batal
              </button>
              <button onClick={confirmLogout} disabled={logoutLoading || !logoutNumber.trim()} className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:text-gray-400 text-white py-2.5 rounded-xl text-sm font-medium transition">
                {logoutLoading ? "Memproses..." : "Hapus Sesi"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
