// Course OS · Craft Academy: course builder (outline + lesson editor) with cohort progress and the offer.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    grip: '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
    play: '<path d="M7 5v14l11-7z" fill="currentColor"/>', video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>', task: '<path d="M9 11l2 2 4-4"/><rect x="4" y="4" width="16" height="16" rx="3"/>',
    live: '<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    drip: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>', chev: '<path d="M6 9l6 6 6-6"/>', chevr: '<path d="M9 6l6 6-6 6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    eye: '<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/>', cap: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 11h2M14 11h2M8 14h8"/>',
    cert: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    check: '<path d="M5 12l5 5 9-10"/>', plus: '<path d="M12 5v14M5 12h14"/>', star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="none"/>'
  };

  // [type, title, meta, status]
  const mods = [
    { n: 1, t: "Foundations", rule: ["Unlocked", "ok"], lessons: [["video", "Welcome & how this course works", "4:12", "Published"], ["video", "What product designers actually do", "11:40", "Published"], ["quiz", "Quiz · design vocabulary", "8 Q · pass 70%", "Published"]] },
    { n: 2, t: "Research & problem framing", rule: ["Drip · day 7", "drip"], lessons: [["video", "Interviewing users without leading them", "18:05", "Published"], ["task", "Assignment · run 3 interviews", "reviewed", "Published"], ["video", "Affinity mapping your notes", "9:48", "Published"]] },
    { n: 3, t: "Wireframes & flows", rule: ["Locked · after 2.2", "lock"], open: 1, lessons: [["video", "Sketching flows fast", "14:22", "Published", 1], ["video", "Low-fi wireframes in Figma", "21:08", "Draft"], ["live", "Live · wireframe critique", "Thu 22 Oct", "Scheduled"]] },
    { n: 4, t: "Visual design systems", rule: ["Drip · day 21", "drip"], collapsed: "5 lessons" },
    { n: 5, t: "Capstone project", rule: ["Certificate on completion", "cert"], collapsed: "3 lessons · portfolio review" }
  ];
  const ruleIc = { ok: I.check, drip: I.drip, lock: I.lock, cert: I.cert };
  const typeIc = { video: I.video, quiz: I.quiz, task: I.task, live: I.live };
  const outline = mods.map(m => `
    <div class="mod">
      <div class="mh"><span class="grip">${ic(I.grip, 14)}</span><b>${m.n}. ${m.t}</b><span class="rule ${m.rule[1]}">${ic(ruleIc[m.rule[1]], 11)}${m.rule[0]}</span><span class="cv">${ic(m.collapsed ? I.chevr : I.chev, 14)}</span></div>
      ${m.collapsed ? `<div class="mc">${m.collapsed}</div>` : m.lessons.map((l, i) => `
        <div class="ls${l[4] ? " sel" : ""}"><span class="grip">${ic(I.grip, 12)}</span><span class="ty ${l[0]}">${ic(typeIc[l[0]], 13)}</span><span class="lt"><b>${m.n}.${i + 1} ${l[1]}</b><small>${l[2]}</small></span><span class="st ${l[3].toLowerCase()}">${l[3]}</span></div>`).join("")}
    </div>`).join("");

  // [name, initials, color, pct, last active, status, statusClass]
  const students = [
    ["Hana Sato", "HS", "#E2553B", 92, "12 min ago", "To review", "amb"],
    ["Diego Alvarez", "DA", "#2F6FE4", 78, "2 h ago", "On track", "ok"],
    ["Priya Menon", "PM", "#0E9F8A", 100, "yesterday", "Certified", "cert"],
    ["Tom Becker", "TB", "#8A5CF6", 41, "6 days ago", "Behind", "bad"],
    ["Aisha Bello", "AB", "#C77D12", 66, "4 h ago", "To review", "amb"],
    ["Lucas Moreau", "LM", "#4B5563", 73, "1 h ago", "On track", "ok"]
  ];
  const rows = students.map(s => `<div class="sr"><span class="av" style="background:${s[2]}">${s[1]}</span><b>${s[0]}</b><span class="pg"><i style="width:${s[3]}%"></i></span><span class="pc">${s[3]}%</span><span class="la">${s[4]}</span><span class="tag ${s[6]}">${s[5]}</span></div>`).join("");

  const chapters = [["0:00", "Why sketch first", 0], ["3:40", "Crazy 8s", 25.5], ["9:15", "From sketch to flow", 64.4], ["12:30", "Your turn", 87]];

  window.LANDINGS.lms = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.45 'Geist',system-ui,sans-serif;color:#17161B;background:#F4F3F0}
.top{height:56px;background:#17161B;color:#EDEBF0;display:flex;align-items:center;gap:20px;padding:0 20px}
.br{display:flex;align-items:center;gap:10px}.br i{width:30px;height:30px;border-radius:9px;background:#F25C3B;display:grid;place-items:center;font:italic 22px 'Instrument Serif',serif;color:#fff;font-style:italic}
.br b{display:block;font-size:14px;white-space:nowrap}.br span{font:500 10px 'Geist Mono',monospace;letter-spacing:.14em;color:#8D8A96}
.crumb{color:#8D8A96;font-size:13px}.crumb b{color:#EDEBF0;font-weight:500}
.tabs{display:flex;gap:2px;margin-left:8px}.tabs span{white-space:nowrap;padding:7px 12px;border-radius:8px;color:#B5B2BE;font-weight:500}.tabs span.on{background:#2A2830;color:#fff}.tabs em{font-style:normal;font-size:11px;color:#8D8A96;margin-left:4px}
.tr{margin-left:auto;display:flex;align-items:center;gap:10px}
.gh{white-space:nowrap;display:flex;align-items:center;gap:6px;border:1px solid #3A3842;border-radius:9px;padding:7px 11px;color:#DCDAE2;font-weight:500}
.ask{white-space:nowrap;display:flex;align-items:center;gap:6px;border:1px solid #F25C3B66;color:#FF9A84;border-radius:9px;padding:7px 11px;font-weight:600}
.pub{white-space:nowrap;background:#F25C3B;color:#fff;border-radius:9px;padding:8px 14px;font-weight:700}
.av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:10.5px;font-weight:700;flex:none}
.hdr{height:84px;display:flex;align-items:center;gap:16px;padding:0 20px;border-bottom:1px solid #E4E2DD;background:#FBFAF8}
.thumb{width:92px;height:56px;border-radius:10px;background:radial-gradient(circle at 25% 30%,#FFB49F,transparent 55%),radial-gradient(circle at 80% 70%,#7FB0FF,transparent 55%),linear-gradient(135deg,#F25C3B,#2F6FE4);position:relative;overflow:hidden}
.thumb:after{content:"";position:absolute;inset:14px 18px;border:2px solid rgba(255,255,255,.85);border-radius:6px}
.hdr h1{margin:0;font:400 32px/1 'Instrument Serif',serif;letter-spacing:-.01em}
.hdr .sub{display:flex;gap:8px;margin-top:6px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;border-radius:999px;padding:2px 9px;background:#EEECE7;color:#4A4752}
.pill.g{background:#DDF3E6;color:#13723F}.pill.c{background:#FDE6DF;color:#B83A1F}
.stats{margin-left:auto;display:flex;gap:30px}.stats div{display:flex;flex-direction:column}.stats b{font:600 20px 'Geist',sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}.stats span{font-size:11.5px;color:#7A7682}
.body{display:grid;grid-template-columns:340px minmax(0,1fr) 404px;gap:16px;padding:16px 20px;height:760px}
.card{background:#fff;border:1px solid #E4E2DD;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.ch{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #EFEDE9;font-weight:600}.ch small{color:#7A7682;font-weight:500;font-size:12px}
.mod{border-bottom:1px solid #F1EFEB}
.mh{display:flex;align-items:center;gap:7px;padding:10px 12px 8px;font-size:13px}.mh b{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1}
.grip{color:#C3C0C9;display:flex}.cv{color:#A09CA8;display:flex}
.rule{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:600;padding:1px 7px;border-radius:999px;white-space:nowrap}
.rule.ok{background:#DDF3E6;color:#13723F}.rule.drip{background:#E3ECFD;color:#2350C2}.rule.lock{background:#F2EBFF;color:#6236C9}.rule.cert{background:#FFF1D6;color:#8B5A00}
.ls{display:grid;grid-template-columns:14px 24px minmax(0,1fr) auto;align-items:center;gap:7px;padding:6px 12px 6px 18px;position:relative}
.ls.sel{background:#FFF2EE}.ls.sel:before{content:"";position:absolute;left:0;top:4px;bottom:4px;width:3px;border-radius:2px;background:#F25C3B}
.ty{width:24px;height:24px;border-radius:7px;display:grid;place-items:center}.ty.video{background:#FDE6DF;color:#C8452A}.ty.quiz{background:#E3ECFD;color:#2350C2}.ty.task{background:#DDF3E6;color:#13723F}.ty.live{background:#F2EBFF;color:#6236C9}
.lt{min-width:0}.lt b{display:block;font-weight:500;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lt small{color:#8D8A96;font-size:11px;font-family:'Geist Mono',monospace}
.st{font-size:10.5px;font-weight:600;border-radius:6px;padding:1px 6px}.st.published{color:#13723F;background:#EAF7EF}.st.draft{color:#6B6772;background:#EEECE7}.st.scheduled{color:#6236C9;background:#F2EBFF}
.mc{padding:0 12px 10px 34px;color:#8D8A96;font-size:12px}
.foot{margin-top:auto;padding:12px;display:flex;gap:8px;border-top:1px solid #EFEDE9}
.b{display:inline-flex;align-items:center;gap:6px;border:1px solid #DEDBD5;border-radius:9px;padding:7px 11px;font-weight:600;font-size:12.5px;background:#fff;white-space:nowrap}.b.ai{border-color:#F7C7BA;color:#C8452A;background:#FFF6F3}.b.dk{background:#17161B;border-color:#17161B;color:#fff}
.ed{padding:16px 18px;display:flex;flex-direction:column;gap:12px;min-height:0}
.er{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ec{font-size:12px;color:#8D8A96}.ec b{color:#4A4752;font-weight:500}
.ed h2{margin:3px 0 0;font:400 30px/1.05 'Instrument Serif',serif}
.seg{display:flex;background:#F1EFEB;border-radius:9px;padding:3px}.seg span{padding:5px 11px;border-radius:7px;font-weight:600;font-size:12px;color:#7A7682}.seg span.on{background:#fff;color:#13723F;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.vid{position:relative;height:276px;border-radius:14px;overflow:hidden;background:#111}
.vid img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;filter:saturate(.85) contrast(1.05)}
.vid:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 40%,rgba(0,0,0,.75))}
.pl{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.95);display:grid;place-items:center;color:#17161B;z-index:2;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.vt{position:absolute;left:16px;bottom:44px;z-index:2;color:#fff}.vt b{display:block;font:400 22px 'Instrument Serif',serif}.vt span{font-size:12px;opacity:.85}
.vbar{position:absolute;left:16px;right:16px;bottom:16px;z-index:2;display:flex;align-items:center;gap:10px;color:#fff;font:500 11px 'Geist Mono',monospace}
.track{flex:1;height:4px;border-radius:3px;background:rgba(255,255,255,.3);position:relative}.track i{position:absolute;left:0;top:0;bottom:0;width:31%;background:#F25C3B;border-radius:3px}
.track u{position:absolute;top:-3px;width:2px;height:10px;background:#fff;text-decoration:none}
.badge{position:absolute;right:14px;top:14px;z-index:2;display:flex;gap:6px}.badge span{background:rgba(23,22,27,.75);color:#fff;font-size:11px;font-weight:600;border-radius:7px;padding:3px 8px;backdrop-filter:blur(4px);display:flex;gap:5px;align-items:center}
.chs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.chs div{border:1px solid #ECEAE5;border-radius:10px;padding:7px 10px}.chs b{font:500 11px 'Geist Mono',monospace;color:#C8452A}.chs span{display:block;font-size:12px;font-weight:500}
.two{display:grid;grid-template-columns:1fr 1.15fr;gap:12px}
.box{border:1px solid #ECEAE5;border-radius:12px;padding:12px}.box h4{margin:0 0 8px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8D8A96;font-weight:600;display:flex;justify-content:space-between}
.fi{display:flex;align-items:center;gap:9px;padding:6px 0}.fi .fic{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;flex:none}.fi b{display:block;font-weight:500;font-size:12.5px}.fi small{color:#8D8A96;font-size:11px}
.q{font-weight:500;margin-bottom:7px;font-size:12.5px}.opt{display:flex;align-items:center;gap:8px;border:1px solid #ECEAE5;border-radius:8px;padding:5px 9px;margin-top:5px;font-size:12px}.opt i{width:14px;height:14px;border-radius:50%;border:1.5px solid #C3C0C9;flex:none}
.opt.right{border-color:#9BD8B4;background:#F0FAF4}.opt.right i{border-color:#13723F;background:#13723F;box-shadow:inset 0 0 0 2.5px #fff}
.sets{display:flex;gap:16px;align-items:center;border-top:1px solid #EFEDE9;padding-top:10px;font-size:12.5px;color:#4A4752}
.tg{display:inline-flex;align-items:center;gap:7px;white-space:nowrap}.tg i{width:28px;height:16px;border-radius:999px;background:#D8D5CF;position:relative}.tg i:after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#fff}
.tg.on i{background:#13723F}.tg.on i:after{left:14px}
.coh{padding:12px 14px;display:flex;flex-direction:column;gap:8px}
.livec{display:flex;gap:12px;align-items:center;background:#17161B;color:#EDEBF0;border-radius:12px;padding:11px 13px}
.date{width:46px;height:50px;border-radius:9px;background:#F25C3B;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;flex:none}.date small{font-size:10px;font-weight:600;letter-spacing:.08em}.date b{font-size:20px;line-height:1}
.livec .t b{display:block;font-size:13.5px}.livec .t span{font-size:12px;color:#A9A5B2}
.rsvp{margin-left:auto;text-align:right;font-size:11px;color:#A9A5B2}.rsvp b{display:block;font-size:17px;color:#fff}
.sr{display:grid;grid-template-columns:26px 92px minmax(40px,1fr) 34px 64px 86px;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #F3F1EE;font-size:12.5px}
.sr .av{width:26px;height:26px;font-size:10px}.sr b{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pg{height:6px;border-radius:4px;background:#EFEDE9;overflow:hidden}.pg i{display:block;height:100%;background:#17161B;border-radius:4px}
.pc{font:500 11.5px 'Geist Mono',monospace;text-align:right}.la{font-size:11px;color:#8D8A96;white-space:nowrap}
.tag{font-size:10.5px;font-weight:600;border-radius:999px;padding:2px 8px;white-space:nowrap;text-align:center}.tag.amb{background:#FFF1D6;color:#8B5A00}.tag.ok{background:#EAF7EF;color:#13723F}.tag.cert{background:#F2EBFF;color:#6236C9}.tag.bad{background:#FDE6DF;color:#B83A1F}
.offer{padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.price{display:flex;align-items:flex-end;gap:12px}.price b{font:400 40px/1 'Instrument Serif',serif}.price span{font-size:12px;color:#7A7682;padding-bottom:5px}
.opts{display:flex;gap:6px;flex-wrap:wrap}
.lr{display:flex;justify-content:space-between;font-size:12.5px;padding:4px 0;border-bottom:1px dashed #ECEAE5}.lr span{color:#4A4752}.lr b{font-family:'Geist Mono',monospace;font-weight:500}
.tot{display:flex;justify-content:space-between;align-items:baseline;padding-top:4px}.tot span{font-weight:600}.tot b{font:600 22px 'Geist',sans-serif;letter-spacing:-.02em}
</style></head><body>
<div class="top">
  <div class="br"><i>c</i><div><b>Craft Academy</b><span>COURSE OS</span></div></div>
  <div class="tabs"><span class="on">Outline</span><span>Offers<em>2</em></span><span>Students<em>412</em></span><span>Community</span><span>Certificates</span><span>Analytics</span></div>
  <div class="tr"><span class="gh">${ic(I.eye, 15)}Preview as student</span><span class="ask">${ic(I.spark, 14)}Ask</span><span class="pub">Publish changes</span><span class="av" style="background:#F25C3B">LB</span></div>
</div>
<div class="hdr">
  <div class="thumb"></div>
  <div><h1>Product Design Foundations</h1><div class="sub"><span class="pill g">● Published</span><span class="pill c">Cohort 4 starts Mon 12 Oct</span><span class="pill">5 modules · 21 lessons · 6 h 40 m</span></div></div>
  <div class="stats"><div><b>412</b><span>students</span></div><div><b>64%</b><span>avg completion</span></div><div><b style="display:flex;gap:4px;align-items:center">4.8<span style="color:#E8A317;display:flex">${ic(I.star, 15)}</span></b><span>312 reviews</span></div><div><b>$86,240</b><span>lifetime revenue</span></div></div>
</div>
<div class="body">
  <div class="card">
    <div class="ch">Outline<small>drag to reorder</small></div>
    ${outline}
    <div class="foot"><span class="b">${ic(I.plus, 14)}Add module</span><span class="b ai">${ic(I.spark, 14)}Generate lessons</span></div>
  </div>
  <div class="card ed">
    <div class="er"><div><div class="ec">Module 3 · Wireframes &amp; flows › <b>Lesson 3.1</b></div><h2>Sketching flows fast</h2></div>
      <div style="display:flex;gap:8px;align-items:center"><div class="seg"><span>Draft</span><span class="on">Published</span><span>Drip</span></div><span class="b dk">Save</span></div></div>
    <div class="vid"><img src="img/lms/ux-sketch.jpg" alt="">
      <div class="badge"><span>${ic(I.cap, 13)}Captions EN · reviewed</span><span>1080p</span></div>
      <div class="pl">${ic(I.play, 26)}</div>
      <div class="vt"><b>Sketching flows fast</b><span>Lena Brooks · 14:22 · uploaded 2 Oct</span></div>
      <div class="vbar"><span>4:27</span><div class="track"><i></i>${chapters.map(c => `<u style="left:${c[2]}%"></u>`).join("")}</div><span>14:22</span></div>
    </div>
    <div class="chs">${chapters.map(c => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join("")}</div>
    <div class="two">
      <div class="box"><h4>Downloads<span>2 files</span></h4>
        <div class="fi"><span class="fic" style="background:#FDE6DF;color:#C8452A">${ic(I.file, 15)}</span><div><b>Flow sketching template.pdf</b><small>2.4 MB · 318 downloads</small></div></div>
        <div class="fi"><span class="fic" style="background:#E3ECFD;color:#2350C2">${ic(I.file, 15)}</span><div><b>Crazy 8s worksheet.fig</b><small>Figma community file</small></div></div>
      </div>
      <div class="box"><h4>Knowledge check<span style="color:#13723F">3 questions · pass 2/3</span></h4>
        <div class="q">1. What is the goal of a Crazy 8s round?</div>
        <div class="opt"><i></i>Produce one polished screen</div>
        <div class="opt right"><i></i>Generate many ideas in 8 minutes</div>
        <div class="opt"><i></i>Test with five users</div>
      </div>
    </div>
    <div class="sets"><span class="tg on"><i></i>Enforce completion</span><span class="tg on"><i></i>Comments</span><span class="tg"><i></i>Free preview</span><span style="margin-left:auto;color:#8D8A96;font-size:12px;white-space:nowrap">Unlocks after 2.2 is approved</span></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:16px;min-height:0">
    <div class="card">
      <div class="ch">Cohort 4 progress<small>86 students · week 3 of 8</small></div>
      <div class="coh">
        <div class="livec"><div class="date"><small>OCT</small><b>22</b></div><div class="t"><b>Live · wireframe critique</b><span>Thu 6:00 PM ET · Zoom · 60 min</span></div><div class="rsvp"><b>54</b>RSVPs</div></div>
        <div>${rows}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:2px"><span style="font-size:12px;color:#7A7682">9 behind by more than a week</span><span class="b dk">Review 12 assignments</span></div>
      </div>
    </div>
    <div class="card offer">
      <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Offer · Full course</b><span class="pill g">● Live checkout</span></div>
      <div class="price"><b>$497</b><span>one-time · or 3 × $179</span></div>
      <div class="opts"><span class="pill c">EARLYBIRD −20% · ends 10 Oct</span><span class="pill">Order bump: Figma kit $29</span></div>
      <div>
        <div class="lr"><span>One-time · 22 sales</span><b>$10,934.00</b></div>
        <div class="lr"><span>Payment plan · 14 first payments</span><b>$2,506.00</b></div>
        <div class="lr"><span>EARLYBIRD · 6 sales at $397.60</span><b>$2,385.60</b></div>
      </div>
      <div class="tot"><span>October so far</span><b>$15,825.60</b></div>
    </div>
  </div>
</div>
</body></html>`;
})();
