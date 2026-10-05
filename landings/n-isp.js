// ISP Billing · VelozNet Fibra — subscriber list with live sessions & billing, OLT/PON utilisation, Pix invoice, field jobs.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  // [name, sub, plan, price, pppoe, ont, port, signal, sigClass, session, sessClass, billing, billClass, action, actClass, sel]
  const subs = [
    ["Juliana Ferreira", "#10482 · Taquaral", "500 Mega", "R$ 99,90", "jferreira", "ZTEG3A91C2", "1/1/3", "-21.4", "", "Online · 6d 4h", "on", "Overdue 6 days", "red", "Send Pix", "p", 1],
    ["Marcos Oliveira", "#09817 · Cambuí", "1 Giga", "R$ 149,90", "moliveira", "HWTC8F2210", "1/1/1", "-19.8", "", "Online · 21d", "on", "Paid · Pix", "ok", "Suspend", "g"],
    ["Padaria Doce Lar", "#07311 · Business · IP fixo", "Biz 600", "R$ 249,00", "docelar.pj", "HWTC77A0C1", "1/1/1", "-22.6", "", "Online · 12d", "on", "Paid · boleto", "ok", "Suspend", "g"],
    ["Ana Beatriz Costa", "#11205 · Guanabara", "300 Mega", "R$ 79,90", "abcosta", "ZTEG3A0F77", "1/1/2", "-27.9", "warn", "2h · 3 drops", "warn", "Paid · Pix", "ok", "Ticket", "g"],
    ["Luciana Pereira", "#10966 · Centro", "500 Mega", "R$ 99,90", "lpereira", "ZTEG3A44B8", "1/1/3", "LOS", "bad", "Offline · 38 min", "bad", "Paid · card", "ok", "CTO-117", "g"],
    ["Rafael Souza", "#08840 · Botafogo", "500 Mega", "R$ 99,90", "rsouza", "HWTC8E91D4", "1/1/2", "-20.9", "", "Blocked · auto", "mute", "Suspended 16d", "red", "Restore", "g"],
    ["Gabriel Lima", "#11873 · Taquaral", "300 Mega", "R$ 79,90", "glima", "ZTEG3B02A9", "1/1/4", "-23.1", "", "Online · 1d", "on", "Promise · 08 Oct", "amber", "Suspend", "g"],
    ["Escola Pequeno Mundo", "#06120 · Business", "Biz 1 Giga", "R$ 399,00", "pequenomundo.pj", "HWTC6C3317", "1/1/4", "-18.7", "", "Online · 44d", "on", "Due 10 Oct", "info", "Suspend", "g"],
    ["Fernanda Rocha", "#12044 · new contract", "500 Mega", "R$ 99,90", "frocha", "ZTEG3B11F0", "—", "—", "", "Install 14:00", "info", "Bills on activation", "mute", "Add ONT", "g"]
  ];
  const rows = subs.map(([n, s, pl, pr, pp, ont, port, sig, sc, sess, ssc, bill, bc, act, ac, sel]) => `
  <tr class="${sel ? "sel" : ""}"><td><b>${n}</b><small>${s} · <span class="mono">${pp}</span></small></td><td><b class="pl">${pl}</b><small class="mono">${pr}/mês</small></td>
  <td><span class="mono">${ont}</span><small class="mono"><span class="${sc}">${sig}${sig.startsWith("-") ? " dBm" : ""}</span> · PON ${port}</small></td>
  <td><span class="sess ${ssc}">${sess}</span></td><td><span class="bill ${bc}">${bill}</span></td><td class="r"><span class="act ${ac}">${act}</span></tr>`).join("");

  const ports = [["1/1/1", 62, 1.41, ""], ["1/1/2", 55, 1.12, ""], ["1/1/3", 64, 0.98, "bad"], ["1/1/4", 38, 0.71, ""]];
  const portRows = ports.map(([p, o, g, c]) => `<div class="port ${c}"><span class="mono">PON ${p}</span><div class="pb"><i style="width:${Math.round(o / 64 * 100)}%"></i></div><span class="mono">${o}/64 ONTs</span><div class="pb t"><i style="width:${Math.round(g / 2.5 * 100)}%"></i></div><span class="mono">${g.toFixed(2)} G</span></div>`).join("");

  const qr = (() => { let cells = ""; const pat = "1111111010111111100000101011000001101110100111011101101110101011011101101110100101011101100000101101000001111111010101111111000000001100000000101110111010110111010100011011101000011101011101101011001010001010110100110101000001110101000110010001111111010011011000100000100100110101101110101101010111001011101011001001100010111010100101101010000010011110010001111111011010101101";
    for (let i = 0; i < 289; i++) cells += `<i class="${pat[i] === "1" ? "k" : ""}"></i>`; return cells; })();

  const spark = [3820, 3610, 3540, 3700, 4020, 4210, 4300, 4380, 4450, 4520, 4610, 4700, 4771, 4690, 4603];
  const max = 4800, min = 3400;
  const pts = spark.map((v, i) => `${(i * 260 / (spark.length - 1)).toFixed(1)},${(30 - (v - min) / (max - min) * 28).toFixed(1)}`).join(" ");

  window.LANDINGS.isp = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;800&family=Red+Hat+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Red Hat Display',sans-serif;color:#E3ECF1;background:#0A0F13}
.mono{font-family:'Red Hat Mono',monospace;font-size:11.5px}
.top{height:56px;display:flex;align-items:center;gap:16px;padding:0 20px;background:#0E151A;border-bottom:1px solid #1C272F}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#25D3A8,#1A9BD6);display:grid;place-items:center;font-style:normal;font-weight:800;color:#06221C}
.lg b{display:block;font-size:15px}.lg span{font:500 9.5px 'Red Hat Mono';letter-spacing:.16em;color:#6F8794}
.tabs{display:flex;gap:2px;margin-left:14px}.tabs span{padding:7px 12px;border-radius:8px;color:#93A7B2;font-weight:600}.tabs span.on{background:#17222A;color:#fff}
.tabs em{font-style:normal;background:#FF5D5D;color:#fff;font-size:10.5px;border-radius:9px;padding:0 6px;margin-left:5px}
.sp{flex:1}.ask{border:1px solid #23414A;border-radius:9px;padding:7px 13px;font-weight:700;color:#3FE0B5;background:#0F1F21}.av{width:32px;height:32px;border-radius:50%;background:#1A9BD6;display:grid;place-items:center;font-weight:700;font-size:11px}
.pulse{height:48px;display:flex;align-items:center;gap:22px;padding:0 20px;border-bottom:1px solid #1C272F;background:#0C1317;font-size:12.5px;color:#93A7B2}
.pulse b{color:#fff;font-family:'Red Hat Mono'}.dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;background:#3BE38A;box-shadow:0 0 8px #3BE38A}
.dot.r{background:#FF5D5D;box-shadow:0 0 8px #FF5D5D;animation:bl 1.2s infinite}@keyframes bl{50%{opacity:.3}}
.alarm{margin-left:auto;background:#2A1416;border:1px solid #5A2327;color:#FF9C9C;border-radius:8px;padding:5px 10px;font-weight:600}
.main{display:grid;grid-template-columns:888px 1fr;gap:14px;padding:14px 20px}
.card{background:#10181E;border:1px solid #1C272F;border-radius:14px;overflow:hidden}
.ch{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid #1C272F}.ch h4{margin:0;font-size:15px;font-weight:700}.ch .s{margin-left:auto;color:#6F8794;font-size:12px}
.chips{display:flex;gap:6px;padding:10px 14px;border-bottom:1px solid #1C272F}.chips span{border:1px solid #23313A;border-radius:999px;padding:4px 10px;font-size:12px;color:#A9BCC6;font-weight:600}.chips span.on{background:#E3ECF1;color:#0A0F13;border-color:#E3ECF1}
.chips b{font-family:'Red Hat Mono';margin-left:4px}
table{width:100%;border-collapse:collapse;table-layout:fixed}td{overflow:hidden;text-overflow:ellipsis}th{text-align:left;font:500 10px 'Red Hat Mono';letter-spacing:.1em;text-transform:uppercase;color:#5E7480;padding:8px 12px;border-bottom:1px solid #1C272F}
td{padding:9px 12px;border-bottom:1px solid #162027;vertical-align:middle;white-space:nowrap}td b{display:block;font-weight:600}td small{display:block;color:#6F8794;font-size:11.5px}
tr.sel td{background:#122229}tr.sel td:first-child{box-shadow:inset 3px 0 0 #3FE0B5}
.pl{color:#7FD8FF}.r{text-align:right}.warn{color:#FFB547}.bad{color:#FF6B6B}
.sess{font-size:12px;font-weight:600;white-space:nowrap}.sess::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;background:currentColor}
.sess.on{color:#3BE38A}.sess.warn{color:#FFB547}.sess.bad{color:#FF6B6B}.sess.mute{color:#6F8794}.sess.info{color:#7FD8FF}
.bill{font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:6px;white-space:nowrap}.bill.ok{background:#11291F;color:#5BE39A}.bill.red{background:#2E1517;color:#FF8A8A}.bill.amber{background:#2D2312;color:#FFC566}.bill.info{background:#122633;color:#8FD3FF}.bill.mute{background:#1A2329;color:#8FA2AC}
.act{font-size:12px;font-weight:700;padding:5px 10px;border-radius:7px;border:1px solid #2A3A44;color:#C7D6DD;white-space:nowrap}.act.p{background:#3FE0B5;color:#062018;border-color:#3FE0B5}
.rev{margin-top:14px;padding:14px 16px;display:grid;grid-template-columns:repeat(4,1fr) 230px;gap:14px;align-items:center}
.rev .k small{display:block;color:#6F8794;font-size:12px}.rev .k b{font:600 20px 'Red Hat Mono'}.rev .k em{font-style:normal;font-size:12px}
.right{display:flex;flex-direction:column;gap:14px}
.olt{padding:12px 14px}
.port{display:grid;grid-template-columns:78px 1fr 84px 70px 52px;gap:8px;align-items:center;margin-top:8px}
.pb{height:7px;border-radius:4px;background:#1C272F;overflow:hidden}.pb i{display:block;height:100%;background:#3FE0B5}.pb.t i{background:#1A9BD6}
.port.bad .pb i{background:#FF6B6B}.port.bad span:first-child{color:#FF8A8A}
.legend{display:flex;gap:14px;font-size:11.5px;color:#6F8794;margin-top:6px}.legend i{display:inline-block;width:10px;height:4px;border-radius:2px;margin-right:5px;vertical-align:middle}
.inv{display:grid;grid-template-columns:1fr 132px;gap:14px;padding:12px 14px}
.ln{display:flex;justify-content:space-between;font-size:12.5px;padding:3px 0;color:#A9BCC6}.ln b{font-family:'Red Hat Mono';color:#E3ECF1;font-weight:500}
.ln.t{border-top:1px solid #23313A;margin-top:4px;padding-top:7px;font-size:14px;color:#fff;font-weight:700}
.qr{background:#fff;border-radius:10px;padding:8px;display:grid;grid-template-columns:repeat(17,1fr);gap:0;width:132px;height:132px}.qr i{aspect-ratio:1}.qr i.k{background:#0A0F13}
.wa{margin-top:8px;font-size:11.5px;color:#7FB89E;line-height:1.5}
.rule{margin:0 14px 12px;border:1px dashed #2A3A44;border-radius:10px;padding:8px 10px;font-size:12px;color:#A9BCC6;display:flex;gap:8px;align-items:center}
.rule .act{margin-left:auto}
.jobs{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 14px}
.job{border-radius:10px;border:1px solid #23313A;padding:10px;display:flex;gap:10px}
.job.crit{background:#1E1214;border-color:#4C2125}.job .ph{width:64px;height:64px;border-radius:8px;background:url(img/isp/tech.jpg) center/cover;flex:none}
.job b{display:block;font-size:12.5px}.job small{display:block;color:#8FA2AC;font-size:11.5px}
</style></head><body>
<div class="top"><div class="lg"><i>V</i><div><b>VelozNet Fibra</b><span>ISP BILLING · CAMPINAS SP</span></div></div>
<div class="tabs"><span class="on">Subscribers</span><span>Network</span><span>Billing</span><span>Tickets<em>7</em></span><span>Field jobs</span><span>Reports</span></div>
<div class="sp"></div><span class="ask">✦ Ask ISP Billing</span><span class="av">RC</span></div>
<div class="pulse"><span><span class="dot"></span>PPPoE sessions <b>4,603</b> online of <b>4,812</b></span>
<svg width="260" height="32" viewBox="0 0 260 32"><polyline points="${pts}" fill="none" stroke="#3FE0B5" stroke-width="2"/></svg>
<span>Peak <b>4,771</b> at 21:00</span><span>OLT-01 <span class="dot"></span>OLT-02 <span class="dot"></span></span><span>Upstream <b>7.8 / 20 Gbps</b></span>
<span class="alarm"><span class="dot r"></span>LOS · 14 ONTs on CTO-117 · 38 min</span></div>
<div class="main">
<div>
<div class="card"><div class="ch"><h4>Subscribers</h4><span class="s">Synced with RADIUS · MikroTik CCR2116 · 10s ago</span></div>
<div class="chips"><span class="on">All<b>4,812</b></span><span>Overdue<b>187</b></span><span>Suspended<b>41</b></span><span>Offline<b>209</b></span><span>Weak signal<b>63</b></span><span>Installs today<b>6</b></span></div>
<table><colgroup><col style="width:230px"><col style="width:120px"><col style="width:178px"><col style="width:126px"><col style="width:134px"><col style="width:100px"></colgroup><tr><th>Subscriber · PPPoE</th><th>Plan</th><th>ONT · Rx signal</th><th>Session</th><th>Billing</th><th></th></tr>${rows}</table></div>
<div class="card rev"><div class="k"><small>October invoices issued</small><b>R$ 471.240</b></div><div class="k"><small>Received · Pix 71% · boleto 24%</small><b style="color:#5BE39A">R$ 452.300</b></div><div class="k"><small>Collection rate</small><b>96,0%</b> <em style="color:#5BE39A">+1,2 pts</em></div><div class="k"><small>Overdue</small><b style="color:#FF8A8A">R$ 18.940</b></div>
<div class="k"><small>Churn this month</small><b>0,9%</b> <em style="color:#6F8794">44 cancelled · 112 new</em></div></div>
</div>
<div class="right">
<div class="card"><div class="ch"><h4>OLT-01 · Huawei MA5800-X7</h4><span class="s">POP Cambuí · GPON 2.5G</span></div>
<div class="olt">${portRows}
<div class="legend"><span><i style="background:#3FE0B5"></i>ONTs on port</span><span><i style="background:#1A9BD6"></i>traffic now</span><span style="color:#FF8A8A">PON 1/1/3 full · CTO-117 LOS (Rua Barão de Jaguara)</span></div></div></div>
<div class="card"><div class="ch"><h4>Juliana Ferreira · invoice Oct</h4><span class="s">due 29 Sep · 6 days late</span></div>
<div class="inv"><div>
<div class="ln"><span>500 Mega · October</span><b>R$ 99,90</b></div><div class="ln"><span>Multa 2%</span><b>R$ 2,00</b></div><div class="ln"><span>Juros 1% a.m. · 6 days</span><b>R$ 0,20</b></div><div class="ln t"><span>Total now</span><b>R$ 102,10</b></div>
<div class="wa">WhatsApp · D-3 reminder read · D+1 boleto read · D+3 Pix link sent 09:12</div>
<div class="mono" style="margin-top:6px;color:#6F8794">Boleto 34191.79001 01043.510047 91020.150008 1 10250000010210</div></div>
<div class="qr">${qr}</div></div>
<div class="rule">Auto-suspend at 7 days · tomorrow 08:00 · restores on Pix in ~10 s<span class="act">Promise to pay +3d</span><span class="act p">Send Pix</span></div></div>
<div class="card"><div class="ch"><h4>Field &amp; support</h4><span class="s">7 open tickets · 6 installs today</span></div>
<div class="jobs"><div class="job crit"><div><b style="color:#FF8A8A">Fibre cut suspected · CTO-117</b><small>14 ONTs LOS since 13:54 · Diego + Paulo en route · ETA 18 min</small><small style="margin-top:4px;color:#FFC566">SMS sent to 14 affected</small></div></div>
<div class="job"><div class="ph"></div><div><b>Install · Fernanda Rocha</b><small>500 Mega · 14:00 · tech Paulo</small><small class="mono">ONT ZTEG3B11F0 · CTO-086 port 5</small></div></div></div></div>
</div></div>
</body></html>`;
})();
