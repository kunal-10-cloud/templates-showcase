// Retail POS · Sharma General Store (kirana, Delhi): counter billing with a customer-facing UPI display.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  // deterministic pseudo-QR (finder squares + seeded modules)
  function qr(n, px) {
    let s = 7, cells = "";
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const finder = (r, c) => {
      const inF = (r0, c0) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
      const f = inF(0, 0) ? [0, 0] : inF(0, n - 7) ? [0, n - 7] : inF(n - 7, 0) ? [n - 7, 0] : null;
      if (!f) return null;
      const rr = r - f[0], cc = c - f[1];
      return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
    };
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const f = finder(r, c);
      const on = f === null ? rnd() > 0.52 : f;
      if (on) cells += `<i style="left:${c * px}px;top:${r * px}px"></i>`;
    }
    return `<div class="qr" style="width:${n * px}px;height:${n * px}px">${cells}<b></b></div>`;
  }

  const tiles = [
    ["rice", "Basmati rice", "loose", "₹110/kg"],
    ["dal", "Masoor dal", "loose", "₹96/kg"],
    ["onion", "Onion", "fresh", "₹40/kg"],
    ["atta", "Chakki atta", "loose", "₹42/kg"],
    ["oil", "Mustard oil 1 L", "Dune Aura", "₹195"],
    ["salt", "Tata Salt 1 kg", "packet", "₹28"]
  ];
  const cart = [
    ["rice", "Basmati rice", "loose · weighed", "2.000 kg", "—", "110.00", "0%", "220.00"],
    ["dal", "Masoor dal", "loose · weighed", "1.250 kg", "—", "96.00", "0%", "120.00", "new"],
    ["onion", "Onion", "fresh produce", "2.000 kg", "—", "40.00", "0%", "80.00"],
    ["oil", "Dune Aura mustard oil", "1 L · 8906149…", "1", "210.00", "195.00", "5%", "195.00"],
    ["salt", "Tata Salt", "1 kg · 8904043…", "1", "28.00", "28.00", "0%", "28.00"],
    ["parle", "Parle-G Gold", "800 g · 8901719…", "1", "90.00", "85.00", "5%", "85.00"],
    ["sugar", "Mishri (rock sugar)", "loose · weighed", "0.500 kg", "—", "120.00", "5%", "60.00"]
  ];
  const thumb = (k) => k === "parle"
    ? `<span class="th pk">Parle<br>G</span>`
    : `<img class="th" src="img/retail/${k}.jpg" alt="">`;

  window.LANDINGS.retail = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Orbitron:wght@600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#FBF4E6;color:#1E2320;font:14px/1.4 'Mukta',system-ui,sans-serif}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:58px;background:#0E4D3A;color:#F6EFE0;display:flex;align-items:center;gap:18px;padding:0 22px;position:relative}
.top:after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:6px;background:repeating-linear-gradient(90deg,#F29F05 0 18px,#0E4D3A 18px 22px,#C2410C 22px 40px,#0E4D3A 40px 44px)}
.sign{display:flex;align-items:center;gap:11px}.sign i{width:38px;height:38px;border-radius:50%;background:#F29F05;color:#0E4D3A;display:grid;place-items:center;font:800 21px 'Mukta';font-style:normal;box-shadow:0 0 0 3px rgba(242,159,5,.25)}
.sign b{display:block;font-size:17px;font-weight:800;letter-spacing:.01em;line-height:1.1}.sign span{font:500 10.5px 'JetBrains Mono';letter-spacing:.12em;color:#A9D3C2}
.tabs{display:flex;gap:4px;margin-left:16px}.tabs span{padding:7px 13px;border-radius:9px;color:#CFE6DC;font-weight:600}.tabs span.on{background:#F6EFE0;color:#0E4D3A}
.tabs em{font-style:normal;font-size:11px;background:#C2410C;color:#fff;border-radius:8px;padding:0 6px;margin-left:5px}
.tr{margin-left:auto;display:flex;align-items:center;gap:14px;font-size:13px;color:#CFE6DC}.tr .clk{font:700 20px 'JetBrains Mono';color:#fff}
.ask{background:#F29F05;color:#1E2320;border-radius:9px;padding:7px 12px;font-weight:700}
.wrap{display:grid;grid-template-columns:292px 1fr 404px;gap:16px;padding:20px 20px 0;height:574px}
.wrap>.card{overflow:hidden}
.card{background:#fff;border:1px solid #EADFC8;border-radius:16px;box-shadow:0 1px 0 rgba(30,35,32,.04);min-width:0}
.h{display:flex;justify-content:space-between;align-items:center;padding:10px 14px 6px}.h b{font-size:15px;font-weight:700}.h span{font-size:12px;color:#7A7465}
/* left */
.scan{margin:0 14px 8px;border:2px solid #0E4D3A;border-radius:12px;padding:9px 11px;display:flex;align-items:center;gap:9px;font-size:13.5px;color:#7A7465;background:#F6FBF8}
.scan .bc{width:26px;height:18px;background:repeating-linear-gradient(90deg,#0E4D3A 0 2px,transparent 2px 4px,#0E4D3A 4px 5px,transparent 5px 7px)}
.beep{margin:-2px 14px 10px;font-size:12px;color:#0E4D3A;display:flex;gap:6px;align-items:center}.beep:before{content:"";width:7px;height:7px;border-radius:50%;background:#16A34A;box-shadow:0 0 0 3px #DCFCE7}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 14px}
.tile{border:1px solid #EADFC8;border-radius:12px;overflow:hidden;background:#FFFCF5;position:relative}
.tile img{width:100%;height:46px;object-fit:cover;display:block}.tile div{padding:4px 8px 5px}.tile b{display:block;font-size:13px;line-height:1.15}.tile small{color:#7A7465;font-size:11.5px}
.tile .p{position:absolute;right:6px;top:6px;background:rgba(30,35,32,.78);color:#fff;font:700 11px 'JetBrains Mono';padding:2px 6px;border-radius:6px}
.tile.sel{outline:2.5px solid #F29F05;outline-offset:-1px}
.scale{margin:10px 14px 0;border-radius:14px;background:#1E2320;color:#E9F5EE;padding:9px 12px}
.scale .r{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#9FB8AD}.scale .r em{font-style:normal;color:#4ADE80}
.lcd{margin:4px 0 3px;background:#0B2A1F;border-radius:9px;padding:6px 12px;text-align:right;font:600 26px 'Orbitron';color:#7CFFB2;letter-spacing:.04em;text-shadow:0 0 12px rgba(124,255,178,.45)}
.lcd small{font:600 13px 'Orbitron';color:#4BAF7C;margin-left:6px}
.scale .m{display:flex;justify-content:space-between;font-size:13px}.scale .m b{color:#fff;font-family:'JetBrains Mono'}
/* bill */
.bill{display:flex;flex-direction:column;overflow:hidden}
.bh{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px dashed #E4D7BC}
.bh b{font-size:16px}.bh .mono{font-size:12px;color:#7A7465}
.cust{display:flex;align-items:center;gap:8px;background:#F6EFE0;border-radius:999px;padding:4px 12px 4px 4px;font-size:13px}.cust i{width:26px;height:26px;border-radius:50%;background:#C2410C;color:#fff;display:grid;place-items:center;font:700 11px 'Mukta';font-style:normal}
table{width:100%;border-collapse:collapse}th{font:600 10.5px 'JetBrains Mono';letter-spacing:.08em;text-transform:uppercase;color:#9A917D;text-align:left;padding:8px 10px;border-bottom:1px solid #EFE6D3}
td{padding:4px 10px;border-bottom:1px solid #F4EDDD;font-size:13.5px;vertical-align:middle}td.n{text-align:right;font-family:'JetBrains Mono';font-size:12.5px}th.n{text-align:right}
.it{display:flex;align-items:center;gap:10px}.th{width:32px;height:32px;border-radius:8px;object-fit:cover;flex:none}.pk{display:grid;place-items:center;background:#FDE68A;color:#B91C1C;font:800 10px/1 'Mukta';text-align:center;border:1px solid #F59E0B}
.it b{display:block;font-size:13.5px;line-height:1.15}.it small{color:#8C846F;font-size:11.5px}
.mrp{color:#9A917D;text-decoration:line-through}.g{font:600 11px 'JetBrains Mono';padding:1px 6px;border-radius:5px;background:#F1F5F2;color:#3F6B57}.g.t{background:#FEF3C7;color:#92400E}
tr.new td{background:#FFFBEB}tr.new .it b:after{content:"from scale";margin-left:6px;font:600 10px 'JetBrains Mono';color:#B45309;background:#FEF3C7;padding:1px 5px;border-radius:4px}
.sum{margin-top:auto;display:grid;grid-template-columns:1fr 250px;gap:16px;padding:9px 16px;background:#FFFCF5;border-top:1px dashed #E4D7BC}
.gst{font-size:12.5px;color:#5E5848;display:grid;grid-template-columns:1fr auto;gap:2px 12px}.gst span:nth-child(even){font-family:'JetBrains Mono';text-align:right;color:#1E2320}
.save{grid-column:1/-1;margin-top:4px;color:#15803D;font-weight:700}
.tot{text-align:right}.tot small{display:block;color:#7A7465;font-size:12px}.tot b{font:800 40px/1 'Mukta';letter-spacing:-.01em}
.pay{display:flex;gap:8px;padding:0 16px 12px;background:#FFFCF5}
.pb{flex:1;border:1.5px solid #E4D7BC;border-radius:11px;padding:5px 10px;background:#fff}.pb small{display:block;font-size:11px;color:#7A7465;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.pb b{font:700 16px 'JetBrains Mono'}
.pb.ok{border-color:#16A34A;background:#F0FDF4}.pb.ok small:after{content:" ✓";color:#16A34A}
.pb.wait{border-color:#F29F05;background:#FFFBEB;box-shadow:0 0 0 3px rgba(242,159,5,.15)}.pb.wait small:after{content:" · waiting";color:#B45309}
.pb.ghost{border-style:dashed;color:#7A7465}
/* right: customer display */
.stand{position:relative;padding-top:4px}
.disp{background:#16110B;border-radius:22px;padding:12px;box-shadow:0 18px 40px rgba(30,35,32,.25)}
.scr{background:linear-gradient(180deg,#FFF8EA,#FFFFFF);border-radius:13px;padding:12px 16px;position:relative;overflow:hidden}
.scr .st{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#7A7465}.scr .st b{color:#0E4D3A;font-size:14px}
.scr .big{display:flex;justify-content:space-between;align-items:flex-end;margin:6px 0 10px}.scr .big b{font:800 30px 'Mukta'}.scr .big span{font-size:12.5px;color:#15803D;font-weight:600}
.qrbox{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;background:#fff;border:1px solid #EADFC8;border-radius:12px;padding:11px}
.qr{position:relative;background:#fff}.qr i{position:absolute;width:5px;height:5px;background:#16110B}
.qr b{position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;background:#F29F05;border:3px solid #fff;border-radius:7px}
.amt small{display:block;font-size:12px;color:#7A7465}.amt b{display:block;font:800 26px 'Mukta';color:#0E4D3A;line-height:1.1}
.apps{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px}.apps span{font:700 10.5px 'Mukta';border:1px solid #E4D7BC;border-radius:6px;padding:1px 6px;color:#3F3A2E}
.upi{font:500 11px 'JetBrains Mono';color:#7A7465;margin-top:5px}
.wait{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;color:#92400E;font-weight:600}.wait i{width:9px;height:9px;border-radius:50%;background:#F29F05;animation:p 1.4s infinite}
@keyframes p{0%,100%{box-shadow:0 0 0 0 rgba(242,159,5,.6)}50%{box-shadow:0 0 0 7px rgba(242,159,5,0)}}
.neck{width:70px;height:18px;margin:0 auto;background:linear-gradient(#2B241B,#16110B)}.foot{width:170px;height:10px;margin:0 auto;border-radius:0 0 10px 10px;background:#2B241B}
.lbl{position:absolute;right:14px;top:12px;z-index:2;color:#6B5E48;font:600 10px 'JetBrains Mono';letter-spacing:.12em;color:#9A917D}
.kc{margin-top:12px;padding:12px 14px;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}
.kc i{width:36px;height:36px;border-radius:50%;background:#C2410C;color:#fff;display:grid;place-items:center;font:700 13px 'Mukta';font-style:normal}
.kc b{display:block}.kc small{color:#7A7465;font-size:12px}.kc .bal{text-align:right}.kc .bal b{font:700 17px 'JetBrains Mono';color:#B91C1C}
.wa{margin:10px 0 0;padding:10px 12px;display:flex;gap:10px;align-items:center;background:#ECFDF3;border:1px solid #BBF7D0;border-radius:12px;font-size:12.5px;color:#14532D}
.wa .tg{margin-left:auto;width:34px;height:20px;border-radius:999px;background:#16A34A;position:relative;flex:none}.wa .tg:after{content:"";position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}
.wa .ic{width:28px;height:28px;border-radius:50%;background:#25D366;color:#fff;display:grid;place-items:center;font:800 12px 'Mukta';flex:none}
/* bottom */
.bot{display:grid;grid-template-columns:1.15fr 1fr 1fr;gap:16px;padding:14px 20px 0}
.bot .card{height:224px;overflow:hidden}
.row{display:grid;grid-template-columns:28px 1fr auto auto;gap:9px;align-items:center;padding:5px 14px;border-top:1px solid #F4EDDD;font-size:13px}
.row i{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font:700 11px 'Mukta';font-style:normal}
.row small{color:#7A7465;font-size:11.5px;display:block}.row .v{font:700 13px 'JetBrains Mono'}
.chip{font:600 10.5px 'JetBrains Mono';padding:2px 7px;border-radius:6px;white-space:nowrap}.chip.r{background:#FEE2E2;color:#B91C1C}.chip.a{background:#FEF3C7;color:#92400E}.chip.gr{background:#DCFCE7;color:#166534}
.btn{display:inline-flex;align-items:center;gap:6px;border-radius:9px;padding:6px 11px;font-weight:700;font-size:12.5px;border:1.5px solid #0E4D3A;color:#0E4D3A;background:#fff}.btn.p{background:#0E4D3A;color:#fff}
.cta{display:flex;justify-content:space-between;align-items:center;padding:6px 14px;border-top:1px solid #F4EDDD;font-size:12.5px;color:#5E5848}
.dv{padding:0 14px;display:grid;grid-template-columns:1fr auto;gap:3px 10px;font-size:13px}.dv span:nth-child(even){font-family:'JetBrains Mono';text-align:right}
.dv .eq{border-top:1px dashed #D9CDB2;padding-top:4px;font-weight:700}.dv .eq+span{border-top:1px dashed #D9CDB2;padding-top:4px;font-weight:700;color:#0E4D3A}
.tend{display:flex;gap:6px;padding:8px 14px 0}.tend div{flex:1;background:#FBF4E6;border-radius:9px;padding:5px 8px}.tend small{display:block;font-size:10.5px;color:#7A7465;text-transform:uppercase;letter-spacing:.05em;font-weight:600}.tend b{font:700 13px 'JetBrains Mono'}
.hindi{font-weight:600;color:#C2410C;margin-left:4px}
</style></head><body>
<div class="top"><div class="sign"><i>श</i><div><b>Sharma General Store</b><span>RETAIL POS · LAJPAT NAGAR, DELHI</span></div></div>
<div class="tabs"><span class="on">Billing</span><span>Khata<em>27</em></span><span>Stock<em>3</em></span><span>Purchase</span><span>Reports</span></div>
<div class="tr"><span>Counter 1 · Ramesh</span><span class="clk">18:42</span><span class="ask">✦ Ask Retail POS</span></div></div>

<div class="wrap">
<div class="card" style="padding-bottom:14px">
<div class="h"><b>Add items</b><span>F2 · scan</span></div>
<div class="scan"><span class="bc"></span>Scan barcode or type “parle”, “atta”…</div>
<div class="beep">Beep · 8901719… Parle-G Gold 800 g added</div>
<div class="tiles">${tiles.map(([k, n, s, p], i) => `<div class="tile${k === "dal" ? " sel" : ""}"><img src="img/retail/${k}.jpg" alt=""><span class="p">${p}</span><div><b>${n}</b><small>${s}</small></div></div>`).join("")}</div>
<div class="scale"><div class="r"><span>Weighing scale · USB</span><em>● stable</em></div>
<div class="lcd">1.250<small>KG</small></div>
<div class="m"><span>Masoor dal × ₹96.00/kg</span><b>₹120.00</b></div></div>
</div>

<div class="card bill">
<div class="bh"><div><b>Bill</b> <span class="mono">#SGS-2610-0148</span></div><div class="cust"><i>SV</i>Sunita Verma · regular</div></div>
<table><tr><th>Item</th><th class="n">Qty</th><th class="n">MRP</th><th class="n">Rate</th><th>GST</th><th class="n">Amount</th></tr>
${cart.map(([k, n, s, q, m, r, g, a, nw]) => `<tr class="${nw || ""}"><td><div class="it">${thumb(k)}<div><b>${n}</b><small class="mono">${s}</small></div></div></td><td class="n">${q}</td><td class="n ${m !== "—" ? "mrp" : ""}">${m}</td><td class="n">${r}</td><td><span class="g${g === "5%" ? " t" : ""}">${g === "0%" ? "Exempt" : g}</span></td><td class="n"><b>${a}</b></td></tr>`).join("")}
</table>
<div class="sum"><div class="gst">
<span>Exempt items (loose staples, produce, salt)</span><span>₹448.00</span>
<span>Taxable value @ 5%</span><span>₹323.81</span>
<span>CGST 2.5% + SGST 2.5%</span><span>₹8.10 + ₹8.09</span>
<span class="save">You saved ₹20.00 on MRP today</span></div>
<div class="tot"><small>7 items · GST incl.</small><b>₹788.00</b></div></div>
<div class="pay"><div class="pb ok"><small>Cash</small><b>₹300.00</b></div><div class="pb wait"><small>UPI</small><b>₹488.00</b></div><div class="pb ghost"><small>Card</small><b>—</b></div><div class="pb ghost"><small>Khata</small><b>—</b></div></div>
</div>

<div style="min-width:0">
<div class="stand"><div class="disp"><div class="scr">
<div class="st"><b>Sharma General Store</b><span>Bill #0148 · customer display</span></div>
<div class="big"><b>₹788.00</b><span>Cash received ₹300 ✓</span></div>
<div class="qrbox">${qr(25, 5)}<div class="amt"><small>Scan to pay balance</small><b>₹488.00</b><div class="apps"><span>GPay</span><span>PhonePe</span><span>Paytm</span><span>BHIM</span></div><div class="upi">sharmags@okaxis</div></div></div>
<div class="wait"><i></i>Waiting for UPI payment… sound box will announce</div>
</div></div><div class="neck"></div><div class="foot"></div></div>
<div class="card kc"><i>SV</i><div><b>Sunita Verma</b><small>+91 98110 •••42 · 3 visits this week</small></div><div class="bal"><small>Khata balance</small><b>₹1,240</b></div></div>
<div class="wa"><span class="ic">WA</span><span><b>Send bill on WhatsApp</b><br>PDF with GST breakup + khata balance</span><span class="tg"></span></div>
</div>
</div>

<div class="bot">
<div class="card"><div class="h"><b>Khata<span class="hindi">· उधार</span></b><span>₹38,450 due · 27 customers</span></div>
<div class="row"><i style="background:#7C3AED">RK</i><div>Ravi Kumar<small>last paid 24 Aug</small></div><span class="chip r">42 days</span><span class="v">₹4,860</span></div>
<div class="row"><i style="background:#0E7490">MA</i><div>Meena Aunty (B-14)<small>last paid 17 Sep</small></div><span class="chip a">18 days</span><span class="v">₹2,310</span></div>
<div class="row"><i style="background:#C2410C">SV</i><div>Sunita Verma<small>last paid 29 Sep</small></div><span class="chip gr">6 days</span><span class="v">₹1,240</span></div>
<div class="cta"><span>5 customers past 15 days</span><span class="btn p">Remind on WhatsApp (5)</span></div></div>

<div class="card"><div class="h"><b>Low stock</b><span>reorder from Gupta Traders</span></div>
<div class="row"><i style="background:#E11D48">TS</i><div>Tata Salt 1 kg<small>6 left · reorder 48 @ ₹24.50</small></div><span class="chip r">6</span><span class="v">₹1,176</span></div>
<div class="row"><i style="background:#CA8A04">MO</i><div>Mustard oil 1 L<small>4 left · reorder 24 @ ₹168.00</small></div><span class="chip r">4</span><span class="v">₹4,032</span></div>
<div class="row"><i style="background:#B45309">PG</i><div>Parle-G Gold 800 g<small>9 left · reorder 36 @ ₹76.00</small></div><span class="chip a">9</span><span class="v">₹2,736</span></div>
<div class="cta"><span>Purchase order · 3 items</span><span class="btn p">Send PO · ₹7,944</span></div></div>

<div class="card"><div class="h"><b>Day close · cash drawer</b><span>148 bills today</span></div>
<div class="dv"><span>Opening cash</span><span>₹2,000</span><span>+ Cash sales</span><span>₹14,620</span><span>− Payouts (milk vendor)</span><span>₹500</span><span class="eq">Expected in drawer</span><span>₹16,120</span></div>
<div class="tend"><div><small>UPI</small><b>₹22,480</b></div><div><small>Card</small><b>₹3,150</b></div><div><small>Khata</small><b>₹1,860</b></div><div><small>Total</small><b>₹42,110</b></div></div>
<div class="cta"><span>Make it yours: add a second counter</span><span class="btn">Count &amp; close</span></div></div>
</div>
</body></html>`;
})();
