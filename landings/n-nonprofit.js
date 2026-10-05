// Donor Desk · Harbor Light Food Bank — donor profile + campaign thermometer (Bloomerang / Givebutter / Donorbox patterns)
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1c0 0 6 2 6-1s-4-3-6 1"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    hand: '<path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V4a2 2 0 0 1 4 0v6M15 10V6a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L3 14a2 2 0 0 1 3.4-2L7 13"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    repeat: '<path d="M4 9a7 7 0 0 1 12-3l3 3M20 15a7 7 0 0 1-12 3l-3-3"/><path d="M19 4v5h-5M5 20v-5h5"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
  };

  // Denise Whitaker: giving by year must total lifetime $4,860
  const years = [["2021", 400], ["2022", 650], ["2023", 900], ["2024", 1560], ["2025", 900], ["2026", 450]];
  const maxY = 1560;
  const bars = years.map(([y, v], i) => `<div class="yb"><span class="yv">$${v.toLocaleString("en-US")}</span><i style="height:${Math.round(v / maxY * 92)}px;${i === 5 ? "background:repeating-linear-gradient(135deg,#E0522F 0 6px,#ec7a5d 6px 12px)" : ""}"></i><b>${y}${i === 5 ? " YTD" : ""}</b></div>`).join("");

  const timeline = [
    ["gift", "#E0522F", "Monthly gift · $50.00", "Recurring · Visa ending 4412 · receipt emailed automatically", "Sep 30"],
    ["alert", "#B7791F", "Card expires 10/26", "Update-card link sent · opened, not yet updated", "Sep 30"],
    ["hand", "#1F7A7A", "Volunteered 3 h · Saturday warehouse sort", "Hours logged by shift lead Marcus · 41 h this year", "Sep 19"],
    ["phone", "#5B6B7A", "Thank-you call · 6 min", "Rina Okafor: “Wants to bring her book club to a sort shift.”", "Aug 28"],
    ["doc", "#5B6B7A", "2025 year-end giving statement", "501(c)(3) receipt · $900.00 · no goods or services provided", "Jan 15"]
  ];
  const tl = timeline.map(([icn, c, t, s, d]) => `<div class="tl"><span class="ti" style="color:${c};background:${c}14">${ic(I[icn], 15)}</span><div class="tt"><b>${t}</b><small>${s}</small></div><span class="td">${d}</span></div>`).join("");

  const lists = [["Lapsing this month", "41", "gave monthly, missed September", "#E0522F"], ["LYBUNT", "312", "gave in 2025, not yet in 2026 · $68,940", "#B7791F"], ["Upgrade candidates", "27", "3+ years, giving trending up", "#1F7A7A"], ["First gifts to thank", "64", "within 48 h · 9 overdue", "#5B6B7A"]];
  const ls = lists.map(([t, n, s, c], i) => `<div class="li${i === 0 ? " on" : ""}"><span class="ld" style="background:${c}"></span><div><b>${t}</b><small>${s}</small></div><em>${n}</em></div>`).join("");

  const shifts = [["Sat 10", "Warehouse sort", "8:00 – 11:00 · Hollins Ferry Rd", 24, 30], ["Wed 7", "Backpack packing", "5:30 – 7:30 pm · school program", 18, 20], ["Thu 8", "Mobile pantry · Cherry Hill", "3:00 – 6:00 pm · drivers needed", 11, 12]];
  const sh = shifts.map(([d, t, s, a, b]) => `<div class="sh"><span class="sd">${d.split(" ")[0]}<b>${d.split(" ")[1]}</b></span><div class="st"><b>${t}</b><small>${s}</small><div class="sb"><i style="width:${Math.round(a / b * 100)}%"></i></div></div><span class="sn">${a}/${b}</span></div>`).join("");

  const gifts = [["Jordan M.", "$100", "2 min ago", "One-time"], ["Patel family", "$500", "18 min", "Matched"], ["Anonymous", "$25", "41 min", "One-time"], ["Keisha W.", "$35/mo", "1 h", "New monthly"]];
  const gf = gifts.map(([n, a, t, k]) => `<div class="gf"><span class="ga">${n === "Anonymous" ? "?" : n.split(" ").map(x => x[0]).join("")}</span><div><b>${n}</b><small>${t} · ${k}</small></div><em>${a}</em></div>`).join("");

  // thermometer: raised 171,350 of 250,000 = 68.5%
  const pct = 68.5;

  window.LANDINGS.nonprofit = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600;7..72,700&family=Onest:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#F6F1E9;color:#1E1B18;font:13.5px/1.4 'Onest',system-ui,sans-serif}
.mono{font-family:'IBM Plex Mono',monospace}
.top{height:56px;background:#1E1B18;color:#F6F1E9;display:flex;align-items:center;gap:18px;padding:0 22px}
.mark{display:flex;align-items:center;gap:10px}.mark i{width:32px;height:32px;border-radius:9px;background:#E0522F;display:grid;place-items:center;position:relative;overflow:hidden}
.mark i:before{content:"";position:absolute;width:60px;height:14px;background:linear-gradient(90deg,rgba(255,236,170,.9),transparent);transform:rotate(-18deg);left:14px;top:6px}
.mark i:after{content:"";width:6px;height:16px;background:#fff;border-radius:2px 2px 1px 1px;position:relative}
.mark b{font:600 15px 'Literata',serif;display:block}.mark span{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.14em;color:#B9AFA3}
.tabs{display:flex;gap:4px;margin-left:16px}.tabs span{padding:7px 12px;border-radius:8px;color:#CFC6BA;font-weight:500}.tabs span.on{background:#3A342E;color:#fff}
.tabs em{font-style:normal;background:#E0522F;color:#fff;border-radius:9px;padding:0 6px;font-size:11px;margin-left:5px}
.srch{margin-left:auto;display:flex;align-items:center;gap:8px;background:#2C2722;border-radius:9px;padding:7px 12px;color:#9E9488;width:250px}
.ask{display:flex;align-items:center;gap:6px;border:1px solid #4A423A;border-radius:9px;padding:7px 12px;font-weight:600;color:#FFD9C9}
.impact{height:44px;display:flex;align-items:center;gap:28px;padding:0 22px;border-bottom:1px solid #E5DCCD;background:#FBF7F1}
.impact span{display:flex;align-items:baseline;gap:7px;color:#6B6157}.impact b{font:700 17px 'Literata',serif;color:#1E1B18}
.impact .lbl{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#E0522F}
.grid{display:grid;grid-template-columns:300px 1fr 455px;gap:16px;padding:16px 18px;height:800px}
.card{background:#fff;border:1px solid #E7DECF;border-radius:16px;overflow:hidden}
.h{display:flex;justify-content:space-between;align-items:center;padding:13px 16px 9px;font-weight:700}.h small{font-weight:500;color:#8A7F73}
.li{display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:center;padding:10px 16px;border-top:1px solid #F2ECE2}
.li.on{background:#FCEDE7}.li b{display:block;font-size:13.5px}.li small{color:#7D7268;font-size:11.5px}.li em{font-style:normal;font:600 14px 'IBM Plex Mono',monospace}
.ld{width:8px;height:8px;border-radius:50%}
.sh{display:grid;grid-template-columns:44px 1fr auto;gap:11px;align-items:center;padding:10px 16px;border-top:1px solid #F2ECE2}
.sd{font:600 10px 'IBM Plex Mono',monospace;color:#8A7F73;text-align:center;border:1px solid #E7DECF;border-radius:9px;padding:4px 0;text-transform:uppercase}.sd b{display:block;font:700 17px 'Literata',serif;color:#1E1B18}
.st b{display:block}.st small{color:#7D7268;font-size:11.5px}.sb{height:5px;border-radius:3px;background:#EFE8DC;margin-top:6px;overflow:hidden}.sb i{display:block;height:100%;background:#1F7A7A;border-radius:3px}
.sn{font:600 12.5px 'IBM Plex Mono',monospace;color:#1F7A7A}
.vh{margin:12px 16px 14px;border-radius:12px;background:#1F7A7A;color:#E6F4F1;padding:12px 14px;display:flex;justify-content:space-between;align-items:center}
.vh b{font:700 22px 'Literata',serif;color:#fff;display:block}
/* donor */
.donor{display:flex;flex-direction:column}
.dh{display:grid;grid-template-columns:auto 1fr auto;gap:16px;padding:18px 20px 14px;align-items:center;border-bottom:1px solid #F2ECE2}
.av{width:62px;height:62px;border-radius:18px;background:linear-gradient(135deg,#F3B79F,#E0522F);color:#fff;display:grid;place-items:center;font:700 22px 'Literata',serif}
.dh h1{margin:0;font:700 26px 'Literata',serif;letter-spacing:-.01em}.dh p{margin:3px 0 7px;color:#7D7268}
.chips{display:flex;gap:6px;flex-wrap:wrap}.chip{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;border-radius:999px;padding:3px 9px}
.eng{text-align:right}.eng small{display:block;font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#8A7F73}
.meter{display:flex;gap:3px;margin:6px 0 4px;justify-content:flex-end}.meter i{width:16px;height:22px;border-radius:4px;background:#EFE8DC}
.eng b{font:700 15px 'Literata',serif;color:#B7791F}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #F2ECE2}
.stats div{padding:12px 16px;border-right:1px solid #F2ECE2}.stats div:last-child{border:0}
.stats small{display:block;color:#8A7F73;font-size:11.5px}.stats b{font:700 19px 'Literata',serif}
.mid{display:grid;grid-template-columns:1fr 250px;border-bottom:1px solid #F2ECE2}
.years{display:flex;align-items:flex-end;gap:12px;padding:12px 18px 12px;height:168px}
.yb{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%}
.yb i{display:block;width:100%;max-width:46px;border-radius:7px 7px 3px 3px;background:#F0C7B8}.yb:nth-child(4) i{background:#E0522F}
.yb b{font:600 11px 'IBM Plex Mono',monospace;color:#7D7268}.yv{font:600 11px 'IBM Plex Mono',monospace;color:#1E1B18}
.move{border-left:1px solid #F2ECE2;padding:12px 16px;background:#FBF7F1}
.move small{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#8A7F73}
.stages{display:flex;gap:3px;margin:8px 0}.stages i{flex:1;height:6px;border-radius:3px;background:#E7DECF}.stages i.d{background:#1F7A7A}.stages i.c{background:#E0522F}
.move b{display:block;font-size:14px;margin-top:2px}.move p{margin:4px 0 9px;color:#6B6157;font-size:12px}
.btn{display:inline-flex;align-items:center;gap:6px;border-radius:9px;padding:7px 12px;font-weight:600;font-size:12.5px;border:1px solid #DCD2C3;background:#fff}
.btn.p{background:#1E1B18;color:#fff;border-color:#1E1B18}
.tlh{display:flex;justify-content:space-between;padding:12px 20px 4px;font-weight:700}.tlh small{font-weight:500;color:#8A7F73}
.tl{display:grid;grid-template-columns:32px 1fr auto;gap:12px;align-items:center;padding:8px 20px}
.ti{width:32px;height:32px;border-radius:10px;display:grid;place-items:center}.tt b{display:block;font-size:13.5px}.tt small{color:#7D7268;font-size:12px}
.td{font:500 11.5px 'IBM Plex Mono',monospace;color:#8A7F73}
/* campaign */
.camp{position:relative}
.ph{height:132px;background:url(img/nonprofit/sorting.jpg) center 35%/cover;position:relative}
.ph:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,27,24,.05),rgba(30,27,24,.78))}
.ph div{position:absolute;left:18px;bottom:12px;z-index:1;color:#fff}.ph small{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.14em;color:#FFD9C9}
.ph b{display:block;font:700 22px 'Literata',serif}
.cb{display:grid;grid-template-columns:92px 1fr;gap:16px;padding:16px 18px 6px}
.thermo{position:relative;height:270px;display:flex;justify-content:center}
.tube{width:34px;height:236px;border-radius:17px;background:#F3EDE3;border:3px solid #fff;box-shadow:0 0 0 1px #E7DECF;position:relative;overflow:hidden;margin-top:4px}
.fill{position:absolute;left:0;right:0;bottom:0;height:${pct}%;background:linear-gradient(180deg,#F08A63,#E0522F);border-radius:0 0 14px 14px}
.fill:before{content:"";position:absolute;left:0;right:0;top:0;height:10px;background:rgba(255,255,255,.35);animation:sl 2.4s ease-in-out infinite}
@keyframes sl{0%,100%{opacity:.2}50%{opacity:.6}}
.bulb{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:54px;height:54px;border-radius:50%;background:#E0522F;border:4px solid #fff;box-shadow:0 0 0 1px #E7DECF}
.tick{position:absolute;left:0;font:600 10px 'IBM Plex Mono',monospace;color:#8A7F73}
.goal{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#8A7F73}
.raised{font:700 38px 'Literata',serif;letter-spacing:-.02em;line-height:1.05}.raised small{font:500 14px 'Onest';color:#7D7268;letter-spacing:0}
.kv{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}
.kv div{background:#FBF7F1;border-radius:10px;padding:8px 10px}.kv small{display:block;color:#8A7F73;font-size:11px}.kv b{font:700 16px 'Literata',serif}
.match{border:1px dashed #E0522F;border-radius:10px;padding:8px 10px;background:#FFF5F1;font-size:12px;color:#7A3420}
.match b{color:#C2401F}.mb{height:6px;border-radius:3px;background:#F7D8CC;margin-top:6px;overflow:hidden}.mb i{display:block;height:100%;width:73.6%;background:#E0522F}
.gfh{display:flex;justify-content:flex-start;gap:14px;padding:4px 18px 4px;font-weight:700;font-size:13px}.gfh small{color:#1F7A7A;font-weight:600;display:flex;align-items:center;gap:6px}
.gfh small:before{content:"";width:7px;height:7px;border-radius:50%;background:#1F7A7A;animation:sl 1.4s infinite}
.gf{display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:center;padding:6px 18px;margin-right:252px}
.ga{width:28px;height:28px;border-radius:50%;background:#EFE8DC;display:grid;place-items:center;font-size:10.5px;font-weight:700;color:#6B6157}
.gf b{display:block;font-size:13px}.gf small{color:#8A7F73;font-size:11.5px}.gf em{font-style:normal;font:600 13px 'IBM Plex Mono',monospace}
/* phone peeking */
.phone{position:absolute;right:16px;bottom:-170px;width:220px;height:400px;background:#1E1B18;border-radius:34px;padding:9px;box-shadow:0 24px 50px rgba(30,27,24,.28);transform:rotate(-4deg)}
.scr{background:#fff;border-radius:26px;height:100%;padding:16px 14px;overflow:hidden}
.scr .pt{font:600 9.5px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#E0522F}.scr h3{margin:4px 0 8px;font:700 16px/1.15 'Literata',serif}
.seg{display:grid;grid-template-columns:1fr 1fr;background:#F3EDE3;border-radius:9px;padding:3px;font-size:11px;font-weight:600;text-align:center;margin-bottom:8px}
.seg span{padding:5px;border-radius:7px}.seg .on{background:#1E1B18;color:#fff}
.amts{display:grid;grid-template-columns:1fr 1fr;gap:6px}.amts span{border:1.5px solid #E7DECF;border-radius:9px;padding:7px 0;text-align:center;font-weight:700;font-size:13px}.amts .on{border-color:#E0522F;background:#FFF5F1;color:#C2401F}
.scr small{display:block;color:#7D7268;font-size:10.5px;margin-top:7px;text-align:center}
.lbl2{position:absolute;left:18px;bottom:14px;text-align:left;font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#8A7F73;text-align:right;line-height:1.5}
</style></head><body>
<div class="top"><div class="mark"><i></i><div><b>Harbor Light Food Bank</b><span>DONOR DESK</span></div></div>
<div class="tabs"><span class="on">Donors</span><span>Campaigns</span><span>Donation pages</span><span>Volunteers</span><span>Programs</span><span>Receipts<em>9</em></span></div>
<div class="srch">${ic(I.search, 14)}Find a donor, gift or household</div><div class="ask">${ic(I.spark, 14)}Ask Donor Desk</div></div>
<div class="impact"><span class="lbl">SEPTEMBER IMPACT</span><span><b>1.24M</b>meals distributed</span><span><b>18,600</b>households served</span><span><b>214</b>partner pantries</span><span><b>2,316</b>volunteer shifts</span><span style="margin-left:auto">Donor retention 2026 <b>58%</b></span></div>
<div class="grid">
<div style="display:flex;flex-direction:column;gap:16px">
<div class="card"><div class="h">Donor lists<small>auto-updated</small></div>${ls}</div>
<div class="card"><div class="h">Volunteer shifts<small>this week</small></div>${sh}<div class="vh"><div><small>Volunteer hours 2026</small><b>18,420</b></div><span class="btn" style="background:transparent;color:#fff;border-color:#5FA8A3">Log hours</span></div></div>
</div>
<div class="card donor">
<div class="dh"><div class="av">DW</div><div><h1>Denise Whitaker</h1><p>Federal Hill, Baltimore · donor since Mar 2021 · prefers email</p>
<div class="chips"><span class="chip" style="background:#E3F1EF;color:#1F7A7A">${ic(I.repeat, 12)}Monthly $50 · active</span><span class="chip" style="background:#FFF1DB;color:#9A6408">${ic(I.alert, 12)}Card expires 10/26</span><span class="chip" style="background:#F3EDE3;color:#6B6157">Volunteer · 41 h</span><span class="chip" style="background:#F3EDE3;color:#6B6157">Gala 2025 guest</span></div></div>
<div class="eng"><small>ENGAGEMENT</small><div class="meter"><i style="background:#F3D1C4"></i><i style="background:#EFA98F"></i><i style="background:#E8825F"></i><i style="background:#E0522F"></i><i></i></div><b>Warm → hot</b></div></div>
<div class="stats"><div><small>Lifetime giving</small><b>$4,860</b></div><div><small>Largest gift</small><b>$1,000</b></div><div><small>Last gift</small><b>Sep 30</b></div><div><small>Gifts</small><b>34</b></div></div>
<div class="mid"><div><div class="tlh" style="padding-bottom:0">Giving by year<small>2024 includes Giving Tuesday $1,000</small></div><div class="years">${bars}</div></div>
<div class="move"><small>MOVES · MAJOR GIFT</small><div class="stages"><i class="d"></i><i class="d"></i><i class="c"></i><i></i><i></i></div><b>Cultivation · Harvest Gala table host</b><p>Next: invite to the Nov 14 warehouse tour with her book club. Ask target $2,500.</p><span class="btn p">${ic(I.cal, 13)}Schedule tour</span></div></div>
<div class="tlh">Timeline<small>gifts · emails · calls · volunteering</small></div>${tl}
</div>
<div class="card camp">
<div class="ph"><div><small>CAMPAIGN · ENDS DEC 31</small><b>Holiday Meals 2026</b></div></div>
<div class="cb"><div class="thermo"><div class="tube"><div class="fill"></div></div><div class="bulb"></div>
<span class="tick" style="top:0">$250k</span><span class="tick" style="top:118px">$125k</span></div>
<div><div class="goal">RAISED OF $250,000 GOAL</div><div class="raised">$171,350 <small>68.5%</small></div>
<div class="kv"><div><small>Donors</small><b>1,284</b></div><div><small>Meals funded</small><b>514,050</b></div><div><small>Days left</small><b>87</b></div><div><small>Monthly sign-ups</small><b>96</b></div></div>
<div class="match"><b>Chesapeake Credit Union</b> matches 1:1 up to $25,000 · <b>$18,400</b> matched<div class="mb"><i></i></div></div></div></div>
<div class="gfh">Live gifts<small>receipts auto-sent</small></div>${gf}
<div class="lbl2">DONATION PAGE<br>harborlight.org/holiday</div>
<div class="phone"><div class="scr"><div class="pt">HOLIDAY MEALS 2026</div><h3>Every $1 shares 3 meals</h3><div class="seg"><span>Give once</span><span class="on">Monthly</span></div>
<div class="amts"><span>$35</span><span class="on">$75</span><span>$150</span><span>$300</span></div><small>$75/mo shares 225 meals a month</small></div></div>
</div>
</div></body></html>`;
})();
