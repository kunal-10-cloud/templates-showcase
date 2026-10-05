// Salon OS · Bloom Hair Studio — appointment book + client record + checkout, modelled on Fresha, Boulevard and Phorest.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-4 4-6 7-6s6 2 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c-.5-3-2.5-5-5-5.5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8" r="1.5"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>', chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    msg: '<path d="M4 5h16v11H8l-4 4z"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', check: '<path d="M5 12l5 5 9-10"/>', flask: '<path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/>', alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17v.5"/>',
    left: '<path d="M15 18l-6-6 6-6"/>', right: '<path d="M9 18l6-6-6-6"/>', repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>', gift: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8s-2-5-5-5-3 5 5 5M12 8s2-5 5-5 3 5-5 5"/>'
  };

  // service category palettes [bg, border/ink]
  const CAT = { colour: ["#EFE5F5", "#8E5AAE"], cut: ["#F6ECDF", "#B57B3E"], treat: ["#E1F0EB", "#2F8069"], blow: ["#FBE6EC", "#C8506F"], barber: ["#E3EBF6", "#45679D"] };
  const H0 = 9, HR = 82, COLW = 155;
  const staff = [
    ["Chloé Martin", "CM", "#8E5AAE", "Colour · owner", 92],
    ["Maya Singh", "MS", "#C8506F", "Senior stylist", 78],
    ["Jordan Lee", "JL", "#2F8069", "Treatments", 84],
    ["Lea Dubois", "LD", "#B57B3E", "Bridal", 71],
    ["Sam Okafor", "SO", "#45679D", "Barber", 88]
  ];
  // [col, start, end, client, service, cat, tags[], opts]
  const appts = [
    [0, 9, 9.75, "Tina L.", "Blow-dry", "blow", ["Done"], { done: 1 }],
    [0, 10, 12.5, "Rachel Kim", "Lilac balayage refresh · toner · Olaplex", "colour", ["In service", "Deposit paid"], { sel: 1, proc: [11, 11.75] }],
    [0, 11.17, 11.5, "Ben H.", "Fringe trim", "cut", [], { mini: 1 }],
    [0, 13, 14.75, "Priya Shah", "Full highlights", "colour", ["Confirmed", "Deposit paid"], { proc: [13.75, 14.25] }],
    [0, 15, 16, "Hana W.", "Cut & finish", "cut", ["Confirmed"], {}],
    [1, 9.5, 10.5, "Omar S.", "Men's cut & style", "cut", ["Done"], { done: 1 }],
    [1, 10.75, 12.25, "Grace Park", "Colour correction", "colour", ["Arrived"], { proc: [11.5, 12] }],
    [1, 13.5, 14.5, "Ella Wright", "Cut & style", "cut", ["New client", "Deposit paid"], {}],
    [1, 15.25, 16, "Zoe R.", "Root touch-up", "colour", ["Confirmed"], {}],
    [2, 9, 9.75, "Ivy Chen", "Keratin consult", "treat", ["Done"], { done: 1 }],
    [2, 10.25, 12.75, "Mia Torres", "Keratin smoothing", "treat", ["In service"], {}],
    [2, 13.5, 14.25, "Nora B.", "Blow-dry", "blow", ["Confirmed"], {}],
    [2, 14.5, 15.75, "Kate D.", "Scalp treatment", "treat", ["Confirmed"], {}],
    [3, 9.25, 11.25, "Sophie A.", "Bridal trial · hair + makeup", "blow", ["Arrived"], { done: 1 }],
    [3, 11.5, 12.25, "Jen K.", "Long-hair cut", "cut", ["Arrived"], {}],
    [3, 13, 15, "Wedding party", "Updos × 3", "blow", ["Deposit paid"], {}],
    [4, 9, 9.5, "Leo P.", "Skin fade", "barber", ["Done"], { done: 1 }],
    [4, 9.75, 10.25, "Arjun M.", "Cut & beard", "barber", ["Done"], { done: 1 }],
    [4, 10.5, 11, "Chris V.", "Skin fade", "barber", ["Done"], { done: 1 }],
    [4, 11.25, 11.75, "Ali R.", "Beard trim", "barber", ["No-show risk"], { risk: 1 }],
    [4, 12, 12.5, "Theo G.", "Kids cut", "barber", ["Confirmed"], {}],
    [4, 13.25, 14, "Marcus B.", "Cut & beard", "barber", ["Confirmed"], {}],
    [4, 14.25, 14.75, "Dev P.", "Skin fade", "barber", ["Confirmed"], {}],
    [4, 15, 15.75, "Raj K.", "Grey blending", "barber", ["New client"], {}]
  ];
  const tagC = (t) => t === "Done" ? ["#EEECEF", "#7A7280"] : t === "In service" ? ["#2A1B2E", "#FFFFFF"] : t === "Arrived" ? ["#DDF1E5", "#1E7A47"] : t === "Deposit paid" ? ["#FFFFFF", "#6B5A72"] : t === "New client" ? ["#FFF0D6", "#9A5B00"] : t === "No-show risk" ? ["#FDE2E0", "#B4271B"] : ["#FFFFFF", "#6B5A72"];
  const y = (h) => Math.round((h - H0) * HR);
  const fmt = (h) => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); const ap = hh >= 12 ? "pm" : "am"; return ((hh + 11) % 12 + 1) + ":" + String(mm).padStart(2, "0") + ap; };

  const blocks = appts.map(([c, s, e, who, svc, cat, tags, o]) => {
    const [bg, bd] = CAT[cat];
    let left = c * COLW + 3, w = COLW - 6;
    if (o.mini) { left = c * COLW + COLW * 0.46; w = COLW * 0.52; }
    const h = y(e) - y(s) - 3;
    const proc = o.proc ? `<div class="proc" style="top:${y(o.proc[0]) - y(s)}px;height:${y(o.proc[1]) - y(o.proc[0])}px"><span>Processing ${Math.round((o.proc[1] - o.proc[0]) * 60)}m</span></div>` : "";
    const tg = tags.slice(0, h > 70 ? 2 : 1).map(t => { const [b, f] = tagC(t); return `<i style="background:${b};color:${f}">${t}</i>`; }).join("");
    return `<div class="ap${o.mini ? " mini" : ""}${o.sel ? " sel" : ""}${o.done ? " done" : ""}${o.risk ? " risk" : ""}" style="left:${left}px;top:${y(s) + 1}px;width:${w}px;height:${h}px;background:${bg};border-color:${bd}">${proc}<div class="ah"><b>${who}</b>${h > 34 ? `<span class="tm">${fmt(s)}</span>` : ""}</div>${h > 34 ? `<div class="sv">${svc}</div>` : ""}${h > 52 ? `<div class="tg">${tg}</div>` : ""}</div>`;
  }).join("");
  const hours = Array.from({ length: 8 }, (_, i) => `<div class="hr" style="top:${i * HR}px"><span>${((H0 + i + 11) % 12) + 1}${H0 + i >= 12 ? "pm" : "am"}</span></div>`).join("");
  const gap = `<div class="gap" style="left:${1 * COLW + 3}px;top:${y(14.5) + 1}px;width:${COLW - 6}px;height:${y(15.25) - y(14.5) - 3}px">Open 45m · 2 waitlist matches</div>`;
  const lunch = `<div class="blk" style="left:${1 * COLW + 3}px;top:${y(12.5) + 1}px;width:${COLW - 6}px;height:${y(13.25) - y(12.5) - 3}px">Lunch</div><div class="blk" style="left:${2 * COLW + 3}px;top:${y(12.75) + 1}px;width:${COLW - 6}px;height:${y(13.5) - y(12.75) - 3}px">Lunch</div><div class="blk" style="left:${3 * COLW + 3}px;top:${y(12.25) + 1}px;width:${COLW - 6}px;height:${y(13) - y(12.25) - 3}px">Lunch</div><div class="blk" style="left:${0 * COLW + 3}px;top:${y(12.5) + 1}px;width:${COLW - 6}px;height:${y(13) - y(12.5) - 3}px">Lunch</div>`;
  const now = 11 + 40 / 60;
  const heads = staff.map(([n, i, c, r, u]) => `<div class="st"><span class="sa" style="background:${c}">${i}</span><div><b>${n}</b><small>${r}</small></div><em>${u}%</em></div>`).join("");

  // checkout arithmetic (Ontario HST 13%, tip on services only)
  const services = [["Lilac balayage refresh", "Chloé · 2h 30m", 245], ["Gloss & toner", "Chloé · incl. 20m processing", 65], ["Olaplex No.1 bond add-on", "Chloé", 35]];
  const retail = [["Olaplex No.3 Hair Perfector", "100 ml", 38]];
  const svcTotal = services.reduce((a, s) => a + s[2], 0), retTotal = retail.reduce((a, s) => a + s[2], 0);
  const sub = svcTotal + retTotal, hst = Math.round(sub * 0.13 * 100) / 100, tip = Math.round(svcTotal * 0.2 * 100) / 100, dep = 50;
  const due = Math.round((sub + hst + tip - dep) * 100) / 100;
  const m = (v) => "$" + v.toFixed(2);
  const line = ([a, b, p]) => `<div class="ln"><div><b>${a}</b><small>${b}</small></div><span>${m(p)}</span></div>`;

  window.LANDINGS.salon = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Plus Jakarta Sans',system-ui,sans-serif;color:#261A2B;background:#F6F2F0}
.rail{position:absolute;left:0;top:0;bottom:0;width:64px;background:#21152A;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:8px}
.logo{width:38px;height:38px;border-radius:12px;background:linear-gradient(140deg,#E8B4C8,#9B6BB8);display:grid;place-items:center;color:#21152A;font:italic 400 24px 'Instrument Serif',serif;margin-bottom:12px}
.ri{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;color:#8E7F96;position:relative}.ri.on{background:#3A2944;color:#F3D9E6}
.ri em{position:absolute;top:5px;right:5px;width:8px;height:8px;border-radius:50%;background:#E85D8A;border:2px solid #21152A}
.rail .sp{flex:1}
.top{position:absolute;left:64px;right:0;top:0;height:64px;display:flex;align-items:center;gap:14px;padding:0 22px 0 24px}
.brand b{display:block;font:italic 400 24px/1 'Instrument Serif',serif;letter-spacing:.01em}.brand span{font-size:10.5px;letter-spacing:.16em;color:#8B7B93;font-weight:700}
.date{display:flex;align-items:center;gap:6px;margin-left:18px;background:#fff;border:1px solid #E9E1E6;border-radius:12px;padding:6px 8px}.date b{font-size:14px;padding:0 6px}.date i{color:#8B7B93;display:grid}
.seg{display:flex;background:#EDE6EA;border-radius:10px;padding:3px}.seg span{padding:5px 12px;border-radius:8px;font-weight:600;color:#6B5A72}.seg span.on{background:#fff;color:#261A2B;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.chipb{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E9E1E6;border-radius:999px;padding:6px 12px;font-weight:600;color:#4A3A52}.chipb em{font-style:normal;background:#E85D8A;color:#fff;border-radius:9px;padding:0 6px;font-size:11px}
.srch{margin-left:auto;width:240px;display:flex;gap:8px;align-items:center;background:#fff;border:1px solid #E9E1E6;border-radius:12px;padding:8px 12px;color:#9A8CA2}
.new{background:#261A2B;color:#fff;border-radius:12px;padding:9px 16px;font-weight:700}
.book{position:absolute;left:80px;top:72px;width:850px;height:812px;background:#fff;border-radius:20px;box-shadow:0 1px 2px rgba(38,26,43,.06),0 12px 30px -18px rgba(38,26,43,.25);overflow:hidden}
.bh{height:48px;display:flex;align-items:center;gap:10px;padding:0 18px;border-bottom:1px solid #F1EBEE}
.bh h2{margin:0;font-size:15px}.bh .lg{display:flex;gap:12px;margin-left:auto;font-size:11.5px;color:#6B5A72}.bh .lg span{display:flex;align-items:center;gap:5px}.bh .lg i{width:10px;height:10px;border-radius:3px;border:1.5px solid}
.heads{display:grid;grid-template-columns:52px repeat(5,${COLW}px);height:60px;border-bottom:1px solid #F1EBEE}
.st{display:flex;align-items:center;gap:8px;padding:0 8px;border-left:1px solid #F4EFF1}.st b{display:block;font-size:12.5px;white-space:nowrap}.st small{color:#8B7B93;font-size:10.5px}
.sa{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:11px;flex:none;box-shadow:0 0 0 2px #fff,0 0 0 3.5px currentColor}
.st em{margin-left:auto;font-style:normal;font-size:10.5px;font-weight:700;color:#6B5A72;background:#F4EFF1;border-radius:6px;padding:1px 5px}
.grid{position:absolute;left:0;top:108px;width:850px;height:${HR * 7 + 10}px}
.hr{position:absolute;left:0;right:0;border-top:1px solid #F4EFF1;height:${HR}px}.hr:after{content:"";position:absolute;left:52px;right:0;top:${HR / 2}px;border-top:1px dashed #F7F3F5}
.hr span{position:absolute;left:10px;top:-8px;background:#fff;padding:0 4px;font-size:10.5px;color:#9A8CA2;font-weight:600}
.cols{position:absolute;left:52px;top:0;width:${COLW * 5}px;height:100%}
.cols .vl{position:absolute;top:0;bottom:0;border-left:1px solid #F4EFF1}
.ap{position:absolute;border-left:3px solid;border-radius:9px;padding:5px 7px 4px;overflow:hidden;box-shadow:0 1px 1px rgba(38,26,43,.05)}
.ap .ah{display:flex;justify-content:space-between;gap:4px;position:relative}.ap b{font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ap .tm{font-size:10px;color:#6B5A72;white-space:nowrap}
.ap .sv{font-size:10.5px;color:#4A3A52;line-height:1.25;margin-top:1px;position:relative}
.ap .tg{display:flex;flex-wrap:wrap;gap:3px;margin-top:4px;position:relative}.ap .tg i{font-style:normal;font-size:9.5px;font-weight:700;border-radius:5px;padding:1px 5px;border:1px solid rgba(38,26,43,.08)}
.ap.done{opacity:.55}.ap.mini{z-index:5;box-shadow:0 0 0 2px #fff,0 4px 10px rgba(38,26,43,.18)}.ap.sel{box-shadow:0 0 0 2px #fff,0 0 0 4px #8E5AAE,0 10px 22px -8px rgba(142,90,174,.6);z-index:3}
.ap.risk{background:repeating-linear-gradient(135deg,#FDECEA 0 6px,#FFF5F4 6px 12px)!important;border-color:#D2463A!important}
.proc{position:absolute;left:0;right:0;background:repeating-linear-gradient(135deg,rgba(142,90,174,.16) 0 5px,transparent 5px 10px);border-top:1px dashed rgba(142,90,174,.5);border-bottom:1px dashed rgba(142,90,174,.5)}
.proc span{position:absolute;right:5px;bottom:2px;font-size:9px;font-weight:700;color:#7A4A99}
.gap{position:absolute;border:1.5px dashed #E85D8A;border-radius:9px;background:#FFF5F8;color:#C23B6B;font-size:10.5px;font-weight:700;padding:6px 7px;line-height:1.25}
.blk{position:absolute;border-radius:9px;background:repeating-linear-gradient(45deg,#F5F2F4 0 6px,#EFEBEE 6px 12px);color:#9A8CA2;font-size:10.5px;font-weight:600;padding:5px 7px}
.now{position:absolute;left:44px;right:0;top:${Math.round((now - H0) * HR)}px;border-top:2px solid #E5484D;z-index:4}.now span{position:absolute;left:-40px;top:-10px;background:#E5484D;color:#fff;font-size:10px;font-weight:700;border-radius:6px;padding:2px 5px}
.foot{position:absolute;left:0;right:0;bottom:0;height:62px;border-top:1px solid #F1EBEE;display:flex;align-items:center;gap:12px;padding:0 18px;background:#FFFBFC}
.foot .pill{width:34px;height:34px;border-radius:10px;background:#FCE4EE;color:#C23B6B;display:grid;place-items:center}
.foot b{font-size:12.5px}.foot small{display:block;color:#6B5A72;font-size:11.5px}
.btn{border-radius:10px;padding:8px 13px;font-weight:700;font-size:12px;border:1px solid #E2D8DE;background:#fff;white-space:nowrap}.btn.dk{background:#261A2B;border-color:#261A2B;color:#fff}.btn.pk{background:#C23B6B;border-color:#C23B6B;color:#fff}
.pane{position:absolute;left:946px;top:72px;width:478px;height:812px;background:#fff;border-radius:20px;box-shadow:0 1px 2px rgba(38,26,43,.06),0 12px 30px -18px rgba(38,26,43,.25);overflow:hidden;display:flex;flex-direction:column}
.cl{display:flex;gap:14px;padding:14px 20px 10px;align-items:center}
.cav{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#C9A7D9,#E9B7C9);display:grid;place-items:center;color:#3A1F45;font:italic 400 26px 'Instrument Serif',serif;flex:none;box-shadow:0 0 0 3px #fff,0 0 0 5px #E6D5EE}
.cl h3{margin:0;font:italic 400 28px/1 'Instrument Serif',serif}.cl p{margin:3px 0 0;color:#6B5A72;font-size:12px}
.cl .st2{margin-left:auto;text-align:right}.cl .st2 b{display:block;font-size:12px;background:#261A2B;color:#fff;border-radius:7px;padding:3px 8px}.cl .st2 small{color:#8B7B93;font-size:11px}
.tags{display:flex;flex-wrap:wrap;gap:6px;padding:0 20px 10px}.tags span{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;border-radius:7px;padding:3px 8px;background:#F6F1F4;color:#5A4862}
.tags span.ok{background:#E3F4EA;color:#1E7A47}.tags span.vip{background:#261A2B;color:#F3D9E6}.tags span.bd{background:#FFF0D6;color:#9A5B00}
.tabs{display:flex;gap:16px;padding:0 20px;border-bottom:1px solid #F1EBEE;font-weight:600;color:#8B7B93}.tabs span{padding:7px 0}.tabs span.on{color:#261A2B;border-bottom:2px solid #8E5AAE}
.sec{padding:10px 20px}.sec h4{margin:0 0 8px;font-size:10.5px;letter-spacing:.12em;color:#8B7B93;text-transform:uppercase;display:flex;justify-content:space-between}
.fm{display:grid;grid-template-columns:96px 1fr;gap:12px}
.ph{width:96px;height:132px;border-radius:12px;object-fit:cover;display:block}
.phw{position:relative}.phw em{position:absolute;left:6px;bottom:6px;font-style:normal;font-size:9.5px;font-weight:700;background:rgba(33,21,42,.78);color:#fff;border-radius:5px;padding:2px 6px}
.fr{display:flex;gap:9px;padding:3px 0;border-bottom:1px dashed #EEE6EA}.fr:last-child{border-bottom:0}.fr i{width:22px;height:22px;border-radius:7px;display:grid;place-items:center;flex:none;font-style:normal;font-size:10px;font-weight:800;color:#fff}
.fr b{display:block;font-size:12px}.fr small{color:#6B5A72;font-size:11px}
.ln{display:flex;justify-content:space-between;align-items:center;padding:3px 0}.ln b{font-size:12.5px}.ln small{color:#8B7B93;font-size:11px;margin-left:6px}.ln>span{font-weight:700;font-variant-numeric:tabular-nums}
.sum{background:#FAF7F8;border-radius:12px;padding:7px 12px;margin-top:6px;font-variant-numeric:tabular-nums}.sum div{display:flex;justify-content:space-between;padding:1px 0;color:#5A4862}.sum .tot{border-top:1px solid #EADFE5;margin-top:4px;padding-top:5px;color:#261A2B;font-weight:800;font-size:15px}
.tips{display:flex;gap:6px;margin:6px 0 2px}.tips span{flex:1;text-align:center;border:1px solid #E9E1E6;border-radius:9px;padding:3px 0;font-weight:600;font-size:11.5px}.tips span.on{background:#261A2B;color:#fff;border-color:#261A2B}
.rb{margin:0 20px;border-radius:14px;background:linear-gradient(120deg,#F5EAF9,#FCEAF0);padding:11px 14px;display:flex;align-items:center;gap:12px}
.rb .ri2{width:34px;height:34px;border-radius:10px;background:#fff;color:#8E5AAE;display:grid;place-items:center;flex:none}.rb b{font-size:12.5px;display:block}.rb small{color:#6B5A72;font-size:11.5px}
.act{margin-top:auto;padding:10px 20px 14px;display:flex;gap:8px}.act .btn{flex:1;text-align:center;padding:10px}.act .pay{flex:1.6}
.emer{font-size:10px;letter-spacing:.12em;color:#B3A6BA;font-weight:700}
</style></head><body>
<nav class="rail"><div class="logo">B</div>
<div class="ri on">${ic(I.cal, 20)}</div><div class="ri">${ic(I.users, 20)}</div><div class="ri">${ic(I.msg, 20)}<em></em></div><div class="ri">${ic(I.tag, 20)}</div><div class="ri">${ic(I.box, 20)}</div><div class="ri">${ic(I.chart, 20)}</div>
<div class="sp"></div><div class="ri" style="color:#E8B4C8">${ic(I.spark, 20)}</div><div class="ri">${ic(I.gear, 20)}</div></nav>
<header class="top"><div class="brand"><b>Bloom Hair Studio</b><span>SALON OS · QUEEN ST W</span></div>
<div class="date"><i>${ic(I.left, 16)}</i><b>Tuesday, 6 October</b><i>${ic(I.right, 16)}</i></div>
<div class="seg"><span class="on">Day</span><span>Week</span></div>
<span class="chipb">Waitlist <em>3</em></span><span class="chipb">${ic(I.repeat, 14)}Rebook rate today 78%</span>
<div class="srch">${ic(I.search, 15)}Client, phone or service</div><span class="new">+ New</span></header>

<section class="book"><div class="bh"><h2>Appointments</h2><span style="color:#8B7B93;font-size:12px">31 booked · 5 stylists on</span>
<div class="lg"><span><i style="background:${CAT.colour[0]};border-color:${CAT.colour[1]}"></i>Colour</span><span><i style="background:${CAT.cut[0]};border-color:${CAT.cut[1]}"></i>Cut</span><span><i style="background:${CAT.blow[0]};border-color:${CAT.blow[1]}"></i>Styling</span><span><i style="background:${CAT.treat[0]};border-color:${CAT.treat[1]}"></i>Treatment</span><span><i style="background:${CAT.barber[0]};border-color:${CAT.barber[1]}"></i>Barber</span></div></div>
<div class="heads"><div></div>${heads}</div>
<div class="grid">${hours}<div class="cols">${[1, 2, 3, 4].map(i => `<div class="vl" style="left:${i * COLW}px"></div>`).join("")}${lunch}${gap}${blocks}</div><div class="now"><span>11:40</span></div></div>
<div class="foot"><span class="pill">${ic(I.clock, 18)}</span><div><b>Maya has a 45-minute gap at 2:30pm</b><small>Lauren C. and Amira H. on the waitlist want a cut with Maya this afternoon</small></div><span style="flex:1"></span><span class="btn">See waitlist</span><span class="btn pk">Offer to Lauren</span></div></section>

<aside class="pane">
<div class="cl"><div class="cav">RK</div><div><h3>Rachel Kim</h3><p>Client since 2019 · 23 visits · avg ticket $318</p></div><div class="st2"><b>In service · Chloé</b><small>Arrived 9:56am</small></div></div>
<div class="tags"><span class="vip">VIP</span><span class="ok">${ic(I.check, 12)}Patch test 2 Oct · clear</span><span>${ic(I.card, 12)}Visa •• 4412 on file</span><span class="bd">${ic(I.gift, 12)}Birthday 14 Oct</span></div>
<div class="tabs"><span class="on">Formula</span><span>Visits · 23</span><span>Photos · 14</span><span>Notes</span><span>Purchases</span></div>
<div class="sec"><h4><span>Colour formula · today</span><span style="letter-spacing:0;text-transform:none;color:#8E5AAE;font-weight:700">Last used 18 Aug · Chloé</span></h4>
<div class="fm"><div class="phw"><img class="ph" src="img/salon/colour-result.jpg" alt=""><em>Result · 18 Aug</em></div><div>
<div class="fr"><i style="background:#B9A27A">1</i><div><b>Lightener · balayage panels</b><small>Redken Flash Lift + 20 vol, 1:2 · 35 min</small></div></div>
<div class="fr"><i style="background:#9A6BB5">2</i><div><b>Gloss · lilac toner</b><small>Redken Shades EQ 09V + 09P, 1:1 · 20 min</small></div></div>
<div class="fr"><i style="background:#7A4A99">3</i><div><b>Vivid · ends</b><small>Pravana ChromaSilk Lavender 1:3 clear · 25 min</small></div></div>
<div class="fr"><i style="background:#2F8069">+</i><div><b>Bond builder</b><small>Olaplex No.1 in lightener, No.2 at the bowl</small></div></div></div></div></div>
<div class="sec" style="padding-top:2px"><h4><span>Checkout</span><span style="letter-spacing:0;text-transform:none;color:#1E7A47;font-weight:700">$50 deposit paid 29 Sep</span></h4>
${services.map(line).join("")}
<div class="ln" style="border-top:1px dashed #EEE6EA;margin-top:3px"><div><b>${retail[0][0]}</b><small>Retail</small></div><span>${m(retail[0][2])}</span></div>
<div class="tips"><span>No tip</span><span>15%</span><span class="on">20%</span><span>25%</span><span>Custom</span></div>
<div class="sum"><div><span>Subtotal</span><span>${m(sub)}</span></div><div><span>HST 13%</span><span>${m(hst)}</span></div><div><span>Tip for Chloé · 20% of services</span><span>${m(tip)}</span></div><div><span>Deposit</span><span>−${m(dep)}</span></div><div class="tot"><span>Due now</span><span>${m(due)}</span></div></div></div>
<div class="rb"><span class="ri2">${ic(I.repeat, 18)}</span><div><b>Rebook in 6 weeks · Tue 17 Nov, 10:00am</b><small>Same services with Chloé · 2h 30m slot is open</small></div><span class="btn" style="margin-left:auto">Book it</span></div>
<div class="act"><span class="btn">Split</span><span class="btn">Save unpaid</span><span class="btn dk pay">Charge ${m(due)}</span></div>
</aside>
</body></html>`;
})();
