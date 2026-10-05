// Niche-specific dummy app screens, rendered into <iframe srcdoc> previews.
(function () {
  const TONE = {
    green: ["#DDF3E6", "#16723F"], amber: ["#FBEFD6", "#8E5B08"], red: ["#FBE2DF", "#B02E24"], blue: ["#E2EAFC", "#1F4FBF"], grey: ["#ECEFF3", "#4F5868"]
  };
  const WORDS = {
    green: ["paid", "confirmed", "active", "delivered", "done", "present", "completed", "sold", "approved", "checked in", "in stock", "won", "filed", "seated", "ready", "occupied", "clean", "on time"],
    amber: ["pending", "due", "waiting", "in progress", "prep", "draft", "late", "low stock", "review", "viewing", "cooking", "arriving", "partial", "renewal", "trial"],
    red: ["overdue", "failed", "absent", "cancelled", "urgent", "out of stock", "no-show", "expired", "delayed"],
    blue: ["scheduled", "new", "booked", "listed", "sent", "open", "in transit", "offer", "enrolled", "upcoming", "quoted"]
  };
  function tone(s) {
    const l = String(s).toLowerCase();
    for (const k of Object.keys(WORDS)) if (WORDS[k].some(w => l.startsWith(w))) return TONE[k];
    return TONE.grey;
  }
  const chip = s => { const [bg, fg] = tone(s); return `<span class="chip" style="background:${bg};color:${fg}">${s}</span>`; };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function css(a) {
    return `*{box-sizing:border-box}body{margin:0;font:14px/1.45 'Instrument Sans',Helvetica,Arial,sans-serif;color:#151922;background:#F4F5F7;width:1440px;height:900px;overflow:hidden}
.app{display:grid;grid-template-columns:232px 1fr;height:900px}
.sb{background:#fff;border-right:1px solid #E3E6EB;padding:18px 14px;display:flex;flex-direction:column;gap:4px}
.brand{display:flex;align-items:center;gap:10px;padding:4px 8px 18px}.brand i{width:34px;height:34px;border-radius:9px;background:${a};display:grid;place-items:center;color:#fff;font:700 16px 'Bricolage Grotesque',sans-serif;font-style:normal}.brand b{font-size:15px;display:block;line-height:1.2}.brand span{font-size:12px;color:#7A8292}
.nav{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:#4A5160;font-weight:500}.nav.on{background:${a}18;color:${a};font-weight:700}.nav em{width:16px;height:16px;border-radius:5px;border:1.8px solid currentColor;opacity:.7;flex:none}
.nav .n{margin-left:auto;font-style:normal;font-size:11px;background:${a};color:#fff;border-radius:9px;padding:0 7px;line-height:18px}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:10px;border-top:1px solid #EDEFF2;font-size:13px}.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.main{display:flex;flex-direction:column;min-width:0}
.top{height:64px;background:#fff;border-bottom:1px solid #E3E6EB;display:flex;align-items:center;gap:14px;padding:0 28px}.top h1{font:700 22px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em;margin:0}
.search{margin-left:auto;width:320px;border:1px solid #E3E6EB;background:#F7F8FA;border-radius:9px;padding:8px 12px;color:#8A92A1}
.btn{background:${a};color:#fff;border-radius:9px;padding:9px 14px;font-weight:700;white-space:nowrap}
.page{padding:22px 28px;display:flex;flex-direction:column;gap:16px;flex:1;min-height:0}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.kpi{background:#fff;border:1px solid #E3E6EB;border-radius:12px;padding:14px 16px}.kpi p{margin:0;color:#7A8292;font-size:12.5px}.kpi b{display:block;font:700 26px 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;margin-top:4px}.kpi s{text-decoration:none;font-size:12px;font-weight:700;color:#16723F}
.cols{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:14px;flex:1;min-height:0}
.card{background:#fff;border:1px solid #E3E6EB;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-height:0}.ch{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;font-weight:700;border-bottom:1px solid #EDEFF2}.ch span{font-weight:500;color:#7A8292;font-size:12.5px}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#7A8292;padding:9px 16px;background:#F8F9FB;border-bottom:1px solid #EDEFF2;font-weight:600}td{padding:11px 16px;border-bottom:1px solid #F0F1F4}td.r{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.chip{display:inline-block;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:700;white-space:nowrap}
.li{display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid #F0F1F4}.li b{display:block;font-size:13.5px}.li small{color:#7A8292;font-size:12px}.li .v{margin-left:auto;font-weight:700;font-variant-numeric:tabular-nums}
.cal{display:grid;grid-template-columns:56px repeat(5,1fr);flex:1;position:relative}.cal .h{font-size:12px;color:#7A8292;padding:8px;border-bottom:1px solid #EDEFF2;font-weight:600}.cal .t{font-size:11px;color:#9AA1AE;padding:4px 8px;border-right:1px solid #EDEFF2}
.ev{position:absolute;border-radius:8px;padding:6px 8px;font-size:12px;overflow:hidden;border-left:3px solid}.ev b{display:block;font-size:12.5px}
.kan{display:grid;gap:12px;padding:14px;flex:1}.kc{background:#F6F7F9;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}.kc h4{margin:0 0 2px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#7A8292;display:flex;justify-content:space-between}
.kt{background:#fff;border:1px solid #E3E6EB;border-radius:9px;padding:10px;border-left:3px solid ${a}}.kt b{display:block;font-size:13px}.kt small{color:#7A8292}.kt .v{font-weight:700;font-size:13px;margin-top:4px}
.chart{display:flex;align-items:flex-end;gap:10px;padding:18px 18px 8px;height:230px}.chart i{flex:1;border-radius:6px 6px 0 0;background:${a}33}.chart i.hi{background:${a}}.months{display:flex;gap:10px;padding:0 18px 12px;font-size:11px;color:#9AA1AE}.months span{flex:1;text-align:center}
.map{flex:1;position:relative;background:#EAEDE7;min-height:300px}.road{position:absolute;background:#fff}.pin{position:absolute;width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;box-shadow:0 2px 6px rgba(0,0,0,.2)}.pin b{transform:rotate(45deg);color:#fff;font-size:11px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:14px}.tile{border:1px solid #E3E6EB;border-radius:10px;overflow:hidden}.tile .img{height:120px;display:grid;place-items:center;font-size:12px;color:#6B7280;font-weight:600}.tile .tb{padding:10px}.tile b{display:block;font-size:13.5px}.tile small{color:#7A8292}.tile .p{font-weight:700;margin-top:4px;display:flex;justify-content:space-between;align-items:center}
.lane{display:grid;grid-template-columns:150px 1fr;border-bottom:1px solid #F0F1F4;height:62px}.lane .who{display:flex;align-items:center;gap:8px;padding:0 12px;font-size:13px;font-weight:600}.lane .tr{position:relative}.blk{position:absolute;top:9px;bottom:9px;border-radius:8px;padding:5px 8px;font-size:11.5px;overflow:hidden;border:1px solid}.blk b{display:block}
.msg{max-width:72%;padding:9px 12px;border-radius:12px;font-size:13px;background:#F1F3F6}.msg.me{align-self:flex-end;background:${a};color:#fff}
.ring{width:150px;height:150px;border-radius:50%;display:grid;place-items:center}.ring div{width:112px;height:112px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center}`;
  }

  const AV = ["#2259D6", "#0E7C86", "#8A5608", "#6A4FD0", "#B24207", "#16723F"];
  const ini = n => n.split(" ").map(x => x[0]).slice(0, 2).join("");

  function widget(w, a) {
    if (w.type === "table") {
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><table><tr>${w.cols.map(c => `<th>${c}</th>`).join("")}</tr>${w.rows.map(r => `<tr>${r.map((c, i) => i === w.chip ? `<td>${chip(c)}</td>` : i === w.num ? `<td class="r">${c}</td>` : i === 0 ? `<td><b>${esc(c)}</b></td>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
    }
    if (w.type === "calendar") {
      const days = w.days, top = 37, hour = 60, colW = `((100% - 56px) / 5)`;
      const rows = Array.from({ length: 9 }, (_, i) => `<div class="t" style="height:${hour}px">${8 + i}:00</div><div style="grid-column:2/7;height:${hour}px;border-bottom:1px solid #F3F4F6"></div>`).join("");
      const pal = [a, "#0E7C86", "#6A4FD0", "#B24207", "#2259D6"];
      const ev = w.events.map(([d, s, l, t, sub, ci]) => { const c = pal[ci || 0]; return `<div class="ev" style="left:calc(56px + ${colW} * ${d} + 4px);width:calc(${colW} - 8px);top:${top + (s - 8) * hour + 2}px;height:${l * hour - 4}px;background:${c}14;border-color:${c};color:#151922"><b>${t}</b><span style="color:#5A6272">${sub}</span></div>`; }).join("");
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="cal"><div class="h" style="height:${top}px"></div>${days.map(d => `<div class="h" style="height:${top}px">${d}</div>`).join("")}${rows}${ev}</div></div>`;
    }
    if (w.type === "kanban") {
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="kan" style="grid-template-columns:repeat(${w.cols.length},1fr)">${w.cols.map(c => `<div class="kc"><h4>${c.t}<span>${c.v || c.cards.length}</span></h4>${c.cards.map(k => `<div class="kt"><b>${k[0]}</b><small>${k[1]}</small>${k[2] ? `<div class="v">${k[2]}</div>` : ""}</div>`).join("")}</div>`).join("")}</div></div>`;
    }
    if (w.type === "chart") {
      const max = Math.max(...w.values);
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="chart">${w.values.map((v, i) => `<i class="${i === w.values.length - 1 ? "hi" : ""}" style="height:${Math.round(v / max * 100)}%"></i>`).join("")}</div><div class="months">${w.labels.map(l => `<span>${l}</span>`).join("")}</div>${w.table ? `<table><tr>${w.table.cols.map(c => `<th>${c}</th>`).join("")}</tr>${w.table.rows.map(r => `<tr>${r.map((c, i) => i === w.table.chip ? `<td>${chip(c)}</td>` : i === 0 ? `<td><b>${c}</b></td>` : `<td>${c}</td>`).join("")}</tr>`).join("")}</table>` : ""}</div>`;
    }
    if (w.type === "map") {
      const pins = w.pins.map(([x, y, l, c]) => `<div class="pin" style="left:${x}%;top:${y}%;background:${c || a}"><b>${l}</b></div>`).join("");
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="map"><div class="road" style="left:0;right:0;top:46%;height:14px"></div><div class="road" style="top:0;bottom:0;left:38%;width:14px"></div><div class="road" style="top:0;bottom:0;left:72%;width:10px"></div><div class="road" style="left:0;right:0;top:78%;height:9px"></div><div style="position:absolute;left:14%;top:12%;width:18%;height:22%;background:#D7E6CF;border-radius:12px"></div><div style="position:absolute;left:80%;top:8%;width:16%;height:30%;background:#CFE0EE;border-radius:40%"></div>${pins}</div></div>`;
    }
    if (w.type === "tiles") {
      const tints = ["#F4E3D7", "#DDE8F6", "#E3F0DD", "#F2E2EC", "#EFE9D6", "#E2E4F4"];
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="tiles">${w.tiles.map((t, i) => `<div class="tile"><div class="img" style="background:${tints[i % 6]}">${t[3] || ""}</div><div class="tb"><b>${t[0]}</b><small>${t[1]}</small><div class="p">${t[2]}${t[4] ? chip(t[4]) : ""}</div></div></div>`).join("")}</div></div>`;
    }
    if (w.type === "lanes") {
      const hrs = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5"];
      return `<div class="card"><div class="ch">${w.title}<span>${w.note || ""}</span></div><div class="lane" style="height:34px;background:#F8F9FB"><div></div><div style="display:flex;align-items:center;font-size:11px;color:#9AA1AE">${hrs.map(h => `<span style="flex:1">${h}</span>`).join("")}</div></div>${w.lanes.map((ln, i) => `<div class="lane"><div class="who"><span class="av" style="background:${AV[i % 6]}">${ini(ln[0])}</span>${ln[0]}</div><div class="tr">${ln[1].map(([l, wd, t, s, st]) => { const [bg, fg] = tone(st || "scheduled"); return `<div class="blk" style="left:${l}%;width:${wd}%;background:${bg};border-color:${fg}55;color:#151922"><b>${t}</b>${s}</div>`; }).join("")}</div></div>`).join("")}</div>`;
    }
    if (w.type === "chat") {
      return `<div class="card" style="display:grid;grid-template-columns:260px 1fr"><div style="border-right:1px solid #EDEFF2">${w.threads.map((t, i) => `<div class="li" style="${i === 0 ? `background:${a}10` : ""}"><span class="av" style="background:${AV[i % 6]}">${ini(t[0])}</span><div><b>${t[0]}</b><small>${t[1]}</small></div></div>`).join("")}</div><div style="display:flex;flex-direction:column;gap:10px;padding:16px">${w.msgs.map(([me, t]) => `<div class="msg${me ? " me" : ""}">${t}</div>`).join("")}</div></div>`;
    }
    return "";
  }

  function side(s, a) {
    if (!s) return "";
    if (s.ring) {
      return `<div class="card"><div class="ch">${s.title}</div><div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px"><div class="ring" style="background:conic-gradient(${a} 0 ${s.ring}%, #ECEFF3 ${s.ring}% 100%)"><div><b style="font:700 28px 'Bricolage Grotesque'">${s.ring}%</b><br><small style="color:#7A8292">${s.ringLabel}</small></div></div></div>${s.items.map(it => li(it)).join("")}</div>`;
    }
    return `<div class="card"><div class="ch">${s.title}<span>${s.note || ""}</span></div>${s.items.map(it => li(it)).join("")}</div>`;
  }
  function li([t, sub, v, c], i) {
    return `<div class="li"><span class="av" style="background:${AV[(t.length) % 6]}">${ini(t)}</span><div><b>${t}</b><small>${sub}</small></div>${c ? `<span class="v">${chip(c)}</span>` : `<span class="v">${v || ""}</span>`}</div>`;
  }

  window.renderMiniApp = function (s) {
    const a = s.accent;
    return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Instrument+Sans:wght@400;500;600;700&display=swap"><style>${css(a)}</style></head><body>
<div class="app"><aside class="sb"><div class="brand"><i>${s.brand[0]}</i><div><b>${s.brand}</b><span>${s.place}</span></div></div>
${s.nav.map((n, i) => `<div class="nav${i === 0 ? " on" : ""}"><em></em>${n}${i === 1 && s.badge ? `<i class="n">${s.badge}</i>` : ""}</div>`).join("")}
<div class="me"><span class="av" style="background:${a}">${ini(s.user)}</span><div><b>${s.user}</b><br><small style="color:#7A8292">${s.role}</small></div></div></aside>
<div class="main"><div class="top"><h1>${s.title}</h1><div class="search">Search ${s.searchHint}…</div><div class="btn">+ ${s.cta}</div></div>
<div class="page"><div class="kpis">${s.kpis.map(([l, v, d]) => `<div class="kpi"><p>${l}</p><b>${v}</b>${d ? `<s>${d}</s>` : ""}</div>`).join("")}</div>
<div class="cols">${widget(s.main, a)}${side(s.side, a)}</div></div></div></div></body></html>`;
  };

  // ---------------- per-niche specs ----------------
  window.MINI_SPECS = {
    field: { brand: "Summit Heating & Plumbing", place: "Job OS", accent: "#E4540E", user: "Maria Alvarez", role: "Owner", title: "Schedule · Thu 1 Oct", searchHint: "jobs, customers", cta: "New job", badge: 6,
      nav: ["Schedule", "Inbox", "Customers", "Quotes", "Jobs", "Invoices", "Plans", "Reports"],
      kpis: [["Visits today", "14", "5 techs out"], ["Booked by AI overnight", "3", "+$1,840"], ["Quotes waiting", "$38.6k", "9 quotes"], ["Unpaid", "$11.4k", ""]],
      main: { type: "lanes", title: "Dispatch board", note: "drag to assign", lanes: [
        ["Sam Carter", [[0, 20, "Linda Park", "AC repair", "late"], [24, 18, "Diaz", "Tune-up", "scheduled"], [48, 26, "Kim Dental", "RTU service", "scheduled"]]],
        ["Dev Patel", [[6, 20, "Greg Hollis", "Furnace tune-up", "in progress"], [30, 15, "Moss", "Duct fix", "done"], [60, 22, "Raj Patel", "No heat · urgent", "urgent"]]],
        ["Luis Romero", [[0, 60, "Ana Ruiz", "Water heater install", "in progress"], [64, 20, "Lee", "Drain", "scheduled"]]],
        ["Jess Kim", [[36, 24, "Oak Hill Dental", "Panel inspection", "scheduled"], [66, 14, "Ortiz", "Outlet", "scheduled"]]],
        ["Tom Baker", [[8, 30, "Ruiz (assist)", "Install", "in progress"]]]] },
      side: { title: "Unscheduled", note: "5", items: [["Raj Patel", "No heat · emergency", "", "Urgent"], ["Comfort Club", "12 tune-ups due", "", "Due"], ["Hughes", "Thermostat · 1h", "$180"], ["Tate", "Drain clog · 1.5h", "$225"]] } },

    auto: { brand: "Brazos & Pine Motors", place: "Dealer OS", accent: "#2F6BFF", user: "Chris Ortega", role: "Dealer principal", title: "Stock", searchHint: "VIN, make, model", cta: "Add car (scan VIN)", badge: 11,
      nav: ["Stock", "Leads", "Get it ready", "Publish", "Deals", "Customers", "Reports"],
      kpis: [["Cars in stock", "64", "8 need photos"], ["Avg days on lot", "31", "−4 vs last month"], ["Leads this week", "87", "+22%"], ["Gross this month", "$142k", "+$18k"]],
      main: { type: "tiles", title: "Inventory", note: "64 cars · 3 channels", tiles: [["2019 Honda Civic EX", "41k mi · Silver", "$18,900", "Photo", "Listed"], ["2021 Toyota RAV4 XLE", "28k mi · Blue", "$27,400", "Photo", "Listed"], ["2017 Ford F-150 XLT", "76k mi · Black", "$24,750", "Photo", "Prep"], ["2020 Tesla Model 3", "33k mi · White", "$26,200", "Photo", "Sold"], ["2018 Jeep Wrangler", "58k mi · Red", "$25,990", "Photo", "Listed"], ["2022 Kia Telluride", "19k mi · Grey", "$38,500", "Photo", "Review"]] },
      side: { title: "New leads", items: [["Aisha Brown", "2019 Civic · Is it available?", "", "New"], ["Mark Lee", "RAV4 · test drive Sat", "", "Booked"], ["J. Gomez", "F-150 · trade-in offer", "", "Offer"], ["Priya S.", "Model 3 · financing", "", "Pending"]] } },

    repair: { brand: "Fixwell Auto Care", place: "Phoenix, AZ", accent: "#1C8FD6", user: "Dana Reyes", role: "Service manager", title: "Workflow · Today", searchHint: "plate, customer", cta: "New repair order", badge: 4,
      nav: ["Workflow", "Approvals", "Calendar", "Inspections", "Parts", "Invoices", "Customers"],
      kpis: [["Cars in shop", "12", "4 bays busy"], ["Awaiting approval", "$6,420", "5 estimates"], ["Avg ticket", "$612", "+8%"], ["Car count (week)", "58", ""]],
      main: { type: "kanban", title: "Repair orders", cols: [
        { t: "Inspecting", cards: [["2016 Camry · KX3 921", "Brakes noise · Bay 1", ""], ["2019 Civic · LPZ 448", "Check engine", ""]] },
        { t: "Awaiting approval", cards: [["2014 F-150 · 7HG 202", "Front pads + rotors", "$684"], ["2020 CR-V · 2NB 551", "Timing belt", "$1,120"]] },
        { t: "In progress", cards: [["2018 Altima · 8DW 773", "AC recharge · Bay 3", "$240"], ["2015 Tahoe · 4RT 110", "Water pump · Bay 4", "$890"]] },
        { t: "Ready", cards: [["2021 Model Y · EV 9921", "Tyre rotation", "$89"]] }] },
      side: { title: "Text approvals", items: [["Sam Ortiz", "F-150 brakes · sent 10:12", "", "Waiting"], ["Mia Chen", "CR-V timing belt", "", "Approved"], ["Ravi Kapoor", "Wipers + filter", "", "Approved"], ["Jo Hart", "Battery replacement", "", "Viewing"]] } },

    clinic: { brand: "Riverbend Physio", place: "Leeds, UK", accent: "#0E8C8A", user: "Dr. Hannah Cole", role: "Clinic director", title: "Appointments · This week", searchHint: "patients", cta: "Book appointment", badge: 3,
      nav: ["Calendar", "Patients", "Notes", "Billing", "Forms", "Reminders", "Reports"],
      kpis: [["Appointments this week", "186", "92% booked"], ["New patients", "23", "+5"], ["No-show rate", "3.1%", "−1.2 pts"], ["Outstanding claims", "£4,280", ""]],
      main: { type: "calendar", title: "Dr. Cole · Room 2", note: "Mon 28 Sep – Fri 2 Oct", days: ["Mon 28", "Tue 29", "Wed 30", "Thu 1", "Fri 2"], events: [
        [0, 9, 1, "James Wright", "Knee rehab · follow-up", 0], [0, 11, 1, "Priya Shah", "Initial assessment", 1], [1, 8, 1, "Tom Baker", "Lower back", 0], [1, 10, 2, "Group class", "Pilates rehab (6)", 2],
        [2, 9, 1, "Emma Lloyd", "Shoulder · session 4", 0], [2, 13, 1, "Lunch & notes", "", 3], [3, 8, 1, "Olivia Grant", "Sports massage", 1], [3, 10, 1, "Noah Patel", "ACL · week 6", 0],
        [3, 14, 1, "Ella Moore", "Post-op ankle", 0], [4, 9, 2, "Clinic audit", "", 3], [4, 12, 1, "Ben Howard", "Neck pain · new", 1], [1, 14, 1, "Sara Ali", "Telehealth review", 4]] },
      side: { title: "Today's patients", items: [["Olivia Grant", "08:00 · Sports massage", "", "Checked in"], ["Noah Patel", "10:00 · ACL rehab", "", "Arriving"], ["Ella Moore", "14:00 · Post-op ankle", "", "Confirmed"], ["Liam Ford", "16:00 · New patient", "", "Pending"]] } },

    property: { brand: "Keystone Lettings", place: "Manchester, UK", accent: "#3E8E2F", user: "Adam Price", role: "Property manager", title: "Rent roll · October", searchHint: "units, tenants", cta: "New lease", badge: 7,
      nav: ["Rent roll", "Maintenance", "Units", "Tenants", "Leases", "Owners", "Reports"],
      kpis: [["Units", "248", "96% occupied"], ["Rent due (Oct)", "£212k", "81% collected"], ["Open requests", "17", "4 urgent"], ["Leases renewing", "12", "next 60 days"]],
      main: { type: "table", title: "Rent this month", note: "248 units", chip: 4, num: 3, cols: ["Tenant", "Unit", "Due", "Amount", "Status"], rows: [
        ["Laura Kent", "14B Ancoats Mill", "1 Oct", "£1,150", "Paid"], ["Omar Haddad", "3 Castlefield Quay", "1 Oct", "£1,480", "Paid"], ["Grace Wu", "22 Northern Quarter", "1 Oct", "£980", "Partial"],
        ["Daniel Moss", "7A Didsbury Rd", "1 Oct", "£1,250", "Overdue"], ["Chloe Evans", "11 Salford Wharf", "5 Oct", "£1,320", "Due"], ["Ivan Petrov", "9 Chorlton Pl", "5 Oct", "£890", "Due"], ["Fatima Noor", "2 Spinningfields", "1 Oct", "£2,100", "Paid"]] },
      side: { title: "Maintenance", items: [["Leak under sink", "Unit 14B · plumber booked", "", "Scheduled"], ["Boiler no heat", "7A Didsbury · since 7am", "", "Urgent"], ["Broken blind", "22 NQ", "", "Pending"], ["Smoke alarm test", "Building 3", "", "Done"]] } },

    realestate: { brand: "Harbor & Vine Realty", place: "San Diego, CA", accent: "#C68A12", user: "Nina Alvarez", role: "Broker", title: "Pipeline", searchHint: "leads, listings", cta: "New lead", badge: 9,
      nav: ["Pipeline", "Leads", "Listings", "Viewings", "Offers", "Contacts", "Reports"],
      kpis: [["Active leads", "142", "+19 this week"], ["Viewings this week", "28", ""], ["Under offer", "$6.8M", "7 homes"], ["Closed (Q3)", "$14.2M", "+12%"]],
      main: { type: "kanban", title: "Buyer pipeline", cols: [
        { t: "New", cards: [["Kevin & Ana Liu", "Zillow · 3bd under $1.2M", ""], ["Marcus Bell", "Website · condo downtown", ""]] },
        { t: "Viewing", cards: [["The Okafors", "Sat 11:00 · 418 Laurel St", "$1.15M"], ["Jen Park", "Sun 14:00 · 22 Bay View", "$890k"]] },
        { t: "Offer", cards: [["Dev Sharma", "Offer sent · 9 Coral Way", "$1.32M"]] },
        { t: "Closing", cards: [["Sophie Grant", "Escrow · 61 Sunset Cliffs", "$2.05M"], ["Tom & Ria", "Inspection done", "$760k"]] }] },
      side: { title: "Today's viewings", items: [["418 Laurel St", "3bd · 11:00 · The Okafors", "", "Confirmed"], ["22 Bay View #4", "2bd · 14:00 · Jen Park", "", "Booked"], ["77 Juniper Ave", "4bd · 16:30 · open house", "", "Upcoming"]] } },

    erp: { brand: "Oak & Iron Furniture", place: "Ghent, Belgium", accent: "#9A6B3F", user: "Pieter Claes", role: "Operations", title: "Production & stock", searchHint: "SKUs, orders", cta: "New order", badge: 5,
      nav: ["Overview", "Orders", "Production", "Inventory", "Purchasing", "Customers", "Reports"],
      kpis: [["Open B2B orders", "38", "€112k"], ["In production", "14 runs", "3 due today"], ["Low stock SKUs", "9", ""], ["On-time delivery", "96%", "+2 pts"]],
      main: { type: "chart", title: "Units produced", note: "last 12 months", values: [410, 460, 430, 520, 580, 610, 590, 640, 700, 680, 720, 790], labels: ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"],
        table: { chip: 3, cols: ["SKU", "Item", "On hand", "Status"], rows: [["OI-2041", "Oak dining table 180cm", "12", "In stock"], ["OI-1108", "Steel frame chair", "4", "Low stock"], ["OI-3302", "Walnut sideboard", "0", "Out of stock"]] } },
      side: { title: "Production runs", items: [["Run #882", "Dining tables × 24", "", "In progress"], ["Run #883", "Chairs × 120", "", "Scheduled"], ["Run #879", "Sideboards × 10", "", "Delayed"], ["Run #877", "Benches × 30", "", "Done"]] } },

    fleet: { brand: "Swift Couriers", place: "Rotterdam, NL", accent: "#1A86C9", user: "Lotte de Vries", role: "Dispatcher", title: "Live map", searchHint: "orders, drivers", cta: "New delivery", badge: 12,
      nav: ["Live map", "Orders", "Drivers", "Routes", "Proof of delivery", "Invoices", "Reports"],
      kpis: [["Deliveries today", "412", "86% done"], ["On-time", "97.4%", ""], ["Drivers on road", "18", "2 on break"], ["Exceptions", "5", ""]],
      main: { type: "map", title: "Rotterdam · live", note: "updated 10s ago", pins: [[20, 36, "1", "#16723F"], [34, 58, "2"], [52, 30, "3"], [66, 66, "4", "#B02E24"], [76, 40, "5"], [44, 74, "6", "#16723F"], [86, 22, "7"]] },
      side: { title: "Drivers", items: [["Jeroen Bakker", "Route 4 · 31/40 stops", "", "On time"], ["Sanne Visser", "Route 7 · 18/35", "", "In transit"], ["Ahmed Ziani", "Route 2 · stop 22", "", "Delayed"], ["Mila Jansen", "Route 9 · back at depot", "", "Delivered"]] } },

    construction: { brand: "Ridgeline Builders", place: "Denver, CO", accent: "#D46A1B", user: "Kyle Morgan", role: "Project lead", title: "Projects", searchHint: "projects, subs", cta: "New estimate", badge: 3,
      nav: ["Projects", "Schedule", "Estimates", "Site diary", "Subcontractors", "Variations", "Invoices"],
      kpis: [["Active projects", "9", "$2.4M value"], ["Billed to date", "$1.38M", "57%"], ["Open variations", "6", "$48k"], ["Subs on site today", "14", ""]],
      main: { type: "lanes", title: "Kitchen + bath remodel · 14 Elm", note: "week 6 of 10", lanes: [
        ["Demo & framing", [[0, 30, "Framing", "Done", "done"]]], ["Plumbing (sub)", [[22, 26, "Rough-in", "Apex Plumbing", "done"], [70, 14, "Fit-off", "", "scheduled"]]],
        ["Electrical (sub)", [[30, 24, "Rough-in", "Volt Bros", "in progress"]]], ["Drywall", [[52, 20, "Hang & tape", "", "scheduled"]]], ["Cabinets", [[72, 26, "Install", "Delivery Thu", "pending"]]]] },
      side: { title: "Site diary · today", items: [["Inspection passed", "Rough plumbing · 9:40", "", "Approved"], ["Variation #4", "Extra outlet island · $640", "", "Pending"], ["Delivery", "Drywall 60 sheets", "", "Delivered"], ["Photo log", "12 new photos", "12"]] } },

    restaurant: { brand: "Saffron Table", place: "London, UK", accent: "#C8402E", user: "Arjun Mehta", role: "Owner", title: "Service · Friday dinner", searchHint: "orders, tables", cta: "New order", badge: 8,
      nav: ["Service", "Orders", "Bookings", "Menu", "Kitchen display", "Stock", "Reports"],
      kpis: [["Covers tonight", "164", "92% booked"], ["Online orders", "48", "£1,920"], ["Avg spend", "£38.40", "+£2.10"], ["Low stock", "3 items", ""]],
      main: { type: "tiles", title: "Live orders", note: "kitchen display", tiles: [["Table 12 · 4 covers", "Butter chicken, 2 naan, dal", "£68.50", "#1042", "Cooking"], ["Deliveroo #A82", "Lamb biryani ×2", "£31.00", "#1043", "Ready"], ["Table 4 · 2 covers", "Paneer tikka, rotis", "£42.00", "#1044", "Seated"], ["Pickup · Sam", "Thali for two", "£36.00", "#1045", "Cooking"], ["Table 9 · 6 covers", "Set menu", "£174.00", "#1046", "New"], ["Uber Eats #U31", "Chicken korma", "£16.50", "#1047", "Ready"]] },
      side: { title: "Bookings · tonight", items: [["Patel, party of 6", "19:30 · Table 9", "", "Seated"], ["Hughes", "20:00 · Table 2", "", "Confirmed"], ["Okoro", "20:15 · 4 covers", "", "Arriving"], ["Walk-in waitlist", "3 parties", "~20 min"]] } },

    hotel: { brand: "The Linden House", place: "Lisbon, PT", accent: "#7A5AF0", user: "Inês Costa", role: "General manager", title: "Front desk · Today", searchHint: "guests, rooms", cta: "New booking", badge: 5,
      nav: ["Front desk", "Calendar", "Bookings", "Housekeeping", "Rates", "Guests", "Reports"],
      kpis: [["Occupancy tonight", "91%", "29 / 32 rooms"], ["Arrivals", "11", ""], ["ADR", "€168", "+€12"], ["Direct bookings", "46%", "+9 pts"]],
      main: { type: "table", title: "Arrivals & departures", note: "Thu 1 Oct", chip: 4, num: 3, cols: ["Guest", "Room", "Nights", "Total", "Status"], rows: [["Sophie Martin", "204 · Deluxe", "3", "€612", "Arriving"], ["Kenji Watanabe", "112 · Garden", "2", "€318", "Checked in"], ["The Okonkwos", "301 · Suite", "5", "€1,840", "Confirmed"], ["Laura Bianchi", "208 · Double", "1", "€149", "Checked in"], ["Mark & Ella Ross", "105 · Twin", "4", "€596", "Confirmed"], ["David Kim", "210 · Double", "2", "€298", "No-show"]] },
      side: { title: "Housekeeping", items: [["Room 204", "Checkout clean · Ana", "", "In progress"], ["Room 301", "Suite turn-down", "", "Scheduled"], ["Room 112", "", "", "Clean"], ["Room 210", "Maintenance: AC", "", "Pending"]] } },

    salon: { brand: "Bloom Hair Studio", place: "Toronto, CA", accent: "#D8457C", user: "Chloé Martin", role: "Owner", title: "Calendar · Today", searchHint: "clients, services", cta: "New appointment", badge: 4,
      nav: ["Calendar", "Clients", "Services", "Packages", "Staff", "Retail", "Reports"],
      kpis: [["Appointments today", "38", "4 stylists"], ["Revenue today", "$3,240", "+14%"], ["Rebook rate", "71%", ""], ["Retail sales", "$410", ""]],
      main: { type: "calendar", title: "Stylists", note: "Thu 1 Oct", days: ["Chloé", "Maya", "Jordan", "Lea", "Sam"], events: [
        [0, 9, 2, "Rachel K.", "Balayage + cut", 0], [0, 12, 1, "Tina L.", "Blow-dry", 0], [1, 9, 1, "Omar S.", "Men's cut", 1], [1, 10, 2, "Grace P.", "Colour correction", 1], [2, 9, 1, "Ivy C.", "Gel manicure", 2],
        [2, 11, 1, "Nora B.", "Pedicure", 2], [3, 10, 3, "Bridal trial", "Hair + makeup", 3], [4, 9, 1, "Lucas M.", "Fade", 4], [4, 13, 1, "Zoe R.", "Root touch-up", 4], [0, 14, 2, "Mia T.", "Keratin", 0], [1, 14, 1, "Ben H.", "Beard trim", 1]] },
      side: { title: "Next up", items: [["Rachel K.", "09:00 · Balayage", "", "Checked in"], ["Omar S.", "09:00 · Men's cut", "", "Confirmed"], ["Ivy C.", "09:00 · Gel manicure", "", "Arriving"], ["Walk-in", "Blow-dry", "", "Waiting"]] } },

    gym: { brand: "Forge Strength Club", place: "Austin, TX", accent: "#5E9E1E", user: "Marcus Hale", role: "Head coach", title: "Today", searchHint: "members, classes", cta: "New member", badge: 6,
      nav: ["Today", "Classes", "Members", "Memberships", "Check-ins", "Payments", "Reports"],
      kpis: [["Active members", "612", "+28 this month"], ["Check-ins today", "214", ""], ["MRR", "$58.4k", "+4%"], ["Failed payments", "7", ""]],
      main: { type: "table", title: "Classes today", note: "8 classes", chip: 4, num: 3, cols: ["Class", "Coach", "Time", "Booked", "Status"], rows: [["Strength 101", "Marcus", "06:00", "18/20", "Done"], ["HIIT Burn", "Kayla", "07:00", "20/20", "Done"], ["Olympic lifting", "Marcus", "12:00", "11/12", "In progress"], ["Mobility flow", "Jen", "17:30", "14/16", "Upcoming"], ["Bootcamp", "Kayla", "18:30", "22/24", "Upcoming"], ["Open gym", "—", "All day", "—", "Open"]] },
      side: { title: "Monthly goal", ring: 78, ringLabel: "of check-in goal", items: [["Ava Johnson", "Trial · day 5", "", "Trial"], ["Leo Park", "Card declined", "", "Failed"], ["Sara Diaz", "Renews Oct 3", "", "Renewal"]] } },

    school: { brand: "Brightpath Academy", place: "Pune, IN", accent: "#C99A06", user: "Meera Kulkarni", role: "Admin", title: "Attendance · Class 10-B", searchHint: "students, batches", cta: "New admission", badge: 14,
      nav: ["Attendance", "Admissions", "Batches", "Fees", "Exams", "Parents", "Reports"],
      kpis: [["Students", "1,240", "+86 this term"], ["Attendance today", "94%", ""], ["Fees collected", "₹38.2L", "82%"], ["Pending admissions", "14", ""]],
      main: { type: "table", title: "Class 10-B · Maths, period 2", note: "32 students", chip: 3, cols: ["Student", "Roll no.", "Parent", "Status"], rows: [["Aarav Sharma", "10B-01", "Rakesh Sharma", "Present"], ["Diya Patel", "10B-02", "Neha Patel", "Present"], ["Kabir Singh", "10B-03", "Harpreet Singh", "Late"], ["Ananya Iyer", "10B-04", "S. Iyer", "Present"], ["Rohan Gupta", "10B-05", "Amit Gupta", "Absent"], ["Ishita Rao", "10B-06", "Kavya Rao", "Present"], ["Vihaan Joshi", "10B-07", "P. Joshi", "Present"]] },
      side: { title: "Fee reminders", items: [["Rohan Gupta", "Term 2 · ₹18,500", "", "Overdue"], ["Kabir Singh", "Term 2 · ₹18,500", "", "Due"], ["Diya Patel", "Bus fee · ₹4,200", "", "Paid"], ["Admission · Arjun M.", "Interview Sat", "", "Scheduled"]] } },

    lms: { brand: "Craft Academy", place: "Online", accent: "#6A4FD0", user: "Leah Brooks", role: "Creator", title: "Dashboard", searchHint: "courses, students", cta: "New course", badge: 21,
      nav: ["Dashboard", "Courses", "Cohorts", "Students", "Quizzes", "Community", "Payments"],
      kpis: [["Students", "8,412", "+312 this month"], ["Revenue (Sep)", "$41.6k", "+18%"], ["Completion rate", "64%", ""], ["Cohort starting", "Oct 12", "86 enrolled"]],
      main: { type: "chart", title: "Monthly revenue", note: "last 12 months", values: [18, 21, 19, 24, 26, 25, 29, 31, 33, 30, 35, 41.6], labels: ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"],
        table: { chip: 3, cols: ["Course", "Lessons", "Students", "Status"], rows: [["Product Design Foundations", "42", "3,210", "Active"], ["UX Writing Bootcamp", "18", "1,480", "Active"], ["Figma Systems (cohort)", "12", "86", "Enrolled"]] } },
      side: { title: "Community", items: [["Hana Sato", "Posted her capstone", "2m"], ["Alex Rivera", "Question in Module 4", "", "Open"], ["Quiz 3 results", "Avg score 81%", "81%"], ["Live Q&A", "Thu 6pm", "", "Scheduled"]] } },

    accounting: { brand: "Ledgerline Partners", place: "Chicago, IL", accent: "#138A86", user: "Paula Grant", role: "Partner", title: "Work · October", searchHint: "clients, jobs", cta: "New engagement", badge: 9,
      nav: ["Work", "Clients", "Documents", "Deadlines", "Time", "Billing", "Portal"],
      kpis: [["Open jobs", "124", "18 due this week"], ["Docs requested", "37", "12 received"], ["WIP", "$86k", ""], ["Billed (Sep)", "$142k", "+9%"]],
      main: { type: "kanban", title: "Recurring work", cols: [
        { t: "Waiting on client", cards: [["Hollis Dental", "Q3 bank statements", ""], ["Rivera Bakery", "Payroll records", ""]] },
        { t: "In progress", cards: [["Maple Logistics", "Q3 bookkeeping", "$1,200"], ["Chen Family", "Extension filing", "$650"]] },
        { t: "Review", cards: [["Northside Gym", "Sales tax Q3", "$400"]] },
        { t: "Filed", cards: [["Greenway LLC", "Form 941 Q3", ""], ["Bloom Studio", "Sales tax Sep", ""]] }] },
      side: { title: "Deadlines", items: [["Chen Family 1040", "Extension · Oct 15", "", "Due"], ["Maple Logistics", "941 · Oct 31", "", "Scheduled"], ["Hollis Dental", "Docs overdue 6 days", "", "Overdue"], ["Greenway LLC", "Filed Sep 28", "", "Filed"]] } },

    legal: { brand: "Mercer & Lowe LLP", place: "Boston, MA", accent: "#8A6A3E", user: "Rachel Mercer", role: "Managing partner", title: "Client messages", searchHint: "matters, clients", cta: "New matter", badge: 5,
      nav: ["Messages", "Matters", "Intake", "Calendar", "Documents", "Time", "Billing"],
      kpis: [["Open matters", "64", ""], ["Unbilled time", "212 h", "$61k"], ["New intakes", "9", "this week"], ["Trust balance", "$184k", ""]],
      main: { type: "chat", title: "Messages", threads: [["Daniel Okafor", "Estate · signing Thursday?"], ["Sarah Lin", "Lease review · redlines"], ["Hughes Holdings", "Contract dispute"], ["Maria Gomez", "Immigration · documents"], ["New intake", "Employment claim"]],
        msgs: [[0, "Hi Rachel, can we move the will signing to Thursday afternoon?"], [1, "Yes, Thursday 3pm works. I'll bring two witnesses and send the final draft today."], [0, "Perfect. Do I need to bring anything?"], [1, "Just photo ID. The draft is in your portal under Documents."], [0, "Got it, thank you!"]] },
      side: { title: "Today", items: [["Okafor estate", "Will signing · Thu 3pm", "", "Scheduled"], ["Lin lease", "Redlines due 5pm", "", "Due"], ["Hughes v. Tate", "Filing deadline Fri", "", "Urgent"], ["Time logged", "5.4 h today", "5.4h"]] } },

    store: { brand: "Kindred Goods", place: "Portland, OR", accent: "#1E8F5A", user: "Ella Morgan", role: "Founder", title: "Orders", searchHint: "orders, products", cta: "Add product", badge: 23,
      nav: ["Orders", "Products", "Inventory", "Customers", "Discounts", "Storefront", "Analytics"],
      kpis: [["Sales today", "$4,812", "+21%"], ["Orders", "96", "23 to ship"], ["Conversion", "3.4%", ""], ["Returning customers", "38%", ""]],
      main: { type: "table", title: "Recent orders", note: "today", chip: 4, num: 3, cols: ["Order", "Customer", "Items", "Total", "Status"], rows: [["#10482", "Jess Taylor", "Linen throw, mug ×2", "$118.00", "Paid"], ["#10481", "Noah Kim", "Ceramic vase", "$64.00", "In transit"], ["#10480", "Ava Patel", "Candle set", "$42.00", "Delivered"], ["#10479", "Liam Ross", "Wool blanket", "$189.00", "Pending"], ["#10478", "Mia Chen", "Planter, soil", "$58.00", "Paid"], ["#10477", "Owen Hart", "Gift card", "$50.00", "Cancelled"]] },
      side: { title: "Low stock", items: [["Linen throw · Sage", "4 left", "", "Low stock"], ["Stoneware mug", "11 left", "", "In stock"], ["Wool blanket · Oat", "0 left", "", "Out of stock"], ["Beeswax candle", "6 left", "", "Low stock"]] } }
  };
})();
