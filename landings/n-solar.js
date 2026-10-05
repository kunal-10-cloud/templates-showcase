// Solar CRM · SunPeak Solar (Jaipur): pipeline + opened rooftop project.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const stages = [
    ["Lead", "34", "21 with bill", "1.2 d", ""],
    ["Site survey", "12", "8 this week", "2.1 d", ""],
    ["Proposal", "9", "₹24.6L", "4.3 d", ""],
    ["Financing", "6", "₹17.2L", "5.8 d", ""],
    ["Install", "5", "₹15.9L", "3.1 d", "on"],
    ["Commission", "4", "₹11.8L", "1.6 d", ""],
    ["Net-meter & subsidy", "11", "₹78k × 9 due", "23 d", "warn"]
  ];
  const gen = [640, 690, 800, 840, 850, 760, 610, 590, 680, 720, 650, 628];
  const use = [520, 540, 640, 780, 900, 920, 860, 812, 760, 680, 560, 520];
  const mo = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const bars = gen.map((g, i) => `<div class="mb"><i class="g" style="height:${(g / 950 * 100).toFixed(1)}%"></i><i class="u" style="height:${(use[i] / 950 * 100).toFixed(1)}%"></i><span>${mo[i]}</span></div>`).join("");

  // panel array: 2 rows × 5, portrait
  let panels = "";
  for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
    const x = 132 + c * 52, y = 150 + r * 92;
    panels += `<g><rect x="${x}" y="${y}" width="48" height="86" rx="2" fill="#1E3A6E" stroke="#9FB7E6" stroke-width="1.2"/>` +
      `<path d="M${x + 16} ${y} V${y + 86} M${x + 32} ${y} V${y + 86} M${x} ${y + 21.5} H${x + 48} M${x} ${y + 43} H${x + 48} M${x} ${y + 64.5} H${x + 48}" stroke="#4E6FAE" stroke-width=".8"/></g>`;
  }

  const bom = [
    ["10", "Waaree 545 Wp bifacial · DCR", "In stock", "ok"],
    ["1", "Polycab 5 kW on-grid inverter", "In stock", "ok"],
    ["1", "GI elevated structure · 3 m · 26°", "Fabricating", "warn"],
    ["1", "DCDB + ACDB with SPD", "In stock", "ok"],
    ["3", "Earthing kits + lightning arrester", "In stock", "ok"],
    ["60 m", "4 sq mm DC cable · MC4 × 6", "Reserved", "ok"]
  ];
  const sub = [
    ["Registered on PM Surya Ghar portal", "App NP-RJJV26-118432 · 12 Sep", "done"],
    ["JVVNL feasibility approved", "20 Sep · sanctioned load 7 kW", "done"],
    ["DCR module serials uploaded", "After install · 10 panels", "next"],
    ["Net-meter application", "Auto-filed on install day", "next"],
    ["JVVNL inspection + net meter fitted", "Avg 23 days in Jaipur", "wait"],
    ["Commissioning certificate → ₹78,000 subsidy", "Credited to customer's bank ≈30 days", "wait"]
  ];
  const sTag = s => ({ ok: "background:#E3F4E6;color:#1C7A3A", warn: "background:#FFF1CC;color:#8A5B00" })[s];
  const subIc = s => s === "done" ? `<i class="ck d">✓</i>` : s === "next" ? `<i class="ck n"></i>` : `<i class="ck w"></i>`;

  window.LANDINGS.solar = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Outfit',system-ui,sans-serif;color:#10223D;background:#FBF7EF}
.mono{font-family:'DM Mono',monospace}
.top{height:54px;background:#fff;border-bottom:1px solid #EDE5D6;display:flex;align-items:center;gap:22px;padding:0 20px}
.br{display:flex;align-items:center;gap:10px}.sun{width:32px;height:32px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#FFD24A 0 40%,#FFB21A 41% 100%);box-shadow:0 0 0 4px #FFF1C2}
.br b{display:block;font-size:15px;font-weight:700}.br span{font:500 10px 'DM Mono',monospace;letter-spacing:.14em;color:#8C7B5E}
.tabs{display:flex;gap:4px}.tabs span{padding:7px 12px;border-radius:9px;color:#5B6478;font-weight:500}.tabs span.on{background:#10223D;color:#fff}
.tabs em{font-style:normal;background:#E2725B;color:#fff;font-size:10px;font-weight:700;border-radius:8px;padding:0 6px;margin-left:5px}
.sp{flex:1}.ask{background:#FFD24A;border-radius:10px;padding:8px 14px;font-weight:700}.av{width:30px;height:30px;border-radius:50%;background:#10223D;color:#FFD24A;display:grid;place-items:center;font-weight:700;font-size:11px}
.pipe{display:grid;grid-template-columns:repeat(7,1fr);gap:0;margin:12px 16px 0;background:#fff;border:1px solid #EDE5D6;border-radius:14px;overflow:hidden}
.st{padding:10px 14px 10px 22px;position:relative;border-right:1px solid #F1EADC}
.st:last-child{border-right:0}.st:after{content:"";position:absolute;right:-7px;top:50%;width:12px;height:12px;background:#fff;border-top:1px solid #EDE5D6;border-right:1px solid #EDE5D6;transform:translateY(-50%) rotate(45deg);z-index:1}
.st:last-child:after{display:none}.st small{display:block;color:#8C7B5E;font-size:11px;font-weight:600;letter-spacing:.02em}
.st b{font-size:24px;font-weight:800;letter-spacing:-.02em}.st .v{font:500 11px 'DM Mono',monospace;color:#5B6478;margin-left:6px}
.st .d{display:inline-block;margin-top:3px;font:500 10.5px 'DM Mono',monospace;padding:1px 7px;border-radius:6px;background:#F3EEE3;color:#5B6478}
.st.on{background:#FFF8E1}.st.on:after{background:#FFF8E1}.st.warn .d{background:#FCE3DC;color:#B4432C}.st.warn b{color:#B4432C}
.ph{display:flex;align-items:center;gap:14px;margin:12px 16px 0}
.ph h1{margin:0;font-size:22px;font-weight:800;letter-spacing:-.02em}.ph .s{color:#5B6478}
.chip{font-size:11.5px;font-weight:600;border-radius:999px;padding:3px 10px;white-space:nowrap}
.btn{border:1px solid #DCD2BF;background:#fff;border-radius:10px;padding:7px 13px;font-weight:600;font-size:12.5px}.btn.d{background:#10223D;color:#fff;border-color:#10223D}
.grid{display:grid;grid-template-columns:608px 400px 1fr;gap:12px;margin:12px 16px 0;height:656px}
.card{background:#fff;border:1px solid #EDE5D6;border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.ch{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid #F3EDE1}.ch h3{margin:0;font-size:14px;font-weight:700}.ch span{font-size:11.5px;color:#8C7B5E}
.col{display:flex;flex-direction:column;gap:12px;min-height:0}
.roof{position:relative;background:#F4EFE6}
.spec{position:absolute;right:12px;top:12px;width:176px;z-index:2;background:rgba(16,34,61,.92);color:#E9EEF8;border-radius:12px;padding:11px 12px;font-size:11.5px}
.spec div{display:flex;justify-content:space-between;padding:3px 0}.spec b{font-family:'DM Mono',monospace;font-weight:500;color:#FFD24A}
.leg{position:absolute;left:12px;bottom:10px;z-index:2;display:flex;gap:12px;font-size:11px;color:#5B6478;background:rgba(255,255,255,.85);padding:5px 10px;border-radius:8px}
.leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.tl{display:flex;padding:12px 14px 14px;gap:0}
.tn{flex:1;position:relative;padding-top:20px;font-size:11.5px}.tn:before{content:"";position:absolute;top:6px;left:0;right:0;height:3px;background:#E7DFCF}
.tn.d:before{background:#2E9E5B}.tn .o{position:absolute;top:0;left:0;width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid #E7DFCF}
.tn.d .o{background:#2E9E5B;border-color:#2E9E5B}.tn.c .o{border-color:#FFB21A;background:#FFF1C2}.tn b{display:block;font-size:12px}.tn small{color:#8C7B5E;font:500 10.5px 'DM Mono',monospace}
.bill{display:flex;gap:10px;align-items:center;padding:10px 14px;border-bottom:1px solid #F3EDE1}
.doc{width:46px;height:56px;border-radius:6px;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(#DCD2BF,#DCD2BF) border-box;border:1px solid transparent;box-shadow:0 2px 6px rgba(16,34,61,.12);position:relative;flex:none}
.doc:before{content:"JVVNL";position:absolute;top:6px;left:6px;font:700 7px 'DM Mono',monospace;color:#2B5BA8}.doc:after{content:"";position:absolute;left:6px;right:6px;top:18px;height:26px;background:repeating-linear-gradient(#E3DACA 0 2px,transparent 2px 6px)}
.chart{display:flex;align-items:flex-end;gap:7px;height:126px;padding:10px 14px 0}
.mb{flex:1;height:100%;position:relative;display:flex;align-items:flex-end;justify-content:center;gap:2px}.mb i{width:9px;border-radius:3px 3px 0 0;display:block}.mb .g{background:#FFB21A}.mb .u{background:#9FB1CC}
.mb span{position:absolute;bottom:-17px;font:500 10px 'DM Mono',monospace;color:#8C7B5E}
.kp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-top:24px;border-top:1px solid #F3EDE1}
.kp div{padding:9px 14px;border-right:1px solid #F3EDE1}.kp div:last-child{border-right:0}.kp small{display:block;font-size:11px;color:#8C7B5E}.kp b{font-size:17px;font-weight:800}
.row{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px}.row b{font-family:'DM Mono',monospace;font-weight:500}
.emi{margin:6px 14px 12px;border-radius:12px;background:#10223D;color:#E9EEF8;padding:12px 14px}
.emi .vs{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-top:8px}
.emi .vs div small{display:block;font-size:10.5px;color:#9FB1CC}.emi .vs b{font-size:20px;font-weight:800}.emi .eq{color:#FFD24A;font-weight:800;font-size:18px}
.crew{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #F3EDE1}
.cav{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:10.5px;font-weight:700;margin-left:-6px;border:2px solid #fff}
.bm{display:grid;grid-template-columns:38px 1fr auto;gap:8px;align-items:center;padding:5.5px 14px;font-size:12px;border-bottom:1px solid #F7F2E8}
.bm .q{font:500 11.5px 'DM Mono',monospace;color:#5B6478}
.sb{display:grid;grid-template-columns:20px 1fr;gap:9px;padding:5px 14px;align-items:start}
.sb b{display:block;font-size:12px;font-weight:600}.sb small{color:#8C7B5E;font-size:10.8px}
.ck{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:11px;font-weight:800;margin-top:1px}
.ck.d{background:#2E9E5B;color:#fff}.ck.n{border:2px solid #FFB21A;background:#FFF1C2}.ck.w{border:2px dashed #C9BEA8}
@keyframes sh{0%,100%{opacity:.55}50%{opacity:.8}}.sh{animation:sh 4s ease-in-out infinite}
</style></head><body>
<div class="top"><div class="br"><div class="sun"></div><div><b>SunPeak Solar</b><span>SOLAR CRM · JAIPUR</span></div></div>
<div class="tabs"><span class="on">Pipeline</span><span>Leads<em>14</em></span><span>Projects</span><span>Installs</span><span>Subsidy &amp; net-meter<em>6</em></span><span>Inventory</span><span>Reports</span></div>
<div class="sp"></div><span class="mono" style="font-size:12px;color:#8C7B5E">Mon 5 Oct · 32°C · GHI 5.6</span><span class="ask">✦ Ask Solar CRM</span><span class="av">KM</span></div>
<div class="pipe">${stages.map(([n, c, v, d, k]) => `<div class="st ${k}"><small>${n}</small><b>${c}</b><span class="v">${v}</span><br><span class="d">avg ${d} in stage</span></div>`).join("")}</div>
<div class="ph"><div><h1>Sharma residence · 5.45 kWp on-grid</h1><div class="s">Anil &amp; Meera Sharma · C-42, Malviya Nagar, Jaipur · JVVNL A/c 2104-xx-8817 · Lead from website bill upload</div></div>
<span class="chip" style="background:#FFF1C2;color:#8A5B00">Install · Fri 9 Oct</span><span class="chip" style="background:#E3F4E6;color:#1C7A3A">Contract e-signed 18 Sep</span><div class="sp"></div><span class="btn">Share proposal</span><span class="btn d">Open install job</span></div>
<div class="grid">
<div class="col">
<div class="card" style="flex:1"><div class="ch"><h3>Roof design</h3><span>Drone survey 15 Sep · flat RCC roof 42′ × 30′</span></div>
<div class="roof" style="flex:1">
<svg width="100%" height="100%" viewBox="0 -10 606 400" preserveAspectRatio="xMidYMid meet" style="position:absolute;inset:0">
<defs><pattern id="rc" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#E9E1D3"/><circle cx="3" cy="4" r=".9" fill="#DCD2C0"/><circle cx="10" cy="10" r=".8" fill="#D6CBB7"/></pattern>
<radialGradient id="shd" cx="0" cy="0" r="1"><stop offset="0" stop-color="#5C6B86" stop-opacity=".55"/><stop offset="1" stop-color="#5C6B86" stop-opacity="0"/></radialGradient></defs>
<rect x="60" y="56" width="420" height="300" fill="url(#rc)" stroke="#C9BEA8" stroke-width="8"/>
<path d="M70 156 L118 156 L118 222 L70 222 Z" fill="#B9AE98"/><text x="72" y="194" font-family="Outfit" font-size="9.5" fill="#4E4434">Stair room</text>
<circle cx="110" cy="320" r="22" fill="#2C2C34"/><circle cx="110" cy="320" r="17" fill="#3B3B45"/><text x="88" y="355" font-family="Outfit" font-size="10" fill="#4E4434">1000 L tank</text>
<path class="sh" d="M118 156 L118 222 L146 200 L146 128 Z" fill="#5C6B86" opacity=".55"/>
<ellipse class="sh" cx="146" cy="306" rx="46" ry="20" fill="url(#shd)"/>
${panels}
<path d="M128 146 H392 V332 H128 Z" fill="none" stroke="#FFB21A" stroke-width="1.5" stroke-dasharray="6 4"/>
<path d="M70 40 Q 300 -30 540 40" fill="none" stroke="#FFB21A" stroke-width="2" stroke-dasharray="3 5"/>
<circle cx="300" cy="5" r="9" fill="#FFD24A"/><text x="312" y="12" font-family="DM Mono" font-size="10" fill="#8A5B00">noon · Oct</text>
<g transform="translate(36 330)"><circle r="16" fill="#fff" stroke="#C9BEA8"/><path d="M0 -12 L5 4 L0 1 L-5 4 Z" fill="#E2725B"/><text x="-4" y="-18" font-family="Outfit" font-weight="700" font-size="10" fill="#10223D">N</text></g>
<text x="66" y="372" font-family="DM Mono" font-size="10" fill="#8C7B5E">42 ft</text><text x="486" y="210" font-family="DM Mono" font-size="10" fill="#8C7B5E">30 ft</text>
<text x="160" y="140" font-family="Outfit" font-weight="700" font-size="11" fill="#10223D">2 rows × 5 · portrait · facing south</text>
</svg>
<div class="spec"><div><span>Modules</span><b>10 × 545 Wp</b></div><div><span>System</span><b>5.45 kWp</b></div><div><span>Tilt / azimuth</span><b>26° / 180°</b></div><div><span>Shade loss</span><b>3.8%</b></div><div><span>Yield</span><b>8,458 kWh/yr</b></div><div><span>Specific</span><b>1,552 kWh/kWp</b></div></div>
<div class="leg"><span><i style="background:#1E3A6E"></i>Panels</span><span><i style="background:#5C6B86"></i>Winter shade, 3–5 pm</span><span><i style="background:#FFB21A"></i>Usable area 236 sq ft</span></div>
</div></div>
<div class="card"><div class="ch"><h3>Project journey</h3><span>23 days so far</span></div>
<div class="tl"><div class="tn d"><i class="o"></i><b>Lead</b><small>12 Sep</small></div><div class="tn d"><i class="o"></i><b>Survey</b><small>15 Sep</small></div><div class="tn d"><i class="o"></i><b>Proposal</b><small>18 Sep</small></div><div class="tn d"><i class="o"></i><b>Loan</b><small>24 Sep</small></div><div class="tn c"><i class="o"></i><b>Install</b><small>9 Oct</small></div><div class="tn"><i class="o"></i><b>Commission</b><small>~10 Oct</small></div><div class="tn"><i class="o"></i><b>Net-meter</b><small>~2 Nov</small></div></div></div>
</div>
<div class="col">
<div class="card"><div class="ch"><h3>Sized from the bill</h3><span>JVVNL · 12-month history</span></div>
<div class="bill"><div class="doc"></div><div style="flex:1"><b style="font-size:12.5px">Aug bill · 812 units · ₹6,410</b><div style="font-size:11.5px;color:#5B6478">8,492 units/yr · sanctioned 7 kW · avg ₹7.90/unit</div></div><span class="chip" style="background:#E3F4E6;color:#1C7A3A">99.6% offset</span></div>
<div class="chart">${bars}</div>
<div style="display:flex;gap:14px;padding:22px 14px 0;font-size:11px;color:#5B6478"><span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#FFB21A;margin-right:5px"></i>Solar kWh</span><span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;background:#9FB1CC;margin-right:5px"></i>Home units</span></div>
<div class="kp" style="margin-top:8px"><div><small>Saving / month</small><b>₹5,568</b></div><div><small>Payback</small><b>3.5 yrs</b></div><div><small>25-yr saving</small><b>₹16.7L</b></div></div></div>
<div class="card" style="flex:1"><div class="ch"><h3>Price &amp; financing</h3><span>Proposal v2 · accepted</span></div>
<div class="row" style="padding-top:10px"><span>System price (incl. GST)</span><b>₹3,10,000</b></div>
<div class="row"><span>PM Surya Ghar subsidy</span><b style="color:#1C7A3A">−₹78,000</b></div>
<div class="row" style="border-top:1px solid #F3EDE1;padding-top:8px"><span style="font-weight:700">Effective cost</span><b style="font-weight:700">₹2,32,000</b></div>
<div class="emi"><div style="display:flex;justify-content:space-between;font-size:11.5px"><span>SBI rooftop loan · approved 24 Sep</span><span class="mono" style="color:#9FB1CC">₹2,79,000 · 7% · 60 mo</span></div>
<div class="vs"><div><small>EMI</small><b>₹5,525</b></div><span class="eq">≈</span><div><small>Bill saving</small><b>₹5,568</b></div></div>
<div style="font-size:11px;color:#9FB1CC;margin-top:7px">Down payment ₹31,000 · subsidy can prepay the loan when credited</div></div></div>
</div>
<div class="col">
<div class="card"><div class="ch"><h3>Install · Fri 9 Oct</h3><span>Auto BOM from design</span></div>
<div class="crew"><div style="display:flex;padding-left:6px"><span class="cav" style="background:#E2725B">RS</span><span class="cav" style="background:#2B5BA8">AK</span><span class="cav" style="background:#2E9E5B">MP</span><span class="cav" style="background:#8C7B5E">+1</span></div><div style="font-size:12px"><b>Ravi's crew</b> · Arjun (electrician)<br><span style="color:#8C7B5E;font-size:11px">Van RJ14-GB-2231 · 1 day job</span></div></div>
${bom.map(([q, n, s, k]) => `<div class="bm"><span class="q">${q}</span><span>${n}</span><span class="chip" style="${sTag(k)};font-size:10.5px;padding:2px 8px">${s}</span></div>`).join("")}</div>
<div class="card" style="flex:1"><div class="ch"><h3>Subsidy &amp; net-meter</h3><span>PM Surya Ghar · JVVNL</span></div>
<div style="padding-top:6px">${sub.map(([t, s, k]) => `<div class="sb">${subIc(k)}<div><b>${t}</b><small>${s}</small></div></div>`).join("")}</div></div>
</div>
</div></body></html>`;
})();
