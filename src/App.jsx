import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Pairing from "./components/Pairing";
import Monitor from "./components/Monitor";
import Sessions from "./components/Sessions";
import BottomNav from "./components/BottomNav";
import "./style.css";

const API = "";

export default function App() {
  /* =========================
      PAGE
  ========================= */

  const [page, setPage] = useState("dashboard");

  /* =========================
      STATUS
  ========================= */

  const [serverOnline, setServerOnline] = useState(false);
  const [botConnected, setBotConnected] = useState(false);

  const [sessions, setSessions] = useState([]);

  const [ping, setPing] = useState(0);

  const [loading, setLoading] = useState(false);

  const [lastUpdate, setLastUpdate] = useState("--:--:--");

  const [uptime, setUptime] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  /* =========================
      PAIRING
  ========================= */

  const [phoneNumber, setPhoneNumber] = useState("");

  const [pairingLoading, setPairingLoading] =
    useState(false);

  const [pairingCode, setPairingCode] =
    useState("");

  const [pairingSession, setPairingSession] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  /* =========================
      LOGOUT
  ========================= */

  const [logoutTarget, setLogoutTarget] =
    useState(null);

  const [logoutNumber, setLogoutNumber] =
    useState("");

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const [logoutMessage, setLogoutMessage] =
    useState("");

  /* =========================
      TOAST
  ========================= */

  const [message, setMessage] =
    useState("");

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  /* =========================
      HELPER
  ========================= */

  function normalizeNumber(number) {
    return number.replace(/\D/g, "");
  }

  function maskNumber(number = "") {
    if (!number) return "-";

    if (number.length < 6) return number;

    return (
      number.slice(0, 4) +
      "****" +
      number.slice(-3)
    );
  }
    /* =========================
      LOAD STATUS
  ========================= */

  async function loadStatus() {

    try {

      setLoading(true);

      const start = performance.now();

      const response = await fetch(
        `${API}/api/status`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok)
        throw new Error("Server Error");

      const data = await response.json();

      const end = performance.now();

      setPing(Math.round(end - start));

      setServerOnline(
        data.server === "online"
      );

      setBotConnected(
        data.botConnected === true
      );

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
          detik: 0,
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
