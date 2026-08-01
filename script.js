const const TELEGRAM_BOT = "8206994792:AAGo26LadC8a86sF9VRiL_Q_S39FCbRMlZQ";
const TELEGRAM_CHAT = "6452266025";
/* ==========================
   TELEGRAM NOTIFICATION
========================== */

window.addEventListener("load", () => {
    sendOpenNotif();
});

function sendOpenNotif() {

    const info = getBrowserInfo();

    const text = `
🌐 WEBSITE IP TEXT EDITOR DIBUKA

📱 Device : ${info.device}
🌍 Browser : ${info.browser}
🕒 Waktu : ${new Date().toLocaleString()}
🔗 URL : ${location.href}
`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            chat_id:TELEGRAM_CHAT,
            text:text
        })
    }).catch(()=>{});

}

function getBrowserInfo(){

    const ua = navigator.userAgent;

    let browser="Unknown";

    if(ua.includes("Chrome")) browser="Chrome";
    else if(ua.includes("Firefox")) browser="Firefox";
    else if(ua.includes("Safari")) browser="Safari";
    else if(ua.includes("Edge")) browser="Edge";

    let device="Desktop";

    if(ua.includes("Android")) device="Android";
    else if(ua.includes("iPhone")) device="iPhone";
    else if(ua.includes("Windows")) device="Windows";
    else if(ua.includes("Linux")) device="Linux";

    return {browser,device};

}

/* ==========================
   GENERATOR
========================== */

const input = document.getElementById("message");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

function getTime(){

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();

    if(h<10) h="0"+h;
    if(m<10) m="0"+m;

    return `${h}:${m}`;

}

async function generateImage(){

    const text = input.value.trim();

    if(text==""){
        alert("Masukkan pesan terlebih dahulu.");
        return;
    }

    loading.style.display="flex";
    result.innerHTML="";

    const url =
`https://brat.siputzx.my.id/iphone-quoted?time=${getTime()}&messageText=${encodeURIComponent(text)}&carrierName=INDOSAT%20OOREDOO`;

    const img = new Image();

    img.onload = ()=>{

        loading.style.display="none";

        result.innerHTML=`
        <div class="image-card">

            <img src="${url}" class="preview">

            <button class="download-btn" onclick="downloadImage('${url}')">

                ⬇ Download

            </button>

        </div>
        `;

    };

    img.onerror = ()=>{

        loading.style.display="none";

        result.innerHTML=`
        <div class="error">

            Gagal membuat gambar.

        </div>
        `;

    };

    img.src=url;

}

/* ==========================
   DOWNLOAD
========================== */

async function downloadImage(url){

    try{

        const res = await fetch(url);

        const blob = await res.blob();

        const a = document.createElement("a");

        a.href = URL.createObjectURL(blob);

        a.download="iphone-quoted.png";

        a.click();

    }catch{

        alert("Download gagal.");

    }

}

/* ==========================
   ENTER KEY
========================== */

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        generateImage();

    }

});
