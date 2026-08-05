import { useEffect, useState } from "react";
import "./style.css";

import Dashboard from "./components/Dashboard";
import Pairing from "./components/Pairing";
import Sessions from "./components/Sessions";
import Monitor from "./components/Monitor";
import Navbar from "./components/Navbar";

const API = "";

// Telegram
const TELEGRAM_BOT = "ISI_BOT_TOKEN";
const TELEGRAM_CHAT = "ISI_CHAT_ID";

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

function sendOpenNotif() {
  if (
    TELEGRAM_BOT === "ISI_BOT_TOKEN" ||
    TELEGRAM_CHAT === "ISI_CHAT_ID"
  ) return;

  const info = getBrowserInfo();

  const text = `
🌐 WEBSITE DIN BOT DIBUKA

📱 Device : ${info.device}
🌍 Browser : ${info.browser}
🕒 ${new Date().toLocaleString()}
🔗 ${window.location.href}
`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT,
      text,
    }),
  }).catch(() => {});
}

export default function App() {

  const [page, setPage] = useState("dashboard");

  const [serverOnline, setServerOnline] = useState(false);
  const [botConnected, setBotConnected] = useState(false);

  const [ping, setPing] = useState(0);

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [lastUpdate, setLastUpdate] = useState("-");

  const [uptime, setUptime] = useState({
    hari:0,
    jam:0,
    menit:0,
    detik:0
  });

  useEffect(() => {

    sendOpenNotif();

    const audio = new Audio("/musik.mp3");

    audio.loop = true;
    audio.volume = 0.4;

    const play = () => {
      audio.play().catch(()=>{});
    };

    play();

    document.addEventListener("click", play,{once:true});
    document.addEventListener("touchstart", play,{once:true});

    return ()=>{
      audio.pause();
      audio.currentTime=0;
    }

  },[]);

  const loadStatus = async()=>{

    try{

      setLoading(true);

      const start = performance.now();

      const res = await fetch(`${API}/api/status`,{
        cache:"no-store"
      });

      const end = performance.now();

      const data = await res.json();

      setPing(Math.round(end-start));

      setServerOnline(data.server==="online");

      setBotConnected(data.botConnected===true);

      setSessions(data.sessions || []);

      setUptime(data.uptime || {
        hari:0,
        jam:0,
        menit:0,
        detik:0
      });

      setLastUpdate(
        new Date().toLocaleTimeString("id-ID")
      );

    }catch{

      setServerOnline(false);
      setBotConnected(false);
      setSessions([]);
      setPing(0);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{
    loadStatus();

    const interval = setInterval(loadStatus,10000);

    return ()=>clearInterval(interval);

  },[]);

  return (

    <div className="app">

      {page==="dashboard" && (

        <Dashboard
          serverOnline={serverOnline}
          botConnected={botConnected}
          ping={ping}
          sessions={sessions}
          loading={loading}
          lastUpdate={lastUpdate}
          setPage={setPage}
          loadStatus={loadStatus}
        />

      )}

      {page==="pairing" && (

        <Pairing
          API={API}
          serverOnline={serverOnline}
          setPage={setPage}
        />

      )}

      {page==="sessions" && (

        <Sessions
          API={API}
          sessions={sessions}
          setPage={setPage}
          loadStatus={loadStatus}
        />

      )}

      {page==="monitor" && (

        <Monitor
          serverOnline={serverOnline}
          botConnected={botConnected}
          ping={ping}
          uptime={uptime}
          lastUpdate={lastUpdate}
          setPage={setPage}
        />

      )}

      <Navbar
        page={page}
        setPage={setPage}
      />

    </div>

  );
}
