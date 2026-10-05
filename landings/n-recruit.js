// Placement ATS · TalentBridge Staffing — job-order pipeline, candidate match, client shortlist, placement invoice.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const jobs = [
    ["Senior Backend Engineer", "Finverse Payments", "4 openings · 8.33% of CTC", "1 placed", 1],
    ["Data Analyst", "Northwind Retail", "2 openings · 8.33% of CTC", "Interviews", 0],
    ["Plant HR Manager", "Kavya Auto Components", "1 opening · 12% of CTC", "Offer out", 0],
    ["Field Sales Exec (bulk)", "CoolAir Appliances", "25 openings · ₹18,000 / hire", "14 placed", 0],
    ["Product Designer", "Lumen Health", "1 opening · 10% of CTC", "Sourcing", 0]
  ];

  const cols = [
    ["Sourced", 42, "#94A3A8", [["Vikram Iyer", "Java Dev · Infosys", "14 → 20", "90d", 64], ["Neha Gupta", "SDE-2 · Swiggy", "26 → 34", "60d", 78], ["Ritu Sharma", "Backend · TCS", "18 → 24", "60d", 69]], 39],
    ["Screened", 18, "#5B8DB8", [["Karthik S.", "Backend · Razorpay", "30 → 38", "30d", 81], ["Divya Menon", "Sr Eng · PhonePe", "28 → 35", "60d", 74], ["Manish Rao", "Sr Dev · Freshworks", "27 → 33", "30d", 77]], 15],
    ["Submitted", 9, "#0F6E6E", [["Ananya Rao", "Sr Backend · Juspay", "24 → 32", "60d", 86, 1], ["Farhan Ali", "Lead · Paytm", "33 → 40", "90d", 70], ["Pooja Nair", "SDE-3 · Flipkart", "34 → 38", "60d", 75]], 6],
    ["Interview", 6, "#C98A12", [["Sneha Kulkarni", "R2 tech · Thu 3 PM", "29 → 35", "45d", 83], ["Arvind Rao", "R1 · today 5 PM", "27 → 33", "30d", 79], ["Harsh Vora", "R1 · Fri 11 AM", "26 → 32", "30d", 76]], 3],
    ["Offer", 2, "#7A5AE0", [["Meghna Pillai", "Offer ₹34L · awaiting", "28 → 34", "60d", 88], ["Rohit Jain", "Negotiating · ₹36L ask", "31 → 36", "30d", 80]], 0],
    ["Placed", 1, "#1F9D55", [["Rahul Menon", "Joined 1 Oct · ₹30L", "25 → 30", "—", 84]], 0]
  ];
  const ini = n => n.split(" ").map(x => x[0]).join("").slice(0, 2);
  const avc = ["#0F6E6E", "#C98A12", "#5B8DB8", "#B04E6F", "#4E7D3A", "#7A5AE0"];
  const ring = (p, s, c) => `<span class="rg" style="width:${s}px;height:${s}px;background:conic-gradient(${c} ${p * 3.6}deg,#E3E8E7 0)"><i style="width:${s - 8}px;height:${s - 8}px">${p}</i></span>`;
  const cardH = (k, i) => `<div class="kc${k[5] ? " on" : ""}"><div class="kr"><span class="av" style="background:${avc[(k[0].length + i) % 6]}">${ini(k[0])}</span><b class="nm">${k[0]}</b></div><small class="ks">${k[1]}</small><div class="kf"><span>${k[2].replace(" → ", "→")}L</span><span>${k[3]}</span>${ring(k[4], 22, k[4] >= 80 ? "#0F6E6E" : "#C98A12")}</div></div>`;

  window.LANDINGS.recruit = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:12.5px/1.4 'Sora',system-ui,sans-serif;color:#10191B;background:#EEF2F1}
.top{height:54px;display:flex;align-items:center;gap:16px;padding:0 20px;background:#0E2527;color:#E6EEEC}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:30px;height:30px;border-radius:8px;background:#E2A72E;color:#0E2527;display:grid;place-items:center;font:800 13px 'Sora';font-style:normal}
.lg b{display:block;font-size:14px;line-height:1.1}.lg span{font:600 9.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#86A3A0}
.tb{display:flex;gap:2px;margin-left:14px}.tb span{padding:7px 11px;border-radius:7px;color:#A8C0BD;font-weight:600}.tb span.on{background:#1B3A3C;color:#fff}
.tb em{font-style:normal;background:#E2A72E;color:#0E2527;border-radius:8px;padding:0 6px;font-size:10.5px;margin-left:5px;font-weight:800}
.sr{margin-left:auto;width:260px;background:#163234;border-radius:8px;padding:7px 11px;color:#86A3A0}.ask{background:#E2A72E;color:#0E2527;font-weight:800;border-radius:8px;padding:8px 12px}
.me{width:30px;height:30px;border-radius:50%;background:#5B8DB8;color:#fff;display:grid;place-items:center;font-weight:700;font-size:11px}
.wrap{display:grid;grid-template-columns:212px 1fr 372px;gap:14px;padding:14px 16px;height:846px}
.rail{display:flex;flex-direction:column;gap:8px}.rl{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#5D7472;padding:2px 4px}
.jo{background:#fff;border:1px solid #DCE3E2;border-radius:11px;padding:9px 11px;display:flex;flex-direction:column;gap:2px}.jo b{font-size:12.5px}.jo small{color:#5D7472;font-size:11px}
.jo.on{border-color:#0F6E6E;box-shadow:inset 3px 0 0 #0F6E6E}.jo .s{font-size:10.5px;font-weight:700;color:#0F6E6E}
.mtd{margin-top:auto;background:#0E2527;color:#DDE8E6;border-radius:12px;padding:12px}.mtd b{display:block;font:700 20px 'Sora';color:#fff}.mtd small{color:#86A3A0}
.mtd .r{display:flex;justify-content:space-between;margin-top:8px;font-size:11.5px}
.mid{display:flex;flex-direction:column;gap:12px;min-width:0}
.jh{background:#fff;border:1px solid #DCE3E2;border-radius:13px;padding:13px 15px;display:grid;grid-template-columns:1fr auto;gap:8px}
.jh h1{margin:0;font-size:19px;font-weight:800;letter-spacing:-.01em}.jh p{margin:2px 0 0;color:#5D7472}
.fx{display:flex;gap:7px;flex-wrap:wrap;grid-column:1/-1}.fx span{background:#F1F5F4;border:1px solid #DCE3E2;border-radius:7px;padding:3px 8px;font-size:11.5px}.fx b{font-weight:700}
.prog{text-align:right}.prog b{font:800 22px 'Sora'}.prog small{display:block;color:#5D7472}
.kb{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;flex:1;min-height:0}
.kcol{background:#E4EBEA;border-radius:11px;padding:7px;display:flex;flex-direction:column;gap:6px;min-width:0}
.kh{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:11.5px;padding:2px 3px}.kh i{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:5px}
.kh em{font-style:normal;font:600 11px 'JetBrains Mono';color:#5D7472}
.kc{background:#fff;border:1px solid #D6DFDE;border-radius:9px;padding:7px;display:flex;flex-direction:column;gap:5px}.kc.on{border-color:#0F6E6E;box-shadow:0 0 0 2px rgba(15,110,110,.25)}
.kr{display:flex;gap:6px;align-items:center}.kn{min-width:0;flex:1}.kn b{display:block;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.kn small{display:block;color:#5D7472;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.av{width:24px;height:24px;border-radius:50%;color:#fff;display:grid;place-items:center;font-size:9.5px;font-weight:700;flex:none}
.rg{border-radius:50%;display:grid;place-items:center;flex:none}.rg i{border-radius:50%;background:#fff;display:grid;place-items:center;font:700 9.5px 'JetBrains Mono';font-style:normal}
.kf{display:flex;justify-content:space-between;align-items:center;font:600 10px 'JetBrains Mono';color:#40585A;border-top:1px dashed #DCE3E2;padding-top:5px}
.nm{font-size:11.5px;line-height:1.2}.ks{color:#5D7472;font-size:10.5px;line-height:1.25}
.more{color:#5D7472;font-size:11px;text-align:center;padding:2px}
.low{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cd{background:#fff;border:1px solid #DCE3E2;border-radius:13px;padding:12px 14px}.cdh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.cdh b{font-size:13.5px;font-weight:800}.cdh small{color:#5D7472}
.lnk{display:flex;align-items:center;gap:8px;background:#F1F5F4;border:1px dashed #9DB5B2;border-radius:9px;padding:7px 9px;font:600 11.5px 'JetBrains Mono'}
.lnk span{margin-left:auto;background:#0F6E6E;color:#fff;border-radius:6px;padding:3px 8px;font:700 11px 'Sora'}
.vt{display:flex;flex-direction:column;gap:5px;margin-top:8px}.vt div{display:flex;align-items:center;gap:7px;font-size:11.5px}.vt em{font-style:normal;margin-left:auto;font-weight:700;border-radius:6px;padding:2px 7px;font-size:10.5px}
.iv{width:100%;border-collapse:collapse;font-size:11.5px}.iv td{padding:4px 0}.iv td:last-child{text-align:right;font-family:'JetBrains Mono';font-weight:600}.iv tr.t td{border-top:1px solid #DCE3E2;font-weight:800;font-size:13px;padding-top:6px}
.right{background:#fff;border:1px solid #DCE3E2;border-radius:14px;padding:14px 15px;display:flex;flex-direction:column;gap:11px;min-height:0}
.ph{display:flex;gap:11px;align-items:center}.ph .big{width:46px;height:46px;border-radius:50%;background:#0F6E6E;color:#fff;display:grid;place-items:center;font-weight:800;font-size:15px}
.ph b{font-size:16px;font-weight:800;display:block}.ph small{color:#5D7472}
.mt{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;background:#F1F5F4;border-radius:11px;padding:10px}
.sk{display:flex;flex-direction:column;gap:3px;font-size:11.5px}.sk div{display:flex;justify-content:space-between}.ok{color:#1F9D55;font-weight:700}.pa{color:#C98A12;font-weight:700}
.cv{border:1px solid #DCE3E2;border-radius:10px;padding:9px 10px;font-size:11px;line-height:1.5;color:#2B3D3F;background:linear-gradient(#fff,#fff) padding-box}
.cv h4{margin:0 0 3px;font-size:10px;font-family:'JetBrains Mono';letter-spacing:.1em;color:#5D7472;font-weight:600}.cv mark{background:#FCEFC9;color:#10191B;border-radius:3px;padding:0 2px}
.ctc{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.ctc div{background:#F1F5F4;border-radius:9px;padding:7px 8px}.ctc span{display:block;color:#5D7472;font-size:10.5px}.ctc b{font:700 14px 'Sora'}
.int{border-left:3px solid #C98A12;background:#FFF8EA;border-radius:0 10px 10px 0;padding:8px 10px;font-size:11.5px}.int b{display:block;font-size:12.5px}
.tl{display:flex;flex-direction:column;gap:6px}.tl div{display:flex;align-items:center;gap:8px;font-size:11.5px}.tl i{width:8px;height:8px;border-radius:50%;background:#0F6E6E;flex:none}.tl i.n{background:#C98A12;box-shadow:0 0 0 3px #FCEFC9}.tl i.g{background:#C9D5D3}.tl em{margin-left:auto;font:600 10.5px 'JetBrains Mono';font-style:normal;color:#5D7472}
.bt{display:flex;gap:7px;margin-top:auto}.bt span{flex:1;text-align:center;border:1px solid #C9D5D3;border-radius:8px;padding:7px;font-weight:700;font-size:12px}.bt span.p{background:#0F6E6E;border-color:#0F6E6E;color:#fff}
</style></head><body>
<div class="top"><div class="lg"><i>TB</i><div><b>TalentBridge Staffing</b><span>PLACEMENT ATS</span></div></div>
<div class="tb"><span class="on">Jobs</span><span>Candidates</span><span>Clients</span><span>Interviews<em>6</em></span><span>Placements</span><span>Invoices</span></div>
<div class="sr">Search 18,240 candidates…</div><span class="ask">Ask Placement ATS</span><span class="me">SK</span></div>
<div class="wrap">
<div class="rail"><div class="rl">OPEN JOB ORDERS · 23</div>
${jobs.map(j => `<div class="jo${j[4] ? " on" : ""}"><b>${j[0]}</b><small>${j[1]}</small><small>${j[2]}</small><span class="s">${j[3]}</span></div>`).join("")}
<div class="mtd"><small>September placements</small><b>11 placed · ₹21.4L</b><div class="r"><span>Fees invoiced</span><span>₹21,42,600</span></div><div class="r"><span>Collected</span><span>₹14,90,000</span></div><div class="r"><span>Replacement window open</span><span>3</span></div></div></div>
<div class="mid">
<div class="jh"><div><h1>Senior Backend Engineer · Java / Spring</h1><p>Finverse Payments · Bengaluru (hybrid, HSR) · account manager Sahana K.</p></div>
<div class="prog"><b>1 / 4</b><small>openings filled · due 30 Oct</small></div>
<div class="fx"><span>Budget <b>₹28–36 LPA</b></span><span>Notice <b>≤ 60 days</b></span><span>Fee <b>8.33% of annual CTC</b></span><span>Replacement <b>90 days</b></span><span>Must-have <b>Java · Spring Boot · Kafka</b></span><span>Nice <b>AWS · payments</b></span></div></div>
<div class="kb">${cols.map(c => `<div class="kcol"><div class="kh"><span><i style="background:${c[2]}"></i>${c[0]}</span><em>${c[1]}</em></div>${c[3].map(cardH).join("")}${c[4] ? `<div class="more">+${c[4]} more</div>` : ""}</div>`).join("")}</div>
<div class="low">
<div class="cd"><div class="cdh"><b>Client shortlist</b><small>shared Mon 5 Oct · 4 candidates</small></div>
<div class="lnk">tb.link/s/FV-2041<span>Copy link</span></div>
<div class="vt"><div><span class="av" style="background:#B04E6F;width:20px;height:20px;font-size:8.5px">PN</span>Priya Nair (Finverse) viewed 3× · last 11:05 AM</div>
<div>Ananya Rao<em style="background:#DDF3E5;color:#1F9D55">Interview</em></div><div>Farhan Ali<em style="background:#FFF1D6;color:#A86A00">Hold · budget</em></div><div>Karthik S.<em style="background:#ECEFEE;color:#5D7472">Not reviewed</em></div></div></div>
<div class="cd"><div class="cdh"><b>Invoice · INV-0932</b><small>Rahul Menon · joined 1 Oct</small></div>
<table class="iv"><tr><td>Annual CTC</td><td>₹30,00,000</td></tr><tr><td>Fee 8.33%</td><td>₹2,49,900</td></tr><tr><td>GST 18%</td><td>₹44,982</td></tr><tr class="t"><td>Total due 31 Oct</td><td>₹2,94,882</td></tr></table>
<div style="margin-top:6px;font-size:11px;color:#5D7472">90-day replacement guarantee until 30 Dec</div></div></div>
</div>
<div class="right">
<div class="ph"><span class="big">AR</span><div><b>Ananya Rao</b><small>Senior Backend Engineer · Juspay · 7 yrs · Koramangala</small></div></div>
<div class="mt">${ring(86, 64, "#0F6E6E")}<div class="sk"><div><span>Java · 7 yrs</span><span class="ok">match</span></div><div><span>Spring Boot · Kafka</span><span class="ok">match</span></div><div><span>Payments domain (UPI switch)</span><span class="ok">match</span></div><div><span>AWS</span><span class="pa">partial · GCP</span></div></div></div>
<div class="cv"><h4>PARSED CV · ananya_rao_cv.pdf</h4>Built the <mark>UPI</mark> mandate service at Juspay handling 40M txns/day on <mark>Spring Boot</mark> and <mark>Kafka</mark>; led migration of reconciliation jobs to <mark>Java 17</mark>; on-call lead for 6 engineers. B.Tech CSE, NIT Surathkal.</div>
<div class="ctc"><div><span>Current CTC</span><b>₹24 LPA</b></div><div><span>Expected</span><b>₹32 LPA</b><span>+33% · in budget</span></div><div><span>Notice</span><b>60 days</b><span>serving · LWD 30 Nov</span></div></div>
<div class="int"><b>Round 2 · Tech panel · Thu 8 Oct, 3:00 PM</b>Finverse: Priya Nair, Rohit Das · Google Meet · candidate confirmed on WhatsApp<br><span style="color:#5D7472">Round 1 client feedback: “Strong system design, move fast.”</span></div>
<div class="tl"><div class="rl" style="padding:0">SUBMISSION TIMELINE</div><div><i></i><span>Submitted to Finverse with CV + notes</span><em>Mon 10:12</em></div><div><i></i><span>Client viewed profile 3×</span><em>Mon 11:05</em></div><div><i></i><span>Round 1 cleared · “move fast”</span><em>Tue 6:40</em></div><div><i class="n"></i><span>Round 2 tech panel</span><em>Thu 3:00</em></div><div><i class="g"></i><span>Offer target ₹32L · joining by 1 Dec</span><em>est.</em></div></div>
<div class="bt"><span>WhatsApp</span><span>Reschedule</span><span class="p">Log feedback</span></div>
</div>
</div></body></html>`;
})();
