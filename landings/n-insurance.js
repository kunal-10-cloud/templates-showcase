// Broker Book · Keystone Insurance Agency — renewals radar, household, comparative rater, commission reconciliation.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    car: '<path d="M3 16v-4l2-5h14l2 5v4"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="16" r="1.4"/><circle cx="17" cy="16" r="1.4"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    umb: '<path d="M2 12a10 10 0 0 1 20 0z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
    life: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
    biz: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', claim: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h4"/>'
  };

  // Renewal radar dots: [daysOut, premium, change%]
  const dots = [[3,1210,2],[6,2480,12],[9,880,4],[11,3920,7],[14,1650,1],[17,5200,15],[19,940,3],[23,2184,14],[26,1460,6],[30,3591,5],[33,720,0],[36,2210,11],[38,1301,1],[41,1880,8],[45,1984,14],[48,4100,4],[52,960,2],[55,2650,9],[57,6212,6],[61,1340,3],[64,2870,13],[68,780,1],[71,3300,5],[74,1520,2],[76,456,0],[80,2040,10],[83,1180,4],[86,4480,7],[88,990,12]];
  const col = c => c >= 10 ? "#E5484D" : c >= 5 ? "#F2A93B" : "#2BA37A";
  const radar = dots.map(([d, p, c], i) => {
    const x = 2 + d / 90 * 96, size = 8 + Math.sqrt(p) / 2.7, y = 22 + ((i * 37) % 54);
    const hi = d === 23 ? "outline:3px solid #0B1F33;outline-offset:3px;opacity:1;" : "";
    const lbl = d === 23 ? `<span class="dl" style="left:calc(${x}% - 20px);top:${y - 26}px">Okafor auto · +14%</span>` : "";
    return `<span class="dot" style="left:calc(${x}% - ${size / 2}px);top:${y}px;width:${size}px;height:${size}px;background:${col(c)};${hi}"></span>${lbl}`;
  }).join("");

  const rows = [
    ["Okafor household", "car", "Personal auto · 2 veh", "Progressive", "Oct 28", 23, "$1,916", "$2,184", 14.0, "Remarket", "Email · Sep 30", 1],
    ["Lindqvist Bakery", "biz", "BOP", "Travelers", "Nov 4", 30, "$3,420", "$3,591", 5.0, "Quoted", "Call · Oct 2", 0],
    ["Raj Patel", "home", "Homeowners", "Safeco", "Nov 12", 38, "$1,288", "$1,301", 1.0, "Auto-renew", "Text · Sep 21", 0],
    ["Luis Hernandez", "car", "Personal auto", "Nationwide", "Nov 19", 45, "$1,740", "$1,984", 14.0, "Remarket", "None yet", 0]
  ];
  const stCls = s => s === "Remarket" ? "r" : s === "Quoted" ? "b" : s === "Reviewing" ? "a" : "g";
  const rowHtml = rows.map(([n, i, line, car, x, dd, cur, ren, ch, st, last, sel]) => `<tr class="${sel ? "sel" : ""}">
    <td><div class="cl"><span class="li">${ic(I[i], 15)}</span><div><b>${n}</b><small>${line}</small></div></div></td>
    <td>${car}</td><td><b class="m">${x}</b><small class="m">${dd} days</small></td>
    <td class="m r">${cur}</td><td class="m r"><b>${ren}</b></td>
    <td class="r"><span class="chg" style="color:${col(ch)}">${ch > 0 ? "+" : ""}${ch.toFixed(1)}%</span></td>
    <td><small>${last}</small></td><td><span class="st ${stCls(st)}">${st}</span></td></tr>`).join("");

  const quotes = [
    ["Progressive", "Current renewal", "$2,184", "", "#0B1F33", 0, "12.5%"],
    ["Safeco", "Best price", "$1,862", "Save $322", "#2BA37A", 1, "15%"],
    ["Travelers", "Accident forgiveness", "$1,947", "Save $237", "#2F6FED", 0, "14%"],
    ["Nationwide", "Vanishing deductible", "$2,010", "Save $174", "#7A5AF8", 0, "13%"]
  ];
  const quoteHtml = quotes.map(([c, tag, p, save, clr, best, comm]) => `<div class="q${best ? " best" : ""}">
    <div class="qh"><span class="qlogo" style="background:${clr}">${c[0]}</span><div><b>${c}</b><small>${tag}</small></div>${best ? '<span class="bestpill">Best</span>' : ""}</div>
    <div class="qp m">${p}<small>/12 mo</small></div>
    <div class="qs ${save ? "" : "cur"}">${save || "+14.0% vs last term"}</div>
    <div class="qc"><span>Comm.</span><b class="m">${comm}</b></div></div>`).join("");

  const comm = [["Progressive", "Direct bill", "$4,812.00", "$4,812.00", "0.00", 0],
    ["Travelers", "Direct bill", "$6,140.00", "$5,890.00", "−250.00", -1],
    ["Safeco", "Agency bill", "$2,975.00", "$2,975.00", "0.00", 0],
    ["Nationwide", "Direct bill", "$1,880.00", "$2,020.00", "+140.00", 1]];
  const commHtml = comm.map(([c, b, e, r, v, s]) => `<tr class="cm"><td><b>${c}</b> <span style="color:#7B8A93;font-size:11.5px">· ${b}</span></td><td class="m r">${e}</td><td class="m r">${r}</td><td class="m r"><span class="${s < 0 ? "neg" : s > 0 ? "pos" : "ok"}">${s === 0 ? "Matched" : v}</span></td></tr>`).join("");

  window.LANDINGS.insurance = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Inter+Tight:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Inter Tight',system-ui,sans-serif;color:#0B1F33;background:#EEF2F1}
.m{font-family:'IBM Plex Mono',monospace}.r{text-align:right}small{display:block;color:#5F6F7A;font-size:11.5px}
.top{height:58px;background:#0B1F33;color:#DCE6EC;display:flex;align-items:center;gap:22px;padding:0 22px}
.brand{display:flex;align-items:center;gap:11px}.brand i{width:34px;height:34px;border-radius:10px;background:linear-gradient(150deg,#14B8A6,#0E7C72);display:grid;place-items:center;color:#fff}
.brand b{display:block;color:#fff;font:700 15.5px 'Familjen Grotesk',sans-serif}.brand span{font:600 10px 'IBM Plex Mono',monospace;letter-spacing:.14em;color:#7FA8B8}
.tabs{display:flex;gap:4px}.tabs a{padding:8px 12px;border-radius:8px;color:#A9BDC8;font-weight:600;text-decoration:none;display:flex;gap:6px;align-items:center}
.tabs a.on{background:#17344F;color:#fff}.tabs em{font-style:normal;background:#E5484D;color:#fff;font-size:10.5px;border-radius:9px;padding:0 6px;line-height:16px}
.sp{flex:1}.srch{display:flex;align-items:center;gap:8px;background:#17344F;border-radius:9px;padding:8px 12px;width:270px;color:#7FA8B8}
.ask{display:flex;align-items:center;gap:7px;background:#14B8A6;color:#062A26;font-weight:700;border-radius:9px;padding:8px 13px}
.av{width:32px;height:32px;border-radius:50%;background:#F2A93B;color:#3A2400;display:grid;place-items:center;font-weight:700;font-size:12px}
.wrap{display:grid;grid-template-columns:860px 1fr;grid-template-rows:466px 1fr;gap:14px;padding:14px 16px;height:842px}
.card{background:#fff;border-radius:16px;box-shadow:0 1px 0 #DCE4E2,0 6px 20px rgba(11,31,51,.05);overflow:hidden;display:flex;flex-direction:column;min-height:0}
.card>*{flex:none}
.ch{display:flex;align-items:flex-end;justify-content:space-between;padding:14px 18px 10px}.ch h2{margin:0;font:700 18px 'Familjen Grotesk',sans-serif;letter-spacing:-.01em}
.stats{display:flex;gap:18px}.stats div{text-align:right}.stats b{display:block;font:700 17px 'Familjen Grotesk',sans-serif}.stats small{font-size:11px}
.radar{position:relative;margin:2px 18px 0;height:116px;border-radius:12px;background:linear-gradient(90deg,#FDF2F2 0 33.3%,#FFF8EC 33.3% 66.6%,#F1FAF6 66.6%);border:1px solid #E6ECEA}
.radar .lane{position:absolute;top:6px;font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#7B8A93}
.dot{position:absolute;border-radius:50%;opacity:.88;box-shadow:0 2px 6px rgba(0,0,0,.12)}
.dl{position:absolute;z-index:5;background:#0B1F33;color:#fff;font:600 10.5px 'IBM Plex Mono',monospace;border-radius:6px;padding:3px 7px;white-space:nowrap}
.axis{display:flex;justify-content:space-between;margin:4px 18px 0;font:500 10.5px 'IBM Plex Mono',monospace;color:#8A98A0}
.today{position:absolute;left:2%;top:0;bottom:0;width:2px;background:#0B1F33}
.leg{display:flex;gap:14px;align-items:center;padding:8px 18px 4px;font-size:11.5px;color:#5F6F7A}.leg i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px;vertical-align:-1px}
table{width:100%;border-collapse:collapse}th{font:600 10.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#7B8A93;text-align:left;padding:8px 10px;border-bottom:1px solid #E6ECEA;background:#F8FAF9}
td{padding:7px 10px;border-bottom:1px solid #F0F3F2;vertical-align:middle}tr.sel td{background:#F0FBF8}tr.sel td:first-child{box-shadow:inset 3px 0 0 #14B8A6}
.cl{display:flex;gap:9px;align-items:center}.li{width:28px;height:28px;border-radius:8px;background:#EEF4F3;color:#0E7C72;display:grid;place-items:center;flex:none}
.chg{font:600 13px 'IBM Plex Mono',monospace}
.st{display:inline-block;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:700}.st.r{background:#FDECEC;color:#C42B30}.st.b{background:#E7EFFE;color:#2457C5}.st.a{background:#FFF2DC;color:#9A5B00}.st.g{background:#E6F6EF;color:#167A55}
.hh{padding:16px 18px;display:flex;flex-direction:column;gap:12px;height:100%}
.hhh{display:flex;gap:12px;align-items:center}.hav{width:46px;height:46px;border-radius:14px;background:linear-gradient(140deg,#F2A93B,#E26B2C);color:#fff;display:grid;place-items:center;font:700 17px 'Familjen Grotesk'}
.hhh h3{margin:0;font:700 20px 'Familjen Grotesk',sans-serif}.chips{display:flex;gap:6px;flex-wrap:wrap}.chip{border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;background:#EEF2F1;color:#3C4B55}
.pols{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.pol{border:1px solid #E6ECEA;border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:3px;position:relative}
.pol .t{display:flex;align-items:center;gap:7px;font-weight:700}.pol .t span{color:#0E7C72}.pol .p{font:600 16px 'IBM Plex Mono',monospace}
.pol .tag{position:absolute;right:10px;top:10px}
.gap{border:1.5px dashed #F2A93B;background:#FFFBF3}.gap .t span{color:#C47A00}
.claims{border-radius:12px;background:#F6F8F7;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;font-size:12.5px}
.tl{display:flex;flex-direction:column;gap:7px;font-size:12.5px}.tl div{display:grid;grid-template-columns:62px 1fr;gap:8px}.tl span{font:500 11px 'IBM Plex Mono',monospace;color:#8A98A0;padding-top:1px}
.btn{white-space:nowrap;border-radius:10px;padding:9px 14px;font-weight:700;font-size:13px;border:1px solid #D3DCDA;background:#fff;display:inline-flex;gap:7px;align-items:center}.btn.d{background:#0B1F33;border-color:#0B1F33;color:#fff}.btn.t{background:#14B8A6;border-color:#14B8A6;color:#062A26}
.qrow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:2px 18px 0}
.q{border:1px solid #E1E8E6;border-radius:14px;padding:10px 12px;display:flex;flex-direction:column;gap:7px;position:relative;background:#fff}
.q.best{border:2px solid #2BA37A;background:linear-gradient(180deg,#F0FBF6,#fff 60%);box-shadow:0 10px 26px rgba(43,163,122,.18)}
.qh{display:flex;gap:9px;align-items:center}.qh b{display:block;font-size:13.5px}.qlogo{width:30px;height:30px;border-radius:9px;color:#fff;display:grid;place-items:center;font-weight:800}
.bestpill{position:absolute;right:10px;top:10px;background:#2BA37A;color:#fff;font-size:10.5px;font-weight:800;border-radius:999px;padding:2px 8px;letter-spacing:.04em}
.qp{font-size:22px;font-weight:600}.qp small{display:inline;font-size:11px;margin-left:3px}
.qs{font-weight:700;color:#167A55;font-size:12.5px}.qs.cur{color:#C42B30}.qc{display:flex;justify-content:space-between;font-size:11.5px;color:#5F6F7A;border-top:1px dashed #E1E8E6;padding-top:6px}
.cov{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin:10px 18px 0;padding:8px 12px;background:#F6F8F7;border-radius:12px}
.cov div{font-size:11px;color:#5F6F7A}.cov b{display:block;color:#0B1F33;font:600 12.5px 'IBM Plex Mono',monospace;margin-top:2px}
.qa{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:10px 18px}
.neg{color:#C42B30;font-weight:700}.pos{color:#2457C5;font-weight:700}.ok{color:#167A55;font-weight:700;font-family:'Inter Tight'}
.cm td{padding:7px 12px}.tot td{padding:9px 12px;border-bottom:0;background:#F8FAF9;font-weight:700}
.live{animation:p 1.8s infinite}@keyframes p{0%,100%{opacity:1}50%{opacity:.35}}
</style></head><body>
<div class="top"><div class="brand"><i>${ic(I.shield, 18)}</i><div><b>Keystone Insurance Agency</b><span>BROKER BOOK · COLUMBUS OH</span></div></div>
<nav class="tabs"><a class="on">Renewals <em>31</em></a><a>Households</a><a>Quotes</a><a>Claims <em>3</em></a><a>Commissions</a><a>Carriers</a></nav>
<div class="sp"></div><div class="srch">${ic(I.search, 15)}Client, policy # or VIN</div><div class="ask">${ic(I.spark, 15)}Ask Broker Book</div><div class="av">JM</div></div>
<div class="wrap">
<div class="card">
  <div class="ch"><div><h2>Renewal radar · next 90 days</h2><small>Every policy by X-date. Size = premium, colour = renewal change. Mon 5 Oct 2026</small></div>
  <div class="stats"><div><b>214</b><small>policies renewing</small></div><div><b class="m">$486,920</b><small>premium at stake</small></div><div><b style="color:#E5484D">31</b><small>over +10% · remarket</small></div><div><b>91.8%</b><small>12-mo retention</small></div></div></div>
  <div class="radar"><span class="lane" style="left:1.5%">0–30 DAYS</span><span class="lane" style="left:35%">31–60 DAYS</span><span class="lane" style="left:68%">61–90 DAYS</span><span class="today"></span>${radar}</div>
  <div class="axis"><span>Today</span><span>Oct 20</span><span>Nov 4</span><span>Nov 19</span><span>Dec 4</span><span>Dec 19</span><span>Jan 3</span></div>
  <div class="leg"><span><i style="background:#2BA37A"></i>Under +5%</span><span><i style="background:#F2A93B"></i>+5 to 10%</span><span><i style="background:#E5484D"></i>Over +10%, remarket</span><span style="margin-left:auto">Sorted by X-date · needs action first</span></div>
  <table><tr><th style="width:24%">Client · line</th><th>Carrier</th><th>X-date</th><th class="r">Current</th><th class="r">Renewal</th><th class="r">Change</th><th>Last contact</th><th>Status</th></tr>${rowHtml}</table>
</div>
<div class="card" style="grid-row:span 1"><div class="hh">
  <div class="hhh"><div class="hav">OK</div><div style="flex:1"><h3>Okafor household</h3><small>Chidi &amp; Amara Okafor · 1188 Bexley Park Rd, Columbus OH 43209 · client since 2019</small></div><span class="st r">Renewal +14%</span></div>
  <div class="chips"><span class="chip">4 policies</span><span class="chip">$4,962 / yr premium</span><span class="chip">Prefers text</span><span class="chip">Teen driver added Aug</span><span class="chip">1 claim · Mar 2025 · $3,420 closed</span></div>
  <div class="pols">
    <div class="pol"><div class="t"><span>${ic(I.car, 16)}</span>Personal auto</div><small>Progressive · RAV4 + Civic · 3 drivers</small><div class="p">$2,184</div><small>Renews Oct 28 · was $1,916</small><span class="tag st r">Remarket</span></div>
    <div class="pol"><div class="t"><span>${ic(I.home, 16)}</span>Homeowners</div><small>Travelers · HO-3 · dwelling $412k</small><div class="p">$1,640</div><small>Renews Mar 2 · $1,000 deductible</small><span class="tag st g">Active</span></div>
    <div class="pol"><div class="t"><span>${ic(I.life, 16)}</span>Term life</div><small>Banner Life · $500k, 20-yr · Chidi</small><div class="p">$456</div><small>Annual · beneficiary Amara</small><span class="tag st g">Active</span></div>
    <div class="pol"><div class="t"><span>${ic(I.biz, 16)}</span>Renters (son)</div><small>Safeco · OSU off-campus</small><div class="p">$682</div><small>Renews Aug 14</small><span class="tag st g">Active</span></div>
    <div class="pol gap" style="grid-column:span 2"><div class="t"><span>${ic(I.umb, 16)}</span>Coverage gap · no umbrella</div><small>Teen driver + $412k home and auto limits at 100/300. A $1M umbrella from Travelers is about <b style="color:#0B1F33">$295/yr</b> and qualifies for a multi-policy discount.</small><b style="color:#C47A00;font-size:12px;margin-top:2px">+ Add to renewal proposal</b></div>
  </div>
</div></div>
<div class="card">
  <div class="ch"><div><h2>Comparative rater · Okafor auto</h2><small>Same drivers, vehicles and limits sent to 6 carriers · 4 quoted · rated 9:42 AM</small></div><span class="st b">Rated in 38 s</span></div>
  <div class="qrow">${quoteHtml}</div>
  <div class="cov"><div>Bodily injury<b>100/300</b></div><div>Property damage<b>$100k</b></div><div>Uninsured motorist<b>100/300</b></div><div>Comprehensive<b>$500 ded</b></div><div>Collision<b>$500 ded</b></div><div>Rental + tow<b>Included</b></div></div>
  <div class="qa"><small>Safeco is $322 less than the renewal with identical limits. Good-student discount applied for Tobi.</small><div style="display:flex;gap:8px"><span class="btn">Compare coverages</span><span class="btn t">Send proposal</span></div></div>
</div>
<div class="card">
  <div class="ch"><div><h2>Commission reconciliation</h2><small>September statements vs. expected from the policy register</small></div><span class="st a">1 short</span></div>
  <table><tr><th>Carrier</th><th class="r">Expected</th><th class="r">Received</th><th class="r">Variance</th></tr>${commHtml}
  <tr class="tot"><td>Total · 4 carriers</td><td class="m r">$15,807.00</td><td class="m r">$15,697.00</td><td class="m r"><span class="neg">−110.00</span></td></tr></table>
  <div style="margin:8px 16px;border-radius:12px;background:#FFF6E8;padding:8px 12px;font-size:12.5px;display:flex;gap:9px;align-items:flex-start"><span style="color:#C47A00">${ic(I.alert, 16)}</span><span><b>Travelers short $250.</b> Endorsement on Lindqvist Bakery BOP (policy 680-4K22) is missing from the statement. <b style="color:#0E7C72">Open carrier query</b></span></div>
</div>
</div></body></html>`;
})();
