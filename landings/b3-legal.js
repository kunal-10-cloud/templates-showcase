// Counsel OS · Mercer & Lowe LLP — matter view modelled on Clio Manage (court rules, UTBMS time, IOLTA trust).
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    gavel: '<path d="M14 4l6 6M11 7l6 6M9 15l-6 6M8 8l8 8M5 12l7-7"/>', doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bank: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>', check: '<path d="M5 12l5 5 9-10"/>', alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7"/>', pause: '<rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="13.5" y="5" width="3.5" height="14" rx="1"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
  };

  const deadlines = [
    ["MON", "5", "Oct", "Trigger · motion to compel served", "Tate Logistics · by email · Rule 9A", "trig"],
    ["WED", "7", "Oct", "Deposition of Mark Tate", "10:00 · Veritext, 1 Beacon St · RM, KP", "evt"],
    ["MON", "19", "Oct", "Opposition due · Rule 9A(a)(2)", "10 days + 3 for email service, rolled to Monday", "due"],
    ["THU", "29", "Oct", "9A package to be filed by Tate", "10 days after our opposition is served", "nx"],
    ["FRI", "30", "Oct", "Fact discovery closes", "Tracking order · Track A", "evt"]
  ];

  const entries = [
    ["RM", "#7A1F2B", "Draft opposition, motion to compel", "L250", "1.2", "$450", "$540.00", 1],
    ["DL", "#2F4A6B", "Review Tate production set 2", "L230", "0.4", "$395", "$158.00", 1],
    ["KP", "#8A6A2F", "Exhibits A–F, Bates labels", "L320", "0.8", "$175", "$140.00", 1],
    ["RM", "#7A1F2B", "Email client re: depo prep", "L120", "0.1", "$450", "$45.00", 1],
    ["RM", "#7A1F2B", "Status call with G. Hollis", "A106", "0.3", "—", "No charge", 0]
  ];

  const trust = [
    ["12 Aug", "Retainer deposit · wire from Hughes Holdings", "+$25,000.00", "$25,000.00", "in"],
    ["31 Aug", "Transfer to operating · Invoice #1042 paid", "−$6,500.00", "$18,500.00", "out"]
  ];

  window.LANDINGS.legal = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Public+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;display:flex;flex-direction:column;font:13px/1.45 'Public Sans',system-ui,sans-serif;color:#1C1A17;background:#F4F1EA}
.mono{font-family:'JetBrains Mono',monospace}.serif{font-family:'Newsreader',Georgia,serif}
.top{height:54px;flex:none;background:#17161A;color:#D9D3C7;display:flex;align-items:center;gap:22px;padding:0 20px}
.mk{display:flex;align-items:center;gap:10px}.mk i{width:34px;height:34px;border-radius:8px;background:#7A1F2B;color:#F4E9D8;display:grid;place-items:center;font:600 12px 'Newsreader',serif;font-style:normal;letter-spacing:.02em}
.mk b{display:block;color:#F7F2E8;font-size:13.5px}.mk span{font:600 9.5px 'JetBrains Mono',monospace;letter-spacing:.16em;color:#A8854A}
.tabs{display:flex;gap:2px}.tabs span{padding:7px 11px;border-radius:7px;font-weight:500;font-size:13px;color:#B9B2A4}.tabs span.on{background:#2A282E;color:#fff}
.tabs em{font-style:normal;background:#B4362A;color:#fff;font-size:10.5px;font-weight:700;border-radius:8px;padding:0 6px;margin-left:5px}
.timer{margin-left:auto;display:flex;align-items:center;gap:10px;background:#2A1C1F;border:1px solid #5A2A31;border-radius:9px;padding:6px 8px 6px 12px;color:#F2D9DC;font-size:12.5px}
.timer .dot{width:8px;height:8px;border-radius:50%;background:#E5484D;box-shadow:0 0 0 4px rgba(229,72,77,.18);animation:pl 1.4s infinite}@keyframes pl{50%{opacity:.35}}
.timer b{font:600 14px 'JetBrains Mono',monospace;color:#fff}.timer .pz{width:26px;height:26px;border-radius:6px;background:#7A1F2B;display:grid;place-items:center;color:#fff}
.ask{display:flex;align-items:center;gap:7px;border:1px solid #3A3840;border-radius:8px;padding:7px 11px;color:#EDE6D8;font-weight:600}.ask svg{color:#C9A35E}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.mh{flex:none;background:#FBF9F4;border-bottom:1px solid #E3DDD0;padding:12px 22px 0}
.crumb{font-size:12px;color:#857E70}.crumb b{color:#5B5447;font-weight:600}
.mrow{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-top:4px}
.mt h1{margin:0;font:500 28px/1.15 'Newsreader',serif;letter-spacing:-.01em}.mt h1 i{color:#7A1F2B}
.meta{display:flex;gap:16px;margin-top:6px;color:#5B5447;font-size:12.5px;white-space:nowrap}.meta b{color:#1C1A17;font-weight:600}
.fin{display:grid;grid-template-columns:repeat(4,128px);gap:8px}
.fin > div{background:#fff;border:1px solid #E3DDD0;border-radius:10px;padding:8px 11px}.fin p{margin:0;font-size:11px;color:#857E70}.fin b{font:600 16px 'JetBrains Mono',monospace;letter-spacing:-.02em}
.fin .tr{background:#F3F6F1;border-color:#CFDCCB}.fin .tr b{color:#2F5D3A}
.bar{height:4px;border-radius:3px;background:#ECE6DA;margin-top:5px;overflow:hidden}.bar i{display:block;height:100%;background:#A8854A}
.stage{display:flex;align-items:center;gap:0;margin-top:11px}
.st{display:flex;align-items:center;gap:7px;font-size:12px;color:#857E70;font-weight:500}.st i{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-style:normal;background:#E7E1D4;color:#857E70}
.st.done i{background:#2F5D3A;color:#fff}.st.done{color:#3E3A33}.st.cur i{background:#7A1F2B;color:#fff;box-shadow:0 0 0 4px rgba(122,31,43,.14)}.st.cur{color:#7A1F2B;font-weight:700}
.ln{width:38px;height:2px;background:#D9D2C3;margin:0 9px}.ln.done{background:#2F5D3A}
.mtabs{display:flex;gap:4px;margin-top:8px}.mtabs span{padding:8px 12px;font-size:13px;font-weight:600;color:#857E70;border-bottom:2px solid transparent}.mtabs span.on{color:#1C1A17;border-color:#7A1F2B}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:352px minmax(0,1fr) 402px;gap:16px;padding:14px 22px 16px}
.card{background:#fff;border:1px solid #E3DDD0;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.ch{display:flex;justify-content:space-between;align-items:center;padding:11px 14px;border-bottom:1px solid #EFEAE0}.ch h3{margin:0;font:600 15px 'Newsreader',serif;letter-spacing:.005em;display:flex;align-items:center;gap:8px}
.ch h3 svg{color:#7A1F2B}.ch span{font-size:11.5px;color:#857E70}
.pill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11px;font-weight:600;white-space:nowrap}
.dl{display:grid;grid-template-columns:46px 1fr;gap:11px;padding:6px 14px;border-bottom:1px solid #F3EFE7;align-items:center}
.dt{border-radius:9px;text-align:center;padding:3px 0;border:1px solid #E3DDD0;background:#FBF9F4}.dt small{display:block;font:600 9px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#857E70}.dt b{display:block;font:600 18px/1 'Newsreader',serif}
.dl.due .dt{background:#7A1F2B;border-color:#7A1F2B}.dl.due .dt small,.dl.due .dt b{color:#F7EAD9}
.dl.trig .dt{background:#F1ECE2}
.dl p{margin:0;font-weight:600;font-size:12.8px}.dl small{color:#857E70;font-size:11.5px}
.rule{margin:8px 14px;border-radius:10px;background:#FBF6EC;border:1px dashed #D8C49A;padding:9px 11px;font-size:11.5px;color:#5B4A2A;line-height:1.5}
.rule b{color:#3E3017}
.cc{margin:0 14px 10px;border-radius:12px;border:1px solid #F0C9C4;background:#FDF5F3;padding:11px 12px}
.cc .h{display:flex;justify-content:space-between;align-items:center}.cc h4{margin:0;font-size:12.5px;display:flex;gap:6px;align-items:center;color:#8E2A21}
.cc p{margin:6px 0 0;font-size:11.8px;color:#5B4A47;line-height:1.45}.cc .q{font:500 11px 'JetBrains Mono',monospace;color:#857E70;margin-top:6px}
.cc .act{display:flex;gap:7px;margin-top:9px}.btn{border:1px solid #D8D1C2;background:#fff;border-radius:8px;padding:6px 11px;font-size:12px;font-weight:600;white-space:nowrap}.btn.p{background:#7A1F2B;border-color:#7A1F2B;color:#fff}.btn.d{background:#1C1A17;border-color:#1C1A17;color:#fff}
.docs{display:flex;gap:6px;padding:10px 14px;border-bottom:1px solid #EFEAE0;flex-wrap:wrap}
.dc{display:flex;align-items:center;gap:6px;border:1px solid #E3DDD0;border-radius:8px;padding:4px 9px;font-size:11.5px;color:#3E3A33;background:#FBF9F4}.dc svg{color:#A8854A}.dc.on{border-color:#7A1F2B;background:#F8EEEE;color:#7A1F2B;font-weight:600}
.stagebox{position:relative;flex:1;min-height:0;background:#EDE8DE;padding:16px 18px;overflow:hidden}
.paper{position:relative;width:392px;margin:0;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06),0 14px 34px rgba(60,40,20,.12);padding:22px 26px 26px;font:400 10.9px/1.6 'Newsreader',serif;color:#22201C;height:100%;overflow:hidden}
.paper .cap{text-align:center;font-weight:600;letter-spacing:.04em;font-size:10.6px;line-height:1.5}
.paper .cgrid{display:grid;grid-template-columns:1fr 1fr;margin-top:10px;font-size:10.6px;line-height:1.5}
.paper .cgrid div:first-child{border-right:1px solid #22201C;padding-right:10px}.paper .cgrid div:last-child{padding-left:12px;align-self:center;font-weight:600}
.paper h5{margin:14px 0 8px;text-align:center;font:600 11.6px/1.4 'Newsreader',serif;letter-spacing:.03em;text-decoration:underline}
.paper p{margin:0 0 8px;text-indent:28px;text-align:justify}
.mf{background:#FBEFD5;border-bottom:1.5px solid #D8A94A;padding:0 2px;border-radius:2px}
.caret{display:inline-block;width:1.5px;height:13px;background:#7A1F2B;vertical-align:-2px;animation:pl 1s steps(1) infinite}
.cmt{position:absolute;right:14px;top:70px;width:170px;background:#fff;border-radius:11px;box-shadow:0 12px 30px rgba(40,25,10,.18);border:1px solid #E3DDD0;padding:10px 11px;font-size:11.5px;z-index:2}
.cmt .w{display:flex;align-items:center;gap:7px;font-weight:600}.cmt .w .av{width:22px;height:22px;font-size:9px}.cmt p{margin:6px 0 0;color:#4A443A;line-height:1.45}.cmt small{color:#857E70}
.chk{position:absolute;right:14px;top:206px;width:170px;background:#fff;border-radius:11px;border:1px solid #E3DDD0;padding:10px 11px;font-size:11.3px;z-index:2;box-shadow:0 8px 22px rgba(40,25,10,.10)}
.chk .ct{font:600 12.5px 'Newsreader',serif;margin-bottom:6px}.ci{display:flex;gap:6px;align-items:center;padding:4px 0;border-top:1px solid #F3EFE7;color:#4A443A}.ci:before{content:"";width:11px;height:11px;border:1.5px solid #C9C0AE;border-radius:3px;flex:none}.ci.ok:before{display:none}.ci.ok{color:#2F5D3A}.ci svg{flex:none}
.tpl{position:absolute;left:16px;bottom:16px;background:#1C1A17;color:#EDE6D8;border-radius:10px;padding:8px 11px;font-size:11.5px;display:flex;gap:8px;align-items:center;z-index:2}.tpl b{color:#fff}.tpl svg{color:#C9A35E}
.run{margin:10px 14px 6px;border-radius:12px;background:#17161A;color:#E8E1D3;padding:11px 13px;display:grid;grid-template-columns:1fr auto;gap:2px 10px;align-items:center}
.run p{margin:0;font-weight:600;font-size:12.8px;color:#fff}.run small{color:#A9A193;font-size:11px}.run b{grid-row:span 2;font:600 22px 'JetBrains Mono',monospace;color:#fff;letter-spacing:-.02em}
.te{display:grid;grid-template-columns:24px 1fr 34px 74px;gap:8px;align-items:center;padding:5px 14px;border-bottom:1px solid #F3EFE7;font-size:12px}
.te .av{width:24px;height:24px;font-size:9.5px}.te p{margin:0;font-weight:500;line-height:1.3}.te small{font:500 10.5px 'JetBrains Mono',monospace;color:#857E70}
.te .h{font:600 12px 'JetBrains Mono',monospace;text-align:right}.te .a{font:600 12px 'JetBrains Mono',monospace;text-align:right}.te.nc .a{font:500 11px 'Public Sans',sans-serif;color:#857E70}
.tot{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;background:#FBF9F4;border-bottom:1px solid #EFEAE0}.tot span{font-size:12px;color:#5B5447}.tot b{font:600 13px 'JetBrains Mono',monospace}
.tl{padding:8px 14px 4px}.bal{display:flex;justify-content:space-between;align-items:flex-end}.bal b{font:500 26px/1 'Newsreader',serif;color:#2F5D3A}.bal small{color:#857E70;font-size:11px}
.tx{display:grid;grid-template-columns:44px 1fr 86px;gap:8px;padding:5px 14px;font-size:11.8px;border-top:1px solid #F3EFE7;align-items:center}.tx .d{color:#857E70;font:500 10.5px 'JetBrains Mono',monospace}.tx .m{font:600 11.8px 'JetBrains Mono',monospace;text-align:right}.tx .in{color:#2F5D3A}.tx .out{color:#7A1F2B}
.pend{margin:6px 14px 0;display:flex;align-items:center;justify-content:space-between;gap:8px;border-radius:9px;background:#FBF6EC;border:1px solid #EADBB9;padding:7px 10px;font-size:11.8px}
.rec{margin:7px 14px 10px;display:flex;align-items:center;gap:8px;font-size:11.3px;color:#2F5D3A;background:#F1F6EF;border-radius:8px;padding:6px 10px}.rec b{font-family:'JetBrains Mono',monospace;font-weight:600}
</style></head><body>
<div class="top">
  <div class="mk"><i>M&amp;L</i><div><b>Mercer &amp; Lowe LLP</b><span>COUNSEL OS</span></div></div>
  <div class="tabs"><span class="on">Matters</span><span>Calendar</span><span>Contacts</span><span>Documents</span><span>Billing</span><span>Trust</span><span>Intake<em>2</em></span><span>Reports</span></div>
  <div class="timer"><span class="dot"></span><span>Hughes v. Tate · L250</span><b>0:42:18</b><span class="pz">${ic(I.pause, 13)}</span></div>
  <div class="ask">${ic(I.spark, 14)}Ask Counsel OS</div>
  <span class="av" style="background:#7A1F2B">RM</span>
</div>

<div class="mh">
  <div class="crumb">Matters / <b>00412-Hughes</b> · opened 12 Aug 2026</div>
  <div class="mrow">
    <div class="mt">
      <h1>Hughes Holdings, LLC <i>v.</i> Tate Logistics, Inc.</h1>
      <div class="meta"><span>${'Suffolk Superior Court'} · Civil Action No. <b class="mono" style="font-size:12px">2684CV01937</b></span><span>Commercial litigation</span><span>Responsible <b>Rachel Mercer</b></span><span>Originating <b>Daniel Lowe</b></span></div>
      <div class="stage">
        <span class="st done"><i>${ic(I.check, 11)}</i>Intake</span><span class="ln done"></span>
        <span class="st done"><i>${ic(I.check, 11)}</i>Pleadings</span><span class="ln done"></span>
        <span class="st done"><i>${ic(I.check, 11)}</i>Discovery</span><span class="ln done"></span>
        <span class="st cur"><i>4</i>Motions</span><span class="ln"></span>
        <span class="st"><i>5</i>Mediation</span><span class="ln"></span>
        <span class="st"><i>6</i>Trial</span>
      </div>
    </div>
    <div class="fin">
      <div><p>Work in progress</p><b>$12,640</b></div>
      <div><p>Outstanding</p><b>$8,415.00</b></div>
      <div class="tr"><p>Trust · IOLTA</p><b>$18,500.00</b></div>
      <div><p>Budget used</p><b>64%</b><div class="bar"><i style="width:64%"></i></div></div>
    </div>
  </div>
  <div class="mtabs"><span class="on">Dashboard</span><span>Activities · 38</span><span>Calendar</span><span>Communications</span><span>Documents · 46</span><span>Bills · 3</span><span>Transactions</span><span>Related contacts · 7</span></div>
</div>

<div class="grid">
  <div class="card">
    <div class="ch"><h3>${ic(I.gavel, 15)}Deadlines</h3><span class="pill" style="background:#F1ECE2;color:#5B4A2A">Court rules · MA Superior</span></div>
    ${deadlines.map(([w, d, m, t, s, k]) => `<div class="dl ${k}"><div class="dt"><small>${w}</small><b>${d}</b><small>${m}</small></div><div><p>${t}</p><small>${s}</small></div></div>`).join("")}
    <div class="rule"><b>From the trigger:</b> 5 Oct + 10 days + 3 (email) = Sun 18 Oct → Mon 19 Oct. Moves if the service date changes.</div>
    <div style="flex:1"></div>
    <div class="cc">
      <div class="h"><h4>${ic(I.alert, 14)}Conflict check · new intake</h4><span class="pill" style="background:#B4362A;color:#fff">1 match</span></div>
      <p><b>Coastal Freight Partners LLC</b> v. Mark Tate. Mark Tate is CEO of <b>Tate Logistics</b>, adverse party in matter 00412.</p>
      <div class="q">3 names · 1,284 contacts · 212 matters</div>
      <div class="act"><span class="btn d">Decline intake</span><span class="btn">Request waiver</span></div>
    </div>
  </div>

  <div class="card">
    <div class="ch"><h3>${ic(I.doc, 15)}Documents</h3><span>Draft v3 · autosaved 2 min ago</span></div>
    <div class="docs"><span class="dc">${ic(I.doc, 12)}Complaint · filed</span><span class="dc">${ic(I.doc, 12)}Answer</span><span class="dc">${ic(I.doc, 12)}Tate motion to compel · served 5 Oct</span><span class="dc on">${ic(I.doc, 12)}Opposition · draft v3</span></div>
    <div class="stagebox">
      <div class="paper">
        <div class="cap">COMMONWEALTH OF MASSACHUSETTS</div>
        <div class="cgrid"><div>SUFFOLK, ss.<br><br>HUGHES HOLDINGS, LLC,<br>&nbsp;&nbsp;&nbsp;Plaintiff,<br>v.<br>TATE LOGISTICS, INC.,<br>&nbsp;&nbsp;&nbsp;Defendant.</div><div>SUPERIOR COURT<br>CIVIL ACTION<br>NO. <span class="mf">2684CV01937</span></div></div>
        <h5>PLAINTIFF'S OPPOSITION TO DEFENDANT'S<br>MOTION TO COMPEL FURTHER PRODUCTION</h5>
        <p>Plaintiff <span class="mf">Hughes Holdings, LLC</span> ("Hughes") opposes the motion of Defendant <span class="mf">Tate Logistics, Inc.</span> ("Tate") served on <span class="mf">October 5, 2026</span>. Hughes has produced 4,812 pages across two productions and has met every date in the tracking order.</p>
        <p>Tate's motion seeks internal pricing models that are not relevant to any claim or defense and are protected as confidential commercial information. Mass. R. Civ. P. 26(b)(1). Hughes offered a stipulated protective order on September 21; Tate did not respond before serving this motion<span class="caret"></span></p>
      </div>
      <div class="cmt"><div class="w"><span class="av" style="background:#2F4A6B">DL</span>Daniel Lowe<small style="margin-left:auto">10:12</small></div><p>Cite the 21 Sept email as Exhibit C and add the Rule 9C conference date.</p></div>
      <div class="chk"><div class="ct">Rule 9A filing checklist</div><div class="ci ok">${ic(I.check, 12)}Rule 9C conference held · 28 Sep</div><div class="ci ok">${ic(I.check, 12)}Exhibits A–F prepared</div><div class="ci">Exhibit C · 21 Sept email</div><div class="ci">Serve on Tate by Mon 19 Oct</div><div class="ci">Send 9A notice to court clerk</div></div>
      <div class="tpl">${ic(I.spark, 13)}<span>From template <b>Rule 9A Opposition</b> · 6 fields merged</span></div>
    </div>
  </div>

  <div class="card">
    <div class="ch"><h3>${ic(I.clock, 15)}Time</h3><span>Today · 0.1 h increments · UTBMS</span></div>
    <div class="run"><p>Draft opposition to motion to compel</p><b>0:42:18</b><small>Rachel Mercer · L250 · $450/h · billable</small></div>
    ${entries.map(([ini, c, d, code, h, r, a, b]) => `<div class="te${b ? "" : " nc"}"><span class="av" style="background:${c}">${ini}</span><div><p>${d}</p><small>${code} · ${r}${r === "—" ? "" : "/h"}</small></div><span class="h">${h}</span><span class="a">${a}</span></div>`).join("")}
    <div class="tot"><span>2.5 h billable · ready to bill</span><span style="display:flex;gap:10px;align-items:center"><b>$883.00</b><span class="btn p">Quick bill</span></span></div>
    <div class="ch" style="border-top:1px solid #EFEAE0"><h3>${ic(I.bank, 15)}Matter trust · IOLTA</h3><span>Eastern Bank ····4471</span></div>
    <div class="tl"><div class="bal"><b>$18,500.00</b><small>Alert below $5,000</small></div></div>
    ${trust.map(([d, m, a, bal, k]) => `<div class="tx"><span class="d">${d}</span><span>${m}</span><span class="m ${k}">${a}</span></div>`).join("")}
    <div class="pend"><span>Invoice #1057 · $8,415.00 due</span><span class="btn">Pay from trust</span></div>
    <div class="rec">${ic(I.check, 14)}<span>September three-way reconciled · bank = book = client ledgers <b>$412,880.14</b></span></div>
  </div>
</div>
</body></html>`;
})();
