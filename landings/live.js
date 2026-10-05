// Previews of the two live templates, faithful to the real app layout, with a richer finish.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>', msg: '<path d="M4 5h16v11H8l-4 4z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', job: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>',
    quote: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', inv: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>', plan: '<path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2-2"/><path d="M20 12a8 8 0 0 1-14 5l-2 2v-6h6l-2 2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    team: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>', eye: '<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.5"/>', wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z"/>', car: '<path d="M3 16v-4l2-5h14l2 5v4"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M7 7a7 7 0 0 0 0 10M17 7a7 7 0 0 1 0 10M4 4a11 11 0 0 0 0 16M20 4a11 11 0 0 1 0 16"/>', lead: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 18c1-2 3-3 5-3s4 1 5 3"/>',
    deal: '<path d="M2 12l5-5 4 2 4-2 5 5-8 7z"/>', title: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3M9 12l2 2 4-4"/>', money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', mega: '<path d="M3 10v4h3l7 5V5L6 10z"/><path d="M17 9a4 4 0 0 1 0 6"/>', apps: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>', bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'
  };

  // ---------------- JOB OS: Summit Heating & Plumbing ----------------
  const navJ = (icon, label, opts) => `<div class="nv${opts && opts.on ? " on" : ""}">${ic(I[icon], 17)}<span>${label}</span>${opts && opts.n ? `<em>${opts.n}</em>` : ""}</div>`;
  const spark = (pts, c) => `<svg width="96" height="30" viewBox="0 0 96 30"><defs><linearGradient id="g${c.slice(1)}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".25"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><path d="M${pts} L96 30 L0 30Z" fill="url(#g${c.slice(1)})"/><path d="M${pts}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`;
  const needs = [["Overdue", "r", "Ana Alvarez", "$1,240 · 16 days", "Remind", 1], ["Overdue", "r", "George Gupta", "$860 · 12 days", "Remind", 1], ["Overdue", "r", "Chloe Cho", "$712.30 · 9 days", "Remind", 1], ["Overdue", "r", "Julia Jensen", "$505.40 · 7 days", "Remind", 1],
    ["New lead", "b", "Tom Reyes", "No heat · called 9:14pm", "Reply", 0], ["New lead", "b", "Lucia Ford", "AC tune-up · web form", "Reply", 0], ["New lead", "b", "Harbor Yoga Studio", "Water heater · Google", "Reply", 0], ["To schedule", "g", "Northside Dental", "Quarterly RTU service", "Schedule", 0]];
  const visits = [["8:00", "10:00", "Chloe Cho", "J-1025 · Diagnostic visit", "Marco Diaz", "MD", "#2457F5", "On site", "o"], ["8:00", "12:00", "Hana Hughes", "J-1027 · 50-gal water heater installed", "Owen Brooks", "OB", "#0E8C7A", "Working", "o"],
    ["9:00", "11:00", "Daniel Dawson", "J-1026 · AC tune-up", "Nina Patel", "NP", "#C2410C", "On the way", "w"], ["11:00", "12:00", "Julia Jensen", "J-1028 · Diagnostic visit", "Marco Diaz", "MD", "#2457F5", "Scheduled", "s"], ["14:00", "16:00", "Kofi Kowalski", "J-1029 · Drain cleaning", "Owen Brooks", "OB", "#0E8C7A", "Scheduled", "s"]];

  window.LANDINGS.field = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:14px/1.45 'Geist',system-ui,sans-serif;color:#0F172A;background:#F3F5FA}
.app{display:grid;grid-template-columns:268px 1fr;height:900px}
.sb{background:#fff;border-right:1px solid #E5E8F0;padding:18px 14px;display:flex;flex-direction:column;gap:2px}
.br{display:flex;gap:11px;align-items:center;padding:2px 6px 14px}.br i{width:38px;height:38px;border-radius:11px;background:linear-gradient(145deg,#3B6CFF,#1E3FD8);color:#fff;display:grid;place-items:center;font-weight:700;font-style:normal;font-size:16px;box-shadow:0 6px 16px rgba(36,87,245,.35)}
.br b{display:block;font-size:14.5px;line-height:1.2}.br span{font:500 10.5px 'Geist Mono',monospace;letter-spacing:.12em;color:#64748B}
.ask{display:flex;align-items:center;justify-content:center;gap:8px;background:#0F172A;color:#fff;border-radius:10px;padding:10px;font-weight:600;font-size:13.5px;margin-bottom:10px;position:relative;overflow:hidden}
.ask svg{color:#8FB0FF}.ask:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(143,176,255,.25) 50%,transparent 70%);animation:sh 3.5s infinite}
@keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
.gl{font:500 10.5px 'Geist Mono',monospace;letter-spacing:.12em;color:#94A3B8;padding:12px 10px 5px}
.nv{display:flex;align-items:center;gap:11px;padding:7.5px 10px;border-radius:9px;color:#334155;font-weight:500}.nv svg{color:#94A3B8}
.nv.on{background:#EEF3FF;color:#1E3FD8;font-weight:600}.nv.on svg{color:#2457F5}
.nv em{margin-left:auto;font-style:normal;background:#2457F5;color:#fff;font-size:11px;font-weight:700;border-radius:9px;min-width:20px;text-align:center;line-height:19px}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:10px 8px;border-top:1px solid #EEF0F4}.av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11.5px;font-weight:700;flex:none}
.main{padding:24px 32px;display:flex;flex-direction:column;gap:16px;min-width:0;background:radial-gradient(700px 300px at 85% -60px,rgba(36,87,245,.10),transparent 70%)}
.hd{display:flex;justify-content:space-between;align-items:flex-end}.hd h1{margin:0;font-size:28px;font-weight:700;letter-spacing:-.02em}.hd p{margin:3px 0 0;color:#64748B}
.btn{border:1px solid #D9DEE8;background:#fff;border-radius:10px;padding:9px 15px;font-weight:600;font-size:13.5px}.btn.p{background:#2457F5;border-color:#2457F5;color:#fff;box-shadow:0 6px 16px rgba(36,87,245,.3)}
.brief{background:#0B1530;color:#E6ECFA;border-radius:16px;padding:18px 20px;display:grid;grid-template-columns:230px 1fr;gap:22px;position:relative;overflow:hidden}
.brief:before{content:"";position:absolute;right:-80px;top:-120px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(59,108,255,.45),transparent 65%)}
.bt{position:relative}.bt .k{display:inline-flex;align-items:center;gap:6px;font:500 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:#8FB0FF;background:rgba(143,176,255,.12);padding:4px 9px;border-radius:999px}
.bt h2{margin:10px 0 4px;font-size:21px;letter-spacing:-.01em}.bt p{margin:0;color:#9AA8C7;font-size:13px}
.bl{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;position:relative}
.bi{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:6px}
.bi b{font-size:26px;letter-spacing:-.02em}.bi span{color:#B9C4DD;font-size:12.5px;line-height:1.3}.bi u{text-decoration:none;margin-top:auto;font-size:12px;font-weight:600;color:#8FB0FF}
.kp{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.k{background:#fff;border:1px solid #E5E8F0;border-radius:14px;padding:13px 15px;display:flex;flex-direction:column;gap:2px;position:relative;overflow:hidden}
.k p{margin:0;color:#64748B;font-size:12.5px}.k b{font-size:25px;letter-spacing:-.02em}.k small{color:#64748B;font-size:12px}.k svg{position:absolute;right:12px;top:14px;width:72px;height:24px}
.cols{display:grid;grid-template-columns:1fr 1.06fr;gap:14px;flex:1;min-height:0}
.card{background:#fff;border:1px solid #E5E8F0;border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.ch{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;border-bottom:1px solid #EEF0F4;font-weight:700;font-size:15px}.ch span{font-weight:500;font-size:12.5px;color:#64748B}
.row{display:grid;grid-template-columns:98px 1fr auto;align-items:center;gap:10px;padding:8.5px 16px;border-bottom:1px solid #F3F4F7}
.row b{display:block;font-size:13.5px;font-weight:600}.row small{color:#64748B;font-size:12px}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;white-space:nowrap}.chip:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.chip.r{background:#FEECEC;color:#C2261A}.chip.b{background:#EAF0FF;color:#1E3FD8}.chip.g{background:#EEF1F5;color:#475569}.chip.o{background:#FFF1E6;color:#C2410C}.chip.w{background:#FFF7DB;color:#9A6400}.chip.s{background:#EAF0FF;color:#1E3FD8}
.ab{border:1px solid #D9DEE8;background:#fff;border-radius:8px;padding:5px 11px;font-size:12px;font-weight:600}.ab.p{background:#2457F5;border-color:#2457F5;color:#fff}
.vt{display:grid;grid-template-columns:60px 14px 1fr auto;gap:10px;align-items:center;padding:10px 16px;border-bottom:1px solid #F3F4F7}
.vt .tm b{display:block;font-size:13.5px}.vt .tm small{color:#94A3B8;font-size:11.5px}
.dot{width:12px;height:12px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1.5px currentColor;background:currentColor}
.vt .who b{display:block;font-size:13.5px}.vt .who small{color:#64748B;font-size:12px}
.tech{display:flex;align-items:center;gap:8px;justify-content:flex-end}.tech .av{width:26px;height:26px;font-size:10px}
.live{animation:pl 1.6s infinite}@keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}
</style></head><body><div class="app">
<aside class="sb"><div class="br"><i>S</i><div><b>Summit Heating &amp; Plumbing</b><span>JOB OS</span></div></div>
<div class="ask">${ic(I.spark, 16)}Ask about your business</div>
<div class="gl">RUN THE DAY</div>${navJ("home", "Home", { on: 1 })}${navJ("inbox", "Inbox", { n: 4 })}${navJ("msg", "Messages", { n: 2 })}${navJ("cal", "Schedule")}${navJ("job", "Jobs")}
<div class="gl">WIN &amp; GET PAID</div>${navJ("quote", "Quotes")}${navJ("inv", "Invoices")}${navJ("plan", "Plans")}
<div class="gl">RECORDS</div>${navJ("users", "Customers")}${navJ("chart", "Reports")}${navJ("team", "Team")}${navJ("eye", "AI visibility")}
<div class="gl">MAKE IT YOURS</div>${navJ("gear", "Settings")}${navJ("spark", "Build next")}
<div class="me"><span class="av" style="background:#2457F5">JL</span><div><b style="font-size:13.5px">Jordan Lee</b><br><small style="color:#64748B">Owner</small></div></div></aside>
<main class="main">
<div class="hd"><div><h1>Good evening, Jordan</h1><p>Summit Heating &amp; Plumbing · Monday, 5 October 2026</p></div><div style="display:flex;gap:10px"><span class="btn">+ New job</span><span class="btn p">+ New quote</span></div></div>
<div class="brief"><div class="bt"><span class="k">${ic(I.spark, 12)} MORNING BRIEF</span><h2>8 things need you today</h2><p>Written by Job OS from your inbox, quotes, invoices and schedule.</p></div>
<div class="bl"><div class="bi"><b>4</b><span>new leads waiting for a reply</span><u>Reply now →</u></div><div class="bi"><b>1</b><span>quote out with customers · $9,489.78</span><u>Nudge →</u></div><div class="bi"><b style="color:#FF9B8F">4</b><span>invoices overdue · $3,317.70</span><u>Send reminders →</u></div><div class="bi"><b>1</b><span>job waiting to be scheduled</span><u>Schedule →</u></div></div></div>
<div class="kp">
<div class="k"><p>New leads</p><b>4</b><small>Waiting for a reply</small>${spark("0 24 L16 20 L32 22 L48 14 L64 16 L80 8 L96 6", "#2457F5")}</div>
<div class="k"><p>Quotes waiting</p><b>1</b><small>$9,489.78 out</small>${spark("0 18 L16 20 L32 14 L48 16 L64 10 L80 12 L96 9", "#7C5CFF")}</div>
<div class="k"><p>To invoice</p><b>0</b><small>All finished work billed</small>${spark("0 10 L16 14 L32 12 L48 18 L64 20 L80 24 L96 26", "#0E8C7A")}</div>
<div class="k"><p>Unpaid</p><b>$3,317.70</b><small style="color:#C2261A">4 invoices overdue</small></div>
<div class="k" style="background:linear-gradient(180deg,#F0FBF5,#fff)"><p>Collected this week</p><b style="color:#0F7A45">$9,205.57</b><small>Payments received</small>${spark("0 26 L16 22 L32 23 L48 15 L64 12 L80 9 L96 4", "#0F9D58")}</div></div>
<div class="cols">
<div class="card"><div class="ch">Needs you<span>8 items</span></div>${needs.map(([c, t, n, s, a, p]) => `<div class="row"><span class="chip ${t}">${c}</span><div><b>${n}</b><small>${s}</small></div><span class="ab${p ? " p" : ""}">${a}</span></div>`).join("")}</div>
<div class="card"><div class="ch">Today's visits<span style="color:#2457F5;font-weight:600">Open schedule →</span></div>${visits.map(([a, b, n, j, t, ti, tc, st, k]) => `<div class="vt"><div class="tm"><b>${a}</b><small>to ${b}</small></div><span class="dot${k === "o" || k === "w" ? " live" : ""}" style="color:${k === "s" ? "#2457F5" : k === "w" ? "#D59A00" : "#E8590C"}"></span><div class="who"><b>${n}</b><small>${j}</small></div><div class="tech"><span class="av" style="background:${tc}">${ti}</span><span class="chip ${k}">${st}</span></div></div>`).join("")}
<div style="margin:12px 16px;border-radius:12px;background:#F6F8FD;border:1px dashed #C9D5F5;padding:11px 14px;display:flex;gap:10px;align-items:center;font-size:12.5px;color:#334155">${ic(I.bolt, 16)}<span><b>Nina is 6 min from Daniel Dawson.</b> "On my way" text sent with live tracking.</span></div></div>
</div></main></div></body></html>`;

  // ---------------- DEALER OS: Brazos & Pine Motors ----------------
  const navD = (icon, label, opts) => `<div class="nv${opts && opts.on ? " on" : ""}">${ic(I[icon], 17)}<span>${label}</span>${opts && opts.n ? `<em class="${opts.red ? "red" : ""}">${opts.n}</em>` : ""}</div>`;
  const cars = [["BP2392", "2012 Honda Accord", "No photos · Trim to confirm · Listing error", 42, "accord"], ["BP2380", "2013 Ford Escape", "No photos · Over 60 days", 104, "escape"],
    ["BP2381", "2015 Ram 1500", "Over 60 days", 96, "ram"], ["BP2382", "2016 Chevrolet Silverado 1500", "Over 60 days", 71, "silverado"], ["BP2383", "2018 Jeep Wrangler Unlimited", "Over 60 days", 67, "wrangler"]];
  const carImg = (k) => `<img class="ph" src="img/cars/${k}.jpg" alt="">`;
  const appts = [["10:00", "AM", "Sofia Ramirez", "Test drive · 2019 Nissan Altima", "LO", "#2BA36B", "Booked"], ["2:30", "PM", "James Ward", "Test drive · 2019 Honda Accord", "MR", "#E0663F", "Confirmed"], ["4:00", "PM", "Hannah Hughes", "Test drive · 2020 Toyota RAV4", "LO", "#2BA36B", "Booked"]];

  window.LANDINGS.auto = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:14.5px/1.45 'Barlow',system-ui,sans-serif;color:#111827;background:#ECEEF3}
.app{display:grid;grid-template-columns:268px 1fr;height:900px}
.sb{background:#0D1530;color:#C7D0E6;display:flex;flex-direction:column}
.top{background:linear-gradient(160deg,#2A4FD6,#1A35A8);padding:20px 18px 16px;color:#fff;position:relative;overflow:hidden}
.top:after{content:"";position:absolute;right:-50px;top:-60px;width:200px;height:200px;border-radius:50%;border:30px solid rgba(255,255,255,.07)}
.top h1{margin:0;font:800 26px/1 'Barlow Condensed',sans-serif;letter-spacing:.01em}.loc{display:flex;align-items:center;gap:7px;margin-top:10px;font-weight:600;font-size:13.5px;opacity:.9}
.sr{margin:12px 12px 6px;display:flex;align-items:center;gap:8px;background:#16204A;border:1px solid #243063;border-radius:9px;padding:8px 10px;color:#8E9AC0;font-size:13px}.sr kbd{margin-left:auto;font:600 10.5px 'Barlow',sans-serif;border:1px solid #33407A;border-radius:5px;padding:0 5px}
.nv{display:flex;align-items:center;gap:11px;padding:6.5px 14px;margin:0 8px;border-radius:9px;font-weight:500}.nv svg{color:#6E7BA3}
.nv.on{background:#fff;color:#0D1530;font-weight:700}.nv.on svg{color:#2A4FD6}
.nv em{margin-left:auto;font-style:normal;background:#1E2A57;color:#C7D0E6;font-size:11.5px;font-weight:700;border-radius:9px;min-width:24px;text-align:center;line-height:20px}.nv em.red{background:#E5372B;color:#fff}
.sep{height:1px;background:#1D2852;margin:6px 16px}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:12px 16px;border-top:1px solid #1D2852}.av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11.5px;font-weight:700;flex:none}
.main{padding:22px 30px;display:flex;flex-direction:column;gap:14px;min-width:0}
.hd{display:flex;justify-content:space-between;align-items:flex-end}.hd h2{margin:0;font:800 44px/1 'Barlow Condensed',sans-serif;letter-spacing:.01em}.hd p{margin:4px 0 0;color:#5B6478;font-size:15px}
.btn{border-radius:10px;padding:9px 15px;font-weight:700;font-size:14px;background:#2A4FD6;color:#fff;box-shadow:0 6px 16px rgba(42,79,214,.3);display:inline-flex;gap:7px;align-items:center}
.brief{background:#fff;border-radius:16px;padding:14px 18px;display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;border:1px solid #E1E4EB;position:relative}
.brief h3{grid-column:1/-1;margin:0 0 4px;font:800 20px 'Barlow Condensed',sans-serif;letter-spacing:.02em;display:flex;align-items:center;gap:10px}
.brief h3 span{font:600 11px 'Barlow',sans-serif;letter-spacing:.06em;color:#2A4FD6;background:#EAF0FF;border-radius:999px;padding:2px 9px}
.bl{display:flex;align-items:center;gap:11px;padding:7px 0;border-top:1px solid #F1F2F5;font-size:14.5px}.bl i{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;flex:none}
.bl .ar{margin-left:auto;color:#9AA3B5}.amb{color:#9A6400;font-weight:600}.red{color:#D42A1E;font-weight:700}
.kp{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.k{background:#fff;border:1px solid #E1E4EB;border-radius:14px;padding:12px 14px}.k p{margin:0;color:#5B6478;font-size:13px;font-weight:500}.k b{display:block;font:800 34px/1.05 'Barlow Condensed',sans-serif}.k small{color:#5B6478;font-size:12.5px}
.k .mb{height:4px;border-radius:3px;background:#EEF0F4;margin-top:8px;overflow:hidden}.k .mb i{display:block;height:100%;border-radius:3px}
.cols{display:grid;grid-template-columns:1.3fr 1fr;gap:14px;flex:1;min-height:0}
.card{background:#fff;border:1px solid #E1E4EB;border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.ch{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-bottom:1px solid #F1F2F5}.ch h3{margin:0;font:800 20px 'Barlow Condensed',sans-serif;letter-spacing:.02em}.ch a{color:#2A4FD6;font-weight:600;font-size:13.5px;text-decoration:underline}
.car{display:grid;grid-template-columns:92px 1fr 120px;gap:14px;align-items:center;padding:7px 18px;border-bottom:1px solid #F4F5F8}
.car .ph{width:92px;height:56px;object-fit:cover;border-radius:9px;display:block;background:#EEF1F6;box-shadow:0 2px 6px rgba(15,23,42,.12)}
.car b{font-weight:600;font-size:14.5px}.car .id{color:#2A4FD6;font-weight:700;margin-right:6px}.car small{display:block;color:#5B6478;font-size:12.5px}
.age{text-align:right}.age b{font:700 15px 'Barlow',sans-serif}.age .ab{height:5px;border-radius:3px;background:#EEF0F4;margin-top:5px;overflow:hidden}.age .ab i{display:block;height:100%;border-radius:3px}
.ap{display:grid;grid-template-columns:62px 1fr auto;gap:12px;align-items:center;padding:11px 18px;border-bottom:1px solid #F4F5F8}
.ap .t b{display:block;font:800 22px/1 'Barlow Condensed',sans-serif}.ap .t small{color:#5B6478;font-weight:600;font-size:12px}
.ap .w b{display:block;font-weight:600}.ap .w small{color:#5B6478;font-size:12.5px}
.st{display:flex;gap:7px;align-items:center}.ini{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-size:11px;font-weight:700}
.chip{border-radius:8px;padding:3px 10px;font-size:12.5px;font-weight:600;background:#EEF0F4;color:#374151}.chip.c{background:#E3F6EC;color:#0F7A45}
.agg{margin:12px 18px 14px;border-radius:12px;background:#0D1530;color:#C7D0E6;padding:12px 14px}.agg b{color:#fff}
.bars{display:flex;align-items:flex-end;gap:5px;height:46px;margin-top:8px}.bars i{flex:1;border-radius:3px 3px 0 0;background:#2A4FD6}.bars i.h{background:#FF8A3D}
</style></head><body><div class="app">
<aside class="sb"><div class="top"><h1>BRAZOS &amp; PINE<br>MOTORS</h1><div class="loc">${ic(I.pin, 15)}All locations</div></div>
<div class="sr">${ic(I.search, 15)}Search or jump to…<kbd>⌘K</kbd></div>
${navD("home", "Today", { on: 1 })}${navD("inbox", "Inbox")}<div class="sep"></div>${navD("tag", "Buying")}${navD("wrench", "Recon", { n: 6 })}${navD("car", "Stock", { n: 40 })}${navD("radio", "Publishing", { n: 1, red: 1 })}<div class="sep"></div>
${navD("lead", "Leads")}${navD("cal", "Calendar")}${navD("deal", "Deals")}${navD("title", "Title &amp; delivery")}<div class="sep"></div>${navD("chart", "Insights")}${navD("money", "Money")}${navD("globe", "Website")}${navD("mega", "Marketing")}<div class="sep"></div>${navD("apps", "Apps")}${navD("spark", "Make it yours")}${navD("gear", "Settings")}
<div class="me"><span class="av" style="background:#2BA3A0">OC</span><div><b style="color:#fff">Olivia Carter</b><br><small>Owner</small></div></div></aside>
<main class="main">
<div class="hd"><div><h2>TODAY</h2><p>Monday, October 5, 2026 · Good morning, Olivia</p></div><span class="btn">${ic(I.car, 16)}Add a car</span></div>
<div class="brief"><h3>MORNING BRIEF <span>WRITTEN BY DEALER OS</span></h3>
<div class="bl"><i style="background:#E3F6EC;color:#0F7A45">${ic(I.money, 15)}</i><span>Sold yesterday: <b>1 car</b>, $4,304 front gross. Last 30 days: <b>20 cars</b>, $58,503.</span><span class="ar">→</span></div>
<div class="bl"><i style="background:#FFF4DB;color:#9A6400">${ic(I.inbox, 15)}</i><span>Since close: <b>7 new leads</b>. <span class="amb">6 conversations waiting for a reply.</span></span><span class="ar">→</span></div>
<div class="bl"><i style="background:#EAF0FF;color:#2A4FD6">${ic(I.cal, 15)}</i><span>Today: <b>3 appointments</b>, 1 confirmed.</span><span class="ar">→</span></div>
<div class="bl"><i style="background:#FDECEC;color:#D42A1E">${ic(I.title, 15)}</i><span>Titles: <span class="red">1 overdue</span>, 2 steps due this week.</span><span class="ar">→</span></div>
<div class="bl" style="grid-column:1/-1"><i style="background:#EEF0F4;color:#374151">${ic(I.chart, 15)}</i><span>Aging: <b>11 cars</b> over 45 days, $173,723 at cost, costing <b>$132 a day</b> to hold.</span><span class="ar">→</span></div></div>
<div class="kp">
<div class="k"><p>In stock</p><b>40</b><small>$758,849 at cost</small><div class="mb"><i style="width:80%;background:#2A4FD6"></i></div></div>
<div class="k"><p>Days in stock</p><b>34</b><small>on average</small><div class="mb"><i style="width:57%;background:#FF8A3D"></i></div></div>
<div class="k"><p>Sold, 30 days</p><b>20</b><small>$58,503 front gross</small><div class="mb"><i style="width:66%;background:#0F9D58"></i></div></div>
<div class="k"><p>Leads today</p><b>3</b><small>new since midnight</small><div class="mb"><i style="width:30%;background:#2A4FD6"></i></div></div>
<div class="k" style="background:#FFFBF0;border-color:#F4E2B5"><p>Unreplied</p><b style="color:#9A6400">6</b><small>waiting for a person</small><div class="mb"><i style="width:60%;background:#E3A008"></i></div></div>
<div class="k"><p>Deposits held</p><b>1</b><small>$500</small><div class="mb"><i style="width:15%;background:#7C5CFF"></i></div></div></div>
<div class="cols">
<div class="card"><div class="ch"><h3>NEEDS ATTENTION</h3><a>All of it</a></div>${cars.map(([id, n, s, d, k]) => `<div class="car">${carImg(k)}<div><b><span class="id">${id}</span>${n}</b><small>${s}</small></div><div class="age"><b style="color:${d > 90 ? "#D42A1E" : d > 60 ? "#C2410C" : "#9A6400"}">${d} days</b><div class="ab"><i style="width:${Math.min(100, d)}%;background:${d > 90 ? "#D42A1E" : d > 60 ? "#FF8A3D" : "#E3A008"}"></i></div></div></div>`).join("")}</div>
<div class="card"><div class="ch"><h3>APPOINTMENTS TODAY</h3><a>The week</a></div>${appts.map(([t, m, n, w, ini, c, s]) => `<div class="ap"><div class="t"><b>${t}</b><small>MON ${m}</small></div><div class="w"><b>${n}</b><small>${w}</small></div><div class="st"><span class="ini" style="background:${c}22;color:${c}">${ini}</span><span class="chip${s === "Confirmed" ? " c" : ""}">${s}</span></div></div>`).join("")}
<div class="agg"><div style="display:flex;justify-content:space-between"><span><b>Aging stock</b> · days on lot</span><span style="color:#FF8A3D;font-weight:700">11 over 45</span></div><div class="bars">${[30, 42, 55, 38, 61, 72, 48, 67, 96, 104, 71, 44].map(h => `<i class="${h > 60 ? "h" : ""}" style="height:${Math.round(h / 104 * 100)}%"></i>`).join("")}</div></div></div>
</div></main></div></body></html>`;
})();
