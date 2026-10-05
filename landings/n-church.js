// Church OS · Grace Community Church — kids' check-in kiosk + labels, households, Sunday summary, service scheduling (Planning Center patterns)
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    check: '<path d="m5 12 5 5L20 7"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>', printer: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2"/><rect x="6" y="14" width="12" height="7"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/>'
  };

  // Sunday Oct 4: 412 + 538 + 186 + 274 = 1,410
  const att = [["9:00", 412, "#3F5A8C"], ["11:00", 538, "#1F2A44"], ["Kids", 186, "#E9A23B"], ["Online", 274, "#8FA3C7"]];
  const attBar = att.map(([l, n, c]) => `<i style="flex:${n};background:${c}"></i>`).join("");
  const attLeg = att.map(([l, n, c]) => `<div><span style="background:${c}"></span>${l}<b>${n}</b></div>`).join("");
  // funds: 38,420 + 9,150 + 4,980 + 1,210 = 53,760
  const funds = [["General fund", 38420, "#1F2A44"], ["Building fund", 9150, "#E9A23B"], ["Missions", 4980, "#3F8F7A"], ["Benevolence", 1210, "#B5577A"]];
  const fmax = 38420;
  const fd = funds.map(([n, v, c]) => `<div class="fd"><span>${n}</span><div class="fb"><i style="width:${Math.round(v / fmax * 100)}%;background:${c}"></i></div><b>$${v.toLocaleString("en-US")}</b></div>`).join("");

  const rooms = [["Nursery", 9, 10, "0–18 mo"], ["Little Lambs · 108", 14, 16, "Pre-K"], ["Explorers · 204", 22, 24, "K–2nd"], ["Trailblazers · 210", 17, 30, "3rd–5th"]];
  const rm = rooms.map(([n, a, b, g]) => `<div class="rm"><div><b>${n}</b><small>${g}</small></div><div class="rb"><i style="width:${Math.round(a / b * 100)}%;background:${a / b >= .9 ? "#E9A23B" : "#3F8F7A"}"></i></div><em>${a}/${b}</em></div>`).join("");

  const homes = [["Martinez", 4, "#E9A23B", 1], ["Nguyen", 3, "#3F8F7A"], ["Okafor", 5, "#B5577A"], ["Reyes", 2, "#3F5A8C"], ["Thompson", 6, "#8A6D3B"]];
  const hl = homes.map(([n, c, col, on]) => `<div class="hh${on ? " on" : ""}"><span class="ha" style="background:${col}">${n[0]}</span><b>${n} household</b><small>${c} people</small></div>`).join("");

  const sched = [["Worship leader", "Hannah Cole", "acc"], ["Sound", "Luis Ortega", "acc"], ["Greeter · north doors", "Daniel Martinez", "acc"], ["Kids · Explorers 204", "Ana Martinez", "pen"], ["Camera 2", "Ben Price", "dec"], ["Welcome desk", "Unfilled", "open"]];
  const st = { acc: ["Accepted", "#2F7A63", "#E2F2EC"], pen: ["Pending", "#9A6408", "#FDF1DA"], dec: ["Declined", "#B03A2E", "#FBE4E1"], open: ["Needs someone", "#3F5A8C", "#E6ECF6"] };
  const sc = sched.map(([p, n, k]) => `<div class="sc"><div><b>${p}</b><small>${n}</small></div><span class="pill" style="color:${st[k][1]};background:${st[k][2]}">${st[k][0]}</span></div>`).join("");

  window.LANDINGS.church = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#F4EFE6;color:#1F2A44;font:13.5px/1.4 'Hanken Grotesk',system-ui,sans-serif}
.top{height:58px;background:#1F2A44;color:#E9E4DA;display:flex;align-items:center;gap:18px;padding:0 22px}
.mark{display:flex;align-items:center;gap:10px}.mark i{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 50% 60%,#F6C46B 0 30%,#E9A23B 31% 100%);display:grid;place-items:center;font:700 18px 'Cormorant Garamond',serif;color:#1F2A44;font-style:normal}
.mark b{display:block;font:700 18px 'Cormorant Garamond',serif;letter-spacing:.01em;color:#fff}.mark span{font:700 9.5px 'Hanken Grotesk';letter-spacing:.2em;color:#A9B3C7}
.tabs{display:flex;gap:4px;margin-left:16px}.tabs span{padding:7px 12px;border-radius:999px;color:#C9D0DE;font-weight:600}.tabs span.on{background:#E9A23B;color:#1F2A44}
.srch{margin-left:auto;display:flex;align-items:center;gap:8px;background:#2B3756;border-radius:999px;padding:7px 14px;color:#A9B3C7;width:250px}
.ask{display:flex;align-items:center;gap:6px;border:1px solid #46557A;border-radius:999px;padding:7px 14px;font-weight:700;color:#F6C46B}
.grid{display:grid;grid-template-columns:330px 520px 1fr;gap:16px;padding:16px 18px;height:842px}
.card{background:#FFFDF9;border:1px solid #E6DDCD;border-radius:18px;overflow:hidden}
.h{display:flex;justify-content:space-between;align-items:center;padding:13px 16px 8px;font-weight:800}.h small{font-weight:500;color:#7C849A}
.sun{height:118px;background:url(img/church/sanctuary.jpg) center 55%/cover;position:relative}
.sun:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(31,42,68,.1),rgba(31,42,68,.85))}
.sun div{position:absolute;left:16px;bottom:11px;z-index:1;color:#fff}.sun small{font:700 9.5px 'Hanken Grotesk';letter-spacing:.18em;color:#F6C46B}.sun b{display:block;font:700 23px 'Cormorant Garamond',serif}
.big{display:flex;align-items:baseline;gap:8px;padding:12px 16px 4px}.big b{font:700 40px 'Cormorant Garamond',serif;line-height:1}.big span{color:#7C849A}
.ab{display:flex;height:10px;border-radius:5px;overflow:hidden;margin:6px 16px 8px;gap:2px}
.leg{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;padding:0 16px 12px;font-size:12px;color:#5B6378}
.leg div{display:flex;align-items:center;gap:6px}.leg span{width:8px;height:8px;border-radius:2px}.leg b{margin-left:auto;color:#1F2A44}
.fd{display:grid;grid-template-columns:96px 1fr 70px;gap:10px;align-items:center;padding:6px 16px;font-size:12.5px}
.fb{height:7px;border-radius:4px;background:#EFE8DC;overflow:hidden}.fb i{display:block;height:100%;border-radius:4px}.fd b{text-align:right;font-variant-numeric:tabular-nums}
.gt{margin:8px 16px 14px;display:flex;justify-content:space-between;align-items:center;border-top:1px dashed #E6DDCD;padding-top:10px}
.gt b{font:700 22px 'Cormorant Garamond',serif}.gt small{color:#7C849A}
.pr{padding:9px 16px;border-top:1px solid #F1EBDF;display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center}
.pr b{font-size:13px}.pr small{display:block;color:#7C849A;font-size:11.5px}.pr span{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:700;color:#B5577A;background:#F8E8EF;border-radius:999px;padding:3px 9px}
/* kiosk */
.mid{display:flex;flex-direction:column;gap:14px}
.kh{display:flex;justify-content:space-between;align-items:center;font:700 10.5px 'Hanken Grotesk';letter-spacing:.16em;color:#7C849A;padding:0 4px}
.kh span{display:flex;align-items:center;gap:6px;color:#2F7A63}.kh span:before{content:"";width:7px;height:7px;border-radius:50%;background:#2F7A63}
.tab{background:#141B2D;border-radius:30px;padding:14px;box-shadow:0 22px 50px rgba(31,42,68,.25)}
.ks{background:linear-gradient(180deg,#FFFDF9,#F6F0E5);border-radius:18px;padding:18px 22px;display:flex;flex-direction:column}
.ks .wel{font:700 11px 'Hanken Grotesk';letter-spacing:.18em;color:#E9A23B}.ks h2{margin:2px 0 0;font:700 32px 'Cormorant Garamond',serif}.ks p{margin:0 0 14px;color:#5B6378}
.kid{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;border:2px solid #E6DDCD;border-radius:16px;padding:9px 12px;background:#fff;margin-bottom:8px}
.kid.on{border-color:#1F2A44;box-shadow:0 0 0 4px rgba(233,162,59,.25)}
.ka{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;font:700 22px 'Cormorant Garamond',serif;color:#fff}
.kid b{font-size:17px;display:block}.kid small{color:#5B6378;font-size:12.5px}
.al{display:inline-flex;align-items:center;gap:4px;margin-top:4px;font-size:11.5px;font-weight:700;color:#B03A2E;background:#FBE4E1;border-radius:999px;padding:2px 8px}
.tick{width:38px;height:38px;border-radius:50%;background:#1F2A44;color:#fff;display:grid;place-items:center}.tick.off{background:#fff;border:2px solid #CFC6B5;color:transparent}
.ksb{margin-top:6px;display:flex;gap:10px}.kb{flex:1;text-align:center;border-radius:14px;padding:13px;font-weight:800;font-size:17px;border:2px solid #E6DDCD;background:#fff}
.kb.p{background:#E9A23B;border-color:#E9A23B;color:#1F2A44;display:flex;align-items:center;justify-content:center;gap:8px}
.labels{display:flex;gap:14px;align-items:flex-start;padding:0 6px}
.lab{background:#fff;border-radius:6px;box-shadow:0 6px 16px rgba(31,42,68,.14);padding:10px 12px;position:relative;font-family:'Hanken Grotesk'}
.lab:before{content:"";position:absolute;left:0;right:0;top:0;height:5px;background:repeating-linear-gradient(90deg,#1F2A44 0 3px,transparent 3px 6px);opacity:.12}
.lab.c{width:250px;transform:rotate(-1.5deg)}.lab.p{width:200px;transform:rotate(1.2deg) translateY(8px)}
.lab .nm{font:800 24px 'Hanken Grotesk';letter-spacing:-.01em;line-height:1}.lab small{display:block;color:#5B6378;font-size:11px;margin-top:2px}
.code{font:700 26px 'Space Mono',monospace;letter-spacing:.06em;color:#1F2A44;border:2px solid #1F2A44;border-radius:6px;padding:0 8px;display:inline-block}
.lr{display:flex;justify-content:space-between;align-items:flex-end;margin-top:8px}
.lab .tg{font-size:10px;font-weight:800;letter-spacing:.12em;color:#7C849A}
.rm{display:grid;grid-template-columns:104px 1fr 36px;gap:8px;align-items:center;padding:5px 14px;font-size:12.5px}
.rm b{display:block;font-size:12.5px}.rm small{color:#7C849A;font-size:11px}.rb{height:7px;border-radius:4px;background:#EFE8DC;overflow:hidden}.rb i{display:block;height:100%}
.rm em{font-style:normal;font-weight:800;text-align:right}
/* right */
.right{display:flex;flex-direction:column;gap:14px}
.dir{display:grid;grid-template-columns:170px 1fr;height:420px}
.dl{border-right:1px solid #F1EBDF;padding:6px 8px;background:#FBF7F0}
.dl .s{display:flex;align-items:center;gap:6px;border:1px solid #E6DDCD;border-radius:999px;padding:5px 10px;color:#7C849A;font-size:12px;margin:6px 4px 8px;background:#fff}
.hh{display:grid;grid-template-columns:28px 1fr;gap:0 8px;align-items:center;padding:7px 8px;border-radius:10px}.hh.on{background:#fff;box-shadow:0 1px 3px rgba(31,42,68,.1)}
.ha{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;color:#fff;font-weight:800;grid-row:span 2}.hh b{font-size:12.5px}.hh small{color:#7C849A;font-size:11px}
.hd{padding:16px 18px}
.hd h3{margin:0;font:700 26px 'Cormorant Garamond',serif}.hd .sub{color:#5B6378;font-size:12.5px}
.mem{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}
.mb{display:flex;align-items:center;gap:9px;border:1px solid #F1EBDF;border-radius:12px;padding:8px}
.mb i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-style:normal;font-size:12px}
.mb b{display:block;font-size:13px}.mb small{color:#7C849A;font-size:11px}
.kv{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;font-size:12.5px;margin-top:4px}
.kv span{color:#7C849A}.kv b{display:block;color:#1F2A44;font-weight:700}
.pl{margin-top:12px;background:#FBF3E4;border-radius:12px;padding:10px 12px;font-size:12.5px}
.pl .pb{height:7px;border-radius:4px;background:#F2E2C2;margin-top:6px;overflow:hidden}.pl .pb i{display:block;height:100%;width:52%;background:#E9A23B}
.sc{display:flex;justify-content:space-between;align-items:center;padding:6px 16px;border-top:1px solid #F1EBDF}.sc b{display:block;font-size:13px}.sc small{color:#7C849A;font-size:12px}
.pill{font-size:11.5px;font-weight:800;border-radius:999px;padding:3px 10px}
.btn{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 12px;font-weight:700;font-size:12.5px;background:#1F2A44;color:#fff}
</style></head><body>
<div class="top"><div class="mark"><i>G</i><div><b>Grace Community Church</b><span>CHURCH OS · DALLAS</span></div></div>
<div class="tabs"><span>People</span><span class="on">Check-ins</span><span>Services</span><span>Giving</span><span>Groups</span><span>Calendar</span></div>
<div class="srch">${ic(I.search, 14)}Search people & households</div><div class="ask">${ic(I.spark, 14)}Ask Church OS</div></div>
<div class="grid">
<div style="display:flex;flex-direction:column;gap:14px">
<div class="card"><div class="sun"><div><small>LAST SUNDAY · OCT 4</small><b>Two services &amp; online</b></div></div>
<div class="big"><b>1,410</b><span>people · up 6% on September avg</span></div><div class="ab">${attBar}</div><div class="leg">${attLeg}</div>
<div class="h" style="padding-top:2px">Giving by fund<small>71% online · 18 text-to-give</small></div>${fd}
<div class="gt"><small>Total this week</small><b>$53,760</b></div></div>
<div class="card"><div class="h">Prayer requests<small>shared with prayer team</small></div>
<div class="pr"><div><b>Surgery recovery for Walt</b><small>from the Thompson household · Tue</small></div><span>${ic(I.heart, 12)}Prayed 14</span></div>
<div class="pr"><div><b>New job search</b><small>anonymous · Sun</small></div><span>${ic(I.heart, 12)}Prayed 9</span></div>
<div class="pr"><div><b>Missions team in Guatemala</b><small>staff · Sat</small></div><span>${ic(I.heart, 12)}Prayed 31</span></div></div>
</div>
<div class="mid">
<div class="kh">CHECK-IN STATION · MAIN LOBBY · 11:00 SERVICE<span>PRINTER READY</span></div>
<div class="tab"><div class="ks"><div class="wel">WELCOME BACK</div><h2>Martinez family</h2><p>Who's checking in for the 11:00 service?</p>
<div class="kid on"><span class="ka" style="background:#E9A23B">SM</span><div><b>Sofia, 7</b><small>2nd grade · Explorers · Room 204</small><div><span class="al">${ic(I.alert, 11)}Peanut allergy</span></div></div><span class="tick">${ic(I.check, 20)}</span></div>
<div class="kid on"><span class="ka" style="background:#3F8F7A">MM</span><div><b>Mateo, 4</b><small>Pre-K · Little Lambs · Room 108</small></div><span class="tick">${ic(I.check, 20)}</span></div>
<div class="kid"><span class="ka" style="background:#8FA3C7">+</span><div><b>Add a visiting friend</b><small>new kids get a guest profile in 30 seconds</small></div><span class="tick off">${ic(I.check, 20)}</span></div>
<div class="ksb"><div class="kb">Back</div><div class="kb p">${ic(I.printer, 20)}Check in 2 &amp; print</div></div></div></div>
<div class="labels">
<div class="lab c"><div class="tg">NAME TAG · ROOM 204</div><div class="nm">Sofia M.</div><small>Explorers · 11:00 · Mom: Ana (214) 555-0147</small><div class="lr"><span class="al">${ic(I.alert, 11)}PEANUT ALLERGY</span><span class="code">K7Q</span></div></div>
<div class="lab p"><div class="tg">PARENT PICKUP</div><div class="nm" style="font-size:18px">Sofia &amp; Mateo</div><small>Show this to pick up · no room shown</small><div class="lr"><span></span><span class="code">K7Q</span></div></div>
</div>
<div class="card"><div class="h">Rooms right now<small>ratio alerts at 90%</small></div><div style="display:grid;grid-template-columns:1fr 1fr;padding-bottom:8px">${rm}</div></div>
</div>
<div class="right">
<div class="card dir"><div class="dl"><div class="s">${ic(I.search, 12)}Households</div>${hl}<div style="padding:8px;color:#7C849A;font-size:11.5px">2,184 people · 812 households</div></div>
<div class="hd"><h3>The Martinez household</h3><div class="sub">Lake Highlands, Dallas · members since 2019 · prefer text</div>
<div class="mem"><div class="mb"><i style="background:#1F2A44">DM</i><div><b>Daniel</b><small>Greeting team</small></div></div><div class="mb"><i style="background:#B5577A">AM</i><div><b>Ana</b><small>Kids ministry</small></div></div><div class="mb"><i style="background:#E9A23B">SM</i><div><b>Sofia, 7</b><small>Explorers</small></div></div><div class="mb"><i style="background:#3F8F7A">MM</i><div><b>Mateo, 4</b><small>Little Lambs</small></div></div></div>
<div class="kv"><div><span>Small group</span><b>Lakewood Young Families · Tue 7 pm</b></div><div><span>Last attended</span><b>Oct 4 · 11:00</b></div><div><span>Giving 2026</span><b>$6,240 · $520/mo recurring</b></div><div><span>Statement</span><b>Joint · emailed Jan</b></div></div>
<div class="pl"><b>Building fund pledge</b> · $1,560 of $3,000 given<div class="pb"><i></i></div></div></div></div>
<div class="card"><div class="h">Sunday Oct 11 · 11:00 team<small>3 of 6 confirmed</small></div>${sc}<div style="padding:8px 16px"><span class="btn">${ic(I.users, 13)}Find a Camera 2 sub</span></div></div>
</div>
</div></body></html>`;
})();
