// Agent CRM (real estate): Follow Up Boss-style person record with website behaviour, watched listings and a CA escrow checklist.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    eye: '<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    phone: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    msg: '<path d="M4 5h16v11H8l-4 4z"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    note: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h4"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', check: '<path d="m5 12 5 5 9-10"/>',
    flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>', home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    zap: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };

  const lists = [
    ["New leads", 9, "2 not yet contacted", "hot"], ["Viewed a home 3+ times", 6, "", ""], ["Back on the site today", 14, "", ""],
    ["Showings this week", 8, "", ""], ["Offers out", 3, "", ""], ["Under contract", 5, "1 deadline this week", "warn"], ["Past-client anniversaries", 4, "", ""], ["Long-term nurture", 212, "", ""]
  ];

  const tl = [
    ["7:42 AM", "eye", "#B4532A", "Viewed <b>418 Laurel St</b> · 4th time today", "Spent 3 min on photos 14–22 · opened the floor plan", "laurel"],
    ["7:31 AM", "heart", "#B4532A", "Saved <b>3961 Ibis St</b> to favourites", "Price drop alert on · Mission Hills", "craftsman"],
    ["Yesterday 9:12 PM", "search", "#1F6F6A", "Saved a search · Mission Hills, 3+ bd, $1.0M–$1.25M", "18 matches · daily alert by email", ""],
    ["Yesterday 4:05 PM", "phone", "#2B4C7E", "Call with Kevin · 6 min 12 s · <span class=\"ok\">Connected</span>", "“Wants to see Laurel and Ibis Saturday morning. Pre-approved with Guild for $1.2M.”", ""],
    ["Yesterday 10:00 AM", "msg", "#6B5BA8", "Text sent by action plan · Zillow buyer, day 3", "“Hi Kevin, 3 new Mission Hills homes this week. Want me to set up tours?” · Replied 10:14", ""],
    ["Sat 3 Oct 6:48 PM", "bolt", "#C08A2D", "New lead from Zillow Premier Agent · routed to Nina", "“Is 418 Laurel St still available?” · first reply in 1 min 18 s", ""]
  ];

  const watch = [
    ["laurel", "418 Laurel St", "Mission Hills", "$1,195,000", "3 bd · 2.5 ba · 2,140 sqft", "Viewed 4× today", "hot"],
    ["craftsman", "3961 Ibis St", "Mission Hills", "$1,089,000", "3 bd · 2 ba · 1,780 sqft", "Saved · price drop $36k", ""],
    ["northpark", "3218 Upas St", "North Park", "$1,149,000", "3 bd · 2 ba · 1,690 sqft", "Matches saved search", ""]
  ];

  const steps = [
    ["done", "Offer accepted", "Tue 22 Sep · day 0"],
    ["done", "Earnest money 3% · $36,450", "Received by Pacific Coast Escrow · 24 Sep"],
    ["done", "Seller disclosures (TDS, SPQ)", "Signed by buyer · 29 Sep"],
    ["done", "Appraisal", "Came in at $1,215,000 · 2 Oct"],
    ["due", "Inspection contingency removal (CR)", "Fri 9 Oct · day 17 · 4 days left"],
    ["next", "Loan contingency removal", "Tue 13 Oct · day 21"],
    ["next", "Close of escrow", "Thu 22 Oct · day 30"]
  ];

  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.42 'DM Sans',system-ui,sans-serif;color:#14202E;background:#F3F0EA}
.top{height:56px;background:#10233A;color:#D6DEE8;display:flex;align-items:center;gap:22px;padding:0 20px}
.brand{display:flex;align-items:center;gap:11px}.brand i{width:32px;height:32px;border-radius:9px;background:linear-gradient(150deg,#D9B37A,#B4874B);display:grid;place-items:center;font:400 18px 'DM Serif Display',serif;color:#10233A;font-style:normal}
.brand b{display:block;color:#fff;font-size:14.5px;line-height:1.15}.brand span{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#8FA2B8}
.tabs{display:flex;gap:2px}.tabs span{padding:7px 11px;border-radius:8px;font-weight:500;font-size:13.5px;color:#B5C2D1;display:flex;gap:6px;align-items:center}.tabs span.on{background:#1C3653;color:#fff}
.tabs em{font-style:normal;background:#D9534F;color:#fff;font-size:10.5px;font-weight:700;border-radius:8px;padding:0 6px;line-height:16px}
.sr{margin-left:auto;width:240px;white-space:nowrap;display:flex;align-items:center;gap:8px;background:#172F4B;border:1px solid #23405F;border-radius:9px;padding:7px 10px;color:#7F93AA;font-size:13px}
.ask{display:flex;align-items:center;gap:7px;background:#D9B37A;color:#10233A;border-radius:9px;padding:8px 12px;font-weight:700;font-size:13px}
.av{border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;flex:none}
.wrap{display:grid;grid-template-columns:228px minmax(0,1fr) 430px;gap:14px;padding:14px;height:844px}
.card{background:#fff;border:1px solid #E4DED3;border-radius:14px;overflow:hidden}
/* smart lists */
.sl{padding:14px 10px;display:flex;flex-direction:column;gap:2px}
.sl h4{margin:0 8px 8px;font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#8A8578}
.li{display:grid;grid-template-columns:1fr auto;padding:8px 10px;border-radius:9px;gap:1px 8px}.li b{font-weight:600;font-size:13.5px}.li em{font-style:normal;font-weight:700;color:#5C6675;font-size:12.5px}
.li small{grid-column:1/-1;font-size:11.5px;color:#9A7A3E}.li small.hot{color:#C0392B}.li.on{background:#FBF4E8;box-shadow:inset 3px 0 0 #C9974F}
.speed{margin:12px 6px 0;border-radius:12px;background:#10233A;color:#C9D3DF;padding:14px}
.speed p{margin:0;font-size:12px}.speed b{display:block;font:400 30px/1.05 'DM Serif Display',serif;color:#fff;margin:4px 0}
.speed .bar{display:flex;gap:3px;align-items:flex-end;height:30px;margin-top:8px}.speed .bar i{flex:1;background:#2E4A6B;border-radius:2px}.speed .bar i.h{background:#D9B37A}
.route{margin:10px 6px 0;border:1px dashed #D8CDB9;border-radius:12px;padding:11px 12px;font-size:12px;color:#6B6458}.route b{color:#14202E}
/* person */
.person{display:flex;flex-direction:column}
.ph{padding:16px 18px 12px;display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:start;border-bottom:1px solid #EEE8DD}
.ph h1{margin:0;font:400 26px/1.1 'DM Serif Display',serif}.ph .sub{color:#6B7380;font-size:12.5px;margin-top:3px}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.chip{font-size:11.5px;font-weight:600;border-radius:999px;padding:2px 9px;background:#F1EDE5;color:#4D4A44}
.chip.hot{background:#FBE6DE;color:#B4532A}.chip.teal{background:#E1F0EE;color:#1F6F6A}.chip.navy{background:#E3E9F3;color:#2B4C7E}
.facts{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #EEE8DD}
.facts div{padding:9px 18px;border-right:1px solid #F1ECE3}.facts div:last-child{border-right:0}.facts p{margin:0;font-size:11px;color:#8A8578}.facts b{font-size:13.5px}
.comp{margin:12px 18px 6px;border:1px solid #E4DED3;border-radius:12px;overflow:hidden}
.ct{display:flex;gap:2px;background:#FAF8F4;border-bottom:1px solid #EEE8DD;padding:4px}.ct span{display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:7px;font-weight:600;font-size:12.5px;color:#6B7380}.ct span.on{background:#fff;color:#14202E;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.cb{padding:10px 12px;display:flex;gap:10px;align-items:flex-end}.cb p{margin:0;flex:1;color:#2A3442;font-size:13px}
.send{background:#10233A;color:#fff;border-radius:8px;padding:7px 13px;font-weight:700;font-size:12.5px;white-space:nowrap}
.ap{margin:6px 18px 10px;display:flex;align-items:center;gap:12px;background:#FBF4E8;border-radius:10px;padding:9px 12px;font-size:12.5px}
.ap .pg{width:120px;height:6px;border-radius:4px;background:#EADBC1;overflow:hidden}.ap .pg i{display:block;height:100%;width:33%;background:#C9974F}
.ap .ps{margin-left:auto;border:1px solid #D8CDB9;border-radius:7px;padding:3px 9px;font-weight:600;font-size:12px;background:#fff}
.tlh{display:flex;justify-content:space-between;align-items:center;padding:4px 18px 6px}.tlh b{font-size:14px}.tlh span{font-size:12px;color:#8A8578}
.ev{display:grid;grid-template-columns:30px 1fr auto;gap:10px;padding:9px 18px;border-top:1px solid #F4EFE6;align-items:start}
.ev .ico{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;color:#fff}
.ev .t{font-size:13.5px}.ev .d{font-size:12px;color:#6B7380;margin-top:2px}.ev .tm{font:500 11px 'JetBrains Mono',monospace;color:#9A9488;white-space:nowrap}
.ev .thumb{width:58px;height:40px;border-radius:7px;object-fit:cover;margin-top:2px}
.ok{color:#1F6F6A;font-weight:700}
/* right */
.rc{display:flex;flex-direction:column;gap:14px;min-height:0}
.ch{display:flex;justify-content:space-between;align-items:baseline;padding:11px 16px 6px}.ch b{font-size:14.5px}.ch span{font-size:12px;color:#8A8578}
.lst{display:grid;grid-template-columns:104px 1fr;gap:12px;padding:6px 16px;border-top:1px solid #F4EFE6}
.lst img{width:104px;height:66px;object-fit:cover;border-radius:9px;display:block}
.lst .pr{font:400 18px/1.05 'DM Serif Display',serif}.lst .ad{font-weight:600;font-size:13px;margin-top:2px}.lst .mt{font-size:11.5px;color:#6B7380}
.sig{display:inline-block;margin-top:3px;font-size:11px;font-weight:700;border-radius:6px;padding:1px 7px;background:#F1EDE5;color:#5C574D}.sig.hot{background:#FBE6DE;color:#B4532A}
.esc{flex:1;display:flex;flex-direction:column}
.eh{display:grid;grid-template-columns:62px 1fr auto;gap:12px;align-items:center;padding:10px 16px;border-bottom:1px solid #F1ECE3}
.eh img{width:62px;height:46px;border-radius:8px;object-fit:cover}
.eh b{font-size:14px}.eh small{display:block;font-size:11.5px;color:#6B7380}
.stage{font-size:11.5px;font-weight:700;color:#1F6F6A;background:#E1F0EE;border-radius:999px;padding:3px 10px}
.track{display:flex;gap:4px;padding:10px 16px 2px}.track i{flex:1;height:5px;border-radius:3px;background:#EEE8DD}.track i.d{background:#1F6F6A}.track i.a{background:#D9A440}
.st{display:grid;grid-template-columns:22px 1fr auto;gap:10px;align-items:center;padding:4px 16px}
.st .dt{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;border:2px solid #D8CDB9;color:#fff}
.st.done .dt{background:#1F6F6A;border-color:#1F6F6A}.st.due .dt{border-color:#D9A440;background:#FFF6E2}
.st b{font-size:13px;font-weight:600}.st small{display:block;font-size:11.5px;color:#6B7380}.st.due small{color:#9A6400;font-weight:600}
.cr{font-size:11.5px;font-weight:700;background:#10233A;color:#fff;border-radius:7px;padding:4px 9px}
.com{margin:auto 16px 12px;border-radius:11px;background:#FAF8F4;border:1px solid #EEE8DD;padding:10px 12px;display:grid;grid-template-columns:1fr auto;gap:3px 10px;font-size:12px;color:#6B7380}
.com b{color:#14202E;font-size:13px}.com .r{text-align:right}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}.live{animation:pulse 1.6s infinite}
</style></head><body>
<header class="top"><div class="brand"><i>H</i><div><b>Harbor &amp; Vine Realty</b><span>AGENT CRM</span></div></div>
<nav class="tabs"><span>Inbox <em>7</em></span><span class="on">People</span><span>Smart lists</span><span>Tasks <em>12</em></span><span>Calendar</span><span>Deals</span><span>Listings</span><span>Reporting</span></nav>
<div class="sr">${ic(I.search, 15)}Search people or addresses</div><span class="ask">${ic(I.spark, 15)}Ask Agent CRM</span><span class="av" style="width:32px;height:32px;background:#B4532A;font-size:12px">NA</span></header>
<div class="wrap">
<aside class="card sl"><h4>SMART LISTS</h4>
${lists.map(([n, c, s, t], k) => `<div class="li${k === 1 ? " on" : ""}"><b>${n}</b><em>${c}</em>${s ? `<small class="${t === "hot" ? "hot" : ""}">${s}</small>` : ""}</div>`).join("")}
<div class="speed"><p>Speed to lead · this week</p><b>1m 42s</b><p>median first reply · 31 new leads</p><div class="bar">${[40, 55, 30, 70, 45, 85, 60].map((h, k) => `<i class="${k === 5 ? "h" : ""}" style="height:${h}%"></i>`).join("")}</div></div>
<div class="route"><b>Lead routing</b><br>Zillow &amp; Realtor.com → round robin, Mission Hills and North Park → Nina, sellers → Marco</div>
</aside>

<main class="card person">
<div class="ph"><span class="av" style="width:54px;height:54px;background:linear-gradient(150deg,#1F6F6A,#10233A);font-size:18px">KL</span>
<div><h1>Kevin &amp; Ana Liu</h1><div class="sub">(619) 555-0143 · kevin.liu@example.com · first-time buyers, relocating from Seattle</div>
<div class="chips"><span class="chip hot"><span class="live">●</span> Hot · back on site now</span><span class="chip navy">Stage: Showing</span><span class="chip">Source: Zillow Premier Agent</span><span class="chip teal">Pre-approved $1.2M · Guild Mortgage</span></div></div>
<div style="display:flex;gap:6px"><span class="ask" style="background:#10233A;color:#fff">${ic(I.cal, 15)}Schedule showing</span></div></div>
<div class="facts"><div><p>Assigned</p><b>Nina Alvarez</b></div><div><p>Price point</p><b>$1.10M – $1.25M</b></div><div><p>Viewed / saved</p><b>23 homes · 4 saved</b></div><div><p>Last contact</p><b>Call · yesterday</b></div></div>
<div class="comp"><div class="ct"><span class="on">${ic(I.msg, 14)}Text</span><span>${ic(I.phone, 14)}Call</span><span>${ic(I.mail, 14)}Email</span><span>${ic(I.note, 14)}Note</span><span style="margin-left:auto;font-weight:500">From (619) 555-0190</span></div>
<div class="cb"><p>Hi Kevin, saw you're looking at Laurel again. I can do Saturday 10:00 for Laurel and 10:45 for Ibis. Want me to lock both in?</p><span class="send">Send text</span></div></div>
<div class="ap">${ic(I.zap, 16)}<span><b>Action plan:</b> Zillow buyer, 30 days · step 4 of 12 · next: email "Mission Hills comps" tomorrow 9:00</span><span class="pg"><i></i></span><span class="ps">Pause</span></div>
<div class="tlh"><b>Timeline</b><span>All · Website · Calls · Texts · Emails · Notes</span></div>
${tl.map(([t, i, c, a, d, img]) => `<div class="ev"><span class="ico" style="background:${c}">${ic(I[i], 15)}</span><div><div class="t">${a}</div><div class="d">${d}</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><span class="tm">${t}</span>${img ? `<img class="thumb" src="img/realestate/${img}.jpg" alt="">` : ""}</div></div>`).join("")}
</main>

<section class="rc">
<div class="card"><div class="ch"><b>Homes they're watching</b><span>from website activity</span></div>
${watch.map(([img, ad, hood, pr, mt, s, t]) => `<div class="lst"><img src="img/realestate/${img}.jpg" alt=""><div><div class="pr">${pr}</div><div class="ad">${ad} · ${hood}</div><div class="mt">${mt}</div><span class="sig ${t}">${s}</span></div></div>`).join("")}
</div>
<div class="card esc"><div class="eh"><img src="img/realestate/terwilliger.jpg" alt=""><div><b>2847 Vista Ct · Grant family</b><small>Buyer side · accepted $1,215,000 · Pacific Coast Escrow #44871</small></div><span class="stage">In escrow · day 13</span></div>
<div class="track">${steps.map(([s]) => `<i class="${s === "done" ? "d" : s === "due" ? "a" : ""}"></i>`).join("")}</div>
${steps.map(([s, a, b]) => `<div class="st ${s}"><span class="dt">${s === "done" ? ic(I.check, 12) : ""}</span><div><b>${a}</b><small>${b}</small></div>${s === "due" ? `<span class="cr">Send CR form</span>` : ""}</div>`).join("")}
<div class="com"><span>Commission 2.5% of $1,215,000</span><b class="r">$30,375.00</b><span>Nina 70% · brokerage 30%</span><span class="r mono">$21,262.50 · $9,112.50</span></div>
</div>
</section>
</div></body></html>`;

  window.LANDINGS.realestate = html;
})();
