// Production-app previews (group A): repair, clinic, property, realestate, erp.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 17}" height="${s || 17}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>', msg: '<path d="M4 5h16v11H8l-4 4z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', board: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', inv: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z"/>', car: '<path d="M3 16v-4l2-5h14l2 5v4"/><path d="M3 16h18v3H3z"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>', building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>', tool: '<path d="M14 7l3-3 3 3-3 3M5 19l9-9"/><circle cx="5" cy="19" r="1.5"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>', heart: '<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z"/>', factory: '<path d="M3 21V10l6 4V10l6 4V6l6 3v12z"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>', cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'
  };

  // Shared app shell. t = theme, o = content.
  function app(t, o) {
    const nav = o.nav.map(g => `<div class="gl">${g[0]}</div>` + g[1].map(([icn, l, n, on, red]) => `<div class="nv${on ? " on" : ""}">${ic(I[icn])}<span>${l}</span>${n ? `<em${red ? ' class="red"' : ""}>${n}</em>` : ""}</div>`).join("")).join("");
    const brief = o.brief.map(([n, txt, act, tone]) => `<div class="bi"><b${tone ? ` style="color:${tone}"` : ""}>${n}</b><span>${txt}</span><u>${act} &#8594;</u></div>`).join("");
    const kpis = o.kpis.map(([l, v, s, c]) => `<div class="k"><p>${l}</p><b${c ? ` style="color:${c}"` : ""}>${v}</b><small>${s}</small></div>`).join("");
    return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${t.font}"><style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:${t.fs || 14}px/1.45 ${t.ff};color:${t.ink};background:${t.bg}}
.app{display:grid;grid-template-columns:${t.sw || 252}px 1fr;height:900px}
.sb{background:${t.sb};color:${t.sbInk};border-right:1px solid ${t.sbLine};padding:16px 12px;display:flex;flex-direction:column;gap:1px}
.br{display:flex;gap:10px;align-items:center;padding:2px 6px 12px}.br i{width:36px;height:36px;border-radius:10px;background:${t.ac};color:#fff;display:grid;place-items:center;font-weight:700;font-style:normal;font-size:15px;flex:none}
.br b{display:block;font-size:14px;line-height:1.2;color:${t.sbStrong}}.br span{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:${t.sbMute};font-weight:600}
.ask{display:flex;align-items:center;justify-content:center;gap:8px;background:${t.askBg};color:${t.askInk};border-radius:9px;padding:9px;font-weight:600;font-size:13px;margin:2px 0 8px}
.gl{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:${t.sbMute};padding:11px 10px 4px;font-weight:600}
.nv{display:flex;align-items:center;gap:10px;padding:6.5px 10px;border-radius:8px;font-weight:500}.nv svg{color:${t.sbMute}}
.nv.on{background:${t.navOn};color:${t.navOnInk};font-weight:650}.nv.on svg{color:${t.ac}}
.nv em{margin-left:auto;font-style:normal;background:${t.badge};color:${t.badgeInk};font-size:11px;font-weight:700;border-radius:9px;min-width:20px;text-align:center;line-height:19px;padding:0 5px}.nv em.red{background:#E5372B;color:#fff}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:10px 8px 0;border-top:1px solid ${t.sbLine}}.me b{color:${t.sbStrong};font-size:13px;display:block}.me small{color:${t.sbMute}}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.main{padding:20px 28px;display:flex;flex-direction:column;gap:14px;min-width:0}
.hd{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}.hd h1{margin:0;font-size:25px;font-weight:700;letter-spacing:-.02em}.hd p{margin:2px 0 0;color:${t.mute}}
.acts{display:flex;gap:8px;align-items:center}.btn{border:1px solid ${t.line};background:${t.card};border-radius:9px;padding:8px 13px;font-weight:600;font-size:13px;white-space:nowrap}.btn.p{background:${t.ac};border-color:${t.ac};color:#fff}
.srch{display:flex;align-items:center;gap:7px;border:1px solid ${t.line};background:${t.card};border-radius:9px;padding:7px 11px;color:${t.mute};font-size:13px;width:220px}
.brief{background:${t.briefBg};color:${t.briefInk};border-radius:14px;padding:14px 16px;display:grid;grid-template-columns:200px 1fr;gap:18px;align-items:center}
.brief .tt{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:${t.briefAc};display:flex;gap:6px;align-items:center}.brief h2{margin:6px 0 2px;font-size:17px}.brief p{margin:0;font-size:12.5px;opacity:.75}
.bl{display:grid;grid-template-columns:repeat(${o.brief.length},1fr);gap:9px}.bi{background:${t.biBg};border:1px solid ${t.biLine};border-radius:11px;padding:10px 12px;display:flex;flex-direction:column;gap:3px}
.bi b{font-size:22px;letter-spacing:-.02em}.bi span{font-size:12.5px;line-height:1.3;opacity:.85}.bi u{text-decoration:none;margin-top:3px;font-size:12px;font-weight:650;color:${t.briefAc}}
.kp{display:grid;grid-template-columns:repeat(${o.kpis.length},1fr);gap:12px}.k{background:${t.card};border:1px solid ${t.line};border-radius:12px;padding:11px 14px}.k p{margin:0;color:${t.mute};font-size:12.5px}.k b{display:block;font-size:23px;letter-spacing:-.02em;margin-top:1px}.k small{color:${t.mute};font-size:12px}
.cols{display:grid;grid-template-columns:${o.cols || "1.35fr 1fr"};gap:14px;flex:1;min-height:0}
.card{background:${t.card};border:1px solid ${t.line};border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.ch{display:flex;justify-content:space-between;align-items:center;padding:11px 15px;border-bottom:1px solid ${t.line2};font-weight:700;font-size:14.5px}.ch span{font-weight:500;font-size:12.5px;color:${t.mute}}.ch a{color:${t.ac};font-weight:600;font-size:12.5px}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;white-space:nowrap}.chip:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.g{background:#E3F5EA;color:#14743F}.a{background:#FFF3D6;color:#996000}.r{background:#FDE8E6;color:#C02B1F}.b{background:#E7EEFF;color:#2349C7}.s{background:#EEF0F3;color:#4B5565}.v{background:#F0EAFF;color:#6538D1}
.mute{color:${t.mute}}.live{animation:pl 1.6s infinite}@keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}
table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:${t.mute};font-weight:600;padding:8px 15px;border-bottom:1px solid ${t.line2};background:${t.th}}td{padding:8.5px 15px;border-bottom:1px solid ${t.line2}}td.num{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.row{display:flex;align-items:center;gap:10px;padding:9px 15px;border-bottom:1px solid ${t.line2}}.row b{display:block;font-size:13.5px;font-weight:600}.row small{color:${t.mute};font-size:12px}
${o.css || ""}
</style></head><body><div class="app">
<aside class="sb"><div class="br"><i>${o.biz[0]}</i><div><b>${o.biz}</b><span>${o.tpl}</span></div></div>
<div class="ask">${ic(I.spark, 15)}Ask about your business</div>${nav}
<div class="me"><span class="av" style="background:${o.owner[2]}">${(o.owner[0].replace(/^Dr\.\s*/,'').split(' ').map(x=>x[0]).join(''))}</span><div><b>${o.owner[0]}</b><small>${o.owner[1]}</small></div></div></aside>
<main class="main"><div class="hd"><div><h1>${o.title}</h1><p>${o.sub}</p></div><div class="acts"><div class="srch">${ic(I.search, 15)}${o.search}</div>${o.actions}</div></div>
<div class="brief"><div><div class="tt">${ic(I.spark, 13)}Morning brief</div><h2>${o.briefTitle}</h2><p>Written from today's data</p></div><div class="bl">${brief}</div></div>
<div class="kp">${kpis}</div>
<div class="cols">${o.left}${o.right}</div></main></div></body></html>`;
  }

  const light = (o) => Object.assign({ bg: "#F4F5F8", ink: "#111827", mute: "#667085", card: "#fff", line: "#E4E7EC", line2: "#F0F1F4", th: "#FAFAFB",
    sb: "#fff", sbInk: "#344054", sbStrong: "#101828", sbMute: "#8A94A6", sbLine: "#E9EBF0", navOn: "#F0F3FF", navOnInk: "#101828", badge: "#EEF1F6", badgeInk: "#344054",
    askBg: "#101828", askInk: "#fff", briefBg: "#101828", briefInk: "#EEF1F7", briefAc: "#8FB0FF", biBg: "rgba(255,255,255,.06)", biLine: "rgba(255,255,255,.09)" }, o);
  const dark = (o) => light(Object.assign({ sb: "#0F1720", sbInk: "#C9D1DC", sbStrong: "#fff", sbMute: "#7C8798", sbLine: "#1D2733", navOn: "#1C2733", navOnInk: "#fff", badge: "#223040", badgeInk: "#C9D1DC", askBg: "rgba(255,255,255,.08)", askInk: "#fff" }, o));

  // ================= REPAIR · Fixwell Auto Care =================
  {
    const ac = "#E8590C";
    const ro = (id, car, plate, job, tech, amt, st, c) => `<div class="ro"><div class="rt"><b>${car}</b><span class="pl">${plate}</span></div><small>${id} · ${job}</small><div class="rf"><span class="av" style="width:22px;height:22px;font-size:9px;background:${c}">${tech}</span>${st}<span class="amt">${amt}</span></div></div>`;
    const col = (t, n, items) => `<div class="kc"><h4>${t}<span>${n}</span></h4>${items.join("")}</div>`;
    const left = `<div class="card"><div class="ch">Repair orders · today<span>12 cars in shop · 4 bays</span></div><div class="kan">
${col("Inspecting", 3, [ro("RO-4418", "2016 Toyota Camry", "KX3 921", "Brake noise", "DR", "Diag.", '<span class="chip s">Bay 1</span>', "#2563EB"), ro("RO-4421", "2019 Honda Civic", "LPZ 448", "Check engine", "MK", "Diag.", '<span class="chip s">Bay 2</span>', "#0E8C7A")])}
${col("Waiting on approval", 2, [ro("RO-4409", "2014 Ford F-150", "7HG 202", "Pads + rotors", "DR", "$684", '<span class="chip a">Sent 10:12</span>', "#2563EB"), ro("RO-4412", "2020 Honda CR-V", "2NB 551", "Timing belt", "AJ", "$1,120", '<span class="chip a">Viewed</span>', "#B45309")])}
${col("In progress", 4, [ro("RO-4401", "2018 Nissan Altima", "8DW 773", "AC recharge", "MK", "$240", '<span class="chip b">Bay 3</span>', "#0E8C7A"), ro("RO-4405", "2015 Chevy Tahoe", "4RT 110", "Water pump", "AJ", "$890", '<span class="chip b">Bay 4</span>', "#B45309")])}
${col("Ready for pickup", 2, [ro("RO-4398", "2021 Tesla Model Y", "EV 9921", "Tyre rotation", "DR", "$89", '<span class="chip g">Paid</span>', "#2563EB"), ro("RO-4400", "2017 Subaru Outback", "6PL 318", "Oil + filter", "MK", "$129", '<span class="chip a">Text sent</span>', "#0E8C7A")])}
</div></div>`;
    const item = (n, st, cls, note) => `<div class="ii"><span class="dot ${cls}"></span><div><b>${n}</b><small>${note}</small></div><span class="chip ${cls}">${st}</span></div>`;
    const right = `<div class="card"><div class="ch">Digital inspection · RO-4409<span>2014 Ford F-150 · Sam Ortiz</span></div>
<div class="ph"><div class="p1"><i></i><span>Front pads · 2mm</span></div><div class="p2"><i></i><span>Rotor scoring</span></div><div class="p3"><i></i><span>Tyre tread 6/32</span></div></div>
${item("Front brake pads", "Urgent", "r", "2mm remaining · replace now")}${item("Front rotors", "Urgent", "r", "Scored, below min thickness")}${item("Cabin air filter", "Soon", "a", "Dirty · $49 optional")}${item("Tyres", "Good", "g", "6/32 all round")}
<div class="sms"><div class="bub">Hi Sam, Dana from Fixwell. Your F-150 needs front pads and rotors. Total $684. Approve here: fixwell.link/ro4409</div><div class="me2">Approve the brakes, skip the filter</div><div class="st2"><span class="chip g">Approved by text · 10:24</span><span class="mute" style="font-size:12px">Signed by Sam Ortiz</span></div></div></div>`;
    window.LANDINGS.repair = app(light({ font: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap", ff: "'Inter Tight',system-ui,sans-serif", ac,
      briefBg: "#1C1410", briefAc: "#FF9A62", navOn: "#FFF1E8", askBg: "#1C1410" }), {
      biz: "Fixwell Auto Care", tpl: "Shop OS", owner: ["Dana Reyes", "Service manager", ac], title: "Workflow", sub: "Phoenix · Monday, 5 October 2026 · 4 bays open",
      search: "Plate, VIN or customer", actions: `<span class="btn">Book a car</span><span class="btn p">+ Repair order</span>`,
      nav: [["Shop floor", [["board", "Workflow", "12", 1], ["cal", "Appointments", "7"], ["wrench", "Inspections", "3"], ["msg", "Approvals", "2", 0, 1]]], ["Money", [["doc", "Estimates"], ["inv", "Invoices"], ["box", "Parts", "5"]]], ["Records", [["car", "Vehicles"], ["users", "Customers"], ["chart", "Reports"]]], ["Make it yours", [["spark", "Make it yours"], ["gear", "Settings"]]]],
      briefTitle: "2 approvals could unlock $1,804", brief: [["2", "estimates waiting on a yes", "Nudge by text"], ["3", "cars due back before 5pm", "Check bays"], ["5", "parts arriving at 11:00", "Assign"], ["1", "comeback: Altima AC", "Review", "#FF8A80"]],
      kpis: [["Cars in shop", "12", "4 bays busy"], ["Awaiting approval", "$1,804", "2 estimates"], ["Avg repair order", "$612", "+8% this month"], ["Car count (week)", "58", "target 64"], ["Bay utilisation", "86%", "today"]],
      cols: "1.7fr 1fr", left, right,
      css: `.kan{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px;flex:1}.kc{background:#F7F7F9;border-radius:10px;padding:9px;display:flex;flex-direction:column;gap:8px}
.kc h4{margin:0 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#667085;display:flex;justify-content:space-between}
.ro{background:#fff;border:1px solid #E7E8EC;border-radius:9px;padding:9px;display:flex;flex-direction:column;gap:4px;border-top:3px solid ${ac}}.rt{display:flex;flex-direction:column;align-items:flex-start;gap:3px}.rt b{font-size:12.5px}
.pl{font:600 10px ui-monospace,monospace;background:#FFF7D6;border:1px solid #E9D48A;border-radius:4px;padding:1px 4px;white-space:nowrap}.ro small{color:#667085;font-size:11.5px}
.rf{display:flex;align-items:center;gap:6px}.amt{margin-left:auto;font-weight:700;font-size:12.5px}
.ph{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px 15px 6px}.ph div{height:70px;border-radius:8px;position:relative;overflow:hidden}.ph span{position:absolute;left:6px;bottom:5px;font-size:10.5px;color:#fff;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.5)}
.p1{background:radial-gradient(circle at 50% 45%,#5a5f66 0 22%,#2b2f35 23% 40%,#9aa0a8 41% 46%,#3b4047 47%)}.p2{background:repeating-radial-gradient(circle at 50% 50%,#8d939b 0 3px,#6d737b 3px 6px)}.p3{background:repeating-linear-gradient(90deg,#26292e 0 8px,#3a3e44 8px 12px)}
.ph i{position:absolute;right:6px;top:6px;width:9px;height:9px;border-radius:50%;background:#E5372B;box-shadow:0 0 0 3px rgba(229,55,43,.3)}
.ii{display:flex;align-items:center;gap:10px;padding:7px 15px;border-bottom:1px solid #F0F1F4}.ii b{display:block;font-size:13px}.ii small{color:#667085;font-size:11.5px}.ii .chip{margin-left:auto}.dot{width:8px;height:8px;border-radius:50%;flex:none}.dot.r{background:#C02B1F}.dot.a{background:#D99000}.dot.g{background:#14743F}
.sms{margin:10px 15px 12px;background:#F7F7F9;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px}.bub{background:#fff;border:1px solid #E7E8EC;border-radius:10px;padding:7px 10px;font-size:12px;max-width:88%}
.me2{align-self:flex-end;background:${ac};color:#fff;border-radius:10px;padding:6px 10px;font-size:12px}.st2{display:flex;gap:8px;align-items:center}` });
  }

  // ================= CLINIC · Riverbend Physio =================
  {
    const ac = "#0E8C8A";
    const docs = [["Dr. Hannah Cole", "HC", "#0E8C8A"], ["Tom Reid", "TR", "#6A4FD0"], ["Aisha Khan", "AK", "#C2410C"], ["Ben Hart", "BH", "#2563EB"]];
    const appts = [[0, 0, 1, "Olivia Grant", "Sports massage", "g", "Arrived"], [0, 1.25, 1, "Noah Patel", "ACL rehab · wk 6", "b", "Booked"], [0, 3, 1, "Ella Moore", "Post-op ankle", "b", "Booked"], [0, 5, 1.5, "Liam Ford", "New patient", "v", "New"],
      [1, 0.5, 1, "James Wright", "Knee follow-up", "g", "In session"], [1, 2, 2, "Pilates rehab", "Group · 6 booked", "s", "Class"], [1, 5, 1, "Sara Ali", "Telehealth", "b", "Video"],
      [2, 0, 1.5, "Priya Shah", "Initial assessment", "v", "New"], [2, 2, 1, "Emma Lloyd", "Shoulder · s4", "b", "Booked"], [2, 4.5, 1, "Ruth Bell", "Back pain", "r", "No-show risk"],
      [3, 1, 1, "Ben Howard", "Neck pain", "b", "Booked"], [3, 3, 1, "Mo Farouk", "Hamstring", "b", "Booked"], [3, 4.25, 1, "Lunch & notes", "", "s", "Blocked"]];
    const H = 54, top = 38;
    const ev = appts.map(([d, s, l, n, w, c, st]) => `<div class="ev ${c}" style="left:calc(52px + (100% - 52px) / 4 * ${d} + 4px);top:${top + s * H + 2}px;height:${l * H - 5}px"><b>${n}</b><span>${w}</span><em>${st}</em></div>`).join("");
    const hrs = Array.from({ length: 8 }, (_, i) => `<div class="hr" style="top:${top + i * H}px"><span>${8 + i}:00</span></div>`).join("");
    const left = `<div class="card"><div class="ch">Diary · Monday 5 October<span><span class="chip b" style="margin-right:6px">Day</span>4 clinicians · 2 rooms</span></div><div class="cal">${hrs}<div class="heads">${docs.map(([n, i, c]) => `<div><span class="av" style="width:22px;height:22px;font-size:9px;background:${c}">${i}</span>${n}</div>`).join("")}</div>${ev}<div class="now" style="top:${top + 1.6 * H}px"><i></i></div></div></div>`;
    const q = (t, n, w, st, c, i, col) => `<div class="row"><span class="tm">${t}</span><span class="av" style="background:${col}">${i}</span><div><b>${n}</b><small>${w}</small></div><span class="chip ${c}" style="margin-left:auto">${st}</span></div>`;
    const right = `<div class="card"><div class="ch">Waiting room<span>Front desk</span></div>
${q("08:58", "Olivia Grant", "with Dr. Cole · Room 2", "Checked in", "g", "OG", "#14743F")}${q("09:21", "Noah Patel", "with Dr. Cole · forms done", "Arriving", "a", "NP", "#B45309")}${q("09:30", "James Wright", "with Tom Reid", "In session", "b", "JW", "#2349C7")}${q("10:00", "Priya Shah", "New · intake form sent", "Form pending", "v", "PS", "#6538D1")}
<div class="ch" style="border-top:1px solid #EEF1F2">Reminders & claims<span>today</span></div>
<div class="row"><div><b>24 reminders sent</b><small>22 confirmed · 2 no reply</small></div><span class="chip g" style="margin-left:auto">92%</span></div>
<div class="row"><div><b>Bupa claim · Ella Moore</b><small>£65 · submitted Fri</small></div><span class="chip a" style="margin-left:auto">Pending</span></div>
<div class="row"><div><b>AXA claim · James Wright</b><small>£48 · rejected: code</small></div><span class="chip r" style="margin-left:auto">Fix code</span></div></div>`;
    window.LANDINGS.clinic = app(light({ font: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap", ff: "'Figtree',system-ui,sans-serif", ac, bg: "#F2F6F6",
      navOn: "#E4F4F3", briefBg: "#0C3B3A", askBg: "#0C3B3A", briefAc: "#7FE0D6" }), {
      biz: "Riverbend Physio", tpl: "Clinic OS", owner: ["Dr. Hannah Cole", "Clinic director", ac], title: "Good morning, Hannah", sub: "Riverbend Physio, Leeds · Monday, 5 October 2026",
      search: "Find a patient", actions: `<span class="btn">Block time</span><span class="btn p">+ Book appointment</span>`,
      nav: [["Clinic", [["home", "Today"], ["cal", "Diary", "38", 1], ["users", "Patients"], ["doc", "Notes", "4"], ["msg", "Messages", "3"]]], ["Billing", [["inv", "Invoices"], ["heart", "Insurance claims", "2", 0, 1], ["box", "Packages"]]], ["Practice", [["chart", "Reports"], ["users", "Team"]]], ["Make it yours", [["spark", "Make it yours"], ["gear", "Settings"]]]],
      briefTitle: "38 appointments, 2 gaps to fill", brief: [["2", "open slots this afternoon", "Offer to waitlist"], ["4", "notes left unsigned", "Sign notes"], ["1", "rejected insurance claim", "Fix code", "#FF9A8F"], ["3", "patients due a review", "Book them"]],
      kpis: [["Appointments today", "38", "92% booked"], ["New patients (week)", "11", "+3 vs last"], ["No-show rate", "2.4%", "reminders on"], ["Claims outstanding", "£1,280", "6 claims"], ["Revenue today", "£2,415", "so far"]],
      cols: "1.55fr 1fr", left, right,
      css: `.cal{position:relative;flex:1;min-height:0}.heads{position:absolute;left:52px;right:0;top:0;height:${top}px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #EEF1F2}.heads div{display:flex;align-items:center;gap:6px;padding:0 8px;font-size:12px;font-weight:600}
.hr{position:absolute;left:0;right:0;border-top:1px solid #F1F3F4}.hr span{position:absolute;left:10px;top:3px;font-size:11px;color:#8A94A6}
.ev{position:absolute;width:calc((100% - 52px) / 4 - 8px);border-radius:8px;padding:5px 8px;font-size:11.5px;overflow:hidden;border-left:3px solid currentColor}.ev b{display:block;font-size:12px;color:#111827}.ev span{display:block;color:#4B5565}.ev em{position:absolute;right:6px;top:5px;font-style:normal;font-size:10px;font-weight:700;background:rgba(255,255,255,.75);border-radius:5px;padding:0 4px}.ev b{padding-right:58px}
.ev.g{background:#E3F5EA}.ev.b{background:#E7EEFF}.ev.v{background:#F0EAFF}.ev.s{background:#F1F2F4}.ev.r{background:#FDE8E6}
.now{position:absolute;left:46px;right:0;height:2px;background:#E5372B}.now i{position:absolute;left:-4px;top:-4px;width:10px;height:10px;border-radius:50%;background:#E5372B}
.tm{font:600 12px ui-monospace,monospace;color:#667085;width:40px}` });
  }

  // ================= PROPERTY · Keystone Lettings =================
  {
    const ac = "#2F7D32";
    const rows = [["Laura Kent", "14B Ancoats Mill", "£1,150", "1 Oct", "Paid", "g"], ["Omar Haddad", "3 Castlefield Quay", "£1,480", "1 Oct", "Paid", "g"], ["Grace Wu", "22 Northern Quarter", "£980", "1 Oct", "Part paid £600", "a"],
      ["Daniel Moss", "7A Didsbury Rd", "£1,250", "1 Oct", "4 days late", "r"], ["Chloe Evans", "11 Salford Wharf", "£1,320", "5 Oct", "Due today", "b"], ["Ivan Petrov", "9 Chorlton Pl", "£890", "5 Oct", "Due today", "b"],
      ["Fatima Noor", "2 Spinningfields", "£2,100", "1 Oct", "Paid", "g"], ["Hugo Lane", "41 Deansgate Sq", "£1,640", "8 Oct", "Upcoming", "s"]];
    const left = `<div class="card"><div class="ch">Rent roll · October<span>248 units · £212,400 due</span></div><div class="prog"><div><b>£172,050</b> collected</div><div class="pb"><i style="width:81%"></i></div><span class="mute">81%</span></div>
<table><tr><th>Tenant</th><th>Unit</th><th>Due</th><th style="text-align:right">Rent</th><th>Status</th></tr>${rows.map(([n, u, r, d, s, c]) => `<tr><td><b>${n}</b></td><td class="mute">${u}</td><td class="mute">${d}</td><td class="num">${r}</td><td><span class="chip ${c}">${s}</span></td></tr>`).join("")}</table></div>`;
    const t = (p, title, where, who, st, c) => `<div class="row"><span class="pr ${p}">${p === "u" ? "P1" : p === "m" ? "P2" : "P3"}</span><div><b>${title}</b><small>${where} · ${who}</small></div><span class="chip ${c}" style="margin-left:auto">${st}</span></div>`;
    const right = `<div class="card"><div class="ch">Maintenance<span>17 open · 4 urgent</span></div>
${t("u", "Boiler · no heating", "7A Didsbury Rd", "Northern Gas booked 11:00", "Engineer en route", "a")}${t("u", "Leak under kitchen sink", "14B Ancoats Mill", "AquaFix", "Scheduled 14:00", "b")}${t("m", "Broken window latch", "22 Northern Quarter", "awaiting quote", "Quote £85", "v")}${t("l", "Smoke alarm annual test", "Building 3", "in-house", "Done", "g")}
<div class="occ"><div class="ring"><div><b>96%</b><small>occupied</small></div></div><div class="ol"><div><span class="chip g">238 let</span></div><div><span class="chip a">6 notice given</span></div><div><span class="chip s">4 void</span></div><div class="mute" style="font-size:12px">12 leases renew in 60 days</div></div></div></div>`;
    window.LANDINGS.property = app(dark({ font: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap", ff: "'Manrope',system-ui,sans-serif", ac, bg: "#F3F5F1",
      sb: "#13221A", sbLine: "#21352A", navOn: "#203A2B", badge: "#264532", briefBg: "#fff", briefInk: "#14231B", briefAc: ac, biBg: "#F3F7F2", biLine: "#E1EAE0" }), {
      biz: "Keystone Lettings", tpl: "Property OS", owner: ["Adam Price", "Property manager", ac], title: "Portfolio", sub: "Keystone Lettings, Manchester · Monday, 5 October 2026",
      search: "Unit, tenant or landlord", actions: `<span class="btn">Log repair</span><span class="btn p">+ New tenancy</span>`,
      nav: [["Portfolio", [["home", "Overview", "", 1], ["building", "Units", "248"], ["users", "Tenants"], ["doc", "Leases", "12"]]], ["Money", [["inv", "Rent roll"], ["chart", "Landlord statements"], ["box", "Deposits"]]], ["Operations", [["tool", "Maintenance", "4", 0, 1], ["key", "Viewings", "6"], ["msg", "Messages", "9"]]], ["Make it yours", [["spark", "Make it yours"], ["gear", "Settings"]]]],
      briefTitle: "Rent is 81% in, 1 tenant is late", brief: [["£1,250", "Daniel Moss, 4 days late", "Send reminder", "#C02B1F"], ["4", "urgent repairs open", "Dispatch"], ["12", "leases renewing in 60 days", "Send offers"], ["6", "viewings booked this week", "See diary"]],
      kpis: [["Units managed", "248", "31 landlords"], ["Occupancy", "96%", "+1 pt"], ["Rent collected", "£172k", "of £212k"], ["Arrears", "£3,860", "5 tenants", "#C02B1F"], ["Avg repair time", "2.1 days", "-0.4"]],
      cols: "1.3fr 1fr", left, right,
      css: `.prog{display:flex;align-items:center;gap:12px;padding:10px 15px;font-size:13px}.pb{flex:1;height:8px;border-radius:5px;background:#EDF1EC;overflow:hidden}.pb i{display:block;height:100%;background:${ac};border-radius:5px}
.pr{font:700 10.5px ui-monospace,monospace;border-radius:5px;padding:2px 5px}.pr.u{background:#FDE8E6;color:#C02B1F}.pr.m{background:#FFF3D6;color:#996000}.pr.l{background:#EEF0F3;color:#4B5565}
.occ{display:flex;gap:16px;align-items:center;padding:12px 15px}.ring{width:104px;height:104px;border-radius:50%;background:conic-gradient(${ac} 0 96%,#E5EBE4 96% 100%);display:grid;place-items:center;flex:none}.ring div{width:78px;height:78px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center;line-height:1.1}.ring b{font-size:20px;display:block}.ring small{color:#667085;font-size:11px}
.ol{display:flex;flex-direction:column;gap:6px}` });
  }

  // ================= REAL ESTATE · Harbor & Vine Realty =================
  {
    const ac = "#B7791F";
    const k = (n, w, price, tag, c, i) => `<div class="kt"><div style="display:flex;gap:8px;align-items:center"><span class="av" style="width:24px;height:24px;font-size:9.5px;background:${c}">${i}</span><b>${n}</b></div><small>${w}</small><div class="kf"><span class="pz">${price}</span>${tag}</div></div>`;
    const col = (t, v, items) => `<div class="kc"><h4>${t}<span>${v}</span></h4>${items.join("")}</div>`;
    const left = `<div class="card"><div class="ch">Buyer pipeline<span>142 active · $41.6M</span></div><div class="kan">
${col("New lead", "18", [k("Kevin & Ana Liu", "Zillow · 3bd under $1.2M", "$1.2M", '<span class="chip v">2m ago</span>', "#6538D1", "KL"), k("Marcus Bell", "Website · condo downtown", "$850k", '<span class="chip a">Reply due</span>', "#B45309", "MB")])}
${col("Viewing", "9", [k("The Okafors", "Sat 11:00 · 418 Laurel St", "$1.15M", '<span class="chip b">Confirmed</span>', "#2349C7", "TO"), k("Jen Park", "Sun 14:00 · 22 Bay View", "$890k", '<span class="chip b">Booked</span>', "#0E8C7A", "JP")])}
${col("Offer", "4", [k("Dev Sharma", "9 Coral Way · counter at $1.31M", "$1.32M", '<span class="chip a">Countered</span>', "#C2410C", "DS")])}
${col("Escrow", "3", [k("Sophie Grant", "61 Sunset Cliffs · inspection ok", "$2.05M", '<span class="chip g">Day 18/30</span>', "#14743F", "SG"), k("Tom & Ria Vega", "Appraisal Thu", "$760k", '<span class="chip a">Appraisal</span>', "#2563EB", "TV")])}
</div></div>`;
    const v = (t, addr, who, st, c) => `<div class="row"><span class="tm">${t}</span><div><b>${addr}</b><small>${who}</small></div><span class="chip ${c}" style="margin-left:auto">${st}</span></div>`;
    const lst = (a, p, m, c1, c2, st, c) => `<div class="ls"><div class="lh" style="background:linear-gradient(160deg,${c1},${c2})"><span class="chip ${c}">${st}</span><i></i></div><div class="lb"><b>${p}</b><small>${a}</small><small>${m}</small></div></div>`;
    const right = `<div class="card"><div class="ch">Today's viewings<span>3 · Nina</span></div>
${v("11:00", "418 Laurel St · 3bd 2ba", "The Okafors · pre-approved", "Confirmed", "g")}${v("14:00", "22 Bay View #4 · 2bd", "Jen Park · first visit", "Booked", "b")}${v("16:30", "77 Juniper Ave · open house", "14 RSVPs", "Open house", "v")}
<div class="ch" style="border-top:1px solid #F0EEE9">Active listings<a>All 23</a></div><div class="lsg">${lst("418 Laurel St", "$1,149,000", "31 days · 42 saves", "#C9B79C", "#8D7A5F", "Active", "g")}${lst("9 Coral Way", "$1,325,000", "Offer in", "#9DB4C7", "#5C7488", "Under offer", "a")}${lst("22 Bay View #4", "$889,000", "New · 6 days", "#BFC9B4", "#7C8A6E", "New", "b")}</div></div>`;
    window.LANDINGS.realestate = app(light({ font: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap", ff: "'Hanken Grotesk',system-ui,sans-serif", ac, bg: "#F6F4EF",
      line: "#E7E3DA", line2: "#F0EEE9", navOn: "#FBF3E4", briefBg: "#221B12", askBg: "#221B12", briefAc: "#F2C46D" }), {
      biz: "Harbor & Vine Realty", tpl: "Agent CRM", owner: ["Nina Alvarez", "Broker", ac], title: "Good morning, Nina", sub: "Harbor & Vine Realty, San Diego · Monday, 5 October 2026",
      search: "Contact, address or MLS #", actions: `<span class="btn">Log a showing</span><span class="btn p">+ New lead</span>`,
      nav: [["Sell", [["home", "Today"], ["board", "Pipeline", "142", 1], ["users", "Contacts"], ["msg", "Inbox", "9", 0, 1]]], ["Listings", [["building", "Listings", "23"], ["key", "Viewings", "6"], ["doc", "Offers", "4"]]], ["Close", [["inv", "Escrow", "3"], ["chart", "Commissions"]]], ["Make it yours", [["spark", "Make it yours"], ["gear", "Settings"]]]],
      briefTitle: "2 leads need a reply in the next hour", brief: [["2", "new leads, under 1h old", "Call now", "#FFB98A"], ["1", "counter-offer to answer", "Open offer"], ["3", "viewings today", "Send directions"], ["5", "past clients' anniversaries", "Send note"]],
      kpis: [["Active buyers", "142", "+19 this week"], ["Viewings this week", "28", "6 today"], ["Under offer", "$6.8M", "7 homes"], ["Pending commission", "$184k", "5 deals"], ["Lead reply time", "4 min", "median"]],
      cols: "1.75fr 1fr", left, right,
      css: `.kan{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px;flex:1}.kc{background:#F7F5F0;border-radius:10px;padding:9px;display:flex;flex-direction:column;gap:8px}.kc h4{margin:0 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#7A7266;display:flex;justify-content:space-between}
.kt{background:#fff;border:1px solid #E7E3DA;border-radius:9px;padding:9px;display:flex;flex-direction:column;gap:5px}.kt b{font-size:12.5px}.kt small{color:#7A7266;font-size:11.5px}.kf{display:flex;justify-content:space-between;align-items:center;gap:4px}.pz{font-weight:700;font-size:13px}
.tm{font:600 12px ui-monospace,monospace;color:#7A7266;width:40px}.lsg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:10px 15px}.ls{border:1px solid #E7E3DA;border-radius:9px;overflow:hidden}
.lh{height:62px;position:relative;padding:5px}.lh i{position:absolute;left:30%;bottom:0;width:40%;height:34px;background:rgba(255,255,255,.75);clip-path:polygon(0 40%,50% 0,100% 40%,100% 100%,0 100%)}.lb{padding:6px 8px}.lb b{display:block;font-size:12.5px}.lb small{display:block;color:#7A7266;font-size:11px}` });
  }

  // ================= ERP · Oak & Iron Furniture =================
  {
    const ac = "#C47A2C";
    const run = (id, item, qty, done, stage, due, c) => `<div class="rn"><div class="rh"><b>${id} · ${item}</b><span class="chip ${c}">${stage}</span></div><div class="rb"><div class="pbar"><i style="width:${done}%"></i></div><span class="mute">${qty}</span><span class="mute">due ${due}</span></div></div>`;
    const left = `<div class="card"><div class="ch">Production runs<span>14 open · 3 due today</span></div>
${run("#882", "Oak dining table 180", "16 / 24", 66, "Finishing", "Today", "b")}${run("#883", "Steel frame chair", "48 / 120", 40, "Welding", "Wed", "b")}${run("#879", "Walnut sideboard", "4 / 10", 40, "Waiting on walnut", "Today", "r")}${run("#884", "Bench 140 · oiled", "0 / 30", 0, "Scheduled", "Fri", "s")}${run("#877", "Coffee table · ash", "40 / 40", 100, "Done", "Fri", "g")}
<div class="ch" style="border-top:1px solid #EFEDEA">Stock levels<a>All 312 SKUs</a></div>
<table><tr><th>SKU</th><th>Item</th><th style="text-align:right">On hand</th><th style="text-align:right">Reorder at</th><th>Status</th></tr>
<tr><td class="mono">RM-OAK-27</td><td>Oak board 27mm (m²)</td><td class="num">84</td><td class="num">60</td><td><span class="chip g">OK</span></td></tr>
<tr><td class="mono">RM-WAL-27</td><td>Walnut board 27mm (m²)</td><td class="num">6</td><td class="num">20</td><td><span class="chip r">PO sent</span></td></tr>
<tr><td class="mono">HW-LEG-S4</td><td>Steel leg set</td><td class="num">38</td><td class="num">40</td><td><span class="chip a">Low</span></td></tr></table></div>`;
    const o = (id, cust, items, val, st, c) => `<div class="row"><span class="mono" style="width:62px">${id}</span><div><b>${cust}</b><small>${items}</small></div><div style="margin-left:auto;text-align:right"><b>${val}</b><span class="chip ${c}">${st}</span></div></div>`;
    const right = `<div class="card"><div class="ch">B2B orders<span>38 open · €112k</span></div>
${o("SO-2214", "Hotel Ambiorix, Brussels", "40 chairs · 10 tables", "€18,400", "In production", "b")}${o("SO-2216", "Studio Noord, Antwerp", "6 sideboards", "€9,120", "Waiting stock", "r")}${o("SO-2219", "Café Lindt, Ghent", "24 chairs", "€4,560", "Packed", "g")}${o("SO-2220", "Maison Verte, Lille", "12 benches", "€5,880", "Confirmed", "v")}${o("SO-2221", "Kantoor Plus", "Quote · 60 desks", "€31,200", "Quote sent", "a")}
<div class="sh"><div><b>Shipping today</b><small>3 pallets · DHL Freight 15:00</small></div><span class="chip g live" style="margin-left:auto">On time</span></div></div>`;
    window.LANDINGS.erp = app(dark({ font: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap", ff: "'IBM Plex Sans',system-ui,sans-serif", ac, fs: 13.5, bg: "#F2F1EF",
      sb: "#1C1A17", sbLine: "#2E2A25", navOn: "#2E2924", badge: "#36302A", line: "#E5E2DD", line2: "#EFEDEA", briefBg: "#2A231B", briefAc: "#F0B36B" }), {
      biz: "Oak & Iron Furniture", tpl: "Maker ERP", owner: ["Pieter Claes", "Operations", ac], title: "Operations", sub: "Oak & Iron Furniture, Ghent · Monday, 5 October 2026",
      search: "SKU, order or customer", actions: `<span class="btn">Receive stock</span><span class="btn p">+ Sales order</span>`,
      nav: [["Make", [["home", "Overview", "", 1], ["factory", "Production", "14"], ["box", "Inventory", "9", 0, 1], ["cart", "Purchasing", "3"]]], ["Sell", [["doc", "Sales orders", "38"], ["users", "Customers"], ["truck", "Shipping", "3"]]], ["Finance", [["inv", "Invoices"], ["chart", "Reports"]]], ["Make it yours", [["spark", "Make it yours"], ["gear", "Settings"]]]],
      briefTitle: "Walnut shortage blocks 1 run and 1 order", brief: [["6 m²", "walnut left, need 20", "Chase supplier", "#FF9A8F"], ["3", "runs due today", "Check floor"], ["€31.2k", "quote awaiting reply", "Follow up"], ["3", "pallets ship at 15:00", "Print labels"]],
      kpis: [["Open orders", "38", "€112k"], ["Runs in production", "14", "3 due today"], ["Low-stock SKUs", "9", "1 critical", "#C02B1F"], ["On-time delivery", "96%", "last 30 days"], ["Gross margin", "41%", "month to date"]],
      cols: "1.25fr 1fr", left, right,
      css: `.mono{font:500 11.5px 'IBM Plex Mono',monospace;color:#5B5650}.rn{padding:8px 15px;border-bottom:1px solid #EFEDEA}.rh{display:flex;justify-content:space-between;align-items:center}.rh b{font-size:13px}
.rb{display:grid;grid-template-columns:1fr 64px 70px;gap:10px;align-items:center;margin-top:5px;font-size:12px}.pbar{height:6px;border-radius:4px;background:#EFEDEA;overflow:hidden}.pbar i{display:block;height:100%;background:${ac}}
.row .chip{margin-top:3px}.sh{display:flex;align-items:center;gap:10px;margin:10px 15px;padding:10px 12px;border-radius:10px;background:#F7F4EF;border:1px dashed #DCCFBE}.sh b{display:block;font-size:13px}.sh small{color:#667085;font-size:12px}` });
  }
})();
