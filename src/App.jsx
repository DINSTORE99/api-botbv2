import { useEffect, useState } from "react";
import "./style.css";

const money = n => new Intl.NumberFormat("id-ID", { style:"currency", currency:"IDR", maximumFractionDigits:0 }).format(n);

async function api(path, options={}) {
  const res = await fetch(path, { credentials:"include", ...options, headers:{ "Content-Type":"application/json", ...(options.headers||{}) } });
  const data = await res.json().catch(()=>({success:false,message:"Response tidak valid"}));
  if (!res.ok && data?.message) throw new Error(data.message);
  return data;
}

function Icon({type}){
  const p={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"};
  const paths={
    bot:<><rect x="4" y="7" width="16" height="12" rx="4"/><path d="M9 7V4h6v3M12 2v2M8 13h.01M16 13h.01M9 17h6"/></>,
    ai:<><path d="M12 3a3 3 0 0 0-3 3v1H7a4 4 0 0 0 0 8h2v1a3 3 0 0 0 6 0v-1h2a4 4 0 0 0 0-8h-2V6a3 3 0 0 0-3-3Z"/><path d="M9 11h.01M15 11h.01M10 14h4"/></>,
    download:<><path d="M12 3v11m0 0 4-4m-4 4-4-4"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    sticker:<><circle cx="12" cy="12" r="8"/><path d="M16 16h-3a4 4 0 0 1-4-4V9h3a4 4 0 0 1 4 4v3Z"/><path d="M8 9h.01M8 15h.01"/></>,
    zap:<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>,
    users:<><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M17 11a4 4 0 0 0 0-8M21 21v-2a4 4 0 0 0-3-3.87"/></>,
    devices:<><rect x="3" y="4" width="13" height="15" rx="2"/><path d="M7 22h5M19 8h2v11h-8v-2"/></>,
    menu:<><path d="M4 6h16M4 12h16M4 18h10"/></>,
    arrow:<path d="m9 18 6-6-6-6"/>,
    cloud:<><path d="M7 18a5 5 0 1 1 1.3-9.83A6 6 0 0 1 20 11a4 4 0 0 1-1 7H7Z"/></>,
    shield:<><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return <svg {...p}>{paths[type]||paths.bot}</svg>
}

function RobotArt({pink=false}){
  return <div className={`robotArt ${pink?"pink":""}`}>
    <div className="robotGlow"/>
    <div className="antenna"><i/></div>
    <div className="robotHead"><div className="robotFace"><span/><span/></div></div>
    <div className="robotBody"><i/><i/></div>
    <div className="waBubble">⌕</div>
  </div>
}

function App(){
  const [user,setUser]=useState(null),[loggedIn,setLoggedIn]=useState(false),[view,setView]=useState("home");
  const [plans,setPlans]=useState([]),[phone,setPhone]=useState(""),[pair,setPair]=useState(null),[busy,setBusy]=useState(false),[toast,setToast]=useState(""),[menu,setMenu]=useState("");
  const notify=t=>{setToast(t);setTimeout(()=>setToast(""),3500)};
  async function loadMe(){try{const d=await api("/api/auth/me");setLoggedIn(!!d.loggedIn);setUser(d.user||null);return d}catch{setLoggedIn(false);setUser(null)}}
  async function loadPlans(){try{const d=await api("/api/rental/plans");setPlans(d.plans||[])}catch{}}
  useEffect(()=>{loadMe();loadPlans()},[]);
  const login=()=>window.location.href="/api/auth/google";
  const logout=async()=>{await api("/api/auth/logout",{method:"POST"}).catch(()=>{});setLoggedIn(false);setUser(null);setView("home");notify("Berhasil logout")};
  async function freePair(){if(!phone.trim())return notify("Masukkan nomor WhatsApp.");try{setBusy(true);const d=await api("/api/pair",{method:"POST",body:JSON.stringify({number:phone})});if(!d.success)throw new Error(d.message||"Pairing gagal");setPair(d);notify(d.code?"Pairing code berhasil dibuat":"Bot berhasil diproses")}catch(e){notify(e.message)}finally{setBusy(false)}}
  async function paidPair(){if(!loggedIn)return login();if(!user?.plan||!user?.expiresAt||new Date(user.expiresAt)<=new Date())return notify("Paket berbayar belum aktif.");try{setBusy(true);const d=await api("/api/rental/pair",{method:"POST",body:JSON.stringify({number:phone})});if(!d.success)throw new Error(d.message||"Pairing gagal");setPair(d);notify("Bot berbayar berhasil diproses")}catch(e){notify(e.message)}finally{setBusy(false)}}
  async function loadMenu(){try{const d=await api("/api/rental/menu");setMenu(d.menu||"")}catch(e){notify(e.message)}}
  async function saveMenu(){try{await api("/api/rental/menu",{method:"PUT",body:JSON.stringify({menu})});notify("Menu berhasil disimpan")}catch(e){notify(e.message)}}
  const active=user?.expiresAt&&new Date(user.expiresAt)>new Date()&&user?.plan;

  const nav=(v)=>setView(v);
  return <div className="app">
    <header className="nav">
      <button className="brand" onClick={()=>nav("home")}><span className="brandBot">🤖</span><b>SI</b>BOT</button>
      <nav>
        <button className={view==="home"?"selected":""} onClick={()=>nav("home")}>Beranda</button>
        <button className={view==="free"?"selected":""} onClick={()=>nav("free")}>Bot Gratis</button>
        <button className={view==="paid"?"selected":""} onClick={()=>nav("paid")}>Sewa Bot</button>
        <button onClick={()=>nav("paid")}>Paket</button>
        <button onClick={()=>notify("Hubungi admin untuk bantuan SIBOT.")}>Kontak</button>
      </nav>
      <div className="navRight">
        <span className="online"><Icon type="cloud"/> Online 24/7</span>
        {loggedIn?<button className="avatarBtn" onClick={()=>nav("paid")}>{user?.picture?<img src={user.picture}/>:"U"}</button>:<button className="loginTop" onClick={login}>Masuk Google</button>}
        <button className="hamb" onClick={()=>notify("Gunakan menu navigasi di atas.")}><span/><span/><span/></button>
      </div>
    </header>

    <main>
      {view==="home"&&<>
        <section className="homeHero">
          <div className="heroCopy">
            <div className="badge">⚡ <b>SIBOT</b> - Bot WhatsApp Terbaik</div>
            <h1>Otomatisasi<br/><em>WhatsApp</em><br/>Tanpa Ribet.</h1>
            <p>Buat bot WhatsApp sendiri atau gunakan bot siap pakai untuk kebutuhan bisnis, toko, UMKM dan lainnya.</p>
          </div>
          <div className="heroVisual"><RobotArt/><div className="featureFloat f1"><Icon type="zap"/> Auto Respon</div><div className="featureFloat f2"><Icon type="menu"/> Menu Bot</div><div className="featureFloat f3"><Icon type="download"/> Downloader</div><div className="featureFloat f4"><Icon type="ai"/> AI Chat</div></div>
        </section>
        <section className="choiceCards">
          <button className="serviceCard freeCard" onClick={()=>nav("free")}><div className="serviceImg"><span>GRATIS</span><RobotArt/></div><div className="serviceText"><h2>Mulai Bot <em>Gratis</em></h2><p>Buat bot WhatsApp sendiri dengan mudah dan cepat. Tanpa biaya!</p><div className="checks"><span>● Pairing Code</span><span>● Banyak Fitur</span><span>● Gratis</span></div></div><span className="serviceArrow">Mulai Sekarang <Icon type="arrow"/></span></button>
          <button className="serviceCard rentCard" onClick={()=>nav("paid")}><div className="serviceImg"><span>SEWA</span><RobotArt pink/></div><div className="serviceText"><h2>Sewa Bot untuk <em>Bisnis</em></h2><p>Bot berjalan di server, tanpa perlu setup. Cocok untuk toko, UMKM, dan bisnis lainnya.</p><div className="checks"><span>● Bot 24/7</span><span>● Dashboard</span><span>● Support</span></div></div><span className="serviceArrow">Lihat Paket <Icon type="arrow"/></span></button>
        </section>
        <section className="features"><div className="sectionLabel">FITUR UNGGULAN</div><h2>Semua yang Kamu Butuhkan<br/><em>Dalam Satu Bot WhatsApp</em></h2><div className="featureGrid">
          {[['ai','AI Chat','Chat cerdas dengan teknologi AI'],['download','Downloader','Download video, foto, audio, dan lainnya'],['sticker','Sticker Maker','Buat stiker dengan mudah'],['zap','Auto Respon','Balas pesan otomatis 24 jam mudah'],['users','Group Tools','Kelola grup dengan lebih mudah'],['devices','Multi Device','Bisa di banyak perangkat sekaligus']].map(([i,t,d])=><div className="featureBox" key={t}><span className="iconBox"><Icon type={i}/></span><b>{t}</b><small>{d}</small></div>)}
        </div></section>
        <section className="cta" onClick={()=>nav("free")}><span>🚀</span><div><b>Siap Menggunakan SIBOT?</b><small>Pilih layanan yang sesuai dengan kebutuhanmu.</small></div><button>Mulai Sekarang <Icon type="arrow"/></button></section>
      </>}

      {view==="free"&&<section className="page"><button className="back" onClick={()=>nav("home")}>← Kembali</button><div className="pageHero"><div><span className="pageTag blue">GRATIS</span><h1>Buat Bot WhatsApp <em>Gratis.</em></h1><p>Hubungkan WhatsApp kamu dengan pairing code dan mulai menggunakan bot.</p></div><RobotArt/></div><div className="statusStrip"><span>🟢 <b>API SERVER</b><small>ONLINE</small></span><span>◉ <b>WHATSAPP</b><small>SIAP PAIRING</small></span><span>↓ <b>SESSIONS</b><small>0</small></span></div><div className="formCard big"><h2>Mulai Sekarang</h2><p>Masukkan nomor WhatsApp kamu untuk mendapatkan kode pairing.</p><div className="phoneInput"><span>🇮🇩 +62</span><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="81234567890" inputMode="numeric"/></div><button className="primary" disabled={busy} onClick={freePair}>{busy?"Memproses...":"Dapatkan Pairing Code"} <Icon type="arrow"/></button>{pair&&<div className="result"><small>PAIRING CODE</small><strong>{pair.code||"Bot sedang terhubung"}</strong><span>Session: {pair.sessionId}</span></div>}</div><div className="miniFeatures"><h2>Fitur Bot Gratis</h2><div>{['Auto Respon','Menu Bot','Downloader','Sticker Maker','AI Chat','Game & Hiburan','Tools WhatsApp','Dan Lainnya'].map(x=><span key={x}>✦ {x}</span>)}</div></div></section>}

      {view==="paid"&&<section className="page"><button className="back" onClick={()=>nav("home")}>← Kembali</button>{!loggedIn?<><div className="pageHero"><div><span className="pageTag pink">SEWA BOT</span><h1>Sewa Bot WhatsApp <em>Siap Pakai.</em></h1><p>Bot berjalan di server, tanpa perlu setup. Cocok untuk toko, UMKM dan bisnis lainnya.</p></div><RobotArt pink/></div><div className="statusStrip"><span>◷ <b>AKTIF 24/7</b><small>ONLINE</small></span><span>▣ <b>SERVER STABIL</b><small>SIAP</small></span><span>♧ <b>SUPPORT</b><small>PRIORITAS</small></span><span>⌁ <b>MONITORING</b><small>REALTIME</small></span></div></>:<div className="account card"><div className="avatar">{user?.picture?<img src={user.picture}/>:"U"}</div><div><b>{user?.name}</b><small>{user?.email}</small></div><span className="accountState">{active?user.plan.toUpperCase():"BELUM AKTIF"}</span><button onClick={logout}>Logout</button></div>}
        <h2 className="packageTitle">Pilih Paket Sewa</h2><div className="plans">{(plans.length?plans:[{id:'starter',name:'STARTER',price:15000,days:30,features:['1 Bot WhatsApp','Auto Respon','Menu Bot','Downloader','Support']},{id:'business',name:'BUSINESS',price:30000,days:30,features:['1 Bot WhatsApp','Semua Fitur Starter','AI Chat','Group Tools','Dashboard','Monitoring','Priority Support']},{id:'pro',name:'PRO',price:50000,days:30,features:['1 Bot WhatsApp','Semua Fitur Business','Multi Session','Advanced Tools','Monitoring Penuh','Priority Support']}]).map((p,idx)=><div className={`plan card ${idx===1?'popular':''}`} key={p.id}>{idx===1&&<span className="popularTag">POPULAR</span>}<b>{p.name}</b><h3>{money(p.price)}<small>/bulan</small></h3><ul>{p.features?.map(x=><li key={x}>✓ {x}</li>)}</ul><button className="primary" onClick={()=>loggedIn?notify("Hubungi admin untuk aktivasi paket: "+p.name):login()}>Pilih Paket <Icon type="arrow"/></button></div>)}</div>
        <div className="adminCall card"><div>🎧</div><p><b>Butuh Paket Khusus?</b><small>Hubungi admin untuk kebutuhan bot bisnis, jumlah bot atau paket lebih banyak.</small></p><button onClick={()=>notify("Silakan hubungi admin SIBOT.")}>Hubungi Admin ↗</button></div>
        {loggedIn&&active&&<><div className="formCard big"><div className="formHead"><div><h2>Aktifkan Bot</h2><p>Paket <b>{user.plan.toUpperCase()}</b> aktif sampai {new Date(user.expiresAt).toLocaleDateString('id-ID')}.</p></div><span className="activePill">AKTIF</span></div><div className="phoneInput"><span>🇮🇩 +62</span><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="81234567890" inputMode="numeric"/></div><button className="primary" disabled={busy} onClick={paidPair}>{busy?"Memproses...":"Dapatkan Pairing Code"} <Icon type="arrow"/></button>{pair&&<div className="result"><small>PAIRING CODE</small><strong>{pair.code||"Bot sedang terhubung"}</strong></div>}</div><div className="formCard big"><div className="formHead"><div><h2>Custom .menu</h2><p>Atur tampilan menu bot sesuai keinginan kamu.</p></div><button className="textBtn" onClick={loadMenu}>Muat Menu</button></div><textarea value={menu} onChange={e=>setMenu(e.target.value)} placeholder="Tulis menu bot kamu di sini..."/><button className="primary" onClick={saveMenu}>Simpan Menu</button></div></>}
      </section>}
    </main>
    <footer><button className="brand" onClick={()=>nav("home")}><span className="brandBot">🤖</span><b>SI</b>BOT</button><div>Beranda　•　Bot Gratis　•　Sewa Bot　•　Paket　•　Kontak</div><span>Powered by <b>DIN STORE</b></span></footer>
    {toast&&<div className="toast">{toast}</div>}
  </div>
}
export default App;
