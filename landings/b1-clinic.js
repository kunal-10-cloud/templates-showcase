// Clinic OS preview: practitioner day schedule + open patient chart (Jane/Cliniko-style), Riverbend Physio.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7"/>',
    note: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', inv: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    msg: '<path d="M4 5h16v11H8l-4 4z"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', chev: '<path d="M9 6l6 6-6 6"/>', chevl: '<path d="M15 6l-6 6 6 6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>', play: '<path d="M7 4l12 8-12 8z"/>',
    check: '<path d="M5 12l5 5 9-10"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', sms: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>', video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>'
  };
  const T = { assess: ["#E9E4FF", "#6E56CF"], follow: ["#DDF3EE", "#0F7A6C"], class: ["#FFF1DA", "#B7791F"], tele: ["#E1ECFF", "#2F6FD6"], admin: ["#EEF0F3", "#7A8392"] };
  const ST = { arrived: ["#0F9D6E", "Arrived"], intx: ["#0F5C5A", "In treatment"], booked: ["#7A8392", "Booked"], risk: ["#E2574C", "No-show risk"], done: ["#9AA3AE", "Completed"], form: ["#B7791F", "Intake pending"] };
  // [col, start(h), dur(h), name, type, apptLabel, status, active]
  const appts = [
    [0, 8, 0.75, "Olivia Grant", "follow", "Follow-up · lumbar", "done"], [0, 9, 0.75, "Noah Patel", "follow", "ACL rehab · wk 6", "intx", 1], [0, 10, 1, "Priya Shah", "assess", "Initial assessment", "form"], [0, 11.25, 0.75, "Ella Moore", "follow", "Post-op ankle", "booked"], [0, 13, 0.75, "Liam Ford", "assess", "Initial · neck", "booked"],
    [1, 8.25, 0.75, "James Wright", "follow", "Knee OA review", "done"], [1, 9.25, 1.25, "Pilates rehab", "class", "Group · 6 of 8", "arrived"], [1, 11, 0.75, "Sara Ali", "tele", "Telehealth review", "booked"], [1, 12, 1, "Lunch & notes", "admin", "", ""], [1, 13.25, 0.75, "Mo Farouk", "follow", "Hamstring · s3", "risk"],
    [2, 8, 1, "Ben Howard", "assess", "Initial · shoulder", "done"], [2, 9.5, 0.75, "Emma Lloyd", "follow", "Shoulder · s4", "arrived"], [2, 10.5, 0.75, "Ruth Bell", "follow", "Back pain · s2", "booked"], [2, 11.5, 0.75, "Tom Baker", "follow", "Lower back", "booked"]
  ];
  const H0 = 8, PX = 94, top0 = 0;
  const colW = 188, colX = (c) => 50 + c * (colW + 8);
  const apptHTML = appts.map(([c, s, d, n, t, l, st, act]) => {
    const [bg, fg] = T[t]; const sx = st ? ST[st] : null;
    return `<div class="ap${act ? " act" : ""}${st === "done" ? " done" : ""}" style="left:${colX(c)}px;top:${top0 + (s - H0) * PX + 2}px;height:${d * PX - 5}px;width:${colW}px;background:${bg};--fg:${fg}">
      <div class="apn">${n}</div>${l ? `<div class="apl">${l}</div>` : ""}${sx ? `<div class="aps" style="color:${sx[0]}"><i style="background:${sx[0]}"></i>${sx[1]}</div>` : ""}</div>`;
  }).join("");
  const hours = [8, 9, 10, 11, 12, 13].map(h => `<div class="hr" style="top:${(h - H0) * PX}px"><span>${h}:00</span></div>`).join("");
  const nowY = (9.62 - H0) * PX;

  // body chart (front view), simple anatomical silhouette
  const body = `<svg width="170" height="300" viewBox="0 0 170 300" aria-label="Body chart">
    <defs><radialGradient id="pn" r="0.5"><stop offset="0" stop-color="#E2574C" stop-opacity=".55"/><stop offset="1" stop-color="#E2574C" stop-opacity="0"/></radialGradient>
    <radialGradient id="pa" r="0.5"><stop offset="0" stop-color="#F0A23B" stop-opacity=".5"/><stop offset="1" stop-color="#F0A23B" stop-opacity="0"/></radialGradient></defs>
    <g fill="#EAF0F1" stroke="#B9C7CB" stroke-width="1.4">
      <circle cx="85" cy="26" r="17"/>
      <path d="M77 42h16l2 8H75z"/>
      <path d="M58 52 Q85 44 112 52 L118 70 L112 128 Q85 136 58 128 L52 70 Z"/>
      <path d="M58 128 Q85 136 112 128 L114 150 Q85 158 56 150 Z"/>
      <path d="M52 56 Q42 60 40 76 L34 136 Q33 146 40 146 L44 146 L54 80 Z"/>
      <path d="M118 56 Q128 60 130 76 L136 136 Q137 146 130 146 L126 146 L116 80 Z"/>
      <path d="M57 150 L84 152 L80 214 L78 284 Q72 292 64 288 L62 214 Z"/>
      <path d="M113 150 L86 152 L90 214 L92 284 Q98 292 106 288 L108 214 Z"/>
    </g>
    <g stroke="#B9C7CB" stroke-width="1" fill="none" opacity=".7"><path d="M64 214 Q72 220 80 214"/><path d="M90 214 Q98 220 106 214"/><path d="M85 60 V124"/></g>
    <circle cx="72" cy="214" r="20" fill="url(#pn)"/><circle cx="72" cy="214" r="5.5" fill="#E2574C" stroke="#fff" stroke-width="2"/>
    <circle cx="70" cy="180" r="14" fill="url(#pa)"/><circle cx="70" cy="180" r="4" fill="#F0A23B" stroke="#fff" stroke-width="1.5"/>
    <text x="8" y="296" font-size="9" fill="#8A97A0" font-family="sans-serif">R</text><text x="156" y="296" font-size="9" fill="#8A97A0" font-family="sans-serif">L</text>
  </svg>`;
  // NPRS trend 7 -> 3 over 6 sessions
  const nprs = [7, 6, 6, 5, 4, 3], W = 230, Hh = 70;
  const pts = nprs.map((v, i) => [10 + i * (W - 20) / 5, 8 + (1 - v / 10) * (Hh - 16) - 10]);
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const trend = `<svg width="${W}" height="${Hh}" viewBox="0 0 ${W} ${Hh}"><defs><linearGradient id="tg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0F7A6C" stop-opacity=".22"/><stop offset="1" stop-color="#0F7A6C" stop-opacity="0"/></linearGradient></defs>
    <path d="${path} L${pts[5][0]} ${Hh} L${pts[0][0]} ${Hh} Z" fill="url(#tg)"/><path d="${path}" fill="none" stroke="#0F7A6C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === 5 ? 4.5 : 3}" fill="${i === 5 ? "#0F7A6C" : "#fff"}" stroke="#0F7A6C" stroke-width="1.8"/>`).join("")}</svg>`;
  const wave = Array.from({ length: 28 }, (_, i) => `<i style="height:${[6, 10, 16, 9, 20, 14, 7, 12, 18, 11, 5, 9, 15, 22, 13, 8, 17, 10, 6, 12, 19, 9, 14, 7, 11, 16, 8, 5][i]}px;animation-delay:${(i % 7) * 0.12}s"></i>`).join("");
  const hep = [["Heel slides", "3 × 15 · daily", 92], ["Straight-leg raise", "3 × 12 · daily", 86], ["Mini squats to 45°", "3 × 10 · 5×/wk", 71], ["Single-leg balance", "4 × 30 s", 64]];

  window.LANDINGS.clinic = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Albert Sans',system-ui,sans-serif;color:#17232B;background:#EEF2F4}
.app{display:grid;grid-template-columns:68px 1fr;height:900px}
.rail{background:#0E3B3A;display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 0}
.lg{width:38px;height:38px;border-radius:12px;background:linear-gradient(150deg,#3FB8A6,#0F7A6C);display:grid;place-items:center;color:#fff;font-weight:700;font-size:17px;margin-bottom:14px;box-shadow:0 6px 16px rgba(0,0,0,.25)}
.ri{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;color:#8FB7B2;position:relative}.ri.on{background:rgba(255,255,255,.12);color:#fff}
.ri b{position:absolute;top:6px;right:6px;min-width:15px;height:15px;border-radius:8px;background:#E2574C;color:#fff;font-size:9.5px;display:grid;place-items:center;padding:0 3px}
.ri.ai{margin-top:auto;background:rgba(63,184,166,.18);color:#7FE0D1}
.main{display:flex;flex-direction:column;min-width:0}
.top{height:62px;background:#fff;border-bottom:1px solid #E2E8EB;display:flex;align-items:center;gap:14px;padding:0 22px}
.bn b{display:block;font-size:15px}.bn span{font:500 10.5px 'IBM Plex Mono',monospace;color:#6F7E86;letter-spacing:.06em}
.dt{display:flex;align-items:center;gap:6px;margin-left:18px;border:1px solid #E2E8EB;border-radius:10px;padding:5px 8px;font-weight:600}.dt svg{color:#6F7E86}
.loc{font-size:12.5px;color:#55656E;background:#F2F5F6;border-radius:999px;padding:5px 11px}
.srch{margin-left:auto;display:flex;align-items:center;gap:8px;width:280px;border:1px solid #E2E8EB;background:#F7F9FA;border-radius:10px;padding:8px 11px;color:#8A97A0}
.btn{white-space:nowrap;border:1px solid #D6DEE2;background:#fff;border-radius:10px;padding:8px 14px;font-weight:600}.btn.p{background:#0F7A6C;border-color:#0F7A6C;color:#fff;box-shadow:0 6px 14px rgba(15,122,108,.28)}
.body{flex:1;display:grid;grid-template-columns:680px 1fr;gap:16px;padding:16px 18px 18px;min-height:0}
.card{background:#fff;border-radius:18px;box-shadow:0 1px 2px rgba(16,40,48,.06),0 8px 24px rgba(16,40,48,.05);overflow:hidden;display:flex;flex-direction:column;min-height:0}
.sh{display:flex;align-items:center;gap:10px;padding:14px 16px 10px}.sh h2{margin:0;font-size:16px}.sh .k{margin-left:auto;display:flex;gap:6px}
.lgd{display:flex;gap:12px;padding:0 16px 10px;font-size:11.5px;color:#55656E}.lgd i{display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:5px;vertical-align:-1px}
.pr{display:grid;grid-template-columns:50px repeat(3,188px);gap:0 8px;padding:0 16px 8px}
.ph{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;background:#F5F8F9}.ph .av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:10.5px;font-weight:700;flex:none}
.ph b{display:block;font-size:12.5px}.ph small{color:#6F7E86;font-size:11px}
.grid{position:relative;margin:0 16px;height:${6 * PX}px}
.hr{position:absolute;left:0;right:0;border-top:1px solid #EDF1F3}.hr span{position:absolute;left:0;top:-8px;font:500 10.5px 'IBM Plex Mono',monospace;color:#97A4AB;background:#fff;padding-right:6px}
.ap{position:absolute;border-radius:12px;padding:8px 10px;border-left:3px solid var(--fg);overflow:hidden}
.ap.done{opacity:.55}.apn{font-weight:700;font-size:12.8px;color:#17232B}.apl{font-size:11.5px;color:#4D5D66}
.aps{font-size:10.8px;font-weight:600;margin-top:3px;display:flex;align-items:center;gap:5px}.aps i{width:6px;height:6px;border-radius:50%}
.ap.act{box-shadow:0 0 0 2px #0F7A6C,0 10px 22px rgba(15,122,108,.22);background:#fff!important}
.now{position:absolute;left:44px;right:0;height:0;border-top:2px solid #E2574C}.now:before{content:"9:37";position:absolute;left:-44px;top:-9px;font:600 10px 'IBM Plex Mono',monospace;color:#fff;background:#E2574C;border-radius:5px;padding:1px 4px}
.wl{margin:auto 16px 14px;border-radius:14px;background:linear-gradient(90deg,#FFF6EC,#FFF);border:1px solid #F6DDBF;padding:11px 14px;display:flex;align-items:center;gap:12px}
.wl .t{flex:1}.wl b{font-size:13px}.wl small{display:block;color:#7A6A55;font-size:12px}
.chart{display:flex;flex-direction:column}
.pt{display:flex;align-items:center;gap:14px;padding:16px 18px 12px;border-bottom:1px solid #EDF1F3}
.pav{width:46px;height:46px;border-radius:14px;background:linear-gradient(150deg,#F2B880,#D9784A);display:grid;place-items:center;color:#fff;font-weight:700;font-size:16px}
.pt h1{margin:0;font-size:20px;letter-spacing:-.01em}.pt p{margin:2px 0 0;color:#55656E;font-size:12.5px}
.tag{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;border-radius:999px;padding:3px 9px;white-space:nowrap}
.tabs{display:flex;gap:4px;padding:8px 18px 0;border-bottom:1px solid #EDF1F3}.tabs span{padding:8px 12px;font-weight:600;color:#6F7E86;border-bottom:2px solid transparent}.tabs span.on{color:#0F5C5A;border-color:#0F7A6C}
.cb{display:grid;grid-template-columns:1fr 268px;gap:16px;padding:14px 18px;flex:1;min-height:0}
.scribe{display:flex;align-items:center;gap:10px;background:#0E3B3A;color:#DDF3EE;border-radius:12px;padding:9px 12px}
.wave{display:flex;align-items:center;gap:2px;height:22px}.wave i{width:3px;border-radius:2px;background:#7FE0D1;animation:wv 1.1s ease-in-out infinite}
@keyframes wv{0%,100%{transform:scaleY(.45)}50%{transform:scaleY(1)}}
.rec{width:8px;height:8px;border-radius:50%;background:#FF6B5E;box-shadow:0 0 0 4px rgba(255,107,94,.25);animation:pl 1.4s infinite}@keyframes pl{50%{opacity:.4}}
.soap{display:flex;flex-direction:column;gap:9px;margin-top:12px}
.so{display:grid;grid-template-columns:26px 1fr;gap:10px}.so .l{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;font-weight:700;font-size:12px;color:#0F5C5A;background:#DDF3EE}
.so h4{margin:0 0 2px;font-size:12px;color:#6F7E86;font-weight:600;text-transform:uppercase;letter-spacing:.05em}.so p{margin:0;font-size:13px;line-height:1.45;color:#25333B}
.so .ai{background:linear-gradient(90deg,rgba(63,184,166,.16),rgba(63,184,166,0));border-radius:6px;padding:0 4px}
.cursor{display:inline-block;width:2px;height:14px;background:#0F7A6C;vertical-align:-2px;animation:pl 1s steps(1) infinite}
.side{display:flex;flex-direction:column;gap:12px;min-height:0}
.box{border:1px solid #E6ECEF;border-radius:14px;padding:11px 12px}.box h5{margin:0 0 6px;font-size:12px;color:#55656E;font-weight:600;display:flex;justify-content:space-between}
.hep{display:grid;grid-template-columns:1fr 70px;gap:4px 10px;align-items:center;font-size:12.3px}.hep small{color:#6F7E86;display:block;font-size:11px}
.bar{height:6px;border-radius:4px;background:#EDF1F3;overflow:hidden}.bar i{display:block;height:100%;border-radius:4px;background:#0F7A6C}
.foot{display:flex;align-items:center;gap:10px;padding:12px 18px;border-top:1px solid #EDF1F3;background:#FAFCFC}
</style></head><body><div class="app">
<nav class="rail"><div class="lg">R</div><div class="ri on">${ic(I.cal, 20)}</div><div class="ri">${ic(I.users, 20)}</div><div class="ri">${ic(I.note, 20)}<b>4</b></div><div class="ri">${ic(I.msg, 20)}<b>3</b></div><div class="ri">${ic(I.inv, 20)}</div><div class="ri">${ic(I.chart, 20)}</div><div class="ri">${ic(I.gear, 20)}</div><div class="ri ai">${ic(I.spark, 20)}</div></nav>
<div class="main">
<div class="top"><div class="bn"><b>Riverbend Physio</b><span>CLINIC OS</span></div>
<div class="dt">${ic(I.chevl, 15)}<span>Monday 5 October</span>${ic(I.chev, 15)}</div><span class="loc">Headingley, Leeds · 3 clinicians · 2 rooms</span>
<div class="srch">${ic(I.search, 15)}Find a patient or appointment</div><span class="btn">Waitlist · 3</span><span class="btn p">+ Book</span></div>
<div class="body">
<section class="card"><div class="sh"><h2>Today</h2><span class="tag" style="background:#DDF3EE;color:#0F7A6C">38 booked · 92% full</span><span class="tag" style="background:#F2F5F6;color:#55656E">${ic(I.sms, 13)} 36 reminders sent</span><div class="k"><span class="btn" style="padding:5px 10px">Day</span><span class="btn" style="padding:5px 10px;color:#6F7E86">Week</span></div></div>
<div class="lgd"><span><i style="background:#6E56CF"></i>Initial assessment</span><span><i style="background:#0F7A6C"></i>Follow-up</span><span><i style="background:#B7791F"></i>Class</span><span><i style="background:#2F6FD6"></i>Telehealth</span></div>
<div class="pr"><div></div>
<div class="ph"><span class="av" style="background:#0F7A6C">HC</span><div><b>Dr Hannah Cole</b><small>Room 2 · 5 appts</small></div></div>
<div class="ph"><span class="av" style="background:#6E56CF">TR</span><div><b>Tom Reid</b><small>Gym · 5 appts</small></div></div>
<div class="ph"><span class="av" style="background:#D9784A">AK</span><div><b>Aisha Khan</b><small>Room 1 · 4 appts</small></div></div></div>
<div class="grid">${hours}${apptHTML}<div class="now" style="top:${nowY}px"></div></div>
<div class="wl"><span class="tag" style="background:#F6DDBF;color:#8A5608">Waitlist</span><div class="t"><b>Mo Farouk is a no-show risk at 13:15</b><small>2 missed this year. Offer the slot to Grace Lee (waitlist, wants Tom, afternoons)?</small></div><span class="btn">Text Mo</span><span class="btn p" style="background:#B7791F;border-color:#B7791F;box-shadow:none">Offer slot</span></div>
</section>
<section class="card chart">
<div class="pt"><div class="pav">NP</div><div style="flex:1"><h1>Noah Patel</h1><p>34 · ACL reconstruction (R), 6 weeks post-op · referred by Mr A. Iqbal, LTHT</p></div>
<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px"><span class="tag" style="background:#E1ECFF;color:#2F6FD6">${ic(I.shield, 13)} Bupa · auth BU-4471-RK · session 5 of 8</span><span class="tag" style="background:#DDF3EE;color:#0F7A6C">${ic(I.check, 13)} Arrived 08:56 · consent on file</span></div></div>
<div class="tabs"><span class="on">Treatment note</span><span>History · 5</span><span>Exercises</span><span>Outcome measures</span><span>Files · 3</span><span>Billing</span></div>
<div class="cb">
<div style="display:flex;flex-direction:column;min-height:0">
<div class="scribe"><span class="rec"></span><b style="font-size:12.5px;white-space:nowrap">AI scribe</b><div class="wave">${wave}</div><span style="margin-left:auto;font:500 11px 'IBM Plex Mono',monospace;color:#9CD9CF">12:41</span></div>
<div class="soap">
<div class="so"><span class="l">S</span><div><h4>Subjective</h4><p>Knee "feels more stable". Pain 3/10 on stairs, down from 4. Managing work from home; walked 25 min yesterday without swelling. Exercises done most days.</p></div></div>
<div class="so"><span class="l">O</span><div><h4>Objective</h4><p>R knee flexion <b>112°</b> (prev 98°), extension −2°. Quad lag resolved. Mild effusion (stroke test 1+). Single-leg stance 22 s (L 30 s).</p></div></div>
<div class="so"><span class="l">A</span><div><h4>Assessment</h4><p><span class="ai">Progressing as expected for week 6. ROM ahead of protocol; quad strength and proprioception limiting.</span></p></div></div>
<div class="so"><span class="l">P</span><div><h4>Plan</h4><p><span class="ai">Progress to mini squats to 45° and step-ups 10 cm. Static bike daily. Review in 1 week; begin return-to-run screening at week 12.</span><span class="cursor"></span></p></div></div>
</div></div>
<div class="side">
<div class="box" style="display:flex;gap:6px;align-items:flex-start;padding:10px 6px 4px 10px"><div style="flex:1"><h5 style="display:block">Body chart</h5><div style="font-size:11.5px;line-height:1.5;color:#55656E;margin-top:4px"><span style="color:#E2574C;font-weight:700">●</span> R knee, medial<br>pain 3/10 · stairs<br><br><span style="color:#F0A23B;font-weight:700">●</span> R anterior thigh<br>tightness</div></div>${body.replace('width="170" height="300"', 'width="120" height="212"')}</div>
<div class="box"><h5><span>NPRS · pain</span><span style="color:#0F7A6C">7 → 3</span></h5>${trend.replace(`width="${W}"`, 'width="100%"')}<div style="display:flex;justify-content:space-between;font-size:11px;color:#6F7E86;margin-top:2px"><span>PSFS <b style="color:#17232B">4.2 → 7.1</b></span><span>6 sessions</span></div></div>
<div class="box"><h5><span>Home exercises</span><span style="color:#0F7A6C">79% adherence</span></h5><div class="hep">${hep.map(([n, s, a]) => `<div>${n}<small>${s}</small></div><div><div class="bar"><i style="width:${a}%"></i></div><small style="text-align:right">${a}%</small></div>`).join("")}</div></div>
</div></div>
<div class="foot"><span class="tag" style="background:#F2F5F6;color:#55656E">${ic(I.clock, 13)} Next: Thu 8 Oct, 09:00 · booked</span><span style="margin-left:auto;font-size:12.5px;color:#55656E">Bills Bupa <b style="color:#17232B">£52.00</b></span><span class="btn">Save draft</span><span class="btn p">Sign note</span></div>
</section>
</div></div></div></body></html>`;
})();
