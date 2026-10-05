// Store OS · Kindred Goods: Shopify-style order detail with inventory, live view and abandoned checkouts.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', orders: '<path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/>', tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', pct: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
    store: '<path d="M3 9l2-5h14l2 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    truck: '<path d="M2 6h12v10H2z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', check: '<path d="M5 12l5 5 9-10"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>', more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'
  };
  const nav = [["home", "Home"], ["orders", "Orders", "23", 1], ["tag", "Products"], ["users", "Customers"], ["pct", "Discounts"], ["chart", "Analytics"], ["store", "Online Store"]];
  const inv = [
    ["throw", "Heritage wool throw", "Heritage pattern · 50×70", "KG-THR-HER", 3, 14, 17, 0, "ok"],
    ["mug", "Everyday stoneware mug", "Oat · 12 oz", "KG-MUG-OAT", 9, 112, 121, 0, "ok"],
    ["vase", "Ceramic bud vase", "Sage glaze · small", "KG-VAS-SAGE", 2, 6, 8, 24, "low"],
    ["candle", "Teak &amp; mahogany candle", "8 oz", "KG-CAN-TEAK", 1, 0, 1, 48, "out"],
    ["planter", "Terracotta planter", "6 in · with saucer", "KG-PLN-6", 4, 31, 35, 0, "ok"]
  ];
  const tl = [
    ["10:14 AM", "Shipping confirmation sent to Jess Taylor", "mail"],
    ["10:12 AM", "You bought a USPS Ground Advantage label for $7.42", "truck"],
    ["10:12 AM", "You fulfilled 3 items from SE Division warehouse", "box"],
    ["9:43 AM", "Candle held: 0 available · 48 incoming on PO-112", "clock"],
    ["9:41 AM", "Payment of $222.20 processed via Shop Pay", "card"],
    ["9:41 AM", "Order placed from Online Store · confirmation email sent", "mail"]
  ];

  window.LANDINGS.store = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Young+Serif&family=JetBrains+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.45 'Instrument Sans',system-ui,sans-serif;color:#22201C;background:#F4EFE8}
.mono{font-family:'JetBrains Mono',monospace;font-size:11.5px}
.top{height:52px;background:#1F1C18;display:flex;align-items:center;gap:14px;padding:0 18px;color:#EDE6DC}
.brand{display:flex;align-items:center;gap:10px;width:186px}.brand i{width:30px;height:30px;border-radius:8px;background:#B5562F;display:grid;place-items:center;font:400 17px 'Young Serif',serif;font-style:normal;color:#FFF6EE}
.brand b{display:block;font:400 15px 'Young Serif',serif;letter-spacing:.01em}.brand span{font:500 9.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#A99C8C}
.srch{flex:1;max-width:520px;display:flex;align-items:center;gap:8px;background:#2E2A25;border-radius:9px;padding:7px 12px;color:#9F9488}.srch kbd{margin-left:auto;font:500 10.5px 'JetBrains Mono';border:1px solid #4A443C;border-radius:5px;padding:0 5px}
.live{display:flex;align-items:center;gap:7px;font-size:12px;color:#CFC5B8;margin-left:auto}.live i{width:8px;height:8px;border-radius:50%;background:#7BD88F;box-shadow:0 0 0 4px rgba(123,216,143,.15);animation:pl 1.6s infinite}
@keyframes pl{50%{opacity:.4}}
.ask{display:flex;align-items:center;gap:6px;border:1px solid #4A443C;border-radius:9px;padding:6px 11px;font-weight:600;color:#F2C9A8}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff;flex:none}
.wrap{display:grid;grid-template-columns:200px 1fr;grid-template-rows:848px;height:848px;overflow:hidden}
.side{background:#EBE3D8;border-right:1px solid #DDD2C4;padding:14px 10px;display:flex;flex-direction:column;gap:2px}
.nv{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;color:#4A443C;font-weight:500}.nv svg{color:#8C7F70}
.nv.on{background:#FFFDF9;color:#22201C;font-weight:700;box-shadow:0 1px 2px rgba(60,40,20,.08)}.nv em{margin-left:auto;font-style:normal;font-size:11px;font-weight:700;color:#8C7F70}
.sub{padding-left:36px;color:#7A6E60;font-size:12.5px;padding-top:4px;padding-bottom:4px}.sub.on{color:#22201C;font-weight:600}
.chan{margin-top:14px;font:600 10px 'JetBrains Mono';letter-spacing:.12em;color:#9A8D7E;padding:6px 10px}
.mk{margin-top:auto;display:flex;align-items:center;gap:8px;padding:10px;border-radius:10px;background:#FFF8F1;border:1px dashed #D9B79C;color:#8E3F1E;font-weight:600;font-size:12.5px}
.main{padding:12px 20px;display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0;overflow:hidden}
.strip{display:grid;grid-template-columns:repeat(6,1fr);background:#FFFDF9;border:1px solid #E3D8CA;border-radius:12px;overflow:hidden}
.strip div{padding:6px 14px;border-right:1px solid #EFE6DA}.strip div:last-child{border-right:0}.strip p{margin:0;color:#8C7F70;font-size:11.5px}.strip b{font-size:17px;letter-spacing:-.01em}
.strip .spk{display:flex;align-items:center;gap:8px}
.hd{display:flex;align-items:center;gap:10px}.hd h1{margin:0;font-size:22px;letter-spacing:-.015em}.hd .src{color:#8C7F70;font-size:12.5px}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;white-space:nowrap}.chip:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.g{background:#E2F1E4;color:#2D7A3E}.y{background:#FBEFCF;color:#8A5A00}.r{background:#FBE2DA;color:#A83A1E}.n{background:#EEE7DD;color:#5E554A}
.btn{border:1px solid #D7CBBB;background:#FFFDF9;border-radius:8px;padding:6px 11px;font-weight:600;font-size:12.5px;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn.p{background:#22201C;border-color:#22201C;color:#FFF6EE}.btn.t{background:#B5562F;border-color:#B5562F;color:#FFF6EE}
.cols{display:grid;grid-template-columns:600px 1fr;gap:14px;flex:1;min-height:0}
.card{background:#FFFDF9;border:1px solid #E3D8CA;border-radius:12px;overflow:hidden}
.ch{display:flex;align-items:center;gap:8px;padding:8px 14px;font-weight:700;font-size:13.5px}.ch .r8{margin-left:auto;color:#8C7F70;font-weight:500;font-size:12px}
.li{display:grid;grid-template-columns:40px 1fr auto 70px;gap:12px;align-items:center;padding:6px 14px;border-top:1px solid #F0E8DD}
.li img,.pi img{width:40px;height:40px;object-fit:cover;border-radius:8px;border:1px solid #E8DED1;display:block}
.li b{font-size:13px;display:block}.li small{color:#8C7F70}.li .q{color:#6B6054;font-size:12.5px;white-space:nowrap}.li .t{text-align:right;font-weight:600}
.trk{display:flex;align-items:center;gap:10px;margin:0 14px 8px;padding:6px 10px;border-radius:9px;background:#F6F0E7;font-size:12px;color:#5E554A}
.trk b{color:#22201C}.trk a{margin-left:auto;color:#B5562F;font-weight:600;text-decoration:none}
.foot{display:flex;justify-content:flex-end;gap:8px;padding:4px 14px 10px}
.pay{padding:2px 14px 8px}.pay .pr{display:flex;justify-content:space-between;padding:1px 0;color:#4A443C}.pay .pr span:nth-child(2){color:#8C7F70;flex:1;padding-left:18px}.pay .pr.tot{border-top:1px solid #EFE6DA;margin-top:4px;padding-top:7px;font-weight:700;color:#22201C;font-size:14px}
.tl{padding:2px 14px 8px}.tl .ev{display:grid;grid-template-columns:22px 1fr auto;gap:10px;align-items:center;padding:2px 0;color:#4A443C;font-size:12.5px}.tl .ev svg{color:#8C7F70}.tl .ev small{color:#9A8D7E;font-size:11.5px}
.cmt{margin:2px 14px 6px;display:flex;gap:10px;align-items:flex-start;background:#FFF6EC;border:1px solid #F0DCC7;border-radius:10px;padding:8px 10px;font-size:12.5px}
.right{display:flex;flex-direction:column;gap:12px;min-height:0}
.cust{display:grid;grid-template-columns:1.1fr 1fr;gap:0}.cust>div{padding:8px 14px}.cust>div+div{border-left:1px solid #F0E8DD}
.k{color:#8C7F70;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px}
.pi{display:grid;grid-template-columns:40px 1fr 62px 62px 62px 62px;gap:10px;align-items:center;padding:4px 14px;border-top:1px solid #F0E8DD;font-size:12.5px}
.pi img{width:36px;height:36px}.pi b{display:block;font-size:12.5px}.pi small{color:#8C7F70;font-size:11.5px}.pi .c{text-align:right;font-variant-numeric:tabular-nums}
.ph{display:grid;grid-template-columns:40px 1fr 62px 62px 62px 62px;gap:10px;padding:6px 14px;background:#F6F0E7;font:600 10px 'JetBrains Mono';letter-spacing:.08em;color:#8C7F70;text-transform:uppercase}.ph span{text-align:right}
.ab{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-top:1px solid #F0E8DD}.ab>div{padding:6px 14px}.ab>div+div{border-left:1px solid #F0E8DD}.ab b{font-size:18px;display:block;letter-spacing:-.01em}.ab small{color:#8C7F70}
.abl{display:flex;align-items:center;gap:10px;padding:7px 14px;border-top:1px solid #F0E8DD;font-size:12.5px}
</style></head><body>
<div class="top"><div class="brand"><i>K</i><div><b>Kindred Goods</b><span>STORE OS</span></div></div>
<div class="srch">${ic(I.search, 15)}Search orders, products, customers<kbd>⌘K</kbd></div>
<div class="live"><i></i><b style="color:#fff">37</b> visitors right now</div>
<span class="ask">${ic(I.spark, 14)}Ask Store OS</span><span class="av" style="background:#B5562F">EM</span></div>
<div class="wrap">
<aside class="side">${nav.map(([i, l, n, on]) => `<div class="nv${on ? " on" : ""}">${ic(I[i], 16)}<span>${l}</span>${n ? `<em>${n}</em>` : ""}</div>${l === "Orders" ? `<div class="sub on">All orders</div><div class="sub">Drafts</div><div class="sub">Shipping labels</div><div class="sub">Abandoned checkouts</div>` : ""}`).join("")}
<div class="chan">SALES CHANNELS</div><div class="nv">${ic(I.store, 16)}<span>Online Store</span></div><div class="nv">${ic(I.insta, 16)}<span>Instagram Shop</span></div><div class="nv">${ic(I.card, 16)}<span>Point of Sale</span></div>
<div class="mk">${ic(I.spark, 15)}Make it yours</div></aside>
<main class="main">
<div class="strip">
<div><p>Sales today</p><div class="spk"><b>$4,812</b><svg width="54" height="20" viewBox="0 0 54 20"><path d="M0 16 L8 14 L16 15 L24 9 L32 11 L40 6 L48 7 L54 2" fill="none" stroke="#2D7A3E" stroke-width="2" stroke-linecap="round"/></svg></div></div>
<div><p>Orders</p><b>56</b></div><div><p>Sessions</p><b>1,648</b></div><div><p>Conversion</p><b>3.4%</b></div><div><p>Avg order value</p><b>$85.93</b></div>
<div><p>Returning customers</p><b>38%</b></div></div>
<div class="hd"><h1>#10482</h1><span class="chip g">Paid</span><span class="chip y">Partially fulfilled</span><span class="src">Oct 5, 2026 at 9:41 AM from Online Store</span>
<span style="margin-left:auto;display:flex;gap:8px"><span class="btn">Refund</span><span class="btn">Return</span><span class="btn">Edit</span><span class="btn">${ic(I.print, 14)}Print</span><span class="btn">More actions</span></span></div>
<div class="cols">
<div style="display:flex;flex-direction:column;gap:12px;min-height:0">
<div class="card"><div class="ch"><span class="chip g">Fulfilled (3)</span><span class="r8">#10482-F1 · SE Division warehouse</span></div>
<div class="trk">${ic(I.truck, 16)}<span>USPS Ground Advantage · <b class="mono">9400 1118 9922 3814 5520 07</b> · arrives Thu, Oct 8</span><a>Track</a></div>
<div class="li"><img src="img/store/throw.jpg" alt=""><div><b>Heritage wool throw</b><small>Heritage pattern · 50×70 · KG-THR-HER</small></div><span class="q">$148.00 × 1</span><span class="t">$148.00</span></div>
<div class="li"><img src="img/store/mug.jpg" alt=""><div><b>Everyday stoneware mug</b><small>Oat · 12 oz · KG-MUG-OAT</small></div><span class="q">$28.00 × 2</span><span class="t">$56.00</span></div></div>
<div class="card"><div class="ch"><span class="chip y">Unfulfilled (1)</span><span class="r8">On hold · waiting for stock</span></div>
<div class="li"><img src="img/store/candle.jpg" alt=""><div><b>Teak &amp; mahogany candle</b><small>8 oz · 0 available · 48 incoming on PO-112, due Oct 9</small></div><span class="q">$34.00 × 1</span><span class="t">$34.00</span></div>
<div class="foot"><span class="btn">Email customer</span><span class="btn">Mark as fulfilled</span><span class="btn p">Create shipping label</span></div></div>
<div class="card"><div class="ch"><span class="chip g">Paid</span><span class="r8">Shop Pay · Visa ending 4412</span></div>
<div class="pay"><div class="pr"><span>Subtotal</span><span>4 items</span><span>$238.00</span></div><div class="pr"><span>Discount</span><span>WELCOME10 · 10% off</span><span>−$23.80</span></div><div class="pr"><span>Shipping</span><span>Standard · 4.6 lb</span><span>$8.00</span></div><div class="pr"><span>Tax</span><span>Oregon · no sales tax</span><span>$0.00</span></div><div class="pr tot"><span>Total</span><span></span><span>$222.20</span></div></div></div>
<div class="card" style="flex:1;min-height:0"><div class="ch">Timeline<span class="r8">Only you and other staff can see comments</span></div>
<div class="cmt"><span class="av" style="background:#B5562F;width:24px;height:24px;font-size:9.5px">EM</span><span><b>Ella M.</b> Gift note requested: "Happy new place, Sam!" Added to the packing slip.</span></div>
<div class="tl">${tl.map(([t, e, i]) => `<div class="ev">${ic(I[i], 15)}<span>${e}</span><small>${t}</small></div>`).join("")}</div></div>
</div>
<div class="right">
<div class="card"><div class="ch">Customer<span class="r8">Repeat buyers segment</span></div>
<div class="cust"><div><div style="display:flex;gap:10px;align-items:center"><span class="av" style="background:#6B7F5E">JT</span><div><b style="font-size:14px">Jess Taylor</b><br><small style="color:#8C7F70">3 orders · $486.40 spent · since Mar 2025</small></div></div>
<div class="k" style="margin-top:8px">Ship to</div><div style="color:#4A443C">1428 SE Hawthorne Blvd<br>Portland, OR 97214</div></div>
<div><div class="k">Conversion summary</div><div style="color:#4A443C;display:flex;flex-direction:column;gap:3px"><span>${ic(I.insta, 13)} First visit from Instagram</span><span>${ic(I.mail, 13)} Converted from "Fall at home" email</span><span style="color:#8C7F70">2 sessions over 3 days</span></div>
<div class="k" style="margin-top:8px">Order risk</div><div style="display:flex;align-items:center;gap:8px"><span class="chip g">Low</span><small style="color:#8C7F70">AVS and CVV matched</small></div></div></div></div>
<div class="card"><div class="ch">Inventory<span class="r8">SE Division warehouse · 5 of 42 products</span></div>
<div class="ph"><span></span><span style="text-align:left">Product · variant</span><span>Committed</span><span>Available</span><span>On hand</span><span>Incoming</span></div>
${inv.map(([img, n, v, sku, cm, av, oh, inc, st]) => `<div class="pi"><img src="img/store/${img}.jpg" alt=""><div><b>${n}</b><small>${v} · <span class="mono">${sku}</span></small></div><span class="c">${cm}</span><span class="c">${st === "out" ? `<span class="chip r">0</span>` : st === "low" ? `<span class="chip y">${av}</span>` : av}</span><span class="c">${oh}</span><span class="c" style="color:${inc ? "#2D6A9A" : "#B9AD9E"};font-weight:${inc ? 600 : 400}">${inc || "—"}</span></div>`).join("")}</div>
<div class="card"><div class="ch">Abandoned checkouts · today<span class="r8">Recovery email after 1 hour</span></div>
<div class="ab"><div><b>18</b><small>abandoned · $1,642</small></div><div><b style="color:#2D7A3E">3</b><small>recovered · $264</small></div><div><b>11</b><small>emails opened</small></div></div>
<div class="abl"><img src="img/store/vase.jpg" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:7px"><img src="img/store/planter.jpg" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:7px;margin-left:-14px;border:2px solid #FFFDF9"><div><b>Noah Kim</b> · bud vase + planter · $112.00<br><small style="color:#8C7F70">Left at shipping step 52 min ago · email scheduled 10:58 AM</small></div><span class="btn t" style="margin-left:auto">Send now</span></div></div>
</div></div></main></div></body></html>`;
})();
