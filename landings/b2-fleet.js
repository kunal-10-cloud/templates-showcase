// Fleet OS (Swift Couriers, Rotterdam): Onfleet-style dispatch screen. Research: research/batch2/fleet.md
(function () {
  window.LANDINGS = window.LANDINGS || {};

  // ---------- map geometry (730 x 848) ----------
  const W = 730, H = 848;
  const RIVER = "M-20 600 C 120 560, 230 540, 330 548 S 560 520, 760 440";
  const streets = [];
  for (let y = 40; y < H; y += 54) streets.push(`<path d="M0 ${y} H${W}" class="st${y % 162 === 40 ? " mj" : ""}"/>`);
  for (let x = 30; x < W; x += 62) streets.push(`<path d="M${x} 0 V${H}" class="st${x % 186 === 30 ? " mj" : ""}"/>`);
  const diag = `<path d="M0 120 L340 360" class="st mj"/><path d="M420 40 L730 250" class="st"/><path d="M60 848 L300 640" class="st"/><path d="M500 848 L700 610" class="st mj"/>`;

  const routes = [
    { id: "J", name: "Jeroen B.", color: "#2F6BFF", pts: [[278, 712], [278, 634], [154, 634], [154, 472], [278, 472], [278, 364], [402, 364], [402, 256], [526, 256], [526, 148]], done: 5 },
    { id: "S", name: "Sanne V.", color: "#FF7A1A", pts: [[278, 712], [340, 712], [340, 580], [464, 580], [464, 418], [588, 418], [588, 310], [650, 310], [650, 202]], done: 3 },
    { id: "A", name: "Ahmed Z.", color: "#8B5CF6", pts: [[278, 712], [92, 712], [92, 526], [30, 526], [30, 310], [154, 310], [154, 202], [216, 202], [216, 94]], done: 4 },
    { id: "M", name: "Mila J.", color: "#10B981", pts: [[278, 712], [464, 712], [464, 796], [650, 796], [650, 634], [712, 634]], done: 5 }
  ];
  const pathD = pts => "M" + pts.map(p => p.join(" ")).join(" L");
  let routeSvg = "", stopSvg = "";
  routes.forEach(r => {
    routeSvg += `<path d="${pathD(r.pts)}" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round" opacity=".9"/>`;
    routeSvg += `<path d="${pathD(r.pts.slice(0, r.done + 1))}" fill="none" stroke="${r.color}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity=".35"/>`;
    routeSvg += `<path d="${pathD(r.pts.slice(r.done))}" fill="none" stroke="${r.color}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
    r.pts.slice(1).forEach((p, i) => {
      const n = i + 1, past = n <= r.done;
      stopSvg += `<g><circle cx="${p[0]}" cy="${p[1]}" r="9.5" fill="${past ? "#fff" : r.color}" stroke="${r.color}" stroke-width="2.5"/><text x="${p[0]}" y="${p[1] + 3.6}" text-anchor="middle" font-size="10" font-weight="700" fill="${past ? r.color : "#fff"}" font-family="Plus Jakarta Sans, sans-serif">${past ? "✓" : n}</text></g>`;
    });
  });
  // moving drivers along their remaining legs
  const driver = (r, from, to, dur, late) => {
    const seg = pathD(r.pts.slice(from, to + 1));
    return `<g><circle r="17" fill="${r.color}" opacity=".18"><animate attributeName="r" values="12;20;12" dur="2.2s" repeatCount="indefinite"/></circle><circle r="11" fill="${r.color}" stroke="#fff" stroke-width="2.5"/><text y="3.8" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" font-family="Plus Jakarta Sans, sans-serif">${r.id}</text>${late ? `<circle cx="8" cy="-8" r="4" fill="#EF4444" stroke="#fff" stroke-width="1.5"/>` : ""}<animateMotion dur="${dur}s" repeatCount="indefinite" path="${seg}" rotate="0"/></g>`;
  };
  const drivers = driver(routes[0], 5, 6, 9) + driver(routes[1], 3, 4, 7) + driver(routes[2], 4, 5, 11, true) +
    `<g transform="translate(712 634)"><circle r="11" fill="#10B981" stroke="#fff" stroke-width="2.5"/><text y="3.8" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" font-family="Plus Jakarta Sans, sans-serif">M</text></g>`;

  const mapSvg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-label="Live dispatch map of Rotterdam">
<rect width="${W}" height="${H}" fill="#EEF1EB"/>
<path d="M440 60 L620 60 L640 170 L470 180 Z" fill="#D8E8CC"/><path d="M20 380 L120 370 L130 450 L30 460 Z" fill="#D8E8CC"/><path d="M560 680 L700 670 L720 760 L580 770 Z" fill="#D8E8CC"/>
<rect x="196" y="250" width="110" height="80" rx="6" fill="#E3E6EE"/>
${streets.join("")}${diag}
<path d="${RIVER}" fill="none" stroke="#B9D3E8" stroke-width="86"/>
<path d="${RIVER}" fill="none" stroke="#C9DDEE" stroke-width="60"/>
<path d="M350 506 L392 600" stroke="#fff" stroke-width="9"/><path d="M350 506 L392 600" stroke="#B8BEC8" stroke-width="1"/>
<path d="M560 470 L580 560" stroke="#fff" stroke-width="9"/>
<text x="120" y="595" font-size="12" font-style="italic" fill="#6C8BA8" font-family="Plus Jakarta Sans, sans-serif" letter-spacing="2">NIEUWE MAAS</text>
<text x="300" y="498" font-size="10" fill="#6B7280" font-family="Plus Jakarta Sans, sans-serif">Erasmusbrug</text>
<g font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#8A93A3" letter-spacing="1.5">
<text x="300" y="226">CENTRUM</text><text x="560" y="250">KRALINGEN</text><text x="40" y="360">DELFSHAVEN</text><text x="420" y="660">KOP VAN ZUID</text><text x="560" y="610">FEIJENOORD</text><text x="90" y="780">CHARLOIS</text></g>
${routeSvg}${stopSvg}
<g transform="translate(278 712)"><rect x="-15" y="-15" width="30" height="30" rx="8" fill="#0F172A"/><path d="M-7 -1 L0 -7 L7 -1 V7 H-7Z" fill="none" stroke="#fff" stroke-width="2"/></g>
<text x="300" y="740" font-size="11" font-weight="700" fill="#0F172A" font-family="Plus Jakarta Sans, sans-serif">Swift Hub · Waalhaven</text>
${drivers}
<g transform="translate(560 140)"><circle r="9" fill="#fff" stroke="#EF4444" stroke-width="2.5"/><path d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5" stroke="#EF4444" stroke-width="2.4" stroke-linecap="round"/></g>
</svg>`;

  // ---------- left list ----------
  const unassigned = [["Mauritsweg 18", "Centrum · 2 parcels · S", "before 16:00", "#F59E0B"], ["Hoogstraat 140A", "Centrum · 1 parcel · M", "before 17:00", "#64748B"], ["Oostzeedijk 233", "Kralingen · cold chain", "15:30–16:00", "#EF4444"]];
  const crew = [
    ["J", "Jeroen B.", "Van · route 4", "#2F6BFF", 18, 31, "On time", "ok", "ETA last stop 17:40"],
    ["S", "Sanne V.", "E-cargo bike · route 7", "#FF7A1A", 14, 22, "On time", "ok", "11 stops/hr"],
    ["A", "Ahmed Z.", "Van · route 2", "#8B5CF6", 21, 35, "6 min late", "late", "2 windows at risk"],
    ["M", "Mila J.", "E-cargo bike · route 9", "#10B981", 26, 26, "Returning", "done", "100% first attempt"]
  ];

  const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Fleet OS dispatch</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Plus Jakarta Sans',system-ui,sans-serif;color:#0F172A;background:#F4F5F7}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:54px;background:#0B1220;color:#E2E8F0;display:flex;align-items:center;gap:22px;padding:0 18px}
.br{display:flex;align-items:center;gap:10px;min-width:206px}.br i{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#38BDF8,#2563EB);display:grid;place-items:center;font-style:normal;font-weight:800;color:#fff}
.br b{display:block;font-size:14px;color:#fff;line-height:1.1}.br small{font:600 9.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#7C8AA5}
.tabs{display:flex;gap:4px}.tabs span{padding:7px 12px;border-radius:8px;color:#94A3B8;font-weight:600}.tabs span.on{background:#1E293B;color:#fff}
.tabs em{font-style:normal;background:#EF4444;color:#fff;border-radius:9px;padding:0 6px;font-size:10.5px;margin-left:5px}
.kp{margin-left:auto;display:flex;gap:16px;align-items:center}.kp div{display:flex;flex-direction:column;line-height:1.15}.kp b{color:#fff;font-size:15px}.kp small{color:#7C8AA5;font-size:10.5px}
.ask{display:flex;align-items:center;gap:6px;border:1px solid #334155;border-radius:9px;padding:7px 11px;color:#E2E8F0;font-weight:600}.ask i{width:8px;height:8px;border-radius:50%;background:#38BDF8;box-shadow:0 0 8px #38BDF8}
.clock{font:600 13px 'JetBrains Mono',monospace;color:#CBD5E1}
.body{display:grid;grid-template-columns:330px 1fr 384px;height:846px}
.left{background:#fff;border-right:1px solid #E5E7EB;display:flex;flex-direction:column;overflow:hidden}
.lh{display:flex;gap:6px;padding:12px 14px;border-bottom:1px solid #EEF0F3}.lh span{font-size:12px;font-weight:600;color:#64748B;padding:5px 9px;border-radius:7px;background:#F4F5F7}.lh span.on{background:#0F172A;color:#fff}
.sec{display:flex;justify-content:space-between;align-items:center;padding:12px 14px 6px;font:700 10.5px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#64748B}
.opt{font:700 11.5px 'Plus Jakarta Sans',sans-serif;letter-spacing:0;background:#2563EB;color:#fff;border-radius:7px;padding:5px 9px}
.ua{margin:0 10px 6px;border:1px dashed #CBD5E1;border-radius:10px;padding:8px 10px;display:grid;grid-template-columns:4px 1fr auto;gap:10px;align-items:center}
.ua .bar{width:4px;height:30px;border-radius:2px}.ua b{display:block;font-size:13px}.ua small{color:#64748B;font-size:11.5px}.ua .w{font:600 11px 'JetBrains Mono',monospace;color:#334155;background:#F1F5F9;border-radius:6px;padding:3px 7px;white-space:nowrap}
.dr{margin:0 10px 7px;border:1px solid #E8EBF0;border-radius:11px;padding:9px 11px;display:grid;grid-template-columns:30px 1fr auto;gap:4px 10px;align-items:center}
.dr.sel{border-color:#2F6BFF;box-shadow:0 0 0 3px rgba(47,107,255,.12)}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:12px;grid-row:span 2}
.dr b{font-size:13px}.dr small{color:#64748B;font-size:11px}
.pg{grid-column:2/4;display:flex;align-items:center;gap:8px}.pg .t{flex:1;height:5px;border-radius:3px;background:#EEF0F4;overflow:hidden}.pg .t i{display:block;height:100%;border-radius:3px}.pg span{font:600 10.5px 'JetBrains Mono',monospace;color:#475569}
.chip{font-size:10.5px;font-weight:700;border-radius:999px;padding:2px 8px;white-space:nowrap}.ok{background:#DCFCE7;color:#15803D}.late{background:#FEE2E2;color:#B91C1C}.done{background:#E0F2FE;color:#0369A1}
.fail{margin:0 10px 10px;border-radius:11px;padding:10px 11px;background:#FEF2F2;border:1px solid #FECACA}
.fail b{font-size:13px}.fail p{margin:3px 0 8px;color:#7F1D1D;font-size:11.5px}.fail .row{display:flex;gap:6px}.fail .row span{font-size:11px;font-weight:700;border-radius:7px;padding:5px 8px;background:#fff;border:1px solid #FCA5A5;color:#991B1B}.fail .row span.p{background:#B91C1C;color:#fff;border-color:#B91C1C}
.cap{margin:0 10px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.cap div{border:1px solid #E8EBF0;border-radius:10px;padding:8px 9px;display:flex;flex-direction:column;gap:2px}.cap b{font-size:14px}.cap small{color:#64748B;font-size:10.5px}.cb{height:4px;border-radius:2px;background:#EEF0F4;overflow:hidden;margin-top:4px}.cb i{display:block;height:100%;background:#2563EB;border-radius:2px}
.map{position:relative;overflow:hidden}
.st{stroke:#fff;stroke-width:7;fill:none}.st.mj{stroke:#FBF3D9;stroke-width:12}
.mtop{position:absolute;left:14px;top:14px;right:14px;display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.leg{background:rgba(255,255,255,.94);border:1px solid #E5E7EB;border-radius:12px;padding:8px 10px;display:flex;gap:12px;box-shadow:0 6px 18px rgba(15,23,42,.08)}
.leg span{display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600}.leg i{width:14px;height:4px;border-radius:2px}
.mbtn{display:flex;gap:6px}.mbtn span{background:#fff;border:1px solid #E5E7EB;border-radius:9px;padding:7px 10px;font-size:12px;font-weight:700;box-shadow:0 6px 18px rgba(15,23,42,.08)}
.callout{position:absolute;left:52px;top:392px;background:#0F172A;color:#E2E8F0;border-radius:12px;padding:10px 12px;width:232px;box-shadow:0 12px 30px rgba(15,23,42,.3)}
.callout b{color:#fff}.callout .row{display:flex;gap:6px;margin-top:8px}.callout .row span{font-size:11px;font-weight:700;border-radius:7px;padding:5px 8px;background:#1E293B}.callout .row span.p{background:#8B5CF6;color:#fff}
.callout:after{content:"";position:absolute;left:66px;top:-7px;border:7px solid transparent;border-bottom-color:#0F172A;border-top:0}
.phone{position:absolute;right:16px;bottom:16px;width:196px;height:390px;background:#0B1220;border-radius:30px;padding:8px;box-shadow:0 24px 50px rgba(15,23,42,.35)}
.scr{width:100%;height:100%;border-radius:23px;background:#fff;overflow:hidden;display:flex;flex-direction:column}
.ps{height:24px;display:flex;justify-content:space-between;align-items:center;padding:0 14px;font-size:9.5px;font-weight:700}
.pm{height:118px;background:#EEF1EB;position:relative;overflow:hidden}
.pb{padding:9px 11px;display:flex;flex-direction:column;gap:6px;flex:1}
.pb .k{font:700 9px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#FF7A1A}.pb b{font-size:13px;line-height:1.2}.pb small{color:#64748B;font-size:10.5px}
.pbtn{border-radius:10px;padding:8px;text-align:center;font-weight:800;font-size:11.5px}
.right{background:#fff;border-left:1px solid #E5E7EB;display:flex;flex-direction:column;overflow:hidden}
.rh{padding:14px 16px 10px;border-bottom:1px solid #EEF0F3}.rh .id{font:600 11px 'JetBrains Mono',monospace;color:#64748B}.rh h2{margin:4px 0 2px;font-size:18px;letter-spacing:-.01em}.rh p{margin:0;color:#475569;font-size:12px}
.pod{padding:12px 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pod .ph{position:relative;border-radius:12px;overflow:hidden;height:150px;grid-column:1/3}.pod .ph img{width:100%;height:100%;object-fit:cover;display:block}
.pod .ph span{position:absolute;left:10px;bottom:10px;background:rgba(11,18,32,.82);color:#fff;font-size:10.5px;font-weight:600;border-radius:7px;padding:4px 8px}
.box{border:1px solid #E8EBF0;border-radius:11px;padding:9px 10px}.box .l{font:700 9.5px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#64748B}.box b{display:block;font-size:12.5px;margin-top:3px}
.tl{padding:4px 16px 0;display:flex;flex-direction:column}
.ti{display:grid;grid-template-columns:44px 14px 1fr;gap:8px;align-items:start;padding:5px 0;position:relative}
.ti .tm{font:600 11px 'JetBrains Mono',monospace;color:#475569;padding-top:1px}.ti .d{width:10px;height:10px;border-radius:50%;margin-top:3px;border:2px solid #CBD5E1;background:#fff}.ti .d.g{border-color:#10B981;background:#10B981}
.ti b{font-size:12px}.ti small{display:block;color:#64748B;font-size:11px}
.sms{margin:8px 16px 0;background:#F1F5F9;border-radius:12px;padding:9px 11px;font-size:11.5px;color:#334155}.sms b{color:#0F172A}
.rf{margin-top:auto;padding:10px 16px;border-top:1px solid #EEF0F3;display:flex;justify-content:space-between;align-items:center}
.btn{border-radius:9px;padding:8px 12px;font-weight:700;font-size:12px;border:1px solid #D9DEE7}.btn.p{background:#0F172A;color:#fff;border-color:#0F172A}
</style></head><body>
<div class="top">
<div class="br"><i>S</i><div><b>Swift Couriers</b><small>FLEET OS · ROTTERDAM</small></div></div>
<div class="tabs"><span class="on">Dispatch</span><span>Tasks</span><span>Drivers</span><span>Routes</span><span>Recipients<em>2</em></span><span>Analytics</span></div>
<div class="kp"><div><b>412</b><small>tasks today</small></div><div><b style="color:#4ADE80">97.4%</b><small>on time</small></div><div><b>11.8</b><small>stops / hour</small></div><div><b>94%</b><small>first attempt</small></div></div>
<span class="clock">Mon 5 Oct · 14:32</span><span class="ask"><i></i>Ask Fleet OS</span>
</div>
<div class="body">
<div class="left">
<div class="lh"><span class="on">All 412</span><span>Active 74</span><span>Done 318</span><span>Failed 5</span></div>
<div class="sec">UNASSIGNED · 3<span class="opt">Optimise &amp; assign</span></div>
${unassigned.map(([a, s, w, c]) => `<div class="ua"><span class="bar" style="background:${c}"></span><div><b>${a}</b><small>${s}</small></div><span class="w">${w}</span></div>`).join("")}
<div class="sec">DRIVERS ON DUTY · 4 of 18 shown</div>
${crew.map(([i, n, v, c, d, t, st, k, x], j) => `<div class="dr${j === 0 ? " sel" : ""}"><span class="av" style="background:${c}">${i}</span><div><b>${n}</b> <small>· ${v}</small></div><span class="chip ${k}">${st}</span><div class="pg"><div class="t"><i style="width:${Math.round(d / t * 100)}%;background:${c}"></i></div><span>${d}/${t}</span><small style="color:#64748B">${x}</small></div></div>`).join("")}
<div class="sec">FAILED · NEEDS ACTION</div>
<div class="fail"><b>Witte de Withstraat 41-B</b><p>Sanne · 13:52 · Recipient not home · neighbour at 41-A declined · photo of door attached</p><div class="row"><span class="p">Reattempt 17–19h</span><span>Pakketpunt</span><span>Call</span></div></div>
<div class="sec">CAPACITY · TODAY</div>
<div class="cap"><div><b>9 / 11</b><small>vans out</small><span class="cb"><i style="width:82%"></i></span></div><div><b>7 / 7</b><small>e-cargo bikes</small><span class="cb"><i style="width:100%;background:#F59E0B"></i></span></div><div><b>268</b><small>parcels on board</small><span class="cb"><i style="width:64%"></i></span></div></div>
</div>
<div class="map">${mapSvg}
<div class="mtop"><div class="leg">${routes.map(r => `<span><i style="background:${r.color}"></i>${r.name}</span>`).join("")}</div><div class="mbtn"><span>Traffic</span><span>Time windows</span></div></div>
<div class="callout"><b>Ahmed is 6 min behind</b><br><span style="font-size:11.5px;color:#94A3B8">Stops 23 and 24 will miss their 15:00 windows. Sanne passes both in 12 min.</span><div class="row"><span class="p">Move 2 stops to Sanne</span><span>Notify recipients</span></div></div>
<div class="phone"><div class="scr"><div class="ps"><span>14:32</span><span>Sanne · bike</span></div>
<div class="pm"><svg viewBox="0 0 180 118" width="100%" height="100%"><rect width="180" height="118" fill="#EEF1EB"/><path d="M0 30H180M0 70H180M0 104H180M40 0V118M100 0V118M150 0V118" stroke="#fff" stroke-width="6"/><path d="M40 104 V70 H100 V30 H150" fill="none" stroke="#FF7A1A" stroke-width="4" stroke-linejoin="round"/><circle cx="40" cy="104" r="7" fill="#FF7A1A" stroke="#fff" stroke-width="2"/><circle cx="150" cy="30" r="8" fill="#0F172A"/><text x="150" y="33.5" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="Plus Jakarta Sans">15</text></svg></div>
<div class="pb"><span class="k">STOP 15 OF 22 · 600 M</span><b>Nieuwe Binnenweg 212B</b><small>Before 15:00 · 2 parcels · "Ring top bell"</small>
<div style="display:flex;gap:6px"><span class="pbtn" style="flex:1;background:#F1F5F9">Navigate</span><span class="pbtn" style="flex:1;background:#F1F5F9">Call</span></div>
<span class="pbtn" style="background:#FF7A1A;color:#fff">Scan parcel · 0 of 2</span><span class="pbtn" style="background:#0F172A;color:#fff">Photo &amp; sign to complete</span></div></div></div>
</div>
<div class="right">
<div class="rh"><div style="display:flex;justify-content:space-between;align-items:center"><span class="id">TASK RTM-48213 · Jeroen B.</span><span class="chip ok">Completed 14:21</span></div><h2>Lotte de Graaf</h2><p>Nieuwe Binnenweg 98C, 3014 GJ Rotterdam · window 14:00–15:00</p></div>
<div class="pod"><div class="ph"><img src="img/fleet/parcel-door.jpg" alt=""><span>Proof of delivery · 14:21 · 51.9139, 4.4632</span></div>
<div class="box"><div class="l">SIGNATURE</div><svg viewBox="0 0 150 44" width="100%" height="40"><path d="M6 32 C 18 6, 26 40, 38 22 S 52 10, 60 28 C 66 38, 74 14, 86 20 S 104 34, 112 18 C 118 8, 128 30, 144 22" fill="none" stroke="#0F172A" stroke-width="2" stroke-linecap="round"/></svg><b style="font-size:11px;color:#64748B;font-weight:500;margin:0">L. de Graaf</b></div>
<div class="box"><div class="l">SCANNED</div><b class="mono">2 / 2 parcels</b><b style="font-size:11px;color:#64748B;font-weight:500">SWC-778120 · 778121</b></div></div>
<div class="tl">
<div class="ti"><span class="tm">08:02</span><span class="d g"></span><div><b>Order received</b><small>Webshop API · Kindred Goods</small></div></div>
<div class="ti"><span class="tm">09:10</span><span class="d g"></span><div><b>Optimised onto route 4</b><small>Auto-dispatch · stop 12 of 31</small></div></div>
<div class="ti"><span class="tm">14:05</span><span class="d g"></span><div><b>ETA text sent with live tracking</b><small>Opened 14:06</small></div></div>
<div class="ti"><span class="tm">14:19</span><span class="d g"></span><div><b>Arrived</b><small>Geofence · 18 m from door</small></div></div>
<div class="ti"><span class="tm">14:21</span><span class="d g"></span><div><b>Delivered to recipient</b><small>Photo, signature, 2 scans · rated 5 / 5</small></div></div></div>
<div class="sms"><b>Text to Lotte, 14:05:</b> "Your Swift Couriers parcel arrives 14:15–14:30. Track Jeroen live: swft.nl/t/48213"</div>
<div class="rf"><span style="font-size:12px;color:#64748B">On time · 9 min early</span><div style="display:flex;gap:6px"><span class="btn">Share POD</span><span class="btn p">Open route 4</span></div></div>
</div>
</div></body></html>`;

  window.LANDINGS.fleet = doc;
})();
