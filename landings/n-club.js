// Club OS · Riverside United FC — matchday availability, team sheet on a 9v9 pitch, subs and safeguarding.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const av = (st) => ({ yes: "#2FBF71", maybe: "#F2B53A", no: "#E5534B", none: "#8A94A6" })[st];
  // 9v9 3-3-2 (U12 in England play 9v9)
  const starters = [
    ["AH", "Alfie Hughes", 1, 50, 88, "GK"],
    ["IB", "Isaac Bennett", 3, 22, 68, ""], ["LM", "Leo Morgan", 5, 50, 71, ""], ["NP", "Noah Patel", 2, 78, 68, ""],
    ["HS", "Harrison Shaw", 7, 20, 44, ""], ["OO", "Oliver Okafor", 6, 50, 49, "C"], ["FC", "Freddie Clarke", 8, 80, 44, ""],
    ["AD", "Archie Davies", 9, 35, 20, ""], ["JW", "Jacob Wilson", 11, 65, 20, ""]
  ];
  const bench = [["TR", "Theo Rahman", 12], ["EO", "Ethan Okafor", 14], ["RP", "Rory Price", 15], ["MT", "Max Turner", 16]];
  const pitchPlayers = starters.map(([i, n, num, x, y, tag]) => `<div class="pp" style="left:${x}%;top:${y}%">
      <div class="shirt${tag === "GK" ? " gk" : ""}"><b>${num}</b></div>
      <span>${n.split(" ")[0]} ${n.split(" ")[1][0]}.${tag === "C" ? ' <em>C</em>' : ""}</span></div>`).join("");

  const squad = [
    ["Alfie Hughes", "yes", "GK · 2m ago"], ["Noah Patel", "yes", "Sun"], ["Leo Morgan", "yes", "Sun"], ["Isaac Bennett", "yes", "Mon"],
    ["Oliver Okafor", "yes", "Sun"], ["Harrison Shaw", "yes", "Sun"], ["Freddie Clarke", "yes", "Mon"], ["Archie Davies", "yes", "Sun"],
    ["Jacob Wilson", "yes", "Sun"], ["Theo Rahman", "yes", "Mon"], ["Ethan Okafor", "yes", "Sun"], ["Rory Price", "yes", "Mon"],
    ["Max Turner", "yes", "Mon"], ["Leon Ward", "maybe", "“depends on cousin’s party”"], ["Sam Kelly", "maybe", "“back from cold?”"],
    ["Dylan Ross", "no", "Half-term holiday"], ["Kai Jones", "no", "Ankle · physio"], ["Toby Evans", "none", "Reminder sent Thu 18:00"]
  ];
  const counts = { yes: 13, maybe: 2, no: 2, none: 1 };
  const squadRows = squad.slice(13).map(([n, st, note]) => `<div class="sq"><span class="dot" style="background:${av(st)}"></span><b>${n}</b><small>${note}</small></div>`).join("");
  const yesFaces = squad.slice(0, 13).map(([n]) => `<i title="${n}">${n.split(" ").map(w => w[0]).join("")}</i>`).join("");

  const results = [
    ["U14 Tigers", "Filton Jnrs", "3–1", "W"], ["U16 Hawks", "Bristol Rangers", "0–2", "L"],
    ["Ladies", "Keynsham Town", "2–2", "D"], ["Men's 1st XI", "Avonmouth", "1–0", "W"]
  ];
  const weekend = [
    ["SAT 09:30", "U9 Cubs", "v Bradley Stoke", "H", "Pitch 2 · no scores (FA U7–U11)"],
    ["SAT 10:00", "U12 Lions", "@ Kingswood Colts", "A", "Meet 09:15 · Kingswood Park P3"],
    ["SAT 11:30", "U14 Tigers", "v Portishead Jnrs", "H", "Pitch 1 · ref confirmed"],
    ["SUN 14:00", "Men's 1st XI", "@ Shirehampton", "A", "League · Div 2"]
  ];
  const overdue = [
    ["Okafor family", "Oliver + Ethan · sibling −10%", "£41.80", "DD failed 1 Oct"],
    ["L. Ward", "U12 Lions", "£22.00", "12 days"],
    ["Ladies · 3 players", "Match fees", "£18.00", "Card link sent"]
  ];

  window.LANDINGS.club = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Rethink+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Rethink Sans',system-ui,sans-serif;color:#0E1A2B;background:#EEF2F7}
.top{height:58px;background:#0B1F3A;color:#DCE6F5;display:flex;align-items:center;gap:22px;padding:0 22px}
.crest{width:36px;height:40px;background:linear-gradient(180deg,#5BB8F0 0 50%,#0B1F3A 50%);clip-path:polygon(0 0,100% 0,100% 62%,50% 100%,0 62%);display:grid;place-items:center;border:2px solid #fff;position:relative}
.crest:after{content:"RU";position:absolute;font:800 13px 'Saira Condensed';color:#fff;top:13px;text-shadow:0 1px 2px rgba(0,0,0,.5)}
.brand b{display:block;color:#fff;font:700 18px/1 'Saira Condensed',sans-serif;letter-spacing:.02em}.brand span{font:500 10px 'JetBrains Mono';letter-spacing:.14em;color:#7FA4CF}
.tabs{display:flex;gap:2px;margin-left:10px}.tabs a{padding:7px 12px;border-radius:8px;color:#AFC3DD;font-weight:600;text-decoration:none}.tabs a.on{background:#183256;color:#fff}
.tabs em{font-style:normal;background:#E5534B;color:#fff;font-size:10.5px;border-radius:8px;padding:0 6px;margin-left:5px}
.sp{flex:1}.ask{border:1px solid #2E5384;color:#CFE2FA;border-radius:9px;padding:7px 12px;font-weight:600}.ask:before{content:"\\2726 ";color:#5BB8F0}
.me{width:32px;height:32px;border-radius:50%;background:#5BB8F0;color:#0B1F3A;display:grid;place-items:center;font-weight:800;font-size:12px}
.wrap{display:grid;grid-template-columns:330px 1fr 392px;gap:16px;padding:16px 18px;height:842px}
.card{background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(14,26,43,.06),0 0 0 1px #E1E7F0;overflow:hidden}
.ch{display:flex;justify-content:space-between;align-items:center;padding:14px 16px 10px}.ch h3{margin:0;font:700 19px 'Saira Condensed',sans-serif;letter-spacing:.02em;text-transform:uppercase}
.ch span{color:#6B778A;font-size:12px}
.mono{font-family:'JetBrains Mono',monospace}
/* availability */
.fix{margin:0 16px;padding:14px;border-radius:12px;background:linear-gradient(135deg,#0B1F3A,#183A66);color:#fff}
.fix .k{font:600 10.5px 'JetBrains Mono';letter-spacing:.12em;color:#7FC7F5}
.vs{display:flex;align-items:center;gap:10px;margin:8px 0 4px;font:800 24px/1 'Saira Condensed'}
.vs i{font-style:normal;font-size:14px;color:#7FC7F5;font-weight:700}
.fix p{margin:0;color:#B9CCE6;font-size:12px}
.cnt{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:12px 16px 8px}
.cnt div{border-radius:10px;padding:8px 6px;text-align:center;background:#F4F7FB}.cnt b{display:block;font:800 22px/1 'Saira Condensed'}.cnt small{font-size:11px;color:#5D6A7E}
.faces{display:flex;flex-wrap:wrap;gap:4px;padding:2px 16px 10px}.faces i{font-style:normal;width:27px;height:27px;border-radius:50%;background:#E6F7EE;color:#1B8F55;border:2px solid #2FBF71;font-size:9.5px;font-weight:800;display:grid;place-items:center}
.sq{display:grid;grid-template-columns:10px 1fr;gap:2px 9px;align-items:center;padding:8px 16px;border-top:1px solid #EEF1F6}
.sq .dot{width:10px;height:10px;border-radius:50%;grid-row:span 2}.sq b{font-weight:600}.sq small{color:#6B778A;font-size:11.5px}
.nudge{margin:10px 16px 14px;display:flex;gap:8px}.btn{border-radius:9px;padding:8px 12px;font-weight:700;font-size:12.5px;border:1px solid #D3DBE6;background:#fff;text-align:center}
.btn.p{background:#0B1F3A;border-color:#0B1F3A;color:#fff}.btn.sky{background:#5BB8F0;border-color:#5BB8F0;color:#0B1F3A}
.ann{margin:12px 0 0;padding:14px 16px;border-top:1px solid #EEF1F6}
.ann .msg{background:#F4F7FB;border-radius:12px;padding:10px 12px;margin-top:8px;font-size:12.5px}
.read{display:flex;align-items:center;gap:8px;margin-top:8px;font-size:12px;color:#5D6A7E}.bar{flex:1;height:6px;border-radius:4px;background:#E4EAF2;overflow:hidden}.bar i{display:block;height:100%;background:#2FBF71}
/* pitch */
.mid{display:flex;flex-direction:column;gap:16px;min-height:0}
.teamtabs{display:flex;gap:6px;padding:0 16px 10px;flex-wrap:wrap}.teamtabs span{padding:5px 11px;border-radius:999px;background:#F1F4F9;font-weight:600;font-size:12px;color:#4A5770}.teamtabs span.on{background:#0B1F3A;color:#fff}
.pitchwrap{padding:0 16px 14px;display:grid;grid-template-columns:1fr 132px;gap:14px}
.pitch{position:relative;height:452px;border-radius:14px;overflow:hidden;background:repeating-linear-gradient(180deg,#2E8B4E 0 45px,#2A8048 45px 90px);box-shadow:inset 0 0 0 3px rgba(255,255,255,.18)}
.ln{position:absolute;border:2px solid rgba(255,255,255,.75)}
.pp{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:4px;width:110px}
.shirt{width:42px;height:42px;border-radius:12px 12px 14px 14px;background:linear-gradient(90deg,#5BB8F0 0 50%,#0B1F3A 50%);display:grid;place-items:center;box-shadow:0 4px 10px rgba(0,0,0,.28);border:2px solid #fff}
.shirt.gk{background:#F2B53A}.shirt b{color:#fff;font:800 17px 'Saira Condensed';text-shadow:0 1px 2px rgba(0,0,0,.45)}
.pp span{background:rgba(8,20,36,.78);color:#fff;font-size:11.5px;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap}
.pp em{font-style:normal;background:#F2B53A;color:#0B1F3A;border-radius:4px;padding:0 4px;font-weight:800;font-size:10px}
.ptag{position:absolute;left:12px;top:12px;background:rgba(8,20,36,.7);color:#fff;border-radius:8px;padding:5px 10px;font:600 11px 'JetBrains Mono';letter-spacing:.08em}
.bench{display:flex;flex-direction:column;gap:8px}
.bench .lbl{font:600 10.5px 'JetBrains Mono';letter-spacing:.1em;color:#6B778A}
.bp{display:flex;align-items:center;gap:8px;padding:8px;border-radius:10px;background:#F4F7FB}
.bp .s{width:28px;height:28px;border-radius:8px;background:linear-gradient(90deg,#5BB8F0 0 50%,#0B1F3A 50%);display:grid;place-items:center;color:#fff;font:800 13px 'Saira Condensed'}
.bp b{font-size:12px;font-weight:600;line-height:1.2}
.pend{border:1.5px dashed #F2B53A;background:#FFF9EC}
.pub{margin-top:auto;display:flex;flex-direction:column;gap:6px}
.wk{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 16px 14px}
.wk div{border-radius:12px;background:#F4F7FB;padding:10px 12px;border-left:4px solid #5BB8F0}
.wk div.hl{background:#E8F4FD;border-left-color:#0B1F3A}
.wk small{display:block;color:#6B778A;font-size:11px}.wk b{display:block;font:700 15px 'Saira Condensed';letter-spacing:.02em}.wk .mono{font-size:10.5px;color:#2B6CB0}
/* right */
.right{display:flex;flex-direction:column;gap:16px;min-height:0}
.res{display:grid;grid-template-columns:22px 1fr auto;gap:10px;align-items:center;padding:7px 16px;border-top:1px solid #EEF1F6}
.wdl{width:22px;height:22px;border-radius:6px;display:grid;place-items:center;font:800 12px 'Saira Condensed';color:#fff}
.res b{font-weight:600}.res small{color:#6B778A}.res .sc{font:700 16px 'Saira Condensed'}
.subs{padding:0 16px 6px}
.big{font:800 30px/1 'Saira Condensed'}.sub{color:#6B778A;font-size:12px}
.prog{height:10px;border-radius:6px;background:#E4EAF2;overflow:hidden;margin:8px 0 6px;display:flex}.prog i{display:block;height:100%}
.legend{display:flex;gap:12px;font-size:11.5px;color:#4A5770}.legend span:before{content:"";display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px;background:var(--c)}
.od{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:8px 16px;border-top:1px solid #EEF1F6;align-items:center}
.od b{font-weight:600}.od small{color:#6B778A;font-size:11.5px}.od .r{text-align:right}.od .r b{font-family:'JetBrains Mono';font-size:12.5px}.od .r small{color:#C2413A}
.sg{display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center;padding:8px 16px;border-top:1px solid #EEF1F6}
.av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:11px;font-weight:800}
.pill{border-radius:999px;padding:2px 9px;font-size:11px;font-weight:700;white-space:nowrap}
.ok{background:#E6F7EE;color:#1B8F55}.wa{background:#FFF4DB;color:#9A6400}.bad{background:#FDE8E7;color:#B4362F}
</style></head><body>
<div class="top"><div class="crest"></div><div class="brand"><b>RIVERSIDE UNITED FC</b><span>CLUB OS · BRISTOL</span></div>
<nav class="tabs"><a class="on">Matchday</a><a>Teams</a><a>Members<em>9</em></a><a>Subs &amp; payments</a><a>Fixtures</a><a>Safeguarding<em>1</em></a><a>Messages</a></nav>
<div class="sp"></div><span class="ask">Ask Club OS</span><span class="me">SE</span></div>
<div class="wrap">
<section class="card" style="display:flex;flex-direction:column">
  <div class="ch"><h3>Availability</h3><span>U12 Lions · 18 in squad</span></div>
  <div class="fix"><div class="k">SAT 10 OCT · KO 10:00 · AWAY</div><div class="vs">U12 LIONS <i>at</i> KINGSWOOD COLTS</div><p>Meet 09:15 · Kingswood Park, pitch 3 · away kit (navy)</p></div>
  <div class="cnt"><div><b style="color:#1B8F55">${counts.yes}</b><small>Available</small></div><div><b style="color:#B07A10">${counts.maybe}</b><small>Maybe</small></div><div><b style="color:#C2413A">${counts.no}</b><small>Can't</small></div><div><b style="color:#5D6A7E">${counts.none}</b><small>No reply</small></div></div>
  <div class="faces">${yesFaces}</div>
  ${squadRows}
  <div class="nudge"><span class="btn" style="flex:1">Auto-reminder · Thu 18:00 ✓</span><span class="btn p">Nudge Toby</span></div>
  <div class="ann" style="margin-top:auto"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font:700 15px 'Saira Condensed';letter-spacing:.03em">ANNOUNCEMENT · U12 PARENTS</b><span class="pill ok">Sent 4 Oct</span></div>
    <div class="msg">New away kit ready — collect from the clubhouse Thursday 6–7pm before training. Bring £5 for the training top if you ordered one.</div>
    <div class="read"><span>31 of 36 read</span><div class="bar"><i style="width:86%"></i></div><span>86%</span></div></div>
</section>

<section class="mid">
  <div class="card">
    <div class="ch"><h3>Team sheet · Saturday</h3><span>Coach Mark Hughes · drag players to change</span></div>
    <div class="teamtabs"><span>U9 Cubs</span><span>U10 Foxes</span><span class="on">U12 Lions</span><span>U14 Tigers</span><span>U16 Hawks</span><span>Ladies</span><span>Men's 1st XI</span></div>
    <div class="pitchwrap">
      <div class="pitch">
        <div class="ln" style="left:16px;right:16px;top:16px;bottom:16px;border-radius:6px"></div>
        <div class="ln" style="left:16px;right:16px;top:50%;height:0;border-width:2px 0 0"></div>
        <div class="ln" style="left:50%;top:50%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%"></div>
        <div class="ln" style="left:28%;right:28%;top:16px;height:70px;border-top:0"></div>
        <div class="ln" style="left:28%;right:28%;bottom:16px;height:70px;border-bottom:0"></div>
        <div class="ln" style="left:40%;right:40%;bottom:16px;height:26px;border-bottom:0"></div>
        <div class="ln" style="left:40%;right:40%;top:16px;height:26px;border-top:0"></div>
        <span class="ptag">9v9 · 3-3-2 · ROLLING SUBS</span>
        ${pitchPlayers}
      </div>
      <div class="bench"><div class="lbl">BENCH · 4</div>
        ${bench.map(([i, n, num]) => `<div class="bp"><span class="s">${num}</span><b>${n.split(" ")[0]}<br><small style="color:#6B778A;font-weight:500">${n.split(" ")[1]}</small></b></div>`).join("")}
        <div class="lbl" style="margin-top:6px">PENDING</div>
        <div class="bp pend"><span class="s" style="background:#F2B53A">?</span><b>Leon W.<br><small style="color:#9A6400;font-weight:500">Maybe</small></b></div>
        <div class="pub"><span class="btn sky">Publish team sheet</span><span class="btn">Equal minutes ✓</span></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="ch"><h3>This weekend at Riverside</h3><span>4 fixtures · 2 home</span></div>
    <div class="wk">${weekend.map(([t, team, opp, ha, note], i) => `<div class="${i === 1 ? "hl" : ""}"><span class="mono">${t} · ${ha === "H" ? "HOME" : "AWAY"}</span><b>${team}</b><small>${opp}</small><small style="margin-top:4px">${note}</small></div>`).join("")}</div>
  </div>
</section>

<section class="right">
  <div class="card">
    <div class="ch"><h3>Results · Sat 3 Oct</h3><span>U14 Tigers 2nd · Div 2</span></div>
    ${results.map(([t, o, s, r]) => `<div class="res"><span class="wdl" style="background:${r === "W" ? "#2FBF71" : r === "L" ? "#E5534B" : "#8A94A6"}">${r}</span><div><b>${t}</b> <small>v ${o}</small></div><span class="sc">${s}</span></div>`).join("")}
    <div style="height:8px"></div>
  </div>
  <div class="card">
    <div class="ch"><h3>Subs · October</h3><span>186 members</span></div>
    <div class="subs"><div style="display:flex;align-items:baseline;gap:8px"><span class="big">£3,742</span><span class="sub">of £4,090 collected · 91%</span></div>
      <div class="prog"><i style="width:78%;background:#0B1F3A"></i><i style="width:13.5%;background:#5BB8F0"></i></div>
      <div class="legend"><span style="--c:#0B1F3A">Direct Debit £3,190</span><span style="--c:#5BB8F0">Card £552</span><span style="--c:#E4EAF2">Due £348</span></div></div>
    ${overdue.map(([a, b, c, d]) => `<div class="od"><div><b>${a}</b><br><small>${b}</small></div><div class="r"><b>${c}</b><br><small>${d}</small></div></div>`).join("")}
    <div style="display:flex;gap:8px;padding:10px 16px 14px"><span class="btn p" style="flex:1">Send reminders · 9</span><span class="btn">Family discounts</span></div>
  </div>
  <div class="card">
    <div class="ch"><h3>Safeguarding</h3><span>Welfare Officer · Sarah Ellis</span></div>
    <div class="sg"><span class="av" style="background:#2B6CB0">MH</span><div><b>Mark Hughes</b><br><small style="color:#6B778A">U12 coach · DBS expires 14 Nov</small></div><span class="pill wa">40 days</span></div>
    <div class="sg"><span class="av" style="background:#1B8F55">PS</span><div><b>Priya Shah</b><br><small style="color:#6B778A">U9 coach · DBS to Mar 2028</small></div><span class="pill ok">Valid</span></div>
    <div class="sg" style="padding-bottom:14px"><span class="av" style="background:#B4362F">DC</span><div><b>Dan Cole</b><br><small style="color:#6B778A">New volunteer · DBS applied 28 Sep</small></div><span class="pill bad">Not cleared</span></div>
  </div>
</section>
</div></body></html>`;
})();
