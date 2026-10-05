// Kitchen OS · Saffron Table: landscape tablet POS with kitchen display, modelled on Toast / Square for Restaurants.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const items = [
    ["butter-chicken", "Butter chicken", "£15.50", 2, true],
    ["biryani", "Lamb biryani", "£17.50", 1, false],
    ["paneer-tikka", "Paneer tikka", "£9.50", 1, false],
    ["dal", "Dal makhani", "£11.00", 1, false],
    ["samosa", "Samosa chaat", "£7.50", 1, false],
    ["naan", "Garlic naan", "£3.50", 3, false],
    ["lassi", "Mango lassi", "£4.50", 2, false],
    ["gulab-jamun", "Gulab jamun", "£6.50", 0, false]
  ];
  const tiles = [["Lamb rogan josh", "£16.50", "#C2410C", false], ["Chana masala", "£11.00", "#A16207", false], ["Saag paneer", "£12.50", "#15803D", true], ["Malai kofta", "£13.00", "#9F1239", false]];
  const groups = [["Starters", 9, "#F59E2B"], ["Tandoor", 7, "#E5484D"], ["Curries", 12, "#F59E2B", true], ["Biryani", 5, "#A78BFA"], ["Breads", 6, "#FBBF24"], ["Rice & sides", 8, "#34D399"], ["Desserts", 5, "#F472B6"], ["Drinks", 14, "#38BDF8"], ["Bar", 22, "#94A3B8"]];

  const card = ([img, name, price, qty, sel]) => `<div class="it${sel ? " sel" : ""}"><div class="ph" style="background-image:url(img/food/${img}.jpg)"></div>${qty ? `<b class="q">${qty}</b>` : ""}<div class="nm"><span>${name}</span><em>${price}</em></div></div>`;
  const tile = ([n, p, c, out]) => `<div class="tl${out ? " out" : ""}" style="--c:${c}"><span>${n}</span><em>${out ? "86'd · back 20:30" : p}</em></div>`;

  const line = (q, n, seat, price, mods, state) => `<div class="ln${state === "done" ? " done" : ""}"><span class="lq">${q}</span><div class="ld"><b>${n}</b>${mods ? `<small>${mods}</small>` : ""}</div><span class="st">${seat}</span><span class="lp">${price}</span></div>`;

  const tickets = [
    ["g", "Table 7", "Dine in", "03:12", "Ali", [["2", "Paneer tikka", ""], ["1", "Chicken 65", "extra lemon"]], "t-din"],
    ["a", "Deliveroo", "A82", "08:45", "Rider 6 min", [["1", "Lamb biryani", "raita on side"], ["2", "Garlic naan", ""]], "t-dr"],
    ["r", "Table 4", "Dine in", "14:20", "Priya", [["2", "Butter chicken", "1 hot, 1 medium"], ["1", "Dal makhani", ""], ["3", "Plain naan", ""]], "t-din"],
    ["g", "Uber Eats", "U31", "05:02", "Pickup 19:55", [["1", "Chicken korma", ""], ["1", "Pilau rice", ""]], "t-ue"],
    ["g", "Collection", "Sam", "02:10", "Paid online", [["1", "Thali for two", "veg"]], "t-col"]
  ];
  const tk = ([tone, t, sub, time, foot, ls, cls]) => `<div class="tk ${cls}"><div class="th ${tone}"><span><b>${t}</b> ${sub}</span><span class="tm">${time}</span></div><div class="tb">${ls.map(([q, n, m], i) => `<div class="tr${i === 0 && tone === "g" && t === "Table 7" ? " ok" : ""}"><span>${q}</span><div><b>${n}</b>${m ? `<small>${m}</small>` : ""}</div></div>`).join("")}</div><div class="tf">${foot}</div></div>`;

  window.LANDINGS.restaurant = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#0E0F12;color:#F2EFEA;font:14px/1.35 'Manrope',system-ui,sans-serif}
.top{height:58px;display:flex;align-items:center;gap:18px;padding:0 18px;background:#15171B;border-bottom:1px solid #24272E}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:32px;height:32px;border-radius:9px;background:linear-gradient(145deg,#F7A93B,#E07B0E);display:grid;place-items:center;font-style:normal;font-weight:800;color:#1A0E02}
.lg b{display:block;font-size:14.5px}.lg small{color:#8E929B;font-size:11.5px}
.tabs{display:flex;gap:4px;margin-left:12px}.tabs span{padding:8px 14px;border-radius:9px;color:#A9ADB6;font-weight:600;font-size:13.5px;display:flex;gap:7px;align-items:center}
.tabs span.on{background:#F2EFEA;color:#121316}.tabs em{font-style:normal;background:#E5484D;color:#fff;font-size:11px;font-weight:800;border-radius:9px;padding:0 6px;line-height:17px}
.rt{margin-left:auto;display:flex;align-items:center;gap:12px}.pill{border:1px solid #2C3038;border-radius:999px;padding:5px 11px;font-size:12px;font-weight:700;color:#C9CCD3}
.pill.r{border-color:#5A2427;color:#FF8A8D;background:#2A1416}.who{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600}.who i{width:28px;height:28px;border-radius:50%;background:#7C5CFF;display:grid;place-items:center;font-style:normal;font-size:11px;font-weight:800}
.clock{font-size:20px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.em{font-size:11px;color:#6E727B;font-weight:600;letter-spacing:.02em}
.wrap{display:grid;grid-template-columns:168px 1fr 410px;grid-template-rows:1fr 262px;height:842px}
.gr{grid-row:1;padding:14px 10px;display:flex;flex-direction:column;gap:6px;border-right:1px solid #22252B;background:#121317}
.gr .h{font-size:11px;font-weight:700;letter-spacing:.1em;color:#6E727B;padding:2px 8px 6px}
.g{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;font-weight:700;font-size:13.5px;color:#D5D7DC}
.g i{width:4px;height:22px;border-radius:2px;background:var(--c)}.g span{margin-left:auto;font-size:11.5px;color:#6E727B;font-weight:600}
.g.on{background:#23262D;color:#fff;box-shadow:inset 0 0 0 1px #33373F}
.mid{grid-row:1;padding:14px 16px 12px;display:flex;flex-direction:column;gap:11px;min-width:0}
.mh{display:flex;align-items:center;gap:10px}.mh .bc{font-size:13px;color:#8E929B}.mh .bc b{color:#F2EFEA;font-size:16px}
.sr{margin-left:auto;width:230px;border:1px solid #2C3038;background:#17191E;border-radius:10px;padding:8px 12px;color:#6E727B;font-size:13px}
.seat{background:#2A1F12;color:#F7B252;border-radius:999px;padding:5px 11px;font-size:12px;font-weight:800}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.it{position:relative;height:150px;border-radius:14px;overflow:hidden;background:#1B1D22}
.it .ph{position:absolute;inset:0;background-size:cover;background-position:center}
.it:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(10,10,12,.85))}
.it .nm{position:absolute;left:10px;right:10px;bottom:9px;z-index:2;display:flex;justify-content:space-between;align-items:flex-end;gap:6px}
.it .nm span{font-weight:800;font-size:14px;line-height:1.15;text-shadow:0 1px 2px rgba(0,0,0,.5)}.it .nm em{font-style:normal;font-weight:800;font-size:13px;background:rgba(14,15,18,.75);border-radius:7px;padding:2px 7px}
.it .q{position:absolute;top:8px;left:8px;z-index:2;min-width:26px;height:26px;border-radius:13px;background:#F59E2B;color:#1A0E02;font-size:13px;display:grid;place-items:center;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,.4)}
.it.sel{box-shadow:0 0 0 3px #F59E2B,0 10px 30px rgba(245,158,43,.25)}
.tl{height:64px;border-radius:12px;background:#1B1D22;border:1px solid #262930;border-left:4px solid var(--c);padding:9px 12px;display:flex;flex-direction:column;justify-content:space-between}
.tl span{font-weight:800;font-size:13.5px}.tl em{font-style:normal;color:#A9ADB6;font-weight:700;font-size:12.5px}
.tl.out{opacity:.55;background:repeating-linear-gradient(135deg,#1B1D22 0 10px,#202228 10px 20px)}.tl.out em{color:#FF8A8D}
.mods{margin-top:auto;background:#17191E;border:1px solid #262930;border-radius:14px;padding:12px 14px;display:grid;grid-template-columns:1.1fr 1.5fr auto;gap:14px;align-items:start}
.mods .t{font-size:11px;font-weight:700;letter-spacing:.08em;color:#8E929B;margin-bottom:7px}.mods .t em{font-style:normal;color:#FF8A8D;margin-left:6px}
.opts{display:flex;flex-wrap:wrap;gap:6px}.o{border:1px solid #30343C;border-radius:9px;padding:6px 10px;font-weight:700;font-size:12.5px;color:#D5D7DC}.o.on{background:#F59E2B;border-color:#F59E2B;color:#1A0E02}.o small{color:#8E929B;font-weight:600;margin-left:4px}.o.on small{color:#4A2A05}
.mb{display:flex;flex-direction:column;gap:6px}.btn{border-radius:10px;padding:10px 16px;font-weight:800;font-size:13px;text-align:center;background:#2A2D34;color:#F2EFEA}.btn.p{background:#F2EFEA;color:#121316}
.ck{grid-row:1/3;grid-column:3;background:#F4F1EC;color:#17181B;display:flex;flex-direction:column;min-height:0}
.ckh{padding:14px 18px 10px;border-bottom:1px solid #E2DDD5}.ckh .r1{display:flex;align-items:center;justify-content:space-between}.ckh h2{margin:0;font-size:24px;font-weight:800;letter-spacing:-.02em}
.din{background:#E7F0FF;color:#1D4ED8;border-radius:999px;padding:4px 10px;font-size:11.5px;font-weight:800}.ckh p{margin:2px 0 10px;color:#6B6760;font-size:12.5px}
.seats{display:flex;gap:6px}.seats span{border:1px solid #D8D2C8;border-radius:9px;padding:5px 11px;font-weight:800;font-size:12.5px;color:#4B4842}.seats span.on{background:#17181B;border-color:#17181B;color:#F4F1EC}
.lines{flex:1;overflow:hidden;padding:4px 0}
.cs{display:flex;justify-content:space-between;align-items:center;padding:9px 18px 5px;font-size:11px;font-weight:800;letter-spacing:.08em;color:#6B6760}
.cs i{font-style:normal;font-size:11px;letter-spacing:.02em;border-radius:999px;padding:2px 8px}.cs i.s{background:#DDF1E4;color:#15803D}.cs i.h{background:#FDEBD0;color:#B45309}.cs i.n{background:#E9E5DE;color:#6B6760}
.ln{display:grid;grid-template-columns:22px 1fr auto 66px;gap:8px;align-items:start;padding:5px 18px}.ln .lq{font-weight:800}.ln b{font-weight:700;font-size:13.5px}.ln small{display:block;color:#7A766F;font-size:12px}
.ln .st{font-size:11px;font-weight:800;color:#6B6760;background:#E9E5DE;border-radius:6px;padding:2px 6px;margin-top:1px}.ln .lp{text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
.ln.done b,.ln.done .lq{color:#8C877F}
.al{margin:6px 18px 2px;background:#FDE8E8;color:#B42318;border-radius:9px;padding:7px 10px;font-size:12.5px;font-weight:700}
.tot{border-top:1px dashed #D8D2C8;padding:10px 18px 6px;display:flex;flex-direction:column;gap:3px;font-size:13px;color:#4B4842}.tot div{display:flex;justify-content:space-between;font-variant-numeric:tabular-nums}
.tot .big{font-size:20px;font-weight:800;color:#17181B;margin-top:3px}.tot .vat{font-size:11.5px;color:#8C877F}
.sm{display:flex;gap:6px;padding:6px 18px 0}.sm span{flex:1;text-align:center;border:1px solid #D8D2C8;border-radius:9px;padding:7px 0;font-weight:800;font-size:12px;color:#4B4842}
.act{display:grid;grid-template-columns:1fr 1.2fr 1.5fr;gap:8px;padding:10px 18px 16px}
.act span{border-radius:12px;padding:15px 0;text-align:center;font-weight:800;font-size:14.5px}
.a1{background:#17181B;color:#F4F1EC}.a2{background:#F59E2B;color:#1A0E02}.a3{background:#159A5C;color:#fff}
.kds{grid-row:2;grid-column:1/3;background:#0A0B0D;border-top:1px solid #22252B;padding:12px 16px 14px;display:grid;grid-template-columns:1fr 196px;gap:14px;min-width:0}
.kh{display:flex;align-items:center;gap:10px;margin-bottom:9px}.kh b{font-size:14px}.kh .lv{width:8px;height:8px;border-radius:50%;background:#2BB673;box-shadow:0 0 0 4px rgba(43,182,115,.15);animation:p 1.6s infinite}@keyframes p{50%{opacity:.35}}
.kh .pill{font-size:11.5px;padding:3px 9px}
.tks{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}
.tk{background:#16181C;border-radius:11px;overflow:hidden;display:flex;flex-direction:column;height:184px;border:1px solid #23262C}
.th{display:flex;justify-content:space-between;align-items:center;gap:6px;padding:7px 9px;font-size:11.5px;white-space:nowrap}.th>span:first-child{overflow:hidden;text-overflow:ellipsis}.th b{font-size:12.5px}.th .tm{font-weight:800;font-variant-numeric:tabular-nums}
.th.g{background:#13341F;color:#9BE7B9}.th.a{background:#3B2A0B;color:#FFD48A}.th.r{background:#45161A;color:#FFA3A6;animation:fl 2s infinite}@keyframes fl{50%{background:#5A1B20}}
.t-dr{border-top:3px solid #00CCBC}.t-ue{border-top:3px solid #06C167}.t-din{border-top:3px solid #4C8DFF}.t-col{border-top:3px solid #C084FC}
.tb{padding:7px 9px;display:flex;flex-direction:column;gap:6px;flex:1}.tr{display:grid;grid-template-columns:16px 1fr;gap:6px;font-size:12.5px}.tr span{font-weight:800;color:#F7B252}.tr b{font-weight:700}.tr small{display:block;color:#8E929B;font-size:11.5px}
.tr.ok b{text-decoration:line-through;color:#6E727B}.tr.ok span{color:#2BB673}
.tf{padding:6px 9px;border-top:1px solid #23262C;color:#8E929B;font-size:11.5px;font-weight:600}
.ad{background:#16181C;border:1px solid #23262C;border-radius:11px;padding:10px 12px}.ad .t{font-size:11px;font-weight:800;letter-spacing:.1em;color:#8E929B;margin-bottom:8px}
.ad div.r{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #202329;font-size:13px;font-weight:700}.ad div.r:last-child{border:0}.ad div.r b{color:#F7B252;font-size:15px}
</style></head><body>
<div class="top">
<div class="lg"><i>S</i><div><b>Saffron Table</b><small>Soho, London</small></div></div>
<div class="tabs"><span>Tables</span><span class="on">Order</span><span>Kitchen</span><span>Online orders <em>4</em></span><span>Reservations</span></div>
<div class="rt"><span class="pill r">86'd · 2</span><span class="em">KITCHEN OS · MADE WITH EMERGENT</span><div class="who"><i>PS</i>Priya · Server</div><span class="clock">19:42</span></div>
</div>
<div class="wrap">
<div class="gr"><div class="h">DINNER MENU</div>${groups.map(([n, c, col, on]) => `<div class="g${on ? " on" : ""}" style="--c:${col}"><i></i>${n}<span>${c}</span></div>`).join("")}</div>
<div class="mid">
<div class="mh"><div class="bc">Dinner › <b>Curries &amp; favourites</b></div><span class="seat">Ordering for seat 3</span><div class="sr">Search menu</div></div>
<div class="grid">${items.map(card).join("")}</div>
<div class="grid">${tiles.map(tile).join("")}</div>
<div class="mods">
<div><div class="t">SPICE LEVEL<em>REQUIRED</em></div><div class="opts"><span class="o">Mild</span><span class="o on">Medium</span><span class="o">Hot</span><span class="o">Extra hot</span></div></div>
<div><div class="t">BUTTER CHICKEN · OPTIONS</div><div class="opts"><span class="o on">No cream</span><span class="o">Extra paneer<small>+£2.00</small></span><span class="o">Add pilau rice<small>+£3.50</small></span><span class="o">Boneless<small>free</small></span></div></div>
<div class="mb"><span class="btn p">Done</span><span class="btn">Repeat</span></div>
</div>
</div>
<div class="ck">
<div class="ckh"><div class="r1"><h2>Table 12</h2><span class="din">Dine in</span></div><p>4 guests · Priya · opened 19:24 · Window</p>
<div class="seats"><span>All</span><span>S1</span><span>S2</span><span class="on">S3</span><span>S4</span><span>Shared</span></div></div>
<div class="lines">
<div class="cs">STARTERS <i class="s">Sent 19:28</i></div>
${line(1, "Samosa chaat", "S1", "£7.50", "", "done")}${line(1, "Paneer tikka", "Shared", "£9.50", "", "done")}
<div class="cs">MAINS <i class="h">Held · fire when ready</i></div>
${line(2, "Butter chicken", "S2 S3", "£31.00", "Medium · no cream / Hot")}${line(1, "Lamb biryani", "S1", "£17.50", "Raita on the side")}${line(1, "Dal makhani", "S4", "£11.00", "")}${line(3, "Garlic naan", "Shared", "£10.50", "")}
<div class="al">Allergy · Seat 3: tree nuts. Cook in a clean pan.</div>
<div class="cs">DESSERTS <i class="n">Not sent</i></div>
${line(2, "Gulab jamun", "S2 S4", "£13.00", "Warm, with ice cream")}
<div class="cs">DRINKS <i class="s">Sent 19:26</i></div>
${line(2, "Mango lassi", "S1 S3", "£9.00", "", "done")}
</div>
<div class="tot"><div><span>Subtotal</span><span>£109.00</span></div><div><span>Service charge 12.5% (optional)</span><span>£13.63</span></div><div class="big"><span>Total</span><span>£122.63</span></div><div class="vat"><span>Includes VAT 20%</span><span>£20.44</span></div></div>
<div class="sm"><span>Split</span><span>Discount</span><span>Move table</span><span>Print</span></div>
<div class="act"><span class="a1">Send</span><span class="a2">Fire mains</span><span class="a3">Pay £122.63</span></div>
</div>
<div class="kds">
<div><div class="kh"><span class="lv"></span><b>Kitchen display · Expo</b><span class="pill">9 open</span><span class="pill">Avg ticket 11:40</span><span class="pill" style="border-color:#0B5F58;color:#5EEAD4">Deliveroo 2</span><span class="pill" style="border-color:#0A5A33;color:#6EE7A0">Uber Eats 2</span></div>
<div class="tks">${tickets.map(tk).join("")}</div></div>
<div class="ad"><div class="t">ALL DAY</div><div class="r"><span>Butter chicken</span><b>6</b></div><div class="r"><span>Garlic naan</span><b>11</b></div><div class="r"><span>Lamb biryani</span><b>4</b></div><div class="r"><span>Paneer tikka</span><b>3</b></div><div class="r"><span>Dal makhani</span><b>3</b></div><div class="r"><span>Gulab jamun</span><b>2</b></div></div>
</div>
</div>
</body></html>`;
})();
