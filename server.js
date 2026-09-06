// Tambahkan di dalam file server.js (di bawah rute API yang sudah ada)

app.get("/case", (req, res) => {
    const listCase = [
        { category: "MAIN MENU", commands: [".menu", ".config"] },
        { category: "DOWNLOADER", commands: [".tt", ".ig", ".play", ".capcut", ".fb"] },
        { category: "SEARCH & STALK", commands: [".am", ".pinterest"] },
        { category: "AI", commands: [".ai", ".gpt"] },
        { category: "TOOLS", commands: [".rvo", ".catbox", ".rvbg", ".yml", ".bratvid", ".ssweb"] },
        { category: "RANDOM IMAGE", commands: [".waifu", ".cecanindo", ".cecankorea", ".cecanjapan", ".cecanchina", ".cecanthai", ".cecanvietnam"] },
        { category: "PRIMBON", commands: [".artinama", ".mimpi", ".zodiak", ".usaha", ".jodoh"] },
        { category: "ANIME", commands: [".animequotes", ".ongoing", ".schedule", ".latest", ".detail"] },
        { category: "OTHER", commands: [".ceksubdo"] }
    ];

    res.json({
        success: true,
        botName: "BOT DIN",
        developer: "t.me/DINN_STORE",
        totalCategories: listCase.length,
        features: listCase
    });
});

