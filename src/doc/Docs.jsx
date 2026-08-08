import React, { useMemo, useState } from "react";

const API = "";

const endpoints = [
  {
    id: "status",
    method: "GET",
    path: "/api/status",
    title: "Server Status",
    description:
      "Mengambil status server dan informasi session yang tersedia.",
    group: "Monitoring",
    request: "Tidak membutuhkan body.",
    response: `{
  "success": true,
  "serverOnline": true,
  "sessions": []
}`,
  },
  {
    id: "pair",
    method: "POST",
    path: "/api/pair",
    title: "Start Pairing",
    description:
      "Memulai proses pairing WhatsApp menggunakan nomor yang diberikan.",
    group: "WhatsApp",
    request: `{
  "number": "628xxxxxxxxxx"
}`,
    response: `{
  "success": true,
  "sessionId": "628xxxxxxxxxx",
  "pairingCode": "ABCD-EFGH"
}`,
  },
  {
    id: "pairing-status",
    method: "GET",
    path: "/api/pairing/{sessionId}",
    title: "Pairing Status",
    description:
      "Mengecek status session pairing sampai kode tersedia atau perangkat berhasil terhubung.",
    group: "WhatsApp",
    request: "Path parameter: sessionId",
    response: `{
  "code": "ABCD-EFGH",
  "connected": false
}`,
  },
  {
    id: "logout",
    method: "POST",
    path: "/api/logout",
    title: "Logout Session",
    description:
      "Menghapus atau memutus session WhatsApp yang dipilih.",
    group: "WhatsApp",
    request: `{
  "sessionId": "SESSION_ID"
}`,
    response: `{
  "success": true
}`,
  },
];

const colors = {
  bg: "#070a12",
  panel: "#0c111c",
  panel2: "#101827",
  border: "rgba(148,163,184,.13)",
  text: "#f8fafc",
  muted: "#94a3b8",
  dim: "#64748b",
  purple: "#a78bfa",
  cyan: "#67e8f9",
  green: "#4ade80",
  orange: "#fb923c",
  red: "#fb7185",
};

const methodColor = {
  GET: colors.cyan,
  POST: colors.purple,
};

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard can be unavailable on some browsers.
    }
  };

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        overflow: "hidden",
        background: "#070b13",
      }}
    >
      <button
        onClick={copy}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          zIndex: 2,
          border: `1px solid ${colors.border}`,
          background: "rgba(255,255,255,.05)",
          color: "#cbd5e1",
          borderRadius: 8,
          padding: "7px 10px",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre
        style={{
          margin: 0,
          padding: "20px",
          paddingRight: 85,
          overflowX: "auto",
          color: "#dbeafe",
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {children}
      </pre>
    </div>
  );
}

function MethodBadge({ method }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 54,
        padding: "5px 9px",
        borderRadius: 7,
        background: `${methodColor[method]}16`,
        border: `1px solid ${methodColor[method]}35`,
        color: methodColor[method],
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: ".05em",
      }}
    >
      {method}
    </span>
  );
}

export default function Docs() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("intro");
  const [mobileNav, setMobileNav] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return endpoints;

    return endpoints.filter((item) =>
      [
        item.title,
        item.path,
        item.method,
        item.group,
        item.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const scrollTo = (id) => {
    setActive(id);
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const endpointUrl = (path) =>
    `${window.location.origin}${path.replace("{sessionId}", "SESSION_ID")}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 15% 0%, rgba(124,58,237,.16), transparent 30%), radial-gradient(circle at 90% 15%, rgba(34,211,238,.08), transparent 25%), #070a12",
        color: colors.text,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        a { color: inherit; }
        .docs-grid { display:grid; grid-template-columns:250px minmax(0,1fr); gap:34px; }
        .docs-sidebar { position:sticky; top:22px; height:calc(100vh - 44px); overflow:auto; }
        .docs-mobile { display:none; }
        .endpoint-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .hero-grid { display:grid; grid-template-columns:1.3fr .7fr; gap:18px; }
        @media (max-width: 900px) {
          .docs-grid { grid-template-columns:1fr; }
          .docs-sidebar { display:none; }
          .docs-mobile { display:block; }
          .hero-grid { grid-template-columns:1fr; }
        }
        @media (max-width: 650px) {
          .docs-shell { padding:16px !important; }
          .endpoint-grid { grid-template-columns:1fr; }
          .hero-title { font-size:38px !important; }
        }
      `}</style>

      <div
        className="docs-shell"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "22px 24px 70px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "8px 0 22px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              fontWeight: 850,
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                borderRadius: 10,
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                color: "white",
                boxShadow: "0 8px 30px rgba(124,58,237,.25)",
              }}
            >
              W
            </span>
            <span>
              DIN BOT
              <small
                style={{
                  display: "block",
                  color: colors.dim,
                  fontSize: 10,
                  letterSpacing: ".12em",
                }}
              >
                API DOCUMENTATION
              </small>
            </span>
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 999,
                border: `1px solid ${colors.border}`,
                background: "rgba(255,255,255,.025)",
                color: colors.muted,
                fontSize: 12,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: colors.green,
                  boxShadow: `0 0 12px ${colors.green}`,
                }}
              />
              API ONLINE
            </div>

            <a
              href="/"
              style={{
                textDecoration: "none",
                border: `1px solid ${colors.border}`,
                padding: "9px 13px",
                borderRadius: 10,
                color: "#dbeafe",
                fontSize: 12,
              }}
            >
              Dashboard →
            </a>
          </div>
        </header>

        <div className="docs-mobile" style={{ marginTop: 16 }}>
          <button
            onClick={() => setMobileNav((v) => !v)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: 13,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              background: colors.panel,
              color: colors.text,
              cursor: "pointer",
            }}
          >
            ☰ Navigation
          </button>

          {mobileNav && (
            <div
              style={{
                marginTop: 8,
                padding: 10,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background: colors.panel,
              }}
            >
              <NavButton active={active === "intro"} onClick={() => scrollTo("intro")}>
                Introduction
              </NavButton>
              <NavButton active={active === "quickstart"} onClick={() => scrollTo("quickstart")}>
                Quick Start
              </NavButton>
              <NavButton active={active === "endpoints"} onClick={() => scrollTo("endpoints")}>
                Endpoints
              </NavButton>
              {endpoints.map((item) => (
                <NavButton
                  key={item.id}
                  active={active === item.id}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.method} {item.path}
                </NavButton>
              ))}
            </div>
          )}
        </div>

        <div className="docs-grid" style={{ marginTop: 28 }}>
          <aside className="docs-sidebar">
            <div
              style={{
                padding: 15,
                border: `1px solid ${colors.border}`,
                background: "rgba(12,17,28,.76)",
                backdropFilter: "blur(14px)",
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  color: colors.dim,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".13em",
                  marginBottom: 10,
                }}
              >
                CONTENTS
              </div>

              <NavButton active={active === "intro"} onClick={() => scrollTo("intro")}>
                Introduction
              </NavButton>
              <NavButton active={active === "quickstart"} onClick={() => scrollTo("quickstart")}>
                Quick Start
              </NavButton>
              <NavButton active={active === "endpoints"} onClick={() => scrollTo("endpoints")}>
                Endpoints
              </NavButton>

              <div
                style={{
                  color: colors.dim,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".13em",
                  margin: "18px 8px 8px",
                }}
              >
                API
              </div>

              {endpoints.map((item) => (
                <NavButton
                  key={item.id}
                  active={active === item.id}
                  onClick={() => scrollTo(item.id)}
                >
                  <span style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span
                      style={{
                        color: methodColor[item.method],
                        fontSize: 9,
                        fontWeight: 900,
                      }}
                    >
                      {item.method}
                    </span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.path}
                    </span>
                  </span>
                </NavButton>
              ))}
            </div>
          </aside>

          <main>
            <section
              id="intro"
              style={{
                scrollMarginTop: 25,
                padding: "30px 0 24px",
              }}
            >
              <div className="hero-grid">
                <div>
                  <div
                    style={{
                      color: colors.purple,
                      fontSize: 11,
                      fontWeight: 850,
                      letterSpacing: ".14em",
                    }}
                  >
                    DIN BOT · V1.0.0
                  </div>

                  <h1
                    className="hero-title"
                    style={{
                      fontSize: 58,
                      lineHeight: 1.02,
                      margin: "14px 0",
                      letterSpacing: "-.04em",
                    }}
                  >
                    Build with the
                    <br />
                    <span
                      style={{
                        background: "linear-gradient(90deg,#c4b5fd,#67e8f9)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      WhatsApp Bot API.
                    </span>
                  </h1>

                  <p
                    style={{
                      maxWidth: 680,
                      color: colors.muted,
                      lineHeight: 1.8,
                      fontSize: 16,
                    }}
                  >
                    Dokumentasi lengkap endpoint yang digunakan oleh dashboard
                    DIN BOT untuk monitoring server, pairing WhatsApp,
                    pengecekan session, dan logout.
                  </p>
                </div>

                <div
                  style={{
                    border: `1px solid ${colors.border}`,
                    background: "linear-gradient(145deg,#101827,#0a0f18)",
                    borderRadius: 20,
                    padding: 20,
                    alignSelf: "stretch",
                  }}
                >
                  <div style={{ color: colors.dim, fontSize: 11, marginBottom: 10 }}>
                    BASE URL
                  </div>
                  <code style={{ color: colors.cyan, fontSize: 14 }}>
                    {window.location.origin}
                  </code>

                  <div
                    style={{
                      marginTop: 28,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    <Stat value="4" label="Endpoints" />
                    <Stat value="2" label="Methods" />
                    <Stat value="JSON" label="Format" />
                    <Stat value="REST" label="Style" />
                  </div>
                </div>
              </div>
            </section>

            <section
              id="quickstart"
              style={{
                scrollMarginTop: 25,
                borderTop: `1px solid ${colors.border}`,
                paddingTop: 30,
                marginTop: 15,
              }}
            >
              <SectionTitle
                eyebrow="QUICK START"
                title="Mulai dalam beberapa langkah"
                description="Gunakan alur berikut untuk menghubungkan perangkat WhatsApp melalui dashboard."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
                  gap: 12,
                }}
              >
                {[
                  ["01", "Cek status", "Pastikan API dapat diakses melalui /api/status."],
                  ["02", "Mulai pairing", "Kirim nomor WhatsApp ke /api/pair."],
                  ["03", "Ambil kode", "Pantau /api/pairing/{sessionId} sampai kode tersedia."],
                  ["04", "Kelola session", "Gunakan Sessions atau /api/logout untuk mengelola koneksi."],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    style={{
                      padding: 17,
                      border: `1px solid ${colors.border}`,
                      background: colors.panel,
                      borderRadius: 15,
                    }}
                  >
                    <div style={{ color: colors.purple, fontWeight: 900, fontSize: 12 }}>
                      {number}
                    </div>
                    <h3 style={{ margin: "9px 0 6px", fontSize: 15 }}>{title}</h3>
                    <p style={{ margin: 0, color: colors.muted, fontSize: 13, lineHeight: 1.6 }}>
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              id="endpoints"
              style={{
                scrollMarginTop: 25,
                borderTop: `1px solid ${colors.border}`,
                paddingTop: 30,
                marginTop: 35,
              }}
            >
              <SectionTitle
                eyebrow="API REFERENCE"
                title="Endpoints"
                description="Cari endpoint berdasarkan method, path, atau fungsi."
              />

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search endpoint..."
                  style={{
                    width: "100%",
                    maxWidth: 520,
                    padding: "12px 14px",
                    borderRadius: 11,
                    border: `1px solid ${colors.border}`,
                    outline: "none",
                    background: colors.panel,
                    color: colors.text,
                  }}
                />
                <span style={{ color: colors.dim, fontSize: 12, whiteSpace: "nowrap" }}>
                  {filtered.length} result
                </span>
              </div>

              {filtered.length === 0 && (
                <div
                  style={{
                    padding: 25,
                    borderRadius: 14,
                    border: `1px solid ${colors.border}`,
                    color: colors.muted,
                  }}
                >
                  Endpoint tidak ditemukan.
                </div>
              )}

              {filtered.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  style={{
                    scrollMarginTop: 25,
                    padding: "25px 0",
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <MethodBadge method={item.method} />
                    <code
                      style={{
                        color: "#e2e8f0",
                        fontSize: 15,
                        wordBreak: "break-all",
                      }}
                    >
                      {item.path}
                    </code>
                  </div>

                  <h2 style={{ margin: "14px 0 7px", fontSize: 24 }}>
                    {item.title}
                  </h2>

                  <p
                    style={{
                      color: colors.muted,
                      lineHeight: 1.7,
                      marginTop: 0,
                    }}
                  >
                    {item.description}
                  </p>

                  <div
                    className="endpoint-grid"
                    style={{ marginTop: 18 }}
                  >
                    <div>
                      <div
                        style={{
                          color: colors.dim,
                          fontSize: 10,
                          fontWeight: 850,
                          letterSpacing: ".12em",
                          marginBottom: 9,
                        }}
                      >
                        REQUEST
                      </div>
                      <CodeBlock>{item.request}</CodeBlock>
                    </div>

                    <div>
                      <div
                        style={{
                          color: colors.dim,
                          fontSize: 10,
                          fontWeight: 850,
                          letterSpacing: ".12em",
                          marginBottom: 9,
                        }}
                      >
                        RESPONSE
                      </div>
                      <CodeBlock>{item.response}</CodeBlock>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 13,
                      padding: "11px 13px",
                      borderRadius: 10,
                      border: `1px solid ${colors.border}`,
                      background: "rgba(255,255,255,.02)",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ color: colors.dim, fontSize: 11 }}>URL</span>
                    <code style={{ color: colors.muted, fontSize: 12 }}>
                      {endpointUrl(item.path)}
                    </code>
                  </div>
                </article>
              ))}
            </section>

            <section
              style={{
                borderTop: `1px solid ${colors.border}`,
                marginTop: 20,
                padding: "30px 0",
              }}
            >
              <SectionTitle
                eyebrow="NOTES"
                title="Catatan integrasi"
                description="Dokumentasi ini mengikuti endpoint yang digunakan oleh frontend DIN BOT."
              />

              <div
                style={{
                  padding: 17,
                  borderRadius: 14,
                  border: `1px solid ${colors.border}`,
                  background: "rgba(251,146,60,.05)",
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                  fontSize: 13,
                }}
              >
                Pastikan backend menyediakan endpoint yang sama dan mengembalikan
                JSON dengan field yang dibutuhkan frontend, khususnya
                <code> success</code>, <code>sessionId</code>,
                <code> pairingCode</code>, <code>code</code>, dan
                <code> connected</code> sesuai alur endpoint masing-masing.
              </div>
            </section>

            <footer
              style={{
                paddingTop: 20,
                color: colors.dim,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              DIN BOT · API Documentation · V1.0.0
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        border: 0,
        background: active ? "rgba(167,139,250,.12)" : "transparent",
        color: active ? "#ddd6fe" : "#94a3b8",
        padding: "9px 10px",
        borderRadius: 9,
        cursor: "pointer",
        fontSize: 12,
        marginBottom: 2,
      }}
    >
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          color: "#64748b",
          fontSize: 10,
          fontWeight: 850,
          letterSpacing: ".13em",
          marginBottom: 7,
        }}
      >
        {eyebrow}
      </div>
      <h2 style={{ margin: 0, fontSize: 28 }}>{title}</h2>
      <p
        style={{
          color: "#94a3b8",
          lineHeight: 1.7,
          margin: "8px 0 0",
          maxWidth: 700,
          fontSize: 14,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        background: "rgba(255,255,255,.035)",
        border: "1px solid rgba(148,163,184,.08)",
      }}
    >
      <strong style={{ display: "block", fontSize: 18 }}>{value}</strong>
      <span style={{ color: "#64748b", fontSize: 11 }}>{label}</span>
    </div>
  );
}
