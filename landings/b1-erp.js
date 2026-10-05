// Maker ERP preview: Katana-style Make schedule with an opened manufacturing order.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const AV = { in: ["In stock", "ok"], exp: ["Expected", "exp"], na: ["Not available", "na"] };
  const ST = { wip: ["Work in progress", "wip"], ns: ["Not started", "ns"], blk: ["Blocked", "blk"], done: ["Done", "done"] };
  const mos = [
    ["MO-0882", "Oak dining table 180", "OI-2041", 24, "Hotel Ambiorix", "SO-2214", "in", "", "Wed 7 Oct", "Fri 9 Oct", 0, "wip", 62, 1],
    ["MO-0883", "Steel frame chair", "OI-1108", 120, "Hotel Ambiorix", "SO-2214", "exp", "8 Oct", "Thu 8 Oct", "Fri 9 Oct", 0, "wip", 40, 0],
    ["MO-0879", "Walnut sideboard", "OI-3302", 10, "Studio Noord", "SO-2216", "na", "walnut", "Fri 9 Oct", "Thu 8 Oct", 1, "blk", 15, 0],
    ["MO-0884", "Bench 140, oiled", "OI-2210", 30, "Maison Verte", "SO-2220", "in", "", "Mon 12 Oct", "Wed 14 Oct", 0, "ns", 0, 0],
    ["MO-0885", "Coffee table, ash", "OI-2302", 40, "Make to stock", "", "exp", "9 Oct", "Tue 13 Oct", "", 0, "ns", 0, 0],
    ["MO-0886", "Oak wall shelf 90", "OI-4105", 60, "Café Lindt", "SO-2219", "in", "", "Wed 14 Oct", "Fri 16 Oct", 0, "ns", 0, 0],
    ["MO-0887", "Oak desk 160", "OI-5120", 60, "Kantoor Plus", "SO-2221", "na", "oak", "Mon 19 Oct", "Fri 23 Oct", 0, "ns", 0, 0]
  ];
  const rows = mos.map(([mo, name, sku, qty, cust, so, av, avNote, prod, del, conflict, st, pct, sel], i) => `
    <div class="tr${sel ? " sel" : ""}">
      <span class="grip"><i></i><i></i><i></i></span>
      <span class="rk">${i + 1}</span>
      <div class="prod"><b>${name}</b><span class="mono">${mo} · ${sku}</span></div>
      <span class="qty mono">${qty}</span>
      <div class="cust"><b>${cust}</b><span class="mono">${so || "Stock"}</span></div>
      <span class="pill ${AV[av][1]}">${AV[av][0]}${avNote ? ` <em>${avNote}</em>` : ""}</span>
      <span class="dl">${prod}</span>
      <span class="dl${conflict ? " late" : ""}">${del || "—"}${conflict ? '<i class="warn">!</i>' : ""}</span>
      <div class="stc"><span class="pill ${ST[st][1]}">${ST[st][0]}</span>${pct ? `<div class="mini"><i style="width:${pct}%"></i></div>` : ""}</div>
    </div>`).join("");

  const bom = [
    ["Oak board 27 mm", "RM-OAK-27", "48 m²", "84 m²", "in"],
    ["Steel leg set, black", "HW-LEG-S4", "24 sets", "38 sets", "in"],
    ["Hardwax oil, matt", "FN-OIL-01", "3.0 L", "6.5 L", "in"],
    ["Felt pads 40 mm", "HW-FELT-40", "96 pcs", "40 pcs", "exp"],
    ["Screw M8×40", "HW-M8-40", "192 pcs", "1,450 pcs", "in"]
  ];
  const bomRows = bom.map(([n, s, need, have, av]) => `<div class="bl"><div><b>${n}</b><span class="mono">${s}</span></div><span class="mono r">${need}</span><span class="mono r ${av === "exp" ? "short" : ""}">${have}</span><span class="pill sm ${AV[av][1]}">${av === "exp" ? "Expected 7 Oct" : "In stock"}</span></div>`).join("");

  const ops = [
    ["Cutting", "CNC router", "JV", "#5B7FA6", "Jan Vermeulen", "6.0 h", "done", 100],
    ["Assembly", "Bench 2", "LD", "#B0662C", "Lotte Dewulf", "9.0 h", "wip", 62],
    ["Finishing", "Oil booth", "PC", "#4D7D5B", "Pieter Claes", "4.5 h", "ns", 0],
    ["QC & pack", "Dispatch", "SM", "#7A6A9B", "Sara Maes", "2.0 h", "ns", 0]
  ];
  const opRows = ops.map(([op, ws, ini, c, who, h, st, pct], i) => `<div class="op ${st}"><span class="node">${st === "done" ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>' : i + 1}</span><div class="opn"><b>${op}</b><span>${ws}</span></div><span class="av" style="background:${c}">${ini}</span><span class="who">${who}</span><span class="mono h">${h}</span><div class="opbar"><i style="width:${pct}%"></i></div><span class="opst">${st === "done" ? "Done" : st === "wip" ? "15 / 24" : "Queued"}</span></div>`).join("");

  const load = [
    ["CNC router", [72, 88, 95, 64, 40]],
    ["Assembly bench 1", [90, 104, 96, 88, 70]],
    ["Assembly bench 2", [100, 118, 112, 92, 60]],
    ["Oil booth", [45, 60, 85, 98, 90]],
    ["QC & packing", [30, 40, 55, 80, 96]]
  ];
  const cell = v => { const c = v > 100 ? "over" : v >= 85 ? "high" : v >= 60 ? "mid" : "low"; return `<span class="cell ${c}">${v}%</span>`; };
  const loadRows = load.map(([ws, vals]) => `<div class="lr"><span class="ws">${ws}</span>${vals.map(cell).join("")}</div>`).join("");

  const ic = p => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  window.LANDINGS.erp = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Schibsted Grotesk',system-ui,sans-serif;color:#1A1C20;background:#F4F2EE}
.mono{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#6E6A63}
.top{height:54px;background:#17191D;display:flex;align-items:center;gap:22px;padding:0 20px;color:#C9C5BE}
.brand{display:flex;align-items:center;gap:10px}.sw{width:30px;height:30px;border-radius:7px;background:repeating-linear-gradient(100deg,#B98552 0 3px,#C9965F 3px 7px,#A97646 7px 9px,#C38E58 9px 14px);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.brand b{color:#fff;font-size:14px;display:block;line-height:1.1}.brand span{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#8E8A83}
.tabs{display:flex;gap:4px;margin-left:16px}.tab{padding:7px 14px;border-radius:7px;font-weight:600;font-size:13.5px;display:flex;gap:7px;align-items:center}
.tab.on{background:#2A2D33;color:#fff;box-shadow:inset 0 -2px 0 #D98A3D}.tab em{font-style:normal;font:600 10.5px 'JetBrains Mono',monospace;background:#2E3238;color:#C9C5BE;border-radius:5px;padding:1px 5px}
.tsr{margin-left:auto;display:flex;align-items:center;gap:8px;background:#22252A;border:1px solid #30343A;border-radius:8px;padding:7px 11px;width:300px;color:#8E8A83;font-size:13px}.tsr kbd{margin-left:auto;font:500 10.5px 'JetBrains Mono',monospace;border:1px solid #3A3E45;border-radius:4px;padding:0 4px}
.ask{display:flex;align-items:center;gap:7px;border:1px solid #3A3E45;border-radius:8px;padding:7px 11px;color:#F0E6DA;font-weight:600;font-size:13px}.ask svg{color:#D98A3D}
.me{width:30px;height:30px;border-radius:50%;background:#D98A3D;color:#1A1C20;display:grid;place-items:center;font-weight:800;font-size:11.5px}
.sub{height:58px;display:flex;align-items:center;gap:18px;padding:0 20px;border-bottom:1px solid #E2DED6;background:#FBFAF7}
.sub h1{margin:0;font-size:22px;font-weight:800;letter-spacing:-.02em}
.st{display:flex;gap:2px;background:#EEEBE5;border-radius:8px;padding:3px}.st span{padding:5px 12px;border-radius:6px;font-weight:600;font-size:12.5px;color:#6E6A63}.st span.on{background:#fff;color:#1A1C20;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.flt{display:flex;gap:6px;margin-left:auto}.flt span{border:1px solid #DCD7CE;border-radius:7px;padding:6px 10px;font-size:12.5px;color:#4A4741;background:#fff;display:flex;gap:6px;align-items:center}
.cta{background:#C2672A;color:#fff;border-radius:8px;padding:8px 14px;font-weight:700;font-size:13px;box-shadow:0 4px 12px rgba(194,103,42,.3)}
.body{display:grid;grid-template-columns:858px 1fr;grid-template-rows:1fr 198px;gap:14px;padding:14px 20px 16px;height:788px}
.card{background:#fff;border:1px solid #E2DED6;border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
.ch{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #EEEAE3}.ch b{font-size:14px}.ch span{font-size:12px;color:#6E6A63}
.th,.tr{display:grid;grid-template-columns:16px 16px 1.5fr 34px 1.25fr 146px 80px 92px 136px;align-items:center;gap:8px;padding:0 14px}
.th{height:34px;background:#F7F5F1;font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#8E8A83;border-bottom:1px solid #EEEAE3}
.tr{height:58px;border-bottom:1px solid #F1EEE8;position:relative}
.tr.sel{background:#FFF7EF;box-shadow:inset 3px 0 0 #C2672A}
.grip{display:flex;flex-direction:column;gap:2px;opacity:.45}.grip i{width:10px;height:2px;background:#8E8A83;border-radius:1px}
.rk{font:600 11.5px 'JetBrains Mono',monospace;color:#8E8A83}
.prod b,.cust b{display:block;font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cust b{font-weight:500}.qty{font-size:13px;color:#1A1C20;text-align:right}
.pill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 9px;font-size:11.5px;font-weight:600;white-space:nowrap;width:max-content}
.pill:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}.pill em{font-style:normal;font-weight:500;opacity:.8}
.pill.ok{background:#E2F2E7;color:#1D7A44}.pill.exp{background:#FCEFD6;color:#9A5B00}.pill.na{background:#FCE6E3;color:#B42318}
.pill.wip{background:#E6EDFA;color:#2457C5}.pill.ns{background:#EFEDE9;color:#5C5850}.pill.blk{background:#FCE6E3;color:#B42318}.pill.done{background:#E2F2E7;color:#1D7A44}
.pill.sm{font-size:11px;padding:2px 8px}
.dl{font-size:12.5px;color:#3A3732;display:flex;align-items:center;gap:6px}.dl.late{color:#B42318;font-weight:600}
.warn{font-style:normal;width:16px;height:16px;border-radius:50%;background:#B42318;color:#fff;display:grid;place-items:center;font-size:10.5px;font-weight:800}
.stc{display:flex;flex-direction:column;gap:5px;align-items:flex-start}.mini{height:4px;border-radius:2px;background:#ECE8E1;width:100px;overflow:hidden}.mini i{display:block;height:100%;background:#2457C5;border-radius:2px}
.tf{margin-top:auto;display:flex;gap:16px;align-items:center;padding:10px 16px;border-top:1px solid #EEEAE3;background:#FBFAF7;font-size:12px;color:#6E6A63}.tf b{color:#1A1C20}
.sched{grid-column:1;grid-row:1}.mo{grid-column:2;grid-row:1/3}
.prod .mono,.cust .mono{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.moh{padding:14px 16px 12px;display:flex;gap:12px;border-bottom:1px solid #EEEAE3}
.moh .sw{width:46px;height:46px;border-radius:10px;flex:none}
.moh h2{margin:0 0 3px;font-size:17px;font-weight:800;letter-spacing:-.01em}.moh p{margin:0;font-size:12.5px;color:#6E6A63}
.lot{margin-left:auto;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:5px}
.cost{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #EEEAE3}
.cost div{padding:9px 14px;border-right:1px solid #EEEAE3}.cost div:last-child{border-right:0}
.cost span{display:block;font-size:11px;color:#8E8A83}.cost b{font:600 15px 'JetBrains Mono',monospace;color:#1A1C20}.cost .mg b{color:#1D7A44}
.sec{padding:9px 16px 4px;font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#8E8A83;display:flex;justify-content:space-between}
.bl{display:grid;grid-template-columns:1fr 62px 72px 108px;gap:8px;align-items:center;padding:6px 16px;border-bottom:1px solid #F4F1EC}
.bl b{display:block;font-size:12.5px;font-weight:600}.bl .r{text-align:right;color:#1A1C20}.bl .short{color:#B42318;font-weight:600}
.op{display:grid;grid-template-columns:22px 96px 24px 92px 40px 1fr 50px;gap:8px;align-items:center;padding:6px 16px}
.node{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font:600 10.5px 'JetBrains Mono',monospace;background:#EFEDE9;color:#6E6A63;border:1.5px solid #DCD7CE}
.op.done .node{background:#1D7A44;border-color:#1D7A44}.op.wip .node{background:#fff;border-color:#2457C5;color:#2457C5;box-shadow:0 0 0 3px rgba(36,87,197,.15)}
.opn b{display:block;font-size:12.5px}.opn span{font-size:11px;color:#8E8A83}
.av{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:9.5px;font-weight:700}
.who{font-size:12px;color:#3A3732;white-space:nowrap}.h{text-align:right}
.opbar{height:5px;border-radius:3px;background:#ECE8E1;overflow:hidden}.opbar i{display:block;height:100%;border-radius:3px;background:#2457C5}.op.done .opbar i{background:#1D7A44}
.opst{font:500 11px 'JetBrains Mono',monospace;color:#6E6A63;text-align:right}
.mof{margin-top:auto;display:flex;gap:8px;padding:10px 16px;border-top:1px solid #EEEAE3;background:#FBFAF7}
.b2{border:1px solid #DCD7CE;background:#fff;border-radius:8px;padding:7px 12px;font-weight:600;font-size:12.5px}.b2.p{background:#1A1C20;color:#fff;border-color:#1A1C20}
.cap{grid-column:1;grid-row:2;padding:0}
.lgrid{padding:6px 16px 10px;display:flex;flex-direction:column;gap:4px}
.lr,.lh{display:grid;grid-template-columns:150px repeat(5,1fr);gap:6px;align-items:center}
.lh span{font:600 10.5px 'JetBrains Mono',monospace;color:#8E8A83;text-align:center}.lh span:first-child{text-align:left}
.ws{font-size:12.5px;font-weight:600}
.cell{height:20px;border-radius:5px;display:grid;place-items:center;font:600 10.5px 'JetBrains Mono',monospace}
.cell.low{background:#EEF4EF;color:#4D7D5B}.cell.mid{background:#DCEBDF;color:#2F6B40}.cell.high{background:#F8E3C9;color:#94530E}.cell.over{background:#C2412E;color:#fff}
.po{grid-column:2/3}
.pol{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:8px 16px;border-bottom:1px solid #F4F1EC;align-items:center}
.pol b{font-size:12.5px}.pol .mono{grid-column:1/2}.pol .pill{grid-row:1/3;grid-column:2/3}
.live{animation:pl 1.8s infinite}@keyframes pl{0%,100%{box-shadow:0 0 0 3px rgba(36,87,197,.15)}50%{box-shadow:0 0 0 6px rgba(36,87,197,.05)}}
</style></head><body>
<div class="top">
  <div class="brand"><div class="sw"></div><div><b>Oak &amp; Iron Furniture</b><span>MAKER ERP</span></div></div>
  <div class="tabs"><span class="tab">Sell <em>12</em></span><span class="tab on">Make <em>14</em></span><span class="tab">Buy <em>3</em></span><span class="tab">Stock</span><span class="tab">Plan</span><span class="tab">Contacts</span></div>
  <div class="tsr">${ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>')}Search SKU, MO, order…<kbd>⌘K</kbd></div>
  <div class="ask">${ic('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>')}Ask</div>
  <div class="me">PC</div>
</div>
<div class="sub">
  <h1>Make</h1>
  <div class="st"><span class="on">Schedule</span><span>Tasks</span><span>Done</span></div>
  <div class="flt"><span>All workstations ▾</span><span>Week 41 ▾</span><span>Ingredients: any ▾</span></div>
  <span class="cta">+ Manufacturing order</span>
</div>
<div class="body">
  <div class="card sched">
    <div class="ch"><b>Production schedule</b><span>Drag to re-rank · MOs at the top get materials first</span></div>
    <div class="th"><span></span><span>#</span><span>Product</span><span style="text-align:right">Qty</span><span>Customer · order</span><span>Ingredients</span><span>Production</span><span>Delivery</span><span>Status</span></div>
    ${rows}
    <div class="tf"><span><b>14</b> open MOs</span><span><b>2</b> waiting on materials</span><span style="color:#B42318"><b style="color:#B42318">1</b> delivery conflict: MO-0879 finishes after Studio Noord's date</span></div>
  </div>
  <div class="card mo">
    <div class="moh"><div class="sw"></div><div><h2>MO-0882 · Oak dining table 180</h2><p>24 units · Hotel Ambiorix · SO-2214</p></div>
      <div class="lot"><span class="pill wip live">Work in progress</span><span class="mono" style="white-space:nowrap">Batch OI-B-2609-14</span></div></div>
    <div class="cost"><div><span>Materials / unit</span><b>€212.40</b></div><div><span>Operations / unit</span><b>€148.00</b></div><div><span>Cost / unit</span><b>€360.40</b></div><div class="mg"><span>Margin at €890</span><b>59.5%</b></div></div>
    <div class="sec"><span>Ingredients (bill of materials)</span><span>Needed · In stock</span></div>
    ${bomRows}
    <div class="sec" style="margin-top:6px"><span>Operations</span><span>21.5 h planned</span></div>
    ${opRows}
    <div class="pol" style="margin:8px 16px 0;border:1px dashed #E6C79F;border-radius:9px;background:#FFF9F1;padding:9px 12px"><b>Felt pads arriving on PO-1043</b><span class="mono">Expected Wed 7 Oct · finishing can start on time</span><span class="pill exp">Expected</span></div>
    <div class="mof"><span class="b2">Open in Shop Floor app</span><span class="b2">Print traveller</span><span class="b2 p" style="margin-left:auto">Complete assembly</span></div>
  </div>
  <div class="card cap">
    <div class="ch"><b>Workstation load · week 41</b><span>Assembly bench 2 is over capacity Tue–Wed</span></div>
    <div class="lgrid"><div class="lh"><span></span><span>Mon 5</span><span>Tue 6</span><span>Wed 7</span><span>Thu 8</span><span>Fri 9</span></div>${loadRows}</div>
  </div>
</div>
</body></html>`;
})();
