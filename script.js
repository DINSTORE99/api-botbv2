const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";

/* =========================
   TELEGRAM OPEN NOTIF
========================= */
function sendOpenNotif() {
  const info = getBrowserInfo();
  
  const message = `
🌐 WEBSITE IP TEXS DIBUKA 
📱 Device: ${info.device}
🌍 Browser: ${info.browser}
⏰ Waktu: ${new Date().toLocaleString()}
🔗 URL: ${window.location.href}
  `;
  
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT,
        text: message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Telegram OK:", data))
    .catch(err => console.log("Telegram ERROR:", err));
}

/* =========================
   DEVICE INFO
========================= */
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

/* =========================
   AUTO SEND SAAT WEB OPEN
========================= */
window.addEventListener("load", () => {
  sendOpenNotif();
});

function getTimeNow() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  return `${h}:${m}`;
}

function generateImage() {
  const message = document.getElementById("message").value.trim();
  if (message === "") return alert("Isi dulu pesannya ya!");

  const time = getTimeNow();
  const url = `https://brat.siputzx.my.id/iphone-quoted?time=${time}&messageText=${encodeURIComponent(message)}&carrierName=INDOSAT%20OOREDOO`;

  // Tampilkan gambar dulu
  document.getElementById("result").innerHTML = `
    <img id="previewImg" src="${url}" style="width:100%;border-radius:18px;margin-top:15px;">
    <button id="downloadBtn" onclick="downloadImage('${url}')" style="margin-top:10px;padding:10px 15px;border:none;border-radius:10px;background:#1d9bf0;color:white;cursor:pointer;animation:pulse 1.5s infinite;">
      ⬇️ Download
    </button>
  `;
}

async function downloadImage(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "iphone-quoted.png";
    link.click();
  } catch (err) {
    alert("Gagal download, coba ulang.");
  }
}

/* Animasi tombol */
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
`;
document.head.appendChild(style);
