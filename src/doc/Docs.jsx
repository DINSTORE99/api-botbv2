import { useState } from "react";

const ENDPOINTS = [
  {
    id: "status",
    method: "GET",
    path: "/api/status",
    title: "API Status",
    description: "Mengecek status server DIN BOT.",
    body: null,
    example: {
      success: true,
      server: "online",
      service: "DIN BOT API",
      timestamp: 1234567890,
    },
  },
  {
    id: "sessions",
    method: "GET",
    path: "/api/sessions",
    title: "Sessions",
    description: "Mengambil semua session WhatsApp.",
    body: null,
    example: {
      success: true,
      sessions: [],
    },
  },
  {
    id: "pair",
    method: "POST",
    path: "/api/pair",
    title: "Pair WhatsApp",
    description: "Memulai proses pairing WhatsApp.",
    body: {
      number: "6281234567890",
    },
    example: {
      success: true,
      sessionId: "6281234567890",
      pairingCode: "ABCD1234",
    },
  },
  {
    id: "pairing",
    method: "GET",
    path: "/api/pairing/{sessionId}",
    title: "Pairing Status",
    description: "Mengecek status pairing berdasarkan session ID.",
    body: null,
    example: {
      success: true,
      connected: false,
      code: "ABCD1234",
    },
  },
  {
    id: "logout",
    method: "POST",
    path: "/api/logout",
    title: "Logout Session",
    description: "Logout dan menghapus session WhatsApp.",
    body: {
      sessionId: "6281234567890",
    },
    example: {
      success: true,
      message: "Session berhasil dihapus",
    },
  },
];

function MethodBadge({ method }) {
  return (
    <span
      className={`method-badge ${method.toLowerCase()}`}
    >
      {method}
    </span>
  );
}

export default function Docs() {
  const [selected, setSelected] = useState(
    ENDPOINTS[0]
  );

  const [search, setSearch] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [responseStatus, setResponseStatus] =
    useState(null);
  const [responseTime, setResponseTime] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredEndpoints = ENDPOINTS.filter(
    (item) => {
      const text =
        `${item.method} ${item.path} ${item.title}`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    }
  );

  const selectEndpoint = (endpoint) => {
    setSelected(endpoint);
    setResponse(null);
    setResponseStatus(null);
    setResponseTime(null);
    setCopied(false);
    setSessionId("");

    if (endpoint.body) {
      setBody(
        JSON.stringify(
          endpoint.body,
          null,
          2
        )
      );
    } else {
      setBody("");
    }
  };

  const getPath = () => {
    if (selected.id === "pairing") {
      const id =
        sessionId.trim() ||
        "YOUR_SESSION_ID";

      return selected.path.replace(
        "{sessionId}",
        encodeURIComponent(id)
      );
    }

    return selected.path;
  };

  const sendRequest = async () => {
    try {
      setLoading(true);
      setResponse(null);
      setResponseStatus(null);
      setResponseTime(null);

      let requestBody = {};

      if (
        selected.method === "POST" &&
        body.trim()
      ) {
        try {
          requestBody =
            JSON.parse(body);
        } catch {
          setResponse({
            success: false,
            message:
              "JSON request tidak valid.",
          });

          setLoading(false);
          return;
        }
      }

      const start =
        performance.now();

      const options = {
        method: selected.method,
        headers: {
          "Content-Type":
            "application/json",
        },
      };

      if (selected.method === "POST") {
        options.body =
          JSON.stringify(
            requestBody
          );
      }

      const res = await fetch(
        getPath(),
        options
      );

      const end =
        performance.now();

      setResponseStatus(
        res.status
      );

      setResponseTime(
        Math.round(end - start)
      );

      const contentType =
        res.headers.get(
          "content-type"
        ) || "";

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        const data =
          await res.json();

        setResponse(data);
      } else {
        const text =
          await res.text();

        setResponse(text);
      }

    } catch (error) {
      setResponse({
        success: false,
        message:
          error.message,
      });

      setResponseStatus(0);

    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    if (response === null) return;

    const text =
      typeof response === "string"
        ? response
        : JSON.stringify(
            response,
            null,
            2
          );

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {
      setCopied(false);
    }
  };

  const responseText =
    response === null
      ? ""
      : typeof response === "string"
        ? response
        : JSON.stringify(
            response,
            null,
            2
          );

  return (
    <div className="docs-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .docs-page {
          min-height: 100vh;
          background: #08090d;
          color: #f5f7fb;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .docs-header {
          height: 72px;
          border-bottom: 1px solid #1c1f29;
          background: rgba(8, 9, 13, 0.94);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #4f46e5
            );
          font-weight: 900;
          font-size: 18px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-text strong {
          font-size: 14px;
          letter-spacing: 1px;
        }

        .brand-text span {
          color: #717887;
          font-size: 9px;
          letter-spacing: 1.5px;
          margin-top: 2px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .api-live {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8ee6ae;
          font-size: 11px;
          font-weight: 700;
        }

        .api-live span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #36d778;
          box-shadow:
            0 0 12px #36d778;
        }

        .header-version {
          color: #7d8494;
          font-size: 11px;
        }

        .docs-layout {
          display: grid;
          grid-template-columns: 290px minmax(0, 1fr);
          min-height:
            calc(100vh - 72px);
        }

        .docs-sidebar {
          border-right: 1px solid #1c1f29;
          background: #0b0d12;
          padding: 28px 18px;
          position: sticky;
          top: 72px;
          height:
            calc(100vh - 72px);
          display: flex;
          flex-direction: column;
        }

        .sidebar-title {
          padding: 0 10px 18px;
        }

        .sidebar-title span {
          color: #737b8d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .sidebar-title strong {
          display: block;
          font-size: 18px;
          margin-top: 5px;
        }

        .search-box {
          height: 42px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid #20232e;
          background: #101219;
          border-radius: 10px;
          padding: 0 12px;
          margin-bottom: 18px;
        }

        .search-box span {
          color: #737b8d;
        }

        .search-box input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
          font-size: 12px;
        }

        .endpoint-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          overflow-y: auto;
        }

        .endpoint-item {
          width: 100%;
          border: 1px solid transparent;
          background: transparent;
          color: #aeb4c1;
          padding: 10px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          cursor: pointer;
        }

        .endpoint-item:hover {
          background: #12151c;
          color: white;
        }

        .endpoint-item.active {
          background: #151823;
          border-color: #292d3a;
          color: white;
        }

        .endpoint-info {
          min-width: 0;
        }

        .endpoint-info strong {
          display: block;
          font-size: 11px;
        }

        .endpoint-info span {
          display: block;
          margin-top: 3px;
          color: #646b7b;
          font-family: monospace;
          font-size: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .method-badge {
          min-width: 45px;
          height: 22px;
          padding: 0 7px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .5px;
        }

        .method-badge.get {
          color: #69a9ff;
          background:
            rgba(59, 130, 246, .12);
        }

        .method-badge.post {
          color: #64e49b;
          background:
            rgba(34, 197, 94, .12);
        }

        .sidebar-footer {
          margin-top: auto;
          padding: 18px 10px 0;
          border-top: 1px solid #1c1f29;
          display: flex;
          justify-content: space-between;
          color: #777e8d;
          font-size: 10px;
        }

        .sidebar-footer small {
          color: #4f5562;
        }

        .docs-main {
          width: 100%;
          max-width: 1050px;
          padding: 55px;
        }

        .docs-intro {
          margin-bottom: 48px;
        }

        .eyebrow {
          color: #737b8d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .docs-intro h1 {
          font-size:
            clamp(32px, 5vw, 50px);
          line-height: 1;
          letter-spacing: -2px;
          margin: 12px 0;
        }

        .docs-intro p {
          color: #8d94a3;
          max-width: 620px;
          line-height: 1.7;
          font-size: 13px;
        }

        .endpoint-header {
          margin-bottom: 28px;
        }

        .endpoint-heading {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .endpoint-heading h2 {
          font-size: 24px;
          margin: 0;
        }

        .endpoint-header p {
          color: #858c9c;
          font-size: 12px;
          line-height: 1.6;
          margin: 10px 0 16px;
        }

        .url-bar {
          min-height: 48px;
          border: 1px solid #242834;
          background: #0d1016;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
        }

        .url-bar span {
          color: #62dd99;
          font-size: 9px;
          font-weight: 900;
        }

        .url-bar code {
          color: #d5dae3;
          font-size: 12px;
          overflow-x: auto;
        }

        .tester-card,
        .response-card,
        .example-card {
          border: 1px solid #20232d;
          background: #0d1016;
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 20px;
        }

        .card-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .card-heading h3 {
          margin: 5px 0 0;
          font-size: 17px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          color: #7e8696;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.2px;
          margin-bottom: 8px;
        }

        .dark-input,
        .code-input {
          width: 100%;
          outline: none;
          border: 1px solid #242834;
          background: #080a0f;
          color: #e7eaf0;
          border-radius: 9px;
          padding: 12px;
          font-family: monospace;
          font-size: 12px;
        }

        .dark-input:focus,
        .code-input:focus {
          border-color: #5b4acb;
        }

        .code-input {
          min-height: 150px;
          resize: vertical;
          line-height: 1.6;
        }

        .small-button,
        .copy-button {
          border: 1px solid #292d39;
          background: #141720;
          color: #aab0bd;
          border-radius: 7px;
          padding: 7px 10px;
          font-size: 9px;
          cursor: pointer;
        }

        .small-button:hover,
        .copy-button:hover {
          color: white;
          background: #1a1d27;
        }

        .send-button {
          width: 100%;
          height: 46px;
          border: 0;
          border-radius: 9px;
          background:
            linear-gradient(
              135deg,
              #6949e8,
              #4f46c8
            );
          color: white;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          box-shadow:
            0 8px 25px
            rgba(79, 70, 229, .2);
        }

        .send-button:disabled {
          opacity: .55;
          cursor: wait;
        }

        .loader {
          width: 13px;
          height: 13px;
          display: inline-block;
          border: 2px solid
            rgba(255,255,255,.3);
          border-top-color: white;
          border-radius: 50%;
          animation:
            docs-spin .7s linear infinite;
          margin-right: 7px;
          vertical-align: -2px;
        }

        @keyframes docs-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .response-meta {
          display: flex;
          gap: 30px;
          border-bottom:
            1px solid #20232d;
          padding-bottom: 15px;
          margin-bottom: 15px;
        }

        .response-meta div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .response-meta span {
          color: #686f7e;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .response-meta strong {
          font-size: 11px;
        }

        .status-success {
          color: #64e49b;
        }

        .status-error {
          color: #ff6b7a;
        }

        .response-window {
          min-height: 250px;
          max-height: 500px;
          overflow: auto;
          background: #07090d;
          border: 1px solid #191c24;
          border-radius: 9px;
        }

        .response-window pre,
        .example-card pre {
          margin: 0;
          padding: 18px;
          color: #c9ced8;
          font-family: monospace;
          font-size: 11px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .empty-response {
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 7px;
          color: #5e6574;
        }

        .empty-response strong {
          color: #858c9b;
          font-size: 12px;
        }

        .empty-response span {
          font-size: 10px;
        }

        .terminal-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #11141c;
          color: #6d5ce7;
          font-family: monospace;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .docs-footer {
          border-top: 1px solid #1c1f29;
          margin-top: 45px;
          padding: 22px 0;
          display: flex;
          justify-content: space-between;
          color: #555c6b;
          font-size: 9px;
        }

        @media (max-width: 800px) {

          .docs-header {
            padding: 0 16px;
          }

          .header-version {
            display: none;
          }

          .docs-layout {
            display: block;
          }

          .docs-sidebar {
            position: relative;
            top: 0;
            height: auto;
            border-right: 0;
            border-bottom:
              1px solid #1c1f29;
            padding: 18px;
          }

          .sidebar-footer {
            display: none;
          }

          .docs-main {
            padding: 35px 16px;
          }

          .docs-intro {
            margin-bottom: 35px;
          }

          .docs-intro h1 {
            letter-spacing: -1px;
          }

          .endpoint-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .response-meta {
            gap: 18px;
            flex-wrap: wrap;
          }

          .docs-footer {
            flex-direction: column;
            gap: 8px;
          }
        }

      `}</style>


      {/* HEADER */}

      <header className="docs-header">

        <div className="brand">

          <div className="brand-logo">
            W
          </div>

          <div className="brand-text">

            <strong>
              DIN BOT
            </strong>

            <span>
              API DOCUMENTATION
            </span>

          </div>

        </div>

        <div className="header-right">

          <div className="api-live">
            <span />
            API ONLINE
          </div>

          <div className="header-version">
            v1.0.0
          </div>

        </div>

      </header>


      <div className="docs-layout">

        {/* SIDEBAR */}

        <aside className="docs-sidebar">

          <div className="sidebar-title">

            <span>
              DOCUMENTATION
            </span>

            <strong>
              Endpoints
            </strong>

          </div>


          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari endpoint..."
            />

          </div>


          <div className="endpoint-list">

            {filteredEndpoints.map(
              (endpoint) => (

                <button
                  key={endpoint.id}
                  className={
                    selected.id ===
                    endpoint.id
                      ? "endpoint-item active"
                      : "endpoint-item"
                  }
                  onClick={() =>
                    selectEndpoint(
                      endpoint
                    )
                  }
                >

                  <MethodBadge
                    method={
                      endpoint.method
                    }
                  />

                  <div className="endpoint-info">

                    <strong>
                      {endpoint.title}
                    </strong>

                    <span>
                      {endpoint.path}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>


          <div className="sidebar-footer">

            <span>
              DIN BOT API
            </span>

            <small>
              REST API
            </small>

          </div>

        </aside>


        {/* MAIN */}

        <main className="docs-main">

          <div className="docs-intro">

            <span className="eyebrow">
              DIN BOT / API
            </span>

            <h1>
              API Documentation
            </h1>

            <p>
              Dokumentasi API DIN BOT
              untuk mengelola koneksi,
              pairing, session dan
              perangkat WhatsApp.
            </p>

          </div>


          {/* ENDPOINT */}

          <section className="endpoint-header">

            <div className="endpoint-heading">

              <MethodBadge
                method={
                  selected.method
                }
              />

              <h2>
                {selected.title}
              </h2>

            </div>

            <p>
              {selected.description}
            </p>

            <div className="url-bar">

              <span>
                {selected.method}
              </span>

              <code>
                {getPath()}
              </code>

            </div>

          </section>


          {/* TESTER */}

          <section className="tester-card">

            <div className="card-heading">

              <div>

                <span className="eyebrow">
                  API TESTER
                </span>

                <h3>
                  Test Endpoint
                </h3>

              </div>

              <MethodBadge
                method={
                  selected.method
                }
              />

            </div>


            {selected.id ===
              "pairing" && (

              <div className="form-group">

                <label>
                  SESSION ID
                </label>

                <input
                  className="dark-input"
                  value={
                    sessionId
                  }
                  onChange={(e) =>
                    setSessionId(
                      e.target.value
                    )
                  }
                  placeholder="6281234567890"
                />

              </div>

            )}


            {selected.method ===
              "POST" && (

              <div className="form-group">

                <label>
                  REQUEST BODY
                </label>

                <textarea
                  className="code-input"
                  value={body}
                  onChange={(e) =>
                    setBody(
                      e.target.value
                    )
                  }
                  spellCheck="false"
                />

              </div>

            )}


            <button
              className="send-button"
              onClick={
                sendRequest
              }
              disabled={
                loading
              }
            >

              {loading ? (
                <>
                  <span className="loader" />
                  Sending Request...
                </>
              ) : (
                <>
                  ▶ Send Request
                </>
              )}

            </button>

          </section>


          {/* RESPONSE */}

          <section className="response-card">

            <div className="card-heading">

              <div>

                <span className="eyebrow">
                  RESPONSE
                </span>

                <h3>
                  Server Response
                </h3>

              </div>

              {response !== null && (

                <button
                  className="copy-button"
                  onClick={
                    copyResponse
                  }
                >
                  {copied
                    ? "✓ Copied"
                    : "Copy Response"}
                </button>

              )}

            </div>


            {response !== null && (

              <div className="response-meta">

                <div>

                  <span>
                    STATUS
                  </span>

                  <strong
                    className={
                      responseStatus >=
                        200 &&
                      responseStatus <
                        300
                        ? "status-success"
                        : "status-error"
                    }
                  >
                    {responseStatus === 0
                      ? "ERROR"
                      : responseStatus}
                  </strong>

                </div>

                <div>

                  <span>
                    TIME
                  </span>

                  <strong>
                    {responseTime} ms
                  </strong>

                </div>

                <div>

                  <span>
                    TYPE
                  </span>

                  <strong>
                    JSON
                  </strong>

                </div>

              </div>

            )}


            <div className="response-window">

              {response === null ? (

                <div className="empty-response">

                  <div className="terminal-icon">
                    {"</>"}
                  </div>

                  <strong>
                    Belum ada response
                  </strong>

                  <span>
                    Pilih endpoint lalu
                    klik Send Request.
                  </span>

                </div>

              ) : (

                <pre>
                  {responseText}
                </pre>

              )}

            </div>

          </section>


          {/* EXAMPLE */}

          {selected.example && (

            <section className="example-card">

              <div className="card-heading">

                <div>

                  <span className="eyebrow">
                    EXAMPLE
                  </span>

                  <h3>
                    Example Response
                  </h3>

                </div>

              </div>

              <pre>
                {JSON.stringify(
                  selected.example,
                  null,
                  2
                )}
              </pre>

            </section>

          )}


          <footer className="docs-footer">

            <span>
              DIN BOT API
            </span>

            <span>
              WhatsApp Automation API
            </span>

          </footer>

        </main>

      </div>

    </div>
  );
}
