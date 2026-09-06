import { useMemo, useState } from "react";

const MENU_CATEGORIES = [
  {
    category: "MAIN MENU",
    commands: [".menu", ".config"]
  },
  {
    category: "DOWNLOADER",
    commands: [".tt", ".ig", ".play", ".capcut", ".fb"]
  },
  {
    category: "SEARCH & STALK",
    commands: [".am", ".pinterest"]
  },
  {
    category: "AI",
    commands: [".ai", ".gpt"]
  },
  {
    category: "TOOLS",
    commands: [".rvo", ".catbox", ".rvbg", ".yml", ".bratvid", ".ssweb"]
  },
  {
    category: "RANDOM IMAGE",
    commands: [".waifu", ".cecanindo", ".cecankorea", ".cecankorea", ".cecanjapan", ".cecanchina", ".cecanthai", ".cecanvietnam"]
  },
  {
    category: "PRIMBON",
    commands: [".artinama", ".mimpi", ".zodiak", ".usaha", ".jodoh"]
  },
  {
    category: "ANIME",
    commands: [".animequotes", ".ongoing", ".schedule", ".latest", ".detail"]
  },
  {
    category: "OTHER",
    commands: [".ceksubdo"]
  }
];

function CaseView() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return MENU_CATEGORIES;

    return MENU_CATEGORIES.map((cat) => ({
      ...cat,
      commands: cat.commands.filter((cmd) =>
        cmd.toLowerCase().includes(query) || cat.category.toLowerCase().includes(query)
      )
    })).filter((cat) => cat.commands.length > 0);
  }, [search]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .case-page {
          min-height: 100vh;
          background: #08090d;
          color: #f5f7fb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
          padding-bottom: 40px;
        }
        .case-header {
          height: 72px;
          border-bottom: 1px solid #1c1f29;
          background: rgba(8, 9, 13, .92);
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
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          font-weight: 900;
          font-size: 18px;
        }
        .brand strong { font-size: 14px; letter-spacing: 1px; }
        .brand span { color: #717887; font-size: 9px; letter-spacing: 1.5px; display: block; margin-top: 2px; }
        
        .case-container {
          max-width: 900px;
          margin: 40px auto 0;
          padding: 0 20px;
        }
        .case-intro {
          margin-bottom: 28px;
        }
        .case-intro h1 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .case-intro p {
          color: #8d94a3;
          font-size: 13px;
        }
        .search-box {
          height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #20232e;
          background: #101219;
          border-radius: 12px;
          padding: 0 14px;
          margin-bottom: 24px;
        }
        .search-box input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
          font-size: 13px;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .category-card {
          border: 1px solid #20232d;
          background: #0d1016;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .category-title {
          font-size: 12px;
          font-weight: 900;
          color: #c084fc;
          letter-spacing: 1px;
          margin-bottom: 12px;
          border-bottom: 1px solid #1c1f29;
          padding-bottom: 8px;
        }
        .command-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .command-item {
          background: #12151c;
          border: 1px solid #1c1f29;
          color: #e2e8f0;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 12px;
          font-weight: 700;
        }
        .case-footer {
          border-top: 1px solid #1c1f29;
          margin-top: 50px;
          padding: 24px 20px;
          display: flex;
          justify-content: space-between;
          color: #555c6b;
          font-size: 10px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .case-footer a { color: #c084fc; text-decoration: none; font-weight: 700; }
      `}</style>

      <div className="case-page">
        <header className="case-header">
          <div className="brand">
            <div className="brand-logo">D</div>
            <div>
              <strong>BOT DIN</strong>
              <span>WHATSAPP ASISTEN</span>
            </div>
          </div>
        </header>

        <div className="case-container">
          <div className="case-intro">
            <h1>Daftar Case & Command</h1>
            <p>Eksplorasi seluruh perintah interaktif WhatsApp Bot yang tersedia pada sistem.</p>
          </div>

          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Cari perintah atau kategori (contoh: menu, tt, ai)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categories-grid">
            {filteredCategories.map((cat, index) => (
              <div className="category-card" key={index}>
                <div className="category-title">❖ {cat.category}</div>
                <div className="command-list">
                  {cat.commands.map((cmd, idx) => (
                    <div className="command-item" key={idx}>
                      {cmd}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="case-footer">
          <span>© 2026 BOT DIN. All Rights Reserved.</span>
          <span>Developer: <a href="https://t.me/DINN_STORE" target="_blank" rel="noreferrer">t.me/DINN_STORE</a></span>
        </footer>
      </div>
    </>
  );
}

export default CaseView;
