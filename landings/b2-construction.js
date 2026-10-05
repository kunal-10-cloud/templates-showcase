// Build OS (construction / remodel) preview: project workspace modelled on Buildertrend + JobTread.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const money = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

  // ---------- schedule (weeks from Mon 7 Sep) ----------
  const WEEKS = ["Sep 7", "Sep 14", "Sep 21", "Sep 28", "Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9"];
  const PX = 66, ROW = 23, TODAY = 4.08;
  const TRADE = { crew: "#1F5F4A", plumb: "#2F6FDB", elec: "#C98A0B", dry: "#7A5AE0", stone: "#B4533A", tile: "#0E8C9A", city: "#16181D" };
  const tasks = [
    ["Demo & haul-off", "Ridgeline crew", 0.0, 0.8, "crew", "done"],
    ["Framing & blocking", "Ridgeline crew", 0.8, 1.6, "crew", "done"],
    ["Plumbing rough-in", "Apex Plumbing", 1.4, 2.4, "plumb", "done"],
    ["Electrical rough-in", "Volt Bros Electric", 2.0, 2.8, "elec", "done"],
    ["Rough-in inspection", "City of Denver · passed", 3.0, 3.0, "city", "ms-done"],
    ["Insulation & drywall", "Front Range Drywall", 3.0, 4.6, "dry", "progress"],
    ["Cabinet install", "Ridgeline crew", 4.6, 5.4, "crew", "sched"],
    ["Countertops", "Summit Stone · template → install", 5.4, 6.6, "stone", "sched"],
    ["Bath tile & shower", "Mile High Tile", 5.2, 6.8, "tile", "risk"],
    ["Paint & trim", "Ridgeline crew", 6.8, 7.8, "crew", "sched"],
    ["Final inspection", "City of Denver", 8.8, 8.8, "city", "ms"],
    ["Punch list & walkthrough", "Ridgeline crew · Hollis family", 8.8, 9.6, "crew", "sched"]
  ];
  const rows = tasks.map(([n, s, a, b, t, st], i) => {
    const y = i * ROW, c = TRADE[t];
    let bar = "";
    if (st.startsWith("ms")) {
      bar = `<div class="ms${st === "ms-done" ? " ok" : ""}" style="left:${a * PX - 7}px;top:${y + 5}px"></div><span class="msl" style="left:${a * PX + 12}px;top:${y + 3}px">${st === "ms-done" ? "Passed 28 Sep" : "Nov 11"}</span>`;
    } else {
      const w = (b - a) * PX;
      const pct = st === "done" ? 100 : st === "progress" ? 70 : 0;
      bar = `<div class="bar ${st}" style="left:${a * PX}px;top:${y + 4}px;width:${w}px;--c:${c}"><i style="width:${pct}%"></i>${st === "progress" ? `<em>70%</em>` : ""}${st === "risk" ? `<em class="wk">Waiting on shower tile</em>` : ""}</div>`;
    }
    const sx = st.startsWith("ms") ? null : (b * PX > 520 ? null : b * PX + 7);
    const subl = st.startsWith("ms") ? "" : (sx != null ? `<span class="sub" style="left:${sx}px;top:${y + 4}px">${s}</span>` : `<span class="sub r" style="right:${672 - a * PX + 7}px;top:${y + 4}px">${s}</span>`);
    return { label: `<div class="tl" style="top:${y}px"><span class="dot" style="background:${c}"></span><b>${n}</b></div>`, bar: bar + subl };
  });
  // dependency arrows: drywall -> cabinets -> countertops, inspection -> drywall
  const dep = (fromIdx, fromX, toIdx, toX) => {
    const y1 = fromIdx * ROW + 13.5, y2 = toIdx * ROW + 13.5, x1 = fromX * PX, x2 = toX * PX;
    return `<path d="M${x1} ${y1} H${x1 + 6} V${y2} H${x2 + 2}" fill="none" stroke="#8A8F98" stroke-width="1.4"/><path d="M${x2 - 3} ${y2 - 3.5} L${x2 + 3} ${y2} L${x2 - 3} ${y2 + 3.5}" fill="#8A8F98"/>`;
  };
  const deps = dep(5, 4.6, 6, 4.6) + dep(6, 5.4, 7, 5.4) + dep(4, 3.0, 5, 3.02);
  const H = tasks.length * ROW;

  // ---------- budget ----------
  const budget = [["Demo & site prep", 4200, 3980], ["Framing & carpentry", 9800, 10240], ["Plumbing · Apex", 14500, 9860], ["Electrical · Volt Bros", 11200, 6900],
    ["Drywall · Front Range", 6400, 3100], ["Cabinets", 22600, 11300], ["Countertops · Summit Stone", 7920, 3960], ["Tile · Mile High", 8900, 0]];
  const bSum = budget.reduce((s, r) => s + r[1], 0), aSum = budget.reduce((s, r) => s + r[2], 0);
  const budgetRows = budget.map(([n, b, a]) => {
    const p = Math.round(a / b * 100), over = a > b;
    return `<div class="br"><span class="bn">${n}</span><div class="bt"><i style="width:${Math.min(100, p)}%;background:${over ? "#C2412D" : p >= 95 ? "#1F5F4A" : "#5E8F7D"}"></i></div><span class="ba${over ? " over" : ""}">${money(a)}</span><span class="bb">${money(b)}</span></div>`;
  }).join("");

  // ---------- draws ----------
  const draws = [["Deposit", 10, "Paid 2 Sep", "paid"], ["Rough-in complete", 25, "Paid 30 Sep", "paid"], ["Drywall complete", 25, "Invoice on completion · ~9 Oct", "next"], ["Cabinets & counters", 25, "", ""], ["Final walkthrough", 15, "", ""]];
  const CONTRACT = 148600;

  // ---------- selections ----------
  const sel = [["Kitchen countertop", "Calacatta quartz · 3 cm · waterfall island", 6800, 7920, "Approved 29 Sep", "ok", "quartz.jpg"],
    ["Bath floor tile", "Porcelain hex 2\" · matte white", 1400, 1180, "Approved 22 Sep", "ok", "sw:hex"],
    ["Cabinet hardware", "Brushed brass pulls · 34", 650, 712, "Approved 24 Sep", "ok", "sw:brass"],
    ["Shower wall tile", "2 options sent · due Fri 9 Oct", 2200, null, "Awaiting client", "wait", "sw:subway"]];
  const selNet = sel.filter(s => s[3] != null).reduce((t, s) => t + (s[3] - s[2]), 0);

  // CO-04
  const LAB = 6 * 85, MAT = 284, SUB = LAB + MAT, MK = +(SUB * 0.2).toFixed(2), COT = SUB + MK;

  const css = `
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Manrope',system-ui,sans-serif;color:#1B1D21;background:#F4F2EE}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.top{height:54px;background:#16181D;color:#E9EBEF;display:flex;align-items:center;gap:18px;padding:0 20px}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:30px;height:30px;border-radius:8px;background:#1F5F4A;display:grid;place-items:center;font:700 15px 'Outfit',sans-serif;color:#fff;font-style:normal;position:relative;overflow:hidden}
.lg i:after{content:"";position:absolute;left:-4px;right:-4px;bottom:-6px;height:14px;background:#2E7A60;transform:skewY(-18deg)}
.lg b{display:block;font:600 14px 'Outfit',sans-serif}.lg span{font:500 9.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#8C93A0}
.sw{display:flex;align-items:center;gap:8px;background:#22252C;border:1px solid #30343D;border-radius:9px;padding:6px 10px;font-weight:600}
.sw small{color:#8C93A0;font-weight:500}
.tabs{display:flex;gap:2px;margin-left:6px}.tabs span{padding:7px 11px;border-radius:7px;color:#A8AFBC;font-weight:600}.tabs span.on{background:#2A2E36;color:#fff}
.tabs em{font-style:normal;background:#C2412D;color:#fff;font-size:10.5px;border-radius:8px;padding:0 6px;margin-left:5px}
.rt{margin-left:auto;display:flex;align-items:center;gap:10px}.pill{border:1px solid #30343D;border-radius:999px;padding:5px 11px;color:#C9CED8;font-weight:600}
.ask{background:#1F5F4A;color:#fff;border-radius:9px;padding:7px 12px;font-weight:700}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:10.5px;font-weight:700;flex:none}
.ph{display:flex;align-items:center;gap:22px;padding:12px 20px 10px}
.ph h1{margin:0;font:600 22px/1.1 'Outfit',sans-serif;letter-spacing:-.01em}.ph p{margin:3px 0 0;color:#5E636D}
.stat{display:flex;flex-direction:column;gap:1px;padding-left:18px;border-left:1px solid #DEDAD2}.stat small{color:#737884;font-size:11.5px}.stat b{font:600 16px 'Outfit',sans-serif}
.prog{width:120px;height:6px;border-radius:4px;background:#E2DED6;margin-top:5px;overflow:hidden}.prog i{display:block;height:100%;background:#1F5F4A}
.wrap{display:grid;grid-template-columns:924px minmax(0,1fr);gap:14px;padding:0 20px}
.wrap>*{min-width:0}
.card{background:#fff;border:1px solid #E4E0D8;border-radius:14px;overflow:hidden;position:relative}
.ch{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-bottom:1px solid #EEEBE5}.ch h3{margin:0;font:600 14.5px 'Outfit',sans-serif}.ch span{color:#737884;font-size:12px}
.gantt{display:grid;grid-template-columns:220px 672px;padding:0 16px 10px}
.wkh{height:30px;position:relative;border-bottom:1px solid #EEEBE5}.wkh span{position:absolute;top:9px;font:500 10.5px 'JetBrains Mono',monospace;color:#8A8F98}
.lab{position:relative;height:${H}px}.tl{position:absolute;left:0;right:8px;height:${ROW}px;display:flex;align-items:center;gap:8px}.tl .dot{width:7px;height:7px;border-radius:2px;flex:none}
.tl b{display:block;font-size:12.3px;font-weight:700;line-height:1.1;white-space:nowrap}
.sub{position:absolute;font-size:10.5px;color:#7D828C;white-space:nowrap;font-weight:600}.sub.r{text-align:right}.tl small{display:block;color:#7D828C;font-size:10.5px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px}
.tm{position:relative;height:${H}px;background:repeating-linear-gradient(90deg,transparent 0 ${PX - 1}px,#F0EDE7 ${PX - 1}px ${PX}px)}
.tm .wkend{position:absolute;top:0;bottom:0;width:${PX * 2 / 7}px;background:rgba(0,0,0,.018)}
.bar{position:absolute;height:16px;border-radius:5px;background:color-mix(in srgb,var(--c) 18%,#fff);border:1px solid color-mix(in srgb,var(--c) 55%,#fff);overflow:hidden}
.bar i{display:block;height:100%;background:var(--c)}.bar.done{opacity:.55}.bar em{position:absolute;right:6px;top:1px;font:700 10px 'Manrope';color:#fff;font-style:normal}
.bar.sched i{width:0}.bar.risk{background:repeating-linear-gradient(135deg,#FFF6E0 0 6px,#FDEBC0 6px 12px);border-color:#E3A33B}.bar.risk em.wk{left:6px;right:auto;color:#8A5608;font-weight:700}
.ms{position:absolute;width:13px;height:13px;transform:rotate(45deg);background:#fff;border:2px solid #16181D}.ms.ok{background:#1F5F4A;border-color:#1F5F4A}
.msl{position:absolute;font:600 10.5px 'Manrope';color:#5E636D;white-space:nowrap}
.today{position:absolute;top:-30px;bottom:0;width:2px;background:#C2412D;left:${TODAY * PX}px}.today b{position:absolute;bottom:-1px;left:4px;background:#C2412D;color:#fff;font:700 9.5px 'JetBrains Mono';padding:2px 5px;border-radius:4px;white-space:nowrap}
.held{position:absolute;left:${4.7 * PX}px;top:${5 * ROW + 3}px;font:700 9.5px 'Manrope';color:#C2412D;background:#FDECEA;border:1px solid #F3C2BA;border-radius:4px;padding:0 5px;white-space:nowrap}
.legend{display:flex;gap:14px;padding:0 16px 9px;color:#6B707A;font-size:11px}.legend i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px}
.co{padding:10px 16px;display:flex;flex-direction:column;gap:7px}
.coh{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}.coh b{font:600 14px 'Outfit',sans-serif;display:block}.coh small{color:#6B707A}
.st{display:inline-flex;align-items:center;gap:5px;font-weight:700;font-size:11px;border-radius:999px;padding:2px 9px;white-space:nowrap}.st:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.st.amb{background:#FFF1D6;color:#9A5B00}.st.grn{background:#E2F2EA;color:#17603F}.st.red{background:#FDE7E3;color:#B03322}.st.gry{background:#EEF0F3;color:#525965}
.li{display:flex;justify-content:space-between;font-size:12.3px;padding:3px 0;border-bottom:1px dashed #ECE8E1}.li:last-child{border-bottom:0}.li span:last-child{font-family:'JetBrains Mono',monospace}
.tot{display:flex;justify-content:space-between;align-items:center;background:#F6F4F0;border-radius:9px;padding:8px 10px}.tot b{font:600 18px 'Outfit',sans-serif}
.imp1{font-size:12px;color:#5E636D}.imp1 b{color:#1B1D21}
.imp{display:flex;gap:8px}.imp div{flex:1;border:1px solid #ECE8E1;border-radius:8px;padding:6px 9px}.imp small{color:#737884;font-size:11px;display:block}.imp b{font-weight:800}
.trail{display:flex;gap:6px;align-items:center;font-size:11.3px;color:#5E636D}.trail i{width:7px;height:7px;border-radius:50%;background:#1F5F4A;display:inline-block}
.btns{display:flex;gap:8px}.btn{border:1px solid #D8D3CA;background:#fff;border-radius:8px;padding:7px 11px;font-weight:700;font-size:12px}.btn.p{background:#1F5F4A;border-color:#1F5F4A;color:#fff}
.sr{display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:center;padding:5px 16px;border-bottom:1px solid #F0EDE7}
.th{width:38px;height:38px;border-radius:8px;background:#EFEBE4;background-size:cover;background-position:center;display:grid;place-items:center;color:#9A958C;font:700 10px 'JetBrains Mono'}
.th.hex{background:radial-gradient(circle at 50% 50%,#fff 38%,transparent 40%) 0 0/9px 9px,#DCDAD5}
.th.brass{background:linear-gradient(135deg,#8C6A2E,#E8C77B 45%,#A77C34 70%,#F2D99B)}
.th.subway{background:linear-gradient(#C9D6D8 1px,transparent 1px) 0 0/100% 8px,linear-gradient(90deg,#C9D6D8 1px,transparent 1px) 0 0/16px 16px,#EEF4F4;box-shadow:inset 0 0 0 1px #D5E0E1}
.sr b{display:block;font-size:12.5px}.sr small{display:block;color:#737884;font-size:11px}.sr .am{text-align:right;font-family:'JetBrains Mono',monospace;font-size:11.5px}
.sr .am b{font-size:12.3px}.up{color:#B03322}.dn{color:#17603F}
.sfoot{display:flex;justify-content:space-between;padding:7px 16px;font-size:12px;color:#5E636D}
.right{display:flex;flex-direction:column;gap:14px}
.dl{padding:10px 16px;display:flex;flex-direction:column;gap:8px}
.wx{display:flex;gap:8px}.wx div{flex:1;background:#F6F4F0;border-radius:9px;padding:7px 10px}.wx small{display:block;color:#737884;font-size:10.5px}.wx b{font-size:13px}
.photos{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:6px;height:104px}.photos div{border-radius:9px;background-size:cover;background-position:center;position:relative}
.photos span{position:absolute;left:6px;bottom:6px;background:rgba(15,17,21,.72);color:#fff;font-size:10px;font-weight:700;border-radius:5px;padding:1px 6px}
.crew{display:flex;flex-direction:column;gap:4px}.crew div{display:flex;align-items:center;gap:8px;font-size:12px}.crew .av{width:22px;height:22px;font-size:9px}.crew span.h{margin-left:auto;font-family:'JetBrains Mono';font-size:11.5px;color:#5E636D}
.note{font-size:12.3px;color:#33363C;background:#FBFAF7;border-left:3px solid #C2412D;padding:6px 10px;border-radius:0 8px 8px 0}
.br{display:grid;grid-template-columns:150px 1fr 70px 70px;gap:10px;align-items:center;padding:3px 16px;font-size:12px}
.bn{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bt{height:7px;border-radius:4px;background:#EFEBE4;overflow:hidden}.bt i{display:block;height:100%;border-radius:4px}
.ba,.bb{text-align:right;font-family:'JetBrains Mono',monospace;font-size:11.3px}.bb{color:#8A8F98}.ba.over{color:#B03322;font-weight:700}
.bh{display:grid;grid-template-columns:150px 1fr 70px 70px;gap:10px;padding:8px 16px 4px;font:600 10px 'JetBrains Mono';letter-spacing:.06em;color:#8A8F98;text-transform:uppercase}
.btot{display:grid;grid-template-columns:150px 1fr 70px 70px;gap:10px;padding:7px 16px;border-top:1px solid #EEEBE5;font-weight:800;font-size:12px}.btot span{text-align:right;font-family:'JetBrains Mono'}
.segs{display:flex;gap:3px;margin:8px 16px 0;height:10px}.segs i{border-radius:3px;background:#EAE6DF}.segs i.paid{background:#1F5F4A}.segs i.next{background:#F0B54A}
.nextd{display:flex;align-items:center;gap:8px;padding:9px 16px 12px;font-size:12px;flex-wrap:wrap}.nextd b{font-weight:800}.nextd small{color:#737884;width:100%}
.draws{display:flex;gap:4px;padding:10px 16px 12px}.dr{flex:var(--w);border-radius:7px;padding:6px 7px;background:#F1EEE8;min-width:0}
.dr.paid{background:#1F5F4A;color:#fff}.dr.next{background:#FFF1D6;box-shadow:inset 0 0 0 1.5px #E3A33B}
.dr b{display:block;font-size:11.5px;font-family:'JetBrains Mono'}.dr small{display:block;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.85}
`;

  const wkHead = WEEKS.map((w, i) => `<span style="left:${i * PX + 4}px">${w}</span>`).join("");
  const weekends = WEEKS.map((_, i) => `<div class="wkend" style="left:${i * PX - PX * 2 / 7}px"></div>`).join("");

  window.LANDINGS.construction = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap">
<style>${css}</style></head><body>
<header class="top">
  <div class="lg"><i>R</i><div><b>Ridgeline Builders</b><span>BUILD OS</span></div></div>
  <div class="sw">Hollis kitchen + primary bath <small>· 14 Elm St</small></div>
  <nav class="tabs"><span class="on">Schedule</span><span>Daily logs</span><span>Change orders<em>1</em></span><span>Selections<em>1</em></span><span>Budget</span><span>Files</span></nav>
  <div class="rt"><span class="pill">Client view</span><span class="ask">Ask Build OS</span><span class="av" style="background:#B4533A">KM</span></div>
</header>
<section class="ph">
  <div><h1>Hollis kitchen + primary bath remodel</h1><p>Greg &amp; Anna Hollis · 14 Elm St, Denver CO 80220 · PM Kyle Morgan</p></div>
  <div class="stat" style="margin-left:auto"><small>Contract</small><b class="mono" style="font-family:'JetBrains Mono';font-size:15px">${money(CONTRACT)}</b></div>
  <div class="stat"><small>Week 5 of 10 · finish Nov 13</small><b>46% complete</b><div class="prog"><i style="width:46%"></i></div></div>
  <div class="stat"><small>Projected margin</small><b style="color:#17603F">22.1%</b></div>
  <div class="stat"><small>Next client decision</small><b style="color:#9A5B00">Shower tile · Fri</b></div>
</section>
<main class="wrap">
  <div>
    <div class="card">
      <div class="ch"><h3>Schedule</h3><span>13 items · 3 dependencies · drag to reschedule, subs notified</span></div>
      <div class="gantt">
        <div style="height:30px;border-bottom:1px solid #EEEBE5"></div>
        <div class="wkh">${wkHead}</div>
        <div class="lab">${rows.map(r => r.label).join("")}</div>
        <div class="tm">${weekends}
          <svg width="672" height="${H}" style="position:absolute;left:0;top:0;overflow:visible">${deps}</svg>
          ${rows.map(r => r.bar).join("")}
          <div class="held">Bath wall held · CO-04</div>
          <div class="today"><b>TODAY</b></div>
        </div>
      </div>
      <div class="legend"><span><i style="background:#1F5F4A"></i>Ridgeline crew</span><span><i style="background:#2F6FDB"></i>Plumbing</span><span><i style="background:#C98A0B"></i>Electrical</span><span><i style="background:#7A5AE0"></i>Drywall</span><span><i style="background:#B4533A"></i>Stone</span><span><i style="background:#0E8C9A"></i>Tile</span><span><i style="background:#16181D"></i>Inspection</span></div>
    </div>
    <div class="two">
      <div class="card">
        <div class="ch"><h3>Change order CO-04</h3><span class="st amb">Awaiting signature</span></div>
        <div class="co">
          <div class="coh"><div><b>Replace rotted window header, primary bath</b><small>Found during drywall prep · photo in today's log</small></div></div>
          <div><div class="li"><span>Labor · 6 h × $85</span><span>${money(LAB)}</span></div><div class="li"><span>LVL header 2×10, joist hangers, sister joists</span><span>${money(MAT)}</span></div><div class="li"><span>Markup 20%</span><span>${money(MK)}</span></div></div>
          <div class="tot"><span style="font-weight:700">Change order total</span><b class="mono" style="font-family:'JetBrains Mono';font-size:16px">${money(COT)}</b></div>
          <div class="imp1">Schedule impact <b>+1 day</b> · new contract <b class="mono" style="font-family:'JetBrains Mono'">${money(CONTRACT + COT)}</b></div>
          <div class="trail"><i></i>Sent 10:12<i style="background:#2F6FDB"></i>Viewed by Anna 10:40<i style="background:#E3A33B"></i>Signature pending</div>
          <div class="btns"><span class="btn">Resend</span><span class="btn p">Sign on site</span></div>
        </div>
      </div>
      <div class="card">
        <div class="ch"><h3>Selections</h3><span>vs allowances</span></div>
        ${sel.map(([n, d, al, act, s, k, img]) => `<div class="sr"><div class="th ${img.startsWith("sw:") ? img.slice(3) : ""}" style="${img && !img.startsWith("sw:") ? `background-image:url(img/construction/${img})` : ""}"></div><div><b>${n}</b><small>${d}</small><span class="st ${k === "ok" ? "grn" : "amb"}" style="margin-top:3px">${s}</span></div><div class="am"><small style="color:#8A8F98">Allow. ${money(al)}</small><br>${act == null ? `<b style="color:#9A5B00">pending</b>` : `<b>${money(act)}</b> <span class="${act > al ? "up" : "dn"}">${act > al ? "+" : "−"}${money(Math.abs(act - al))}</span>`}</div></div>`).join("")}
        <div class="sfoot"><span>Net vs allowances so far</span><b class="up mono" style="font-family:'JetBrains Mono'">+${money(selNet)}</b></div>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="card">
      <div class="ch"><h3>Daily log · Mon 5 Oct</h3><span class="st grn">Shared with client</span></div>
      <div class="dl">
        <div class="wx"><div><small>Weather · 7 am</small><b>58°F partly cloudy</b></div><div><small>Wind / precip</small><b>8 mph · 0%</b></div><div><small>Delays</small><b>None</b></div></div>
        <div class="photos"><div style="background-image:url(img/construction/bath-demo.jpg)"><span>Bath ceiling · rough-in</span></div><div style="background-image:url(img/construction/drywall.jpg)"><span>Window wall</span></div><div style="background-image:url(img/construction/cabinets.jpg)"><span>Cabinets</span></div></div>
        <div class="note">Board hung in kitchen, bath ceiling taped. Rot found at the bath window header, wall left open until CO-04 is signed.</div>
        <div class="crew"><div><span class="av" style="background:#7A5AE0">FR</span>Front Range Drywall · 3 crew<span class="h">24.0 h</span></div><div><span class="av" style="background:#1F5F4A">RB</span>Ridgeline crew · 2<span class="h">15.5 h</span></div><div><span class="av" style="background:#16181D">KM</span>Kyle Morgan · site visit 2:10 pm<span class="h">1.0 h</span></div></div>
      </div>
    </div>
    <div class="card">
      <div class="ch"><h3>Budget vs actual</h3><span>job cost to date</span></div>
      <div class="bh"><span>Cost code</span><span></span><span style="text-align:right">Actual</span><span style="text-align:right">Budget</span></div>
      ${budgetRows}
      <div class="btot"><span>8 cost codes</span><span></span><span>${money(aSum)}</span><span>${money(bSum)}</span></div>
      <div class="ch" style="border-top:1px solid #EEEBE5;border-bottom:0;padding-bottom:0"><h3 style="font-size:13px">Draw schedule</h3><span>${money(CONTRACT * 0.35)} collected</span></div>
      <div class="segs">${draws.map(([n, p, st, k]) => `<i class="${k}" style="flex:${p}"></i>`).join("")}</div>
      <div class="nextd"><span class="st amb">Next draw</span><b>Drywall complete · 25% · ${money(CONTRACT * 0.25)}</b><small>Invoice on completion, about Fri 9 Oct</small></div>
    </div>
    </div>
  </div>
</main>
</body></html>`;
})();
