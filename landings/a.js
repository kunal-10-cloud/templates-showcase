window.LANDINGS = window.LANDINGS || {};

/* ---------------- FIELD · Job OS : dark charcoal, hi-vis orange, split hero ---------------- */
window.LANDINGS.field = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Inter+Tight:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#101114;color:#F2F1EE;font-family:'Inter Tight',Arial,sans-serif}
.grid{position:absolute;inset:0;background-image:linear-gradient(#1a1c21 1px,transparent 1px),linear-gradient(90deg,#1a1c21 1px,transparent 1px);background-size:48px 48px;opacity:.6}
.glow{position:absolute;right:-200px;top:-200px;width:900px;height:900px;background:radial-gradient(circle,rgba(255,106,19,.22),transparent 60%)}
nav{position:relative;display:flex;align-items:center;justify-content:space-between;padding:28px 72px}
.logo{font-family:Archivo;font-weight:900;font-size:22px;letter-spacing:-.02em;display:flex;align-items:center;gap:10px}
.logo i{width:26px;height:26px;background:#FF6A13;clip-path:polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)}
.links{display:flex;gap:34px;font-size:15px;color:#A7A9B0}
.cta{background:#FF6A13;color:#140700;font-weight:600;padding:11px 20px;border-radius:4px;font-size:15px}
.hero{position:relative;display:grid;grid-template-columns:600px 1fr;gap:40px;padding:56px 72px 0}
.tag{display:inline-flex;align-items:center;gap:10px;border:1px solid #2c2f36;padding:7px 14px;border-radius:100px;font-size:13px;color:#C8CAD0}
.tag b{width:8px;height:8px;border-radius:50%;background:#3DDC97;box-shadow:0 0 12px #3DDC97;animation:p 1.6s infinite}
@keyframes p{50%{opacity:.3}}
h1{font-family:Archivo;font-weight:900;font-size:84px;line-height:.95;letter-spacing:-.035em;margin-top:26px;text-transform:uppercase}
h1 span{color:#FF6A13}
.sub{font-size:19px;line-height:1.55;color:#B4B6BD;margin-top:26px;max-width:520px}
.btns{display:flex;gap:14px;margin-top:34px}
.b1{background:#FF6A13;color:#140700;font-weight:700;padding:17px 26px;border-radius:4px;font-size:16px}
.b2{border:1px solid #3a3d45;padding:17px 26px;border-radius:4px;font-size:16px;color:#E6E6E6}
.proof{display:flex;gap:40px;margin-top:46px;padding-top:26px;border-top:1px solid #24262c}
.proof div b{font-family:Archivo;font-size:30px;font-weight:800;display:block}
.proof div span{font-size:13px;color:#8C8F97}
.stage{position:relative;height:700px}
.win{position:absolute;left:0;top:10px;width:700px;height:470px;background:#F5F4F1;border-radius:10px;box-shadow:0 40px 80px rgba(0,0,0,.6);overflow:hidden;color:#16171B}
.wbar{height:34px;background:#E8E6E1;display:flex;align-items:center;gap:7px;padding:0 14px}
.wbar i{width:10px;height:10px;border-radius:50%;background:#C9C6BF}
.wbar span{margin-left:14px;font-size:12px;color:#77757A}
.wbody{display:grid;grid-template-columns:150px 1fr;height:436px}
.side{background:#16171B;padding:16px 12px;display:flex;flex-direction:column;gap:9px}
.side div{height:9px;border-radius:2px;background:#2b2d33}
.side div.on{background:#FF6A13}
.main{padding:18px 20px}
.mh{display:flex;justify-content:space-between;align-items:center}
.mh b{font-family:Archivo;font-size:18px}
.mh span{font-size:12px;background:#16171B;color:#fff;padding:5px 10px;border-radius:3px}
.hrs{display:grid;grid-template-columns:110px repeat(9,1fr);font-size:10px;color:#9a988f;margin-top:14px}
.lane{display:grid;grid-template-columns:110px 1fr;align-items:center;height:56px;border-bottom:1px solid #e5e2db;font-size:12px;font-weight:600}
.lane .tr{position:relative;height:40px}
.job{position:absolute;top:4px;height:32px;border-radius:3px;padding:4px 7px;font-size:10.5px;line-height:1.2;overflow:hidden}
.j1{background:#FFE3D1;border-left:3px solid #FF6A13}.j2{background:#DDE8FF;border-left:3px solid #2F6BFF}.j3{background:#D9F4E6;border-left:3px solid #179E5B}
.mv{animation:mv 5s ease-in-out infinite}
@keyframes mv{0%,35%{left:62%}55%,90%{left:30%}100%{left:62%}}
.phone{position:absolute;right:20px;top:200px;width:230px;height:450px;background:#0A0A0C;border-radius:34px;padding:10px;box-shadow:0 30px 70px rgba(0,0,0,.6)}
.ps{width:100%;height:100%;background:#F5F4F1;border-radius:26px;padding:26px 16px;color:#16171B;display:flex;flex-direction:column;gap:12px}
.ps small{font-size:11px;color:#8a8880}
.ps h4{font-family:Archivo;font-size:20px;line-height:1.1}
.map{height:120px;border-radius:12px;background:#E3E1DA;position:relative;overflow:hidden}
.map:before{content:"";position:absolute;left:0;right:0;top:55px;height:9px;background:#fff}
.map:after{content:"";position:absolute;top:0;bottom:0;left:90px;width:9px;background:#fff}
.pin{position:absolute;width:14px;height:14px;border-radius:50%;background:#FF6A13;border:3px solid #fff;left:40px;top:52px;z-index:2;animation:dr 6s ease-in-out infinite}
@keyframes dr{0%{left:20px;top:52px}50%{left:88px;top:52px}100%{left:88px;top:10px}}
.go{margin-top:auto;background:#FF6A13;color:#140700;text-align:center;font-weight:700;padding:14px;border-radius:12px;font-size:15px}
.float{position:absolute;background:#1B1D22;border:1px solid #2f323a;border-radius:8px;padding:14px 16px;font-size:13px;box-shadow:0 20px 40px rgba(0,0,0,.5)}
.f1{left:-40px;top:420px;width:280px;animation:fl 6s ease-in-out infinite}
.f1 em{font-style:normal;font-size:11px;color:#3DDC97;font-weight:600;letter-spacing:.06em}
.f1 p{margin-top:6px;color:#E8E8EA;line-height:1.4}
.f2{left:20px;top:560px;width:230px;animation:fl 7s ease-in-out infinite reverse}
.f2 b{font-family:Archivo;font-size:28px;display:block}
.f2 span{color:#8C8F97;font-size:12px}
@keyframes fl{50%{transform:translateY(-10px)}}
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<nav><div class="logo"><i></i>JOB OS</div><div class="links"><span>Product</span><span>Trades</span><span>AI receptionist</span><span>Customers</span></div><div class="cta">Start free</div></nav>
<section class="hero"><div>
<div class="tag"><b></b>Answering calls for 4,200 trade businesses right now</div>
<h1>Every call booked.<br>Every job <span>paid.</span></h1>
<p class="sub">The operating system for HVAC, plumbing and electrical shops. An AI that answers the phone at 9pm, quotes with three options, dispatches the right tech and gets paid before the van leaves.</p>
<div class="btns"><div class="b1">Book a 15-min demo</div><div class="b2">See it run a real day</div></div>
<div class="proof"><div><b>31%</b><span>more jobs booked</span></div><div><b>1.8 days</b><span>invoice to paid</span></div><div><b>0</b><span>missed calls after hours</span></div></div>
</div>
<div class="stage">
<div class="win"><div class="wbar"><i></i><i></i><i></i><span>Brightline Heating · Schedule · Thu 1 Oct</span></div>
<div class="wbody"><div class="side"><div class="on" style="width:70%"></div><div style="width:85%"></div><div style="width:60%"></div><div style="width:76%"></div><div style="width:52%"></div><div style="width:68%"></div></div>
<div class="main"><div class="mh"><b>Dispatch board</b><span>14 visits · 5 techs</span></div>
<div class="hrs"><span></span><span>8a</span><span>9</span><span>10</span><span>11</span><span>12p</span><span>1</span><span>2</span><span>3</span><span>4</span></div>
<div class="lane"><span>Sam Carter</span><div class="tr"><div class="job j1" style="left:0;width:24%">Linda Park<br>AC repair</div><div class="job j2" style="left:28%;width:20%">Diaz<br>Tune-up</div><div class="job j2" style="left:56%;width:28%">Kim Dental<br>RTU service</div></div></div>
<div class="lane"><span>Dev Patel</span><div class="tr"><div class="job j3" style="left:4%;width:22%">Greg Hollis<br>Furnace</div><div class="job j1 mv" style="width:26%">Raj Patel<br>No heat · urgent</div></div></div>
<div class="lane"><span>Luis Romero</span><div class="tr"><div class="job j3" style="left:0;width:62%">Ana Ruiz · Water heater install</div><div class="job j2" style="left:66%;width:22%">Lee<br>Drain</div></div></div>
<div class="lane"><span>Jess Kim</span><div class="tr"><div class="job j2" style="left:36%;width:26%">Oak Hill Dental<br>Panel</div><div class="job j2" style="left:66%;width:16%">Ortiz</div></div></div>
<div class="lane"><span>Tom Baker</span><div class="tr"><div class="job j3" style="left:8%;width:32%">Ruiz (assist)</div></div></div>
</div></div></div>
<div class="phone"><div class="ps"><small>Next · 8:00–10:00 · 12 min</small><h4>Linda Park<br>AC not cooling</h4><div class="map"><div class="pin"></div></div><small>4108 Shoal Creek Blvd · Carrier 2012</small><div class="go">On my way</div></div></div>
<div class="float f1"><em>AI RECEPTIONIST · 9:14 PM</em><p>Booked Linda Park for Thu 8–10am with Sam and drafted a $485 / $8,900 / $13,400 quote.</p></div>
<div class="float f2"><b>$4,860</b><span>collected on site today</span></div>
</div></section></body></html>`;

/* ---------------- AUTO · Dealer OS : bright, editorial centered type, product below ---------------- */
window.LANDINGS.auto = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Manrope:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#F6F7FB;color:#0B0D17;font-family:Manrope,Arial,sans-serif}
nav{display:flex;align-items:center;justify-content:space-between;padding:26px 80px}
.logo{font-family:Unbounded;font-weight:800;font-size:20px;letter-spacing:-.02em}
.logo span{color:#1F4BFF}
.links{display:flex;gap:36px;font-size:15px;color:#4A4E5E;font-weight:500}
.cta{background:#0B0D17;color:#fff;padding:11px 20px;border-radius:100px;font-size:14px;font-weight:600}
.hero{text-align:center;padding-top:20px}
.pill{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1px solid #E1E3EC;border-radius:100px;padding:6px 14px 6px 6px;font-size:13px;font-weight:600}
.pill b{background:#FFD23F;padding:3px 10px;border-radius:100px;font-size:12px}
h1{font-family:Unbounded;font-weight:700;font-size:62px;line-height:1.02;letter-spacing:-.04em;margin:18px auto 0;width:1100px}
h1 em{font-style:normal;color:#1F4BFF}
.sub{font-size:19px;color:#5A5E6E;margin:20px auto 0;width:720px;line-height:1.5}
.btns{display:flex;justify-content:center;gap:12px;margin-top:28px}
.b1{background:#1F4BFF;color:#fff;font-weight:700;padding:16px 26px;border-radius:100px;font-size:15px}
.b2{background:#fff;border:1px solid #D8DBE6;padding:16px 26px;border-radius:100px;font-size:15px;font-weight:600}
.stage{position:relative;width:1180px;margin:32px auto 0}
.app{background:#fff;border:1px solid #E1E3EC;border-radius:22px;box-shadow:0 30px 80px rgba(20,30,80,.12);padding:22px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.car{border:1px solid #ECEEF4;border-radius:14px;overflow:hidden}
.ph{height:96px;position:relative;display:flex;align-items:flex-end;justify-content:center}
.ph svg{width:84%;margin-bottom:10px}
.cb{padding:12px 14px}
.cb b{display:block;font-size:14px}
.cb small{color:#7A7E8E;font-size:12px}
.row{display:flex;justify-content:space-between;align-items:center;margin-top:8px}
.price{font-family:Unbounded;font-size:15px;font-weight:700}
.st{font-size:11px;font-weight:700;padding:3px 9px;border-radius:100px}
.l{background:#E3EAFF;color:#1F4BFF}.s{background:#E2F6EA;color:#178A4C}.p{background:#FFF3CC;color:#8A6400}
.chan{display:flex;gap:5px;margin-top:8px}
.chan span{font-size:10px;border:1px solid #E1E3EC;border-radius:4px;padding:1px 5px;color:#5A5E6E}
.fl{position:absolute;background:#fff;border:1px solid #E1E3EC;border-radius:16px;box-shadow:0 20px 50px rgba(20,30,80,.15);padding:16px 18px}
.f1{left:-70px;top:250px;width:270px;animation:a 6s ease-in-out infinite}
.f1 small{font-size:11px;font-weight:700;color:#1F4BFF;letter-spacing:.06em}
.f1 p{font-size:14px;margin-top:6px;line-height:1.4}
.f1 .rep{margin-top:10px;background:#0B0D17;color:#fff;font-size:12.5px;padding:9px 11px;border-radius:12px 12px 12px 4px}
.f2{right:-50px;top:40px;width:240px;animation:a 7s ease-in-out infinite reverse}
.f2 small{font-size:12px;color:#7A7E8E}
.f2 b{font-family:Unbounded;font-size:30px;display:block;margin-top:4px}
.f2 .bar{height:8px;border-radius:5px;background:#EEF0F6;margin-top:10px;overflow:hidden}
.f2 .bar i{display:block;height:100%;width:72%;background:#1F4BFF}
@keyframes a{50%{transform:translateY(-10px)}}
</style></head><body>
<nav><div class="logo">dealer<span>os</span></div><div class="links"><span>Inventory</span><span>Publish</span><span>Leads</span><span>Pricing</span></div><div class="cta">Get started</div></nav>
<section class="hero">
<div class="pill"><b>New</b>Post to Facebook Marketplace in one click</div>
<h1>Sell the car before it <em>sits</em> on the lot.</h1>
<p class="sub">Scan a VIN, snap guided photos and list everywhere at once. Dealer OS answers "is it still available?" at midnight and shows what every car really made.</p>
<div class="btns"><div class="b1">Start with your inventory</div><div class="b2">Watch a 2-min tour</div></div>
</section>
<div class="stage">
<div class="app">
<div class="car"><div class="ph" style="background:#E9EEFF"><svg viewBox="0 0 200 70"><path d="M15 50 Q20 30 50 28 L80 14 Q100 8 130 14 L160 28 Q185 32 188 50 Z" fill="#1F4BFF"/><circle cx="55" cy="52" r="12" fill="#0B0D17"/><circle cx="150" cy="52" r="12" fill="#0B0D17"/><path d="M84 18 L125 18 L148 30 L70 30 Z" fill="#C9D6FF"/></svg></div><div class="cb"><b>2019 Honda Civic EX</b><small>41,200 mi · VIN 2HGFC2F7…</small><div class="row"><span class="price">$18,900</span><span class="st l">Listed</span></div><div class="chan"><span>Website</span><span>CarGurus</span><span>FB</span></div></div></div>
<div class="car"><div class="ph" style="background:#FFF4D6"><svg viewBox="0 0 200 70"><path d="M12 52 L18 30 Q22 22 40 22 L70 10 L140 10 L165 24 Q186 26 190 52 Z" fill="#E8A400"/><circle cx="52" cy="54" r="12" fill="#0B0D17"/><circle cx="152" cy="54" r="12" fill="#0B0D17"/><path d="M76 14 L135 14 L155 26 L68 26 Z" fill="#FFE7A3"/></svg></div><div class="cb"><b>2021 Toyota RAV4 XLE</b><small>28,450 mi · 1 owner</small><div class="row"><span class="price">$27,400</span><span class="st l">Listed</span></div><div class="chan"><span>Website</span><span>Autotrader</span><span>FB</span></div></div></div>
<div class="car"><div class="ph" style="background:#E7F6EE"><svg viewBox="0 0 200 70"><path d="M10 52 L14 34 L60 30 L74 12 L118 12 L124 30 L188 32 L190 52 Z" fill="#178A4C"/><circle cx="48" cy="54" r="12" fill="#0B0D17"/><circle cx="158" cy="54" r="12" fill="#0B0D17"/><path d="M80 16 L114 16 L118 30 L72 30 Z" fill="#BDEBD1"/></svg></div><div class="cb"><b>2017 Ford F-150 XLT</b><small>76,010 mi · recon $1,240</small><div class="row"><span class="price">$24,750</span><span class="st p">In prep</span></div><div class="chan"><span>Needs photos</span></div></div></div>
<div class="car"><div class="ph" style="background:#F1F1F4"><svg viewBox="0 0 200 70"><path d="M14 50 Q22 32 52 28 L84 16 Q104 12 126 16 L160 28 Q184 32 188 50 Z" fill="#2A2D3A"/><circle cx="56" cy="52" r="12" fill="#0B0D17"/><circle cx="150" cy="52" r="12" fill="#0B0D17"/><path d="M88 20 L124 20 L146 30 L76 30 Z" fill="#9FA3B5"/></svg></div><div class="cb"><b>2020 Tesla Model 3</b><small>33,800 mi · 22 days</small><div class="row"><span class="price">$26,200</span><span class="st s">Sold</span></div><div class="chan"><span>Delisted everywhere</span></div></div></div>
<div class="car" style="grid-column:span 2;padding:16px;display:flex;flex-direction:column;gap:10px"><b style="font-size:14px">Profit per car · September</b><svg viewBox="0 0 500 110" style="width:100%;height:110px"><path d="M0 90 L60 80 L120 84 L180 62 L240 66 L300 44 L360 50 L420 28 L500 18" fill="none" stroke="#1F4BFF" stroke-width="3"/><path d="M0 90 L60 80 L120 84 L180 62 L240 66 L300 44 L360 50 L420 28 L500 18 L500 110 L0 110Z" fill="#1F4BFF" opacity=".08"/><circle cx="500" cy="18" r="5" fill="#1F4BFF"/></svg><div class="row"><small style="color:#7A7E8E;font-size:12px">Avg gross per unit</small><span class="price">$2,214</span></div></div>
<div class="car" style="grid-column:span 2;padding:16px;display:flex;flex-direction:column;gap:9px"><b style="font-size:14px">Aging stock</b>
<div class="row" style="margin:0"><small style="font-size:13px">2016 Jeep Cherokee · 74 days</small><span class="st p">Drop $500?</span></div>
<div class="row" style="margin:0"><small style="font-size:13px">2018 Nissan Rogue · 61 days</small><span class="st p">Reprice</span></div>
<div class="row" style="margin:0"><small style="font-size:13px">2015 BMW 328i · 58 days</small><span class="st l">Boost on FB</span></div></div>
</div>
<div class="fl f1"><small>NEW LEAD · 11:47 PM · FACEBOOK</small><p>"Is the 2019 Civic still available?"</p><div class="rep">Yes! It's here with 41k miles. Want to test drive Saturday at 10?</div></div>
<div class="fl f2"><small>Avg days on lot</small><b>31 days</b><div class="bar"><i></i></div><small style="display:block;margin-top:8px">down from 44 before Dealer OS</small></div>
</div></body></html>`;

/* ---------------- REPAIR · Shop OS : bold deep-green colour band, yellow accent, phone ---------------- */
window.LANDINGS.repair = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#0E3B36;color:#F4F1E8;font-family:'Familjen Grotesk',Arial,sans-serif}
.stripe{position:absolute;right:0;top:0;width:470px;height:900px;background:#F4C430}
.stripe:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent 0 22px,rgba(14,59,54,.08) 22px 44px)}
nav{position:relative;display:flex;align-items:center;justify-content:space-between;padding:28px 64px}
.logo{font-size:23px;font-weight:700;letter-spacing:-.02em;display:flex;gap:10px;align-items:center}
.logo i{width:24px;height:24px;border:4px solid #F4C430;border-radius:50%;position:relative}
.links{display:flex;gap:32px;font-size:15px;color:#B9CCC6;margin-right:430px}
.cta{position:absolute;right:64px;top:24px;background:#0E3B36;color:#F4C430;padding:12px 20px;font-size:14px;font-weight:600;border-radius:2px}
.hero{position:relative;padding:60px 64px 0;width:820px}
.mono{font-family:'IBM Plex Mono';font-size:13px;color:#F4C430;letter-spacing:.1em}
h1{font-size:92px;line-height:.92;letter-spacing:-.045em;font-weight:700;margin-top:22px}
h1 u{text-decoration:none;color:#F4C430}
.sub{font-size:20px;line-height:1.5;color:#C5D6D0;margin-top:28px;width:600px}
.btns{display:flex;gap:14px;margin-top:34px}
.b1{background:#F4C430;color:#0E3B36;font-weight:700;padding:17px 26px;font-size:16px;border-radius:2px}
.b2{border:1.5px solid #5F8C83;padding:17px 26px;font-size:16px;border-radius:2px}
.stats{display:grid;grid-template-columns:repeat(3,190px);margin-top:54px;border-top:1px solid #2E5E57}
.stats div{padding:18px 18px 0 0}
.stats b{font-size:38px;font-weight:700;letter-spacing:-.03em;display:block}
.stats span{font-family:'IBM Plex Mono';font-size:12px;color:#93B2AA}
.phone{position:absolute;right:90px;top:110px;width:300px;height:620px;background:#111;border-radius:42px;padding:11px;box-shadow:-30px 40px 80px rgba(0,0,0,.35);transform:rotate(-4deg)}
.sc{background:#FBFAF6;border-radius:33px;height:100%;padding:30px 18px;color:#14211F;display:flex;flex-direction:column;gap:12px}
.sc .from{font-family:'IBM Plex Mono';font-size:11px;color:#6F7B78}
.bub{background:#ECEAE3;border-radius:16px 16px 16px 4px;padding:12px 13px;font-size:14px;line-height:1.4}
.insp{border:1px solid #E1DED4;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:9px;background:#fff}
.it{display:flex;justify-content:space-between;align-items:center;font-size:13px}
.d{font-family:'IBM Plex Mono';font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:3px}
.r{background:#FCE1DC;color:#B22A1A}.y{background:#FFF1C2;color:#8A6400}.g{background:#DDF3E6;color:#18723F}
.tot{display:flex;justify-content:space-between;font-weight:700;font-size:15px;padding-top:8px;border-top:1px dashed #D8D4C8}
.ap{margin-top:auto;background:#0E3B36;color:#F4C430;text-align:center;padding:14px;border-radius:14px;font-weight:700}
.card{position:absolute;background:#fff;color:#14211F;border-radius:6px;padding:16px 18px;box-shadow:0 24px 50px rgba(0,0,0,.25)}
.c1{right:430px;top:560px;width:280px;animation:f 6s ease-in-out infinite}
.c1 .mono{color:#18723F}
.c1 p{margin-top:6px;font-size:15px;line-height:1.35}
.c2{right:24px;top:470px;width:220px;animation:f 7s ease-in-out infinite reverse}
.bays{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px}
.bays i{height:38px;border-radius:3px;background:#0E3B36}
.bays i.e{background:#E9E6DC}
@keyframes f{50%{transform:translateY(-10px)}}
</style></head><body>
<div class="stripe"></div>
<nav><div class="logo"><i></i>Shop OS</div><div class="links"><span>Workflow</span><span>Inspections</span><span>Parts</span><span>Pricing</span></div><div class="cta">Book a demo</div></nav>
<section class="hero">
<div class="mono">AUTO REPAIR SHOP SOFTWARE / EST. 2026</div>
<h1>Get the <u>yes</u> before the car is cold.</h1>
<p class="sub">Digital inspections with photos, estimates customers approve by text, and a bay board that shows exactly which car is waiting on what.</p>
<div class="btns"><div class="b1">Try it on 10 repair orders</div><div class="b2">See a live inspection</div></div>
<div class="stats" style="grid-template-columns:repeat(3,200px)"><div><b>+$118</b><span>AVG TICKET LIFT</span></div><div><b>14 min</b><span>TO APPROVAL</span></div><div><b>4.9/5</b><span>FROM 620 SHOPS</span></div></div><div class="mono" style="margin-top:46px;color:#7FA49B">WORKS WITH  PARTSTECH · WORLDPAC · QUICKBOOKS · CARFAX</div>
</section>
<div class="phone"><div class="sc">
<div class="from">FIXWELL AUTO · 10:12 AM</div>
<div class="bub">Hi Sam, Dana here. We inspected your F-150. Photos and options below.</div>
<div class="insp">
<div class="it">Front brake pads 2mm<span class="d r">URGENT</span></div>
<div class="it">Rotors scored<span class="d y">SOON</span></div>
<div class="it">Cabin air filter<span class="d y">SOON</span></div>
<div class="it">Tyres 7/32"<span class="d g">GOOD</span></div>
<div class="tot"><span>Brakes + rotors</span><span>$684</span></div>
</div>
<div class="ap">Approve $684</div>
</div></div>
<div class="card c1"><div class="mono">APPROVED BY TEXT · 10:26</div><p>Sam Ortiz approved brakes + rotors on the 2014 F-150.</p></div>
<div class="card c2"><div class="mono" style="color:#6F7B78">BAYS RIGHT NOW</div><div class="bays"><i></i><i></i><i class="e"></i><i></i></div><p style="font-size:13px;margin-top:8px">3 of 4 busy · next free 11:40</p></div>
</body></html>`;

/* ---------------- CLINIC · Clinic OS : soft mint light, serif headline, booking widget ---------------- */
window.LANDINGS.clinic = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#EEF4F0;color:#13261F;font-family:'Inter Tight',Arial,sans-serif}
.blob{position:absolute;right:-120px;top:120px;width:820px;height:820px;border-radius:50%;background:#D6E8DE}
nav{position:relative;display:flex;align-items:center;justify-content:space-between;padding:28px 80px}
.logo{font-family:Fraunces;font-size:25px;font-weight:600;letter-spacing:-.02em}
.logo span{color:#2E7D5B;font-style:italic}
.links{display:flex;gap:34px;font-size:15px;color:#4E645B}
.cta{border:1px solid #13261F;padding:10px 18px;border-radius:100px;font-size:14px;font-weight:500}
.hero{position:relative;display:grid;grid-template-columns:560px 1fr;gap:40px;padding:64px 80px 0}
.k{font-size:13px;font-weight:600;letter-spacing:.12em;color:#2E7D5B;text-transform:uppercase}
h1{font-family:Fraunces;font-weight:400;font-size:76px;line-height:1.02;letter-spacing:-.025em;margin-top:22px}
h1 i{color:#2E7D5B}
.sub{font-size:19px;line-height:1.6;color:#4E645B;margin-top:26px}
.btns{display:flex;gap:12px;margin-top:34px}
.b1{background:#13261F;color:#EEF4F0;padding:16px 26px;border-radius:100px;font-weight:600;font-size:15px}
.b2{padding:16px 22px;font-size:15px;font-weight:600;text-decoration:underline;text-underline-offset:5px}
.quote{margin-top:48px;display:flex;gap:14px;align-items:center}
.av{display:flex}
.av i{width:38px;height:38px;border-radius:50%;border:3px solid #EEF4F0;margin-left:-10px}
.quote p{font-size:14px;color:#4E645B;line-height:1.4}
.quote b{color:#13261F}
.stage{position:relative;height:720px}
.book{position:absolute;left:0;top:0;width:420px;background:#fff;border-radius:24px;padding:26px;box-shadow:0 30px 70px rgba(19,38,31,.12)}
.book h3{font-family:Fraunces;font-weight:500;font-size:24px}
.book small{color:#6C8178;font-size:13px}
.svc{margin-top:18px;border:1.5px solid #2E7D5B;border-radius:14px;padding:14px;display:flex;justify-content:space-between;font-size:14px}
.svc span{color:#6C8178}
.days{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:18px}
.days div{border:1px solid #E1EAE5;border-radius:12px;padding:10px 0;text-align:center;font-size:12px;color:#6C8178}
.days div b{display:block;font-size:18px;color:#13261F;margin-top:2px}
.days div.on{background:#13261F;border-color:#13261F;color:#A9C9BB}
.days div.on b{color:#fff}
.slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}
.slots div{border:1px solid #E1EAE5;border-radius:10px;padding:10px;text-align:center;font-size:14px;font-weight:500}
.slots div.on{background:#DDF0E6;border-color:#2E7D5B;color:#1E5C42}
.slots div.x{color:#B8C5BF;text-decoration:line-through}
.confirm{margin-top:18px;background:#2E7D5B;color:#fff;text-align:center;padding:14px;border-radius:14px;font-weight:600}
.cal{position:absolute;left:300px;top:450px;width:390px;background:#13261F;color:#EEF4F0;border-radius:22px;padding:20px;box-shadow:0 30px 70px rgba(19,38,31,.25)}
.cal .h{display:flex;justify-content:space-between;font-size:13px;color:#A9C9BB}
.ev{margin-top:10px;display:grid;grid-template-columns:56px 1fr auto;gap:10px;align-items:center;font-size:13.5px;padding:9px 10px;border-radius:10px;background:#1C3A2F}
.ev small{color:#A9C9BB;font-size:12px;display:block}
.ev em{font-style:normal;font-size:11px;font-weight:600;padding:3px 8px;border-radius:100px;background:#2E7D5B}
.ev em.w{background:#C79A3A;color:#13261F}
.n{position:absolute;background:#fff;border-radius:16px;padding:14px 16px;box-shadow:0 20px 50px rgba(19,38,31,.14);font-size:13.5px}
.n1{left:0;top:500px;width:250px;animation:f 6s ease-in-out infinite}
.n1 b{font-family:Fraunces;font-size:34px;font-weight:500;display:block;color:#2E7D5B}
.n2{left:450px;top:70px;width:220px;animation:f 7s ease-in-out infinite reverse}
.n2 small{color:#6C8178;font-size:12px}
@keyframes f{50%{transform:translateY(-9px)}}
</style></head><body>
<div class="blob"></div>
<nav><div class="logo">Clinic<span>OS</span></div><div class="links"><span>Scheduling</span><span>Notes</span><span>Billing</span><span>For physios</span></div><div class="cta">Book a walkthrough</div></nav>
<section class="hero"><div>
<div class="k">Practice software for allied health</div>
<h1>Practice software <i>patients</i> actually like.</h1>
<p class="sub">Online booking that fills your diary, reminders that end no-shows, notes in two minutes and claims that get paid. Built for physio, therapy and dental clinics.</p>
<div class="btns"><div class="b1">Start a 30-day trial</div><div class="b2">See how booking works</div></div>
<div class="quote"><div class="av"><i style="background:#C9DFD3;margin-left:0"></i><i style="background:#E5C8A8"></i><i style="background:#A9C2D9"></i></div><p><b>"Our no-shows halved in six weeks."</b><br>Dr. Hannah Cole, Riverbend Physio · 1,900 clinics use Clinic OS</p></div>
</div>
<div class="stage">
<div class="book"><h3>Book with Riverbend Physio</h3><small>Leeds · Room 2 · Dr. Hannah Cole</small>
<div class="svc"><div><b>Initial assessment</b><br><span>45 min</span></div><b>£65</b></div>
<div class="days"><div>Mon<b>28</b></div><div>Tue<b>29</b></div><div class="on">Wed<b>30</b></div><div>Thu<b>1</b></div><div>Fri<b>2</b></div></div>
<div class="slots"><div class="x">08:00</div><div class="on">09:15</div><div>10:30</div><div>11:45</div><div class="x">14:00</div><div>15:15</div></div>
<div class="confirm">Confirm Wed 30 Sep, 09:15</div></div>
<div class="cal"><div class="h"><span>TODAY · ROOM 2</span><span>8 patients</span></div>
<div class="ev"><b>08:00</b><div>Olivia Grant<small>Sports massage</small></div><em>Checked in</em></div>
<div class="ev"><b>10:00</b><div>Noah Patel<small>ACL rehab · week 6</small></div><em class="w">Arriving</em></div>
<div class="ev"><b>14:00</b><div>Ella Moore<small>Post-op ankle</small></div><em>Confirmed</em></div></div>
<div class="n n1"><b>-48%</b>no-shows with SMS + WhatsApp reminders</div>
<div class="n n2"><small>REMINDER SENT · 18:00</small><p style="margin-top:4px">Noah, see you tomorrow at 10:00. Reply C to confirm.</p></div>
</div></section></body></html>`;

/* ---------------- PROPERTY · Property OS : white bento grid, forest + lime ---------------- */
window.LANDINGS.property = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#FAFAF7;color:#0F1F17;font-family:'DM Sans',Arial,sans-serif}
nav{display:flex;align-items:center;justify-content:space-between;padding:24px 64px;border-bottom:1px solid #E8E8E1}
.logo{font-family:Sora;font-weight:700;font-size:20px;display:flex;align-items:center;gap:9px}
.logo i{width:22px;height:22px;background:#14532D;border-radius:5px;position:relative}
.logo i:after{content:"";position:absolute;left:6px;top:6px;width:10px;height:10px;background:#C6F432;border-radius:2px}
.links{display:flex;gap:32px;font-size:15px;color:#4F5D55}
.cta{background:#14532D;color:#fff;padding:11px 20px;border-radius:8px;font-size:14px;font-weight:600}
.bento{display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:330px 360px;gap:18px;padding:34px 64px}
.t{border-radius:20px;padding:26px;position:relative;overflow:hidden}
.head{grid-column:span 7;background:#14532D;color:#F3F7EC;display:flex;flex-direction:column}
.head small{font-size:12.5px;font-weight:600;letter-spacing:.1em;color:#C6F432}
.head h1{font-family:Sora;font-weight:600;font-size:56px;line-height:1.04;letter-spacing:-.035em;margin-top:16px}
.head p{font-size:17px;line-height:1.5;color:#BCD0C2;margin-top:14px;width:560px}
.btns{display:flex;gap:10px;margin-top:auto}
.b1{background:#C6F432;color:#0F1F17;font-weight:700;padding:14px 22px;border-radius:10px;font-size:15px}
.b2{border:1px solid #4A7A5C;padding:14px 22px;border-radius:10px;font-size:15px}
.rent{grid-column:span 5;background:#fff;border:1px solid #E8E8E1}
.lbl{font-size:13px;color:#6B7A72;font-weight:500}
.big{font-family:Sora;font-size:44px;font-weight:600;letter-spacing:-.03em;margin-top:4px}
.up{font-size:13px;color:#14532D;background:#E8F7C6;padding:3px 9px;border-radius:100px;font-weight:600}
.bars{display:flex;align-items:flex-end;gap:10px;height:150px;margin-top:22px}
.bars i{flex:1;background:#E3EAD9;border-radius:6px 6px 0 0}
.bars i.h{background:#14532D}
.occ{grid-column:span 3;background:#C6F432}
.ring{width:150px;height:150px;border-radius:50%;background:conic-gradient(#14532D 0 96%,rgba(20,83,45,.15) 96%);margin:22px auto 0;display:grid;place-items:center}
.ring div{width:112px;height:112px;border-radius:50%;background:#C6F432;display:grid;place-items:center;font-family:Sora;font-size:30px;font-weight:700}
.mt{grid-column:span 5;background:#fff;border:1px solid #E8E8E1}
.tk{display:grid;grid-template-columns:1fr auto;gap:4px;padding:13px 0;border-bottom:1px solid #F0F0EA;font-size:14.5px}
.tk small{color:#6B7A72;font-size:12.5px}
.s{font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:100px;align-self:center}
.u{background:#FDE2DC;color:#B42318}.b{background:#E1EBFF;color:#2650C7}.d{background:#E8F7C6;color:#14532D}
.own{grid-column:span 4;background:#0F1F17;color:#F3F7EC}
.own .lbl{color:#93A79A}
.line{display:flex;justify-content:space-between;font-size:14.5px;padding:10px 0;border-bottom:1px solid #22372B}
.line b{font-family:Sora}
.sent{margin-top:16px;display:flex;align-items:center;gap:9px;font-size:13px;color:#C6F432}
.sent i{width:8px;height:8px;border-radius:50%;background:#C6F432;animation:p 1.6s infinite}
@keyframes p{50%{opacity:.3}}
</style></head><body>
<nav><div class="logo"><i></i>Property OS</div><div class="links"><span>Rent</span><span>Maintenance</span><span>Owners</span><span>Pricing</span></div><div class="cta">Talk to sales</div></nav>
<div class="bento">
<div class="t head"><small>FOR LANDLORDS AND PROPERTY MANAGERS</small><h1>Rent in on the 1st. Repairs sorted by the 2nd.</h1><p>Leases, rent collection, maintenance and owner statements in one calm place, for 20 units or 2,000.</p><div class="btns"><div class="b1">Import your portfolio</div><div class="b2">See a sample owner statement</div></div></div>
<div class="t rent"><div style="display:flex;justify-content:space-between;align-items:center"><span class="lbl">Rent collected · October</span><span class="up">+6.2%</span></div><div class="big">£212,480</div><div class="bars"><i style="height:52%"></i><i style="height:60%"></i><i style="height:58%"></i><i style="height:70%"></i><i style="height:74%"></i><i style="height:81%"></i><i style="height:78%"></i><i class="h" style="height:92%"></i></div></div>
<div class="t occ"><span class="lbl" style="color:#14532D">Occupancy</span><div class="ring"><div>96%</div></div><p style="text-align:center;margin-top:16px;font-size:14px;font-weight:500">238 of 248 units let</p></div>
<div class="t mt"><span class="lbl">Maintenance requests</span>
<div class="tk"><div>Boiler, no heating<br><small>7A Didsbury Rd · reported 07:02</small></div><span class="s u">Urgent</span></div>
<div class="tk"><div>Leak under kitchen sink<br><small>14B Ancoats Mill · plumber Thu 9am</small></div><span class="s b">Booked</span></div>
<div class="tk"><div>Mould check, bathroom<br><small>22 Northern Quarter · contractor quote £180</small></div><span class="s b">Quoted</span></div><div class="tk" style="border:0"><div>Smoke alarm annual test<br><small>Building 3 · 12 flats</small></div><span class="s d">Done</span></div></div>
<div class="t own"><span class="lbl">Owner statement · J. Whitfield</span><div class="line" style="margin-top:12px"><span>Rent received</span><b>£9,840</b></div><div class="line"><span>Repairs</span><b>−£420</b></div><div class="line"><span>Management fee</span><b>−£787</b></div><div class="line" style="border:0"><span>Paid to owner</span><b style="color:#C6F432">£8,633</b></div><div class="sent"><i></i>Sent automatically on 3 Oct</div></div>
</div></body></html>`;

/* ---------------- REALESTATE · Agent CRM : dark editorial, sand accent, angled overlapping cards ---------------- */
window.LANDINGS.realestate = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#0E1116;color:#EDE6DA;font-family:Outfit,Arial,sans-serif}
.lines{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 179px,rgba(217,185,138,.06) 179px 180px)}
nav{position:relative;display:flex;align-items:center;justify-content:space-between;padding:30px 80px}
.logo{font-family:'DM Serif Display';font-size:26px}
.logo i{color:#D9B98A}
.links{display:flex;gap:38px;font-size:15px;color:#A49C8E;font-weight:300}
.cta{border:1px solid #D9B98A;color:#D9B98A;padding:11px 22px;font-size:14px;letter-spacing:.04em}
.hero{position:relative;padding:50px 80px 0;width:760px}
.k{font-size:13px;letter-spacing:.24em;color:#D9B98A;text-transform:uppercase}
h1{font-family:'DM Serif Display';font-weight:400;font-size:88px;line-height:.98;letter-spacing:-.02em;margin-top:24px}
h1 i{color:#D9B98A}
.sub{font-size:19px;line-height:1.6;color:#A49C8E;margin-top:26px;width:560px;font-weight:300}
.btns{display:flex;gap:16px;margin-top:36px}
.b1{background:#D9B98A;color:#0E1116;font-weight:500;padding:17px 28px;font-size:15px;letter-spacing:.02em}
.b2{padding:17px 4px;font-size:15px;border-bottom:1px solid #6C6457}
.press{margin-top:58px;display:flex;gap:42px;align-items:center;font-family:'DM Serif Display';font-size:20px;color:#5E584E}
.press span{font-family:Outfit;font-size:12px;letter-spacing:.2em;color:#6C6457}
.cards{position:absolute;right:60px;top:110px;width:620px;height:760px}
.c{position:absolute;background:#F4EFE6;color:#15181E;border-radius:4px;box-shadow:0 40px 90px rgba(0,0,0,.55)}
.list{left:110px;top:0;width:400px;transform:rotate(3deg)}
.house{height:230px;background:linear-gradient(180deg,#DCC9AA,#C9B08A);position:relative;overflow:hidden}
.house svg{position:absolute;left:0;bottom:0;width:100%}
.li{padding:18px 22px}
.li small{font-size:11px;letter-spacing:.18em;color:#8A7C66}
.li h3{font-family:'DM Serif Display';font-size:28px;font-weight:400;margin-top:4px}
.li .r{display:flex;gap:18px;font-size:13.5px;color:#5C5547;margin-top:8px}
.li .p{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:14px;border-top:1px solid #DED5C5}
.li .p b{font-family:'DM Serif Display';font-size:30px;font-weight:400}
.tag{font-size:11px;background:#15181E;color:#D9B98A;padding:5px 10px;letter-spacing:.12em}
.pipe{left:0;top:470px;width:440px;padding:18px 20px;transform:rotate(-4deg);background:#1A1F27;color:#EDE6DA;border:1px solid #2A303A}
.pipe small{font-size:11px;letter-spacing:.18em;color:#D9B98A}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.cols div{font-size:11px;color:#8E877B;letter-spacing:.08em}
.cols p{background:#242A34;border-left:2px solid #D9B98A;padding:8px;font-size:12.5px;color:#EDE6DA;margin-top:7px;line-height:1.3}
.cols p em{font-style:normal;display:block;color:#A49C8E;font-size:11px}
.view{left:330px;top:640px;width:280px;padding:18px 20px;transform:rotate(2deg);animation:f 6s ease-in-out infinite}
.view small{font-size:11px;letter-spacing:.16em;color:#8A7C66}
.view p{font-size:15px;margin-top:6px;line-height:1.4}
.view .ok{margin-top:10px;font-size:12.5px;color:#2F6B4F;font-weight:500}
@keyframes f{50%{transform:rotate(2deg) translateY(-10px)}}
</style></head><body>
<div class="lines"></div>
<nav><div class="logo">Agent<i>CRM</i></div><div class="links"><span>Pipeline</span><span>Listings</span><span>Viewings</span><span>Brokerages</span></div><div class="cta">REQUEST ACCESS</div></nav>
<section class="hero">
<div class="k">The CRM for agents who close</div>
<h1>Every lead, followed up <i>like it's your only one.</i></h1>
<p class="sub">Portal leads answered in a minute, viewings booked without the back-and-forth, and a pipeline that tells you who to call today.</p>
<div class="btns"><div class="b1">Start closing more</div><div class="b2">See the agent tour</div></div>
<div class="press"><span>TRUSTED BY</span>Harbor &amp; Vine<span style="font-family:'DM Serif Display';font-size:20px;letter-spacing:0;color:#5E584E">Keller Coast</span>Mesa Homes</div>
</section>
<div class="cards">
<div class="c list"><div class="house"><svg viewBox="0 0 400 200"><rect x="0" y="170" width="400" height="30" fill="#7E8C64"/><polygon points="70,90 200,20 330,90" fill="#3E3A33"/><rect x="90" y="88" width="220" height="90" fill="#F4EFE6"/><rect x="120" y="110" width="44" height="36" fill="#9DB4C0"/><rect x="236" y="110" width="44" height="36" fill="#9DB4C0"/><rect x="182" y="120" width="36" height="58" fill="#5C4A36"/><rect x="30" y="120" width="26" height="60" fill="#5E7048"/><circle cx="43" cy="112" r="24" fill="#6F8355"/><circle cx="360" cy="118" r="30" fill="#6F8355"/></svg></div>
<div class="li"><small>NEW LISTING · LA JOLLA</small><h3>418 Laurel Street</h3><div class="r"><span>3 bed</span><span>2.5 bath</span><span>2,140 sq ft</span></div><div class="p"><b>$1,150,000</b><span class="tag">12 SAVES</span></div></div></div>
<div class="c pipe"><small>PIPELINE · THIS WEEK</small><div class="cols">
<div>VIEWING<p>The Okafors<em>Sat 11:00 · Laurel</em></p><p>Jen Park<em>Sun 14:00</em></p></div>
<div>OFFER<p>Dev Sharma<em>$1.32M · 9 Coral</em></p></div>
<div>CLOSING<p>Sophie Grant<em>Escrow · $2.05M</em></p><p>Tom &amp; Ria<em>$760k</em></p></div></div></div>
<div class="c view"><small>VIEWING CONFIRMED</small><p>The Okafors, Saturday 11:00 at 418 Laurel St.</p><div class="ok">Reminder scheduled · Calendar synced</div></div>
</div></body></html>`;
