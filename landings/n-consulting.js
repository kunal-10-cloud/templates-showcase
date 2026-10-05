// Consultancy OS · Northbridge Advisory — engagement portfolio with budget burn, burn-up forecast, utilisation and T&M invoicing.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const C = { mint: "#6EE7B7", teal: "#2DD4BF", amber: "#FBBF24", red: "#F87171", violet: "#A78BFA", blue: "#60A5FA" };

  // client, project, billing type, terms, owner, actual %, scheduled %, margin plan, margin forecast, WIP, status
  const eng = [
    ["Midwest Cold Chain", "Network redesign", "Fixed", "$240,000 · 1,600 h", "ER", 74, 32, 31, 24, "$38,400", "At risk", "red", "1,180 / 1,600 h"],
    ["Harbor Health", "Revenue-cycle operations", "T&M", "cap $180,000", "MS", 54, 34, 42, 41, "$59,316", "On track", "mint", "$96.3k / $180k"],
    ["Lakeshore Foods", "Plant OEE program", "Retainer", "$22,000 / mo · 140 h", "JW", 84, 9, 38, 38, "$0", "On track", "mint", "118 / 140 h"],
    ["Northwind Bank", "Branch ops benchmarking", "T&M", "cap $70,000", "MS", 89, 18, 36, 33, "$14,200", "Near cap", "amber", "$62.4k / $70k"],
    ["Prairie Logistics", "WMS selection", "Fixed", "$85,000 · 480 h", "RM", 88, 8, 33, 33, "$11,900", "On track", "mint", "420 / 480 h"],
    ["Granite Manufacturing", "Lean transformation", "Retainer", "$15,000 / mo · 100 h", "ER", 96, 6, 29, 27, "$3,800", "Watch", "amber", "96 / 100 h"],
    ["Civic Transit Authority", "Procurement redesign", "Fixed", "$120,000 · 900 h", "PS", 24, 38, 35, 35, "$14,684", "Early", "blue", "220 / 900 h"]
  ];
  const billC = { Fixed: C.mint, "T&M": C.blue, Retainer: C.violet };
  const W = 178, S = W / 120; // track spans 0–120% of budget
  const rows = eng.map(([cl, pr, bt, terms, own, a, s, m1, m2, wip, st, sc, hrs], i) => {
    const aw = Math.min(a, 120) * S, sw = Math.min(a + s, 120) * S - aw, over = a + s > 100;
    const fc = a + s;
    return `<div class="er${i === 0 ? " sel" : ""}"><div class="lg" style="background:${billC[bt]}22;color:${billC[bt]}">${cl[0]}</div>
<div class="en"><b>${cl}</b><small>${pr}</small><div class="chips"><span class="bt" style="color:${billC[bt]};border-color:${billC[bt]}55">${bt}</span><span class="stt"><span style="color:${C[sc]};background:${C[sc]}1A">● ${st}</span></span></div></div>
<div class="burn"><div class="trk"><i class="act" style="width:${aw}px;background:${over && a > 100 ? C.red : C.mint}"></i><i class="sch" style="left:${aw}px;width:${sw}px;--c:${over ? C.red : C.teal}"></i><i class="cap" style="left:${100 * S}px"></i></div>
<div class="bl"><span class="mono">${hrs}</span><span class="mono" style="color:${over ? C.red : "#8B95A5"}">fcst ${fc}%</span></div></div>
<div class="mg mono"><b style="color:${m2 < m1 - 3 ? C.red : "#E7ECF2"}">${m2}%</b><small>${m1 === m2 ? "plan" : "plan " + m1 + "%"}</small></div>
<div class="wp mono">${wip}</div></div>`;
  }).join("");

  // burn-up chart (weeks 1–14, hours 0–1800)
  const cw = 380, chh = 150, px = w => 30 + (w - 1) * ((cw - 44) / 13), py = h => 12 + (1 - h / 1800) * (chh - 30);
  const act = [70, 160, 260, 370, 480, 600, 730, 860, 1010, 1180];
  const fc = [1180, 1310, 1440, 1580, 1700];
  const aPts = act.map((h, i) => `${px(i + 1).toFixed(1)},${py(h).toFixed(1)}`).join(" ");
  const fPts = fc.map((h, i) => `${px(i + 10).toFixed(1)},${py(h).toFixed(1)}`).join(" ");
  const area = `${px(1)},${py(0)} ${aPts} ${px(10)},${py(0)}`;
  const grid = [0, 600, 1200, 1800].map(h => `<line x1="30" x2="${cw - 14}" y1="${py(h)}" y2="${py(h)}" stroke="#232A34"/><text x="24" y="${py(h) + 3}" text-anchor="end">${h}</text>`).join("");
  const wk = [1, 4, 7, 10, 14].map(w => `<text x="${px(w)}" y="${chh - 2}" text-anchor="middle">wk ${w}</text>`).join("");
  const chart = `<svg width="${cw}" height="${chh}" viewBox="0 0 ${cw} ${chh}" style="font:500 9.5px 'JetBrains Mono',monospace;fill:#6B7586">${grid}${wk}
<defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6EE7B7" stop-opacity=".35"/><stop offset="1" stop-color="#6EE7B7" stop-opacity="0"/></linearGradient></defs>
<polygon points="${area}" fill="url(#ga)"/>
<line x1="30" x2="${cw - 14}" y1="${py(1600)}" y2="${py(1600)}" stroke="#E7ECF2" stroke-dasharray="4 4" stroke-opacity=".7"/>
<text x="36" y="${py(1600) - 5}" style="fill:#C9D1DC">budget 1,600 h</text>
<polyline points="${aPts}" fill="none" stroke="#6EE7B7" stroke-width="2.5"/>
<polyline points="${fPts}" fill="none" stroke="#F87171" stroke-width="2.5" stroke-dasharray="5 4"/>
<line x1="${px(10)}" x2="${px(10)}" y1="10" y2="${chh - 14}" stroke="#FBBF24" stroke-opacity=".6"/>
<circle cx="${px(10)}" cy="${py(1180)}" r="4.5" fill="#6EE7B7"/><circle cx="${px(14)}" cy="${py(1700)}" r="4.5" fill="#F87171"/>
<text x="${px(10) - 8}" y="${py(1180) - 8}" text-anchor="end" style="fill:#6EE7B7">1,180 today</text>
<text x="${px(14) - 4}" y="${py(1700) - 9}" text-anchor="end" style="fill:#F87171">fcst 1,700 h</text></svg>`;

  const phases = [["Discovery", 220, 220, 0], ["Network model", 610, 560, 0], ["DC site selection", 300, 420, 120], ["Implementation plan", 50, 400, 400]];
  const ph = phases.map(([n, a, b, s]) => {
    const tot = a + s, over = tot > b;
    return `<div class="phr"><span>${n}</span><div class="ptr"><i style="width:${Math.min(a / b, 1.25) * 100 / 1.25}%;background:${a > b ? C.red : C.mint}"></i><i style="width:${(s / b) * 100 / 1.25}%;background:repeating-linear-gradient(45deg,${C.teal}66 0 3px,transparent 3px 6px)"></i><em style="left:${100 / 1.25}%"></em></div><span class="mono" style="color:${a > b ? C.red : "#C9D1DC"}">${a}/${b}</span></div>`;
  }).join("");

  // utilisation (Forecast-style): person, role, weeks %, t = tentative indices
  const ppl = [
    ["Elena Ruiz", "Eng. manager", [96, 104, 92, 88, 80, 60], [5]],
    ["Priya Shah", "Sr consultant", [62, 70, 75, 80, 85, 90], []],
    ["Marcus Lee", "Partner", [55, 60, 58, 62, 50, 40], []],
    ["Jonah Weiss", "Consultant", [100, 100, 96, 90, 70, 40], [5]],
    ["Aisha Bello", "Analyst", [92, 95, 98, 100, 100, 90], []],
    ["Tom Becker", "Consultant", [40, 45, 70, 80, 80, 80], [2, 3, 4, 5]],
    ["Ravi Menon", "Sr consultant", [110, 105, 100, 95, 90, 85], []],
    ["Sara Kim", "Analyst", [80, 85, 85, 80, 75, 70], []]
  ];
  const ucol = v => v > 100 ? C.red : v >= 90 ? C.teal : v >= 70 ? C.mint : "#3A4352";
  const util = ppl.map(([n, r, w, t]) => `<div class="ur"><div class="un"><b>${n}</b><small>${r}</small></div>${w.map((v, i) => `<span class="uc${t.includes(i) ? " tent" : ""}" style="--c:${ucol(v)};color:${v >= 70 ? "#0D1015" : "#C9D1DC"}">${v}</span>`).join("")}</div>`).join("");

  const inv = [["Partner", "Marcus Lee", 18, 375], ["Engagement manager", "Marta Sousa", 64, 250], ["Senior consultant", "Ravi Menon", 112, 195], ["Analyst", "Aisha Bello", 96, 140]];
  const fmt = n => n.toLocaleString("en-US", { minimumFractionDigits: 0 });
  const invRows = inv.map(([r, p, h, rate]) => `<div class="il"><div><b>${r}</b><small>${p}</small></div><span class="mono">${h} h × $${rate}</span><span class="mono">$${fmt(h * rate)}</span></div>`).join("");

  window.LANDINGS.consulting = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#0D1015;color:#E7ECF2;font:13px/1.4 'Urbanist',system-ui,sans-serif}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:56px;display:flex;align-items:center;gap:20px;padding:0 24px;border-bottom:1px solid #1C222B}
.brand{display:flex;align-items:center;gap:10px}.nb{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#6EE7B7,#2DD4BF);color:#0D1015;display:grid;place-items:center;font-weight:800;font-size:16px}
.brand b{display:block;font-size:14.5px;font-weight:700}.brand small{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#6B7586}
.tabs{display:flex;gap:4px;margin-left:12px}.tabs span{padding:7px 12px;border-radius:8px;color:#8B95A5;font-weight:600}.tabs span.on{background:#1C232D;color:#fff}
.wk{margin-left:auto;font:500 12px 'JetBrains Mono',monospace;color:#8B95A5;border:1px solid #232A34;border-radius:8px;padding:6px 10px}
.ask{border-radius:9px;padding:7px 13px;font-weight:700;background:#6EE7B7;color:#0D1015}
.me{width:32px;height:32px;border-radius:50%;background:#2A3240;display:grid;place-items:center;font-weight:700;font-size:12px}
.kpis{position:absolute;top:68px;left:24px;right:24px;height:70px;display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.kp{border:1px solid #1E252F;border-radius:14px;padding:10px 14px;background:#11161D;display:flex;flex-direction:column;justify-content:center}
.kp span{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#6B7586}.kp b{font-size:23px;font-weight:800;letter-spacing:-.02em}.kp small{color:#8B95A5;font-size:11.5px;margin-left:6px;font-weight:500}
.wrap{position:absolute;top:150px;left:24px;right:24px;bottom:16px;display:grid;grid-template-columns:552px 430px 1fr;gap:16px}
.card{background:#151A21;border:1px solid #232A34;border-radius:16px;overflow:hidden;position:relative}
.ch{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px}.ch h3{margin:0;font-size:15px;font-weight:800}.ch span{color:#8B95A5;font-size:12px}
.eh{display:grid;grid-template-columns:30px 160px 178px 56px 58px;gap:8px;padding:0 16px 8px;font:600 9.5px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#6B7586;border-bottom:1px solid #232A34}
.er{display:grid;grid-template-columns:30px 160px 178px 56px 58px;gap:8px;align-items:center;padding:12px 16px;border-bottom:1px solid #1C222B;min-height:83px}
.er.sel{background:#1A222B;box-shadow:inset 3px 0 0 #6EE7B7}
.lg{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;font-weight:800;font-size:14px}
.en b{display:block;font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.en small{display:block;color:#8B95A5;font-size:11.5px;white-space:nowrap}
.chips{display:flex;gap:5px;margin-top:5px}.bt{border:1px solid;border-radius:5px;padding:0 6px;font:600 10px 'JetBrains Mono',monospace}.tm{color:#6B7586;font:500 10px 'JetBrains Mono',monospace;white-space:nowrap}
.trk{position:relative;height:12px;width:${W}px;border-radius:6px;background:#1E252F}
.trk i{position:absolute;top:0;height:12px;display:block}.trk .act{left:0;border-radius:6px 0 0 6px}
.trk .sch{background:repeating-linear-gradient(45deg,var(--c) 0 3px,transparent 3px 6px);opacity:.75}
.trk .cap{width:2px;top:-4px;height:20px;background:#E7ECF2;opacity:.75}
.bl{display:flex;justify-content:space-between;margin-top:6px;font-size:10.5px;color:#C9D1DC;width:${W}px}
.mg b{display:block;font-size:14px}.mg small{color:#6B7586;font-size:10px;white-space:nowrap}.wp{font-size:11.5px;font-weight:600;text-align:right}
.stt span{font-size:10px;font-weight:700;padding:1px 7px;border-radius:999px;white-space:nowrap}
.ef{display:flex;gap:16px;padding:10px 16px;color:#8B95A5;font-size:11.5px}.ef i{display:inline-block;width:14px;height:8px;border-radius:2px;margin-right:5px;vertical-align:0}
.mid{display:flex;flex-direction:column;gap:16px;min-height:0}
.open{padding:14px 16px;flex:none}
.oh{display:flex;align-items:flex-start;justify-content:space-between}.oh b{font-size:17px;font-weight:800;display:block}.oh small{color:#8B95A5}
.pill{font:600 10.5px 'JetBrains Mono',monospace;padding:3px 8px;border-radius:6px;background:#F871711F;color:#F87171}
.terms{display:flex;gap:14px;margin:8px 0 6px;color:#8B95A5;font-size:11.5px}.terms b{color:#E7ECF2;font-weight:700}
.phr{display:grid;grid-template-columns:118px 1fr 64px;gap:8px;align-items:center;font-size:11.5px;color:#C9D1DC;margin-top:3px}.phr .mono{text-align:right;font-size:11px}
.ptr{position:relative;height:7px;border-radius:4px;background:#1E252F;display:flex;overflow:visible}.ptr i{display:block;height:100%}.ptr em{position:absolute;top:-3px;width:2px;height:13px;background:#E7ECF2;opacity:.6}
.ai{margin-top:8px;border-radius:12px;border:1px solid #2C3A33;background:linear-gradient(180deg,#14221D,#121A18);padding:10px 12px}
.ai p{line-height:1.3}.ai .t{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#6EE7B7}.ai p{margin:4px 0 6px;color:#C9D1DC;font-size:12px}
.opt{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #23302A;padding:4px 0;font-size:12px}.opt b{color:#E7ECF2}.opt .mono{color:#6EE7B7;font-size:11px}
.btns{display:flex;gap:8px;margin-top:6px}.btn{border-radius:8px;padding:6px 11px;font-weight:700;font-size:12px;border:1px solid #2F3846}.btn.p{background:#6EE7B7;color:#0D1015;border-color:#6EE7B7}
.portal{flex:1;padding:14px 16px;background:#F4F1EA;color:#1A1F27;border-color:#F4F1EA}
.portal .ch{padding:0 0 8px}.portal .ch span{color:#6B6455}
.dv{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-top:1px solid #E2DDD1;font-size:12.5px}.dv small{display:block;color:#6B6455;font-size:11px}
.dv .s{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px}
.right{display:flex;flex-direction:column;gap:16px;min-height:0}
.utl{flex:none;height:338px}
.uh,.ur{display:grid;grid-template-columns:112px repeat(6,1fr);gap:4px;padding:0 14px;align-items:center}
.uh{font:600 9.5px 'JetBrains Mono',monospace;color:#6B7586;padding-bottom:6px}.uh span{text-align:center}
.ur{height:31px}.un b{display:block;font-size:12px;font-weight:700;line-height:1.05}.un small{display:block;color:#6B7586;font-size:9.5px;line-height:1.1}
.uc{height:25px;border-radius:6px;background:var(--c);display:grid;place-items:center;font:600 10.5px 'JetBrains Mono',monospace}
.uc.tent{background:repeating-linear-gradient(45deg,var(--c) 0 4px,transparent 4px 8px);color:#E7ECF2!important;border:1px dashed var(--c)}
.uf{padding:6px 14px;color:#8B95A5;font-size:11.5px}
.inv{flex:1;padding:12px 16px;display:flex;flex-direction:column;min-height:0}
.inv .ch{padding:0 0 4px}
.il{display:grid;grid-template-columns:1fr auto 74px;gap:8px;align-items:center;padding:4px 0;border-bottom:1px solid #1E252F;font-size:12px}.il b{display:block;font-size:12.5px}.il small{color:#8B95A5;font-size:10.5px}.il .mono{text-align:right;font-size:11.5px}
.it{display:flex;justify-content:space-between;align-items:baseline;margin-top:6px}.it b{font-size:24px;font-weight:800;letter-spacing:-.02em}
.capb{height:6px;border-radius:4px;background:#1E252F;margin:8px 0 4px;display:flex;overflow:hidden}.capb i{display:block;height:100%}
</style></head><body>
<div class="top"><div class="brand"><div class="nb">N</div><div><b>Northbridge Advisory</b><small>CONSULTANCY OS</small></div></div>
<div class="tabs"><span class="on">Portfolio</span><span>Schedule</span><span>Time</span><span>Invoicing</span><span>Clients</span><span>Reports</span></div>
<div class="wk">Wk 41 · Oct 5–11</div><div class="ask">✦ Ask Consultancy OS</div><div class="me">MS</div></div>

<div class="kpis">
<div class="kp"><span>BILLABLE UTILISATION · 25 PEOPLE</span><b>78%<small>target 75%</small></b></div>
<div class="kp"><span>UNBILLED WIP</span><b>$142,300<small>7 engagements</small></b></div>
<div class="kp"><span>OCTOBER REVENUE · FORECAST</span><b>$612,400<small>+6% vs Sep</small></b></div>
<div class="kp"><span>PORTFOLIO MARGIN · FORECAST</span><b>34%<small>plan 36%</small></b></div>
<div class="kp" style="border-color:#3A2326"><span style="color:#F87171">BUDGETS AT RISK</span><b style="color:#F87171">2<small>forecast &gt; 100%</small></b></div></div>

<div class="wrap">
<div class="card"><div class="ch"><h3>Active engagements</h3><span>burn = approved time · hatched = scheduled</span></div>
<div class="eh"><span></span><span>CLIENT · SOW</span><span>BUDGET BURN → FORECAST</span><span>MARGIN</span><span>WIP</span></div>
${rows}
<div class="ef"><span><i style="background:#6EE7B7"></i>Burned</span><span><i style="background:repeating-linear-gradient(45deg,#2DD4BF 0 3px,transparent 3px 6px)"></i>Scheduled</span><span><i style="background:#E7ECF2;width:2px"></i>Budget / cap</span><span style="margin-left:auto">Fixed · T&amp;M · Retainer</span></div></div>

<div class="mid">
<div class="card open"><div class="oh"><div><b>Midwest Cold Chain · Network redesign</b><small>SOW-0219 · Phase 3 of 4 · week 10 of 14 · EM Elena Ruiz</small></div><span class="pill">FCST 106%</span></div>
<div class="terms"><span>Fixed fee <b>$240,000</b></span><span>Billed <b>$180,000</b></span><span>Cost to date <b>$126,600</b></span></div>
${chart}
${ph}
<div class="ai"><div class="t">✦ CONSULTANCY OS · BUDGET FORECAST</div><p>Scheduled work lands at <b>1,700 h</b>, 100 h over budget. Margin drops from 31% to 24%.</p>
<div class="opt"><span>Move 80 h of modelling from Ravi to <b>Priya</b> (62% booked)</span><span class="mono">→ 27%</span></div>
<div class="opt"><span>Change order for added <b>Memphis DC</b> scope · $18,000</span><span class="mono">→ 30%</span></div>
<div class="btns"><span class="btn p">Draft change order</span><span class="btn">Open schedule</span></div></div></div>
<div class="card portal"><div class="ch"><h3>What Midwest Cold Chain sees</h3><span>client portal</span></div>
<div class="dv"><div>Network model v3<small>sent Fri 2 Oct · 3 comments</small></div><span class="s" style="background:#FDECC8;color:#8A5A00">Awaiting approval</span></div>
<div class="dv"><div>Weekly status #10<small>viewed by COO, 8:14 am</small></div><span class="s" style="background:#DDF3E8;color:#1E7A4F">Viewed</span></div>
<div class="dv"><div>Phase 3 milestone invoice<small>on approval of DC shortlist</small></div><span class="mono" style="font-weight:600">$60,000</span></div></div>
</div>

<div class="right">
<div class="card utl"><div class="ch"><h3>Utilisation · next 6 weeks</h3><span>striped = tentative</span></div>
<div class="uh"><span style="text-align:left">PERSON</span><span>OCT 5</span><span>12</span><span>19</span><span>26</span><span>NOV 2</span><span>9</span></div>
${util}
<div class="uf">Bench next 2 weeks: <b style="color:#E7ECF2">Tom 115 h</b> · <b style="color:#E7ECF2">Priya 68 h</b> · Ravi over 100%</div></div>
<div class="card inv"><div class="ch"><h3>Invoice draft · Harbor Health</h3><span class="mono">INV-2026-0931</span></div>
<div style="color:#8B95A5;font-size:11.5px;margin-bottom:4px">T&amp;M · approved time Sep 1–30 · 290 h · Net 30</div>
${invRows}
<div class="il"><div><b>Expenses</b><small>3 site visits · Indianapolis</small></div><span class="mono">receipts ✓</span><span class="mono">$1,286.40</span></div>
<div class="it"><span style="color:#8B95A5">Total due Nov 4</span><b>$59,316.40</b></div>
<div class="capb"><i style="width:53.5%;background:#60A5FA"></i><i style="width:33%;background:#6EE7B7"></i></div>
<div style="display:flex;justify-content:space-between;font-size:11px;color:#8B95A5"><span>Cap $180,000 · 86% used after this invoice</span><span class="mono">$24,384 left</span></div>
<div class="btns" style="margin-top:8px"><span class="btn">Sync to QuickBooks</span><span class="btn p">Send via client portal</span></div></div>
</div></div></body></html>`;
})();
