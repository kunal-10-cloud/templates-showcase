// Trade Desk · Meridian Exports — shipment tracker, voyage map, document vault, LC + FX + deal margin.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    ship: '<path d="M3 17l2 3h14l2-3"/><path d="M5 17V10h14v7"/><path d="M9 10V6h6v4"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    bank: '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>', up: '<path d="M6 15l6-6 6 6"/>', lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };

  // ---------- world map (equirectangular, lon -80..100, lat 62..-12) ----------
  const W = 880, H = 300, P = (lon, lat) => [((lon + 80) / 180 * W).toFixed(1), ((62 - lat) / 74 * H).toFixed(1)];
  const poly = pts => pts.map(([a, b]) => P(a, b).join(",")).join(" ");
  const land = [
    [[-80,62],[-58,62],[-60,52],[-66,45],[-70,42],[-74,40.5],[-76,37],[-80,32]], // N America
    [[-10,36],[-9,43],[-2,48],[2,51],[5,53],[9,54],[11,57],[18,59],[24,60],[30,62],[42,62],[42,46],[30,46],[28,41],[22,40],[18,40],[16,38],[12,42],[8,44],[3,43],[-1,37],[-6,36]], // Europe
    [[-17,21],[-17,14],[-12,7],[-5,5],[8,4],[10,1],[13,-6],[12,-12],[40,-12],[40,-3],[44,2],[51,11],[44,12],[38,18],[35,24],[32,31],[25,32],[20,31],[11,33],[10,37],[1,36],[-6,36],[-10,30],[-13,27]], // Africa
    [[35,32],[36,36],[42,37],[48,30],[52,27],[56,26],[59,22],[56,18],[52,16],[45,13],[43,13],[40,17],[38,21],[35,27]], // Arabia
    [[42,62],[100,62],[100,22],[94,20],[92,22],[89,22],[87,21],[84,18],[80,15],[80,11],[78,8],[76,9],[74,14],[73,18],[72,21],[68,23],[66,25],[61,25],[57,27],[50,30],[48,30],[44,37],[36,37],[30,40],[28,41],[30,46],[42,46]] // Asia + India
  ];
  const landSvg = land.map(p => `<polygon points="${poly(p)}" fill="url(#dots)"/>`).join("");
  const route = pts => "M" + pts.map(([a, b]) => P(a, b).join(" ")).join(" L");
  const eu = route([[80.3,13.1],[81.5,9],[79.9,6.6],[70,9],[55,12.5],[44,12.4],[42,15],[38.5,20],[34.5,27.5],[32.5,30.6],[32.3,31.4],[25,33.5],[15,36],[5,37.5],[-5.6,35.9],[-9.5,38],[-10,44],[-6,48.5],[1,50.6],[4,51.9]]);
  const us = route([[79.9,6.6],[70,9],[55,12.5],[44,12.4],[42,15],[38.5,20],[34.5,27.5],[32.5,30.6],[32.3,31.4],[25,33.5],[15,36],[5,37.5],[-5.6,35.9],[-20,37],[-45,38.5],[-65,39.5],[-74,40.6]]);
  const pin = (lon, lat, label, sub, dx, dy, strong) => {
    const [x, y] = P(lon, lat);
    return `<g transform="translate(${x},${y})"><circle r="${strong ? 5.5 : 4}" fill="${strong ? "#FFB547" : "#fff"}" stroke="#0E1B3D" stroke-width="2"/><text x="${dx}" y="${dy}" class="ml">${label}</text>${sub ? `<text x="${dx}" y="${dy + 12}" class="ms">${sub}</text>` : ""}</g>`;
  };
  const [sx, sy] = P(36.6, 24.5); // vessel position, northern Red Sea, day 14 of 33
  const mapSvg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <defs><pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.7" fill="#6079BF"/></pattern>
    <linearGradient id="rt" x1="0" x2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF7A59"/></linearGradient></defs>
    ${landSvg}
    <path d="${us}" fill="none" stroke="#7E92C8" stroke-width="1.6" stroke-dasharray="4 5" opacity=".7"/>
    <path d="${eu}" fill="none" stroke="url(#rt)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="${eu}" fill="none" stroke="#FFB547" stroke-width="7" opacity=".12"/>
    ${pin(80.3, 13.1, "Chennai", "loaded 21 Sep", 10, -6, true)}${pin(79.9, 6.9, "Colombo", "transship 24 Sep", 10, 10, false)}
    ${pin(32.5, 30.6, "Suez", "", -40, -8, false)}${pin(4.5, 51.9, "Rotterdam", "ETA 24 Oct", 10, 4, true)}${pin(-74, 40.7, "New York", "MX-2422 · Nov", 10, 4, false)}
    <g transform="translate(${sx},${sy})"><circle r="15" fill="#FFB547" opacity=".18" class="pulse"/><circle r="8" fill="#FFB547" stroke="#0E1B3D" stroke-width="2"/><path d="M-4 1h8l-2 3h-4z" fill="#0E1B3D"/></g>
  </svg>`;

  // ---------- shipment tracker ----------
  const stages = ["PI", "PO", "Production", "Booked", "BL", "Sailed", "Arrived", "Paid"];
  const orders = [
    ["MX-2418", "Hollin &amp; Co", "Rotterdam", "18,400 crew-neck tees", "$61,640", 6, "ETA 24 Oct", [1,1,1,1,1], 1],
    ["MX-2422", "Bluebird Apparel", "New York", "9,600 fleece hoodies", "$86,400", 4, "Cut-off 9 Oct", [1,1,0,0,0], 0],
    ["MX-2409", "Nordvik AB", "Gothenburg", "24,000 baby rompers", "$52,800", 7, "Arrived 2 Oct", [1,1,1,1,1], 0],
    ["MX-2426", "Casa Lino", "Milan", "6,000 piqué polos", "$33,000", 3, "64% sewn", [0,0,0,0,0], 0],
    ["MX-2431", "Hollin &amp; Co", "Rotterdam", "12,000 crew-neck tees", "$40,200", 1, "PI sent 3 Oct", [0,0,0,0,0], 0],
    ["MX-2401", "Bluebird Apparel", "New York", "15,000 joggers", "$93,750", 8, "Realised 28 Sep", [1,1,1,1,1], 0]
  ];
  const docsL = ["CI", "PL", "SB", "BL", "COO"];
  const stepper = n => `<div class="stp">${stages.map((s, i) => {
    const st = i + 1 < n ? "d" : i + 1 === n ? "c" : "u";
    return `<span class="sg ${st}" title="${s}"><i></i>${i < 7 ? "<b></b>" : ""}</span>`;
  }).join("")}</div><small class="stl">${stages[n - 1]}</small>`;
  const rows = orders.map(([id, buyer, port, items, val, n, eta, docs, sel]) => `<tr class="${sel ? "sel" : ""}">
    <td><b class="m">${id}</b><small>${buyer} · ${port}</small></td><td><span>${items}</span><small class="m">${val} · FOB</small></td>
    <td style="width:300px">${stepper(n)}</td>
    <td><div class="docs">${docs.map((d, i) => `<span class="${d ? "ok" : ""}">${docsL[i]}</span>`).join("")}</div></td><td class="r"><small style="color:#0E1B3D;font-weight:600">${eta}</small></td></tr>`).join("");

  const vault = [["Commercial invoice", "CI/MX/2418 · $61,640.00 · FOB Chennai"], ["Packing list", "412 cartons · 7,840 kg gross · 38.6 CBM"], ["Shipping bill", "SB 8841207 · 19 Sep · RoSCTL + RoDTEP claimed"],
    ["Bill of lading", "MEDU IN4417926 · 3/3 originals to HDFC"], ["Certificate of origin", "Non-preferential · issued by FIEO"], ["Test report", "OEKO-TEX Std 100 · azo-free"]];
  const vaultHtml = vault.map(([t, s]) => `<div class="vd"><span class="vi">${ic(I.doc, 14)}</span><div><b>${t}</b><small>${s}</small></div><span class="tick">${ic(I.check, 13)}</span></div>`).join("");

  window.LANDINGS.trade = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Manrope',system-ui,sans-serif;color:#0E1B3D;background:#F4F1EA}
.m{font-family:'IBM Plex Mono',monospace}.r{text-align:right}small{display:block;color:#6B7287;font-size:11.5px}
.top{height:58px;background:#0E1B3D;color:#C9D3EE;display:flex;align-items:center;gap:20px;padding:0 22px}
.brand{display:flex;gap:11px;align-items:center}.brand i{width:34px;height:34px;border-radius:50%;background:conic-gradient(#FFB547 0 25%,#FF7A59 0 50%,#3E5590 0 75%,#7E92C8 0);display:block;box-shadow:inset 0 0 0 5px #0E1B3D}
.brand b{display:block;color:#fff;font:700 15px 'Sora',sans-serif}.brand span{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.14em;color:#7E92C8}
.tabs{display:flex;gap:4px}.tabs a{padding:8px 12px;border-radius:8px;font-weight:600;color:#9DAAD0;display:flex;gap:6px;align-items:center}.tabs a.on{background:#1C2C5A;color:#fff}
.tabs em{font-style:normal;background:#FF7A59;color:#1A0A04;font-size:10.5px;border-radius:9px;padding:0 6px;line-height:16px;font-weight:800}
.sp{flex:1}.fx{display:flex;gap:10px;align-items:center;background:#1C2C5A;border-radius:9px;padding:7px 12px;font:600 12.5px 'IBM Plex Mono',monospace;color:#fff}.fx span{color:#5FD3A0;display:flex;align-items:center}
.ask{display:flex;align-items:center;gap:7px;background:#FFB547;color:#2A1600;font-weight:800;border-radius:9px;padding:8px 13px}
.av{width:32px;height:32px;border-radius:50%;background:#FF7A59;color:#1A0A04;display:grid;place-items:center;font-weight:800;font-size:12px}
.wrap{display:grid;grid-template-columns:900px 1fr;gap:14px;padding:14px 16px;height:842px}
.lc{display:grid;grid-template-rows:auto 1fr;gap:14px;min-height:0}
.card{background:#fff;border-radius:16px;box-shadow:0 1px 0 #E3DDD0,0 8px 24px rgba(14,27,61,.06);overflow:hidden;display:flex;flex-direction:column;min-height:0}.card>*{flex:none}
.ch{display:flex;justify-content:space-between;align-items:flex-end;padding:14px 18px 10px}.ch h2{margin:0;font:700 18px 'Sora',sans-serif;letter-spacing:-.01em}
.seg{display:flex;gap:4px;background:#F1EEE6;border-radius:9px;padding:3px}.seg span{padding:5px 10px;border-radius:7px;font-weight:700;font-size:12px;color:#6B7287}.seg .on{background:#fff;color:#0E1B3D;box-shadow:0 1px 2px rgba(0,0,0,.08)}
table{width:100%;border-collapse:collapse}th{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.07em;text-transform:uppercase;color:#8A8FA3;text-align:left;padding:8px 14px;background:#FAF8F3;border-bottom:1px solid #EEE9DE}
td{padding:7px 14px;border-bottom:1px solid #F3EFE6;vertical-align:middle;white-space:nowrap}td span{font-weight:600}tr.sel td{background:#FFF8EC}tr.sel td:first-child{box-shadow:inset 3px 0 0 #FF7A59}
.stp{display:flex;align-items:center}.sg{display:flex;align-items:center;flex:1}.sg:last-child{flex:none}
.sg i{width:14px;height:14px;border-radius:50%;border:2px solid #CFC8B8;background:#fff;flex:none}.sg b{flex:1;height:2px;background:#E4DED0;margin:0 2px}
.sg.d i{background:#0E1B3D;border-color:#0E1B3D}.sg.d b{background:#0E1B3D}.sg.c i{background:#FFB547;border-color:#FF7A59;box-shadow:0 0 0 5px rgba(255,181,71,.25)}
.stl{margin-top:4px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.05em;color:#6B7287;text-transform:uppercase}
.docs{display:flex;gap:3px}.docs span{font:600 10px 'IBM Plex Mono',monospace;padding:2px 5px;border-radius:5px;background:#F1EEE6;color:#A49D8C}.docs .ok{background:#E3F4EC;color:#16754D}
.map{position:relative;flex:1;background:radial-gradient(120% 90% at 70% 40%,#18295A,#0B1532);color:#fff}
.map .hd{position:absolute;left:18px;bottom:14px;z-index:2}.map .hd b{display:block;font:700 16px 'Sora',sans-serif}.map .hd small{color:#9DAAD0}
.map .vy{position:absolute;right:16px;top:14px;z-index:2;background:rgba(11,21,50,.75);border:1px solid #2B3D72;border-radius:12px;padding:10px 12px;width:240px;backdrop-filter:blur(6px)}
.vy .bar{height:6px;border-radius:4px;background:#24346A;margin:8px 0 6px;overflow:hidden}.vy .bar i{display:block;height:100%;width:42%;background:linear-gradient(90deg,#FFB547,#FF7A59)}
.vy small{color:#9DAAD0}.vy b{font:600 12.5px 'IBM Plex Mono',monospace}
.ml{font:700 11px 'Manrope',sans-serif;fill:#fff}.ms{font:500 9.5px 'IBM Plex Mono',monospace;fill:#9DAAD0}
.pulse{animation:pu 2s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes pu{0%{transform:scale(.6);opacity:.5}100%{transform:scale(1.8);opacity:0}}
.oc{position:relative}.photo{height:150px;background:url(img/trade/ship.jpg) center 60%/cover;position:relative}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,27,61,.05),rgba(14,27,61,.85))}
.ph{position:absolute;left:16px;right:16px;bottom:12px;z-index:2;color:#fff;display:flex;justify-content:space-between;align-items:flex-end}
.ph b{display:block;font:700 20px 'Sora',sans-serif}.ph small{color:#D6DDF2}.pill{background:#FFB547;color:#2A1600;font-weight:800;font-size:11px;border-radius:999px;padding:3px 9px}
.sec{padding:10px 16px 0}.lbl{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#8A8FA3;text-transform:uppercase;display:flex;justify-content:space-between;margin-bottom:6px}
.vault{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.vd{display:flex;gap:8px;align-items:center;border:1px solid #EEE9DE;border-radius:10px;padding:7px 9px;background:#FCFBF8}.vd b{display:block;font-size:12px}.vd small{font-size:10.5px;line-height:1.3}
.vi{width:26px;height:26px;border-radius:7px;background:#EDF0FA;color:#3E5590;display:grid;place-items:center;flex:none}.tick{margin-left:auto;color:#16754D}
.lc2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.box{border-radius:12px;padding:10px 12px;background:#F7F4EC}.box.dk{background:#0E1B3D;color:#fff}.box.dk small{color:#9DAAD0}
.kv{display:flex;justify-content:space-between;font-size:12px;padding:2px 0}.kv b{font-family:'IBM Plex Mono',monospace;font-weight:600}
.mg{border-top:1px dashed #E3DDD0;margin-top:4px;padding-top:5px}
.big{font:700 22px 'Sora',sans-serif;letter-spacing:-.01em}
.btn{border-radius:10px;padding:9px 13px;font-weight:700;font-size:12.5px;border:1px solid #DCD5C6;background:#fff;white-space:nowrap}.btn.o{background:#FF7A59;border-color:#FF7A59;color:#1A0A04}
</style></head><body>
<div class="top"><div class="brand"><i></i><div><b>Meridian Exports</b><span>TRADE DESK · TIRUPPUR</span></div></div>
<nav class="tabs"><a class="on">Shipments <em>6</em></a><a>Orders</a><a>Buyers</a><a>Documents <em>4</em></a><a>Payments</a><a>Incentives</a></nav>
<div class="sp"></div><div class="fx">USD/INR 88.42<span>${ic(I.up, 13)}0.12</span></div><div class="ask">${ic(I.spark, 15)}Ask Trade Desk</div><div class="av">RS</div></div>
<div class="wrap">
<div class="lc">
  <div class="card">
    <div class="ch"><div><h2>Shipment tracker</h2><small>6 live orders · $274,040 open · 2 at sea · Mon 5 Oct 2026</small></div><div class="seg"><span class="on">All</span><span>At sea</span><span>Docs pending</span><span>Awaiting payment</span></div></div>
    <table><tr><th>Order</th><th>Goods · value</th><th>Milestones · PI to paid</th><th>Documents</th><th class="r">Next</th></tr>${rows}</table>
  </div>
  <div class="card map"><div class="hd"><b>MSC ANYA · voyage 642W</b><small>Chennai → Colombo → Suez → Rotterdam · container MEDU 7781405 (40' HC)</small></div>
    <div class="vy"><div style="display:flex;justify-content:space-between"><small>Day 14 of 33</small><small>Northern Red Sea</small></div><div class="bar"><i></i></div><div style="display:flex;justify-content:space-between"><b>Sailed 21 Sep</b><b style="color:#FFB547">ETA 24 Oct</b></div></div>
    ${mapSvg}</div>
</div>
<div class="card oc">
  <div class="photo"><div class="ph"><div><small>MX-2418 · Hollin &amp; Co, Rotterdam</small><b>18,400 crew-neck tees</b><small>180 gsm combed cotton · 4 colours · S–XXL</small></div><span class="pill">At sea</span></div></div>
  <div class="sec"><div class="lbl"><span>Document vault</span><span style="color:#16754D">6 of 6 · presented to bank 29 Sep</span></div><div class="vault">${vaultHtml}</div></div>
  <div class="sec"><div class="lbl"><span>LC &amp; payment</span><span>Usance 90 days from BL</span></div>
    <div class="lc2"><div class="box"><div class="kv"><span>LC no.</span><b>ABN/LC/26/0917</b></div><div class="kv"><span>Issuing</span><b>ABN AMRO</b></div><div class="kv"><span>Advising</span><b>HDFC Bank</b></div><div class="kv"><span>BL date</span><b>21 Sep</b></div><div class="kv"><span>Due</span><b style="color:#C2410C">20 Dec</b></div></div>
    <div class="box dk"><small>Forward contract · HDFC</small><div class="big m" style="font-family:'IBM Plex Mono'">88.05</div><small>$61,640 booked = ₹54,27,402</small><div class="kv" style="margin-top:4px"><span>Spot today</span><b>88.42</b></div><small>Hedged · ₹22,807 below today's spot</small></div></div></div>
  <div class="sec"><div class="lbl"><span>Deal margin · INR books</span><span>Tally synced</span></div>
    <div class="box" style="background:#fff;border:1px solid #EEE9DE">
      <div class="kv"><span>Export value (at forward)</span><b>₹54,27,402</b></div>
      <div class="kv"><span>Yarn &amp; knit fabric</span><b>−₹27,60,000</b></div>
      <div class="kv"><span>Cut, make &amp; trim (CMT)</span><b>−₹9,20,000</b></div>
      <div class="kv"><span>Trims, cartons, labels</span><b>−₹2,94,400</b></div>
      <div class="kv"><span>CHA, haulage to Chennai</span><b>−₹68,000</b></div>
      <div class="kv"><span>RoSCTL + RoDTEP credit</span><b style="color:#16754D">+₹1,45,600</b></div>
      <div class="kv mg"><span style="font-weight:800">Margin</span><b style="font-size:14px">₹15,30,602 · 28.2%</b></div>
    </div></div>
  <div style="display:flex;gap:8px;padding:12px 16px;margin-top:auto"><span class="btn">Share tracking with buyer</span><span class="btn o" style="margin-left:auto">Discount LC bill</span></div>
</div>
</div></body></html>`;
})();
