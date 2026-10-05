// Property OS · Keystone Lettings: block view signature screen (batch 1).
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const ST = {
    let: ["Let", "#1F8A5B", "#E3F4EA"], arr: ["Arrears", "#C8372D", "#FBE4E1"], notice: ["Notice", "#B7791F", "#FBF0DA"],
    void: ["Void", "#64748B", "#EDF0F4"], view: ["Viewings", "#2F5BD3", "#E3EAFB"]
  };
  // floor stack: [floor label, [[flat, status, rent, tenant]]]
  const FLOORS = [
    ["5", [["5A", "let", "1,395", "Okafor"], ["5B", "let", "1,350", "Lindqvist"], ["5C", "notice", "1,420", "Chen"], ["5D", "let", "1,380", "Haddad"]]],
    ["4", [["4A", "let", "1,240", "Moss"], ["4B", "view", "1,275", "2 viewings"], ["4C", "let", "1,260", "Kaur"], ["4D", "let", "1,295", "Evans"]]],
    ["3", [["3A", "let", "1,150", "Wu"], ["3B", "arr", "1,150", "Petrov & Ali"], ["3C", "let", "1,180", "Murphy"], ["3D", "let", "1,165", "Noor"]]],
    ["2", [["2A", "void", "1,095", "Refurb"], ["2B", "let", "1,120", "Barnes"], ["2C", "arr", "1,110", "Doyle"], ["2D", "let", "1,140", "Rossi"]]],
    ["1", [["1A", "let", "1,050", "Shah"], ["1B", "let", "1,060", "Grant"], ["1C", "let", "1,075", "Ibrahim"], ["1D", "notice", "1,040", "Taylor"]]],
    ["G", [["GA", "let", "995", "Novak"], ["GB", "let", "1,010", "Bell"], ["GC", "let", "980", "Akhtar"], ["GD", "let", "1,000", "Price"]]]
  ];
  const tile = ([f, s, r, t]) => {
    const [, c, bg] = ST[s]; const sel = f === "3B";
    return `<div class="fl${sel ? " sel" : ""}" style="--c:${c};--bg:${bg}"><div class="fn"><b>${f}</b><i></i></div><span class="ft">${t}</span><span class="fr">£${r}</span></div>`;
  };
  const stack = FLOORS.map(([lvl, flats]) => `<div class="lv"><span class="ln">${lvl}</span>${flats.map(tile).join("")}</div>`).join("");

  const LEDGER = [
    ["01 Oct", "Rent · Oct 2026", "£1,150.00", "", "£1,215.00", "due"],
    ["28 Sep", "Bank transfer · I. Petrov", "", "£575.00", "£65.00", ""],
    ["15 Sep", "Bank transfer · O. Ali", "", "£510.00", "£640.00", "part"],
    ["01 Sep", "Rent · Sep 2026", "£1,150.00", "", "£1,150.00", ""],
    ["29 Aug", "Bank transfer · Petrov & Ali", "", "£1,150.00", "£0.00", ""],
    ["01 Aug", "Rent · Aug 2026", "£1,150.00", "", "£1,150.00", ""]
  ];
  const ledger = LEDGER.map(([d, x, ch, pay, bal, k]) => `<tr><td class="d">${d}</td><td>${x}${k === "due" ? ' <span class="tg red">Unpaid</span>' : k === "part" ? ' <span class="tg amb">Part</span>' : ""}</td><td class="n">${ch}</td><td class="n pay">${pay}</td><td class="n b">${bal}</td></tr>`).join("");

  const COMP = [
    ["Gas Safety (CP12)", "Expires 14 Nov 2026 · engineer booked 6 Nov", "amb", "40 days"],
    ["EICR", "Satisfactory · next due 22 Mar 2029", "grn", "Valid"],
    ["EPC", "Rating C (71) · valid to Jun 2033", "grn", "C"],
    ["Deposit · £1,326", "DPS cert 7741-2209 · protected 4 Jul", "grn", "Protected"],
    ["Right to Rent · O. Ali", "Time-limited permission · re-check by 2 Dec", "red", "Action"],
    ["Smoke & CO alarms", "Tested at check-in · 1 Jul 2026", "grn", "Done"]
  ];
  const comp = COMP.map(([t, s, k, v]) => `<div class="cr"><i class="rag ${k}"></i><div class="ct"><b>${t}</b><span>${s}</span></div><em class="pill ${k}">${v}</em></div>`).join("");

  const svg = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const IC = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>', doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 13h6M9 17h4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>', chat: '<path d="M4 5h16v11H8l-4 4z"/>', check: '<path d="M5 12l5 5L20 7"/>'
  };

  window.LANDINGS.property = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box}
body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.45 'Inter Tight',system-ui,sans-serif;color:#13202F;background:#EEEBE6}
.top{height:58px;background:#101A28;color:#C9D2DE;display:flex;align-items:center;gap:22px;padding:0 22px}
.lg{display:flex;align-items:center;gap:10px;color:#fff}.lg i{width:30px;height:30px;border-radius:8px;background:#B5532F;display:grid;place-items:center;font:600 14px 'Fraunces',serif;font-style:normal}
.lg b{font-size:14px}.lg span{font-size:11px;color:#8C99AC;letter-spacing:.08em;text-transform:uppercase;display:block;line-height:1}
.tabs{display:flex;gap:4px;margin-left:10px}.tabs a{padding:7px 12px;border-radius:8px;font-weight:500;font-size:13px;color:#AEB8C6}.tabs a.on{background:#1F2B3D;color:#fff}
.tabs a em{font-style:normal;margin-left:6px;background:#C8372D;color:#fff;border-radius:8px;padding:0 6px;font-size:11px;font-weight:700}
.sr{margin-left:auto;display:flex;align-items:center;gap:8px;background:#18243A;border:1px solid #26334A;border-radius:9px;padding:7px 12px;color:#7F8CA2;width:280px}
.ask{display:flex;align-items:center;gap:7px;background:#B5532F;color:#fff;border-radius:9px;padding:8px 13px;font-weight:600}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.wrap{display:grid;grid-template-columns:432px 1fr 388px;gap:16px;padding:18px 20px;height:842px}
.col{display:flex;flex-direction:column;gap:16px;min-height:0}
.card{background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(16,26,40,.06),0 8px 24px rgba(16,26,40,.05);overflow:hidden}
.hero{position:relative;height:200px;flex:none}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:28% 40%}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(16,26,40,.05) 30%,rgba(16,26,40,.88))}
.hz{position:absolute;left:18px;right:18px;bottom:16px;z-index:1;color:#fff}
.hz small{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#F2C9B8;font-weight:600}
.hz h1{margin:4px 0 2px;font:600 30px/1.05 'Fraunces',serif;letter-spacing:-.01em}
.hz p{margin:0;display:flex;align-items:center;gap:6px;color:#D9E0EA;font-size:13px}
.chips{position:absolute;top:14px;left:14px;right:14px;display:flex;gap:6px;z-index:1}
.chips span{background:rgba(255,255,255,.92);color:#13202F;font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:999px}
.stk{padding:12px 16px 12px;display:flex;flex-direction:column;gap:6px;flex:1;min-height:0}
.sh{display:flex;justify-content:space-between;align-items:baseline}.sh b{font-size:14.5px}.sh span{color:#6B7787;font-size:12px}
.occ{display:flex;height:8px;border-radius:6px;overflow:hidden;gap:2px;margin:2px 0 4px}.occ i{display:block}
.lv{display:grid;grid-template-columns:18px repeat(4,1fr);gap:5px;align-items:stretch}
.ln{font-size:11px;font-weight:700;color:#9AA4B2;align-self:center}
.fl{border-radius:10px;background:var(--bg);padding:5px 8px 4px;border:1.5px solid transparent;display:flex;flex-direction:column;gap:1px;min-width:0}
.fl .fn{display:flex;justify-content:space-between;align-items:center}.fl .fn b{font-size:12.5px}.fl .fn i{width:7px;height:7px;border-radius:50%;background:var(--c)}
.fl .ft{font-size:11px;color:#4A5565;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fl .fr{font-size:11px;font-weight:600;color:var(--c)}
.fl.sel{border-color:#13202F;box-shadow:0 6px 16px rgba(16,26,40,.18);transform:translateY(-1px);background:#fff}
.leg{display:flex;gap:12px;flex-wrap:wrap;font-size:11.5px;color:#4A5565;margin-top:2px}.leg span{display:flex;align-items:center;gap:5px}.leg i{width:8px;height:8px;border-radius:2px}
.stmt{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #EEF0F3;margin:0 -16px -12px;padding:10px 16px 12px;gap:8px;background:#FAF9F7}
.stmt div small{display:block;color:#6B7787;font-size:11px}.stmt div b{font-size:15px}
.tn{padding:18px 20px;display:flex;flex-direction:column;gap:14px}
.th{display:flex;align-items:center;gap:14px}
.flat{width:58px;height:58px;border-radius:14px;background:#13202F;color:#fff;display:grid;place-items:center;font:600 22px 'Fraunces',serif;flex:none}
.th h2{margin:0;font-size:19px;letter-spacing:-.01em}.th p{margin:2px 0 0;color:#6B7787;font-size:12.5px}
.tag{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;border-radius:999px;padding:3px 10px}
.tag.red{background:#FBE4E1;color:#B0281F}.tag.red:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.people{display:flex;gap:10px}.ppl{flex:1;display:flex;align-items:center;gap:10px;border:1px solid #ECEEF2;border-radius:12px;padding:9px 11px}
.ppl b{display:block;font-size:13px}.ppl small{color:#6B7787;font-size:11.5px}
.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.facts div{background:#F6F5F2;border-radius:10px;padding:8px 10px}.facts small{display:block;color:#6B7787;font-size:11px}.facts b{font-size:13.5px}
.bal{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;background:linear-gradient(120deg,#FFF4F2,#FDECE8);border:1px solid #F5CFC8;border-radius:14px;padding:14px 16px}
.bal small{color:#9A3A30;font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.bal b{display:block;font:600 30px/1.1 'Fraunces',serif;color:#B0281F}
.bal p{margin:2px 0 0;font-size:12px;color:#7A4B44}
.steps{display:flex;gap:4px;margin-top:8px}.steps span{font-size:10.5px;font-weight:600;padding:2px 7px;border-radius:6px;background:#fff;color:#9AA4B2;border:1px solid #F0D5CF}.steps span.d{background:#B0281F;color:#fff;border-color:#B0281F}.steps span.n{color:#B0281F;border-color:#B0281F}
.btns{display:flex;flex-direction:column;gap:7px}.btn{border-radius:9px;padding:8px 12px;font-weight:600;font-size:12.5px;text-align:center;white-space:nowrap}.btn.p{background:#13202F;color:#fff}.btn.o{background:#fff;border:1px solid #D9DDE3}
.lgr{flex:1;min-height:0;display:flex;flex-direction:column}
.lgr .sh{padding:14px 20px 8px}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;color:#8A94A3;font-weight:600;padding:7px 16px;border-bottom:1px solid #EEF0F3;background:#FAF9F7}
td{padding:9px 16px;border-bottom:1px solid #F2F3F5;font-size:13px;white-space:nowrap}td.d{color:#6B7787;white-space:nowrap}td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}td.pay{color:#1F8A5B}td.b{font-weight:700}
th.n{text-align:right}
.tg{font-size:10.5px;font-weight:700;border-radius:5px;padding:1px 6px;margin-left:4px}.tg.red{background:#FBE4E1;color:#B0281F}.tg.amb{background:#FBF0DA;color:#9A6408}
.cp{padding:14px 16px 6px}.cp .sh{margin-bottom:6px}
.score{display:flex;align-items:center;gap:10px;margin:2px 0 8px}.score b{font:600 26px 'Fraunces',serif}.score .bar{flex:1;height:8px;border-radius:5px;background:#EEF0F3;overflow:hidden;display:flex}.score .bar i{display:block}
.cr{display:grid;grid-template-columns:10px 1fr auto;gap:10px;align-items:center;padding:6px 0;border-top:1px solid #F2F3F5}
.rag{width:10px;height:10px;border-radius:50%}.rag.grn{background:#1F8A5B}.rag.amb{background:#D99A1E}.rag.red{background:#C8372D;box-shadow:0 0 0 4px rgba(200,55,45,.15)}
.ct b{display:block;font-size:13px}.ct span{font-size:11.5px;color:#6B7787}
.pill{font-style:normal;font-size:11px;font-weight:700;border-radius:999px;padding:2px 9px;white-space:nowrap}.pill.grn{background:#E3F4EA;color:#17704A}.pill.amb{background:#FBF0DA;color:#9A6408}.pill.red{background:#FBE4E1;color:#B0281F}
.mt{flex:1;min-height:0;display:flex;flex-direction:column}
.mph{position:relative;height:96px;flex:none}.mph img{width:100%;height:100%;object-fit:cover;display:block}
.mph .badge{position:absolute;left:12px;top:12px;background:rgba(16,26,40,.82);color:#fff;font-size:11px;font-weight:600;padding:4px 9px;border-radius:999px;display:flex;align-items:center;gap:6px}
.mph .pri{position:absolute;right:12px;top:12px;background:#D99A1E;color:#fff;font-size:11px;font-weight:700;padding:4px 9px;border-radius:999px}
.mb{padding:10px 16px 12px;display:flex;flex-direction:column;gap:8px}
.mb h3{margin:0;font-size:15px}.mb p{margin:0;color:#6B7787;font-size:12px}
.quote{display:flex;align-items:center;gap:10px;border:1px solid #ECEEF2;border-radius:12px;padding:9px 11px}
.quote .lo{width:34px;height:34px;border-radius:9px;background:#E6EEF8;color:#2F5BD3;display:grid;place-items:center;flex:none}
.quote b{display:block;font-size:13px}.quote small{color:#6B7787;font-size:11.5px}.quote .amt{margin-left:auto;text-align:right}.quote .amt b{font-size:15px}
.appr{background:#FFF8EC;border:1px solid #F3DDB2;border-radius:12px;padding:10px 12px;font-size:12.5px;color:#6E4D10}
.appr b{color:#4A3308}.appr .row{display:flex;gap:8px;margin-top:8px}.appr .btn{flex:1}
.tl{display:flex;gap:6px;align-items:center;font-size:11px;color:#8A94A3}.tl i{flex:1;height:2px;background:#E6E8EC}.tl span{white-space:nowrap}.tl span.on{color:#13202F;font-weight:700}
.live{animation:pl 1.8s infinite}@keyframes pl{0%,100%{opacity:1}50%{opacity:.4}}
</style></head><body>
<header class="top">
<div class="lg"><i>K</i><div><b>Keystone Lettings</b><span>Property OS</span></div></div>
<nav class="tabs"><a>Portfolio</a><a class="on">Properties</a><a>Tenancies</a><a>Maintenance<em>7</em></a><a>Compliance<em>3</em></a><a>Accounts</a><a>Landlords</a></nav>
<div class="sr">${svg(IC.search, 15)}Search tenant, flat or postcode</div>
<div class="ask">${svg(IC.spark, 15)}Ask Property OS</div>
<span class="av" style="background:#2F5BD3">AP</span>
</header>
<main class="wrap">
<section class="col">
<div class="card hero"><img src="img/property/building.jpg" alt=""><div class="chips"><span>24 flats</span><span>Landlord: Ancoats Mill Ltd</span><span>Fully managed</span></div>
<div class="hz"><small>Block · Ancoats</small><h1>Murray's Mill</h1><p>${svg(IC.pin, 14)}Redhill Street, Manchester M4 6EJ</p></div></div>
<div class="card stk">
<div class="sh"><b>Flats by floor</b><span>Occupancy 92% · 22 of 24 let</span></div>
<div class="occ"><i style="flex:17;background:#1F8A5B"></i><i style="flex:2;background:#C8372D"></i><i style="flex:2;background:#D99A1E"></i><i style="flex:1;background:#2F5BD3"></i><i style="flex:1;background:#94A3B8"></i></div>
${stack}
<div class="leg"><span><i style="background:#1F8A5B"></i>Let 17</span><span><i style="background:#C8372D"></i>Arrears 2</span><span><i style="background:#D99A1E"></i>Notice 2</span><span><i style="background:#2F5BD3"></i>Viewings 1</span><span><i style="background:#94A3B8"></i>Void 1</span></div>
<div class="stmt"><div><small>Rent due Oct</small><b>£27,630</b></div><div><small>Collected</small><b style="color:#1F8A5B">£24,410</b></div><div><small>Net to landlord</small><b>£21,180</b></div></div>
</div>
</section>

<section class="col">
<div class="card tn">
<div class="th"><div class="flat">3B</div><div style="flex:1"><h2>Flat 3B · 2 bed, 1 bath</h2><p>Periodic tenancy since 1 Jul 2026 · £1,150 pcm due on the 1st</p></div><span class="tag red">In arrears</span></div>
<div class="people">
<div class="ppl"><span class="av" style="background:#0E7C86">IP</span><div><b>Ivan Petrov</b><small>Lead tenant · pays £575</small></div></div>
<div class="ppl"><span class="av" style="background:#7A4FD0">OA</span><div><b>Omar Ali</b><small>Joint tenant · pays £575</small></div></div>
</div>
<div class="facts"><div><small>Deposit</small><b>£1,326 · DPS</b></div><div><small>Agreement</small><b>Signed 24 Jun</b></div><div><small>Last inspection</small><b>12 Sep</b></div><div><small>Guarantor</small><b>Yes · R. Petrov</b></div></div>
<div class="bal"><div><small>Arrears balance</small><b>£1,215.00</b><p>October rent unpaid (day 4) · £65 short from O. Ali in September</p>
<div class="steps"><span class="d">Reminder 1</span><span class="d">Reminder 2</span><span class="n">Letter</span><span>Payment plan</span></div></div>
<div class="btns"><span class="btn p">Send arrears letter</span><span class="btn o">Offer payment plan</span></div></div>
</div>
<div class="card lgr"><div class="sh"><b>Rent ledger</b><span>Synced from bank feed · 06:00 today</span></div>
<table><tr><th>Date</th><th>Description</th><th class="n">Charge</th><th class="n">Received</th><th class="n">Balance</th></tr>${ledger}</table></div>
</section>

<section class="col">
<div class="card cp"><div class="sh"><b>${svg(IC.shield, 15)} Compliance · Flat 3B</b><span>Updated today</span></div>
<div class="score"><b>4/6</b><div class="bar"><i style="flex:4;background:#1F8A5B"></i><i style="flex:1;background:#D99A1E"></i><i style="flex:1;background:#C8372D"></i></div><span style="font-size:12px;color:#6B7787">fully compliant</span></div>
${comp}</div>
<div class="card mt"><div class="mph"><img src="img/property/leak.jpg" alt=""><span class="badge"><span class="live" style="width:7px;height:7px;border-radius:50%;background:#F2C9B8;display:inline-block"></span>Reported in tenant app · 3 Oct</span><span class="pri">Priority 2</span></div>
<div class="mb"><div><h3>Bathroom ceiling leak · Flat 4B above</h3><p>Stain spreading from the extractor fan; 4B's shower seal suspected.</p></div>
<div class="tl"><span>Reported</span><i></i><span>Quoted</span><i></i><span class="on">Landlord approval</span><i></i><span>Booked</span><i></i><span>Done</span></div>
<div class="quote"><span class="lo">${svg(IC.wrench, 17)}</span><div><b>Northwest Plumbing &amp; Heating</b><small>Reseal shower, replace fan duct · visit Thu</small></div><div class="amt"><b>£340</b><small>+ VAT</small></div></div>
<div class="appr"><b>Over the £250 limit</b> in the management agreement. Approval request sent to the landlord yesterday.<div class="row"><span class="btn p">Chase landlord</span><span class="btn o">Approve as emergency</span></div></div>
</div></div>
</section>
</main></body></html>`;
})();
