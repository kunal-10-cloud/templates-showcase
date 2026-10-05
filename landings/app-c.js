// Production-app previews for gym, school, lms, accounting, legal, store.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 17}" height="${s || 17}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', check: '<path d="M4 12l5 5L20 6"/>', book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6v16"/>',
    file: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.5"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>', msg: '<path d="M4 5h16v11H8l-4 4z"/>',
    scale: '<path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>', brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>', truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>', grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>', dumbbell: '<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>'
  };

  // Shared shell. cfg: font, fontLink, a (accent), dark (sidebar), brand, label, ini, user, uini, role, nav, title, sub, actions, brief, kpis, body, css
  function shell(c) {
    const dark = c.dark;
    const nav = c.nav.map(([g, items]) => `<div class="gl">${g}</div>` + items.map(([icn, l, n, on]) => `<div class="nv${on ? " on" : ""}">${ic(I[icn])}<span>${l}</span>${n ? `<em>${n}</em>` : ""}</div>`).join("")).join("");
    const brief = c.brief.map(([num, txt, act, tone]) => `<div class="bi"><b class="${tone || ""}">${num}</b><span>${txt}</span><u>${act} →</u></div>`).join("");
    const kpis = c.kpis.map(([l, v, s, tone]) => `<div class="k"><p>${l}</p><b class="${tone || ""}">${v}</b><small>${s}</small></div>`).join("");
    return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${c.fontLink}">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:14px/1.45 ${c.font},system-ui,sans-serif;color:#111827;background:${c.bg || "#F4F5F8"}}
.app{display:grid;grid-template-columns:256px 1fr;grid-template-rows:900px;height:900px}
.sb{background:${dark ? c.side || "#111827" : "#fff"};${dark ? "" : "border-right:1px solid #E6E8EE;"}padding:18px 12px;display:flex;flex-direction:column;gap:1px;color:${dark ? "#C9CFDA" : "#374151"}}
.br{display:flex;gap:10px;align-items:center;padding:2px 6px 14px}.br i{width:36px;height:36px;border-radius:10px;background:${c.a};color:#fff;display:grid;place-items:center;font-weight:700;font-style:normal;font-size:15px}
.br b{display:block;font-size:14px;line-height:1.2;color:${dark ? "#fff" : "#111827"}}.br span{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:${dark ? "#8A93A6" : "#6B7280"}}
.ask{display:flex;align-items:center;justify-content:center;gap:8px;background:${dark ? "rgba(255,255,255,.08)" : c.a};color:#fff;border-radius:9px;padding:9px;font-weight:600;font-size:13px;margin-bottom:8px;border:1px solid ${dark ? "rgba(255,255,255,.12)" : "transparent"}}
.gl{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:${dark ? "#6B7590" : "#9CA3AF"};padding:11px 10px 4px;font-weight:600}
.nv{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;font-weight:500;font-size:13.5px}.nv svg{color:${dark ? "#6B7590" : "#9CA3AF"};flex:none}
.nv.on{background:${dark ? "rgba(255,255,255,.1)" : c.soft};color:${dark ? "#fff" : c.a};font-weight:600}.nv.on svg{color:${dark ? c.a2 || c.a : c.a}}
.nv em{margin-left:auto;font-style:normal;background:${dark ? "rgba(255,255,255,.12)" : "#EEF0F4"};color:${dark ? "#E5E7EB" : "#374151"};font-size:11px;font-weight:700;border-radius:9px;min-width:22px;text-align:center;line-height:19px;padding:0 5px}
.me{margin-top:auto;display:flex;align-items:center;gap:10px;padding:10px 8px;border-top:1px solid ${dark ? "rgba(255,255,255,.08)" : "#EEF0F4"}}.me b{color:${dark ? "#fff" : "#111827"};font-size:13px}
.av{width:30px;height:30px;border-radius:50%;display:inline-grid;place-items:center;color:#fff;font-size:11px;font-weight:700;flex:none}
.main{padding:22px 28px;display:flex;flex-direction:column;gap:14px;min-width:0;min-height:0;overflow:hidden}
.hd{display:flex;justify-content:space-between;align-items:flex-end}.hd h1{margin:0;font-size:25px;font-weight:700;letter-spacing:-.02em}.hd p{margin:3px 0 0;color:#6B7280}
.acts{display:flex;gap:8px}.btn{border:1px solid #D7DBE3;background:#fff;border-radius:9px;padding:8px 14px;font-weight:600;font-size:13px}.btn.p{background:${c.a};border-color:${c.a};color:#fff}
.brief{background:#fff;border:1px solid #E6E8EE;border-radius:14px;padding:12px 14px;display:grid;grid-template-columns:200px repeat(${c.brief.length},1fr);gap:10px;align-items:stretch}
.bt{display:flex;flex-direction:column;justify-content:center;gap:4px;padding-right:6px}.bt .k2{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${c.a}}.bt h2{margin:0;font-size:17px}.bt p{margin:0;color:#6B7280;font-size:12px}
.bi{background:#F7F8FA;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:3px}.bi b{font-size:22px;letter-spacing:-.02em}.bi span{color:#4B5563;font-size:12.5px;line-height:1.3}.bi u{text-decoration:none;margin-top:auto;font-size:12px;font-weight:600;color:${c.a}}
.r{color:#C2261A}.g{color:#0F7A45}.w{color:#9A6400}
.kp{display:grid;grid-template-columns:repeat(${c.kpis.length},1fr);gap:12px}.k{background:#fff;border:1px solid #E6E8EE;border-radius:12px;padding:11px 14px}.k p{margin:0;color:#6B7280;font-size:12.5px}.k b{display:block;font-size:24px;letter-spacing:-.02em}.k small{color:#6B7280;font-size:12px}
.cols{display:grid;grid-template-columns:${c.cols || "1.35fr 1fr"};gap:14px;flex:1;min-height:0}
.card{background:#fff;border:1px solid #E6E8EE;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.ch{display:flex;justify-content:space-between;align-items:center;padding:11px 16px;border-bottom:1px solid #EEF0F4;font-weight:700;font-size:14.5px}.ch span{font-weight:500;font-size:12.5px;color:#6B7280}.ch a{color:${c.a};font-weight:600;font-size:12.5px}
table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6B7280;padding:8px 14px;background:#FAFBFC;border-bottom:1px solid #EEF0F4;font-weight:600}td{padding:9px 14px;border-bottom:1px solid #F2F3F6;vertical-align:middle}td.n{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;white-space:nowrap}.chip:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.c-r{background:#FEECEC;color:#C2261A}.c-g{background:#E4F6EC;color:#0F7A45}.c-b{background:#EAF0FF;color:#1E40AF}.c-w{background:#FFF5D9;color:#9A6400}.c-n{background:#EEF0F4;color:#4B5563}.c-a{background:${c.soft};color:${c.a}}
.li{display:flex;align-items:center;gap:10px;padding:9px 16px;border-bottom:1px solid #F2F3F6}.li .t{flex:1;min-width:0}.li .t b{display:block;font-size:13.5px;font-weight:600}.li .t small{color:#6B7280;font-size:12px}
.bar{height:6px;border-radius:4px;background:#EEF0F4;overflow:hidden}.bar i{display:block;height:100%;border-radius:4px}
.ab{border:1px solid #D7DBE3;background:#fff;border-radius:7px;padding:4px 10px;font-size:12px;font-weight:600}.ab.p{background:${c.a};border-color:${c.a};color:#fff}
${c.css || ""}
</style></head><body><div class="app">
<aside class="sb"><div class="br"><i>${c.ini}</i><div><b>${c.brand}</b><span>${c.label}</span></div></div>
<div class="ask">${ic(I.spark, 15)}Ask about your business</div>${nav}
<div class="me"><span class="av" style="background:${c.a}">${c.uini}</span><div><b>${c.user}</b><br><small style="color:${dark ? "#8A93A6" : "#6B7280"}">${c.role}</small></div></div></aside>
<main class="main"><div class="hd"><div><h1>${c.title}</h1><p>${c.sub}</p></div><div class="acts">${c.actions.map((t, i) => `<span class="btn${i === c.actions.length - 1 ? " p" : ""}">${t}</span>`).join("")}</div></div>
<div class="brief"><div class="bt"><span class="k2">${ic(I.spark, 13)}Morning brief</span><h2>${c.briefTitle}</h2><p>Written from today's data</p></div>${brief}</div>
<div class="kp">${kpis}</div>
<div class="cols">${c.body}</div></main></div></body></html>`;
  }
  const AV = ["#2563EB", "#0E8C7A", "#C2410C", "#7C3AED", "#DB2777", "#0891B2", "#65A30D", "#B45309"];
  const av = (ini, i, s) => `<span class="av" style="background:${AV[i % AV.length]};${s ? `width:${s}px;height:${s}px;font-size:${Math.round(s / 2.8)}px` : ""}">${ini}</span>`;
  const MAKE = ["Make it yours", [["spark", "Build next"], ["gear", "Settings"]]];

  // ---------------- GYM: Studio OS · Forge Strength Club ----------------
  const classes = [["06:00", "Strength 101", "Marcus Hale", 20, 20, "Done"], ["07:00", "HIIT Burn", "Kayla Ruiz", 20, 20, "Done"], ["12:00", "Olympic Lifting", "Marcus Hale", 11, 12, "In session"],
    ["17:30", "Mobility Flow", "Jen Ortiz", 14, 16, "Upcoming"], ["18:30", "Bootcamp", "Kayla Ruiz", 23, 24, "Upcoming"], ["19:30", "Powerlifting Club", "Dre Collins", 9, 14, "Upcoming"]];
  const checkins = [["Ava Johnson", "AJ", "Trial · day 5", "12:04"], ["Leo Park", "LP", "Unlimited", "12:01"], ["Sara Diaz", "SD", "10-class pack · 3 left", "11:58"], ["Tom Becker", "TB", "Unlimited", "11:55"], ["Nia Brooks", "NB", "Unlimited", "11:52"]];
  window.LANDINGS.gym = shell({
    font: "'Barlow'", fontLink: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap", a: "#65A30D", a2: "#A3E635", soft: "#EEF8DF", dark: true, side: "#0F1512",
    brand: "Forge Strength Club", label: "Studio OS", ini: "F", user: "Marcus Hale", uini: "MH", role: "Head coach",
    nav: [["Run the floor", [["home", "Today", 0, 1], ["cal", "Classes", 8], ["check", "Check-ins"], ["msg", "Messages", 3]]], ["Members", [["users", "Members", 612], ["card", "Memberships"], ["tag", "Payments", 7]]], ["Grow", [["chart", "Reports"], ["users", "Leads", 5]]], MAKE],
    title: "Today, Thursday 1 Oct", sub: "Forge Strength Club · 214 check-ins so far · 4 coaches on the floor", actions: ["Check in member", "+ New member"],
    briefTitle: "4 things before the 5:30 rush", brief: [["7", "card payments failed overnight", "Retry & text", "r"], ["2", "classes nearly full tonight", "Open waitlist"], ["23", "memberships renew in 7 days", "Review"], ["3", "trials end this week", "Book a call", "w"]],
    kpis: [["Active members", "612", "+28 this month"], ["Check-ins today", "214", "Peak 6–7pm"], ["MRR", "$58,420", "+4.1% vs Sep", "g"], ["Failed payments", "7", "$1,043 at risk", "r"], ["Class fill rate", "86%", "last 7 days"]],
    css: ".cap{display:flex;align-items:center;gap:8px}.cap .bar{width:110px}.feed .li{padding:8px 16px}.live{width:8px;height:8px;border-radius:50%;background:#65A30D;box-shadow:0 0 0 4px rgba(101,163,13,.15)}",
    body: `<div class="card"><div class="ch">Class timetable<span>Thu 1 Oct · 8 classes</span></div><table><tr><th>Time</th><th>Class</th><th>Coach</th><th>Booked</th><th>Status</th></tr>${classes.map(([t, n, c, b, cap, st], i) => `<tr><td class="n" style="text-align:left">${t}</td><td><b>${n}</b></td><td><span style="display:inline-flex;gap:8px;align-items:center">${av(c.split(" ").map(x => x[0]).join(""), i, 24)}${c}</span></td><td><div class="cap"><div class="bar"><i style="width:${Math.round(b / cap * 100)}%;background:${b >= cap ? "#C2410C" : "#65A30D"}"></i></div><span>${b}/${cap}</span></div></td><td><span class="chip ${st === "Done" ? "c-n" : st === "In session" ? "c-g" : "c-b"}">${st}</span></td></tr>`).join("")}</table>
<div style="margin:12px 16px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${[["Waitlist · Bootcamp", "4 people", "c-w"], ["Coach on floor", "Kayla, Jen, Dre", "c-n"], ["Equipment issue", "Rower #3 flagged", "c-r"]].map(([a, b, cl]) => `<div style="border:1px solid #EEF0F4;border-radius:10px;padding:10px 12px"><small style="color:#6B7280">${a}</small><br><span class="chip ${cl}">${b}</span></div>`).join("")}</div></div>
<div class="card feed"><div class="ch"><span style="display:flex;gap:8px;align-items:center;color:#111827;font-weight:700;font-size:14.5px"><span class="live"></span>Live check-ins</span><a>All →</a></div>${checkins.map(([n, i, p, t], k) => `<div class="li">${av(i, k)}<div class="t"><b>${n}</b><small>${p}</small></div><span style="color:#6B7280;font-size:12px">${t}</span></div>`).join("")}
<div class="ch" style="border-top:1px solid #EEF0F4">Payments to fix<span>7 failed</span></div>${[["Leo Park", "Card declined · $89", "Retry"], ["Mia Chen", "Card expired · $129", "Text link"], ["Jon Ellis", "Insufficient funds · $89", "Retry"]].map(([n, s, a], k) => `<div class="li"><div class="t"><b>${n}</b><small>${s}</small></div><span class="ab${k === 0 ? " p" : ""}">${a}</span></div>`).join("")}</div>`
  });

  // ---------------- SCHOOL: Campus OS · Brightpath Academy ----------------
  const students = [["Aarav Sharma", "10B-01"], ["Diya Patel", "10B-02"], ["Kabir Singh", "10B-03"], ["Ananya Iyer", "10B-04"], ["Rohan Gupta", "10B-05"], ["Ishita Rao", "10B-06"], ["Vihaan Joshi", "10B-07"], ["Meera Nair", "10B-08"], ["Arjun Mehta", "10B-09"]];
  const marks = [["P", "P", "P", "P", "P"], ["P", "P", "P", "L", "P"], ["L", "P", "A", "P", "L"], ["P", "P", "P", "P", "P"], ["A", "A", "P", "A", "A"], ["P", "P", "P", "P", "P"], ["P", "L", "P", "P", "P"], ["P", "P", "P", "P", "P"], ["P", "P", "A", "P", "P"]];
  const mk = m => `<span class="mk m-${m}">${m}</span>`;
  window.LANDINGS.school = shell({
    font: "'Figtree'", fontLink: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap", a: "#0F766E", soft: "#E1F3F1", dark: false, bg: "#F3F6F6",
    brand: "Brightpath Academy", label: "Campus OS", ini: "B", user: "Meera Kulkarni", uini: "MK", role: "Principal",
    nav: [["Daily", [["home", "Today", 0, 1], ["check", "Attendance"], ["cal", "Timetable"], ["msg", "Parent messages", 12]]], ["Academics", [["grad", "Classes", 38], ["book", "Exams & results"], ["users", "Students", "1,240"]]], ["Office", [["card", "Fees", 46], ["file", "Admissions", 14], ["chart", "Reports"]]], MAKE],
    title: "Good morning, Meera", sub: "Thursday, 1 October 2026 · Term 2, week 6", actions: ["Send circular", "+ Admission"],
    briefTitle: "Today at Brightpath", brief: [["31", "students absent, parents not yet notified", "Notify parents", "r"], ["₹4.6L", "fees overdue across 46 families", "Send reminders"], ["2", "teachers on leave, periods uncovered", "Assign cover", "w"], ["14", "admission enquiries this week", "Review"]],
    kpis: [["Attendance today", "94.2%", "1,168 of 1,240"], ["Fees collected", "₹38.2L", "82% of term", "g"], ["Overdue fees", "₹4.6L", "46 families", "r"], ["Classes running", "38", "2 need cover"], ["Unread parent messages", "12", ""]],
    cols: "1.45fr 1fr",
    css: ".reg th,.reg td{padding:7px 10px}.mk{display:inline-grid;place-items:center;width:24px;height:22px;border-radius:6px;font-size:11.5px;font-weight:700}.m-P{background:#E4F6EC;color:#0F7A45}.m-A{background:#FEECEC;color:#C2261A}.m-L{background:#FFF5D9;color:#9A6400}.today{background:#F2FBF9}",
    body: `<div class="card"><div class="ch">Attendance register · Class 10-B<span>Maths · Period 2 · Ms. Desai</span></div><table class="reg"><tr><th>Roll</th><th>Student</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th class="today">Today</th><th>Term</th></tr>${students.map(([n, r], i) => { const pct = Math.round(marks[i].filter(x => x === "P").length / 5 * 100); return `<tr><td style="color:#6B7280">${r}</td><td><b>${n}</b></td>${marks[i].map((m, j) => `<td class="${j === 4 ? "today" : ""}">${mk(m)}</td>`).join("")}<td class="n" style="color:${pct < 60 ? "#C2261A" : "#111827"}">${[98, 94, 81, 99, 62, 97, 92, 100, 90][i]}%</td></tr>`; }).join("")}</table>
<div style="padding:10px 14px;display:flex;gap:10px;align-items:center;color:#4B5563;font-size:12.5px"><span class="chip c-g">29 present</span><span class="chip c-w">2 late</span><span class="chip c-r">1 absent</span><span style="margin-left:auto" class="ab p">Save &amp; notify parents</span></div></div>
<div class="card"><div class="ch">Fee collection · Term 2<span>₹38.2L of ₹46.6L</span></div><div style="padding:12px 16px 4px"><div class="bar" style="height:10px"><i style="width:82%;background:#0F766E"></i></div><div style="display:flex;justify-content:space-between;color:#6B7280;font-size:12px;margin-top:6px"><span>Collected 82%</span><span>Due Oct 15</span></div></div>
${[["Rohan Gupta", "10-B · Term 2 tuition", "₹18,500", "Overdue", "c-r"], ["Kabir Singh", "10-B · Term 2 tuition", "₹18,500", "Due", "c-w"], ["Sana Qureshi", "7-A · Bus fee", "₹4,200", "Overdue", "c-r"], ["Diya Patel", "10-B · Lab fee", "₹2,500", "Paid", "c-g"], ["Aditya Rane", "8-C · Term 2 tuition", "₹16,000", "Paid", "c-g"]].map(([n, s, v, st, cl]) => `<div class="li"><div class="t"><b>${n}</b><small>${s}</small></div><b style="font-variant-numeric:tabular-nums">${v}</b><span class="chip ${cl}">${st}</span></div>`).join("")}
<div class="ch" style="border-top:1px solid #EEF0F4">Periods needing cover<span>2</span></div>${[["P3 · 9-A Science", "Mr. Kulkarni on leave"], ["P6 · 6-B English", "Ms. Fernandes on leave"]].map(([a, b]) => `<div class="li"><div class="t"><b>${a}</b><small>${b}</small></div><span class="ab">Assign</span></div>`).join("")}</div>`
  });

  // ---------------- LMS: Course OS · Craft Academy ----------------
  const lessons = [["1", "Welcome & how this course works", "Video · 6 min", 98], ["2", "Seeing like a designer", "Video · 18 min", 94], ["3", "Grids, spacing and rhythm", "Video · 24 min", 88], ["4", "Type that reads well", "Video · 21 min", 81], ["5", "Quiz: layout fundamentals", "Quiz · 12 questions", 74], ["6", "Colour without guesswork", "Video · 19 min", 63], ["7", "Capstone brief", "Assignment", 41]];
  const learners = [["Hana Sato", "HS", 92, "Capstone submitted", "c-g"], ["Alex Rivera", "AR", 71, "Stuck on Module 4", "c-w"], ["Priya Menon", "PM", 64, "Active today", "c-b"], ["Jonas Weber", "JW", 38, "Inactive 9 days", "c-r"], ["Chloe Martin", "CM", 55, "Active today", "c-b"]];
  window.LANDINGS.lms = shell({
    font: "'Onest'", fontLink: "https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap", a: "#7C3AED", soft: "#F1EAFE", dark: false, bg: "#F6F5FA",
    brand: "Craft Academy", label: "Course OS", ini: "C", user: "Leah Brooks", uini: "LB", role: "Creator",
    nav: [["Teach", [["home", "Dashboard", 0, 1], ["book", "Courses", 6], ["users", "Cohorts", 2], ["play", "Live sessions"]]], ["Students", [["users", "Students", "8,412"], ["msg", "Community", 21], ["file", "Assignments", 34]]], ["Business", [["card", "Payments"], ["chart", "Analytics"], ["tag", "Coupons"]]], MAKE],
    title: "Product Design Foundations", sub: "Course · 42 lessons · 3,210 students · last edited 2h ago", actions: ["Preview as student", "Publish changes"],
    briefTitle: "Your course this week", brief: [["34", "assignments waiting for feedback", "Grade now", "w"], ["11", "students stuck on Module 4 quiz", "Send a nudge"], ["86", "enrolled in Figma Systems cohort", "Prep session"], ["$41.6k", "revenue in September, +18%", "Open report", "g"]],
    kpis: [["Students", "8,412", "+312 this month"], ["Completion", "64%", "+5 pts vs Aug", "g"], ["Avg. quiz score", "81%", "Module 4 lowest"], ["Revenue (Sep)", "$41,630", "+18%", "g"], ["Refunds", "3", "0.4% of sales"]],
    css: ".ls{display:grid;grid-template-columns:30px 1fr 150px;gap:12px;align-items:center;padding:6px 16px;border-bottom:1px solid #F2F3F6}.ls .num{width:26px;height:26px;border-radius:8px;background:#F1EAFE;color:#7C3AED;display:grid;place-items:center;font-weight:700;font-size:12px}.ls b{display:block;font-size:13.5px}.ls small{color:#6B7280;font-size:12px}.mod{padding:7px 16px;background:#FAFAFC;border-bottom:1px solid #EEF0F4;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6B7280;font-weight:700}",
    body: `<div class="card"><div class="ch">Curriculum<span>drag to reorder · completion by lesson</span></div><div class="mod">Module 1 · Foundations</div>${lessons.slice(0, 3).map(l => les(l)).join("")}<div class="mod">Module 2 · Typography &amp; colour</div>${lessons.slice(3).map(l => les(l)).join("")}<div style="padding:10px 16px"><span class="ab">+ Add lesson</span> <span class="ab">+ Add quiz</span></div></div>
<div class="card"><div class="ch">Student progress<span>Figma Systems · cohort 4</span></div><table><tr><th>Student</th><th>Progress</th><th>Status</th></tr>${learners.map(([n, i, p, s, cl], k) => `<tr><td><span style="display:inline-flex;gap:8px;align-items:center">${av(i, k + 3, 26)}<b>${n}</b></span></td><td><div style="display:flex;gap:8px;align-items:center"><div class="bar" style="width:90px"><i style="width:${p}%;background:#7C3AED"></i></div>${p}%</div></td><td><span class="chip ${cl}">${s}</span></td></tr>`).join("")}</table>
<div class="ch" style="border-top:1px solid #EEF0F4">Next live session<span>Thu 6:00pm ET</span></div><div class="li"><div class="t"><b>Q&amp;A: building a component library</b><small>86 registered · recording on</small></div><span class="ab p">Start</span></div></div>`
  });
  function les([n, t, s, p]) { return `<div class="ls"><span class="num">${n}</span><div><b>${t}</b><small>${s}</small></div><div style="display:flex;gap:8px;align-items:center"><div class="bar" style="flex:1"><i style="width:${p}%;background:${p < 50 ? "#C2410C" : "#7C3AED"}"></i></div><span style="font-size:12px;color:#4B5563;width:34px">${p}%</span></div></div>`; }

  // ---------------- ACCOUNTING: Practice OS · Ledgerline Partners ----------------
  const board = [["Waiting on client", "c-w", [["Hollis Dental", "Q3 bank statements", "6d overdue"], ["Rivera Bakery", "Payroll records", "due Fri"], ["Kim Florals", "Receipts upload", "due Mon"]]],
    ["In progress", "c-b", [["Maple Logistics", "Q3 bookkeeping", "PG · 60%"], ["Chen Family", "1040 extension", "DO · 40%"], ["Ortega Builders", "Payroll Oct", "PG · 20%"]]],
    ["Review", "c-a", [["Northside Gym", "Sales tax Q3", "Partner review"], ["Bloom Studio", "Monthly close", "Partner review"]]],
    ["Filed", "c-g", [["Greenway LLC", "Form 941 Q3", "Sep 28"], ["Patel CPA Clients", "1099 prep", "Sep 26"]]]];
  window.LANDINGS.accounting = shell({
    font: "'IBM Plex Sans'", fontLink: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap", a: "#0E7490", soft: "#E0F2F6", dark: true, side: "#0B1E26", a2: "#22D3EE",
    brand: "Ledgerline Partners", label: "Practice OS", ini: "L", user: "Paula Grant", uini: "PG", role: "Managing partner",
    nav: [["Work", [["home", "Today", 0, 1], ["brief", "Work board", 124], ["cal", "Deadlines", 18], ["clock", "Time"]]], ["Clients", [["users", "Clients", 212], ["file", "Documents", 37], ["msg", "Client portal", 9]]], ["Firm", [["card", "Billing"], ["chart", "Reports"]]], MAKE],
    title: "Work board · October", sub: "124 open jobs · 18 due this week · 9 unread client messages", actions: ["Request documents", "+ New engagement"],
    briefTitle: "Before the Oct 15 rush", brief: [["5", "clients haven't sent Q3 documents", "Send reminder", "r"], ["3", "extensions due Oct 15 not started", "Assign", "w"], ["$18.4k", "WIP ready to invoice", "Bill now", "g"], ["2", "returns waiting for partner review", "Review"]],
    kpis: [["Open jobs", "124", "18 due this week"], ["Docs requested", "37", "12 received today"], ["Work in progress", "$86,200", "$18.4k billable", "g"], ["Overdue client tasks", "5", "oldest 6 days", "r"], ["Billed (Sep)", "$142,300", "+9%"]],
    cols: "1.6fr 1fr",
    css: ".kb{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:12px}.col{background:#F7F9FA;border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:7px}.col h4{margin:2px 4px 2px;font-size:12px;display:flex;justify-content:space-between;align-items:center}.tk{background:#fff;border:1px solid #E6E8EE;border-radius:9px;padding:9px 10px}.tk b{display:block;font-size:13px}.tk small{color:#6B7280;font-size:12px}.tk em{font-style:normal;font-size:11.5px;color:#4B5563;display:block;margin-top:4px}",
    body: `<div class="card"><div class="ch">Recurring work<span>grouped by status</span></div><div class="kb">${board.map(([t, cl, items]) => `<div class="col"><h4><span class="chip ${cl}">${t}</span><span style="color:#6B7280">${items.length}</span></h4>${items.map(([a, b, c2]) => `<div class="tk"><b>${a}</b><small>${b}</small><em style="${c2.includes("overdue") ? "color:#C2261A;font-weight:600" : ""}">${c2}</em></div>`).join("")}</div>`).join("")}</div></div>
<div class="card"><div class="ch">Deadlines<span>next 14 days</span></div>${[["Oct 15", "Chen Family", "1040 extension", "c-r", "3 days"], ["Oct 15", "Ruiz Household", "1040 extension", "c-r", "3 days"], ["Oct 20", "Northside Gym", "Sales tax Q3", "c-w", "8 days"], ["Oct 31", "Maple Logistics", "Form 941 Q3", "c-b", "19 days"]].map(([d, n, w, cl, l]) => `<div class="li"><div style="width:52px;text-align:center;border:1px solid #E6E8EE;border-radius:8px;padding:3px 0"><small style="color:#6B7280;font-size:10.5px">${d.split(" ")[0].toUpperCase()}</small><br><b style="font-size:16px">${d.split(" ")[1]}</b></div><div class="t"><b>${n}</b><small>${w}</small></div><span class="chip ${cl}">${l}</span></div>`).join("")}
<div class="ch" style="border-top:1px solid #EEF0F4">Document requests<span>37 open</span></div>${[["Hollis Dental", "Q3 bank statements · 3 of 5 received", 60], ["Kim Florals", "Receipts · 0 of 1", 0], ["Rivera Bakery", "Payroll records · 1 of 2", 50]].map(([n, s, p]) => `<div class="li"><div class="t"><b>${n}</b><small>${s}</small></div><div class="bar" style="width:80px"><i style="width:${p}%;background:#0E7490"></i></div></div>`).join("")}</div>`
  });

  // ---------------- LEGAL: Counsel OS · Mercer & Lowe LLP ----------------
  const matters = [["M-2041", "Okafor Estate", "Estate planning", "Signing", "c-b", "RM", "$3,450"], ["M-2038", "Hughes Holdings v. Tate", "Commercial litigation", "Discovery", "c-w", "DL", "$28,900"], ["M-2035", "Lin Lease Review", "Real estate", "Drafting", "c-a", "RM", "$1,820"],
    ["M-2031", "Gomez Visa Petition", "Immigration", "Filed", "c-g", "SK", "$4,100"], ["M-2027", "Parker Employment Claim", "Employment", "Intake", "c-n", "DL", "$0"], ["M-2019", "Wexford Merger", "Corporate", "Due diligence", "c-w", "RM", "$41,250"]];
  window.LANDINGS.legal = shell({
    font: "'Hanken Grotesk'", fontLink: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap", a: "#9F1239", soft: "#FCE7EC", dark: true, side: "#1C1416", a2: "#FB7185", bg: "#F6F4F3",
    brand: "Mercer &amp; Lowe LLP", label: "Counsel OS", ini: "M", user: "Rachel Mercer", uini: "RM", role: "Managing partner",
    nav: [["Practice", [["home", "Today", 0, 1], ["brief", "Matters", 64], ["cal", "Calendar", 4], ["msg", "Client messages", 5]]], ["Work", [["clock", "Time entries"], ["file", "Documents"], ["users", "Intake", 9]]], ["Money", [["card", "Billing"], ["scale", "Trust accounts"], ["chart", "Reports"]]], MAKE],
    title: "Good morning, Rachel", sub: "Monday, 5 October 2026 · 64 open matters · 3 hearings this week", actions: ["Log time", "+ New matter"],
    briefTitle: "What needs you today", brief: [["Fri", "filing deadline · Hughes v. Tate", "Open matter", "r"], ["212 h", "unbilled time, $61,400", "Prepare invoices", "w"], ["9", "new intakes waiting for conflict check", "Run checks"], ["2", "signatures out with clients", "Send reminder"]],
    kpis: [["Open matters", "64", "6 new this month"], ["Unbilled time", "$61,400", "212 hours", "w"], ["Collected (Sep)", "$184,900", "+11%", "g"], ["Trust balance", "$184,220", "reconciled Oct 1"], ["Hearings this week", "3", "next: Wed 9:30"]],
    cols: "1.5fr 1fr",
    body: `<div class="card"><div class="ch">Matters<span>sorted by activity</span></div><table><tr><th>Matter</th><th>Client</th><th>Practice area</th><th>Stage</th><th>Lead</th><th style="text-align:right">Unbilled</th></tr>${matters.map(([id, n, p, st, cl, l, v], i) => `<tr><td style="color:#6B7280;font-variant-numeric:tabular-nums">${id}</td><td><b>${n}</b></td><td style="color:#4B5563">${p}</td><td><span class="chip ${cl}">${st}</span></td><td>${av(l, l === "RM" ? 4 : l === "DL" ? 0 : 5, 24)}</td><td class="n">${v}</td></tr>`).join("")}</table>
<div class="ch" style="border-top:1px solid #EEF0F4">Today's time entries<span>5.4 h logged</span></div>${[["Hughes v. Tate", "Review production set, 340 docs", "2.1 h", "$987"], ["Okafor Estate", "Final will revisions", "1.3 h", "$611"], ["Wexford Merger", "Call with seller's counsel", "2.0 h", "$940"]].map(([m, d, h, v]) => `<div class="li"><div class="t"><b>${m}</b><small>${d}</small></div><span style="color:#4B5563">${h}</span><b style="width:60px;text-align:right">${v}</b></div>`).join("")}</div>
<div class="card"><div class="ch">Court &amp; key dates<span>next 10 days</span></div>${[["Wed 7", "9:30", "Motion hearing", "Hughes v. Tate · Suffolk Superior", "c-r"], ["Thu 8", "15:00", "Will signing", "Okafor Estate · office, room 2", "c-b"], ["Fri 9", "17:00", "Filing deadline", "Opposition brief · Hughes v. Tate", "c-r"], ["Tue 13", "11:00", "Client meeting", "Wexford Merger · data room review", "c-n"]].map(([d, t, a, b, cl]) => `<div class="li"><div style="width:58px"><b style="display:block">${d}</b><small style="color:#6B7280">${t}</small></div><div class="t"><b>${a}</b><small>${b}</small></div><span class="chip ${cl}">${cl === "c-r" ? "Deadline" : "Scheduled"}</span></div>`).join("")}
<div class="ch" style="border-top:1px solid #EEF0F4">New intakes<span>9 waiting</span></div>${[["Parker Employment Claim", "Wrongful termination · web form"], ["Dana Liu", "Lease dispute · referral"]].map(([n, s]) => `<div class="li"><div class="t"><b>${n}</b><small>${s}</small></div><span class="ab p">Conflict check</span></div>`).join("")}</div>`
  });

  // ---------------- STORE: Store OS · Kindred Goods ----------------
  const orders = [["#10482", "Jess Taylor", "Linen throw, Mug ×2", "$118.00", "Unfulfilled", "c-w"], ["#10481", "Noah Kim", "Stoneware vase", "$64.00", "In transit", "c-b"], ["#10480", "Ava Patel", "Beeswax candle set", "$42.00", "Delivered", "c-g"],
    ["#10479", "Liam Ross", "Wool blanket · Oat", "$189.00", "Unfulfilled", "c-w"], ["#10478", "Mia Chen", "Planter, potting mix", "$58.00", "Packed", "c-a"], ["#10477", "Owen Hart", "Gift card", "$50.00", "Refunded", "c-n"]];
  const thumb = (bg, shape) => `<div style="height:74px;border-radius:9px;background:${bg};display:grid;place-items:center">${shape}</div>`;
  const prods = [["Linen throw · Sage", "4 in stock", "c-r", thumb("#E3EBDD", '<div style="width:56px;height:38px;border-radius:6px;background:#9DB08C;box-shadow:inset 0 -8px 0 #8BA078"></div>')],
    ["Stoneware mug", "11 in stock", "c-w", thumb("#F1E7DD", '<div style="width:30px;height:34px;border-radius:4px 4px 9px 9px;background:#C9A88A;box-shadow:12px 6px 0 -6px #C9A88A"></div>')],
    ["Wool blanket · Oat", "0 in stock", "c-r", thumb("#EFE9DF", '<div style="width:58px;height:34px;border-radius:6px;background:repeating-linear-gradient(90deg,#D8C9AF 0 6px,#CDBB9C 6px 12px)"></div>')],
    ["Beeswax candle", "26 in stock", "c-g", thumb("#F6EED9", '<div style="width:24px;height:40px;border-radius:5px;background:#E8C766;position:relative;box-shadow:0 -8px 0 -9px #333"></div>')],
    ["Ceramic vase", "18 in stock", "c-g", thumb("#E5E8EE", '<div style="width:32px;height:44px;border-radius:40% 40% 30% 30%;background:#8EA0BA"></div>')],
    ["Terracotta planter", "9 in stock", "c-w", thumb("#F3E3DA", '<div style="width:40px;height:32px;border-radius:3px 3px 12px 12px;background:#C2754F"></div>')]];
  const sales = [32, 41, 38, 52, 47, 61, 58, 66, 59, 72, 69, 84, 78, 92];
  window.LANDINGS.store = shell({
    font: "'DM Sans'", fontLink: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap", a: "#15803D", soft: "#E3F4E8", dark: false, bg: "#F5F5F2",
    brand: "Kindred Goods", label: "Store OS", ini: "K", user: "Ella Morgan", uini: "EM", role: "Founder",
    nav: [["Sell", [["home", "Home", 0, 1], ["box", "Orders", 23], ["tag", "Products", 148], ["users", "Customers"]]], ["Operate", [["truck", "Fulfilment", 23], ["box", "Inventory", 4], ["card", "Payouts"]]], ["Grow", [["msg", "Email campaigns"], ["tag", "Discounts"], ["chart", "Analytics"]]], MAKE],
    title: "Good afternoon, Ella", sub: "Kindred Goods · Monday, 5 October 2026 · store live", actions: ["View storefront", "+ Add product"],
    briefTitle: "Today in your shop", brief: [["23", "orders to ship before the 4pm pickup", "Print labels", "w"], ["4", "products low or out of stock", "Reorder"], ["38", "people waiting on Wool blanket restock", "Email when back"], ["$4,812", "sales so far today, +21%", "See report", "g"]],
    kpis: [["Sales today", "$4,812", "+21% vs last Mon", "g"], ["Orders", "96", "23 to ship"], ["Conversion", "3.4%", "+0.3 pts"], ["Returning customers", "38%", ""], ["Low stock", "4", "1 sold out", "r"]],
    cols: "1.25fr 1fr",
    css: ".pg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px}.pc b{display:block;font-size:12.5px;margin-top:6px}.chart{display:flex;align-items:flex-end;gap:5px;height:90px;padding:0 16px 10px}.chart i{flex:1;border-radius:4px 4px 0 0;background:#BBE3C7}.chart i:last-child{background:#15803D}",
    body: `<div class="card"><div class="ch">Orders<span>today · 96</span></div><table><tr><th>Order</th><th>Customer</th><th>Items</th><th style="text-align:right">Total</th><th>Fulfilment</th></tr>${orders.map(([o, c2, it, t, st, cl]) => `<tr><td style="color:#6B7280">${o}</td><td><b>${c2}</b></td><td style="color:#4B5563">${it}</td><td class="n">${t}</td><td><span class="chip ${cl}">${st}</span></td></tr>`).join("")}</table>
<div class="ch" style="border-top:1px solid #EEF0F4">Sales · last 14 days<span>$41,280</span></div><div class="chart">${sales.map(v => `<i style="height:${v}%"></i>`).join("")}</div></div>
<div class="card"><div class="ch">Inventory<a>Manage →</a></div><div class="pg">${prods.map(([n, s, cl, th]) => `<div class="pc">${th}<b>${n}</b><span class="chip ${cl}" style="margin-top:4px">${s}</span></div>`).join("")}</div>
<div class="ch" style="border-top:1px solid #EEF0F4">Ready to ship<span>23 orders</span></div><div class="li"><div class="t"><b>USPS pickup at 4:00pm</b><small>23 labels to print · 2 need address check</small></div><span class="ab p">Print labels</span></div></div>`
  });
})();
