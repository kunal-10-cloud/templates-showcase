// Production-app previews (not landing pages) for fleet, construction, restaurant, hotel, salon.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 17}" height="${s || 17}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>', map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>', truck: '<path d="M2 6h11v10H2zM13 10h5l3 3v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7"/>',
    check: '<path d="M4 12l5 5L20 6"/>', inv: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', proj: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h6M7 13h10M7 17h4"/>', hard: '<path d="M4 16a8 8 0 0 1 16 0"/><path d="M2 16h20v3H2zM10 8V5h4v3"/>', diary: '<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M9 7h6M9 11h6"/>',
    swap: '<path d="M4 7h13l-3-3M20 17H7l3 3"/>', doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', table: '<rect x="4" y="9" width="16" height="4" rx="1"/><path d="M6 13v6M18 13v6"/>', ticket: '<path d="M4 5h16v4a3 3 0 0 0 0 6v4H4v-4a3 3 0 0 0 0-6z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h10"/>', stock: '<path d="M3 21V8l9-5 9 5v13"/><path d="M8 21v-7h8v7"/>', bed: '<path d="M3 18V7M3 13h18v5M21 18v-5a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.8"/>', key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M17 5l2 2"/>',
    broom: '<path d="M14 3l7 7M11 6l7 7-6 6-7-7z"/><path d="M5 12l-2 9 9-2"/>', tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.5"/>', scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5L20 18M8.5 16.5L20 6"/>', bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.9 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>', pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
  };

  // shared shell; t = theme options
  function shell(t, nav, header, brief, kpis, body) {
    const dark = t.dark;
    const navHtml = nav.map(n => n.g ? `<div class="gl">${n.g}</div>` : `<div class="nv${n.on ? " on" : ""}">${ic(I[n.i], 16)}<span>${n.l}</span>${n.n ? `<em class="${n.red ? "red" : ""}">${n.n}</em>` : ""}</div>`).join("");
    return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${t.fontUrl}&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:${t.size || 13.5}px/1.45 ${t.font};color:#111827;background:${t.bg}}
.app{display:grid;grid-template-columns:${t.sbw || 244}px 1fr;height:900px}
.sb{background:${dark ? t.sbBg : "#fff"};color:${dark ? "#C9CFDB" : "#374151"};border-right:1px solid ${dark ? "transparent" : "#E6E8EE"};padding:16px 12px;display:flex;flex-direction:column;gap:1px}
.br{display:flex;gap:10px;align-items:center;padding:2px 6px 12px}.br i{width:34px;height:34px;border-radius:${t.r}px;background:${t.accent};color:#fff;display:grid;place-items:center;font-weight:700;font-style:normal;font-size:15px;flex:none}
.br b{display:block;font-size:14px;line-height:1.2;color:${dark ? "#fff" : "#111827"}}.br span{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:${dark ? "#8A93A6" : "#6B7280"};font-weight:600}
.ask{display:flex;align-items:center;justify-content:center;gap:8px;background:${dark ? "rgba(255,255,255,.08)" : "#111827"};color:#fff;border:1px solid ${dark ? "rgba(255,255,255,.12)" : "#111827"};border-radius:${t.r}px;padding:8px;font-weight:600;font-size:13px;margin:0 2px 8px}.ask svg{color:${t.accent2 || t.accent}}
.gl{font-size:10.5px;letter-spacing:.11em;text-transform:uppercase;color:${dark ? "#6F7890" : "#9CA3AF"};padding:10px 10px 4px;font-weight:600}
.nv{display:flex;align-items:center;gap:10px;padding:6.5px 10px;border-radius:${Math.max(6, t.r - 2)}px;font-weight:500}.nv svg{color:${dark ? "#6F7890" : "#9CA3AF"}}
.nv.on{background:${dark ? "rgba(255,255,255,.1)" : t.soft};color:${dark ? "#fff" : t.accentText};font-weight:600}.nv.on svg{color:${dark ? t.accent2 || "#fff" : t.accent}}
.nv em{margin-left:auto;font-style:normal;background:${dark ? "rgba(255,255,255,.12)" : "#EEF0F4"};color:${dark ? "#E5E7EB" : "#374151"};font-size:11px;font-weight:700;border-radius:9px;min-width:20px;text-align:center;line-height:18px;padding:0 5px}.nv em.red{background:#E5372B;color:#fff}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:10px 8px;border-top:1px solid ${dark ? "rgba(255,255,255,.08)" : "#EEF0F4"}}.me b{color:${dark ? "#fff" : "#111827"}}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.main{padding:20px 26px;display:flex;flex-direction:column;gap:13px;min-width:0}
.hd{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}.hd h1{margin:0;font-size:24px;font-weight:700;letter-spacing:-.015em}.hd p{margin:2px 0 0;color:#6B7280}
.hb{display:flex;gap:8px;align-items:center}.btn{border:1px solid #D7DBE3;background:#fff;border-radius:${t.r}px;padding:8px 13px;font-weight:600;font-size:13px;white-space:nowrap}.btn.p{background:${t.accent};border-color:${t.accent};color:#fff}
.srch{display:flex;align-items:center;gap:7px;border:1px solid #E1E4EA;background:#fff;border-radius:${t.r}px;padding:7px 11px;color:#9CA3AF;width:220px;font-size:12.5px}
.brief{background:#fff;border:1px solid #E4E7ED;border-radius:${t.r + 4}px;padding:12px 14px;display:flex;gap:14px;align-items:stretch}
.bt{width:170px;flex:none;display:flex;flex-direction:column;gap:4px;justify-content:center;border-right:1px solid #EEF0F4;padding-right:12px}
.bt .bl{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:${t.accentText}}.bt b{font-size:14.5px;line-height:1.25}
.bi{flex:1;display:flex;flex-direction:column;gap:3px;padding:2px 4px;min-width:0}.bi span{font-size:12.5px;color:#374151;line-height:1.35}.bi u{text-decoration:none;font-size:12px;font-weight:700;color:${t.accentText};margin-top:auto}
.kp{display:grid;grid-template-columns:repeat(${kpis.length},1fr);gap:11px}
.k{background:#fff;border:1px solid #E4E7ED;border-radius:${t.r + 2}px;padding:11px 13px}.k p{margin:0;color:#6B7280;font-size:12px}.k b{display:block;font-size:22px;letter-spacing:-.02em;margin:1px 0}.k small{color:#6B7280;font-size:11.5px}.k small.up{color:#0F8A4F;font-weight:600}.k small.dn{color:#C2261A;font-weight:600}
.card{background:#fff;border:1px solid #E4E7ED;border-radius:${t.r + 4}px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.ch{display:flex;justify-content:space-between;align-items:center;padding:11px 14px;border-bottom:1px solid #F0F1F4;font-weight:700;font-size:14px;gap:10px}.ch span{font-weight:500;font-size:12px;color:#6B7280}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:1px 8px;font-size:11px;font-weight:600;white-space:nowrap}
.c-g{background:#E3F6EC;color:#0F7A45}.c-a{background:#FFF4DB;color:#946200}.c-r{background:#FDECEC;color:#C2261A}.c-b{background:#E8EEFF;color:#2747C9}.c-s{background:#EEF0F4;color:#4B5563}.c-v{background:#F0EBFF;color:#5B3FD1}
.seg{display:inline-flex;background:#F1F3F6;border-radius:8px;padding:2px}.seg i{font-style:normal;font-size:12px;font-weight:600;padding:3px 10px;border-radius:6px;color:#6B7280}.seg i.on{background:#fff;color:#111827;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.live{animation:pl 1.6s infinite}@keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}
${t.css || ""}
</style></head><body><div class="app">
<aside class="sb"><div class="br"><i>${t.mark}</i><div><b>${t.biz}</b><span>${t.label}</span></div></div>
<div class="ask">${ic(I.spark, 15)}Ask about your business</div>${navHtml}
<div class="me"><span class="av" style="background:${t.ownerColor}">${t.ownerIni}</span><div><b style="font-size:13px">${t.owner}</b><br><small style="color:${dark ? "#8A93A6" : "#6B7280"}">Owner</small></div></div></aside>
<main class="main">
<div class="hd"><div><h1>${header[0]}</h1><p>${header[1]}</p></div><div class="hb"><span class="srch">${ic(I.search, 14)}${header[2]}</span>${header[3]}</div></div>
<div class="brief"><div class="bt"><span class="bl">${ic(I.spark, 12)} MORNING BRIEF</span><b>${brief[0]}</b></div>${brief[1].map(([a, b]) => `<div class="bi"><span>${a}</span><u>${b} →</u></div>`).join("")}</div>
<div class="kp">${kpis.map(([l, v, s, c]) => `<div class="k"><p>${l}</p><b${c ? ` style="color:${c}"` : ""}>${v}</b><small class="${s[0] === "+" ? "up" : s[0] === "!" ? "dn" : ""}">${s.replace(/^!/, "")}</small></div>`).join("")}</div>
${body}
</main></div></body></html>`;
  }
  const av = (ini, c, s) => `<span class="av" style="background:${c};${s ? `width:${s}px;height:${s}px;font-size:${Math.round(s * .36)}px` : ""}">${ini}</span>`;

  // ======================= FLEET OS =======================
  {
    const t = { font: "'Manrope',system-ui,sans-serif", fontUrl: "Manrope:wght@400;500;600;700;800", bg: "#F1F4F7", accent: "#0E7FB8", accent2: "#5CC6F2", accentText: "#0B6A9A", soft: "#E3F2FA", r: 8, dark: true, sbBg: "#0B1B26", mark: "S", biz: "Swift Couriers", label: "Fleet OS", owner: "Lotte de Vries", ownerIni: "LV", ownerColor: "#0E7FB8",
      css: `.cols{display:grid;grid-template-columns:1.55fr 1fr;gap:13px;flex:1;min-height:0}
.mapw{flex:1;position:relative;background:#E8EEF1}.mapw svg{position:absolute;inset:0;width:100%;height:100%}
.legend{position:absolute;left:12px;top:12px;background:#fff;border:1px solid #E4E7ED;border-radius:8px;padding:8px 10px;font-size:11.5px;display:flex;flex-direction:column;gap:4px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.legend span{display:flex;align-items:center;gap:6px}.legend i{width:14px;height:3px;border-radius:2px;display:block}
.pop{position:absolute;right:14px;bottom:14px;background:#0B1B26;color:#E6EEF3;border-radius:10px;padding:10px 12px;font-size:12px;width:250px;box-shadow:0 10px 24px rgba(0,0,0,.25)}.pop b{color:#fff}
.dr{display:grid;grid-template-columns:30px 1fr 92px 74px;gap:10px;align-items:center;padding:8px 14px;border-bottom:1px solid #F3F4F6}
.dr b{display:block;font-size:13px}.dr small{color:#6B7280;font-size:11.5px}.pb{height:6px;border-radius:4px;background:#EEF1F4;overflow:hidden}.pb i{display:block;height:100%;border-radius:4px;background:#0E7FB8}
.ex{display:flex;gap:10px;align-items:center;padding:8px 14px;border-bottom:1px solid #F3F4F6;font-size:12.5px}.ex svg{color:#C2261A;flex:none}.ex .btn{padding:4px 9px;font-size:11.5px;margin-left:auto}` };
    const nav = [{ i: "home", l: "Today" }, { i: "map", l: "Live map", on: 1 }, { i: "inbox", l: "Inbox", n: 3 }, { g: "Operations" }, { i: "box", l: "Orders", n: 412 }, { i: "route", l: "Routes" }, { i: "truck", l: "Drivers & vans" }, { i: "check", l: "Proof of delivery" }, { g: "Money" }, { i: "inv", l: "Invoices" }, { i: "chart", l: "Reports" }, { i: "users", l: "Customers" }, { g: "Make it yours" }, { i: "spark", l: "Make it yours" }, { i: "gear", l: "Settings" }];
    const roads = `<path d="M0 120 C200 110 380 160 560 140 S820 100 980 130" stroke="#fff" stroke-width="14" fill="none"/><path d="M0 330 C180 300 300 360 520 340 S860 300 980 320" stroke="#fff" stroke-width="12" fill="none"/>
<path d="M150 0 C170 140 120 260 160 480" stroke="#fff" stroke-width="12" fill="none"/><path d="M430 0 C420 160 470 300 440 480" stroke="#fff" stroke-width="16" fill="none"/><path d="M700 0 C720 150 680 300 720 480" stroke="#fff" stroke-width="10" fill="none"/>
<path d="M0 220 L980 250" stroke="#fff" stroke-width="7" fill="none"/><path d="M260 0 L320 480" stroke="#fff" stroke-width="6" fill="none"/><path d="M580 0 L560 480" stroke="#fff" stroke-width="6" fill="none"/><path d="M820 0 L860 480" stroke="#fff" stroke-width="6" fill="none"/><path d="M0 420 L980 400" stroke="#fff" stroke-width="7" fill="none"/>
<path d="M-20 270 C150 250 260 290 420 280 S700 240 1000 270 L1000 300 C700 270 560 310 420 308 S150 280 -20 300Z" fill="#BFD9E8"/>
<rect x="40" y="20" width="80" height="70" rx="10" fill="#D5E6D0"/><rect x="760" y="360" width="140" height="80" rx="12" fill="#D5E6D0"/>`;
    const r1 = "M90 400 L160 330 L300 320 L440 300 L460 180 L560 140", r2 = "M90 400 L170 410 L330 420 L560 405 L720 380 L860 300", r3 = "M90 400 L150 250 L270 120 L430 110 L700 120 L830 80", r4 = "M90 400 L300 360 L440 240 L600 230";
    const pin = (x, y, ini, c) => `<g><circle cx="${x}" cy="${y}" r="15" fill="${c}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y + 4}" font-size="10" font-weight="800" text-anchor="middle" fill="#fff" font-family="Manrope,sans-serif">${ini}</text></g>`;
    const svg = `<svg viewBox="0 0 980 480" preserveAspectRatio="xMidYMid slice">${roads}
<path d="${r1}" stroke="#0E7FB8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="${r2}" stroke="#16A34A" stroke-width="4" fill="none" stroke-linecap="round"/><path d="${r3}" stroke="#E07A10" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="2 0"/><path d="${r4}" stroke="#7C3AED" stroke-width="4" fill="none" stroke-linecap="round"/>
${[[300, 320], [560, 140], [330, 420], [720, 380], [860, 300], [270, 120], [700, 120], [830, 80], [440, 240], [600, 230], [430, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#334155" stroke-width="2"/>`).join("")}
<rect x="72" y="382" width="36" height="36" rx="8" fill="#0B1B26"/><text x="90" y="405" font-size="10" font-weight="800" text-anchor="middle" fill="#fff" font-family="Manrope,sans-serif">HUB</text>
${pin(440, 300, "JB", "#0E7FB8")}${pin(560, 405, "SV", "#16A34A")}${pin(430, 110, "AZ", "#C2261A")}
<g>${pin(0, 0, "MJ", "#7C3AED")}<animateMotion dur="12s" repeatCount="indefinite" path="${r4}"/></g></svg>`;
    const drivers = [["JB", "#0E7FB8", "Jeroen Bakker", "Route 4 · Kralingen", 31, 40, "On time", "c-g"], ["SV", "#16A34A", "Sanne Visser", "Route 7 · Feijenoord", 18, 35, "On time", "c-g"], ["AZ", "#C2261A", "Ahmed Ziani", "Route 2 · Noord", 22, 38, "+24 min", "c-r"],
      ["MJ", "#7C3AED", "Mila Jansen", "Route 9 · Delfshaven", 12, 30, "On time", "c-g"], ["TB", "#E07A10", "Tim Bos", "Route 5 · Centrum", 27, 33, "Break", "c-a"], ["NK", "#475569", "Noor Kaya", "Route 3 · Charlois", 9, 36, "Loading", "c-s"]];
    const body = `<div class="cols"><div class="card"><div class="ch">Rotterdam · live <span style="display:flex;gap:10px;align-items:center"><span class="chip c-g"><b class="live" style="width:6px;height:6px;border-radius:50%;background:#0F7A45;display:inline-block"></b>18 vans on road</span><span class="seg"><i class="on">Map</i><i>Timeline</i><i>List</i></span></span></div>
<div class="mapw">${svg}<div class="legend"><span><i style="background:#0E7FB8"></i>Route 4 · Jeroen</span><span><i style="background:#16A34A"></i>Route 7 · Sanne</span><span><i style="background:#E07A10"></i>Route 2 · Ahmed</span><span><i style="background:#7C3AED"></i>Route 9 · Mila</span></div>
<div class="pop"><b>Ahmed Ziani · Route 2</b><br>Stuck on Maastunnel, 24 min behind. 6 customers notified with new ETA.<div style="margin-top:6px;color:#5CC6F2;font-weight:700">Reassign 4 stops to Tim →</div></div></div></div>
<div style="display:flex;flex-direction:column;gap:13px;min-height:0"><div class="card"><div class="ch">Drivers <span>stops done</span></div>${drivers.map(([i, c, n, r, d, tot, s, cc]) => `<div class="dr">${av(i, c)}<div><b>${n}</b><small>${r}</small></div><div><div class="pb"><i style="width:${Math.round(d / tot * 100)}%;background:${c}"></i></div><small>${d}/${tot}</small></div><span class="chip ${cc}" style="justify-self:end">${s}</span></div>`).join("")}</div>
<div class="card"><div class="ch">Exceptions <span class="chip c-r">5 open</span></div>
<div class="ex">${ic(I.warn, 15)}<span><b>#RT-88214</b> Recipient not home · Blaak 31</span><span class="btn">Reschedule</span></div>
<div class="ex">${ic(I.warn, 15)}<span><b>#RT-88190</b> Damaged parcel · photo attached</span><span class="btn">Review</span></div>
<div class="ex">${ic(I.warn, 15)}<span><b>#RT-88177</b> Wrong address · Weena 505</span><span class="btn">Call</span></div></div></div></div>`;
    window.LANDINGS.fleet = shell(t, nav, ["Live map", "Thursday 1 October · 412 deliveries today · updated 10s ago", "Order, driver, postcode…", '<span class="btn">Import orders</span><span class="btn p">+ New delivery</span>'],
      ["5 things before 10:00", [["Route 2 is 24 min late on the Maastunnel. Moving 4 stops to Tim keeps every slot.", "Reassign stops"], ["3 failed deliveries from yesterday need a new slot.", "Rebook"], ["Van RT-07 is due for service on Friday.", "Book garage"], ["Albert Heijn Zuid invoice (€4,180) is 9 days overdue.", "Send reminder"]]],
      [["Deliveries today", "412", "86% done"], ["On time", "97.4%", "+0.8 pts vs last week"], ["Drivers on road", "18", "2 on break"], ["Exceptions", "5", "!3 need action"], ["Revenue today", "€6,920", "+11%"]], body);
  }

  // ======================= BUILD OS =======================
  {
    const t = { font: "'IBM Plex Sans',system-ui,sans-serif", fontUrl: "IBM+Plex+Sans:wght@400;500;600;700", bg: "#F3F2EE", accent: "#D4650F", accentText: "#B4530A", soft: "#FCEBDD", r: 6, dark: false, mark: "R", biz: "Ridgeline Builders", label: "Build OS", owner: "Kyle Morgan", ownerIni: "KM", ownerColor: "#D4650F", size: 13.5,
      css: `.cols{display:grid;grid-template-columns:1.65fr 1fr;gap:13px;flex:1;min-height:0}
.gh{display:grid;grid-template-columns:170px repeat(8,1fr);border-bottom:1px solid #EEEDE8;font-size:11px;color:#6B7280;font-weight:600;background:#FAFAF8}.gh span{padding:7px 6px;border-left:1px solid #EEEDE8}
.gr{display:grid;grid-template-columns:170px 1fr;border-bottom:1px solid #F2F1ED;height:41px}.gr .n{padding:0 12px;display:flex;flex-direction:column;justify-content:center;font-size:12.5px;font-weight:600}.gr .n small{font-weight:400;color:#6B7280;font-size:11px}
.gt{position:relative;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(12.5% - 1px),#F2F1ED calc(12.5% - 1px),#F2F1ED 12.5%)}
.gb{position:absolute;top:9px;height:23px;border-radius:5px;font-size:11px;font-weight:600;color:#fff;padding:3px 8px;white-space:nowrap;overflow:hidden}
.today{position:absolute;top:0;bottom:0;width:2px;background:#C2261A;z-index:2}.today:before{content:"Today";position:absolute;top:-1px;left:4px;font-size:10px;font-weight:700;color:#C2261A;background:#fff;padding:0 3px}
.de{display:grid;grid-template-columns:44px 1fr;gap:10px;padding:9px 14px;border-bottom:1px solid #F2F1ED}.de .tm{font-size:12px;font-weight:700;color:#6B7280}.de b{font-size:13px}.de p{margin:2px 0 0;font-size:12px;color:#4B5563}
.ph{display:flex;gap:5px;margin-top:6px}.ph i{width:52px;height:38px;border-radius:5px;display:block}
.va{display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:1px solid #F2F1ED}.va b{font-size:13px;display:block}.va small{color:#6B7280;font-size:11.5px}.va .amt{margin-left:auto;font-weight:700;font-size:13.5px}` };
    const nav = [{ i: "home", l: "Today" }, { i: "proj", l: "Projects", on: 1, n: 9 }, { i: "inbox", l: "Inbox", n: 4 }, { g: "Site" }, { i: "cal", l: "Schedule" }, { i: "diary", l: "Site diary" }, { i: "hard", l: "Subcontractors" }, { i: "swap", l: "Variations", n: 6 }, { g: "Money" }, { i: "doc", l: "Estimates" }, { i: "inv", l: "Invoices" }, { i: "chart", l: "Job costing" }, { g: "Make it yours" }, { i: "spark", l: "Make it yours" }, { i: "gear", l: "Settings" }];
    const weeks = ["Sep 14", "Sep 21", "Sep 28", "Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2"];
    const rows = [["Demolition & strip-out", "In-house crew", [[0, 11, "#6B7280", "Done"]]], ["Framing", "In-house crew", [[8, 18, "#6B7280", "Done"]]], ["Plumbing rough-in", "Apex Plumbing", [[20, 15, "#2563EB", "Passed"]]], ["Electrical rough-in", "Volt Bros Electric", [[30, 19, "#D4650F", "In progress · 70%"]]],
      ["Inspection", "City of Denver", [[47, 8, "#C2261A", "Fri 9"]]], ["Drywall & tape", "Front Range Drywall", [[52, 16, "#94A3B8", "Booked"]]], ["Cabinets & counters", "Summit Cabinetry", [[67, 15, "#94A3B8", "Delivery Oct 20"]]], ["Tile & finish", "In-house crew", [[80, 17, "#94A3B8", "Booked"]]], ["Plumbing fit-off", "Apex Plumbing", [[84, 10, "#94A3B8", "Booked"]]]];
    const gantt = `<div class="card"><div class="ch">14 Elm St · kitchen + two baths <span style="display:flex;gap:8px;align-items:center"><span class="chip c-g">On budget · $186,400</span><span class="chip c-a">Week 4 of 8</span><span class="seg"><i>Day</i><i class="on">Week</i><i>Month</i></span></span></div>
<div class="gh"><span style="border-left:0">Trade</span>${weeks.map(w => `<span>${w}</span>`).join("")}</div>
<div style="position:relative">${rows.map(([n, s, bars]) => `<div class="gr"><div class="n">${n}<small>${s}</small></div><div class="gt">${bars.map(([l, w, c, txt]) => `<div class="gb" style="left:${l}%;width:${w}%;background:${c}">${txt}</div>`).join("")}</div></div>`).join("")}<div class="today" style="left:calc(170px + (100% - 170px) * .405)"></div></div></div>`;
    const right = `<div style="display:flex;flex-direction:column;gap:13px;min-height:0"><div class="card"><div class="ch">Site diary · today <span>3 entries</span></div>
<div class="de"><span class="tm">9:40</span><div><b>Rough plumbing passed inspection</b><p>Inspector R. Lyle signed off both baths. Certificate filed to project.</p></div></div>
<div class="de"><span class="tm">11:15</span><div><b>Electrical rough-in, kitchen island run</b><p>Volt Bros on site (3). 12 photos added.</p><div class="ph"><i style="background:linear-gradient(135deg,#C9B79C,#8C7A62)"></i><i style="background:linear-gradient(135deg,#A9B4BF,#6B7785)"></i><i style="background:linear-gradient(135deg,#D9CBB2,#A8967A)"></i><i style="background:#EDEBE5;display:grid;place-items:center;font-size:11px;color:#6B7280;font-style:normal">+9</i></div></div></div>
<div class="de"><span class="tm">13:05</span><div><b>Drywall delivery confirmed</b><p>60 sheets arriving Thu 7:00, gate code shared with driver.</p></div></div></div>
<div class="card"><div class="ch">Variations awaiting sign-off <span class="chip c-a">$4,980</span></div>
<div class="va">${av("VO", "#D4650F")}<div><b>VO-04 · Extra outlet on island</b><small>Sent to Dana Hollis · viewed 2h ago</small></div><span class="amt">$640</span></div>
<div class="va">${av("VO", "#2563EB")}<div><b>VO-05 · Upgrade to quartz counters</b><small>Awaiting client · sent yesterday</small></div><span class="amt">$3,860</span></div>
<div class="va">${av("VO", "#6B7280")}<div><b>VO-06 · Move vent 18 in.</b><small>Draft · from site diary</small></div><span class="amt">$480</span></div></div></div>`;
    window.LANDINGS.construction = shell(t, nav, ["Projects", "Monday 5 October · 9 active jobs · 14 subcontractors on site", "Project, sub, address…", '<span class="btn">Site diary</span><span class="btn p">+ New estimate</span>'],
      ["4 things for today", [["City inspection for 14 Elm St is Friday. Electrical must finish by Thursday.", "Confirm with Volt Bros"], ["2 variations ($4,500) are waiting on client sign-off.", "Nudge clients"], ["Stage 2 invoice for 88 Pine Ave ($42,000) is ready.", "Send invoice"], ["Cabinet delivery moved to Oct 20; 2 trades rescheduled.", "Review schedule"]]],
      [["Active projects", "9", "$2.4M contract value"], ["Billed to date", "$1.38M", "57% of contracts"], ["Open variations", "6", "$48,200 pending"], ["Margin (YTD)", "21.4%", "+1.9 pts"], ["Subs on site", "14", "across 5 sites"]], `<div class="cols">${gantt}${right}</div>`);
  }

  // ======================= KITCHEN OS =======================
  {
    const t = { font: "'Figtree',system-ui,sans-serif", fontUrl: "Figtree:wght@400;500;600;700;800", bg: "#F6F3EF", accent: "#C8402E", accent2: "#F59E7B", accentText: "#A8321F", soft: "#FBE6E1", r: 10, dark: true, sbBg: "#231A17", mark: "S", biz: "Saffron Table", label: "Kitchen OS", owner: "Arjun Mehta", ownerIni: "AM", ownerColor: "#C8402E", size: 13.5,
      css: `.cols{display:grid;grid-template-columns:1.5fr 1fr;gap:13px;flex:1;min-height:0}
.floor{position:relative;flex:1;background:#FBFAF8;background-image:radial-gradient(#E7E2DC 1px,transparent 1px);background-size:18px 18px}
.tb{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid;line-height:1.15;text-align:center}
.tb small{font-weight:600;font-size:10px;opacity:.85}.zone{position:absolute;font-size:10.5px;font-weight:700;letter-spacing:.1em;color:#A8A29E}
.lg{display:flex;gap:10px;font-size:11px;font-weight:600;color:#6B7280}.lg span{display:flex;align-items:center;gap:4px}.lg i{width:9px;height:9px;border-radius:3px;display:block}
.rail{display:flex;gap:9px;padding:10px 12px;background:#2B2321;overflow:hidden}
.tk{width:146px;flex:none;background:#FFFDF7;border-radius:4px;padding:8px 9px;font-size:11.5px;box-shadow:0 2px 0 rgba(0,0,0,.25);border-top:4px solid}.tk b{display:flex;justify-content:space-between;font-size:12.5px}.tk p{margin:4px 0 0;color:#44403C;line-height:1.35}.tk .tm{font-weight:800;font-variant-numeric:tabular-nums}
.bk{display:grid;grid-template-columns:52px 1fr auto;gap:10px;align-items:center;padding:8px 14px;border-bottom:1px solid #F3F1EE}.bk .t{font-weight:800;font-size:13px}.bk b{display:block;font-size:13px}.bk small{color:#78716C;font-size:11.5px}` };
    const nav = [{ i: "home", l: "Service" , on: 1 }, { i: "inbox", l: "Inbox", n: 5 }, { g: "Front of house" }, { i: "table", l: "Floor plan" }, { i: "cal", l: "Bookings", n: 46 }, { i: "box", l: "Online orders", n: 8 }, { g: "Kitchen" }, { i: "ticket", l: "Kitchen display" }, { i: "menu", l: "Menu" }, { i: "stock", l: "Stock", n: 3, red: 1 }, { g: "Business" }, { i: "chart", l: "Reports" }, { i: "users", l: "Staff rota" }, { i: "spark", l: "Make it yours" }, { i: "gear", l: "Settings" }];
    const S = { seat: ["#2563EB", "#E8EEFF"], main: ["#C8402E", "#FBE6E1"], dess: ["#9333EA", "#F3E8FF"], bill: ["#16A34A", "#E3F6EC"], free: ["#A8A29E", "#FFFFFF"], res: ["#D97706", "#FFF4DB"] };
    const tb = (x, y, w, h, round, n, sub, st) => `<div class="tb" style="left:${x}%;top:${y}%;width:${w}px;height:${h}px;border-radius:${round ? "50%" : "10px"};border-color:${S[st][0]};background:${S[st][1]};color:${S[st][0]}">T${n}<small>${sub}</small></div>`;
    const floor = `<div class="card"><div class="ch">Floor plan · Friday dinner <span class="lg"><span><i style="background:#2563EB"></i>Seated</span><span><i style="background:#C8402E"></i>Mains</span><span><i style="background:#9333EA"></i>Dessert</span><span><i style="background:#16A34A"></i>Bill</span><span><i style="background:#D97706"></i>Reserved</span></span></div>
<div class="floor"><span class="zone" style="left:3%;top:4%">WINDOW</span><span class="zone" style="left:56%;top:4%">MAIN ROOM</span><span class="zone" style="left:3%;top:64%">TERRACE</span>
${tb(4, 13, 72, 72, 1, 1, "2 · 0:42", "dess")}${tb(16, 13, 72, 72, 1, 2, "2 · 0:18", "main")}${tb(28, 13, 72, 72, 1, 3, "free", "free")}${tb(40, 13, 72, 72, 1, 4, "2 · 0:06", "seat")}
${tb(56, 13, 110, 70, 0, 9, "6 · 0:31", "main")}${tb(74, 13, 110, 70, 0, 10, "8 · 20:30", "res")}${tb(56, 40, 110, 70, 0, 11, "4 · 1:05", "bill")}${tb(74, 40, 110, 70, 0, 12, "4 · 0:24", "main")}
${tb(4, 37, 92, 64, 0, 5, "4 · 0:51", "dess")}${tb(20, 37, 92, 64, 0, 6, "3 · 0:12", "seat")}${tb(36, 37, 92, 64, 0, 7, "free", "free")}
${tb(6, 72, 72, 72, 1, 14, "2 · 20:15", "res")}${tb(19, 72, 72, 72, 1, 15, "2 · 0:37", "main")}${tb(32, 72, 72, 72, 1, 16, "free", "free")}${tb(56, 70, 110, 70, 0, 17, "5 · 0:09", "seat")}${tb(74, 70, 110, 70, 0, 18, "4 · 20:45", "res")}</div>
<div class="rail">${[["T9 · 6", "4:12", "#C8402E", "2 butter chicken · lamb rogan josh · 2 dal · 4 naan"], ["Deliveroo A82", "6:40", "#D97706", "2 lamb biryani · raita"], ["T12 · 4", "2:05", "#C8402E", "paneer tikka · 2 korma · rice"], ["T2 · 2", "8:31", "#DC2626", "tandoori platter · garlic naan"], ["Web pickup", "1:10", "#2563EB", "thali for two · mango lassi"]].map(([h, tm, c, p]) => `<div class="tk" style="border-top-color:${c}"><b>${h}<span class="tm" style="color:${c}">${tm}</span></b><p>${p}</p></div>`).join("")}</div></div>`;
    const right = `<div class="card"><div class="ch">Tonight's bookings <span>164 covers · 92% full</span></div>${[["19:30", "Patel", "6 · T9 · birthday", "Seated", "c-b"], ["20:00", "Hughes", "2 · T2", "Seated", "c-b"], ["20:15", "Okoro", "2 · T14 · terrace", "Confirmed", "c-g"], ["20:30", "Lindqvist", "8 · T10 · set menu", "Confirmed", "c-g"], ["20:45", "Moreau", "4 · T18", "Running late", "c-a"], ["21:00", "Chen", "3 · T7", "Confirmed", "c-g"], ["21:15", "Walk-in list", "3 parties waiting", "~20 min", "c-s"], ["21:30", "Adeyemi", "2 · window", "No deposit", "c-r"]].map(([tm, n, s, st, c]) => `<div class="bk"><span class="t">${tm}</span><div><b>${n}</b><small>${s}</small></div><span class="chip ${c}">${st}</span></div>`).join("")}
<div style="margin:10px 14px;border-radius:10px;background:#FBF4EE;border:1px dashed #E9C7B5;padding:9px 12px;font-size:12.5px;color:#57534E"><b>Low stock:</b> paneer (2 kg), coriander, garlic naan dough. Supplier order drafted for 7:00 tomorrow.</div></div>`;
    window.LANDINGS.restaurant = shell(t, nav, ["Service", "Friday 2 October · dinner · 19:52", "Booking, table, guest…", '<span class="btn">86 an item</span><span class="btn p">+ New booking</span>'],
      ["Before the 20:30 rush", [["T2 mains are at 8 min, over your 7 min target. Chef notified.", "Open ticket"], ["Party of 8 at 20:30 is on the set menu; prep 8 starters now.", "Fire starters"], ["Paneer will run out around 21:30 at this pace.", "86 at 2 kg"], ["Moreau (4) is running late; T18 held until 21:00.", "Message guest"]]],
      [["Covers tonight", "164", "+12 vs last Friday"], ["Sales so far", "£4,812", "+9%"], ["Avg ticket time", "6:40", "target 7:00"], ["Online orders", "48", "£1,920"], ["Avg spend", "£38.40", "+£2.10"]], `<div class="cols">${floor}${right}</div>`);
  }

  // ======================= STAY OS =======================
  {
    const t = { font: "'Hanken Grotesk',system-ui,sans-serif", fontUrl: "Hanken+Grotesk:wght@400;500;600;700;800", bg: "#F2F3EF", accent: "#3F6B4F", accent2: "#9FD3AE", accentText: "#2F5A3F", soft: "#E3EEE6", r: 8, dark: false, mark: "L", biz: "The Linden House", label: "Stay OS", owner: "Inês Costa", ownerIni: "IC", ownerColor: "#3F6B4F", size: 13.5,
      css: `.cols{display:grid;grid-template-columns:1.75fr 1fr;gap:13px;flex:1;min-height:0}
.tape{display:grid;grid-template-columns:92px repeat(10,1fr);font-size:11.5px}
.tape .h{padding:6px 4px;text-align:center;font-weight:700;color:#6B7280;border-bottom:1px solid #ECEDE8;border-left:1px solid #F1F2EE;background:#FAFAF8}.tape .h small{display:block;font-weight:500;font-size:10px}.tape .h.td{background:#E3EEE6;color:#2F5A3F}
.rm{padding:0 10px;display:flex;flex-direction:column;justify-content:center;border-bottom:1px solid #F1F2EE;height:33px;font-weight:700;font-size:12px}.rm small{font-weight:500;color:#9CA3AF;font-size:10.5px}
.cell{border-left:1px solid #F1F2EE;border-bottom:1px solid #F1F2EE;height:33px}
.bk{position:absolute;height:24px;border-radius:6px;font-size:11px;font-weight:700;color:#fff;padding:4px 7px;white-space:nowrap;overflow:hidden}
.lg{display:flex;gap:10px;font-size:11px;font-weight:600;color:#6B7280}.lg span{display:flex;align-items:center;gap:4px}.lg i{width:9px;height:9px;border-radius:3px;display:block}
.ar{display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center;padding:8px 14px;border-bottom:1px solid #F2F3EF}.ar b{display:block;font-size:13px}.ar small{color:#6B7280;font-size:11.5px}
.hk{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:10px 14px}.hk div{border-radius:7px;padding:6px;font-size:11px;font-weight:700;text-align:center;line-height:1.2}.hk small{display:block;font-weight:500;font-size:9.5px}` };
    const nav = [{ i: "home", l: "Front desk" }, { i: "cal", l: "Calendar", on: 1 }, { i: "inbox", l: "Guest messages", n: 7 }, { g: "Rooms" }, { i: "key", l: "Bookings", n: 11 }, { i: "bed", l: "Rooms & rates" }, { i: "broom", l: "Housekeeping", n: 6 }, { g: "Revenue" }, { i: "swap", l: "Channels" }, { i: "inv", l: "Payments" }, { i: "chart", l: "Reports" }, { i: "users", l: "Guests" }, { g: "Make it yours" }, { i: "spark", l: "Make it yours" }, { i: "gear", l: "Settings" }];
    const days = [["Mon", "28"], ["Tue", "29"], ["Wed", "30"], ["Thu", "1"], ["Fri", "2"], ["Sat", "3"], ["Sun", "4"], ["Mon", "5"], ["Tue", "6"], ["Wed", "7"]];
    const rooms = [["101", "Garden"], ["102", "Garden"], ["105", "Twin"], ["112", "Garden"], ["201", "Deluxe"], ["204", "Deluxe"], ["208", "Double"], ["210", "Double"], ["301", "Suite"], ["302", "Suite"]];
    const CH = { d: "#3F6B4F", b: "#2563EB", a: "#E0565B", e: "#D97706" };
    const bookings = [[0, 0, 3, "Martin", "d"], [0, 4, 4, "Watanabe", "b"], [1, 1, 2, "Rossi", "a"], [1, 4, 6, "Okonkwo", "d"], [2, 2, 4, "Ross ×2", "e"], [3, 0, 2, "Kowalski", "b"], [3, 3, 3, "Silva", "d"], [3, 7, 3, "Haddad", "a"],
      [4, 1, 3, "Bianchi", "b"], [4, 5, 4, "Martin S.", "d"], [5, 3, 3, "Sophie Martin", "d"], [5, 7, 2, "Lee", "e"], [6, 0, 4, "Novak", "a"], [6, 5, 2, "Garcia", "b"], [7, 2, 2, "Kim", "b"], [7, 6, 4, "Andersen", "d"], [8, 3, 5, "The Okonkwos", "d"], [9, 0, 2, "Dubois", "e"], [9, 4, 3, "Weber", "a"]];
    const head = `<div class="h" style="border-left:0"></div>${days.map(([d, n], i) => `<div class="h${i === 3 ? " td" : ""}">${d}<small>${n}</small></div>`).join("")}`;
    const grid = rooms.map(([r, ty]) => `<div class="rm">${r}<small>${ty}</small></div>${days.map((_, i) => `<div class="cell"${i === 3 ? ' style="background:#F6FAF7"' : ""}></div>`).join("")}`).join("");
    const bars = bookings.map(([ri, s, len, n, c]) => `<div class="bk" style="top:${ri * 33 + 4.5}px;left:calc(92px + (100% - 92px) / 10 * ${s} + 3px);width:calc((100% - 92px) / 10 * ${len} - 6px);background:${CH[c]}">${n}</div>`).join("");
    const tape = `<div class="card"><div class="ch">Room calendar · Sep 28 – Oct 7 <span class="lg"><span><i style="background:#3F6B4F"></i>Direct</span><span><i style="background:#2563EB"></i>Booking.com</span><span><i style="background:#E0565B"></i>Airbnb</span><span><i style="background:#D97706"></i>Expedia</span></span></div>
<div class="tape" style="border-bottom:1px solid #ECEDE8">${head}</div><div style="position:relative"><div class="tape">${grid}</div>${bars}</div></div>`;
    const hk = [["101", "Clean", "#E3F6EC", "#0F7A45"], ["102", "Dirty", "#FDECEC", "#C2261A"], ["105", "Clean", "#E3F6EC", "#0F7A45"], ["112", "In prog.", "#FFF4DB", "#946200"], ["201", "Clean", "#E3F6EC", "#0F7A45"], ["204", "Dirty", "#FDECEC", "#C2261A"], ["208", "Clean", "#E3F6EC", "#0F7A45"], ["210", "Repair", "#EEF0F4", "#4B5563"], ["301", "In prog.", "#FFF4DB", "#946200"], ["302", "Clean", "#E3F6EC", "#0F7A45"], ["303", "Dirty", "#FDECEC", "#C2261A"], ["304", "Clean", "#E3F6EC", "#0F7A45"]];
    const right = `<div style="display:flex;flex-direction:column;gap:13px;min-height:0"><div class="card"><div class="ch">Arrivals today <span>11 · 4 checked in</span></div>${[["SM", "#3F6B4F", "Sophie Martin", "204 · Deluxe · 3 nights · direct", "Arriving 15:00", "c-b"], ["KW", "#2563EB", "Kenji Watanabe", "112 · Garden · 2 nights", "Checked in", "c-g"], ["OK", "#3F6B4F", "The Okonkwos", "301 · Suite · 5 nights", "Paid", "c-g"], ["MR", "#D97706", "Mark & Ella Ross", "105 · Twin · late arrival 23:00", "Key code sent", "c-v"], ["DK", "#E0565B", "David Kim", "210 · Double · room in repair", "Move to 208", "c-r"]].map(([i, c, n, s, st, cc]) => `<div class="ar">${av(i, c)}<div><b>${n}</b><small>${s}</small></div><span class="chip ${cc}">${st}</span></div>`).join("")}</div>
<div class="card"><div class="ch">Housekeeping <span>3 dirty · 2 in progress</span></div><div class="hk">${hk.map(([r, s, bg, c]) => `<div style="background:${bg};color:${c}">${r}<small>${s}</small></div>`).join("")}</div></div></div>`;
    window.LANDINGS.hotel = shell(t, nav, ["Calendar", "Thursday 1 October · 29 of 32 rooms sold tonight", "Guest, room, booking ref…", '<span class="btn">Rates</span><span class="btn p">+ New booking</span>'],
      ["4 things for the desk", [["Room 210 AC is out; move David Kim to 208 before 15:00.", "Move booking"], ["Saturday is 97% full. Raise the last 2 rooms to €219.", "Update rate"], ["Mark & Ella Ross arrive at 23:00; door code is ready to send.", "Send code"], ["3 guests haven't paid their deposit for next week.", "Request payment"]]],
      [["Occupancy tonight", "91%", "29 / 32 rooms"], ["ADR", "€168", "+€12 vs last week"], ["RevPAR", "€153", "+9%"], ["Direct bookings", "46%", "+9 pts"], ["Arrivals today", "11", "4 checked in"]], `<div class="cols">${tape}${right}</div>`);
  }

  // ======================= SALON OS =======================
  {
    const t = { font: "'Onest',system-ui,sans-serif", fontUrl: "Onest:wght@400;500;600;700", bg: "#F7F3F4", accent: "#B4386B", accent2: "#F2A3C3", accentText: "#9B2D5A", soft: "#FBE7EF", r: 10, dark: true, sbBg: "#2A1720", mark: "B", biz: "Bloom Hair Studio", label: "Salon OS", owner: "Chloé Martin", ownerIni: "CM", ownerColor: "#B4386B", size: 13.5,
      css: `.cols{display:grid;grid-template-columns:1.7fr 1fr;gap:13px;flex:1;min-height:0}
.calh{display:grid;grid-template-columns:52px repeat(5,1fr);border-bottom:1px solid #F0E9EC}.calh div{padding:8px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:12.5px;border-left:1px solid #F4EEF0}.calh small{display:block;font-weight:500;color:#9CA3AF;font-size:11px}
.calb{position:relative;display:grid;grid-template-columns:52px repeat(5,1fr);align-content:start}
.calb .t{font-size:10.5px;color:#9CA3AF;padding:2px 6px;border-bottom:1px solid #F7F2F4;height:46px}.calb .c{border-left:1px solid #F4EEF0;border-bottom:1px solid #F7F2F4;height:46px}
.ap{position:absolute;border-radius:8px;padding:5px 8px;font-size:11.5px;overflow:hidden;border-left:3px solid;line-height:1.3}.ap b{display:block;font-size:12px}.ap small{color:#57534E}
.now{position:absolute;left:52px;right:0;height:2px;background:#B4386B;z-index:3}.now:before{content:"";position:absolute;left:-5px;top:-4px;width:10px;height:10px;border-radius:50%;background:#B4386B}
.nx{display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center;padding:8px 14px;border-bottom:1px solid #F5EFF2}.nx b{display:block;font-size:13px}.nx small{color:#6B7280;font-size:11.5px}
.st{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 14px}.st div{background:#FBF7F8;border-radius:10px;padding:10px}.st p{margin:0;font-size:11.5px;color:#6B7280}.st b{font-size:20px}
.ring{width:64px;height:64px;border-radius:50%;background:conic-gradient(#B4386B 0 71%,#F1E4EA 71% 100%);display:grid;place-items:center;flex:none}.ring span{width:46px;height:46px;border-radius:50%;background:#fff;display:grid;place-items:center;font-weight:700;font-size:13px}` };
    const nav = [{ i: "home", l: "Today" }, { i: "cal", l: "Calendar", on: 1 }, { i: "inbox", l: "Messages", n: 4 }, { g: "Clients" }, { i: "users", l: "Clients" }, { i: "scissors", l: "Services" }, { i: "tag", l: "Packages" }, { i: "star", l: "Reviews" }, { g: "Business" }, { i: "bag", l: "Retail", n: 2, red: 1 }, { i: "clock", l: "Staff & rota" }, { i: "chart", l: "Reports" }, { g: "Make it yours" }, { i: "spark", l: "Make it yours" }, { i: "gear", l: "Settings" }];
    const sty = [["Chloé", "CM", "#B4386B", "6 appts"], ["Maya", "MA", "#7C3AED", "7 appts"], ["Jordan", "JO", "#0E7490", "5 appts"], ["Lea", "LE", "#C2410C", "4 appts"], ["Sam", "SA", "#15803D", "6 appts"]];
    const pal = ["#B4386B", "#7C3AED", "#0E7490", "#C2410C", "#15803D"];
    const appts = [[0, 0, 2, "Rachel K.", "Balayage + cut"], [0, 2.5, 1, "Tina L.", "Blow-dry"], [0, 4, 2, "Mia T.", "Keratin treatment"], [0, 6.5, 1, "Ava P.", "Cut & finish"], [1, 0, 1, "Omar S.", "Men's cut"], [1, 1, 2, "Grace P.", "Colour correction"], [1, 3.5, 1, "Ben H.", "Beard trim"],
      [1, 5, 1.5, "Lily W.", "Root touch-up"], [2, 0, 1, "Ivy C.", "Gel manicure"], [2, 1.5, 1, "Nora B.", "Pedicure"], [2, 3, 1.5, "Zara M.", "Lash lift"], [2, 5.5, 1, "Emma R.", "Brow tint"], [3, 1, 3, "Bridal trial", "Hair + makeup"], [3, 5, 1.5, "Priya D.", "Highlights"],
      [4, 0, 1, "Lucas M.", "Skin fade"], [4, 1.5, 1, "Zoe R.", "Root touch-up"], [4, 3, 2, "Hana S.", "Full colour"], [4, 6, 1, "Noah F.", "Kids cut"]];
    const H = 46;
    const cal = `<div class="card"><div class="ch">Thursday 1 October <span style="display:flex;gap:8px;align-items:center"><span class="chip c-g">28 booked · 2 gaps</span><span class="seg"><i class="on">Day</i><i>Week</i></span></span></div>
<div class="calh"><div style="border-left:0"></div>${sty.map(([n, i, c, s]) => `<div>${av(i, c, 26)}<span>${n}<small>${s}</small></span></div>`).join("")}</div>
<div class="calb">${Array.from({ length: 8 }, (_, h) => `<div class="t">${9 + h}:00</div>${'<div class="c"></div>'.repeat(5)}`).join("")}
${appts.map(([col, s, len, n, sv]) => `<div class="ap" style="left:calc(52px + (100% - 52px) / 5 * ${col} + 4px);width:calc((100% - 52px) / 5 - 8px);top:${s * H + 2}px;height:${len * H - 4}px;background:${pal[col]}14;border-color:${pal[col]}"><b>${n}</b><small>${sv}</small></div>`).join("")}
<div class="now" style="top:${2.3 * H}px"></div></div></div>`;
    const right = `<div style="display:flex;flex-direction:column;gap:13px;min-height:0"><div class="card"><div class="ch">Next up <span>11:15</span></div>${[["GP", "#7C3AED", "Grace P.", "Colour correction · Maya · 2h", "In chair", "c-v"], ["TL", "#B4386B", "Tina L.", "Blow-dry · Chloé · 11:30", "Checked in", "c-g"], ["ZM", "#0E7490", "Zara M.", "Lash lift · Jordan · 12:00", "Confirmed", "c-b"], ["BH", "#7C3AED", "Ben H.", "Beard trim · Maya · 12:30", "Deposit due", "c-a"], ["WI", "#57534E", "Walk-in", "Blow-dry · first free stylist", "Waiting 10m", "c-s"]].map(([i, c, n, s, st, cc]) => `<div class="nx">${av(i, c)}<div><b>${n}</b><small>${s}</small></div><span class="chip ${cc}">${st}</span></div>`).join("")}</div>
<div class="card"><div class="ch">This week <span>vs last week</span></div><div style="display:flex;gap:14px;align-items:center;padding:12px 14px 0"><div class="ring"><span>71%</span></div><div><b style="font-size:14px">Rebook rate</b><p style="margin:2px 0 0;font-size:12px;color:#6B7280">Clients who booked their next visit before leaving. +6 pts.</p></div></div>
<div class="st"><div><p>Retail sales</p><b>$1,240</b></div><div><p>No-shows</p><b>1</b><p style="color:#0F7A45;font-weight:600">−3 with deposits</p></div></div></div></div>`;
    window.LANDINGS.salon = shell(t, nav, ["Calendar", "Thursday 1 October · 4 stylists in · 28 appointments", "Client, service, stylist…", '<span class="btn">Walk-in</span><span class="btn p">+ New appointment</span>'],
      ["4 things before lunch", [["Lea has a 2-hour gap at 13:00. 6 waitlisted clients want colour this week.", "Offer the slot"], ["Ben H. hasn't paid the $10 deposit for 12:30.", "Send pay link"], ["Olaplex No.3 is down to 2 bottles.", "Reorder"], ["Rachel K. left 5 stars this morning; reply drafted.", "Approve reply"]]],
      [["Revenue today", "$3,240", "+14% vs last Thu"], ["Appointments", "28", "2 gaps left"], ["Rebook rate", "71%", "+6 pts"], ["Avg ticket", "$118", "+$9"], ["New clients", "5", "3 from Instagram"]], `<div class="cols">${cal}${right}</div>`);
  }
})();
