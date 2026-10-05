// Campus OS · Brightpath Academy (Pune): school day signature screen.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const SUBJ = {
    MAT: ["Maths", "MD", "#E8EDFF", "#3446B5"],
    SCI: ["Science", "RK", "#E3F4EC", "#1E7A52"],
    ENG: ["English", "AB", "#FFF0DC", "#A3600B"],
    HIN: ["Hindi", "SV", "#FBE6EE", "#A43465"],
    SST: ["Social Sci.", "NP", "#EFE8FB", "#6440B0"],
    MAR: ["Marathi", "GK", "#FDECE3", "#B04A1E"],
    IT: ["IT", "TS", "#E2F2F7", "#1C6F88"],
    PE: ["PE", "VR", "#EEF2E3", "#5A7319"],
    LIB: ["Library", "AB", "#F1EFEA", "#5F5A4E"]
  };
  // rows = periods; cols = Mon..Sat
  const periods = [
    ["P1", "8:00"], ["P2", "8:40"], ["P3", "9:20"], ["BRK", "10:00"], ["P4", "10:20"], ["P5", "11:00"], ["LUN", "11:40"], ["P6", "12:10"], ["P7", "12:50"]
  ];
  const grid = {
    P1: ["MAT", "ENG", "MAT", "MAT", "SCI", "MAT"],
    P2: ["SCI", "MAT", "HIN", "ENG", "MAT", "ENG"],
    P3: ["ENG", "SCI", "SCI", "SCI", "HIN", "SST"],
    P4: ["HIN", "SST", "ENG", "SST", "ENG", "SCI"],
    P5: ["SST", "MAR", "MAT", "HIN", "SST", "PE"],
    P6: ["IT", "HIN", "SST", "MAR", "IT", "LIB"],
    P7: ["PE", "SCI", "MAR", "IT", "MAR", "PE"]
  };
  const days = ["Mon 28", "Tue 29", "Wed 30", "Thu 1", "Fri 2", "Sat 3"];
  const TODAY = 3;

  const tt = periods.map(([p, t]) => {
    if (p === "BRK" || p === "LUN") {
      return `<div class="tt-t">${t}</div><div class="tt-brk">${p === "BRK" ? "Short break · 20 min" : "Lunch · 30 min"}</div>`;
    }
    const cells = grid[p].map((code, d) => {
      const [name, ini, bg, fg] = SUBJ[code];
      const absent = p === "P3" && d === TODAY;
      const now = p === "P2" && d === TODAY;
      if (absent) {
        return `<div class="cell absent"><b>Science · RK on leave</b></div>`;
      }
      return `<div class="cell${d === TODAY ? " today" : ""}${now ? " now" : ""}" style="background:${bg};--fg:${fg}"><b style="color:${fg}">${name}</b><span>${ini}${now ? ' · <i>in progress</i>' : ""}</span></div>`;
    }).join("");
    return `<div class="tt-t"><b>${p}</b>${t}</div>${cells}`;
  }).join("");

  const GRADE = m => { const p = m / 40 * 100; return p > 90 ? "A1" : p > 80 ? "A2" : p > 70 ? "B1" : p > 60 ? "B2" : p > 50 ? "C1" : p > 40 ? "C2" : p >= 33 ? "D" : "E"; };
  const GC = { A1: ["#DDF3E6", "#16723F"], A2: ["#E3F4EC", "#1E7A52"], B1: ["#E8EDFF", "#3446B5"], B2: ["#EEF0FF", "#4A55A8"], C1: ["#FFF0DC", "#A3600B"], C2: ["#FFF0DC", "#A3600B"], D: ["#FDECE3", "#B04A1E"], E: ["#FBE2DF", "#B02E24"] };
  const students = [
    ["10B-01", "Aarav Sharma", 37, 34], ["10B-02", "Diya Patel", 35, 33], ["10B-03", "Kabir Singh", 22, 25], ["10B-04", "Ananya Iyer", 39, 38],
    ["10B-05", "Rohan Gupta", 31, 27], ["10B-06", "Ishita Rao", 34, 35], ["10B-07", "Vihaan Joshi", 28, 26], ["10B-08", "Meera Nair", 12, 18], ["10B-09", "Arjun Mehta", null, 30]
  ];
  const rows = students.map(([roll, name, m, prev]) => {
    if (m === null) {
      return `<tr><td class="mono dim">${roll}</td><td><b>${name}</b></td><td><span class="mk ab">AB</span></td><td class="dim">—</td><td><span class="gr" style="background:#F1EFEA;color:#5F5A4E">—</span></td><td class="dim small">UT1 ${prev}</td><td><span class="flag amber">Absent · retest Mon</span></td></tr>`;
    }
    const g = GRADE(m), [bg, fg] = GC[g], pct = (m / 40 * 100).toFixed(1), d = m - prev;
    const flag = g === "E" ? `<span class="flag red">Below 33% · remedial</span>` : name === "Rohan Gupta" ? `<span class="flag green">Most improved</span>` : "";
    return `<tr${name === "Rohan Gupta" ? ' class="sel"' : ""}><td class="mono dim">${roll}</td><td><b>${name}</b></td><td><span class="mk">${m}</span><span class="dim small"> / 40</span></td><td class="mono">${pct}%</td><td><span class="gr" style="background:${bg};color:${fg}">${g}</span></td><td class="mono ${d > 0 ? "up" : d < 0 ? "down" : "dim"}">${d > 0 ? "▲ " + d : d < 0 ? "▼ " + (-d) : "0"}</td><td>${flag}</td></tr>`;
  }).join("");

  const ledger = [
    ["Q1 tuition · Apr", "₹18,500", "Paid 4 Apr", "UPI · GPay", "ok"],
    ["Q2 tuition · Jul", "₹18,500", "Paid 9 Jul", "UPI · PhonePe", "ok"],
    ["Transport · Term 2", "₹6,300", "Paid 9 Jul", "Card", "ok"],
    ["Q3 tuition · due 15 Sep", "₹18,500", "Overdue 16 days", "", "bad"],
    ["Late fee · ₹100/week", "₹200", "Added 29 Sep", "", "bad"]
  ].map(([a, b, c, d, s]) => `<div class="lg ${s}"><div><b>${a}</b><small>${c}${d ? " · " + d : ""}</small></div><span class="mono">${b}</span></div>`).join("");

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Lexend:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#F6F1E8;color:#1D2340;font:13px/1.4 'Lexend',system-ui,sans-serif}
.mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}.dim{color:#7A7F94}.small{font-size:11.5px}.up{color:#16723F;font-weight:600}.down{color:#B02E24;font-weight:600}
.top{height:56px;background:#1E2559;color:#E9EBF7;display:flex;align-items:center;gap:18px;padding:0 18px}
.logo{display:flex;align-items:center;gap:10px}.logo i{width:34px;height:34px;border-radius:10px;background:#F2A93B;display:grid;place-items:center;font:400 20px 'Gloock',serif;color:#1E2559;font-style:normal}
.logo b{display:block;white-space:nowrap;font:400 17px 'Gloock',serif;color:#fff;letter-spacing:.01em}.logo span{font-size:10px;letter-spacing:.16em;color:#9EA6D6}
.tabs{display:flex;gap:0;margin-left:6px}.tabs a{padding:7px 10px;white-space:nowrap;border-radius:8px;color:#B9C0E8;font-weight:500;text-decoration:none;display:flex;align-items:center;gap:6px}
.tabs a.on{background:#2E3778;color:#fff}.tabs em{font-style:normal;background:#F2A93B;color:#1E2559;font-size:10.5px;font-weight:700;border-radius:9px;padding:0 6px;line-height:17px}
.sp{flex:1}.srch{width:190px;white-space:nowrap;overflow:hidden;background:#2A3270;border-radius:9px;padding:7px 12px;color:#8F98CF}.ask{white-space:nowrap;background:#F2A93B;color:#1E2559;font-weight:700;border-radius:9px;padding:8px 13px}
.av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff;flex:none}
.sub{display:flex;align-items:center;gap:12px;padding:12px 20px 10px}
.sub h1{margin:0;font:400 27px/1 'Gloock',serif;letter-spacing:.005em}.sub p{margin:0;color:#6B7088}
.pill{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E8E1D3;border-radius:999px;padding:5px 11px;font-weight:500;font-size:12px;white-space:nowrap}
.pill b{font-family:'JetBrains Mono',monospace}.dot{width:7px;height:7px;border-radius:50%}
.wrap{display:grid;grid-template-columns:720px 372px 284px;gap:16px;padding:0 20px}
.card{background:#fff;border:1px solid #EAE3D5;border-radius:16px;overflow:hidden}
.ch{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid #F0EADF}
.ch h2{margin:0;font:600 14.5px 'Lexend'}.ch .r{display:flex;gap:6px;align-items:center;color:#7A7F94;font-size:12px}
.seg{display:inline-flex;background:#F3EEE4;border-radius:8px;padding:2px}.seg span{padding:3px 9px;border-radius:6px;font-size:11.5px;font-weight:600;color:#7A7F94}.seg .on{background:#fff;color:#1D2340;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.tt{display:grid;grid-template-columns:62px repeat(6,1fr);gap:3px;padding:8px 12px 10px;position:relative}
.tt-h{font-size:11px;font-weight:600;color:#7A7F94;text-align:center;padding:2px 0 4px}.tt-h.today{color:#1E2559}.tt-h.today span{background:#1E2559;color:#fff;border-radius:6px;padding:2px 7px}
.tt-t{font-size:10px;line-height:1.1;color:#9A9EB0;display:flex;flex-direction:column;justify-content:center}.tt-t b{color:#4B5070;font-size:11px}
.cell{border-radius:7px;padding:2px 8px;height:24px;display:flex;flex-direction:column;justify-content:center;line-height:1.15}
.cell b{font-size:10.5px;font-weight:600}.cell span{font-size:9px;color:#6B7088}.cell span i{font-style:normal;color:#1E7A52;font-weight:600}
.cell.today{box-shadow:inset 0 0 0 1.5px var(--fg)}.cell.now{box-shadow:inset 0 0 0 2px var(--fg),0 0 0 3px rgba(52,70,181,.15)}
.cell.absent{background:repeating-linear-gradient(135deg,#FFF4F2,#FFF4F2 6px,#FBE2DF 6px,#FBE2DF 12px);box-shadow:inset 0 0 0 1.5px #D9483B;height:24px;flex-direction:row;align-items:center;gap:6px;flex-wrap:wrap;padding:2px 6px}
.cell.absent b{color:#B02E24}.cell.absent em{font-style:normal;font-size:10px;font-weight:700;color:#16723F}
.tt-brk{grid-column:2/8;height:13px;border-radius:6px;background:repeating-linear-gradient(90deg,#F6F1E8,#F6F1E8 8px,#F0EADF 8px,#F0EADF 16px);font-size:10px;color:#9A9EB0;display:flex;align-items:center;padding-left:8px}
.subst{margin:0 12px 10px;border-radius:12px;background:#1E2559;color:#E9EBF7;padding:6px 12px;display:flex;align-items:center;gap:12px}
.subst .av{width:34px;height:34px}.subst b{color:#fff}.subst small{display:block;color:#AEB5DE;font-size:11.5px}
.btn{border-radius:8px;padding:7px 12px;font-weight:600;font-size:12px;white-space:nowrap;border:1px solid #E1DACB;background:#fff;color:#1D2340}
.btn.p{background:#F2A93B;border-color:#F2A93B;color:#1E2559}.btn.d{background:#1E2559;border-color:#1E2559;color:#fff}.btn.g{background:#16723F;border-color:#16723F;color:#fff}
table{width:100%;border-collapse:collapse}th{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:#9A9EB0;font-weight:600;text-align:left;padding:7px 14px;background:#FBF8F2;border-bottom:1px solid #F0EADF}
td{padding:3px 14px;border-bottom:1px solid #F4EFE6;white-space:nowrap}tr.sel td{background:#FFF8EA}
.mk{display:inline-block;min-width:34px;text-align:center;border:1.5px solid #D7DDF5;border-radius:7px;padding:1px 6px;font:600 13px 'JetBrains Mono',monospace;color:#1E2559;background:#FAFBFF}
.mk.ab{border-color:#F0D8A8;background:#FFF7E6;color:#A3600B}
.gr{display:inline-block;min-width:30px;text-align:center;border-radius:6px;padding:2px 7px;font-weight:700;font-size:12px}
.flag{font-size:11px;font-weight:600;border-radius:999px;padding:2px 9px}.flag.red{background:#FBE2DF;color:#B02E24}.flag.amber{background:#FFF0DC;color:#A3600B}.flag.green{background:#DDF3E6;color:#16723F}
.gfoot{display:flex;align-items:center;gap:12px;padding:7px 14px;background:#FBF8F2;font-size:12px;color:#5D6280}
.gfoot b{color:#1D2340}.gfoot span{white-space:nowrap}.scale{display:flex;gap:3px}.scale span{font-size:10px;font-weight:700;border-radius:4px;padding:1px 4px}
.col{display:flex;flex-direction:column;gap:16px}
.fam{display:flex;gap:10px;align-items:center;padding:12px 16px 8px}.fam b{display:block;font-size:14px}.fam small{color:#7A7F94}
.due{margin:4px 16px 10px;border-radius:12px;background:#FFF4EC;border:1px solid #F7D9C2;padding:10px 12px;display:flex;justify-content:space-between;align-items:flex-end}
.due p{margin:0;font-size:11px;color:#B04A1E;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.due .big{font:400 26px/1.1 'Gloock',serif;color:#1D2340}
.bar{height:6px;border-radius:4px;background:#F0EADF;overflow:hidden;margin:2px 16px 4px}.bar i{display:block;height:100%;width:50%;background:#16723F;border-radius:4px}
.lg{display:flex;justify-content:space-between;align-items:center;padding:6px 16px;border-top:1px solid #F4EFE6}.lg b{display:block;font-weight:500;font-size:12.5px}.lg small{color:#7A7F94;font-size:11px}
.lg.ok small{color:#16723F}.lg.bad small{color:#B02E24;font-weight:600}.lg .mono{font-weight:600}
.wa{margin:8px 16px 0;border-radius:12px;background:#ECF7EF;padding:9px 11px;font-size:11.5px;display:flex;flex-direction:column;gap:5px}
.wa h4{margin:0;font-size:11px;color:#16723F;letter-spacing:.05em;text-transform:uppercase;display:flex;align-items:center;gap:6px}
.wa div{display:flex;justify-content:space-between;color:#2F4A3A}.wa .t{color:#6E8A78;font-family:'JetBrains Mono',monospace;font-size:10.5px}
.acts{display:flex;gap:8px;padding:10px 16px 14px}
.fun{padding:10px 16px 14px;display:flex;flex-direction:column;gap:7px}
.fr{display:grid;grid-template-columns:118px 1fr 34px;align-items:center;gap:8px;font-size:12px}.fr i{display:block;height:14px;border-radius:4px;background:#2E3778}.fr span{text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600}
.phone{background:#11152E;border-radius:38px;padding:9px;height:676px;box-shadow:0 18px 40px rgba(30,37,89,.25)}
.scr{background:#F6F1E8;border-radius:30px;height:100%;overflow:hidden;display:flex;flex-direction:column}
.ps{display:flex;justify-content:space-between;padding:10px 20px 4px;font:600 12px 'Lexend'}
.ph{padding:6px 14px 10px;display:flex;align-items:center;gap:9px}.ph b{font:400 17px 'Gloock',serif}.ph small{display:block;color:#7A7F94;font-size:10.5px}
.pc{margin:0 10px 8px;background:#fff;border-radius:14px;padding:10px 11px;border:1px solid #EAE3D5}
.pc h5{margin:0 0 3px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#9A9EB0;font-weight:600}.pc b{font-size:12.5px}.pc p{margin:2px 0 0;font-size:11px;color:#6B7088}
.pc.alert{background:#FFF4F2;border-color:#F6CFC9}.pc.alert h5{color:#B02E24}
.pay{background:#1E2559;color:#fff;border:0}.pay h5{color:#AEB5DE}.pay b{font:400 24px 'Gloock',serif;color:#fff}
.upi{display:flex;gap:5px;margin-top:8px}.upi span{flex:1;text-align:center;background:#2E3778;border-radius:8px;padding:6px 0;font-size:10.5px;font-weight:600}
.upi span.on{background:#F2A93B;color:#1E2559}
.tabbar{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid #EAE3D5;padding:8px 0 14px;font-size:9.5px;color:#9A9EB0;text-align:center;font-weight:600}
.tabbar span.on{color:#1E2559}.tabbar i{display:block;width:18px;height:18px;margin:0 auto 3px;border-radius:5px;border:1.8px solid currentColor}
.cap{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#9A9EB0;font-weight:600;padding:0 4px 6px}
</style></head><body>
<div class="top">
  <div class="logo"><i>B</i><div><b>Brightpath Academy</b><span>CAMPUS OS · PUNE</span></div></div>
  <nav class="tabs"><a class="on">Today</a><a>Timetable</a><a>Attendance</a><a>Gradebook</a><a>Fees <em>46</em></a><a>Transport</a><a>Admissions <em>14</em></a></nav>
  <div class="sp"></div><div class="srch">Search student or receipt</div><span class="ask">✦ Ask Campus OS</span><span class="av" style="background:#B04A1E">MK</span>
</div>
<div class="sub"><div><h1>Thursday, 1 October</h1><p>Term 2 · Week 6 · Meera Kulkarni, Principal</p></div><div class="sp"></div>
  <span class="pill"><span class="dot" style="background:#16723F"></span>Attendance <b>94.2%</b> · 1,168 of 1,240</span>
  <span class="pill"><span class="dot" style="background:#D9483B"></span><b>2</b> teachers on leave · 5 periods to cover</span>
  <span class="pill"><span class="dot" style="background:#F2A93B"></span>Fees overdue <b>₹4.6L</b> · 46 families</span>
</div>
<div class="wrap">
  <div class="col">
    <div class="card">
      <div class="ch"><h2>Class 10-B · weekly timetable</h2><div class="r">Class teacher Ms. Desai · 38 students<span class="seg"><span class="on">10-B</span><span>10-A</span><span>10-C</span></span></div></div>
      <div class="tt"><div></div>${days.map((d, i) => `<div class="tt-h${i === TODAY ? " today" : ""}">${i === TODAY ? `<span>${d} · today</span>` : d}</div>`).join("")}${tt}</div>
      <div class="subst"><span class="av" style="background:#1E7A52">PJ</span><div style="flex:1"><b>Mr. R. Kulkarni is on medical leave today.</b><small>3 periods uncovered: 10-B P3, 9-A P5, 10-C P6. Ms. P. Joshi teaches Science and is free in P3 (4 periods today).</small></div><span class="btn">Notify class</span><span class="btn p">Assign Ms. Joshi</span></div>
    </div>
    <div class="card">
      <div class="ch"><h2>Unit Test 2 · Mathematics · Class 10-B</h2><div class="r">Max 40 · held 29 Sep · CBSE 9-point scale</div></div>
      <table><tr><th>Roll</th><th>Student</th><th>Marks</th><th>%</th><th>Grade</th><th>vs UT1</th><th></th></tr>${rows}</table>
      <div class="gfoot"><span>Avg <b class="mono">29.8 / 40</b> (74.4%)</span><span>Highest <b>39</b></span><div class="sp"></div>
        <div class="scale">${["A1", "A2", "B1", "B2", "C1", "C2", "D", "E"].map(g => `<span style="background:${GC[g][0]};color:${GC[g][1]}">${g}</span>`).join("")}</div>
        <span class="btn d">Publish to parents</span></div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="ch"><h2>Fees · Gupta family</h2><div class="r">Admission no. BPA-2019-0417</div></div>
      <div class="fam"><span class="av" style="background:#3446B5">RG</span><div><b>Rohan Gupta · 10-B</b><small>Parent: Amit Gupta · +91 98220 4•••• · prefers WhatsApp</small></div></div>
      <div class="due"><div><p>Due now</p><b class="big">₹18,700</b></div><div style="text-align:right;font-size:11.5px;color:#6B7088">Paid <b class="mono" style="color:#16723F">₹43,300</b> of ₹86,600<br>this academic year</div></div>
      <div class="bar"><i></i></div>
      ${ledger}
      <div class="wa"><h4>WhatsApp reminders</h4>
        <div><span>Fee due today · UPI link</span><span class="t">15 Sep · read</span></div>
        <div><span>Reminder 2 · late fee from 29 Sep</span><span class="t">22 Sep · read</span></div>
        <div><span>Reminder 3 · accounts will call</span><span class="t">29 Sep · delivered</span></div></div>
      <div class="acts"><span class="btn">Offer 2-part split</span><span class="btn g" style="flex:1;text-align:center">Send UPI link · ₹18,700</span></div>
    </div>
    <div class="card">
      <div class="ch"><h2>Admissions 2027–28</h2><div class="r">Nursery to Class 9</div></div>
      <div class="fun">
        <div class="fr"><span style="text-align:left;font-family:'Lexend';font-weight:500">Enquiries</span><i style="width:100%"></i><span>64</span></div>
        <div class="fr"><span style="text-align:left;font-family:'Lexend';font-weight:500">Campus visits</span><i style="width:48%;background:#4A55A8"></i><span>31</span></div>
        <div class="fr"><span style="text-align:left;font-family:'Lexend';font-weight:500">Entrance test</span><i style="width:28%;background:#6B74BF"></i><span>18</span></div>
        <div class="fr"><span style="text-align:left;font-family:'Lexend';font-weight:500">Admitted</span><i style="width:17%;background:#F2A93B"></i><span>11</span></div>
      </div>
    </div>
  </div>
  <div>
    <div class="cap">Parent app · Amit's phone</div>
    <div class="phone"><div class="scr">
      <div class="ps"><span>9:12</span><span>●●● ▮</span></div>
      <div class="ph"><span class="av" style="background:#3446B5;width:34px;height:34px">RG</span><div><b>Rohan · 10-B</b><small>Brightpath Academy</small></div></div>
      <div class="pc alert"><h5>Attendance · 8:12 am</h5><b>Rohan was marked late in Period 1</b><p>Arrived 8:12 by school bus 4. Tap to message the class teacher.</p></div>
      <div class="pc"><h5>Result published</h5><b>Maths UT2 · 31/40 · B1</b><p>Up 4 marks from UT1. Class average 29.8.</p></div>
      <div class="pc"><h5>Homework · due Fri</h5><b>Maths Ex 4.3 · Q1–8</b><p>Quadratic equations. Ms. Desai attached 1 worksheet.</p></div>
      <div class="pc"><h5>School bus 4</h5><b>Return trip running 12 min late</b><p>Expected at Baner stop 2:42 pm. Live location on.</p></div>
      <div class="pc pay"><h5>Q3 tuition + late fee</h5><b>₹18,700</b><p style="color:#AEB5DE">Overdue since 15 Sep</p><div class="upi"><span class="on">GPay</span><span>PhonePe</span><span>Paytm</span></div></div>
      <div class="tabbar"><span class="on"><i></i>Home</span><span><i></i>Diary</span><span><i></i>Fees</span><span><i></i>Chat</span></div>
    </div></div>
  </div>
</div>
</body></html>`;

  window.LANDINGS.school = html;
})();
