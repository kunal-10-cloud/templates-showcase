// Studio OS · Forge Strength Club — coach view: class roster, RX/Scaled leaderboard, member app, billing and trial funnel.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const av = ["#FF5A36", "#3DA5FF", "#B07CFF", "#2EC27E", "#F5B700", "#FF6FA3", "#22C3C3", "#9AA4B2"];
  const ini = n => n.split(" ").map(p => p[0]).join("").slice(0, 2);

  // name, state, note, tag
  const roster = [
    ["Ava Johnson", "booked", "Trial · first class · waiver signed", "first"],
    ["Marcus Lee", "in", "Back squat PR last week", "pr"],
    ["Priya Nair", "in", "Unlimited · 212 classes", ""],
    ["Diego Ramos", "in", "L shoulder · scale overhead", "injury"],
    ["Hannah Cole", "booked", "8 classes / mo · 3 left", ""],
    ["Tyler Brooks", "booked", "Birthday today", "bday"],
    ["Sofia Kim", "booked", "Card expires 10/26", "card"],
    ["Ben Ortiz", "late", "Cancelled 5:31 PM, after cutoff", ""],
    ["Jade Wilson", "noshow", "Missed Sat 9:00 AM · fee pending", ""]
  ];
  const tagHtml = t => ({
    first: '<span class="tg tg-v">First class</span>', pr: '<span class="tg tg-g">PR</span>', injury: '<span class="tg tg-r">Injury note</span>',
    bday: '<span class="tg tg-p">Birthday</span>', card: '<span class="tg tg-y">Card expiring</span>'
  })[t] || "";
  const stateHtml = s => ({
    in: '<span class="st st-in">Checked in</span>',
    booked: '<span class="btn-s">Check in</span>',
    late: '<span class="st st-late">Late cancel</span><span class="fee">Charge $15</span>',
    noshow: '<span class="st st-ns">No-show</span><span class="fee">Charge $15</span>'
  })[s];
  const rosterRows = roster.map(([n, s, note, t], i) => `<div class="rr${s === "late" || s === "noshow" ? " dim" : ""}"><span class="av" style="background:${av[i % av.length]}">${ini(n)}</span><div class="rn"><b>${n}</b>${tagHtml(t)}<small>${note}</small></div><div class="ra">${stateHtml(s)}</div></div>`).join("");

  // leaderboards (5:00 PM class results, sorted by time)
  const rx = [["Jordan Hale", "4:52", 1], ["Kim Alvarez", "5:18", 0], ["Chris Dunn", "5:41", 1], ["Leah Park", "6:05", 0], ["Omar Haddad", "6:30", 0], ["Nina Shah", "7:12", 0]];
  const sc = [["Ella Moore", "5:47", 0], ["Ivy Chen", "6:10", 1], ["Grace Liu", "6:38", 0], ["Sam Ortega", "7:02", 0], ["Ruth Bell", "7:55", 0]];
  const board = (rows, cls) => rows.map(([n, t, pr], i) => `<div class="lb${i === 0 ? " top" : ""}"><span class="rk ${cls}">${i + 1}</span><span class="ln">${n}</span>${pr ? '<span class="star">★ PR</span>' : ""}<span class="tm">${t}</span></div>`).join("");

  window.LANDINGS.gym = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
*{box-sizing:border-box}
body{margin:0;width:1440px;height:900px;overflow:hidden;background:#0C0D10;color:#EDEEF0;font:14px/1.4 'Manrope',system-ui,sans-serif}
.disp{font-family:'Big Shoulders Display',Impact,sans-serif;letter-spacing:.01em}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.top{height:58px;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid #1E2026;background:#0C0D10}
.logo{width:34px;height:34px;border-radius:8px;background:#C6FF34;color:#0C0D10;display:grid;place-items:center;font:900 22px 'Big Shoulders Display',sans-serif}
.brand b{display:block;font-size:14.5px;font-weight:800}.brand span{font:500 10.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#7C818C}
.tabs{display:flex;gap:4px;margin-left:22px}.tabs span{padding:8px 13px;border-radius:8px;font-weight:600;color:#9A9FAA;font-size:13.5px}
.tabs span.on{background:#1B1D23;color:#fff}.tabs em{font-style:normal;background:#FF4D3A;color:#fff;border-radius:9px;font-size:10.5px;padding:0 6px;margin-left:5px;font-weight:800}
.right{margin-left:auto;display:flex;align-items:center;gap:12px}
.chip{border:1px solid #2A2D35;border-radius:9px;padding:7px 11px;font-size:12.5px;font-weight:700;color:#C6FF34}
.clock{font:800 26px 'Big Shoulders Display',sans-serif;color:#fff}
.uav{width:32px;height:32px;border-radius:50%;background:#3DA5FF;display:grid;place-items:center;font-weight:800;font-size:12px}
.grid{display:grid;grid-template-columns:452px 560px 364px;gap:16px;padding:16px 16px 0}
.panel{background:#15171C;border:1px solid #22252C;border-radius:16px;height:666px;overflow:hidden;display:flex;flex-direction:column}
.ph{padding:14px 18px 11px;border-bottom:1px solid #22252C}
.eyebrow{font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#7C818C;text-transform:uppercase}
.ctitle{display:flex;align-items:baseline;gap:10px;margin-top:6px}.ctitle h2{margin:0;font:800 30px/1 'Big Shoulders Display',sans-serif;text-transform:uppercase}
.ctitle span{color:#9A9FAA;font-weight:600}
.cap{display:flex;align-items:center;gap:10px;margin-top:12px}
.capbar{flex:1;height:8px;border-radius:5px;background:#24272F;display:flex;overflow:hidden}.capbar i{display:block;height:100%}
.capn{font:700 12.5px 'JetBrains Mono',monospace;color:#C9CCD3}
.rr{display:grid;grid-template-columns:30px 1fr auto;gap:11px;align-items:center;padding:6px 18px;border-bottom:1px solid #1E2026}
.rr.dim .rn b{color:#9A9FAA}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:12px;color:#0C0D10}
.rn b{font-size:14px;font-weight:700}.rn small{display:block;color:#7C818C;font-size:12px;margin-top:1px}
.tg{display:inline-block;margin-left:7px;font-size:10.5px;font-weight:800;padding:1px 7px;border-radius:6px;vertical-align:1px}
.tg-v{background:#C6FF34;color:#0C0D10}.tg-g{background:#3A2F07;color:#FFCF33}.tg-r{background:#3A1512;color:#FF7A6B}.tg-p{background:#2E1A3B;color:#D9A6FF}.tg-y{background:#3A2E0B;color:#F5C451}
.ra{display:flex;gap:6px;align-items:center}
.st{font-size:11.5px;font-weight:800;padding:4px 9px;border-radius:7px}
.st-in{background:#163323;color:#4ADE80}.st-late{background:#3A2A0B;color:#F5B700}.st-ns{background:#3A1512;color:#FF7A6B}
.btn-s{font-size:12px;font-weight:800;padding:6px 11px;border-radius:8px;background:#C6FF34;color:#0C0D10}
.fee{font-size:11.5px;font-weight:700;padding:4px 8px;border-radius:7px;border:1px solid #3A3D46;color:#EDEEF0}
.wl{margin-top:auto;padding:12px 18px 14px;background:#111317;border-top:1px solid #22252C}
.wl .eyebrow{display:flex;justify-content:space-between}
.wli{display:flex;align-items:center;gap:10px;margin-top:9px;font-size:13px}.wli .n{font:800 15px 'Big Shoulders Display',sans-serif;color:#C6FF34;width:16px}
.wli small{color:#7C818C;margin-left:auto}
/* whiteboard */
.wb{background:radial-gradient(120% 80% at 0% 0%,#1D2A0D 0%,#15171C 55%);}
.wod{padding:16px 20px 14px;border-bottom:1px solid #22252C;display:grid;grid-template-columns:1fr 200px;gap:14px}
.wod h1{white-space:nowrap;margin:6px 0 6px;font:900 46px/0.95 'Big Shoulders Display',sans-serif;text-transform:uppercase;color:#fff}
.wod h1 span{color:#C6FF34}
.mv{font:600 15px/1.55 'Manrope',sans-serif;color:#D6D9DE}.mv b{font:700 13px 'JetBrains Mono',monospace;color:#C6FF34;margin-right:8px}
.str{background:#101216;border:1px solid #262A31;border-radius:12px;padding:12px}
.str .eyebrow{color:#C6FF34}.str p{margin:6px 0 0;font-size:13px;color:#C9CCD3;line-height:1.45}
.boards{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:14px 16px 0;flex:1;min-height:0}
.bd{background:#101216;border:1px solid #262A31;border-radius:12px;overflow:hidden}
.bdh{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #22252C}
.bdh b{font:800 20px 'Big Shoulders Display',sans-serif;letter-spacing:.04em}.bdh small{color:#7C818C;font-size:11.5px}
.lb{display:grid;grid-template-columns:26px 1fr auto auto;gap:8px;align-items:center;padding:8px 12px;border-bottom:1px solid #1B1E24;font-size:13.5px}
.lb.top{background:linear-gradient(90deg,rgba(198,255,52,.12),transparent)}
.rk{width:24px;height:24px;border-radius:6px;display:grid;place-items:center;font:800 13px 'JetBrains Mono',monospace}
.rk.rx{background:#C6FF34;color:#0C0D10}.rk.scl{background:#2A2D35;color:#EDEEF0}
.lb .ln{font-weight:700}.tm{font:700 15px 'JetBrains Mono',monospace;color:#fff}
.star{font-size:11px;font-weight:800;color:#FFCF33;background:#3A2F07;border-radius:6px;padding:2px 6px}
.wbf{display:flex;gap:10px;padding:12px 16px 16px}
.kiosk{flex:1;border:1px dashed #3A3D46;border-radius:10px;padding:10px 12px;font-size:12.5px;color:#9A9FAA;display:flex;align-items:center;gap:10px}
.kiosk b{color:#EDEEF0}
.big-btn{border-radius:10px;padding:12px 16px;font-weight:800;font-size:13.5px;background:#C6FF34;color:#0C0D10;white-space:nowrap}
/* phone */
.phonecol{background:linear-gradient(180deg,#17191F,#101216);align-items:center;justify-content:center;position:relative}
.phonecol .eyebrow{position:absolute;top:14px;left:18px}
.phone{width:286px;height:590px;border-radius:44px;background:#000;padding:10px;box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 0 1px #2A2D35;margin-top:26px}
.scr{width:100%;height:100%;border-radius:35px;background:#F4F5F2;color:#0C0D10;overflow:hidden;display:flex;flex-direction:column}
.sb{display:flex;justify-content:space-between;padding:12px 22px 4px;font-weight:800;font-size:12px}
.ma{padding:6px 16px;display:flex;flex-direction:column;gap:10px}
.ma .hi{font-size:12px;color:#5A606B}.ma h3{margin:0;font:900 30px/0.95 'Big Shoulders Display',sans-serif;text-transform:uppercase}
.cls{background:#0C0D10;color:#fff;border-radius:16px;padding:12px}
.cls .row{display:flex;justify-content:space-between;align-items:center}
.cls b{font:800 20px 'Big Shoulders Display',sans-serif}.cls small{color:#9A9FAA;font-size:11.5px}
.qr{margin:10px auto 6px;width:118px;height:118px;border-radius:10px;background:#fff;padding:8px;display:grid;grid-template-columns:repeat(9,1fr);gap:1.5px}
.qr i{background:#0C0D10;border-radius:1px}.qr i.o{background:transparent}
.cls .note{font-size:11px;color:#C6FF34;text-align:center;font-weight:700}
.hist{background:#fff;border-radius:14px;padding:10px 12px;border:1px solid #E3E5E0}
.hist .r{display:flex;justify-content:space-between;font-size:12px;padding:3px 0}.hist .r b{font-family:'JetBrains Mono',monospace}
.cancel{font-size:11px;color:#5A606B;text-align:center}
/* bottom strip */
.strip{display:grid;grid-template-columns:452px 560px 364px;gap:16px;padding:16px}
.scard{background:#15171C;border:1px solid #22252C;border-radius:16px;padding:14px 18px;height:128px}
.scard h4{margin:0;display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:800}
.dun{display:flex;gap:10px;margin-top:10px}
.dn{flex:1;background:#111317;border:1px solid #262A31;border-radius:10px;padding:8px 10px;font-size:12px}
.dn b{display:block;font-size:13px}.dn small{color:#7C818C}.dn .rt{color:#F5B700;font-weight:700}
.fun{display:flex;align-items:flex-end;gap:10px;margin-top:12px;height:64px}
.fb{flex:1;display:flex;flex-direction:column;gap:4px}
.fb i{display:block;border-radius:6px 6px 2px 2px;background:#2A2D35}.fb i.hl{background:#C6FF34}
.fb span{font-size:11px;color:#9A9FAA;display:flex;justify-content:space-between}.fb span b{color:#fff;font-family:'JetBrains Mono',monospace}
.kp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
.kp div b{display:block;font:800 30px/1 'Big Shoulders Display',sans-serif}.kp div small{color:#7C818C;font-size:11.5px}
.live{display:inline-block;width:7px;height:7px;border-radius:50%;background:#4ADE80;box-shadow:0 0 8px #4ADE80;animation:p 1.5s infinite;margin-right:6px}
@keyframes p{50%{opacity:.35}}
</style></head><body>
<div class="top"><div class="logo">F</div><div class="brand"><b>Forge Strength Club</b><span>STUDIO OS</span></div>
<div class="tabs"><span class="on">Coach view</span><span>Schedule</span><span>Members</span><span>Programming</span><span>Leads<em>7</em></span><span>Billing<em>3</em></span><span>Reports</span></div>
<div class="right"><span class="chip">✦ Make it yours</span><span class="clock">5:52 PM</span><span class="uav">MH</span></div></div>

<div class="grid">
<section class="panel">
<div class="ph"><div class="eyebrow"><span class="live"></span>Next class · starts in 8 min</div>
<div class="ctitle"><h2>6:00 PM CrossFit</h2><span>Coach Marcus · Main floor</span></div>
<div class="cap"><div class="capbar"><i style="width:16.7%;background:#4ADE80"></i><i style="width:72.2%;background:#5A606B"></i></div><span class="capn">3 IN · 16/18 BOOKED</span></div></div>
${rosterRows}
<div class="wl"><div class="eyebrow"><span>Waitlist · 2</span><span style="color:#C6FF34">Auto-promotes on cancel</span></div>
<div class="wli"><span class="n">1</span><b>Noah Fisher</b><small>joined 3:10 PM · notified by text</small></div>
<div class="wli"><span class="n">2</span><b>Mia Torres</b><small>joined 4:42 PM</small></div></div>
</section>

<section class="panel wb">
<div class="wod"><div><div class="eyebrow">Today's WOD · Mon 5 Oct</div><h1>"Cinco" <span>for time</span></h1>
<div class="mv"><b>21-15-9</b>Thrusters 95 / 65 lb<br><b>21-15-9</b>Pull-ups<br><b>CAP</b>10:00</div></div>
<div class="str"><div class="eyebrow">Strength first</div><p>Back squat 5×3 @ 80%<br>Rest 2:00 between sets</p><p style="color:#7C818C;font-size:12px">Scaled: thrusters 65 / 45, ring rows</p></div></div>
<div class="boards">
<div class="bd"><div class="bdh"><b>RX</b><small>Today so far · 6 scores</small></div>${board(rx, "rx")}</div>
<div class="bd"><div class="bdh"><b>SCALED</b><small>5 scores</small></div>${board(sc, "scl")}</div>
</div>
<div class="wbf"><div class="kiosk"><span class="live"></span><span>Lobby TV is showing this board. <b>Athletes log scores on the kiosk or app.</b></span></div><span class="big-btn">Start class</span></div>
</section>

<section class="panel phonecol"><div class="eyebrow">Member app · Ava's phone</div>
<div class="phone"><div class="scr"><div class="sb"><span>5:52</span><span>●●● ▮</span></div>
<div class="ma"><span class="hi">Hi Ava · trial day 1 of 7</span><h3>You're booked</h3>
<div class="cls"><div class="row"><div><b>6:00 PM CROSSFIT</b><br><small>Coach Marcus · spot 16 of 18</small></div></div>
<div class="qr">${Array.from({ length: 81 }, (_, k) => { const x = k % 9, y = Math.floor(k / 9); const corner = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5); const on = corner ? !(x % 6 === 1 && y % 6 === 1) : ((x * 7 + y * 11 + x * y) % 3 !== 0); return `<i class="${on ? "" : "o"}"></i>`; }).join("")}</div>
<div class="note">Scan at the front desk to check in</div></div>
<div class="hist"><div class="r"><span>Thrusters goal weight</span><b>65 lb</b></div><div class="r"><span>Class pack</span><b>Trial · 6 left</b></div><div class="r"><span>Waiver</span><b style="color:#16A34A">Signed</b></div></div>
<div class="cancel">Free cancellation closed at 4:00 PM.<br>Late cancels are charged $15.</div></div></div></div>
</section>
</div>

<div class="strip">
<div class="scard"><h4>Failed payments <span style="color:#F5B700;font-size:12.5px">$497 retrying</span></h4>
<div class="dun"><div class="dn"><b>Leo Park</b><small>$149 · card expired</small><br><span class="rt">Retry 2 of 4 · Wed</span></div><div class="dn"><b>Nora Diaz</b><small>$149 · insufficient funds</small><br><span class="rt">Card link sent</span></div><div class="dn"><b>Sam Ortega</b><small>$199 · declined</small><br><span class="rt">Retry 1 of 4 · Tue</span></div></div></div>
<div class="scard"><h4>Leads to members · last 30 days <span style="color:#9A9FAA;font-size:12.5px;font-weight:600">Intro offer: 7 days for $29</span></h4>
<div class="fun"><div class="fb"><i style="height:44px"></i><span>Leads <b>23</b></span></div><div class="fb"><i style="height:27px"></i><span>Trials booked <b>14</b></span></div><div class="fb"><i style="height:17px"></i><span>Showed up <b>9</b></span></div><div class="fb"><i class="hl" style="height:10px"></i><span>Joined <b>5</b></span></div></div></div>
<div class="scard"><h4>Today</h4><div class="kp"><div><b>214</b><small>check-ins</small></div><div><b>9</b><small>classes</small></div><div><b>612</b><small>active members</small></div></div></div>
</div>
</body></html>`;
})();
