// Practice OS · Ledgerline Partners: researched preview (Karbon / TaxDome patterns).
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const ST = {
    wait: { c: "#A86A12", bg: "#FBF0DC", n: "Waiting on client" },
    prep: { c: "#2B59C3", bg: "#E5ECFB", n: "Preparation" },
    rev: { c: "#6B4FBB", bg: "#EEE9FA", n: "Partner review" },
    sign: { c: "#0E7C86", bg: "#DFF2F3", n: "8879 out" },
    filed: { c: "#1F7A4A", bg: "#E0F1E7", n: "Filed" }
  };
  const P = {
    PG: ["Paula Grant", "#1B2A41"], ML: ["Marcus Lee", "#2B59C3"], SR: ["Sofia Ruiz", "#B24A6A"], DS: ["Dev Shah", "#0E7C86"]
  };
  const av = (k, s) => `<span class="av" style="background:${P[k][1]};width:${s || 22}px;height:${s || 22}px;font-size:${s && s > 24 ? 11 : 9}px">${k}</span>`;

  // Board: 4 + 5 + 3 + 2 + 9 = 23 jobs in the 1040-extension pipeline
  const board = [
    ["wait", 4, [
      { n: "Chen Family", d: "4 of 6 docs · K-1 missing", a: "ML", due: "Oct 15", sel: 1, prog: 67 },
      { n: "Rivera, Dana", d: "1 of 5 docs · reminder 3 sent", a: "SR", due: "Oct 15", prog: 20 },
      { n: "Okafor, James", d: "Organizer sent Oct 1", a: "DS", due: "Oct 15", prog: 0 }
    ], 1],
    ["prep", 5, [
      { n: "Patel, Arun & Meera", d: "Sch. C + rental", a: "ML", due: "Oct 15" },
      { n: "Hollis, Greg", d: "HSA, 1099-B", a: "SR", due: "Oct 15" },
      { n: "Nguyen Household", d: "Multi-state IL / WI", a: "DS", due: "Oct 15" }
    ], 2],
    ["rev", 3, [
      { n: "Brooks, Tasha", d: "Ready for review · 2 notes", a: "PG", due: "Oct 15" },
      { n: "Lindqvist Family", d: "Review notes sent back", a: "PG", due: "Oct 15", warn: "Returned" },
      { n: "Morales, Ana", d: "Ready for review", a: "PG", due: "Oct 15" }
    ], 0],
    ["sign", 2, [
      { n: "Kim, Daniel", d: "Sent Oct 3 · viewed today", a: "ML", due: "Oct 15", tag: "Viewed" },
      { n: "Ferreira, Luis", d: "Sent Oct 4 · 1 of 2 signed", a: "SR", due: "Oct 15", tag: "1 of 2" }
    ], 0],
    ["filed", 9, [
      { n: "Wu, Amy", d: "IRS accepted Oct 2", a: "DS", due: "Done", ok: 1 },
      { n: "Gupta, Ravi", d: "IRS accepted Oct 1", a: "ML", due: "Done", ok: 1 },
      { n: "Bennett, Clare", d: "IL accepted Sep 30", a: "SR", due: "Done", ok: 1 }
    ], 6]
  ];
  const card = (k, j) => `<div class="jc${j.sel ? " sel" : ""}">
    <div class="jt"><b>${j.n}</b>${av(j.a)}</div>
    <div class="jd">${j.d}</div>
    ${j.prog !== undefined ? `<div class="mb"><i style="width:${j.prog}%;background:${ST[k].c}"></i></div>` : ""}
    <div class="jf"><span class="mono">${j.ok ? "✓ " : ""}${j.due === "Done" ? "Filed" : "Due " + j.due}</span>${j.warn ? `<em class="tg red">${j.warn}</em>` : j.tag ? `<em class="tg" style="background:${ST[k].bg};color:${ST[k].c}">${j.tag}</em>` : ""}</div>
  </div>`;
  const boardHtml = board.map(([k, count, jobs, more]) => `<div class="col">
    <div class="ch"><span class="dot" style="background:${ST[k].c}"></span><b>${ST[k].n}</b><span class="cnt">${count}</span></div>
    ${jobs.map(j => card(k, j)).join("")}
    ${more ? `<div class="more">+ ${more} more</div>` : ""}
  </div>`).join("");

  const deadlines = [
    ["Thu", "15", "Oct", "Form 1040 + IL-1040, extended", "23 jobs · 9 filed", 39, "#A86A12"],
    ["Thu", "15", "Oct", "Form 1120, calendar-year C corps, extended", "4 jobs · 1 filed", 25, "#A86A12"],
    ["Mon", "2", "Nov", "Form 941 Q3 · Oct 31 falls on a Saturday", "11 clients · 3 filed", 27, "#2B59C3"],
    ["Fri", "15", "Jan", "Q4 estimated payments (1040-ES)", "31 clients · reminders queued", 0, "#5E6676"]
  ];
  const team = [["PG", "Partner", 34, 36], ["ML", "Senior", 46, 40], ["SR", "Staff", 29, 40], ["DS", "Staff", 24, 40]];

  const docs = [
    [1, "W-2", "Northwestern Medicine", "Received Sep 18"],
    [1, "1099-INT", "Chase Bank", "Received Sep 18"],
    [1, "1099-B", "Charles Schwab", "Received Sep 22"],
    [1, "1098", "Mortgage interest · Rocket", "Received Sep 22"],
    [0, "Schedule K-1", "Lakeview Partners LLC", "Partnership filing late"],
    [0, "Childcare provider", "Name, address and EIN", "Needed for Form 2441"]
  ];
  const checklist = [
    ["done", "Engagement letter e-signed · Sep 2", "", ""],
    ["done", "Organizer submitted in portal · Sep 16", "", ""],
    ["now", "Prepare return", "W-2, 1099s and 1098 entered · blocked on K-1", "ML"],
    ["todo", "Partner review", "", "PG"],
    ["todo", "8879 e-signature, both spouses · auto-moves to E-file", "", ""],
    ["todo", "E-file federal + IL-1040, confirm acceptance", "", "ML"]
  ];

  window.LANDINGS.accounting = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Public Sans',system-ui,sans-serif;color:#18202F;background:#F3F4F1}
.mono{font-family:'IBM Plex Mono',monospace}
.av{border-radius:50%;display:inline-grid;place-items:center;color:#fff;font-weight:700;flex:none;letter-spacing:.02em}
.top{height:56px;background:#fff;border-bottom:1px solid #E3E5E8;display:flex;align-items:center;gap:22px;padding:0 20px}
.brand{display:flex;align-items:center;gap:10px}.brand i{width:30px;height:30px;border-radius:8px;background:#1B2A41;display:grid;place-items:center;color:#fff;font:700 15px 'Public Sans';font-style:normal;position:relative}
.brand i:after{content:"";position:absolute;left:8px;right:8px;bottom:8px;height:2px;background:#5FD3AE;border-radius:2px}
.brand b{display:block;font-size:14px;line-height:1.1}.brand span{font:500 9.5px 'IBM Plex Mono';letter-spacing:.14em;color:#6B7280}
.tabs{display:flex;gap:4px}.tabs a{padding:7px 12px;border-radius:8px;color:#4B5363;font-weight:500;text-decoration:none;display:flex;gap:6px;align-items:center}
.tabs a.on{background:#EEF1F5;color:#18202F;font-weight:700}.tabs em{font-style:normal;font:600 10.5px 'IBM Plex Mono';background:#D93F2B;color:#fff;border-radius:9px;padding:0 6px;line-height:17px}
.search{margin-left:auto;width:270px;border:1px solid #E3E5E8;background:#F7F8F9;border-radius:9px;padding:8px 12px;color:#8A919E}
.ask{display:flex;gap:6px;align-items:center;border:1px solid #CFE9DF;background:#EAF6F1;color:#12715B;border-radius:9px;padding:7px 12px;font-weight:700}
.wrap{display:grid;grid-template-columns:880px 500px;gap:20px;padding:18px 20px;height:844px}
.lc{display:flex;flex-direction:column;gap:14px;min-height:0}
.hdr{display:flex;align-items:center;gap:12px}
.hdr h1{margin:0;font-size:22px;letter-spacing:-.02em}.hdr p{margin:2px 0 0;color:#5E6676;font-size:12.5px}
.seg{display:flex;background:#E7E9EC;border-radius:9px;padding:3px;margin-left:auto}.seg span{padding:5px 11px;border-radius:7px;font-weight:600;color:#5E6676;font-size:12px}.seg span.on{background:#fff;color:#18202F;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.fchip{border:1px solid #DADDE2;background:#fff;border-radius:9px;padding:6px 11px;font-weight:600;font-size:12px;color:#3B4352}
.btn{background:#12715B;color:#fff;border-radius:9px;padding:8px 13px;font-weight:700;font-size:12.5px;white-space:nowrap}
.btn.ghost{background:#fff;color:#18202F;border:1px solid #DADDE2}
.card{background:#fff;border:1px solid #E3E5E8;border-radius:14px}
.board{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding:12px;height:432px}
.col{background:#F6F7F8;border-radius:11px;padding:9px;display:flex;flex-direction:column;gap:8px;min-width:0}
.ch{display:flex;align-items:center;gap:7px;padding:2px 3px 4px;font-size:11.5px}.ch b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dot{width:8px;height:8px;border-radius:50%;flex:none}
.cnt{margin-left:auto;font:600 11px 'IBM Plex Mono';color:#5E6676;background:#fff;border-radius:9px;padding:0 7px;line-height:18px}
.jc{background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:9px 10px;display:flex;flex-direction:column;gap:5px;box-shadow:0 1px 1px rgba(16,24,40,.03)}
.jc.sel{border:1.5px solid #12715B;box-shadow:0 0 0 3px #E2F2EC}
.jt{display:flex;justify-content:space-between;align-items:center;gap:6px}.jt b{font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jd{color:#5E6676;font-size:11.5px;line-height:1.3}
.jf{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:#5E6676}
.tg{font-style:normal;font-size:10px;font-weight:700;border-radius:6px;padding:1px 6px}.tg.red{background:#FDE7E3;color:#C23A26}
.mb{height:4px;border-radius:3px;background:#EEF0F2;overflow:hidden}.mb i{display:block;height:100%;border-radius:3px}
.more{color:#6B7280;font-size:11.5px;font-weight:600;padding:2px 4px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;min-height:0}
.sec{padding:13px 16px}.sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.sh b{font-size:14px}.sh span{font-size:11.5px;color:#6B7280}
.dl{display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:center;padding:6px 0;border-top:1px solid #F0F1F3}
.date{border:1px solid #E3E5E8;border-radius:9px;text-align:center;overflow:hidden}.date small{display:block;font:600 8.5px 'IBM Plex Mono';background:#F4F5F7;color:#6B7280;padding:1px 0;letter-spacing:.06em}.date b{display:block;font-size:16px;line-height:1.35}
.dl strong{display:block;font-size:12.5px}.dl span{font-size:11.5px;color:#5E6676}
.tm{display:grid;grid-template-columns:140px 1fr 60px;gap:10px;align-items:center;padding:4px 0}
.tm .who{display:flex;gap:8px;align-items:center}.tm .who b{display:block;font-size:12.5px}.tm .who small{color:#6B7280;font-size:11px}
.cap{height:8px;border-radius:5px;background:#EEF0F2;position:relative}.cap i{position:absolute;left:0;top:0;bottom:0;border-radius:5px}
.cap:after{content:"";position:absolute;left:100%;top:-3px;bottom:-3px;width:0}
.tm .h{text-align:right;font:600 11.5px 'IBM Plex Mono'}
.sug{margin-top:8px;display:flex;align-items:center;gap:10px;background:#FFF7E6;border:1px solid #F3DFB4;border-radius:10px;padding:8px 10px;font-size:12px;color:#5A4210}
.sug .btn{padding:5px 10px;font-size:11.5px;margin-left:auto}
.rc{display:flex;flex-direction:column;min-height:0;overflow:hidden}
.wh{padding:13px 18px 10px;border-bottom:1px solid #EEF0F2}
.wh .t{display:flex;gap:12px;align-items:center}.wh h2{margin:0;font-size:18px;letter-spacing:-.01em}.wh p{margin:1px 0 0;color:#5E6676;font-size:12.5px}
.due{margin-left:auto;text-align:right;white-space:nowrap}.due b{display:block;font-size:13px;color:#A86A12}.due small{color:#6B7280;font-size:11px}
.chips{display:flex;gap:6px;flex-wrap:nowrap;margin-top:7px}.chip{white-space:nowrap;font-size:11px;font-weight:600;border-radius:7px;padding:3px 8px;background:#F1F3F5;color:#3B4352;display:inline-flex;gap:5px;align-items:center}
.stg{display:flex;gap:4px;margin-top:8px}.stg span{flex:1;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;background:#F1F3F5;color:#8A919E;white-space:nowrap}
.stg span.cur{background:#FBF0DC;color:#A86A12;box-shadow:inset 0 0 0 1.5px #E6B864}
.body{padding:10px 18px;display:flex;flex-direction:column;gap:8px;flex:1;min-height:0}
.req{flex:none;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden}
.rh{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#FAFAFB;border-bottom:1px solid #EEF0F2}.rh b{font-size:13px}
.rh .pg{margin-left:auto;display:flex;align-items:center;gap:8px;font:600 11.5px 'IBM Plex Mono'}.rh .pg i{display:block;width:90px;height:6px;border-radius:4px;background:#EEF0F2;overflow:hidden}.rh .pg i u{display:block;height:100%;background:#12715B;text-decoration:none}
.doc{display:grid;grid-template-columns:20px 24px 1fr auto;gap:9px;align-items:center;padding:3px 12px;border-top:1px solid #F3F4F6}
.doc:first-of-type{border-top:0}
.ck{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:800}
.ck.y{background:#E0F1E7;color:#1F7A4A}.ck.n{border:1.5px dashed #D79A3A;color:#D79A3A}
.pdf{width:20px;height:25px;border-radius:3px;background:#fff;border:1px solid #DADDE2;position:relative}.pdf:before{content:"";position:absolute;right:-1px;top:-1px;width:7px;height:7px;background:linear-gradient(225deg,#F3F4F1 50%,#DADDE2 50%)}.pdf:after{content:"";position:absolute;left:4px;right:4px;top:10px;height:9px;background:repeating-linear-gradient(#D5D9DF 0 1.5px,transparent 1.5px 4px)}
.pdf.m{border-style:dashed;background:#FFFBF2}.pdf.m:after{display:none}
.doc b{display:block;font-size:12.5px}.doc small{color:#6B7280;font-size:11px}
.doc .st{font-size:11px;color:#5E6676;text-align:right}.doc .st.o{color:#A86A12;font-weight:600}
.rem{display:flex;align-items:center;gap:9px;padding:6px 12px;background:#F6FAF8;border-top:1px solid #E2EFE9;font-size:11.5px;color:#2F4B42}
.tog{width:28px;height:16px;border-radius:9px;background:#12715B;position:relative;flex:none}.tog:after{content:"";position:absolute;right:2px;top:2px;width:12px;height:12px;border-radius:50%;background:#fff}
.rem b{color:#12715B}
.cl{display:flex;flex-direction:column}
.cli{display:grid;grid-template-columns:18px 1fr auto;gap:9px;align-items:center;padding:3px 0}
.cli b{font-size:12.5px;font-weight:600}.cli small{display:block;color:#6B7280;font-size:11px}
.ci{width:16px;height:16px;border-radius:5px;display:grid;place-items:center;font-size:9px;font-weight:800}
.ci.done{background:#12715B;color:#fff}.ci.now{border:2px solid #2B59C3;background:#E5ECFB}.ci.todo{border:1.5px solid #CBD0D7}
.cli.done b{color:#6B7280;text-decoration:line-through;text-decoration-color:#B8BEC7}
.split{display:grid;grid-template-columns:1fr 196px;gap:12px}
.tl{display:flex;flex-direction:column;gap:6px}.tle{display:grid;grid-template-columns:8px 1fr;gap:9px}.tle i{width:8px;height:8px;border-radius:50%;margin-top:5px}
.tle b{font-size:12px}.tle p{margin:1px 0 0;font-size:11.5px;color:#5E6676;line-height:1.35}.tle small{font:500 10.5px 'IBM Plex Mono';color:#8A919E}
.mail{background:#F7F8FA;border:1px solid #E5E7EB;border-radius:9px;padding:7px 9px;margin-top:4px;font-size:11.5px;color:#3B4352}
.portal{border-radius:12px;background:#1B2A41;color:#E8EDF6;padding:10px;display:flex;flex-direction:column;gap:6px}
.portal .lb{font:600 9.5px 'IBM Plex Mono';letter-spacing:.1em;color:#8FA3C4}
.portal h4{margin:0;font-size:13px;line-height:1.3}
.pi{background:rgba(255,255,255,.08);border-radius:8px;padding:5px 8px;font-size:11.5px;display:flex;gap:7px;align-items:center}
.pi i{width:14px;height:14px;border-radius:4px;border:1.5px dashed #F2C46B;flex:none}
.pbtn{background:#5FD3AE;color:#0E2A22;border-radius:8px;text-align:center;font-weight:800;font-size:12px;padding:6px}
.lbl{font:600 10px 'IBM Plex Mono';letter-spacing:.1em;color:#8A919E;margin-bottom:4px}
</style></head><body>
<div class="top">
  <div class="brand"><i>L</i><div><b>Ledgerline Partners</b><span>PRACTICE OS</span></div></div>
  <nav class="tabs"><a>Triage <em>14</em></a><a class="on">Work</a><a>Clients</a><a>Calendar</a><a>Time &amp; billing</a><a>Reports</a></nav>
  <div class="search">Search clients, work, emails…</div>
  <div class="ask">✦ Ask Practice OS</div>
  ${av("PG", 30)}
</div>
<div class="wrap">
  <div class="lc">
    <div class="hdr">
      <div><h1>1040 extensions</h1><p>2025 individual returns · pipeline · 23 jobs · 9 filed · due Thu 15 Oct</p></div>
      <div class="seg"><span class="on">Board</span><span>List</span><span>Calendar</span></div>
      <span class="fchip">Assignee: All</span><span class="fchip">Tax year 2025</span><span class="btn">+ Work</span>
    </div>
    <div class="card board">${boardHtml}</div>
    <div class="row2">
      <div class="card sec"><div class="sh"><b>Deadlines</b><span>firm calendar</span></div>
        ${deadlines.map(([w, d, m, t, s, p, c]) => `<div class="dl"><div class="date"><small>${m.toUpperCase()}</small><b>${d}</b></div><div><strong>${w} · ${t}</strong><span>${s}</span>${p ? `<div class="mb" style="margin-top:5px"><i style="width:${p}%;background:${c}"></i></div>` : ""}</div></div>`).join("")}
      </div>
      <div class="card sec"><div class="sh"><b>Team capacity</b><span>this week · planned hours</span></div>
        ${team.map(([k, r, h, cap]) => { const pc = Math.round(h / cap * 100); const over = pc > 100; return `<div class="tm"><div class="who">${av(k, 26)}<div><b>${P[k][0]}</b><small>${r}</small></div></div><div class="cap"><i style="width:${Math.min(pc, 100)}%;background:${over ? "#D93F2B" : pc > 85 ? "#D79A3A" : "#12715B"}"></i></div><div class="h" style="color:${over ? "#C23A26" : "#3B4352"}">${h}/${cap}h</div></div>`; }).join("")}
        <div class="sug">Marcus is 6h over. Move Nguyen prep to Dev?<span class="btn">Reassign</span></div>
      </div>
    </div>
  </div>

  <div class="card rc">
    <div class="wh">
      <div class="t"><span class="av" style="background:#B24A6A;width:38px;height:38px;font-size:13px">CF</span>
        <div><h2>Chen Family · 2025 Form 1040</h2><p>Wei &amp; Lin Chen · MFJ · extension filed Apr 14</p></div>
        <div class="due"><b>Due Thu 15 Oct</b><small>10 days left</small></div></div>
      <div class="chips"><span class="chip">${av("ML", 16)} Preparer · Marcus</span><span class="chip">${av("PG", 16)} Reviewer · Paula</span><span class="chip">Fixed fee $1,450</span><span class="chip mono">3.2 h logged</span></div>
      <div class="stg"><span class="cur">Waiting on client</span><span>Preparation</span><span>Review</span><span>8879</span><span>Filed</span></div>
    </div>
    <div class="body">
      <div class="req">
        <div class="rh"><b>Client request · 2025 tax documents</b><div class="pg">4 of 6 <i><u style="width:67%"></u></i></div></div>
        ${docs.map(([ok, t, s, st]) => `<div class="doc"><span class="ck ${ok ? "y" : "n"}">${ok ? "✓" : ""}</span><span class="pdf${ok ? "" : " m"}"></span><div><b>${t}</b><small>${s}</small></div><div class="st${ok ? "" : " o"}">${st}</div></div>`).join("")}
        <div class="rem"><span class="tog"></span><span>Auto-reminders every 3 days · <b>2 of 5 sent</b> · next Thu 8 Oct, 9:00 AM</span></div>
      </div>
      <div>
        <div class="lbl">CHECKLIST · 2 OF 6</div>
        <div class="cl">${checklist.map(([s, t, d, who]) => `<div class="cli ${s}"><span class="ci ${s}">${s === "done" ? "✓" : ""}</span><div><b>${t}</b>${d ? `<small>${d}</small>` : ""}</div>${who ? av(who, 20) : "<span></span>"}</div>`).join("")}</div>
      </div>
      <div class="split">
        <div><div class="lbl">TIMELINE</div><div class="tl">
          <div class="tle"><i style="background:#2B59C3"></i><div><b>Email from Wei Chen → saved as note</b> <small>Today 9:14</small><div class="mail">“K-1 coming Fri 9 Oct, per Lakeview.”</div></div></div>
          <div class="tle"><i style="background:#A86A12"></i><div><b>Reminder 2 opened</b> <small>Sat 3 Oct</small></div></div>
        </div></div>
        <div class="portal"><div class="lb">WHAT WEI SEES · PORTAL</div><h4>2 items left to file</h4>
          <div class="pi"><i></i>Upload Schedule K-1</div><div class="pi"><i></i>Childcare provider EIN</div><div class="pbtn">Upload documents</div></div>
      </div>
    </div>
  </div>
</div>
</body></html>`;
})();
