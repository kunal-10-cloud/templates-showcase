// Agency OS · Pulse Digital — client wall, content approvals, lead inbox, white-label report.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const clients = [
    { n: "Zestra Skincare", m: "Z", c: "#1FA38E", type: "D2C · ecommerce", ret: "₹1,20,000", meta: 340000, goog: 110000, kpi: "3.5×", kl: "ROAS", leads: "412", del: [14, 18], st: ["2 awaiting client", "amb"], h: "ok", sel: 1 },
    { n: "UrbanNest Realty", m: "U", c: "#3B6CF5", type: "Real estate · leads", ret: "₹90,000", meta: 260000, goog: 180000, kpi: "₹1,140", kl: "CPL", leads: "386", del: [9, 12], st: ["All approved", "ok"], h: "ok" },
    { n: "Kalyan Sweets", m: "K", c: "#E8912D", type: "Retail · Diwali push", ret: "₹60,000", meta: 120000, goog: 0, kpi: "4.1×", kl: "ROAS", leads: "—", del: [11, 15], st: ["Changes requested", "red"], h: "ok" },
    { n: "Mehta Dental", m: "M", c: "#7AA3C8", type: "Clinics · 3 branches", ret: "₹45,000", meta: 0, goog: 85000, kpi: "₹401", kl: "CPL", leads: "212", del: [6, 8], st: ["CPL +18% WoW", "amb"], h: "warn" },
    { n: "FitFuel Nutrition", m: "F", c: "#D94F70", type: "D2C · supplements", ret: "₹75,000", meta: 190000, goog: 60000, kpi: "2.2×", kl: "ROAS", leads: "—", del: [8, 14], st: ["Below 2.5× target", "red"], h: "bad" },
    { n: "Brewlab Coffee", m: "B", c: "#8C6A4F", type: "Cafés · 6 outlets", ret: "₹50,000", meta: 40000, goog: 0, kpi: "5.3×", kl: "ROAS", leads: "—", del: [10, 10], st: ["Week scheduled", "ok"], h: "ok" }
  ];
  const L = v => v >= 100000 ? "₹" + (v / 100000).toFixed(v % 100000 ? 1 : 0) + "L" : v ? "₹" + Math.round(v / 1000) + "k" : "—";

  const card = k => {
    const tot = k.meta + k.goog, mw = tot ? Math.round(k.meta / tot * 100) : 0;
    return `<div class="cc${k.sel ? " sel" : ""}"><div class="cb" style="background:${k.c}"></div>
<div class="ch"><span class="lg" style="background:${k.c}">${k.m}</span><div><b>${k.n}</b><small>${k.type}</small></div><i class="hd ${k.h}"></i></div>
<div class="ret"><span>Retainer</span><b>${k.ret}<em>/mo</em></b></div>
<div class="sp"><div class="spl"><span>Ad spend MTD</span><b>${L(tot)}</b></div><div class="spb"><i style="width:${mw}%;background:#4C8DFF"></i><i style="width:${100 - mw}%;background:#F2B233"></i></div><div class="spk"><span><i style="background:#4C8DFF"></i>Meta ${L(k.meta)}</span><span><i style="background:#F2B233"></i>Google ${L(k.goog)}</span></div></div>
<div class="kp"><div><span>${k.kl}</span><b>${k.kpi}</b></div><div><span>Leads</span><b>${k.leads}</b></div><div><span>Deliverables</span><b>${k.del[0]}/${k.del[1]}</b></div></div>
<div class="cs ${k.st[1]}">${k.st[0]}</div></div>`;
  };

  const days = [["Mon", "5"], ["Tue", "6"], ["Wed", "7"], ["Thu", "8"], ["Fri", "9"], ["Sat", "10"], ["Sun", "11"]];
  const posts = {
    0: [["Zestra", "#1FA38E", "IG Reel", "Scheduled", "s", "linear-gradient(150deg,#C9F0E6,#62C7B1)", "Serum texture"], ["UrbanNest", "#3B6CF5", "FB Lead ad", "Live", "l", "linear-gradient(150deg,#DCE6FF,#7E9DF3)", "2BHK Whitefield"]],
    1: [["Kalyan", "#E8912D", "IG Carousel", "Changes", "r", "linear-gradient(150deg,#FFE3B8,#F2A54A)", "Kaju katli box"]],
    2: [["Zestra", "#1FA38E", "IG Post", "Client review", "a", "linear-gradient(150deg,#FDE9D2,#F3B583)", "Diwali glow kit", 1], ["Brewlab", "#8C6A4F", "IG Story", "Scheduled", "s", "linear-gradient(150deg,#EAD9C6,#A8805E)", "Cold brew"]],
    3: [["FitFuel", "#D94F70", "Meta video", "In design", "d", "linear-gradient(150deg,#FFD6E0,#E5718F)", "Whey launch"]],
    4: [["Mehta", "#7AA3C8", "Google RSA", "Approved", "o", "linear-gradient(150deg,#E3EEF8,#9CBCD9)", "Free aligner consult"], ["Zestra", "#1FA38E", "IG Reel", "Draft", "d", "linear-gradient(150deg,#D9F3EC,#87D3C1)", "Routine in 30s"]],
    5: [["Kalyan", "#E8912D", "IG Reel", "Client review", "a", "linear-gradient(150deg,#FFF0C9,#F4C55C)", "Rangoli box"]],
    6: [["Brewlab", "#8C6A4F", "IG Post", "Draft", "d", "linear-gradient(150deg,#F0E4D6,#C29C78)", "Sunday pour-over"]]
  };
  const stc = { s: ["#E3EBFF", "#2F59D9"], l: ["#DDF5E8", "#13804B"], r: ["#FFE3E0", "#C2382A"], a: ["#FFF1D6", "#A86A00"], d: ["#ECECEF", "#55565E"], o: ["#DDF5E8", "#13804B"] };
  const tile = p => `<div class="pt${p[7] ? " on" : ""}"><div class="th" style="background:${p[5]}"><span class="pl">${p[2]}</span><span class="cap">${p[6]}</span></div><div class="pm"><span class="cl"><i style="background:${p[1]}"></i>${p[0]}</span><span class="st" style="background:${stc[p[4]][0]};color:${stc[p[4]][1]}">${p[3]}</span></div></div>`;

  const leads = [
    ["Pooja Shetty", "2 min ago", "Diwali Glow Kit form", "Replied: “Is COD available?”", "rep"],
    ["Arjun Kapoor", "14 min ago", "Diwali Glow Kit form", "Template delivered", "del"],
    ["Sneha Rao", "1 h ago", "Vitamin C quiz form", "Ordered · ₹1,499 via link", "won"]
  ];
  const lc = { rep: ["#FFF1D6", "#A86A00"], del: ["#E3EBFF", "#2F59D9"], won: ["#DDF5E8", "#13804B"], wait: ["#ECECEF", "#55565E"] };

  window.LANDINGS.agency = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Manrope',system-ui,sans-serif;color:#F2F1EE;background:#101114}
.top{height:56px;display:flex;align-items:center;gap:18px;padding:0 22px;border-bottom:1px solid #22242A;background:#0B0C0E}
.br{display:flex;align-items:center;gap:10px}.br .pm2{width:32px;height:32px;border-radius:9px;background:#E5246B;display:grid;place-items:center}
.br b{font:700 16px 'Syne',sans-serif;letter-spacing:-.01em;display:block;line-height:1}.br span{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#8C8D96}
.tabs{display:flex;gap:4px;margin-left:16px}.tabs span{padding:7px 12px;border-radius:8px;color:#A3A4AD;font-weight:600}.tabs span.on{background:#1E2026;color:#fff}
.tabs em{font-style:normal;background:#E5246B;color:#fff;border-radius:9px;padding:0 6px;font-size:11px;margin-left:5px}
.sp1{flex:1}.mo{border:1px solid #2A2C33;border-radius:8px;padding:6px 11px;color:#C9CAD1;font-weight:600}
.ask{background:#E5246B;color:#fff;border-radius:9px;padding:8px 13px;font-weight:700}.av{width:32px;height:32px;border-radius:50%;background:#F2B233;color:#111;display:grid;place-items:center;font-weight:800;font-size:12px}
.wrap{display:grid;grid-template-columns:930px 1fr;gap:16px;padding:14px 18px;height:844px}
.col{display:flex;flex-direction:column;gap:14px;min-width:0}
.hd2{display:flex;align-items:flex-end;justify-content:space-between}.hd2 h2{margin:0;font:700 23px 'Syne',sans-serif;letter-spacing:-.01em}
.hd2 p{margin:2px 0 0;color:#8C8D96}.sum{display:flex;gap:18px}.sum div{text-align:right}.sum b{display:block;font:600 16px 'JetBrains Mono',monospace}.sum span{color:#8C8D96;font-size:11.5px}
.wall{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cc{position:relative;background:#18191E;border:1px solid #25272E;border-radius:14px;padding:10px 12px 9px;overflow:hidden;display:flex;flex-direction:column;gap:6px}
.cc.sel{border-color:#E5246B;box-shadow:0 0 0 1px #E5246B,0 14px 40px rgba(229,36,107,.18)}
.cb{position:absolute;left:0;top:0;right:0;height:3px}
.ch{display:flex;align-items:center;gap:9px}.lg{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;font:800 14px 'Syne',sans-serif;color:#fff;flex:none}
.ch b{display:block;font-size:13.5px}.ch small{color:#8C8D96;font-size:11.5px}.hd{margin-left:auto;width:9px;height:9px;border-radius:50%}
.hd.ok{background:#3DDC84}.hd.warn{background:#F2B233}.hd.bad{background:#FF5A4E;box-shadow:0 0 0 4px rgba(255,90,78,.15)}
.ret{display:flex;justify-content:space-between;align-items:baseline}.ret span{color:#8C8D96;font-size:11.5px}.ret b{font:600 13px 'JetBrains Mono',monospace}.ret em{font-style:normal;color:#8C8D96;font-size:11px}
.spl{display:flex;justify-content:space-between;align-items:baseline}.spl span{color:#8C8D96;font-size:11.5px}.spl b{font:600 15px 'JetBrains Mono',monospace}
.spb{display:flex;height:6px;border-radius:4px;overflow:hidden;background:#24262C;margin:5px 0 4px}.spb i{display:block;height:100%}
.spk{display:flex;gap:12px;font-size:11px;color:#A3A4AD}.spk i{display:inline-block;width:7px;height:7px;border-radius:2px;margin-right:5px}
.kp{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #25272E;padding-top:6px}.kp span{display:block;color:#8C8D96;font-size:11px}.kp b{font:700 15px 'Manrope',sans-serif}
.cs{font-size:11.5px;font-weight:700;border-radius:7px;padding:4px 8px;align-self:flex-start}.cs.ok{background:rgba(61,220,132,.12);color:#5FE39B}.cs.amb{background:rgba(242,178,51,.14);color:#F5C35A}.cs.red{background:rgba(255,90,78,.14);color:#FF7A70}
.cal{background:#18191E;border:1px solid #25272E;border-radius:14px;padding:12px 13px;flex:1;display:flex;flex-direction:column;gap:10px;min-height:0}
.calh{display:flex;justify-content:space-between;align-items:center}.calh b{font:800 15px 'Manrope',sans-serif}.leg{display:flex;gap:10px;color:#A3A4AD;font-size:11.5px}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:9px;flex:1;min-height:0}
.day{display:flex;flex-direction:column;gap:6px;overflow:hidden;min-height:0}.dh{display:flex;justify-content:space-between;color:#8C8D96;font-weight:700;font-size:11.5px;padding:0 2px}.dh.td{color:#E5246B}
.pt{background:#202228;border:1px solid #2A2C33;border-radius:10px;overflow:hidden}.pt.on{border-color:#F2B233;box-shadow:0 0 0 1px #F2B233}
.th{height:54px;position:relative;padding:6px}.pl{font:600 9.5px 'JetBrains Mono',monospace;background:rgba(10,10,12,.7);color:#fff;border-radius:5px;padding:2px 5px}
.cap{position:absolute;left:7px;bottom:6px;right:7px;font-weight:800;font-size:11.5px;color:#15161A;line-height:1.15}
.pm{display:flex;flex-direction:column;gap:4px;padding:6px 7px 7px}.cl{font-size:11px;color:#C9CAD1;display:flex;align-items:center;gap:5px}.cl i{width:7px;height:7px;border-radius:50%}
.st{font-size:10.5px;font-weight:700;border-radius:5px;padding:2px 6px;align-self:flex-start}
.right{display:flex;flex-direction:column;gap:12px;min-width:0}
.pn{background:#18191E;border:1px solid #25272E;border-radius:14px;padding:11px 13px}
.pnh{display:flex;align-items:center;gap:9px;margin-bottom:10px}.pnh b{font:800 14.5px 'Manrope',sans-serif;white-space:nowrap}.pnh small{color:#8C8D96;margin-left:auto;font-size:11.5px}
.apv{display:grid;grid-template-columns:150px 1fr;gap:12px}
.ig{background:#fff;color:#111;border-radius:10px;overflow:hidden}.igh{display:flex;align-items:center;gap:5px;padding:6px 7px;font-size:10.5px;font-weight:700}.igh i{width:16px;height:16px;border-radius:50%;background:#1FA38E}
.igi{height:104px;background:linear-gradient(150deg,#FDE9D2,#F3B583);position:relative}
.bot{position:absolute;left:56px;top:18px;width:36px;height:72px;border-radius:9px 9px 6px 6px;background:linear-gradient(180deg,#FFB560,#E98A2F);box-shadow:0 8px 16px rgba(120,60,0,.25)}
.bot:before{content:"";position:absolute;left:12px;top:-12px;width:14px;height:14px;border-radius:3px;background:#2B2B2B}.bot:after{content:"C";position:absolute;inset:26px 0 auto;text-align:center;font:800 15px 'Syne',sans-serif;color:#fff}
.igc{padding:6px 7px 8px;font-size:10.5px;line-height:1.3}
.steps{display:flex;flex-direction:column;gap:7px}.stp{display:flex;gap:8px;align-items:flex-start;font-size:12px}.stp i{width:18px;height:18px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:10px;font-style:normal;font-weight:800}
.stp .y{background:#3DDC84;color:#0B2A18}.stp .r{background:#FF5A4E;color:#2A0B08}.stp small{display:block;color:#8C8D96}
.cm{background:#22242B;border-radius:9px;padding:8px 9px;font-size:12px;color:#E6E5E1;border-left:2px solid #FF5A4E}.cm small{color:#8C8D96}
.btns{display:flex;gap:7px}.b{border:1px solid #33353D;border-radius:8px;padding:6px 10px;font-weight:700;font-size:12px;color:#E6E5E1}.b.p{background:#E5246B;border-color:#E5246B;color:#fff}
.lr{display:grid;grid-template-columns:1fr auto;gap:1px 10px;padding:6px 0;border-top:1px solid #25272E}.lr b{font-size:12.5px}.lr small{color:#8C8D96;font-size:11px}
.lr .chp{grid-row:span 2;align-self:center;font-size:11px;font-weight:700;border-radius:6px;padding:3px 7px;max-width:170px;text-align:right}
.wh{font:600 10.5px 'JetBrains Mono',monospace;color:#8C8D96;display:flex;gap:6px;align-items:center}.wh i{width:7px;height:7px;border-radius:50%;background:#3DDC84;box-shadow:0 0 8px #3DDC84}
.rep{display:grid;grid-template-columns:1fr 1fr;gap:10px}.rp{background:#F7F6F2;color:#16171B;border-radius:10px;padding:10px 11px;position:relative}
.rp .rh{display:flex;align-items:center;gap:6px;font-weight:800;font-size:12px}.rp .rh i{width:16px;height:16px;border-radius:4px;background:#1FA38E}
.rp .big{font:800 21px 'Manrope',sans-serif;margin-top:4px}.rp small{color:#6A6B73;font-size:10.5px}
.bars{display:flex;align-items:flex-end;gap:4px;height:26px;margin-top:5px}.bars i{flex:1;background:#1FA38E;border-radius:2px 2px 0 0;opacity:.85}
.rs{display:flex;flex-direction:column;gap:7px;font-size:12px}.rs div{display:flex;justify-content:space-between}.rs span{color:#8C8D96}.rs b{font-family:'JetBrains Mono',monospace;font-weight:600}
</style></head><body>
<div class="top"><div class="br"><span class="pm2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-7 4 14 3-7h6"/></svg></span><div><b>Pulse Digital</b><span>AGENCY OS</span></div></div>
<div class="tabs"><span class="on">Clients</span><span>Content<em>5</em></span><span>Leads<em>48</em></span><span>Reports</span><span>Retainers</span><span>Team</span></div>
<div class="sp1"></div><span class="mo">October 2026 · MTD</span><span class="ask">Ask Agency OS</span><span class="av">RK</span></div>
<div class="wrap">
<div class="col">
<div class="hd2"><div><h2>Client wall</h2><p>20 active accounts · sorted by needs-attention · Meta &amp; Google synced 9:40 AM</p></div>
<div class="sum"><div><b>₹14.6L</b><span>retainers / mo</span></div><div><b>₹38.2L</b><span>ad spend MTD</span></div><div><b>7</b><span>awaiting client</span></div></div></div>
<div class="wall">${clients.map(card).join("")}</div>
<div class="cal"><div class="calh"><b>Content calendar · Mon 5 – Sun 11 Oct</b><div class="leg"><span>Internal review → Client approval → Scheduled</span><span style="color:#E5246B;font-weight:700">2 posts need changes</span></div></div>
<div class="week">${days.map((d, i) => `<div class="day"><div class="dh${i === 2 ? " td" : ""}"><span>${d[0]}</span><span>${d[1]}</span></div>${(posts[i] || []).map(tile).join("")}</div>`).join("")}</div></div>
</div>
<div class="right">
<div class="pn"><div class="pnh"><span class="lg" style="background:#1FA38E;width:26px;height:26px;font-size:12px">Z</span><b>Zestra · Diwali Glow Kit post</b><small>Wed 7 Oct · IG feed</small></div>
<div class="apv"><div class="ig"><div class="igh"><i></i>zestra.skin</div><div class="igi"><div class="bot"></div></div><div class="igc"><b>zestra.skin</b> Your Diwali glow, sorted. Vitamin C serum, 20% off till 12 Oct.</div></div>
<div class="steps"><div class="stp"><i class="y">✓</i><div>Copy approved<small>Riya · internal · Mon 4:10 PM</small></div></div>
<div class="stp"><i class="y">✓</i><div>Design approved<small>Kabir · internal · Tue 11:02 AM</small></div></div>
<div class="stp"><i class="r">!</i><div>Client: changes requested<small>Neha @ Zestra · v2 · today 9:18 AM</small></div></div>
<div class="cm">“Swap to the new frosted bottle shot, and add ‘Dermat tested’.”<br><small>pinned on the image</small></div>
<div class="btns"><span class="b p">Upload v3</span><span class="b">Resend to client</span></div></div></div></div>
<div class="pn"><div class="pnh"><b>Lead inbox · Zestra</b><small class="wh"><i></i>Meta webhook · live</small></div>
${leads.map(l => `<div class="lr"><div><b>${l[0]}</b> <small>· ${l[1]}</small></div><span class="chp" style="background:${lc[l[4]][0]};color:${lc[l[4]][1]}">${l[3]}</span><small>${l[2]} · WhatsApp nurture</small></div>`).join("")}
<div class="rs" style="margin-top:8px;border-top:1px solid #25272E;padding-top:8px"><div><span>Leads this month</span><b>412</b></div><div><span>Cost per lead (₹4.5L ÷ 412)</span><b>₹1,092</b></div></div></div>
<div class="pn"><div class="pnh"><b>Client report · white-label</b><small>auto-sends 1 Nov, 9:00 AM</small></div>
<div class="rep"><div class="rp"><div class="rh"><i></i>Zestra · October</div><div class="big">3.5× ROAS</div><small>₹15.75L revenue on ₹4.5L spend</small><div class="bars">${[38, 52, 47, 61, 58, 74, 70, 86].map(h => `<i style="height:${h}%"></i>`).join("")}</div></div>
<div class="rs"><div><span>Meta spend</span><b>₹3,40,000</b></div><div><span>Google spend</span><b>₹1,10,000</b></div><div><span>Attributed revenue</span><b>₹15,75,000</b></div><div><span>Retainer used</span><b>14 / 18</b></div><div class="btns" style="margin-top:4px"><span class="b">Preview</span><span class="b p">Send now</span></div></div></div></div>
</div></div></body></html>`;
})();
