// Stay OS (The Linden House, Lisbon): tape chart + reservation drawer + housekeeping, modelled on Mews / Cloudbeds.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const CH = {
    direct: { name: "Direct", c: "#2F5D50", soft: "#E3EEE9", ink: "#1E3D34" },
    booking: { name: "Booking.com", c: "#1F4FB5", soft: "#E2E9F9", ink: "#173A86" },
    expedia: { name: "Expedia", c: "#C98A0B", soft: "#FBF0D6", ink: "#6E4A00" },
    airbnb: { name: "Airbnb", c: "#D9474C", soft: "#FBE4E4", ink: "#8E2227" },
    group: { name: "Group", c: "#6E55A3", soft: "#ECE7F6", ink: "#47356F" }
  };
  const DAYS = ["Sat 3", "Sun 4", "Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9", "Sat 10", "Sun 11", "Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
  const TODAY = 2, N = DAYS.length;
  const RATE = [168, 172, 148, 152, 158, 176, 198, 204, 162, 156, 158, 164, 178, 196];

  // [room, type, hk status, attendant, bookings: [start, nights, guest, channel, flag]]
  const TYPES = [
    ["Classic Double", [
      ["101", "dirty", "Ana · arrival 14:00", [[0, 2, "Kenji Watanabe", "direct"], [2, 2, "Laura Bianchi", "expedia"], [5, 4, "Pierre & Anne Roux", "booking"], [10, 3, "Hannah Weiss", "direct"]]],
      ["102", "progress", "Rui · stay-over", [[1, 4, "Mark & Ella Ross", "airbnb"], [6, 2, "Tomás Ferreira", "direct"], [9, 4, "Atlantic Pharma offsite", "group", "tent"]]],
      ["103", "dirty", "Marta · departure", [[0, 2, "Ana Sousa", "direct"], [4, 3, "Lucas Meyer", "booking"], [8, 2, "Yuki Tanaka", "expedia"]]],
      ["104", "inspected", "Ready", [[2, 1, "David Kim", "booking", "late"], [3, 4, "Olivia Brown", "direct"], [9, 4, "Atlantic Pharma offsite", "group", "tent"]]]
    ]],
    ["Deluxe · Tagus view", [
      ["201", "clean", "Stay-over done", [[1, 3, "Emma & Noah Clarke", "booking"], [4, 5, "Rafael Duarte", "direct"], [11, 3, "Sara Lindqvist", "airbnb"]]],
      ["202", "dnd", "Do not disturb", [[0, 5, "Giulia Romano", "expedia"], [6, 3, "James Ward", "booking"], [10, 4, "Atlantic Pharma offsite", "group", "tent"]]],
      ["203", "inspected", "Ready", [[2, 3, "Okonkwo family", "direct"], [7, 2, "Lea Fischer", "booking"], [10, 4, "Atlantic Pharma offsite", "group", "tent"]]],
      ["204", "clean", "Clean · to inspect", [[2, 3, "Sophie Martin", "booking", "sel"], [6, 4, "Chen Wei", "expedia"], [11, 3, "Isabel Costa", "direct"]]]
    ]],
    ["Junior Suite", [
      ["301", "progress", "Marta · departure", [[0, 2, "Alexandre Dubois", "direct"], [5, 3, "Patel · honeymoon", "direct"], [9, 4, "Martina López", "booking"]]],
      ["302", "ooo", "Out of order", [[2, 3, "Out of order · bathroom regrout", "ooo"], [6, 3, "Ingrid Larsen", "airbnb"], [10, 4, "Atlantic Pharma offsite", "group", "tent"]]]
    ]],
    ["Attic Loft", [
      ["401", "clean", "Stay-over done", [[1, 6, "Ethan Brooks", "direct"], [8, 2, "Mia Schmidt", "booking"], [11, 3, "Noor Haddad", "expedia"]]]
    ]]
  ];
  const ROOMS = TYPES.flatMap(t => t[1]);

  // nightly occupancy computed from the chart (out-of-order rooms are not sellable)
  const occ = DAYS.map((_, d) => {
    let sold = 0, ooo = 0;
    ROOMS.forEach(r => r[3].forEach(([s, n, , ch]) => { if (d >= s && d < s + n) { if (ch === "ooo") ooo++; else sold++; } }));
    return Math.round(sold / (ROOMS.length - ooo) * 100);
  });

  const LW = 176, COL = 57, RH = 34, GH = 22;
  const HK = {
    dirty: ["Dirty", "#C2410C", "#FDEBDD"], progress: ["In progress", "#A16207", "#FEF3C7"], clean: ["Clean", "#1E7A52", "#DDF3E7"],
    inspected: ["Inspected", "#14532D", "#C9EBD7"], ooo: ["Out of order", "#3F3F46", "#E7E5E4"], dnd: ["DND", "#6E55A3", "#ECE7F6"]
  };

  let y = 0, rows = "", bars = "";
  TYPES.forEach(([tname, rooms]) => {
    rows += `<div class="grp" style="top:${y}px"><span>${tname}</span><em>${rooms.length} ${rooms.length > 1 ? "rooms" : "room"}</em></div>`;
    y += GH;
    rooms.forEach(([no, hk, , bk]) => {
      const h = HK[hk];
      rows += `<div class="rw" style="top:${y}px"><div class="rl"><b>${no}</b><i style="background:${h[1]}" title="${h[0]}"></i></div></div>`;
      bk.forEach(([s, n, g, ch, f]) => {
        const left = LW + s * COL + COL / 2 + 2, w = n * COL - 4, end = s + n;
        let cls = "bar", style;
        if (ch === "ooo") {
          bars += `<div class="bar ooo" style="left:${left}px;top:${y + 5}px;width:${w}px"><span>${g}</span></div>`;
          return;
        }
        const c = CH[ch];
        if (end <= TODAY) cls += " past";
        else if (s < TODAY) cls += " inh";
        else if (s === TODAY) cls += " arr";
        if (f === "tent") cls += " tent";
        if (f === "sel") cls += " sel";
        if (f === "late") cls += " late";
        style = `left:${left}px;top:${y + 5}px;width:${w}px;--c:${c.c};--s:${c.soft};--k:${c.ink}`;
        const icon = s === TODAY ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>` : "";
        bars += `<div class="${cls}" style="${style}">${icon}<span>${g}</span>${n > 1 ? `<em>${n}n</em>` : ""}</div>`;
      });
      y += RH;
    });
  });
  const bodyH = y;

  const head = DAYS.map((d, i) => {
    const [dn, dd] = d.split(" ");
    const wk = dn === "Sat" || dn === "Sun";
    return `<div class="dh${i === TODAY ? " td" : ""}${wk ? " wk" : ""}" style="left:${LW + i * COL}px"><span>${dn}</span><b>${dd}</b></div>`;
  }).join("");
  const occRow = occ.map((o, i) => `<div class="oc" style="left:${LW + i * COL}px"><div class="ob"><i style="width:${o}%;background:${o >= 90 ? "#2F5D50" : o >= 70 ? "#6E9E8C" : "#B9CFC6"}"></i></div><span>${o}%</span></div>`).join("");
  const rateRow = RATE.map((r, i) => `<div class="rt${i === TODAY ? " td" : ""}" style="left:${LW + i * COL}px">€${r}</div>`).join("");
  const grid = DAYS.map((d, i) => `<div class="gl${i === TODAY ? " tdc" : ""}${d.startsWith("Sat") || d.startsWith("Sun") ? " wkc" : ""}" style="left:${LW + i * COL}px"></div>`).join("");

  const legend = Object.values(CH).map(c => `<span class="lg"><i style="background:${c.c}"></i>${c.name}</span>`).join("");

  const hkTiles = ROOMS.map(([no, hk, note]) => {
    const h = HK[hk];
    return `<div class="hk" style="border-color:${h[1]}33"><div class="hkt"><b>${no}</b><span class="hs" style="background:${h[2]};color:${h[1]}">${h[0]}</span></div><small>${note}</small></div>`;
  }).join("");

  const ic = p => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    sync: '<path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>', check: '<path d="M5 12l5 5 9-10"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', msg: '<path d="M4 5h16v11H8l-4 4z"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    chev: '<path d="M9 6l6 6-6 6"/>', left: '<path d="M15 6l-6 6 6 6"/>', bed: '<path d="M3 18V8M21 18v-5a3 3 0 0 0-3-3H10v8M3 14h18"/><circle cx="6.5" cy="11" r="1.5"/>'
  };

  window.LANDINGS.hotel = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Manrope:wght@400;500;600;700;800&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Manrope',system-ui,sans-serif;color:#1F2420;background:#F6F3EC}
.top{height:56px;background:#1B2621;color:#E9EDE6;display:flex;align-items:center;gap:18px;padding:0 18px;white-space:nowrap}
.brand{display:flex;align-items:center;gap:11px}.brand i{width:34px;height:34px;border-radius:50%;border:1.5px solid #C9A86A;color:#E7D3A8;display:grid;place-items:center;font:600 18px 'Newsreader',serif;font-style:normal}
.brand b{display:block;white-space:nowrap;font:600 17px/1.1 'Newsreader',serif;letter-spacing:.01em;color:#F4EFE3}.brand span{font-size:10px;letter-spacing:.16em;color:#9BB0A5;font-weight:700}
.tabs{display:flex;gap:2px}.tabs a{padding:8px 10px;font-size:12.5px;border-radius:8px;color:#AFC0B6;font-weight:600;text-decoration:none;display:flex;align-items:center;gap:7px}
.tabs a.on{background:#2B3A33;color:#fff}.tabs em{font-style:normal;background:#C2410C;color:#fff;font-size:10.5px;border-radius:9px;padding:0 6px;line-height:17px}
.tr{margin-left:auto;display:flex;align-items:center;gap:10px}.srch{display:flex;align-items:center;gap:8px;background:#26322C;border:1px solid #33433B;border-radius:9px;padding:7px 11px;color:#8FA399;width:190px}
.ask{display:flex;align-items:center;gap:6px;border:1px solid #4A5A51;border-radius:9px;padding:7px 11px;color:#E7D3A8;font-weight:700}
.new{background:#C9A86A;color:#1B2621;border-radius:9px;padding:8px 13px;font-weight:800}
.av{width:32px;height:32px;border-radius:50%;background:#7A5AA6;color:#fff;display:grid;place-items:center;font-weight:800;font-size:11px}
.sub{height:50px;display:flex;align-items:center;gap:12px;padding:0 20px;border-bottom:1px solid #E4DED1;background:#FBF9F4}
.dr{display:flex;align-items:center;gap:6px}.dr b{font:600 17px 'Newsreader',serif;padding:0 4px}.dr span{width:28px;height:28px;border:1px solid #DDD6C7;border-radius:7px;display:grid;place-items:center;background:#fff}
.chip{border:1px solid #DDD6C7;background:#fff;border-radius:8px;padding:5px 10px;font-weight:700;font-size:12px}
.seg{display:flex;background:#EFEADF;border-radius:8px;padding:3px}.seg span{padding:4px 10px;border-radius:6px;font-weight:700;font-size:12px;color:#6B6A60}.seg span.on{background:#fff;color:#1F2420;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.lg{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:#4B4F47;margin-right:10px}.lg i{width:10px;height:10px;border-radius:3px}
.sync{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:12px;color:#2F5D50;font-weight:700;background:#E3EEE9;padding:5px 10px;border-radius:8px}
.wrap{display:grid;grid-template-columns:976px 416px;gap:16px;padding:14px 16px}
.card{background:#fff;border:1px solid #E6E0D3;border-radius:14px;box-shadow:0 1px 2px rgba(40,35,20,.04)}
.tc{position:relative;height:606px;overflow:hidden}
.tch{display:flex;align-items:center;justify-content:space-between;padding:12px 16px 0}.tch h2{margin:0;font:600 19px 'Newsreader',serif}.tch p{margin:0;color:#77756A;font-size:12px}
.stats{display:flex;gap:14px;font-size:12px;color:#55574F}.stats b{color:#1F2420}
.chart{position:absolute;left:0;right:0;top:46px;bottom:0}
.dh{position:absolute;top:4px;width:${COL}px;text-align:center;font-size:10.5px;color:#8A877B;font-weight:700;letter-spacing:.04em;text-transform:uppercase}.dh b{display:block;font:600 16px 'Newsreader',serif;color:#2B2E28;letter-spacing:0;text-transform:none}
.dh.wk{color:#B08D57}.dh.td span{color:#fff;background:#2F5D50;border-radius:4px;padding:1px 5px}
.oc{position:absolute;top:44px;width:${COL}px;padding:0 8px;display:flex;flex-direction:column;align-items:center;gap:2px}.ob{width:100%;height:4px;background:#EFEADF;border-radius:2px;overflow:hidden}.ob i{display:block;height:100%}.oc span{font-size:10.5px;font-weight:800;color:#4B4F47}
.rt{position:absolute;top:70px;width:${COL}px;text-align:center;font-size:11px;color:#6B6A60;font-weight:600}.rt.td{color:#2F5D50;font-weight:800}
.hl{position:absolute;left:12px;font-size:10.5px;font-weight:800;letter-spacing:.08em;color:#9A968A;text-transform:uppercase}
.body{position:absolute;left:0;right:0;top:92px;height:${bodyH}px}
.gl{position:absolute;top:0;bottom:0;width:${COL}px;border-left:1px solid #F0ECE3}.gl.wkc{background:#FBF8F1}.gl.tdc{background:#EEF5F1;border-left:1.5px solid #2F5D50}
.grp{position:absolute;left:0;right:0;height:${GH}px;display:flex;align-items:center;gap:8px;padding-left:14px;background:#F7F4ED;border-top:1px solid #ECE6DA;border-bottom:1px solid #ECE6DA;font-size:11px;font-weight:800;color:#55574F;letter-spacing:.03em}
.grp em{font-style:normal;font-weight:600;color:#9A968A}
.rw{position:absolute;left:0;right:0;height:${RH}px;border-bottom:1px solid #F2EEE6}
.rl{width:${LW}px;height:100%;display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 24px;background:#fff;position:relative;z-index:1;border-right:1px solid #ECE6DA}
.rl b{font:600 15px 'Newsreader',serif}.rl i{width:9px;height:9px;border-radius:50%}
.bar{position:absolute;height:24px;border-radius:7px;background:var(--s);border:1px solid color-mix(in srgb,var(--c) 30%,transparent);border-left:4px solid var(--c);color:var(--k);display:flex;align-items:center;gap:5px;padding:0 7px;font-size:11.5px;font-weight:700;white-space:nowrap;overflow:hidden;z-index:2}
.bar span{overflow:hidden;text-overflow:ellipsis}.bar em{margin-left:auto;font-style:normal;font-size:10px;opacity:.7;font-weight:800}
.bar.inh{background:var(--c);color:#fff;border-color:var(--c)}
.bar.past{background:#EEECE6;border-color:#DDD9CF;border-left-color:#B9B5AA;color:#8A877B}
.bar.arr{background:#fff;border:1.5px solid var(--c);border-left:4px solid var(--c)}
.bar.tent{background:repeating-linear-gradient(135deg,var(--s) 0 6px,#fff 6px 12px);border-style:dashed;border-left-style:solid}
.bar.late{border-color:#E8590C;border-left-color:#E8590C;background:#FFF1E6;color:#9A3412}
.bar.sel{box-shadow:0 0 0 3px rgba(47,93,80,.25),0 6px 16px rgba(31,79,181,.25);z-index:3}
.bar.ooo{background:repeating-linear-gradient(135deg,#F5E7C4 0 6px,#FBF4E2 6px 12px);border:1px solid #E0C98F;border-left:4px solid #B7922E;color:#6E5617;font-weight:700}
.now{position:absolute;top:-6px;bottom:0;width:2px;background:#2F5D50;left:${LW + TODAY * COL + Math.round(COL * 0.62)}px;z-index:4}.now:before{content:none;position:absolute;bottom:4px;left:4px;font-size:10px;font-weight:800;color:#2F5D50;background:#EEF5F1;padding:0 4px;border-radius:4px}
.hkc{margin-top:12px;padding:12px 14px}.hkh{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}.hkh h3{margin:0;font:600 17px 'Newsreader',serif}.hkh p{margin:0;font-size:12px;color:#55574F}.hkh p b{color:#1F2420}
.hks{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:6px}
.hk{border:1.5px solid;border-radius:10px;padding:7px 8px;display:flex;flex-direction:column;gap:4px;min-width:0}.hkt{display:flex;flex-direction:column;align-items:flex-start;gap:3px}
.hk b{font:600 15px 'Newsreader',serif}.hs{font-size:9.5px;font-weight:800;padding:1px 6px;border-radius:5px;white-space:nowrap}.hk small{font-size:10.5px;color:#6B6A60;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pn{height:778px;display:flex;flex-direction:column;overflow:hidden}
.ph{position:relative;height:104px;flex-shrink:0;background:url(img/hotel/room.jpg) center 58%/cover;border-radius:14px 14px 0 0}
.ph:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,28,24,.05),rgba(20,28,24,.72));border-radius:14px 14px 0 0}
.pht{position:absolute;left:16px;right:16px;bottom:11px;z-index:1;color:#fff;display:flex;align-items:flex-end;justify-content:space-between}
.pht b{display:block;font:600 22px/1.1 'Newsreader',serif}.pht span{font-size:12px;opacity:.9;font-weight:600}
.bk{background:#1F4FB5;color:#fff;font-size:11px;font-weight:800;padding:3px 8px;border-radius:6px}
.pb{padding:12px 16px;display:flex;flex-direction:column;gap:10px;flex:1;min-height:0}.pb>*{flex-shrink:0}
.st{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #ECE6DA;border-radius:10px;overflow:hidden}.st div{padding:8px 10px;border-right:1px solid #ECE6DA}.st div:last-child{border-right:0}
.st small{display:block;font-size:10.5px;color:#8A877B;font-weight:700;letter-spacing:.04em;text-transform:uppercase}.st b{font-size:13px}
.ln{display:flex;align-items:center;gap:8px;font-size:12.5px}.ln .k{color:#77756A;width:86px;flex:none}.ln b{font-weight:700}
.pre{display:flex;flex-direction:column;gap:6px;background:#F7F4ED;border-radius:10px;padding:9px 11px}
.pi{display:flex;align-items:center;gap:8px;font-size:12px}.pi .ok{width:18px;height:18px;border-radius:50%;background:#2F5D50;color:#fff;display:grid;place-items:center;flex:none}.pi .wt{width:18px;height:18px;border-radius:50%;border:1.5px dashed #B08D57;color:#B08D57;display:grid;place-items:center;flex:none}
.pi em{margin-left:auto;font-style:normal;font-size:11px;color:#8A877B}
.fo{border:1px solid #ECE6DA;border-radius:10px}.fo .r{display:flex;justify-content:space-between;align-items:center;padding:6px 11px;font-size:12px;border-bottom:1px solid #F2EEE6}.fo .r small{color:#8A877B}
.fo .r.t{border-bottom:0;font-weight:800;font-size:13px}.fo .r.bal{background:#FFF7E8;border-radius:0 0 10px 10px;border-bottom:0;font-weight:800;color:#8A5A00;font-size:13.5px}
.tag{font-size:10px;font-weight:800;padding:1px 6px;border-radius:5px;margin-left:6px}
.msg{display:flex;flex-direction:column;gap:5px}.m{max-width:90%;padding:6px 10px;border-radius:10px;font-size:11.5px;line-height:1.3}.m.o{background:#EFEADF;align-self:flex-start}.m.g{background:#2F5D50;color:#fff;align-self:flex-end}
.m small{display:block;font-size:10px;opacity:.7;margin-top:2px}
.act{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #ECE6DA}.act span{flex:1;text-align:center;border:1px solid #DDD6C7;border-radius:9px;padding:9px 6px;font-weight:800;font-size:12.5px}
.act span.p{background:#2F5D50;border-color:#2F5D50;color:#fff;flex:1.3}
</style></head><body>
<div class="top"><div class="brand"><i>L</i><div><b>The Linden House</b><span>STAY OS</span></div></div>
<div class="tabs"><a>Front desk</a><a class="on">Calendar</a><a>Reservations</a><a>Housekeeping <em>4</em></a><a>Rates &amp; availability</a><a>Channels</a><a>Guests</a><a>Reports</a></div>
<div class="tr"><div class="srch">${ic(I.search)}Guest, booking ref or room</div><div class="ask">${ic(I.spark)}Ask</div><div class="new">+ Reservation</div><div class="av">IC</div></div></div>
<div class="sub"><div class="dr"><span>${ic(I.left)}</span><b>Sat 3 – Fri 16 Oct 2026</b><span>${ic(I.chev)}</span></div><span class="chip">Today</span><div class="seg"><span>7 nights</span><span class="on">14 nights</span><span>30 nights</span></div>
<div style="margin-left:8px">${legend}</div><div class="sync">${ic(I.sync)}Booking.com · Expedia · Airbnb synced 2 min ago</div></div>
<div class="wrap"><div>
<div class="card tc"><div class="tch"><div><h2>Room calendar</h2></div><div class="stats"><span>Tonight <b>8 / 10 sold</b></span><span>Arrivals <b>4</b></span><span>Departures <b>3</b></span><span>Stay-overs <b>4</b></span><span>1 out of order</span></div></div>
<div class="chart">${grid}<div class="hl" style="top:12px">Night</div><div class="hl" style="top:44px">Occupancy</div><div class="hl" style="top:70px">BAR · Classic</div>${head}${occRow}${rateRow}
<div class="body">${rows}${bars}<div class="now"></div></div></div></div>
<div class="card hkc"><div class="hkh"><h3>Housekeeping · today</h3><p><b>3</b> departures to clean · <b>101</b> needed for a 14:00 arrival · attendants Ana, Rui, Marta</p></div><div class="hks">${hkTiles}</div></div>
</div>
<div class="card pn"><div class="ph"><div class="pht"><div><b>Sophie Martin</b><span>Arriving today · ETA 15:30 · 2 adults</span></div><span class="bk">Booking.com</span></div></div>
<div class="pb">
<div class="st"><div><small>Check-in</small><b>Mon 5 Oct</b></div><div><small>Check-out</small><b>Thu 8 Oct</b></div><div><small>Nights</small><b>3</b></div></div>
<div class="ln"><span class="k">Room</span><b>204 · Deluxe Tagus view</b><span class="tag" style="background:#DDF3E7;color:#1E7A52">Clean · to inspect</span></div>
<div class="ln"><span class="k">Rate plan</span><b>Flexible · breakfast included</b></div>
<div class="ln"><span class="k">OTA ref</span><b style="font-family:ui-monospace,Menlo,monospace;font-weight:600">BDC 4471 902 115</b></div>
<div class="pre"><div class="pi"><span class="ok">${ic(I.check)}</span>Online check-in completed<em>Sat 18:40</em></div>
<div class="pi"><span class="ok">${ic(I.check)}</span>Passport scanned · French national<em>2 guests</em></div>
<div class="pi"><span class="wt">${ic(I.shield)}</span>SIBA guest registration queued<em>sends on check-in</em></div></div>
<div class="fo"><div class="r"><span>Room · 3 × €198.00 <small>Booking.com virtual card</small></span><b>€594.00</b></div>
<div class="r"><span>Late checkout 14:00 <span class="tag" style="background:#FBF0D6;color:#6E4A00">Upsell accepted</span></span><b>€25.00</b></div>
<div class="r"><span>Lisbon city tax <small>2 guests × 3 nights × €4</small></span><b>€24.00</b></div>
<div class="r t"><span>Total</span><span>€643.00</span></div><div class="r"><span>Paid</span><span style="color:#1E7A52;font-weight:800">−€594.00</span></div><div class="r bal"><span>Balance due at desk</span><span>€49.00</span></div></div>
<div class="msg"><div class="m o">Olá Sophie! Your room at The Linden House is ready from 15:00. Check in online and skip the desk.<small>Auto · pre-arrival · Sat 10:00</small></div>
<div class="m g">Merci! Arriving around 15:30. Could we have a quiet room?<small>Sophie · WhatsApp · Sat 18:42</small></div>
<div class="m o" style="background:#E3EEE9;color:#1E3D34">Note added: quiet room. 204 is on the top deluxe floor, away from the lift.<small>Inês · front desk</small></div></div>
</div>
<div class="act"><span>${"Message"}</span><span>Charge €49</span><span class="p">Check in</span></div>
</div></div>
</body></html>`;
})();
