import { useMemo, useState } from "react";

const MENU_ITEMS = [
  {
    id: "menu",
    category: "MAIN MENU",
    command: ".menu",
    name: "Menu Utama",
    description: "Menampilkan informasi status bot, waktu, uptime, ping, dan daftar kategori perintah.",
  },
  {
    id: "config",
    category: "MAIN MENU",
    command: ".config",
    name: "Konfigurasi Bot",
    description: "Melihat atau mengatur konfigurasi sistem bot yang sedang aktif.",
  },
  {
    id: "tt",
    category: "DOWNLOADER",
    command: ".tt",
    name: "TikTok Downloader",
    description: "Mengunduh video atau audio dari platform TikTok tanpa watermark.",
  },
  {
    id: "ig",
    category: "DOWNLOADER",
    command: ".ig",
    name: "Instagram Downloader",
    description: "Mengunduh postingan, reels, atau video dari Instagram.",
  },
  {
    id: "play",
    category: "DOWNLOADER",
    command: ".play",
    name: "YouTube Play",
    description: "Memutar atau mengunduh audio/musik dari YouTube berdasarkan judul lagu.",
  },
  {
    id: "capcut",
    category: "DOWNLOADER",
    command: ".capcut",
    name: "CapCut Downloader",
    description: "Mengunduh template video CapCut secara otomatis.",
  },
  {
    id: "fb",
    category: "DOWNLOADER",
    command: ".fb",
    name: "Facebook Downloader",
    description: "Mengunduh video publik dari platform Facebook.",
  },
  {
    id: "am",
    category: "SEARCH & STALK",
    command: ".am",
    name: "Apple Music Search",
    description: "Mencari daftar lagu atau informasi musik melalui Apple Music.",
  },
  {
    id: "pinterest",
    category: "SEARCH & STALK",
    command: ".pinterest",
    name: "Pinterest Search",
    description: "Mencari gambar atau referensi estetis dari Pinterest.",
  },
  {
    id: "ai",
    category: "AI",
    command: ".ai",
    name: "AI Assistant",
    description: "Berinteraksi dengan kecerdasan buatan untuk menjawab berbagai pertanyaan.",
  },
  {
    id: "gpt",
    category: "AI",
    command: ".gpt",
    name: "ChatGPT",
    description: "Model bahasa cerdas berbasis OpenAI untuk membantu berbagai tugas teks.",
  },
  {
    id: "rvo",
    category: "TOOLS",
    command: ".rvo",
    name: "View Once to Normal",
    description: "Membaca atau membuka kembali pesan sekali lihat (View Once) WhatsApp.",
  },
  {
    id: "catbox",
    category: "TOOLS",
    command: ".catbox",
    name: "Catbox Uploader",
    description: "Mengunggah file, gambar, atau media ke server Catbox.moe.",
  },
  {
    id: "rvbg",
    category: "TOOLS",
    command: ".rvbg",
    name: "Remove Background",
    description: "Menghapus latar belakang gambar secara otomatis.",
  },
  {
    id: "yml",
    category: "TOOLS",
    command: ".yml",
    name: "YML Converter",
    description: "Alat bantu konversi format data YML.",
  },
  {
    id: "bratvid",
    category: "TOOLS",
    command: ".bratvid",
    name: "Brat Video Maker",
    description: "Membuat stiker teks bergerak bergaya Brat.",
  },
  {
    id: "ssweb",
    category: "TOOLS",
    command: ".ssweb",
    name: "Screenshot Website",
    description: "Mengambil tangkapan layar tampilan halaman web secara penuh.",
  },
  {
    id: "waifu",
    category: "RANDOM IMAGE",
    command: ".waifu",
    name: "Random Waifu",
    description: "Menampilkan gambar karakter anime waifu secara acak.",
  },
  {
    id: "cecanindo",
    category: "RANDOM IMAGE",
    command: ".cecanindo",
    name: "Cecan Indo",
    description: "Menampilkan foto cecan (cewek cantik) Nusantara.",
  },
  {
    id: "cecankorea",
    category: "RANDOM IMAGE",
    command: ".cecankorea",
    name: "Cecan Korea",
    description: "Menampilkan foto cewek cantik asal Korea.",
  },
  {
    id: "cecanjapan",
    category: "RANDOM IMAGE",
    command: ".cecanjapan",
    name: "Cecan Japan",
    description: "Menampilkan foto cewek cantik asal Jepang.",
  },
  {
    id: "cecanchina",
    category: "RANDOM IMAGE",
    command: ".cecanchina",
    name: "Cecan China",
    description: "Menampilkan foto cewek cantik asal China.",
  },
  {
    id: "cecanthai",
    category: "RANDOM IMAGE",
    command: ".cecanthai",
    name: "Cecan Thai",
    description: "Menampilkan foto cewek cantik asal Thailand.",
  },
  {
    id: "cecanvietnam",
    category: "RANDOM IMAGE",
    command: ".cecanvietnam",
    name: "Cecan Vietnam",
    description: "Menampilkan foto cewek cantik asal Vietnam.",
  },
  {
    id: "artinama",
    category: "PRIMBON",
    command: ".artinama",
    name: "Arti Nama",
    description: "Meneropong makna dan karakteristik di balik sebuah nama.",
  },
  {
    id: "mimpi",
    category: "PRIMBON",
    command: ".mimpi",
    name: "Tafsir Mimpi",
    description: "Mencari arti atau pertanda dari bunga tidur yang dialami.",
  },
  {
    id: "zodiak",
    category: "PRIMBON",
    command: ".zodiak",
    name: "Zodiak & Horoskop",
    description: "Melihat ramalan zodiak harian dan peruntungan.",
  },
  {
    id: "usaha",
    category: "PRIMBON",
    command: ".usaha",
    name: "Primbon Usaha",
    description: "Menerawang kecocokan dan peruntungan dalam berwirausaha.",
  },
  {
    id: "jodoh",
    category: "PRIMBON",
    command: ".jodoh",
    name: "Ramalan Jodoh",
    description: "Mengecek tingkat kecocokan pasangan berdasarkan primbon.",
  },
  {
    id: "animequotes",
    category: "ANIME",
    command: ".animequotes",
    name: "Anime Quotes",
    description: "Menampilkan kutipan kata-kata bijak dari karakter anime.",
  },
  {
    id: "ongoing",
    category: "ANIME",
    command: ".ongoing",
    name: "Anime Ongoing",
    description: "Melihat daftar anime yang sedang tayang musim ini.",
  },
  {
    id: "schedule",
    category: "ANIME",
    command: ".schedule",
    name: "Anime Schedule",
    description: "Melihat jadwal rilis episode anime terbaru.",
  },
  {
    id: "latest",
    category: "ANIME",
    command: ".latest",
    name: "Latest Anime",
    description: "Mencari pembaruan rilis anime paling fresh.",
  },
  {
    id: "detail",
    category: "ANIME",
    command: ".detail",
    name: "Anime Detail",
    description: "Melihat informasi lengkap seputar sinopsis dan rating anime.",
  },
  {
    id: "ceksubdo",
    category: "OTHER",
    command: ".ceksubdo",
    name: "Cek Subdomain",
    description: "Melakukan pengecekan daftar subdomain dari sebuah website.",
  },
];

function CaseDocs() {
  const [selectedId, setSelectedId] = useState("menu");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const selected = MENU_ITEMS.find((item) => item.id === selectedId) || MENU_ITEMS[0];

  const filteredItems = useMemo(() => {
    const value = search.toLowerCase().trim();
    if (!value) return MENU_ITEMS;

    return MENU_ITEMS.filter((item) =>
      `${item.name} ${item.command} ${item.category}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(selected.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .docs-page {
          min-height: 100vh;
          background: #08090d;
          color: #f5f7fb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
        }
        .docs-header {
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
          box-shadow: 0 0 12px #36d778;
        }

        .docs-layout {
          display: grid;
          grid-template-columns: 290px minmax(0, 1fr);
          min-height: calc(100vh - 72px);
        }
        .docs-sidebar {
          border-right: 1px solid #1c1f29;
          background: #0b0d12;
          padding: 28px 18px;
          position: sticky;
          top: 72px;
          height: calc(100vh - 72px);
          display: flex;
          flex-direction: column;
        }
        .sidebar-title {
          padding: 0 10px 18px;
        }
        .sidebar-title span, .eyebrow {
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
        .endpoint-item strong {
          display: block;
          font-size: 11px;
        }
        .endpoint-item span:last-child {
          display: block;
          margin-top: 3px;
          color: #646b7b;
          font-family: monospace;
          font-size: 9px;
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
          flex-shrink: 0;
          color: #c084fc;
          background: rgba(139, 92, 246, 0.15);
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

        .docs-main {
          width: 100%;
          max-width: 1050px;
          padding: 55px 55px 30px;
        }
        .docs-intro {
          margin-bottom: 48px;
        }
        .docs-intro h1 {
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.1;
          letter-spacing: -1.5px;
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
        .url-bar > span {
          color: #62dd99;
          font-size: 9px;
          font-weight: 900;
        }
        .url-bar code {
          color: #d5dae3;
          font-size: 12px;
          font-family: monospace;
        }
        .url-bar button {
          margin-left: auto;
          flex-shrink: 0;
        }

        .tester-card, .response-card {
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
          margin-bottom: 18px;
        }
        .card-heading h3 {
          margin: 5px 0 0;
          font-size: 17px;
        }

        .small-button, .copy-button {
          border: 1px solid #292d39;
          background: #141720;
          color: #aab0bd;
          border-radius: 7px;
          padding: 7px 10px;
          font-size: 9px;
          cursor: pointer;
        }
        .small-button:hover, .copy-button:hover {
          color: white;
          background: #1a1d27;
        }

        .response-window {
          min-height: 180px;
          max-height: 400px;
          overflow: auto;
          background: #07090d;
          border: 1px solid #191c24;
          border-radius: 9px;
        }
        .response-window pre {
          margin: 0;
          padding: 18px;
          color: #c9ced8;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
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
          .docs-layout { display: block; }
          .docs-sidebar { position: relative; top: 0; height: auto; border-right: 0; border-bottom: 1px solid #1c1f29; }
          .docs-main { padding: 35px 16px; }
          .url-bar { flex-wrap: wrap; padding: 10px 12px; }
          .url-bar button { margin-left: 0; }
        }
      `}</style>

      <div className="docs-page">
        <header className="docs-header">
          <div className="brand">
            <div className="brand-logo">D</div>
            <div>
              <strong>BOT DIN</strong>
              <span>CASE DOCUMENTATION</span>
            </div>
          </div>
          <div className="header-right">
            <div className="api-live">
              <span />
              SYSTEM ONLINE
            </div>
            <code>v2.0.0</code>
          </div>
        </header>

        <div className="docs-layout">
          <aside className="docs-sidebar">
            <div className="sidebar-title">
              <span>COMMANDS</span>
              <strong>List Case Bot</strong>
            </div>

            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Cari command..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="endpoint-list">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  className={`endpoint-item ${selectedId === item.id ? "active" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span className="method-badge">{item.command}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="sidebar-footer">
              <span>BOT DIN</span>
              <small>t.me/DINN_STORE</small>
            </div>
          </aside>

          <main className="docs-main">
            <div className="docs-intro">
              <span className="eyebrow">COMMAND REFERENCE</span>
              <h1>WhatsApp Bot Cases</h1>
              <p>Dokumentasi interaktif untuk melihat daftar seluruh command dan kategori fitur yang tersedia pada sistem bot.</p>
            </div>

            {selected && (
              <div>
                <div className="endpoint-header">
                  <div className="endpoint-heading">
                    <span className="method-badge">{selected.command}</span>
                    <h2>{selected.name}</h2>
                  </div>
                  <p>{selected.description}</p>

                  <div className="url-bar">
                    <span>KATEGORI</span>
                    <code>{selected.category}</code>
                    <button className="small-button" onClick={copyCommand}>
                      {copied ? "Berhasil Disalin!" : "Salin Command"}
                    </button>
                  </div>
                </div>

                <div className="tester-card">
                  <div className="card-heading">
                    <div>
                      <span className="eyebrow">DETAIL INFORMASI</span>
                      <h3>Format Penggunaan</h3>
                    </div>
                  </div>
                  <div className="response-window">
                    <pre>{`Ketik perintah berikut di ruang obrolan WhatsApp:
👉 ${selected.command}

Kategori : ${selected.category}
Fungsi   : ${selected.description}
Status   : Aktif & Siap Digunakan`}</pre>
                  </div>
                </div>

                <div className="response-card">
                  <div className="card-heading">
                    <div>
                      <span className="eyebrow">PREVIEW SWITCH CASE</span>
                      <h3>Code Block Handler</h3>
                    </div>
                  </div>
                  <div className="response-window">
                    <pre>{`case "${selected.command.replace(".", "")}": {
  // Logika penanganan untuk perintah ${selected.command}
  await sock.sendMessage(m.key.remoteJid, { 
    text: "Memproses perintah ${selected.command}..." 
  }, { quoted: m });
  break;
}`}</pre>
                  </div>
                </div>
              </div>
            )}

            <footer className="docs-footer">
              <span>© 2026 BOT DIN. All Rights Reserved.</span>
              <span>Developer: t.me/DINN_STORE</span>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}

export default CaseDocs;
