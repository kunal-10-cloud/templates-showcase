// People OS · Sentinel Facility Services — September payroll run with attendance grid, payslip and geo-selfie clock-ins.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  // Sept 2026: day 1 is a Tuesday. Ganesh Chaturthi (paid holiday) on Mon 14 Sep.
  const DAYS = 30, FIRST_DOW = 2, HOLIDAY = 14;
  const dowL = ["S", "M", "T", "W", "T", "F", "S"];

  // name, role, site, weekly-off weekday, night shift, leave days, absent (LOP) days, OT day list, OT hours
  const staff = [
    ["Sunil Jadhav", "Security guard", "Magarpatta · Gate 4", 3, true, [], [17], [2, 5, 9, 12, 19, 23, 26, 29], 16],
    ["Rahul Pawar", "Security guard", "Hinjewadi Ph 2 · Twr B", 0, false, [21, 22], [], [4, 11, 18], 9],
    ["Priya Kulkarni", "Housekeeping supv.", "EON IT Park", 0, false, [8], [], [], 0],
    ["Ganesh More", "Security supervisor", "Magarpatta City", 6, false, [], [], [3, 10, 14, 24], 12],
    ["Anita Shinde", "Housekeeping", "Hinjewadi Ph 2", 1, false, [], [9, 10], [], 0],
    ["Vikas Patil", "Security guard", "Kharadi WTC", 4, true, [], [], [6, 13, 14, 20, 27], 15],
    ["Amit Gaikwad", "Security guard", "Kharadi WTC", 5, false, [15, 16, 17], [], [8, 22], 6],
    ["Rekha Bhosale", "Housekeeping", "EON IT Park", 0, false, [], [], [], 0],
    ["Imran Shaikh", "Electrician · FM", "Magarpatta City", 0, false, [], [], [7, 14, 21], 9],
    ["Deepak Waghmare", "Security guard", "Baner · Cybercity", 2, true, [], [28], [1, 14, 15], 9],
    ["Sneha Deshmukh", "Front desk", "EON IT Park", 0, false, [29, 30], [], [], 0],
    ["Rohit Kale", "Security guard", "Hinjewadi Ph 2", 3, true, [], [], [5, 12, 14, 19, 26], 15]
  ];
  const avc = ["#0D3B3A", "#4B4FA8", "#B5523B", "#2E7D5B", "#8A5A12", "#3A5C8F"];
  const ini = n => n.split(" ").map(x => x[0]).join("");

  const head = Array.from({ length: DAYS }, (_, i) => {
    const d = i + 1, dow = (FIRST_DOW + i) % 7;
    return `<div class="dh${d === HOLIDAY ? " hol" : ""}${dow === 0 ? " sun" : ""}"><b>${d}</b><i>${dowL[dow]}</i></div>`;
  }).join("");

  const rows = staff.map(([n, role, site, off, night, leave, absent, ot, otH], r) => {
    let cells = "";
    for (let d = 1; d <= DAYS; d++) {
      const dow = (FIRST_DOW + d - 1) % 7;
      let c = night ? "n" : "p", t = "";
      if (dow === off && d !== HOLIDAY) c = "o";
      if (leave.includes(d)) c = "l";
      if (absent.includes(d)) c = "a";
      if (d === HOLIDAY && c !== "l" && c !== "a" && c !== "o") t = " hw";
      const o = ot.includes(d) && c !== "o" ? " ot" : "";
      cells += `<span class="c ${c}${o}${t}"></span>`;
    }
    const paid = DAYS - absent.length;
    const sel = r === 0 ? " sel" : "";
    return `<div class="row${sel}"><div class="who"><span class="av" style="background:${avc[r % 6]}">${ini(n)}</span><div><b>${n}</b><small>${role} · ${site}</small></div></div><div class="cells">${cells}</div><div class="sm">${paid}</div><div class="sm">${otH || "–"}</div><div class="sm${absent.length ? " lop" : ""}">${absent.length || "–"}</div></div>`;
  }).join("");

  const steps = [["Attendance & LOP", 1], ["Joinees & exits", 1], ["OT & bonus", 1], ["Reimbursements", 1], ["Arrears & holds", 1], ["Overrides · PT ESI TDS", 2]];
  const stepper = steps.map(([s, st], i) => `<div class="st ${st === 1 ? "done" : "cur"}"><span>${st === 1 ? "✓" : i + 1}</span>${s}</div>`).join('<i class="sep"></i>');

  window.LANDINGS.hr = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#F3F1EB;color:#15201F;font:13px/1.4 'Figtree',system-ui,sans-serif}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:56px;background:#0D2B2A;color:#E8EFEC;display:flex;align-items:center;gap:22px;padding:0 24px}
.brand{display:flex;align-items:center;gap:10px}.shield{width:32px;height:34px;background:#F2A93B;clip-path:polygon(50% 0,100% 18%,100% 58%,50% 100%,0 58%,0 18%);display:grid;place-items:center;font-weight:800;color:#0D2B2A;font-size:15px}
.brand b{display:block;font-size:14.5px;letter-spacing:-.01em}.brand small{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#8FB3AD}
.tabs{display:flex;gap:4px;margin-left:14px}.tabs span{padding:7px 12px;border-radius:8px;color:#A9C3BE;font-weight:600}.tabs span.on{background:#1B4643;color:#fff}
.tabs em{font-style:normal;background:#F2A93B;color:#0D2B2A;border-radius:9px;font-size:10.5px;font-weight:800;padding:0 6px;margin-left:5px}
.ask{margin-left:auto;display:flex;align-items:center;gap:7px;border:1px solid #2F5E5A;border-radius:9px;padding:7px 12px;font-weight:700;color:#F2C46B}
.me{width:32px;height:32px;border-radius:50%;background:#F2A93B;color:#0D2B2A;display:grid;place-items:center;font-weight:800;font-size:12px}
.title{height:84px;display:flex;align-items:center;gap:24px;padding:0 24px}
.title h1{margin:0;font-size:27px;letter-spacing:-.02em;font-weight:800}.title p{margin:2px 0 0;color:#5E6B69}
.stepper{display:flex;align-items:center;gap:6px;margin-left:auto}
.st{display:flex;align-items:center;gap:6px;font-weight:600;font-size:12px;color:#3F4B49;background:#fff;border:1px solid #E1DED5;border-radius:999px;padding:5px 11px 5px 5px;white-space:nowrap}
.st span{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:800;background:#DCEFE4;color:#2E7D5B}
.st.cur{background:#0D2B2A;color:#fff;border-color:#0D2B2A}.st.cur span{background:#F2A93B;color:#0D2B2A}
.sep{width:10px;height:2px;background:#D5D1C6;display:block}
.grid{position:absolute;top:140px;left:24px;right:24px;bottom:16px;display:grid;grid-template-columns:912px 1fr;grid-template-rows:490px 238px;gap:16px}
.grid>*{min-height:0}
.card{background:#fff;border:1px solid #E4E1D8;border-radius:16px;overflow:hidden;position:relative}
.ch{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px}.ch h3{margin:0;font-size:15px;font-weight:800}.ch span{color:#6A7573;font-size:12px}
.att{grid-column:1;grid-row:1}
.hdr,.row{display:grid;grid-template-columns:196px 570px 36px 36px 36px;align-items:center;padding:0 14px}
.hdr{height:38px;border-bottom:1px solid #EEEBE3}
.hdr .lbl{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#8A9492;text-align:center}
.days{display:grid;grid-template-columns:repeat(30,17px);gap:2px}
.dh{text-align:center;line-height:1.05;border-radius:4px;padding:2px 0}.dh b{display:block;font:600 10px 'JetBrains Mono',monospace}.dh i{font-style:normal;font-size:9px;color:#9AA3A1}
.dh.sun i{color:#B5523B}.dh.hol{background:#FCEFD6}.dh.hol i{color:#A86A00}
.row{height:30px;border-bottom:1px solid #F3F1EC}.row.sel{background:#FBF6EA;box-shadow:inset 3px 0 0 #F2A93B}
.who{display:flex;align-items:center;gap:8px;min-width:0}.who b{display:block;font-size:12.5px;line-height:1.1;white-space:nowrap}.who small{display:block;color:#7A8583;font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.av{width:24px;height:24px;border-radius:50%;color:#fff;display:grid;place-items:center;font-size:9.5px;font-weight:800;flex:none}
.cells{display:grid;grid-template-columns:repeat(30,17px);gap:2px}
.c{height:20px;border-radius:4px;position:relative}
.c.p{background:#CFE9D9}.c.n{background:#C9CBF0}.c.o{background:#ECEAE3}.c.l{background:#F7DC93}.c.a{background:#F4B4AA;background-image:repeating-linear-gradient(45deg,transparent 0 3px,rgba(217,72,59,.35) 3px 5px)}
.c.hw{box-shadow:inset 0 0 0 2px #F2A93B}
.c.ot::after{content:"";position:absolute;top:2px;right:2px;width:5px;height:5px;border-radius:50%;background:#0D2B2A}
.sm{text-align:center;font:600 12px 'JetBrains Mono',monospace}.sm.lop{color:#D9483B}
.legend{display:flex;gap:11px;white-space:nowrap;align-items:center;padding:10px 16px;font-size:11.5px;color:#5E6B69}.legend i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-2px}
.lockbar{margin-left:auto;display:flex;align-items:center;gap:8px;font-weight:700;color:#2E7D5B}
.run{grid-column:1;grid-row:2;display:grid;grid-template-columns:560px 1fr;gap:16px;background:none;border:0}
.total{background:#0D2B2A;color:#E8EFEC;border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;gap:12px;min-height:0;position:relative;overflow:hidden}
.total:before{content:"";position:absolute;right:-60px;top:-80px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(242,169,59,.28),transparent 70%)}
.k{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#8FB3AD}
.nums{display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:12px}.nums b{display:block;font-size:22px;letter-spacing:-.02em;font-weight:800}.nums .net b{color:#F2C46B;font-size:26px}
.dbar{display:flex;height:9px;border-radius:9px;overflow:hidden;background:#1B4643}.dbar i{display:block;height:100%}
.dl{display:flex;gap:12px;font-size:11px;color:#A9C3BE;flex-wrap:wrap}.dl span i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px}
.act{display:flex;gap:8px;margin-top:auto}.btn{border-radius:9px;padding:8px 13px;font-weight:700;font-size:12.5px;border:1px solid #2F5E5A;color:#E8EFEC}.btn.p{background:#F2A93B;border-color:#F2A93B;color:#0D2B2A}
.appr{padding:0}.ap{display:grid;grid-template-columns:28px 1fr auto;gap:9px;align-items:center;padding:9px 14px;border-top:1px solid #F1EEE7}
.ap b{font-size:12.5px;display:block;white-space:nowrap}.ap small{white-space:nowrap}.ap small{color:#6A7573;font-size:11px}
.ab{display:flex;gap:5px}.ab span{border-radius:7px;padding:4px 8px;font-size:11px;font-weight:700;border:1px solid #DAD6CC}.ab span.y{background:#0D2B2A;color:#fff;border-color:#0D2B2A}
.tag{font:600 9.5px 'JetBrains Mono',monospace;letter-spacing:.06em;padding:1px 6px;border-radius:5px}
.slip{grid-column:2;grid-row:1;padding:16px 18px}
.sh{display:flex;align-items:center;gap:12px}.sh .av{width:42px;height:42px;font-size:14px}.sh b{font-size:16px;display:block}.sh small{color:#6A7573}
.pd{margin-left:auto;text-align:right}.pd b{font:700 13px 'JetBrains Mono',monospace}.pd small{display:block;color:#6A7573;font-size:11px}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px}
.sec{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#8A9492;margin-bottom:4px}
.ln{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed #ECE9E1;font-size:12px}.ln span:last-child{font-family:'JetBrains Mono',monospace;font-weight:600}
.ln.t{border-bottom:0;font-weight:800;padding-top:6px}
.netbox{margin-top:12px;border-radius:12px;background:#FBF6EA;border:1px solid #F1DFB8;padding:11px 14px;display:flex;align-items:center;justify-content:space-between}
.netbox b{font-size:24px;font-weight:800;letter-spacing:-.02em}.netbox small{color:#6A5A3A;font-size:11.5px}
.emp{display:flex;justify-content:space-between;margin-top:9px;font-size:11.5px;color:#5E6B69}
.rel{display:flex;gap:8px;margin-top:10px}.rel span{flex:1;text-align:center;border-radius:9px;padding:8px;font-weight:700;font-size:12px;border:1px solid #DAD6CC}.rel span.p{background:#0D2B2A;color:#fff;border-color:#0D2B2A}
.clock{grid-column:2;grid-row:2;display:grid;grid-template-columns:1fr 186px}
.live{padding:14px 10px 0 16px}.lr{display:grid;grid-template-columns:24px 1fr auto;gap:8px;align-items:center;padding:6px 0;border-top:1px solid #F1EEE7}
.lr b{font-size:12px;display:block}.lr small{color:#6A7573;font-size:10.5px}
.dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:4px}
.phone{position:absolute;right:10px;top:14px;width:170px;height:330px;border-radius:28px;background:#0B1514;padding:8px}
.scr{width:100%;height:100%;border-radius:21px;background:#F7F5EF;overflow:hidden;position:relative}
.map{height:132px;position:relative;background:#E3E7DC;overflow:hidden}
.map .rd{position:absolute;background:#fff}
.fence{position:absolute;left:40px;top:20px;width:88px;height:88px;border-radius:50%;border:2px dashed #2E7D5B;background:rgba(46,125,91,.12)}
.me2{position:absolute;left:78px;top:58px;width:12px;height:12px;border-radius:50%;background:#2F6BFF;box-shadow:0 0 0 6px rgba(47,107,255,.2)}
.selfie{width:56px;height:56px;border-radius:50%;margin:-28px auto 0;position:relative;border:3px solid #fff;background:radial-gradient(circle at 50% 38%,#C99A7A 0 13px,transparent 14px),radial-gradient(ellipse at 50% 100%,#2A3A6A 0 24px,transparent 25px),#DCD6CB;box-shadow:0 4px 10px rgba(0,0,0,.15)}
.match{position:absolute;right:-4px;bottom:-2px;width:18px;height:18px;border-radius:50%;background:#2E7D5B;color:#fff;font-size:10px;display:grid;place-items:center;border:2px solid #fff}
.pi{text-align:center;padding:4px 10px}.pi b{display:block;font-size:12.5px}.pi small{color:#6A7573;font-size:10px;display:block}
.inside{margin:6px 10px;border-radius:8px;background:#DCEFE4;color:#1F6B49;font-size:10.5px;font-weight:700;padding:5px 8px;text-align:center}
.cin{margin:6px 10px;border-radius:12px;background:#0D2B2A;color:#fff;text-align:center;padding:10px;font-weight:800;font-size:13px}
</style></head><body>
<div class="top"><div class="brand"><div class="shield">S</div><div><b>Sentinel Facility Services</b><small>PEOPLE OS · PUNE</small></div></div>
<div class="tabs"><span>People</span><span>Attendance</span><span>Roster</span><span>Leave<em>6</em></span><span class="on">Payroll</span><span>Compliance</span><span>Reports</span></div>
<div class="ask">✦ Ask People OS</div><div class="me">MK</div></div>

<div class="title"><div><h1>September 2026 payroll</h1><p>182 employees · 9 client sites · pay day <b>Wed 7 Oct</b> · attendance locked 1 Oct</p></div><div class="stepper">${stepper}</div></div>

<div class="grid">
<div class="card att"><div class="ch"><h3>Attendance · September</h3><span>Geo-selfie punches from 9 sites · showing 12 of 182 · <b style="color:#15201F">Magarpatta, Hinjewadi, Kharadi, EON, Baner</b></span></div>
<div class="hdr"><div class="lbl" style="text-align:left">EMPLOYEE · SITE</div><div class="days">${head}</div><div class="lbl">PAID</div><div class="lbl">OT H</div><div class="lbl">LOP</div></div>
${rows}
<div class="legend"><span><i style="background:#CFE9D9"></i>Day shift</span><span><i style="background:#C9CBF0"></i>Night shift</span><span><i style="background:#ECEAE3"></i>Weekly off</span><span><i style="background:#F7DC93"></i>Paid leave</span><span><i style="background:#F4B4AA"></i>Absent · LOP</span><span><i style="background:#fff;box-shadow:inset 0 0 0 2px #F2A93B"></i>Worked holiday 14 Sep</span><span><i style="background:#0D2B2A;border-radius:50%;width:7px;height:7px"></i>Overtime</span><span class="lockbar">● 37 LOP days · 1,284 OT h</span></div></div>

<div class="run">
<div class="total"><div class="k">RUN PAYROLL · STEP 6 OF 6 · OVERRIDES</div>
<div class="nums"><div><span class="k">GROSS</span><b>₹38,46,210</b></div><div><span class="k">DEDUCTIONS</span><b>₹3,52,840</b></div><div class="net"><span class="k">NET TO BANK</span><b>₹34,93,370</b></div></div>
<div class="dbar"><i style="width:68.5%;background:#F2A93B"></i><i style="width:6.1%;background:#7FD1AE"></i><i style="width:10.3%;background:#9EA3F0"></i><i style="width:15.1%;background:#E87D6E"></i></div>
<div class="dl"><span><i style="background:#F2A93B"></i>EPF ₹2,41,830</span><span><i style="background:#7FD1AE"></i>ESI ₹21,410</span><span><i style="background:#9EA3F0"></i>PT ₹36,200</span><span><i style="background:#E87D6E"></i>TDS ₹53,400</span><span style="margin-left:auto">Employer PF + ESI ₹4,12,560</span></div>
<div class="act"><span class="btn">Payroll register.xlsx</span><span class="btn">HDFC bank file</span><span class="btn p">Finalise & release 182 payslips</span></div></div>

<div class="card appr"><div class="ch"><h3>Needs approval</h3><span>before pay day</span></div>
<div class="ap"><span class="av" style="background:#B5523B">PK</span><div><b>Priya K. · casual leave</b><small>8–9 Oct · balance 4.5 → 2.5</small></div><div class="ab"><span>Reject</span><span class="y">Approve</span></div></div>
<div class="ap"><span class="av" style="background:#4B4FA8">VP</span><div><b>Shift swap · Vikas ↔ Amit</b><small>Night 7 Oct · Kharadi · no OT breach</small></div><div class="ab"><span class="y">Approve</span></div></div>
<div class="ap"><span class="av" style="background:#2E7D5B">AS</span><div><b>Missed punch · Anita S.</b><small>3 Oct · GPS on site till 18:04</small></div><div class="ab"><span class="y">Regularise</span></div></div>
</div></div>

<div class="card slip"><div class="sh"><span class="av" style="background:#0D3B3A">SJ</span><div><b>Sunil Jadhav</b><small>SFS-0417 · Security guard · Magarpatta, Gate 4</small></div><div class="pd"><b>29/30</b><small>paid days</small></div></div>
<div class="cols2"><div><div class="sec">EARNINGS</div>
<div class="ln"><span>Basic (29/30 of 14,000)</span><span>13,533</span></div>
<div class="ln"><span>HRA</span><span>3,867</span></div>
<div class="ln"><span>Special allowance</span><span>1,933</span></div>
<div class="ln"><span>Overtime 16 h × ₹140</span><span>2,240</span></div>
<div class="ln"><span>Night allowance 9 × ₹50</span><span>450</span></div>
<div class="ln t"><span>Gross</span><span>₹22,023</span></div></div>
<div><div class="sec">DEDUCTIONS</div>
<div class="ln"><span>EPF 12% of basic</span><span>1,624</span></div>
<div class="ln"><span>ESI 0.75%</span><span>166</span></div>
<div class="ln"><span>Professional tax · MH</span><span>200</span></div>
<div class="ln"><span>TDS</span><span>0</span></div>
<div class="ln"><span>Advance recovery</span><span>0</span></div>
<div class="ln t"><span>Total</span><span>₹1,990</span></div></div></div>
<div class="netbox"><div><small>NET PAY · to SBI ••4471</small><br><b>₹20,033</b></div><small style="text-align:right">Payslip in Marathi + English<br>via app and WhatsApp</small></div>
<div class="emp"><span>Employer EPF ₹1,624 · ESI 3.25% ₹716</span><span>UAN 1009 •••• 412 · IP 33 •••• 18</span></div>
<div class="emp" style="margin-top:4px"><span>YTD Apr–Sep · gross ₹1,28,410 · TDS ₹0</span><span>New tax regime</span></div>
<div class="rel"><span>Hold salary</span><span>Override ESI</span><span class="p">Preview payslip PDF</span></div></div>

<div class="card clock"><div class="live"><div class="ch" style="padding:0 0 8px"><h3>Live clock-ins</h3><span style="margin-right:4px">tonight's shift</span></div>
<div class="lr"><span class="av" style="background:#0D3B3A">SJ</span><div><b>Sunil Jadhav</b><small>Magarpatta · selfie match 98%</small></div><small><span class="dot" style="background:#2E7D5B"></span>18:52</small></div>
<div class="lr"><span class="av" style="background:#4B4FA8">VP</span><div><b>Vikas Patil</b><small>Kharadi WTC · in fence</small></div><small><span class="dot" style="background:#2E7D5B"></span>18:57</small></div>
<div class="lr"><span class="av" style="background:#3A5C8F">RK</span><div><b>Rohit Kale</b><small>Hinjewadi · 1.2 km away</small></div><small><span class="dot" style="background:#E9A23B"></span>late</small></div>
<div class="lr"><span class="av" style="background:#8A5A12">DW</span><div><b>Deepak Waghmare</b><small>Baner · no punch yet</small></div><small><span class="dot" style="background:#D9483B"></span>19:00</small></div>
<div style="margin-top:8px;font-size:11.5px;color:#5E6B69">164 / 182 on site · <b style="color:#B5523B">2 relievers needed</b></div></div>
<div class="phone"><div class="scr"><div class="map"><div class="rd" style="left:0;right:0;top:60px;height:9px"></div><div class="rd" style="top:0;bottom:0;left:100px;width:8px"></div><div class="rd" style="top:0;bottom:0;left:24px;width:5px"></div><div class="fence"></div><div class="me2"></div></div>
<div class="selfie"><span class="match">✓</span></div>
<div class="pi"><b>Night · Gate 4</b><small>Magarpatta City · 19:00–07:00</small></div>
<div class="inside">Inside site geofence · 42 m</div><div class="cin">Clock in · 18:52</div></div></div></div>
</div></body></html>`;
})();
