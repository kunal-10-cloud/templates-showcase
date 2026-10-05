// Shop OS (auto repair) preview: an open repair order, modelled on how Tekmetric / Shopmonkey work.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>', msg: '<path d="M4 5h16v11H8l-4 4z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', check: '<path d="M5 12l5 5 9-10"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>', send: '<path d="M4 12l16-8-6 16-2-7z"/>',
    wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>', book: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 8h6"/>'
  };

  const stages = [["Estimates", 4, ""], ["Waiting approval", 3, "amb"], ["In progress", 5, "on"], ["Waiting parts", 2, ""], ["Ready for pickup", 3, "grn"]];
  const bays = [["B1", "Alignment · Civic", "busy"], ["B2", "RO 4412 · Camry", "me"], ["B3", "Diag · F-150", "busy"], ["B4", "Open", "free"]];

  // job line: [type, desc, meta, qty, amount]
  const jobs = [
    { concern: "Grinding noise when braking", name: "Front brake pads &amp; rotors", st: ["ok", "Approved via text · 10:24 AM"], tot: "$612.34",
      lines: [["Labor", "Replace front pads &amp; resurface/replace rotors", '<span class="lg">' + ic(I.book, 11) + 'Labor guide 1.6 h</span>', "1.6 h", "$264.00"],
        ["Part", "Akebono ProACT ceramic pads · ACT1222", "Matrix +45%", "1", "$89.99"],
        ["Part", "Front rotor · Brembo 09.A913.11", '<span class="pt">' + ic(I.truck, 11) + 'PartsTech · ETA 11:30</span>', "2", "$212.36"],
        ["Fee", "Brake fluid flush top-off &amp; shop supplies", "", "1", "$45.99"]] },
    { concern: "Rear tires at 3/32&quot; (inspection)", name: "2 × Michelin Defender2 215/55R17", st: ["wait", "Sent for approval · 10:41 AM"], tot: "$612.40",
      lines: [["Part", "Michelin Defender2 215/55R17 94H", "Matrix +28%", "2", "$498.40"],
        ["Labor", "Mount, balance &amp; TPMS reset", '<span class="lg">' + ic(I.book, 11) + 'Canned job</span>', "0.8 h", "$114.00"]] },
    { concern: "Maintenance due at 87,000 mi", name: "Synthetic oil service 0W-20", st: ["ok", "Approved at drop-off"], tot: "$89.99", lines: [] },
    { concern: "Cabin air filter dirty (inspection)", name: "Replace cabin air filter", st: ["no", "Declined · remind in 30 days"], tot: "$64.95", lines: [] }
  ];

  const stIcon = { ok: I.check, wait: I.clock, no: I.x };
  const jobHtml = jobs.map(j => `
    <div class="job ${j.st[0]}">
      <div class="jh"><div><div class="cc">${j.concern}</div><div class="jn">${j.name}</div></div>
        <div class="jr"><span class="ap ${j.st[0]}">${ic(stIcon[j.st[0]], 12)}${j.st[1]}</span><b>${j.tot}</b></div></div>
      ${j.lines.length ? `<div class="lines">${j.lines.map(l => `<div class="ln"><span class="ty ${l[0].toLowerCase()}">${l[0]}</span><span class="ds">${l[1]}</span><span class="mt">${l[2]}</span><span class="q">${l[3]}</span><span class="am">${l[4]}</span></div>`).join("")}</div>` : ""}
    </div>`).join("");

  const dvi = [["brake-pads", "r", "Front brake pads", "2 mm remaining · replace now", "Luis M."], ["rotor", "r", "Front rotors", "Scored, below min. thickness 26 mm", "Luis M."],
    ["tire", "y", "Rear tires", "Tread 3/32&quot; · even wear", "Luis M."], ["cabin-filter", "y", "Cabin air filter", "Heavy debris · customer declined", "Luis M."]];
  const greens = ["Battery 640 CCA · tested good", "Wiper blades", "Coolant level &amp; condition", "Belts &amp; hoses", "Lights &amp; horn"];

  window.LANDINGS.repair = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Archivo',system-ui,sans-serif;color:#15171C;background:#EEF0F3}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:56px;background:#16181D;color:#C9CDD6;display:flex;align-items:center;gap:22px;padding:0 20px}
.lg0{display:flex;align-items:center;gap:10px;color:#fff}.lg0 i{width:30px;height:30px;border-radius:8px;background:#F25C1F;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:15px}
.lg0 b{font-size:14.5px;display:block;line-height:1.1}.lg0 small{font:600 10px 'JetBrains Mono';letter-spacing:.12em;color:#8A90A0}
.tabs{display:flex;gap:4px;margin-left:12px}.tabs span{padding:7px 12px;border-radius:7px;font-weight:600;font-size:13px}.tabs .on{background:#272A33;color:#fff}
.srch{margin-left:auto;display:flex;align-items:center;gap:8px;background:#22252D;border:1px solid #2E323C;border-radius:8px;padding:7px 12px;width:300px;color:#8A90A0;font-size:12.5px}
.mk{display:flex;align-items:center;gap:6px;color:#FFB089;font-weight:600;font-size:12.5px;border:1px solid #3A2A22;background:#2A1F1A;border-radius:8px;padding:7px 10px}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:11px;flex:none}
.flow{height:50px;background:#fff;border-bottom:1px solid #DDE0E6;display:flex;align-items:center;gap:8px;padding:0 20px}
.stg{display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:#F2F3F6;font-weight:600;font-size:12.5px;color:#4A4F5C}
.stg em{font-style:normal;background:#fff;border:1px solid #DDE0E6;border-radius:999px;padding:0 7px;font-size:11.5px}
.stg.on{background:#15171C;color:#fff}.stg.on em{background:#F25C1F;border-color:#F25C1F;color:#fff}.stg.amb em{background:#FFF1D6;border-color:#F3D08A;color:#8A5A00}.stg.grn em{background:#DDF3E5;border-color:#A8DDBC;color:#136B3A}
.sep{width:1px;height:24px;background:#DDE0E6;margin:0 6px}
.bay{display:flex;align-items:center;gap:6px;font-size:12px;color:#5B6070;padding:5px 9px;border-radius:7px;border:1px solid #E4E6EB}.bay b{font-family:'JetBrains Mono';font-size:11px;color:#15171C}
.bay i{width:7px;height:7px;border-radius:50%;background:#C2C6CE}.bay.busy i{background:#2F6FEB}.bay.me{border-color:#F25C1F;background:#FFF4EE;color:#9A3A0E}.bay.me i{background:#F25C1F;box-shadow:0 0 0 3px rgba(242,92,31,.2)}.bay.free i{background:#21A05A}
.wrap{display:grid;grid-template-columns:1fr 430px;gap:14px;padding:14px 20px;height:794px}
.col{display:flex;flex-direction:column;gap:10px;min-height:0}
.card{background:#fff;border:1px solid #DDE0E6;border-radius:14px}
.ro{display:grid;grid-template-columns:250px 1fr;overflow:hidden}
.ro .ph{position:relative;background:#E9ECF0}.ro .ph img{width:100%;height:100%;object-fit:cover;display:block}
.ro .ph span{position:absolute;left:10px;bottom:10px;background:rgba(21,23,28,.82);color:#fff;font:600 11px 'JetBrains Mono';padding:4px 8px;border-radius:6px;letter-spacing:.06em}
.rb{padding:12px 18px;display:flex;flex-direction:column;gap:8px}
.r1{display:flex;align-items:center;gap:10px}.rn{font:600 12px 'JetBrains Mono';color:#6B7080}.pill{font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px}
.pill.ip{background:#E6EEFF;color:#1F4FC4}.r1 .clk{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:12px;color:#4A4F5C;background:#F2F3F6;border-radius:999px;padding:4px 10px 4px 4px}
.r1 .clk .av{width:22px;height:22px;font-size:9.5px}.dot{width:7px;height:7px;border-radius:50%;background:#21A05A;animation:p 1.6s infinite}@keyframes p{50%{opacity:.3}}
.veh{font-size:22px;font-weight:800;letter-spacing:-.01em}.veh small{font-size:13px;font-weight:500;color:#6B7080;margin-left:6px}
.facts{display:grid;grid-template-columns:repeat(4,auto);gap:4px 26px;font-size:12px}.facts p{margin:0;color:#7A7F8D}.facts b{display:block;color:#15171C;font-size:13px;font-weight:600}
.dec{font:600 10px 'Archivo';color:#136B3A;background:#DDF3E5;border-radius:4px;padding:1px 5px;margin-left:5px}
.cust{display:flex;align-items:center;gap:10px;border-top:1px dashed #E4E6EB;padding-top:10px;font-size:12.5px;color:#4A4F5C}.cust b{color:#15171C}.cust .pr{margin-left:auto;display:flex;gap:6px}
.chipg{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:7px;background:#F2F3F6;color:#4A4F5C}
.sum{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.sm{border-radius:12px;padding:7px 14px;border:1px solid #DDE0E6;background:#fff}.sm p{margin:0;font-size:11.5px;color:#6B7080;font-weight:600;text-transform:uppercase;letter-spacing:.05em}.sm b{font-size:19px;font-weight:800;letter-spacing:-.01em}
.sm.a{border-color:#A8DDBC;background:linear-gradient(180deg,#F1FAF4,#fff)}.sm.a b{color:#136B3A}.sm.w b{color:#9A6200}.sm.d b{color:#9AA0AD;text-decoration:line-through;text-decoration-thickness:1.5px}
.jobs{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column}
.jt{display:flex;align-items:center;justify-content:space-between;padding:9px 16px;border-bottom:1px solid #ECEEF2}.jt b{font-size:14.5px}.jt span{font-size:12px;color:#6B7080}
.job{border-bottom:1px solid #ECEEF2;padding:7px 16px;border-left:3px solid transparent}.job.ok{border-left-color:#21A05A}.job.wait{border-left-color:#E8A317;background:#FFFCF4}.job.no{border-left-color:#C9CDD6;opacity:.75}
.jh{display:flex;justify-content:space-between;align-items:center;gap:10px}.cc{font-size:11px;font-weight:600;color:#7A7F8D;text-transform:uppercase;letter-spacing:.05em}.jn{font-size:14.5px;font-weight:700}
.jr{display:flex;align-items:center;gap:12px}.jr b{font-size:15px;min-width:76px;text-align:right}.job.no .jr b{text-decoration:line-through;color:#9AA0AD}
.ap{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:999px}.ap.ok{background:#DDF3E5;color:#136B3A}.ap.wait{background:#FFF1D6;color:#8A5A00}.ap.no{background:#F0F1F4;color:#5B6070}
.lines{margin-top:4px;display:flex;flex-direction:column}
.ln{display:grid;grid-template-columns:52px 1fr 170px 44px 74px;gap:10px;align-items:center;padding:2.5px 0;font-size:12.5px;border-top:1px solid #F3F4F7}
.ty{font-size:10.5px;font-weight:700;text-align:center;border-radius:5px;padding:2px 0}.ty.labor{background:#E6EEFF;color:#1F4FC4}.ty.part{background:#F2F3F6;color:#4A4F5C}.ty.fee{background:#FBF0E6;color:#9A4A12}
.ds{color:#2A2D35}.mt{font-size:11px;color:#7A7F8D}.q{text-align:right;color:#6B7080;font-family:'JetBrains Mono';font-size:11.5px}.am{text-align:right;font-weight:600}
.lg,.pt{display:inline-flex;align-items:center;gap:4px;font-weight:600}.lg{color:#1F4FC4}.pt{color:#136B3A}
.tot{display:flex;align-items:center;gap:20px;padding:11px 16px;margin-top:auto;border-top:1px solid #ECEEF2;background:#FAFBFC;font-size:12.5px;color:#6B7080;border-radius:0 0 14px 14px}
.tot b{color:#15171C}.tot .big{font-size:20px;font-weight:800;color:#15171C}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:9px;font-weight:700;font-size:12.5px;border:1px solid #D5D8DF;background:#fff;color:#15171C}.btn.p{background:#F25C1F;border-color:#F25C1F;color:#fff;box-shadow:0 4px 12px rgba(242,92,31,.3)}
.dvi{overflow:hidden;display:flex;flex-direction:column}
.dh{padding:13px 16px 10px;display:flex;flex-direction:column;gap:9px;border-bottom:1px solid #ECEEF2}
.dh .t{display:flex;justify-content:space-between;align-items:center}.dh .t b{font-size:14.5px}.dh .t span{font-size:12px;color:#6B7080}
.bar{display:flex;height:8px;border-radius:999px;overflow:hidden;gap:2px}.bar i{display:block}
.leg{display:flex;gap:14px;font-size:12px;color:#4A4F5C}.leg span{display:flex;align-items:center;gap:5px}.leg i{width:8px;height:8px;border-radius:2px}
.fi{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:10px 16px;border-bottom:1px solid #F0F1F4;align-items:center}
.fi img{width:96px;height:68px;object-fit:cover;border-radius:9px;display:block;background:#E9ECF0}
.fi .ft{display:flex;align-items:center;gap:7px;font-weight:700;font-size:13.5px}.fi .fs{width:10px;height:10px;border-radius:50%}.fi .fs.r{background:#D7372B}.fi .fs.y{background:#E8A317}
.fi p{margin:3px 0 0;font-size:12px;color:#5B6070}.fi small{font-size:11px;color:#9AA0AD}
.gr{padding:8px 16px 10px;display:flex;flex-wrap:wrap;gap:6px}.gr span{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:#136B3A;background:#EEF8F2;border-radius:6px;padding:3px 8px;font-weight:600}
.sms{margin:4px 16px 14px;border-radius:12px;background:#F4F5F8;padding:10px;display:flex;flex-direction:column;gap:6px}
.sms .hd{display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;color:#6B7080}
.b{max-width:86%;padding:7px 10px;border-radius:12px;font-size:12px;line-height:1.35}.b.out{background:#15171C;color:#fff;align-self:flex-start;border-bottom-left-radius:4px}.b.in{background:#2F6FEB;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.b u{color:#FFB089}.b small{display:block;opacity:.7;font-size:10.5px;margin-top:2px}
</style></head><body>
<div class="top"><div class="lg0"><i>F</i><div><b>Fixwell Auto Care</b><small>SHOP OS</small></div></div>
<div class="tabs"><span class="on">Job board</span><span>Appointments</span><span>Customers</span><span>Inventory</span><span>Reports</span></div>
<div class="srch">${ic(I.search, 14)}Search RO, plate, VIN or customer</div><span class="mk">${ic(I.spark, 13)}Make it yours</span>${ic(I.bell, 18)}<span class="av" style="background:#5B4FD6">DR</span></div>
<div class="flow">${stages.map(([s, n, c]) => `<span class="stg ${c}">${s}<em>${n}</em></span>`).join("")}<span class="sep"></span>${bays.map(([b, t, c]) => `<span class="bay ${c}"><i></i><b>${b}</b>${t}</span>`).join("")}</div>
<div class="wrap">
<div class="col">
<div class="card ro"><div class="ph"><img src="img/repair/camry.jpg" alt=""><span>AZ · CMX-4821</span></div>
<div class="rb"><div class="r1"><span class="rn">RO #4412</span><span class="pill ip">In progress · Bay 2</span><span class="pill" style="background:#F2F3F6;color:#4A4F5C">Promised 4:30 PM</span>
<span class="clk"><span class="av" style="background:#0E7C86">LM</span><span class="dot"></span>Luis M. clocked on · 1h 12m</span></div>
<div class="veh">2015 Toyota Camry SE<small>2.5L I4 · FWD · Black</small></div>
<div class="facts"><div><p>VIN</p><b class="mono" style="font-size:12px">4T1BF1FK5FU472918<span class="dec">Decoded</span></b></div><div><p>Mileage in</p><b>87,412 mi</b></div><div><p>Last visit</p><b>Mar 2026 · oil service</b></div><div><p>Service writer</p><b>Dana Reyes</b></div></div>
<div class="cust"><span class="av" style="background:#B24207;width:26px;height:26px;font-size:10px">MG</span><span><b>Maria Gonzalez</b> · (602) 555-0148</span><span class="chipg">${ic(I.msg, 12)}Prefers text</span><span class="pr"><span class="chipg">2 deferred services</span><span class="chipg">Customer since 2021</span></span></div></div></div>
<div class="sum"><div class="sm a"><p>Authorized</p><b>$702.33</b></div><div class="sm w"><p>Awaiting approval</p><b>$612.40</b></div><div class="sm d"><p>Declined → deferred</p><b>$64.95</b></div></div>
<div class="card jobs"><div class="jt"><b>Jobs on this RO</b><span>4 jobs · grouped by customer concern</span></div>${jobHtml}
<div class="tot"><span>Approved subtotal <b>$702.33</b></span><span>Tax 8.6% <b>$60.40</b></span><span>Pending <b>$612.40</b></span><span style="margin-left:auto">Total due</span><span class="big">$762.73</span><span class="btn">${ic(I.send, 13)}Text update</span><span class="btn p">${ic(I.card, 13)}Invoice &amp; collect</span></div></div>
</div>
<div class="col">
<div class="card dvi"><div class="dh"><div class="t"><b>Digital inspection</b><span>42 points · Luis M. · 9:58 AM</span></div>
<div class="bar"><i style="width:7%;background:#D7372B"></i><i style="width:10%;background:#E8A317"></i><i style="width:83%;background:#21A05A"></i></div>
<div class="leg"><span><i style="background:#D7372B"></i>3 needs attention</span><span><i style="background:#E8A317"></i>4 soon</span><span><i style="background:#21A05A"></i>35 good</span></div></div>
${dvi.map(([img, c, t, n, by]) => `<div class="fi"><img src="img/repair/${img}.jpg" alt=""><div><div class="ft"><span class="fs ${c}"></span>${t}</div><p>${n}</p><small>Photo · ${by}</small></div></div>`).join("")}
<div class="gr">${greens.map(g => `<span>${ic(I.check, 11)}${g}</span>`).join("")}</div>
<div class="sms"><div class="hd">${ic(I.msg, 12)}Text thread · Maria Gonzalez</div>
<div class="b out">Hi Maria, your Camry inspection is ready. Review photos and approve: <u>fixwell.link/i/4412</u><small>10:02 AM · opened 10:19</small></div>
<div class="b in">Approved the front brakes. Can the tires wait until next month?<small>10:24 AM</small></div>
<div class="b out">Sure. We'll text you a reminder in 30 days. Pickup 4:30 today.<small>10:26 AM · Dana</small></div></div>
</div></div></div></body></html>`;
})();
