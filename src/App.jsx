import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Pairing from "./components/Pairing";
import Monitor from "./components/Monitor";
import Sessions from "./components/Sessions";
import BottomNav from "./components/BottomNav";

const API = "";

export default function App() {

  const [page, setPage] = useState("dashboard");

  const [loading, setLoading] = useState(false);

  const [serverOnline, setServerOnline] = useState(false);

  const [botConnected, setBotConnected] = useState(false);

  const [sessions, setSessions] = useState([]);

  const [ping, setPing] = useState(0);

  const [lastUpdate, setLastUpdate] = useState("--:--");

  const [uptime, setUptime] = useState({
    hari:0,
    jam:0,
    menit:0,
    detik:0
  });
  async function loadStatus() {
  try {

    setLoading(true);

    const start = performance.now();

    const response = await fetch(`${API}/api/status`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data = await response.json();

    const end = performance.now();

    setPing(Math.round(end - start));

    setServerOnline(data.server === "online");

    setBotConnected(data.botConnected === true);

    setSessions(
      Array.isArray(data.sessions)
        ? data.sessions
        : []
    );

    setUptime(
      data.uptime || {
        hari: 0,
        jam: 0,
        menit: 0,
        detik: 0
      }
    );

    setLastUpdate(
      new Date().toLocaleTimeString("id-ID")
    );

  } catch (err) {

    console.log(err);

    setServerOnline(false);
    setBotConnected(false);
    setSessions([]);
    setPing(0);

  } finally {

    setLoading(false);

  }
}
  useEffect(() => {

  loadStatus();

  const interval = setInterval(() => {
    loadStatus();
  }, 5000);

  return () => clearInterval(interval);

}, []);

return (
  <div className="app">

    {page === "dashboard" && (
      <Dashboard
        loading={loading}
        serverOnline={serverOnline}
        botConnected={botConnected}
        sessions={sessions}
        ping={ping}
        lastUpdate={lastUpdate}
        loadStatus={loadStatus}
        setPage={setPage}
      />
    )}

    {page === "pairing" && (
      <Pairing
        serverOnline={serverOnline}
        setPage={setPage}
      />
    )}

    {page === "monitor" && (
      <Monitor
        serverOnline={serverOnline}
        botConnected={botConnected}
        ping={ping}
        uptime={uptime}
        loadStatus={loadStatus}
        setPage={setPage}
      />
    )}

    {page === "sessions" && (
      <Sessions
        sessions={sessions}
        loadStatus={loadStatus}
        setPage={setPage}
      />
    )}

    <BottomNav
      page={page}
      setPage={setPage}
    />

  </div>
);

}
