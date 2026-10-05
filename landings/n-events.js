// Event Desk · Villa Rosa Events — season board with holds, the wedding file, seating plan and run sheet.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  // October 2026: Thu 1 Oct. Grid starts Mon 28 Sep.
  const evs = {
    3: ["def", "Bennett"], 9: ["def", "Altamira"], 10: ["def", "Moreau"],
    16: ["def", "Rehearsal"], 17: ["sel", "G &amp; M"], 18: ["pro", "Ahmed"],
    24: ["ten", "Hayes"], 25: ["pro", "Offsite"], 31: ["ten", "Rossi 50th"]
  };
  let cells = "";
  for (let i = 0; i < 35; i++) {
    const d = i - 2; // i=0 -> 28 Sep
    const inMonth = d >= 1 && d <= 31;
    const day = inMonth ? d : (d < 1 ? 30 + d : d - 31);
    const e = inMonth && evs[d];
    const wk = i % 7 >= 5;
    cells += `<div class="dc${inMonth ? "" : " out"}${wk ? " wk" : ""}${d === 5 ? " today" : ""}"><span class="dn">${day}</span>${e ? `<div class="ev ${e[0]}">${e[1]}</div>` : ""}</div>`;
  }

  const pay = [["Deposit · 30%", "€14,580", "Paid 3 Feb", "paid"], ["Milestone · 40%", "€19,440", "Paid 17 Jul", "paid"], ["Final · 30%", "€14,580", "Due Sat 10 Oct", "due"]];
  const diet = [["Vegetarian", 6], ["Vegan", 3], ["Gluten-free", 2], ["Nut allergy", 1], ["Children's menu", 4]];
  const vendors = [
    ["Fiori di Bellosguardo", "Florals · arch + 12 centrepieces", "Confirmed", "ok"],
    ["Trio Arno", "Strings · ceremony + aperitivo", "Confirmed", "ok"],
    ["Luce Studio", "Photo + film · 10 hrs", "Confirmed", "ok"],
    ["Bellezza Firenze", "Hair & makeup · 6 people", "Contract out", "wa"]
  ];
  const run = [
    ["14:30", "Guests arrive · shuttle from Piazza Pitti", ""],
    ["16:00", "Ceremony · rose garden", "Trio Arno"],
    ["16:45", "Aperitivo · lemon terrace", "Prosecco + crostini"],
    ["18:30", "Dinner · limonaia", "4 courses · Villa kitchen"],
    ["21:00", "Cake + first dance", "Lights down at 20:55"],
    ["00:30", "Last shuttle to Florence", "2 coaches · 50 seats"]
  ];

  // seating: round tables of 10 with seats around
  const tables = [
    ["Firenze", 120, 120, 10, 10], ["Siena", 250, 100, 10, 10], ["Lucca", 380, 120, 9, 10],
    ["Pisa", 120, 238, 10, 10], ["Arezzo", 250, 235, 8, 10], ["Volterra", 380, 255, 10, 10],
    ["Cortona", 225, 372, 10, 10], ["Pienza", 350, 372, 9, 10]
  ];
  const tableSvg = tables.map(([n, x, y, sat, cap]) => {
    let seats = "";
    for (let k = 0; k < cap; k++) {
      const a = (k / cap) * Math.PI * 2 - Math.PI / 2;
      const sx = x + Math.cos(a) * 46, sy = y + Math.sin(a) * 46;
      seats += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="7" fill="${k < sat ? "#B9846B" : "#FFFFFF"}" stroke="#B9846B" stroke-width="1.5"/>`;
    }
    return `${seats}<circle cx="${x}" cy="${y}" r="33" fill="${n === "Arezzo" ? "#F6E7DE" : "#FBF6F0"}" stroke="${n === "Arezzo" ? "#C9784E" : "#D9C7B6"}" stroke-width="${n === "Arezzo" ? 2 : 1.2}"/>`;
  }).join("");
  const tableLabels = tables.map(([n, x, y, sat, cap]) => `<div class="tl" style="left:${x}px;top:${y}px"><b>${n}</b><span>${sat}/${cap}</span></div>`).join("");

  window.LANDINGS.events = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,600;1,6..96,500&family=Karla:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.42 'Karla',system-ui,sans-serif;color:#2A211C;background:#F5EFE8}
.top{height:58px;display:flex;align-items:center;gap:22px;padding:0 24px;background:#2B1F1A;color:#E9DCCF}
.mk{width:34px;height:34px;border-radius:50%;border:1.5px solid #D6A889;display:grid;place-items:center;font:italic 500 18px 'Bodoni Moda';color:#F0C9AE}
.brand b{display:block;font:600 18px/1.1 'Bodoni Moda',serif;color:#FBF3EB}.brand span{font:500 10px 'DM Mono';letter-spacing:.16em;color:#B89A86}
.tabs{display:flex;gap:2px;margin-left:8px}.tabs a{padding:7px 12px;border-radius:999px;color:#C9B5A6;font-weight:600}.tabs a.on{background:#45332B;color:#fff}
.tabs em{font-style:normal;background:#C9784E;color:#fff;font-size:10.5px;border-radius:8px;padding:0 6px;margin-left:5px}
.sp{flex:1}.srch{width:260px;border:1px solid #4B3A31;border-radius:999px;padding:7px 14px;color:#9F8A7C}
.ask{border:1px solid #6B4F42;color:#F0C9AE;border-radius:999px;padding:7px 14px;font-weight:600}.ask:before{content:"\\2726 ";}
.new{background:#D6A889;color:#2B1F1A;border-radius:999px;padding:8px 15px;font-weight:700}
.wrap{display:grid;grid-template-columns:372px 1fr 472px;gap:16px;padding:16px 18px;height:842px}
.card{background:#FFFCF8;border-radius:18px;box-shadow:0 0 0 1px #E8DCCF,0 6px 20px rgba(80,50,30,.05);overflow:hidden}
.ch{display:flex;justify-content:space-between;align-items:baseline;padding:16px 18px 10px}.ch h3{margin:0;font:500 21px 'Bodoni Moda',serif}.ch span{color:#8C7869;font-size:12px}
.mono{font-family:'DM Mono',monospace}
/* calendar */
.mhead{display:flex;justify-content:space-between;align-items:center;padding:0 18px 8px}.mhead b{font:italic 500 18px 'Bodoni Moda'}.mhead span{display:flex;gap:6px}.mhead i{font-style:normal;width:26px;height:26px;border:1px solid #E1D3C5;border-radius:50%;display:grid;place-items:center;color:#8C7869}
.dow{display:grid;grid-template-columns:repeat(4,.72fr) repeat(3,1.38fr);gap:4px;padding:0 12px;font:500 10px 'DM Mono';letter-spacing:.1em;color:#A08B7C;text-align:center}
.grid{display:grid;grid-template-columns:repeat(4,.72fr) repeat(3,1.38fr);gap:4px;padding:6px 12px 12px}
.dc{height:72px;border-radius:9px;background:#F9F3EC;padding:4px;position:relative;overflow:hidden}.dc.wk{background:#F4EADF}.dc.out{opacity:.4}
.dc.today{box-shadow:inset 0 0 0 1.5px #2B1F1A}
.dn{font:500 11px 'DM Mono';color:#7C6858}
.ev{position:absolute;left:3px;right:3px;bottom:3px;border-radius:6px;padding:4px 4px;font-size:9.5px;font-weight:700;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev.def{background:#4E3A30;color:#FBF3EB}.ev.sel{background:#C9784E;color:#fff;box-shadow:0 0 0 2px #FFFCF8,0 0 0 3.5px #C9784E}
.ev.ten{background:repeating-linear-gradient(135deg,#F3DCC9 0 6px,#EBCDB6 6px 12px);color:#7A4A2E;border:1px dashed #C9784E}
.ev.pro{background:#fff;color:#7C6858;border:1px dashed #BDA794}
.leg{display:flex;flex-wrap:wrap;gap:10px 14px;padding:0 18px 12px;font-size:11.5px;color:#6E5B4D}.leg span:before{content:"";display:inline-block;width:12px;height:9px;border-radius:3px;margin-right:6px;vertical-align:-1px;background:var(--b);border:var(--bd,0)}
.season{margin:0 18px;padding:12px 14px;border-radius:12px;background:#2B1F1A;color:#E9DCCF;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.season b{display:block;font:500 22px 'Bodoni Moda';color:#fff}.season small{font-size:11px;color:#B89A86}
.holds{padding:12px 18px}.hold{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-top:1px solid #EFE4D9}
.hold b{font-weight:700}.hold small{display:block;color:#8C7869;font-size:11.5px}
.btn{border-radius:999px;padding:7px 13px;font-weight:700;font-size:12px;border:1px solid #DCCBBB;background:#fff;white-space:nowrap}.btn.d{background:#2B1F1A;border-color:#2B1F1A;color:#fff}.btn.c{background:#C9784E;border-color:#C9784E;color:#fff}
/* wedding file */
.hero{height:150px;position:relative;background:url(img/events/villa.jpg) center 60%/cover}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(43,31,26,.05) 20%,rgba(43,31,26,.82))}
.hero .t{position:absolute;left:20px;bottom:14px;z-index:1;color:#fff}
.hero h2{margin:0;font:italic 500 30px/1 'Bodoni Moda'}.hero p{margin:4px 0 0;color:#EBD9CB;font-size:12.5px}
.hero .st{position:absolute;right:16px;top:14px;z-index:1;background:#FFFCF8;color:#2E6B47;border-radius:999px;padding:4px 11px;font-weight:700;font-size:11.5px}
.trail{display:flex;align-items:center;padding:14px 20px 4px;gap:0}
.trail .s{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;text-align:center;font-size:11px;color:#6E5B4D}
.trail .s i{width:22px;height:22px;border-radius:50%;background:#2E6B47;color:#fff;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:700}
.trail .s.cur i{background:#C9784E}.trail .ln{flex:1;height:2px;background:#2E6B47;margin-bottom:28px}
.trail .s b{color:#2A211C;font-size:11.5px}
.sec{padding:10px 20px}.sec h4{margin:0 0 8px;font:500 10.5px 'DM Mono';letter-spacing:.14em;color:#9C8574}
.pay{display:grid;grid-template-columns:1fr auto auto;gap:6px 14px;align-items:center;padding:7px 0;border-top:1px solid #EFE4D9}
.pay b{font-family:'DM Mono';font-weight:500}.pill{border-radius:999px;padding:2px 9px;font-size:11px;font-weight:700;white-space:nowrap}
.paid{background:#E5F1E9;color:#2E6B47}.due{background:#FBE9DD;color:#A2532C}.wa{background:#FBF0D9;color:#94650F}.ok{background:#E5F1E9;color:#2E6B47}
.tot{display:flex;justify-content:space-between;padding:8px 0 0;border-top:1px solid #E1D3C5;font-weight:700}
.rsvp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.rsvp div{background:#F7EFE6;border-radius:12px;padding:10px 12px}.rsvp b{display:block;font:500 24px 'Bodoni Moda'}.rsvp small{color:#7C6858;font-size:11.5px}
.diet{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.diet span{border:1px solid #E1D3C5;border-radius:999px;padding:3px 10px;font-size:11.5px;background:#fff}.diet b{font-family:'DM Mono';font-weight:500;margin-left:4px}
.vend{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:6px 0;border-top:1px solid #EFE4D9;align-items:center}.vend b{font-weight:700}.vend small{color:#8C7869;font-size:11.5px}
/* seating */
.room{position:relative;margin:0 16px;height:452px;border-radius:14px;background:#F7EFE6;overflow:hidden}
.room svg{position:absolute;left:0;top:0}
.tl{position:absolute;transform:translate(-50%,-50%);text-align:center;line-height:1.05}.tl b{display:block;font:italic 500 13px 'Bodoni Moda'}.tl span{font:500 10px 'DM Mono';color:#8C7869}
.head{position:absolute;left:150px;top:18px;width:200px;height:26px;border-radius:7px;background:#4E3A30;color:#F6E5D7;font:italic 500 12px 'Bodoni Moda';display:grid;place-items:center}
.zone{position:absolute;font:500 9.5px 'DM Mono';letter-spacing:.14em;color:#B09886}
.uns{position:absolute;left:10px;bottom:12px;width:116px;background:#FFFCF8;border-radius:12px;box-shadow:0 4px 14px rgba(80,50,30,.12);padding:10px}
.uns h5{margin:0 0 6px;font:500 10px 'DM Mono';letter-spacing:.12em;color:#A2532C}
.uns div{font-size:11.5px;padding:4px 0;border-top:1px solid #EFE4D9;display:flex;justify-content:space-between}.uns i{font-style:normal;color:#A2532C;font-size:10.5px}
.drag{position:absolute;left:208px;top:258px;background:#C9784E;color:#fff;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700;box-shadow:0 6px 14px rgba(160,80,40,.35);transform:rotate(-4deg)}
.run{padding:6px 18px 14px}.rr{display:grid;grid-template-columns:52px 1fr;gap:10px;padding:6px 0;border-top:1px solid #EFE4D9;align-items:center}
.rr .mono{color:#A2532C;font-size:12.5px}.rr b{font-weight:700}.rr small{color:#8C7869;margin-left:6px}
</style></head><body>
<div class="top"><span class="mk">R</span><div class="brand"><b>Villa Rosa Events</b><span>EVENT DESK · FIRENZE</span></div>
<nav class="tabs"><a class="on">Calendar</a><a>Enquiries<em>6</em></a><a>Events</a><a>Proposals</a><a>Payments</a><a>Vendors</a></nav>
<div class="sp"></div><span class="srch">Search couples, dates, vendors</span><span class="ask">Ask Event Desk</span><span class="new">+ Enquiry</span></div>
<div class="wrap">
<section class="card" style="display:flex;flex-direction:column">
  <div class="ch"><h3>Season calendar</h3><span>Villa + limonaia</span></div>
  <div class="mhead"><b>Ottobre 2026</b><span><i>‹</i><i>›</i></span></div>
  <div class="dow"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
  <div class="grid">${cells}</div>
  <div class="leg"><span style="--b:#4E3A30">Definite</span><span style="--b:repeating-linear-gradient(135deg,#F3DCC9 0 3px,#EBCDB6 3px 6px);--bd:1px dashed #C9784E">Tentative hold</span><span style="--b:#fff;--bd:1px dashed #BDA794">Prospect</span></div>
  <div class="season"><div><b>34</b><small>weddings 2026</small></div><div><b>4</b><small>Saturdays left</small></div><div><b>19</b><small>2027 enquiries</small></div></div>
  <div class="holds"><div class="hold"><div><b>Hayes wedding · Sat 24</b><small>Proposal viewed 3× · hold expires Fri 9 Oct</small></div><span class="btn c">Nudge</span></div>
  <div class="hold"><div><b>Ahmed &amp; Leila · Sun 18</b><small>Enquiry via website · 140 guests</small></div><span class="btn">Send proposal</span></div></div>
</section>

<section class="card" style="display:flex;flex-direction:column">
  <div class="hero"><span class="st">● Definite</span><div class="t"><h2>Giulia &amp; Marco</h2><p>Sat 17 Oct 2026 · rose garden ceremony + limonaia dinner · planner Chiara Bassi</p></div></div>
  <div class="trail"><div class="s"><i>✓</i><b>Enquiry</b>12 Jan</div><span class="ln"></span><div class="s"><i>✓</i><b>Proposal</b>19 Jan</div><span class="ln"></span><div class="s"><i>✓</i><b>Contract</b>e-signed 3 Feb</div><span class="ln"></span><div class="s"><i>✓</i><b>Deposit</b>3 Feb</div><span class="ln" style="background:#E1D3C5"></span><div class="s cur"><i>12</i><b>Wedding</b>days to go</div></div>
  <div class="sec"><h4>PAYMENT SCHEDULE · IVA 22% INCLUDED</h4>
    ${pay.map(([a, b, c, k]) => `<div class="pay"><span>${a}</span><b>${b}</b><span class="pill ${k}">${c}</span></div>`).join("")}
    <div class="tot"><span>Contract total</span><span class="mono">€48,600 · €34,020 paid</span></div></div>
  <div class="sec"><h4>GUESTS · RSVP CLOSES 3 OCT</h4>
    <div class="rsvp"><div><b>92</b><small>attending</small></div><div><b>15</b><small>awaiting reply</small></div><div><b>13</b><small>declined</small></div></div>
    <div class="diet">${diet.map(([d, n]) => `<span>${d}<b>${n}</b></span>`).join("")}</div></div>
  <div class="sec" style="padding-bottom:6px"><h4>VENDOR TEAM</h4>
    ${vendors.map(([n, w, s, k]) => `<div class="vend"><div><b>${n}</b> <small>${w}</small></div><span class="pill ${k}">${s}</span></div>`).join("")}</div>
  <div style="display:flex;gap:8px;padding:10px 20px 16px;margin-top:auto"><span class="btn">Open BEO</span><span class="btn">Message couple</span><span class="btn d" style="margin-left:auto">Send final invoice · €14,580</span></div>
</section>

<section class="card" style="display:flex;flex-direction:column">
  <div class="ch"><h3>Seating · limonaia</h3><span>8 tables · 76 of 80 seats · head table 12</span></div>
  <div class="room">
    <svg width="440" height="452" viewBox="0 0 440 452">${tableSvg}</svg>
    <div class="head">Sposi · head table</div>
    <span class="zone" style="left:14px;bottom:10px">DANCE FLOOR →</span><span class="zone" style="left:14px;top:12px">STRINGS</span>
    ${tableLabels}
    <div class="drag">Zia Paola → Arezzo</div>
    <div class="uns"><h5>UNSEATED · 4</h5><div>Zia Paola <i>vegan</i></div><div>L. Ferri <i>+1</i></div><div>T. Conti</div><div>A. Moretti <i>child</i></div></div>
  </div>
  <div class="ch" style="padding-top:12px"><h3>Day-of run sheet</h3><span>Sat 17 Oct · sunset 18:42</span></div>
  <div class="run">${run.map(([t, a, b]) => `<div class="rr"><span class="mono">${t}</span><div><b>${a}</b>${b ? `<small>${b}</small>` : ""}</div></div>`).join("")}</div>
</section>
</div></body></html>`;
})();
