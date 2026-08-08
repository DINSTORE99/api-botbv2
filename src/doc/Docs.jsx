import React, { useMemo, useState } from "react";

const API = "";

const endpoints = [
  {
    id: "status",
    method: "GET",
    path: "/api/status",
    title: "Server Status",
    group: "Monitoring",
    description: "Mengambil status server dan daftar session.",
    body: "",
    example: `${window.location.origin}/api/status`,
  },
  {
    id: "pair",
    method: "POST",
    path: "/api/pair",
    title: "Start Pairing",
    group: "WhatsApp",
    description: "Memulai proses pairing WhatsApp.",
    body: JSON.stringify({ number: "6281234567890" }, null, 2),
  },
  {
    id: "pairing",
    method: "GET",
    path: "/api/pairing/{sessionId}",
    title: "Pairing Status",
    group: "WhatsApp",
    description: "Mengecek kode dan status koneksi pairing.",
    body: "",
    example: `${window.location.origin}/api/pairing/6281234567890`,
  },
  {
    id: "logout",
    method: "POST",
    path: "/api/logout",
    title: "Logout Session",
    group: "WhatsApp",
    description: "Menghapus session WhatsApp.",
    body: JSON.stringify({ sessionId: "6281234567890" }, null, 2),
  },
];

const methodColor = {
  GET: "#67e8f9",
  POST: "#a78bfa",
};

export default function Docs() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("intro");
  const [selectedId, setSelectedId] = useState("status");
  const [sessionId, setSessionId] = useState("6281234567890");
  const [requestBody, setRequestBody] = useState("");
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const selected = endpoints.find((e) => e.id === selectedId) || endpoints[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return endpoints;

    return endpoints.filter((e) =>
      [e.title, e.path, e.method, e.group, e.description]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const selectEndpoint = (id) => {
    const item = endpoints.find((e) => e.id === id);
    if (!item) return;

    setSelectedId(id);
    setRequestBody(item.body || "");
    setResponseText("");
    setStatus("");
    setResponseTime("");
    setCopied(false);
  };

  const buildUrl = () => {
    let path = selected.path;

    if (path.includes("{sessionId}")) {
      path = path.replace(
        "{sessionId}",
        encodeURIComponent(sessionId.trim())
      );
    }

    return `${window.location.origin}${path}`;
  };

  const testEndpoint = async () => {
    setTesting(true);
    setResponseText("");
    setStatus("");
    setResponseTime("");
    setCopied(false);

    const url = buildUrl();
    const started = performance.now();

    try {
      let body;

      if (selected.method === "POST") {
        if (!requestBody.trim()) {
          throw new Error("Request body tidak boleh kosong.");
        }

        try {
          body = JSON.stringify(JSON.parse(requestBody));
        } catch {
          throw new Error("JSON request body tidak valid.");
        }
      }

      const response = await fetch(url, {
        method: selected.method,
        headers:
          selected.method === "POST"
            ? { "Content-Type": "application/json" }
            : undefined,
        body,
        cache: "no-store",
      });

      const elapsed = Math.round(performance.now() - started);
      const contentType = response.headers.get("content-type") || "";

      let result;

      if (contentType.includes("application/json")) {
        const json = await response.json();
        result = JSON.stringify(json, null, 2);
      } else {
        result = await response.text();
      }

      setStatus(`${response.status} ${response.statusText}`);
      setResponseTime(`${elapsed} ms`);
      setResponseText(result || "(empty response)");
    } catch (error) {
      const elapsed = Math.round(performance.now() - started);

      setStatus("ERROR");
      setResponseTime(`${elapsed} ms`);
      setResponseText(
        JSON.stringify(
          {
            error: error?.message || "Request gagal",
          },
          null,
          2
        )
      );
    } finally {
      setTesting(false);
    }
  };

  const copyResponse = async () => {
    if (!responseText) return;

    try {
      await navigator.clipboard.writeText(responseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const scrollTo = (id) => {
    setActive(id);
    setMobileNav(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="docs-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .docs-page {
          min-height: 100vh;
          color: #f8fafc;
          background:
            radial-gradient(circle at 10% 0%, rgba(124,58,237,.18), transparent 28%),
            radial-gradient(circle at 90% 10%, rgba(6,182,212,.10), transparent 25%),
            #070a12;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .docs-shell {
          width: min(1280px, calc(100% - 40px));
          margin: auto;
          padding: 20px 0 70px;
        }

        .docs-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 8px 0 20px;
          border-bottom: 1px solid rgba(148,163,184,.13);
        }

        .brand {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 850;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(135deg,#7c3aed,#06b6d4);
          box-shadow: 0 10px 30px rgba(124,58,237,.28);
        }

        .top-actions {
          display: flex;
          gap: 9px;
          align-items: center;
        }

        .top-link,
        .api-online {
          border: 1px solid rgba(148,163,184,.13);
          background: rgba(255,255,255,.025);
          border-radius: 10px;
          padding: 9px 12px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 12px;
        }

        .api-online {
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .api-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px #4ade80;
        }

        .docs-layout {
          display: grid;
          grid-template-columns: 245px minmax(0,1fr);
          gap: 35px;
          margin-top: 28px;
        }

        .sidebar {
          position: sticky;
          top: 20px;
          height: calc(100vh - 40px);
          overflow: auto;
        }

        .sidebar-box {
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(148,163,184,.13);
          background: rgba(12,17,28,.78);
          backdrop-filter: blur(15px);
        }

        .nav-title {
          color: #64748b;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .13em;
          margin: 4px 8px 9px;
        }

        .nav-btn {
          width: 100%;
          border: 0;
          border-radius: 9px;
          padding: 9px 10px;
          text-align: left;
          cursor: pointer;
          background: transparent;
          color: #94a3b8;
          font-size: 12px;
          margin-bottom: 2px;
        }

        .nav-btn.active {
          background: rgba(167,139,250,.12);
          color: #ddd6fe;
        }

        .hero {
          padding: 30px 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.25fr .75fr;
          gap: 18px;
        }

        .eyebrow {
          color: #a78bfa;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .14em;
        }

        .hero h1 {
          font-size: clamp(38px,6vw,58px);
          line-height: 1;
          letter-spacing: -.045em;
          margin: 13px 0;
        }

        .gradient-text {
          background: linear-gradient(90deg,#c4b5fd,#67e8f9);
          -webkit-background-clip: text;
          color: transparent;
        }

        .muted {
          color: #94a3b8;
          line-height: 1.75;
          font-size: 14px;
        }

        .panel {
          border: 1px solid rgba(148,163,184,.13);
          border-radius: 18px;
          background: rgba(12,17,28,.76);
        }

        .base-panel {
          padding: 20px;
        }

        .base-url {
          color: #67e8f9;
          font-size: 13px;
          word-break: break-all;
        }

        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 22px;
        }

        .stat {
          padding: 12px;
          border-radius: 11px;
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(148,163,184,.08);
        }

        .stat strong {
          display: block;
          font-size: 18px;
        }

        .stat span {
          color: #64748b;
          font-size: 10px;
        }

        .section {
          border-top: 1px solid rgba(148,163,184,.13);
          padding-top: 30px;
          margin-top: 25px;
          scroll-margin-top: 20px;
        }

        .section h2 {
          margin: 7px 0;
          font-size: 28px;
        }

        .endpoint-list {
          display: grid;
          gap: 10px;
          margin-top: 18px;
        }

        .endpoint-row {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 14px;
          border: 1px solid rgba(148,163,184,.11);
          border-radius: 13px;
          background: rgba(255,255,255,.025);
          cursor: pointer;
          transition: .18s ease;
        }

        .endpoint-row:hover {
          transform: translateY(-1px);
          border-color: rgba(167,139,250,.35);
          background: rgba(167,139,250,.06);
        }

        .method {
          font-size: 10px;
          font-weight: 900;
          text-align: center;
          padding: 5px 6px;
          border-radius: 7px;
        }

        .endpoint-path {
          color: #e2e8f0;
          font-family: monospace;
          font-size: 13px;
          word-break: break-all;
        }

        .endpoint-name {
          color: #64748b;
          font-size: 11px;
          text-align: right;
        }

        .tester {
          margin-top: 20px;
          padding: 20px;
        }

        .tester-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tester-title {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .tester-title h3 {
          margin: 0;
          font-size: 21px;
        }

        .method-badge {
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 900;
        }

        .url-box {
          display: flex;
          margin-top: 17px;
          border: 1px solid rgba(148,163,184,.13);
          border-radius: 11px;
          overflow: hidden;
          background: #070b13;
        }

        .url-method {
          display: grid;
          place-items: center;
          padding: 0 13px;
          font-size: 10px;
          font-weight: 900;
          border-right: 1px solid rgba(148,163,184,.13);
        }

        .url-input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #cbd5e1;
          padding: 12px;
          font-family: monospace;
          font-size: 12px;
        }

        .session-input {
          margin-top: 12px;
          width: 100%;
          border: 1px solid rgba(148,163,184,.13);
          outline: 0;
          background: #070b13;
          color: #e2e8f0;
          padding: 12px;
          border-radius: 10px;
          font-family: monospace;
        }

        .test-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 15px;
        }

        .code-label {
          color: #64748b;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .12em;
          margin-bottom: 8px;
        }

        .code-area {
          width: 100%;
          min-height: 190px;
          resize: vertical;
          border: 1px solid rgba(148,163,184,.13);
          outline: 0;
          border-radius: 12px;
          background: #070b13;
          color: #dbeafe;
          padding: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          line-height: 1.65;
        }

        .response-wrap {
          position: relative;
        }

        .response-area {
          min-height: 190px;
          max-height: 400px;
          overflow: auto;
          margin: 0;
          padding: 14px;
          border: 1px solid rgba(148,163,184,.13);
          border-radius: 12px;
          background: #070b13;
          color: #dbeafe;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          line-height: 1.65;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .tester-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .send-btn,
        .copy-btn {
          border: 0;
          border-radius: 10px;
          padding: 11px 15px;
          cursor: pointer;
          font-weight: 800;
          font-size: 12px;
        }

        .send-btn {
          color: white;
          background: linear-gradient(135deg,#7c3aed,#06b6d4);
          box-shadow: 0 10px 25px rgba(124,58,237,.18);
        }

        .send-btn:disabled {
          opacity: .55;
          cursor: wait;
        }

        .copy-btn {
          color: #cbd5e1;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(148,163,184,.13);
        }

        .response-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          color: #64748b;
          font-size: 11px;
        }

        .mobile-nav {
          display: none;
          margin-top: 15px;
        }

        @media (max-width: 900px) {
          .docs-layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }

          .mobile-nav {
            display: block;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .docs-shell {
            width: min(100% - 28px, 1280px);
          }

          .test-grid {
            grid-template-columns: 1fr;
          }

          .endpoint-row {
            grid-template-columns: 55px 1fr;
          }

          .endpoint-name {
            display: none;
          }

          .api-online {
            display: none;
          }
        }
      `}</style>

      <div className="docs-shell">
        <header className="docs-topbar">
          <a className="brand" href="/">
            <span className="brand-logo">W</span>
            <span>
              DIN BOT
              <small
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: 9,
                  letterSpacing: ".13em",
                }}
              >
                API DOCUMENTATION
              </small>
            </span>
          </a>

          <div className="top-actions">
            <div className="api-online">
              <span className="api-dot" />
              API ONLINE
            </div>

            <a className="top-link" href="/">
              Dashboard →
            </a>
          </div>
        </header>

        <div className="mobile-nav">
          <button
            className="top-link"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => setMobileNav((v) => !v)}
          >
            ☰ Documentation Menu
          </button>

          {mobileNav && (
            <div className="panel" style={{ marginTop: 8, padding: 10 }}>
              <button className="nav-btn" onClick={() => scrollTo("intro")}>
                Introduction
              </button>
              <button className="nav-btn" onClick={() => scrollTo("endpoints")}>
                API Endpoints
              </button>
              <button className="nav-btn" onClick={() => scrollTo("tester")}>
                Endpoint Tester
              </button>
            </div>
          )}
        </div>

        <div className="docs-layout">
          <aside className="sidebar">
            <div className="sidebar-box">
              <div className="nav-title">CONTENTS</div>

              <button
                className={`nav-btn ${active === "intro" ? "active" : ""}`}
                onClick={() => scrollTo("intro")}
              >
                Introduction
              </button>

              <button
                className={`nav-btn ${active === "endpoints" ? "active" : ""}`}
                onClick={() => scrollTo("endpoints")}
              >
                API Endpoints
              </button>

              <button
                className={`nav-btn ${active === "tester" ? "active" : ""}`}
                onClick={() => scrollTo("tester")}
              >
                Endpoint Tester
              </button>

              <div className="nav-title" style={{ marginTop: 18 }}>
                API
              </div>

              {endpoints.map((item) => (
                <button
                  key={item.id}
                  className="nav-btn"
                  onClick={() => {
                    selectEndpoint(item.id);
                    scrollTo("tester");
                  }}
                >
                  <span
                    style={{
                      color: methodColor[item.method],
                      fontSize: 9,
                      fontWeight: 900,
                      marginRight: 6,
                    }}
                  >
                    {item.method}
                  </span>
                  {item.path}
                </button>
              ))}
            </div>
          </aside>

          <main>
            <section id="intro" className="hero">
              <div className="hero-grid">
                <div>
                  <span className="eyebrow">DIN BOT · API V1</span>

                  <h1>
                    Test your
                    <br />
                    <span className="gradient-text">API endpoints.</span>
                  </h1>

                  <p className="muted" style={{ maxWidth: 680 }}>
                    Dokumentasi API lengkap dengan Endpoint Tester. Pilih
                    endpoint, ubah request body jika diperlukan, lalu kirim
                    request langsung dari halaman ini.
                  </p>
                </div>

                <div className="panel base-panel">
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: 10,
                      fontWeight: 850,
                      letterSpacing: ".12em",
                      marginBottom: 9,
                    }}
                  >
                    BASE URL
                  </div>

                  <div className="base-url">
                    {window.location.origin}
                  </div>

                  <div className="stats">
                    <div className="stat">
                      <strong>4</strong>
                      <span>ENDPOINTS</span>
                    </div>
                    <div className="stat">
                      <strong>GET/POST</strong>
                      <span>METHODS</span>
                    </div>
                    <div className="stat">
                      <strong>JSON</strong>
                      <span>FORMAT</span>
                    </div>
                    <div className="stat">
                      <strong>LIVE</strong>
                      <span>TESTER</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="endpoints" className="section">
              <span className="eyebrow">API REFERENCE</span>
              <h2>Endpoints</h2>
              <p className="muted">
                Pilih endpoint untuk langsung membukanya di Endpoint Tester.
              </p>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari endpoint..."
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid rgba(148,163,184,.13)",
                  background: "#0c111c",
                  color: "#f8fafc",
                  outline: 0,
                }}
              />

              <div className="endpoint-list">
                {filtered.map((item) => (
                  <div
                    className="endpoint-row"
                    key={item.id}
                    onClick={() => {
                      selectEndpoint(item.id);
                      scrollTo("tester");
                    }}
                  >
                    <span
                      className="method"
                      style={{
                        color: methodColor[item.method],
                        background: `${methodColor[item.method]}16`,
                      }}
                    >
                      {item.method}
                    </span>

                    <span className="endpoint-path">
                      {item.path}
                    </span>

                    <span className="endpoint-name">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section id="tester" className="section">
              <span className="eyebrow">LIVE TOOL</span>
              <h2>Endpoint Tester</h2>
              <p className="muted">
                Request dikirim dari browser kamu langsung ke endpoint API.
              </p>

              <div className="panel tester">
                <div className="tester-head">
                  <div>
                    <div className="tester-title">
                      <span
                        className="method-badge"
                        style={{
                          color: methodColor[selected.method],
                          background: `${methodColor[selected.method]}16`,
                        }}
                      >
                        {selected.method}
                      </span>

                      <h3>{selected.title}</h3>
                    </div>

                    <p
                      className="muted"
                      style={{
                        margin: "8px 0 0",
                        fontSize: 12,
                      }}
                    >
                      {selected.description}
                    </p>
                  </div>

                  <select
                    value={selectedId}
                    onChange={(e) => selectEndpoint(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 9,
                      border: "1px solid rgba(148,163,184,.13)",
                      background: "#070b13",
                      color: "#cbd5e1",
                      outline: 0,
                    }}
                  >
                    {endpoints.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.method} · {item.path}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="url-box">
                  <div
                    className="url-method"
                    style={{ color: methodColor[selected.method] }}
                  >
                    {selected.method}
                  </div>

                  <input
                    className="url-input"
                    value={buildUrl()}
                    readOnly
                  />
                </div>

                {selected.path.includes("{sessionId}") && (
                  <input
                    className="session-input"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="Masukkan sessionId..."
                  />
                )}

                <div className="test-grid">
                  <div>
                    <div className="code-label">
                      REQUEST BODY
                    </div>

                    {selected.method === "POST" ? (
                      <textarea
                        className="code-area"
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        spellCheck={false}
                      />
                    ) : (
                      <div className="code-area" style={{ color: "#64748b" }}>
                        Endpoint GET tidak membutuhkan request body.
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="code-label">
                      RESPONSE
                    </div>

                    <div className="response-wrap">
                      <pre className="response-area">
                        {responseText || "Belum ada response.\n\nKlik Send Request untuk mencoba endpoint."}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="tester-actions">
                  <div className="response-meta">
                    {status && <span>{status}</span>}
                    {responseTime && <span>· {responseTime}</span>}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="copy-btn"
                      onClick={copyResponse}
                      disabled={!responseText}
                    >
                      {copied ? "Copied ✓" : "Copy Response"}
                    </button>

                    <button
                      className="send-btn"
                      onClick={testEndpoint}
                      disabled={testing}
                    >
                      {testing ? "Sending..." : "▶ Send Request"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <footer
              style={{
                borderTop: "1px solid rgba(148,163,184,.13)",
                marginTop: 35,
                paddingTop: 25,
                textAlign: "center",
                color: "#64748b",
                fontSize: 11,
              }}
            >
              DIN BOT · API Documentation · Endpoint Tester
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
