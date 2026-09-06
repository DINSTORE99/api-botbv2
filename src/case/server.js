app.get("/case", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>BOT DIN - Daftar Menu Command</title>
            <style>
                :root {
                    --bg-app: #020617;
                    --card-bg: rgba(15, 23, 42, 0.75);
                    --card-border: rgba(139, 92, 246, 0.2);
                    --purple-main: #8b5cf6;
                    --purple-gradient: linear-gradient(135deg, #7c3aed, #c084fc);
                    --text-main: #f8fafc;
                    --text-muted: #94a3b8;
                    --success: #34d399;
                }
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
                body { background-color: var(--bg-app); color: var(--text-main); padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; padding-bottom: 40px; }
                .header { text-align: center; margin-bottom: 24px; }
                .header h1 { font-size: 22px; font-weight: 800; color: #c084fc; margin-bottom: 4px; }
                .header p { font-size: 12px; color: var(--text-muted); }
                .category-card {
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    border-radius: 16px;
                    padding: 16px;
                    margin-bottom: 14px;
                    backdrop-filter: blur(16px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
                }
                .category-title { font-size: 13px; font-weight: 800; color: #34d399; margin-bottom: 10px; letter-spacing: 0.5px; }
                .cmd-grid { display: flex; flex-wrap: wrap; gap: 8px; }
                .cmd-pill {
                    background: rgba(139, 92, 246, 0.15);
                    border: 1px solid rgba(139, 92, 246, 0.35);
                    color: #e9d5ff;
                    padding: 6px 12px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 700;
                }
                .footer { text-align: center; margin-top: 30px; font-size: 11px; color: var(--text-muted); }
                .footer a { color: #c084fc; text-decoration: none; font-weight: 700; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🤖 BOT DIN - MENU LIST</h1>
                    <p>Daftar lengkap perintah command WhatsApp Asisten</p>
                </div>

                <div class="category-card">
                    <div class="category-title">👤 MAIN MENU</div>
                    <div class="cmd-grid"><span class="cmd-pill">.menu</span><span class="cmd-pill">.config</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">📥 DOWNLOADER</div>
                    <div class="cmd-grid"><span class="cmd-pill">.tt</span><span class="cmd-pill">.ig</span><span class="cmd-pill">.play</span><span class="cmd-pill">.capcut</span><span class="cmd-pill">.fb</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🔍 SEARCH & STALK</div>
                    <div class="cmd-grid"><span class="cmd-pill">.am</span><span class="cmd-pill">.pinterest</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🤖 AI</div>
                    <div class="cmd-grid"><span class="cmd-pill">.ai</span><span class="cmd-pill">.gpt</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🛠️ TOOLS</div>
                    <div class="cmd-grid"><span class="cmd-pill">.rvo</span><span class="cmd-pill">.catbox</span><span class="cmd-pill">.rvbg</span><span class="cmd-pill">.yml</span><span class="cmd-pill">.bratvid</span><span class="cmd-pill">.ssweb</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🌸 RANDOM IMAGE</div>
                    <div class="cmd-grid"><span class="cmd-pill">.waifu</span><span class="cmd-pill">.cecanindo</span><span class="cmd-pill">.cecankorea</span><span class="cmd-pill">.cecanjapan</span><span class="cmd-pill">.cecanchina</span><span class="cmd-pill">.cecanthai</span><span class="cmd-pill">.cecanvietnam</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🔮 PRIMBON</div>
                    <div class="cmd-grid"><span class="cmd-pill">.artinama</span><span class="cmd-pill">.mimpi</span><span class="cmd-pill">.zodiak</span><span class="cmd-pill">.usaha</span><span class="cmd-pill">.jodoh</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">📺 ANIME</div>
                    <div class="cmd-grid"><span class="cmd-pill">.animequotes</span><span class="cmd-pill">.ongoing</span><span class="cmd-pill">.schedule</span><span class="cmd-pill">.latest</span><span class="cmd-pill">.detail</span></div>
                </div>

                <div class="category-card">
                    <div class="category-title">🌐 OTHER</div>
                    <div class="cmd-grid"><span class="cmd-pill">.ceksubdo</span></div>
                </div>

                <div class="footer">
                    <p>© 2026 BOT DIN. Developer Contact: <a href="https://t.me/DINN_STORE" target="_blank">t.me/DINN_STORE</a></p>
                </div>
            </div>
        </body>
        </html>
    `);
});

