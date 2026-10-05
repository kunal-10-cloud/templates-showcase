// Atelier OS · Studio Kaya Interiors — project board by phase, client approval canvas, BOQ schedule, fee stages.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const phases = [
    ["Concept", "#B9A68A", [["Menon Villa", "Sarjapur · 4BHK", "Site survey done", "g1"], ["Café Bloom", "Indiranagar · F&B", "Moodboard v1 sent", "g2"]]],
    ["Design", "#C2683A", [["Rao Residence", "Whitefield · 3BHK", "Render v3 awaiting client", "img:living", 1], ["Iyer 2BHK", "HSR Layout", "Layout approved", "g3"]]],
    ["BOQ & quote", "#7D8B6A", [["Kapoor Penthouse", "Koramangala", "Quote ₹18.6L · viewed 2×", "g4"]]],
    ["Execution", "#4F6B7A", [["Shetty Home", "JP Nagar · week 6 of 10", "False ceiling 20%", "img:kitchen"], ["Nair Clinic", "Basavanagudi · fit-out", "Civil done", "g5"]]],
    ["Handover", "#2F3B33", [["Das Apartment", "Hebbal", "Snag list · 4 open", "img:bedroom"]]]
  ];
  const grads = { g1: "linear-gradient(135deg,#E9DFCF,#C9B79A)", g2: "linear-gradient(135deg,#F1D9CB,#D79C7E)", g3: "linear-gradient(135deg,#E2E4DA,#A9B49A)", g4: "linear-gradient(135deg,#DCE3E6,#8FA3AE)", g5: "linear-gradient(135deg,#E6E1EC,#A59BB8)" };
  const thumb = t => t.startsWith("img:") ? `background:url(img/architecture/${t.slice(4)}.jpg) center/cover` : `background:${grads[t]}`;

  const board = phases.map(([name, col, cards]) => `
    <div class="ph"><div class="phh"><i style="background:${col}"></i>${name}<span>${cards.length}</span></div>
    ${cards.map(([t, s, n, th, sel]) => `<div class="pc${sel ? " sel" : ""}"><b class="th" style="${thumb(th)}"></b><div><strong>${t}</strong><small>${s}</small><em>${n}</em></div></div>`).join("")}
    </div>`).join("");

  // BOQ: cost, markup %, client price — all consistent
  const boq = [
    ["Wardrobe carcass & shutters", "Greenply Club Plus 710 BWP ply 18 mm + acrylic", "Lot", "1,86,000", "15%", "2,13,900", "Approved", "#7D5A3C"],
    ["Soft-close hinges & channels", "Hettich Sensys · 64 nos @ ₹420", "64", "26,880", "20%", "32,256", "Approved", "#9AA0A6"],
    ["Fluted wall panel", "MDF + PU, teak tone · 9.5 m² @ ₹3,800", "9.5 m²", "36,100", "18%", "42,598", "Changes", "#A9744F"],
    ["Bath CP fittings", "Jaquar Opal Prime · 2 sets @ ₹38,500", "2", "77,000", "12%", "86,240", "Client review", "#C9CED3"],
    ["Wall sconces", "Brushed brass · 4 nos @ ₹6,200", "4", "24,800", "20%", "29,760", "2 quotes", "#C9A55C"],
    ["Kitchen countertop", "Quartz, Kalinga Stone · 32 ft² @ ₹950", "32 ft²", "30,400", "15%", "34,960", "Approved", "#E7E3DC"]
  ];
  const st = s => ({ "Approved": "ok", "Changes": "warn", "Client review": "info", "2 quotes": "mute" })[s];
  const boqRows = boq.map(([n, d, q, c, m, p, s, sw]) => `<tr><td><span class="sw" style="background:${sw}"></span><b>${n}</b><small>${d}</small></td><td class="r mono">${c}</td><td class="r mono">${m}</td><td class="r mono b">${p}</td><td><span class="st ${st(s)}">${s}</span></td></tr>`).join("");

  window.LANDINGS.architecture = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Karla:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Karla',sans-serif;color:#2A2622;background:#F4EFE7}
.mono{font-family:'JetBrains Mono',monospace;font-size:11.5px}
.top{height:56px;display:flex;align-items:center;gap:18px;padding:0 22px;background:#FBF8F3;border-bottom:1px solid #E5DCCD}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:32px;height:32px;border-radius:50%;background:#C2683A;color:#FBF8F3;display:grid;place-items:center;font:italic 600 17px 'Playfair Display',serif}
.lg b{display:block;font:600 15px 'Playfair Display',serif}.lg span{font:500 9.5px 'JetBrains Mono',monospace;letter-spacing:.16em;color:#8C7F6E}
.tabs{display:flex;gap:4px;margin-left:16px}.tabs span{padding:7px 12px;border-radius:8px;color:#6B6156;font-weight:600}.tabs span.on{background:#EFE6D8;color:#2A2622}
.sp{flex:1}.ask{border:1px solid #D9C9B3;border-radius:999px;padding:7px 14px;font-weight:700;color:#8E4A27;background:#FBF3EA}.av{width:32px;height:32px;border-radius:50%;background:#4F6B7A;color:#fff;display:grid;place-items:center;font-weight:700;font-size:11px}
.board{height:186px;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding:14px 22px 0}
.ph{background:#FBF8F3;border:1px solid #E5DCCD;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:8px;overflow:hidden}
.phh{display:flex;align-items:center;gap:7px;font:600 12px 'Karla';letter-spacing:.04em;text-transform:uppercase;color:#6B6156}.phh i{width:8px;height:8px;border-radius:50%}.phh span{margin-left:auto;font-family:'JetBrains Mono';color:#A3968A}
.pc{display:flex;gap:9px;align-items:center;padding:5px 7px;border-radius:10px;background:#fff;border:1px solid #EFE6D8}
.pc.sel{border:1.5px solid #C2683A;box-shadow:0 6px 16px rgba(194,104,58,.18)}
.th{width:40px;height:40px;border-radius:8px;flex:none}
.pc strong{display:block;font-size:13px}.pc small{display:block;color:#8C7F6E;font-size:11.5px}.pc em{display:block;font-style:normal;font-size:11.5px;color:#C2683A;font-weight:600}
.main{display:grid;grid-template-columns:808px 1fr;gap:14px;padding:14px 22px}
.card{background:#FBF8F3;border:1px solid #E5DCCD;border-radius:16px;overflow:hidden}
.canvas{height:458px;display:grid;grid-template-columns:1fr 250px}
.stage{position:relative;background:#2A2622}
.stage .img{position:absolute;inset:0;background:url(img/architecture/living.jpg) center/cover}
.bar{position:absolute;left:14px;right:14px;top:14px;display:flex;align-items:center;gap:8px}
.chip{background:rgba(251,248,243,.94);border-radius:999px;padding:5px 11px;font-weight:700;font-size:12px}
.vers{display:flex;background:rgba(42,38,34,.75);border-radius:999px;padding:3px;margin-left:auto}.vers span{color:#D9CFC2;padding:3px 10px;border-radius:999px;font:500 11px 'JetBrains Mono'}.vers span.on{background:#FBF8F3;color:#2A2622}
.pin{position:absolute;width:30px;height:30px;border-radius:50% 50% 50% 4px;background:#C2683A;color:#fff;display:grid;place-items:center;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.35);border:2px solid #FBF8F3}
.pin.done{background:#7D8B6A}
.pin.pulse::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:2px solid #E89A6F;animation:p 1.8s infinite}
@keyframes p{0%{opacity:.9;transform:scale(.7)}100%{opacity:0;transform:scale(1.4)}}
.client{position:absolute;left:14px;right:14px;bottom:14px;background:rgba(251,248,243,.96);border-radius:12px;padding:10px 12px;display:flex;align-items:center;gap:10px}
.client b{font-size:13px}.client small{display:block;color:#8C7F6E}.btn{border-radius:9px;padding:8px 13px;font-weight:700;font-size:12.5px;border:1px solid #D9C9B3;background:#fff;white-space:nowrap}.btn.p{background:#2A2622;color:#FBF8F3;border-color:#2A2622}
.side{padding:14px;display:flex;flex-direction:column;gap:10px;border-left:1px solid #E5DCCD}
.side h3{margin:0;font:600 17px 'Playfair Display',serif}.side .meta{color:#8C7F6E;font-size:12px;margin-top:-6px}
.cm{display:grid;grid-template-columns:22px 1fr;gap:8px;padding:9px;border-radius:10px;background:#fff;border:1px solid #EFE6D8}
.cm i{width:22px;height:22px;border-radius:50%;background:#C2683A;color:#fff;display:grid;place-items:center;font-style:normal;font-weight:700;font-size:11px}
.cm.done{opacity:.6}.cm.done i{background:#7D8B6A}
.cm b{font-size:12px}.cm small{color:#A3968A;font-size:11px}.cm p{margin:3px 0 0;font-size:12.5px}
.reply{border-left:2px solid #E5DCCD;padding-left:8px;margin-top:5px;font-size:12px;color:#6B6156}
.fees{margin-top:14px;padding:14px 16px}
.fh{display:flex;justify-content:space-between;align-items:baseline}.fh h4{margin:0;font:600 16px 'Playfair Display',serif}.fh span{color:#8C7F6E;font-size:12px}
.seg{display:grid;grid-template-columns:15fr 35fr 35fr 15fr;gap:6px;margin-top:12px}
.seg div{border-radius:10px;padding:9px 10px;border:1px solid #E5DCCD;background:#fff}.seg div.paid{background:#EEF1E8;border-color:#C9D1BA}.seg div.inv{background:#FBEBDD;border-color:#EBC3A6}
.seg b{display:block;font-size:12.5px}.seg .mono{display:block;margin-top:2px;font-size:12.5px;color:#2A2622}.seg small{color:#8C7F6E;font-size:11px}
.right{display:flex;flex-direction:column;gap:14px}
.ch{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #EFE6D8}.ch h4{margin:0;font:600 16px 'Playfair Display',serif}.ch span{font-size:12px;color:#8C7F6E}
table{width:100%;border-collapse:collapse}th{text-align:left;font:500 10px 'JetBrains Mono';letter-spacing:.1em;text-transform:uppercase;color:#A3968A;padding:7px 12px;white-space:nowrap;border-bottom:1px solid #EFE6D8}
td{padding:7px 12px;border-bottom:1px solid #F2EBDF;vertical-align:middle}td b{display:block;font-size:12.5px}td small{display:block;color:#8C7F6E;font-size:11px;max-width:220px}
td:first-child{position:relative;padding-left:40px}.sw{position:absolute;left:12px;top:10px;width:20px;height:20px;border-radius:5px;border:1px solid rgba(0,0,0,.08)}
.r{text-align:right}.b{font-weight:600}
.st{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;white-space:nowrap}.st.ok{background:#E6EEDD;color:#4E6A35}.st.warn{background:#FBE3D6;color:#A44A1E}.st.info{background:#E3ECF2;color:#3B6378}.st.mute{background:#EFE9E0;color:#7A6E60}
.tot{display:flex;justify-content:space-between;padding:10px 14px;background:#F6F0E6;font-size:12.5px}.tot b{font-family:'JetBrains Mono';font-size:12.5px}
.site{display:grid;grid-template-columns:150px 1fr;gap:12px;padding:10px 14px}
.site .ph2{border-radius:10px;background:url(img/architecture/kitchen.jpg) center/cover;height:120px}
.tr{display:grid;grid-template-columns:110px 1fr 36px;gap:8px;align-items:center;font-size:12px;margin-top:4px}.tr .t{height:6px;border-radius:3px;background:#EFE6D8;overflow:hidden}.tr .t i{display:block;height:100%;background:#4F6B7A}
</style></head><body>
<div class="top"><div class="lg"><i>K</i><div><b>Studio Kaya Interiors</b><span>ATELIER OS</span></div></div>
<div class="tabs"><span class="on">Projects</span><span>Leads</span><span>Library</span><span>Procurement</span><span>Invoices</span><span>Time</span></div>
<div class="sp"></div><span class="ask">✦ Ask Atelier OS</span><span class="av">AN</span></div>
<div class="board">${board}</div>
<div class="main">
<div>
<div class="card canvas">
<div class="stage"><div class="img"></div>
<div class="bar"><span class="chip">Master bedroom · Render</span><span class="chip" style="color:#A44A1E">● Sent 3 Oct · viewed 4× by Meera</span><div class="vers"><span>v1</span><span>v2</span><span class="on">v3</span></div></div>
<div class="pin pulse" style="left:405px;top:120px">1</div>
<div class="pin" style="left:150px;top:150px">2</div>
<div class="pin done" style="left:300px;top:325px">3</div>
<div class="client"><div style="flex:1"><b>What Meera sees</b><small>Rao Residence · approve each room, or comment on the render</small></div><span class="btn">Request changes</span><span class="btn p">Approve v3</span></div>
</div>
<div class="side"><h3>Rao Residence</h3><div class="meta">Meera &amp; Vikram Rao · 3BHK, Prestige Lakeside, Whitefield</div>
<div class="cm"><i>1</i><div><b>Meera R. · client</b> <small>2h</small><p>Love it. Can the fluted panel go one shade warmer, closer to teak?</p><div class="reply"><b>Ananya</b> · Updating the panel in the BOQ; v4 tonight.</div></div></div>
<div class="cm"><i>2</i><div><b>Arjun · designer</b> <small>yesterday</small><p>Swapping sconces to brushed brass to match the Jaquar fittings.</p></div></div>
<div class="cm done"><i>3</i><div><b>Vikram R. · client</b> <small>Resolved</small><p>Rug to 8×10, please.</p></div></div>
</div></div>
<div class="card fees"><div class="fh"><h4>Design fee · ₹4,80,000 + 18% GST</h4><span>stage billing · Rao Residence</span></div>
<div class="seg"><div class="paid"><b>Concept</b><span class="mono">₹72,000</span><small>15% · paid 12 Aug</small></div><div class="inv"><b>Design development</b><span class="mono">₹1,68,000</span><small>35% · invoiced, due 10 Oct</small></div><div><b>Execution supervision</b><span class="mono">₹1,68,000</span><small>35% · on site start</small></div><div><b>Handover</b><span class="mono">₹72,000</span><small>15%</small></div></div></div>
</div>
<div class="right">
<div class="card"><div class="ch"><h4>BOQ · product schedule</h4><span>Rao Residence · 6 of 38 items</span></div>
<table><tr><th>Item</th><th class="r">Vendor ₹</th><th class="r">Markup</th><th class="r">Client ₹</th><th>Client</th></tr>${boqRows}</table>
<div class="tot"><span>Cost <b>₹3,81,180</b></span><span>Client price <b>₹4,39,714</b></span><span>Margin <b style="color:#4E6A35">₹58,534</b></span></div></div>
<div class="card"><div class="ch"><h4>On site · Shetty Home</h4><span>week 6 of 10 · JP Nagar</span></div>
<div class="site"><div class="ph2"></div><div>
<div class="tr"><span>Civil &amp; demolition</span><span class="t"><i style="width:100%"></i></span><span class="mono">100%</span></div>
<div class="tr"><span>Electrical</span><span class="t"><i style="width:60%"></i></span><span class="mono">60%</span></div>
<div class="tr"><span>Modular kitchen</span><span class="t"><i style="width:45%"></i></span><span class="mono">45%</span></div>
<div class="tr"><span>False ceiling</span><span class="t"><i style="width:20%"></i></span><span class="mono">20%</span></div>
<div class="tr"><span>Painting</span><span class="t"><i style="width:0%"></i></span><span class="mono">0%</span></div>
<div style="margin-top:9px;font-size:12px;color:#6B6156">Today: Hettich channels delivered · PO-0412 · site photo by Ravi</div>
</div></div></div>
</div></div>
</body></html>`;
})();
