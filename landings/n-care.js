// Care Agency OS · Evergreen Home Care — live carer roster with travel + missed-visit alert, care plan, carer app, NDIS claims
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>', car: '<path d="M3 16v-4l2-5h14l2 5v4"/><path d="M3 16h18v2H3z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>', alert: '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    check: '<path d="M5 12l5 5 9-10"/>', phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>', pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)"/><path d="M9.5 8.5l5 7"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>', mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>'
  };
  const X = h => ((h - 7) / 8 * 100).toFixed(2); // 7:00–15:00 track
  const W = (a, b) => ((b - a) / 8 * 100).toFixed(2);
  const ST = {
    done: ["#E3F2EC", "#1F7A55", "Done"], live: ["#FFF1E3", "#C2620A", "In progress"], late: ["#FFF6D6", "#8A5A00", "Late start"],
    miss: ["#FFE3E0", "#B42318", "Missed"], up: ["#FFFFFF", "#3E5A54", "Upcoming"], open: ["#F6F4EF", "#7A8783", "Open shift"]
  };
  // [start, end, client, tasks, status, note]
  const rows = [
    ["AL", "#2E7D6B", "Ana Lopes", "Hoist · Meds L2", "6.5 h", [[8, 10, "Daniel Kerr", "Personal care · meds · breakfast", "live", "GPS 18 m · 8:02"], [10.25, 11.75, "Ravi Singh", "Shower · domestic", "up", ""], [12.5, 13.5, "Ella Ward", "Meal prep · social", "up", ""]], [[10, 10.25, "15m"], [11.75, 12.5, "12 min · 5 km"]]],
    ["MC", "#7A5AF8", "Mia Chen", "Female · Mandarin", "4.5 h", [[9, 10, "Joan Pearce", "Shower · meds prompt", "miss", "no check-in · 24 min"], [10.5, 12, "Wei Zhang", "Personal care", "up", ""]], [[10, 10.5, "20 min"]]],
    ["PN", "#C2620A", "Priya Nair", "Meds L2 · Dementia", "5 h", [[7.5, 8.5, "Harold Fisk", "Morning routine", "done", ""], [10.75, 12.25, "Lorna Burke", "Dementia support", "up", ""]], [[8.5, 8.85, "18m"]]],
    ["TW", "#3D6FD9", "Tom Ward", "Hoist · Male", "6 h", [[7, 8, "Ken Doyle", "Transfer · shower", "done", ""], [8.33, 9.67, "Sam Ortiz", "Personal care", "late", "started 8:32 · +12"], [11, 13, "Sam Ortiz", "Community access", "up", ""]], [[8, 8.33, "20m"]]],
    ["GO", "#B42318", "Grace Okafor", "RN · Wound care", "4 h", [[7.75, 8.75, "Bill Hart", "Insulin · obs", "done", ""], [9.25, 10.25, "Rose Ng", "Wound dressing", "live", "GPS 9 m · 9:16"], [11.5, 12.75, "Daniel Kerr", "Pressure care review", "up", ""]], [[8.75, 9.25, "22 min"]]],
    ["+", "#9AA7A3", "Open shifts", "2 need filling", "", [[12.75, 14, "Joan Pearce", "Female carer needed", "open", ""], [14, 15, "Wei Zhang", "Meds prompt", "open", ""]], []]
  ];
  const hours = ["7", "8", "9", "10", "11", "12", "1", "2", "3"];
  const roster = rows.map(([ini, col, name, skills, hrs, visits, travel]) => `
    <div class="rw"><div class="who"><span class="av" style="background:${col}">${ini}</span><div><b>${name}</b><small>${skills}</small></div><em>${hrs}</em></div>
    <div class="tr">${travel.map(([a, b, t]) => `<div class="tv" style="left:${X(a)}%;width:${W(a, b)}%"><span>${ic(I.car, 10)}${t}</span></div>`).join("")}
    ${visits.map(([a, b, c, t, s, n]) => { const [bg, fg, lab] = ST[s]; return `<div class="vs ${s}" style="left:${X(a)}%;width:${W(a, b)}%;background:${bg};border-color:${fg}"><div class="vt"><b>${c}</b>${s === "live" ? '<i class="dot"></i>' : ""}</div><div class="vk">${t}</div><div class="vn" style="color:${fg}">${s === "done" ? ic(I.check, 10) : ""}${n || lab}</div></div>`; }).join("")}
    </div></div>`).join("");

  const claims = [
    ["Daniel Kerr", "01_011_0107_1_1", "Self-care · weekday daytime", "2.00", "147.16"],
    ["Daniel Kerr", "01_011_0107_1_1", "Provider travel (labour)", "0.25", "18.40"],
    ["Ravi Singh", "01_011_0107_1_1", "Self-care · weekday daytime", "1.50", "110.37"],
    ["Ella Ward", "01_011_0107_1_1", "Self-care · weekday daytime", "1.00", "73.58"]
  ];

  window.LANDINGS.care = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Outfit',system-ui,sans-serif;color:#13302B;background:#F4F1EA}
.mono{font-family:'IBM Plex Mono',monospace}
.top{height:56px;background:#17423B;color:#DCE9E5;display:flex;align-items:center;gap:20px;padding:0 20px}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:34px;height:34px;border-radius:50%;background:#F59E5B;display:grid;place-items:center;color:#17423B;font-style:normal}
.lg b{display:block;font-size:15.5px;font-weight:700;color:#fff;line-height:1.1;white-space:nowrap}.lg span{font:500 10px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#8DB3AA}
.tabs{display:flex;gap:3px}.tabs span{white-space:nowrap;padding:7px 11px;border-radius:999px;font-weight:600;color:#A9C6BF;display:flex;gap:6px;align-items:center}.tabs span.on{background:#F4F1EA;color:#17423B}
.tabs em{font-style:normal;font-size:11px;background:#E5484D;color:#fff;border-radius:8px;padding:0 6px;line-height:17px}
.sr{margin-left:auto;display:flex;align-items:center;gap:8px;background:#1F5249;border-radius:999px;padding:8px 14px;color:#8DB3AA;width:220px;white-space:nowrap}
.ask{white-space:nowrap;display:flex;align-items:center;gap:6px;background:#F59E5B;color:#17423B;font-weight:700;border-radius:999px;padding:8px 14px}
.me{width:34px;height:34px;border-radius:50%;background:#DCE9E5;color:#17423B;display:grid;place-items:center;font-weight:700;font-size:12px}
.wrap{display:grid;grid-template-columns:900px 1fr;gap:14px;padding:12px 14px;height:844px}
.left{display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0}
.hd{display:flex;align-items:center;gap:9px}.hd h1{margin:0;font-size:23px;font-weight:700;letter-spacing:-.01em}
.chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E4DED2;border-radius:999px;padding:4px 11px;font-weight:600;font-size:12px;color:#3E5A54;white-space:nowrap}
.alert{display:flex;align-items:center;gap:12px;background:#B42318;color:#fff;border-radius:16px;padding:9px 14px;box-shadow:0 10px 24px rgba(180,35,24,.22)}
.alert .ai{width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,.16);display:grid;place-items:center;flex:none}
.alert b{display:block;font-size:14.5px}.alert small{opacity:.88;font-size:12px}
.ab{white-space:nowrap;display:flex;align-items:center;gap:6px;border-radius:10px;padding:8px 11px;font-weight:700;font-size:12.5px;background:rgba(255,255,255,.15)}.ab.p{background:#fff;color:#B42318}
.card{background:#fff;border-radius:18px;box-shadow:0 1px 2px rgba(19,48,43,.06);min-height:0}
.rh{display:grid;grid-template-columns:180px 1fr;padding:10px 14px 4px 0}.rh .hrs{position:relative;height:16px}
.rh .hrs span{position:absolute;transform:translateX(-50%);font:500 10.5px 'IBM Plex Mono',monospace;color:#8A9A96}
.rw{display:grid;grid-template-columns:180px 1fr;border-top:1px solid #F1EDE4;height:68px}
.who{display:flex;align-items:center;gap:9px;padding:0 10px 0 14px}.who>div{min-width:0;flex:1}.who b{display:block;font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.who small{display:block;color:#6C7E7A;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.who em{margin-left:auto;white-space:nowrap;font-style:normal;font:500 10.5px 'IBM Plex Mono',monospace;color:#8A9A96}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:11px;flex:none}
.tr{position:relative;margin-right:14px;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(12.5% - 1px),#F1EDE4 calc(12.5% - 1px),#F1EDE4 12.5%)}
.vs{position:absolute;top:5px;bottom:5px;border-radius:10px;border:1.5px solid;border-left-width:4px;padding:4px 7px;overflow:hidden;display:flex;flex-direction:column;gap:1px}
.vs.up{border-style:solid;border-color:#BFD3CE !important}.vs.open{border-style:dashed;border-left-width:1.5px}
.vs.miss{background:repeating-linear-gradient(135deg,#FFE3E0 0,#FFE3E0 8px,#FFD3CE 8px,#FFD3CE 16px) !important}
.vt{display:flex;align-items:center;gap:5px}.vt b{font-size:12px;white-space:nowrap}.vk{font-size:10.5px;color:#4C6460;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vn{display:flex;align-items:center;gap:3px;font-size:10.5px;font-weight:700;white-space:nowrap}
.dot{width:7px;height:7px;border-radius:50%;background:#F59E5B;box-shadow:0 0 0 3px rgba(245,158,91,.25);animation:p 1.4s infinite}@keyframes p{50%{opacity:.4}}
.tv{position:absolute;top:50%;height:0;border-top:2px dotted #A9BAB6}.tv span{position:absolute;left:50%;transform:translate(-50%,-50%);background:#fff;border:1px solid #E4DED2;border-radius:999px;padding:0 6px;font-size:9.5px;color:#6C7E7A;white-space:nowrap;display:flex;align-items:center;gap:3px}
.now{position:absolute;top:0;bottom:0;width:2px;background:#F59E5B}.now span{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:#F59E5B;color:#17423B;font:600 10px 'IBM Plex Mono',monospace;padding:1px 5px;border-radius:5px}
.cl{padding:11px 14px;display:flex;flex-direction:column;gap:6px}
.ch{display:flex;align-items:center;gap:8px;font-weight:700;font-size:14.5px}.ch span{margin-left:auto;font-weight:500;font-size:11.5px;color:#6C7E7A}
table{width:100%;border-collapse:collapse;font-size:12px}th{text-align:left;font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:#8A9A96;padding:4px 6px;border-bottom:1px solid #F1EDE4}td{padding:4px 6px;border-bottom:1px solid #F7F4EE}td.r,th.r{text-align:right}
.right{display:flex;flex-direction:column;gap:12px;min-width:0}
.cp{padding:13px 16px;display:flex;flex-direction:column;gap:7px}
.cph{display:flex;align-items:center;gap:11px}.cph .av{width:46px;height:46px;font-size:15px}.cph h2{margin:0;font-size:20px;font-weight:700}.cph small{color:#6C7E7A}
.flags{display:flex;flex-wrap:wrap;gap:5px}.flags span{display:inline-flex;align-items:center;gap:4px;border-radius:7px;padding:2px 8px;font-size:11px;font-weight:700}
.sec{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:#8A9A96;text-transform:uppercase}
.goal{display:grid;grid-template-columns:1fr 80px 34px;gap:8px;align-items:center;font-size:12px}.bar{height:6px;border-radius:4px;background:#EEF2F0;overflow:hidden}.bar i{display:block;height:100%;background:#2E7D6B;border-radius:4px}
.med{display:grid;grid-template-columns:1fr auto;gap:2px 8px;align-items:center;font-size:12px;padding:4px 0;border-bottom:1px dashed #EFEAE0}.med small{color:#6C7E7A}
.pill{border-radius:7px;padding:1px 8px;font-size:10.5px;font-weight:700;white-space:nowrap}
.bot{display:grid;grid-template-columns:1fr 222px;gap:12px;flex:1;min-height:0;overflow:hidden}
.fam{padding:13px 14px;display:flex;flex-direction:column;gap:8px}
.bub{background:#F4F1EA;border-radius:14px;padding:9px 11px;font-size:12px}
.phone{background:#0F1F1C;border-radius:30px;padding:8px;height:100%;min-height:0;overflow:hidden}
.scr{background:#F4F1EA;border-radius:23px;height:100%;padding:11px 10px;display:flex;flex-direction:column;gap:5px;overflow:hidden}
.ps{display:flex;justify-content:space-between;font-size:10px;font-weight:700;color:#3E5A54}
.gps{background:#17423B;color:#fff;border-radius:14px;padding:9px 10px}.gps b{display:block;font-size:14px}.gps small{color:#A9C6BF;font-size:10.5px}
.tk{display:flex;align-items:center;gap:7px;font-size:11.5px;background:#fff;border-radius:10px;padding:6px 8px}.tk i{width:16px;height:16px;border-radius:5px;border:1.5px solid #BFD3CE;display:grid;place-items:center;flex:none}.tk i.d{background:#2E7D6B;border-color:#2E7D6B;color:#fff}
.note{background:#fff;border-radius:10px;padding:7px 8px;font-size:11px;color:#3E5A54;border:1px dashed #BFD3CE}
.btn{text-align:center;border-radius:12px;padding:9px;font-weight:700;font-size:12.5px;background:#F59E5B;color:#17423B}
</style></head><body>
<div class="top"><div class="lg"><i>${ic(I.leaf, 18)}</i><div><b>Evergreen Home Care</b><span>CARE AGENCY OS · BRISBANE</span></div></div>
<div class="tabs"><span class="on">Roster</span><span>Clients</span><span>Carers</span><span>Incidents <em>1</em></span><span>Billing &amp; NDIS</span><span>Family portal</span></div>
<div class="sr">${ic(I.search, 15)}Client, carer or suburb</div><span class="ask">${ic(I.spark, 14)}Ask Care Agency OS</span><span class="me">KS</span></div>
<div class="wrap">
<div class="left">
<div class="hd"><h1>Today's roster</h1><span class="chip">Tue 6 Oct · 9:24</span><span class="chip">23 visits · 6 carers</span><span class="chip" style="color:#1F7A55">${ic(I.check, 12)}5 done</span><span class="chip" style="color:#C2620A">2 in progress</span><span class="chip" style="color:#8A5A00">1 late</span><span class="chip" style="color:#B42318">1 missed</span></div>
<div class="alert"><span class="ai">${ic(I.alert, 18)}</span><div style="flex:1"><b>Missed visit · Joan Pearce, 9:00 shower &amp; meds prompt</b><small>Mia Chen hasn't checked in (24 min). Joan lives alone, is a falls risk, and her daughter is the emergency contact.</small></div>
<span class="ab">${ic(I.phone, 13)}Call Mia</span><span class="ab p">${ic(I.users, 13)}Send Priya · 2.1 km · free till 10:45</span></div>
<div class="card" style="position:relative"><div class="rh"><div style="font-weight:700;font-size:14.5px;padding-left:14px">Carers</div><div class="hrs">${hours.map((h, i) => `<span style="left:${i * 12.5}%">${h}${i < 5 ? "am" : "pm"}</span>`).join("")}</div></div>
${roster}
<div class="now" style="left:calc(180px + (100% - 194px) * ${(9.4 - 7) / 8})"><span>9:24</span></div></div>
<div class="card cl"><div class="ch">NDIS claims · ready to submit<span>2026-27 price limits · Brisbane MMM1</span></div>
<table><tr><th>PARTICIPANT</th><th>SUPPORT ITEM</th><th>DESCRIPTION</th><th class="r">HRS</th><th class="r">RATE</th><th class="r">AMOUNT</th></tr>
${claims.map(([p, n, d, h, a]) => `<tr><td><b>${p}</b></td><td class="mono">${n}</td><td>${d}</td><td class="r mono">${h}</td><td class="r mono">$73.58</td><td class="r mono"><b>$${a}</b></td></tr>`).join("")}
<tr><td colspan="5" style="font-weight:700">4 lines · from GPS-verified visit times</td><td class="r mono" style="font-size:14px"><b>$349.51</b></td></tr></table>
<div style="display:flex;gap:8px;justify-content:flex-end"><span class="chip">Plan-managed · 2</span><span class="chip">Agency-managed · 1</span><span class="chip" style="background:#17423B;color:#fff;border-color:#17423B">Export PRODA bulk upload</span></div></div>
</div>
<div class="right">
<div class="card cp"><div class="cph"><span class="av" style="background:#3D6FD9">DK</span><div style="flex:1"><h2>Daniel Kerr</h2><small>34 · NDIS participant 43021 · cerebral palsy · Carindale</small></div><span class="pill" style="background:#FFF1E3;color:#C2620A">Visit in progress · Ana</span></div>
<div class="flags"><span style="background:#FFE3E0;color:#B42318">${ic(I.alert, 11)}Falls risk · hoist, 2-step transfer</span><span style="background:#FFF6D6;color:#8A5A00">Texture-modified · IDDSI 5</span><span style="background:#E8EEF9;color:#3D6FD9">Communicates with AAC tablet</span></div>
<div class="sec">Goals · plan review 12 Feb 2027</div>
<div class="goal"><span>Shower with less help (1 prompt only)</span><div class="bar"><i style="width:60%"></i></div><b class="mono">60%</b></div>
<div class="goal"><span>Catch the bus to TAFE on his own</span><div class="bar"><i style="width:35%"></i></div><b class="mono">35%</b></div>
<div class="sec" style="margin-top:2px">Medication chart · today</div>
<div class="med"><span><b>Baclofen 10 mg</b> · oral · 8:00</span><span class="pill" style="background:#E3F2EC;color:#1F7A55">Given 8:14 · Ana</span><small>Webster pack · slot Tue AM</small><span></span></div>
<div class="med"><span><b>Movicol 1 sachet</b> · 8:00</span><span class="pill" style="background:#E3F2EC;color:#1F7A55">Given 8:15</span></div>
<div class="med"><span><b>Paracetamol 1 g</b> · PRN for pain · max 4 g / 24 h</span><span class="pill" style="background:#F6F4EF;color:#6C7E7A">Last 6 Oct 0:40</span></div>
<div class="med" style="border:0"><span><b>Baclofen 10 mg</b> · 14:00 · prompt only</span><span class="pill" style="background:#fff;border:1px solid #BFD3CE;color:#3E5A54">Due · Grace</span></div>
</div>
<div class="bot">
<div class="card fam"><div class="ch">${ic(I.heart, 15)}Family portal<span>Sarah · sister</span></div>
<div class="bub"><b>Ana</b> · 9:18<br>Daniel had a good morning. He showered with one prompt, ate his porridge, and his meds are done. He'd like his TAFE folder packed for tomorrow.</div>
<div class="bub" style="background:#E3F2EC"><b>Sarah</b> · 9:21<br>Thanks Ana! I'll drop the folder off tonight.</div>
<div class="sec" style="margin-top:auto">Shared automatically after each visit</div></div>
<div class="phone"><div class="scr"><div class="ps"><span>9:24</span><span>Ana · carer app</span></div>
<div class="gps"><small>${ic(I.target, 10)} CHECKED IN 8:02 · 18 m from address</small><b>Daniel Kerr</b><small>8:00 – 10:00 · 36 min left</small></div>
<div class="tk"><i class="d">${ic(I.check, 10)}</i>Hoist transfer to shower</div><div class="tk"><i class="d">${ic(I.check, 10)}</i>Meds 8:00 · Webster pack</div><div class="tk"><i class="d">${ic(I.check, 10)}</i>Breakfast · IDDSI 5</div><div class="tk"><i></i>Pack TAFE bag</div>
<div class="note">${ic(I.mic, 11)} "Good mood, skin on sacrum intact, no pain reported." <b>Progress note</b></div>
<div class="btn">Check out</div></div></div>
</div></div></div></body></html>`;
})();
