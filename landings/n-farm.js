// Farm OS · Green Valley Dairy & Farms (Nashik): map-first farm workspace.
(function () {
  window.LANDINGS = window.LANDINGS || {};

  const tasks = [
    ["06:00", "AM milking · 26 cows", "Raju, Sunita", "Done · 214 L", "done"],
    ["07:30", "Spray Mancozeb on G1 before rain", "Santosh + 2", "1.4 / 3.2 ac", "run"],
    ["09:00", "AI for Laxmi (GV-014), in heat 06:10", "Dr. Kale, vet", "Booked", "next"],
    ["11:00", "Drip S1 · valves 3–6 · 2 h", "Auto controller", "Scheduled", "auto"],
    ["14:00", "Hand-weed onion nursery O1", "4 labour · ₹400/day", "Scheduled", "todo"],
    ["16:30", "CMT re-test Kaveri, milk kept aside", "Sunita", "Scheduled", "todo"]
  ];
  const cows = [
    ["GV-014", "Laxmi", "HF", "18.6", "Day 74", "In heat · AI 09:00", "ai"],
    ["GV-022", "Ganga", "HF × Gir", "16.2", "Day 131", "PD+ · 92 days", "ok"],
    ["GV-031", "Kaveri", "HF", "9.4", "Day 96", "Mastitis watch · withheld", "bad"],
    ["GV-008", "Sita", "Gir", "7.8", "Day 210", "Normal", "ok"],
    ["GV-019", "Radha", "HF", "Dry", "—", "Calving due 18 Oct", "dry"]
  ];
  const milk = [372, 380, 377, 389, 395, 386, 391, 398, 384, 379, 388, 396, 401, 392];

  const tStat = s => ({ done: "background:#E4F1D9;color:#3E6B21", run: "background:#FFF0C7;color:#8A5A00", next: "background:#E7EEFF;color:#2E4FB8", auto: "background:#E9EEF0;color:#46606B", todo: "background:#EFEDE6;color:#5C5648" })[s];
  const cTag = s => ({ ai: "background:#FFF0C7;color:#8A5A00", ok: "background:#E4F1D9;color:#3E6B21", bad: "background:#FBE3DD;color:#A8331C", dry: "background:#E9EEF0;color:#46606B" })[s];
  const mx = Math.max(...milk), mn = 360;
  const spark = milk.map((v, i) => `${(i * 19).toFixed(0)},${(44 - (v - mn) / (mx - mn) * 38).toFixed(1)}`).join(" ");

  window.LANDINGS.farm = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13px/1.4 'Sora',system-ui,sans-serif;color:#1F2A1D;background:#F4F1E8}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:54px;background:#17231A;color:#E8EDDF;display:flex;align-items:center;gap:22px;padding:0 20px}
.br{display:flex;align-items:center;gap:10px}.br i{width:32px;height:32px;border-radius:9px;background:#B5D334;display:grid;place-items:center;color:#17231A;font-style:normal;font-weight:700}
.br b{display:block;font-size:14px}.br span{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.14em;color:#9DB08F}
.tabs{display:flex;gap:4px}.tabs span{padding:7px 12px;border-radius:8px;color:#B9C6AE;font-weight:500}.tabs span.on{background:#26372A;color:#fff}
.tabs em{font-style:normal;background:#E2553A;color:#fff;font-size:10px;font-weight:700;border-radius:8px;padding:0 6px;margin-left:5px}
.sp{flex:1}.ask{border:1px solid #3B5440;border-radius:9px;padding:7px 12px;color:#D7E7B5;font-weight:600}.av{width:30px;height:30px;border-radius:50%;background:#B5D334;color:#17231A;display:grid;place-items:center;font-weight:700;font-size:11px}
.wrap{display:grid;grid-template-columns:888px 1fr;height:846px}
.map{position:relative;overflow:hidden;background:#5E513C}
.glass{position:absolute;background:rgba(18,28,20,.84);backdrop-filter:blur(6px);color:#E8EDDF;border:1px solid rgba(255,255,255,.12);border-radius:14px}
.lay{left:16px;top:16px;padding:6px;display:flex;gap:4px}.lay span{padding:6px 11px;border-radius:9px;font-size:12px;font-weight:600;color:#B9C6AE}.lay span.on{background:#B5D334;color:#17231A}
.leg{left:16px;bottom:16px;padding:12px 14px;width:268px}.leg .bar{height:8px;border-radius:5px;background:linear-gradient(90deg,#B98F4A,#D9C25A,#9CC54A,#4E9E3A,#1E6E2E);margin:8px 0 4px}
.leg .sc{display:flex;justify-content:space-between;font:500 10.5px 'JetBrains Mono',monospace;color:#9DB08F}
.wx{right:16px;top:16px;width:262px;padding:11px 12px}
.wx .d{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:10px}
.wx .d div{text-align:center;padding:7px 0;border-radius:9px;background:rgba(255,255,255,.05)}
.wx .d div.r{background:rgba(92,155,214,.28);outline:1px solid rgba(124,180,232,.6)}
.wx .d b{display:block;font-size:13px}.wx .d small{font-size:9.5px;color:#9DB08F;display:block}
.wx .adv{margin-top:10px;font-size:11.5px;color:#FFE08A;display:flex;gap:7px;align-items:flex-start}
.plot{left:350px;top:66px;width:258px;padding:12px 13px}
.plot h4{margin:0;font-size:15px}.plot .k{font:500 10px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#9DB08F}
.plot .g{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:9px 0}.plot .g div{background:rgba(255,255,255,.06);border-radius:8px;padding:7px 9px}
.plot .g small{display:block;font-size:10.5px;color:#9DB08F}.plot .g b{font-size:13px}
.risk{background:rgba(226,85,58,.18);border:1px solid rgba(226,85,58,.5);border-radius:9px;padding:8px 10px;font-size:11.5px;color:#FFC9BC}
.prog{height:6px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:9px}.prog i{display:block;height:100%;width:44%;background:#B5D334}
.side{padding:14px 16px;display:flex;flex-direction:column;gap:12px;overflow:hidden}
.card{background:#FFFDF7;border:1px solid #E3DECF;border-radius:14px;overflow:hidden}
.ch{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;border-bottom:1px solid #EEE9DC}.ch h3{margin:0;font-size:14px}.ch span{font-size:11.5px;color:#7A7462}
.tk{display:grid;grid-template-columns:44px 1fr auto;gap:10px;align-items:center;padding:5px 14px;border-bottom:1px solid #F2EEE3}
.tk:last-child{border-bottom:0}.tk .t{font:600 12px 'JetBrains Mono',monospace;color:#5C5648}.tk b{display:block;font-size:12px;font-weight:600;line-height:1.3}.tk small{color:#7A7462;font-size:10.5px}
.pill{font-size:10.5px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}
.herd{display:grid;grid-template-columns:150px 1fr;gap:0}
.hp{position:relative;border-right:1px solid #EEE9DC}.hp img{width:150px;height:96px;object-fit:cover;display:block}
.hp .m{padding:6px 12px}.hp .m b{font-size:22px;letter-spacing:-.02em}.hp .m small{display:block;color:#7A7462;font-size:11px}
.cw{display:grid;grid-template-columns:54px 1fr 54px;gap:8px;align-items:center;padding:4px 12px;border-bottom:1px solid #F2EEE3;font-size:12px}
.cw:last-child{border-bottom:0}.cw .id{font:600 11px 'JetBrains Mono',monospace;color:#5C5648}.cw b{font-weight:600}.cw small{color:#7A7462;font-size:10.5px}
.cw .l{font:600 12.5px 'JetBrains Mono',monospace;text-align:right}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;min-height:0}
.iv{display:grid;grid-template-columns:1fr auto;gap:0 8px;padding:5px 12px;border-bottom:1px solid #F2EEE3;font-size:12px}.iv:last-child{border-bottom:0}
.iv small{color:#7A7462;font-size:10.5px;grid-column:1}.iv .b{grid-row:span 2;align-self:center}
.ld{padding:5px 12px;border-bottom:1px solid #F2EEE3;font-size:12px;display:flex;justify-content:space-between;gap:8px}.ld small{display:block;color:#7A7462;font-size:10.5px}.ld b{font-family:'JetBrains Mono',monospace;font-size:12px;white-space:nowrap}
.pl{padding:4px 12px 8px}.pl div{display:grid;grid-template-columns:70px 1fr 54px;gap:8px;align-items:center;font-size:11.5px;margin-top:4px}
.pl i{display:block;height:7px;border-radius:4px;background:#7BA83A}.pl b{font:600 11.5px 'JetBrains Mono',monospace;text-align:right}
@keyframes pulse{0%,100%{r:7;opacity:1}50%{r:12;opacity:.35}}.pz{animation:pulse 1.8s infinite}
</style></head><body>
<div class="top"><div class="br"><i>GV</i><div><b>Green Valley Dairy &amp; Farms</b><span>FARM OS · NASHIK</span></div></div>
<div class="tabs"><span class="on">Farm map</span><span>Crops</span><span>Herd</span><span>Tasks</span><span>Inventory<em>2</em></span><span>Sales</span><span>Reports</span></div>
<div class="sp"></div><span class="mono" style="color:#9DB08F;font-size:12px">Mon 5 Oct · 07:52</span><span class="ask">✦ Ask Farm OS</span><span class="av">VP</span></div>
<div class="wrap">
<div class="map">
<svg width="888" height="846" viewBox="0 0 888 846" style="position:absolute;inset:0">
<defs>
<pattern id="soil" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#62543E"/><circle cx="2" cy="3" r="1" fill="#6E5E45"/><circle cx="7" cy="7" r=".8" fill="#56493A"/></pattern>
<pattern id="vine" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)"><rect width="10" height="10" fill="#4C7A33"/><rect width="10" height="4" fill="#6FA845"/></pattern>
<pattern id="vine2" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)"><rect width="10" height="10" fill="#7F7D3B"/><rect width="10" height="3.5" fill="#A6A44C"/></pattern>
<pattern id="cane" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(78)"><rect width="6" height="6" fill="#1F5E29"/><rect width="6" height="2.6" fill="#2E7E36"/></pattern>
<pattern id="maize" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(8)"><rect width="8" height="8" fill="#3D7A30"/><rect width="8" height="3" fill="#5C9B3E"/></pattern>
<pattern id="nursery" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#8E7848"/><circle cx="4" cy="4" r="1.4" fill="#B5A55A"/></pattern>
<pattern id="furrow" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)"><rect width="7" height="7" fill="#7A6447"/><rect width="7" height="2" fill="#5E4C36"/></pattern>
</defs>
<rect width="888" height="846" fill="url(#soil)"/>
<path d="M0 566 C 200 552, 320 584, 470 572 S 760 540, 888 556" stroke="#A89270" stroke-width="16" fill="none" opacity=".85"/>
<path d="M440 574 L 430 846" stroke="#A89270" stroke-width="12" fill="none" opacity=".8"/>
<path d="M20 0 C 30 160, 18 300, 34 540" stroke="#4E7C8F" stroke-width="5" fill="none" opacity=".7"/>
<polygon points="48,78 318,66 330,322 58,334" fill="url(#vine)" stroke="#D7F08A" stroke-width="3"/>
<polygon points="48,78 318,66 330,322 58,334" fill="#9CC54A" opacity=".18"/>
<polygon points="54,210 180,204 188,330 60,334" fill="#FFFFFF" opacity=".14"/>
<polygon points="48,356 250,350 256,540 54,546" fill="url(#vine2)" stroke="#F3E9C4" stroke-width="1.5" opacity=".95"/>
<polygon points="268,352 334,350 338,450 272,452" fill="url(#nursery)" stroke="#F3E9C4" stroke-width="1.5"/>
<polygon points="350,356 610,348 616,540 356,546" fill="url(#furrow)" stroke="#F3E9C4" stroke-width="1.5"/>
<polygon points="40,600 410,592 418,826 48,834" fill="url(#cane)" stroke="#F3E9C4" stroke-width="1.5"/>
<polygon points="462,598 668,590 674,800 468,806" fill="url(#maize)" stroke="#F3E9C4" stroke-width="1.5"/>
<ellipse cx="768" cy="466" rx="82" ry="54" fill="#3E7F9E" stroke="#8FC4DB" stroke-width="2"/>
<rect x="628" y="290" width="150" height="58" rx="4" fill="#B9B4A6" stroke="#E8E2D2" stroke-width="2"/><rect x="628" y="290" width="150" height="18" fill="#9E998C"/>
<rect x="790" y="290" width="76" height="26" rx="3" fill="#8C8A80"/><rect x="790" y="322" width="76" height="26" rx="3" fill="#A6907A"/>
<rect x="700" y="600" width="166" height="200" rx="6" fill="url(#furrow)" stroke="#F3E9C4" stroke-width="1.5" opacity=".7"/>
<g font-family="Sora" font-weight="700" font-size="13" fill="#fff" paint-order="stroke" stroke="rgba(0,0,0,.45)" stroke-width="3">
<text x="66" y="104">G1 · Thompson Seedless</text><text x="62" y="382">G2 · Sharad Seedless</text><text x="274" y="372" font-size="10.5">O1</text>
<text x="364" y="382">O2 · onion, transplant 10 Nov</text><text x="58" y="628">S1 · Sugarcane · day 241</text><text x="476" y="625">F1 · fodder maize</text>
<text x="636" y="330" font-size="12">Cattle shed · 42 head</text><text x="796" y="307" font-size="10">Silage</text><text x="796" y="339" font-size="10">Chawl</text><text x="728" y="470" font-size="12">Farm pond</text><text x="712" y="626" font-size="11">Fallow · next rabi</text></g>
<g font-family="JetBrains Mono" font-size="11" fill="#E8EDDF" paint-order="stroke" stroke="rgba(0,0,0,.5)" stroke-width="3">
<text x="66" y="122">3.2 ac · NDVI 0.71</text><text x="62" y="400">2.0 ac · NDVI 0.58</text><text x="62" y="416">prune 8 Oct</text><text x="364" y="400">1.5 ac · ploughed</text><text x="274" y="388" font-size="9.5">nursery</text><text x="58" y="646">4.0 ac · NDVI 0.82</text><text x="476" y="643">1.0 ac · silage 12 Oct</text><text x="736" y="488">62% full</text></g>
<circle cx="190" cy="212" r="7" fill="#FFE08A" class="pz"/><circle cx="190" cy="212" r="5" fill="#FFE08A"/>
<line x1="56" y1="212" x2="326" y2="202" stroke="#FFE08A" stroke-width="1.5" stroke-dasharray="5 4" opacity=".9"/>
<line x1="330" y1="150" x2="350" y2="150" stroke="#D7F08A" stroke-width="2"/>
</svg>
<div class="glass lay"><span class="on">Crop stage</span><span>NDVI</span><span>Irrigation</span><span>Soil tests</span></div>
<div class="glass wx"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:13px">Pimpalgaon, Nashik</b><span class="mono" style="font-size:10.5px;color:#9DB08F">IMD · sensor</span></div>
<div class="d"><div><small>Mon</small><b>31°</b><small>0%</small></div><div><small>Tue</small><b>30°</b><small>20%</small></div><div><small>Wed</small><b>28°</b><small>40%</small></div><div class="r"><small>Thu</small><b>26°</b><small>70% · 18mm</small></div><div><small>Fri</small><b>27°</b><small>30%</small></div></div>
<div class="adv">⚠ Spray before Wed 18:00. Thursday rain on fresh grape shoots raises downy mildew risk.</div></div>
<div class="glass plot"><div class="k">PLOT G1 · GRAPES · EXPORT BLOCK</div><h4 style="margin-top:3px">Thompson Seedless, fruit pruning day 6</h4>
<div class="g"><div><small>Pruned</small><b>30 Sep</b></div><div><small>Health · NDVI</small><b>0.71 ▲0.04</b></div></div>
<div class="risk"><b>Downy mildew risk: high</b> from Thursday. Mancozeb 75 WP at 2 g/L scheduled today; residue gap noted for EU export lots.</div>
<div style="display:flex;justify-content:space-between;font-size:11.5px;margin-top:9px"><span>Spray crew · Santosh</span><span class="mono">1.4 / 3.2 ac</span></div><div class="prog"><i></i></div></div>
<div class="glass leg"><div style="display:flex;justify-content:space-between"><b style="font-size:12px">Crop health (NDVI)</b><span class="mono" style="font-size:10.5px;color:#9DB08F">Sentinel-2 · 3 Oct</span></div><div class="bar"></div><div class="sc"><span>0.1 bare</span><span>0.4</span><span>0.6</span><span>0.8 dense</span></div>
<div style="font-size:11px;color:#B9C6AE;margin-top:8px">12.2 acres cropped · 6 plots · 1 export block (GrapeNet)</div></div>
</div>
<div class="side">
<div class="card"><div class="ch"><h3>Today on the farm</h3><span>11 of 12 labour present</span></div>
${tasks.map(([t, w, who, st, k]) => `<div class="tk"><span class="t">${t}</span><div><b>${w}</b><small>${who}</small></div><span class="pill" style="${tStat(k)}">${st}</span></div>`).join("")}</div>
<div class="card"><div class="ch"><h3>Herd</h3><span>26 milking · 6 dry · 10 young</span></div>
<div class="herd"><div class="hp"><img src="img/farm/cow.jpg" alt=""><div class="m"><small>Milk today · 214 AM + 178 PM</small><b class="mono">392 L</b>
<svg width="126" height="34" viewBox="0 0 247 46" style="margin-top:2px"><polyline points="${spark}" fill="none" stroke="#5C9B3E" stroke-width="2.5"/></svg></div></div>
<div>${cows.map(([id, n, br, l, d, s, k]) => `<div class="cw"><span class="id">${id}</span><div><b>${n}</b> <small>${br} · ${d}</small> <span class="pill" style="${cTag(k)};font-size:10px;padding:1px 7px">${s}</span></div><span class="l">${l}${l === "Dry" ? "" : " L"}</span></div>`).join("")}</div></div></div>
<div class="two">
<div class="card"><div class="ch"><h3>Inputs</h3><span>Godown</span></div>
<div class="iv"><b>Mancozeb 75 WP</b><span class="pill b" style="background:#FBE3DD;color:#A8331C">Reorder</span><small>6 kg · G1+G2 spray needs 9 kg</small></div>
<div class="iv"><b>Cattle feed pellets</b><span class="pill b" style="background:#FFF0C7;color:#8A5A00">6 days</span><small>1,150 kg · uses 190 kg/day</small></div>
<div class="iv"><b>0:52:34 (MKP)</b><span class="pill b" style="background:#E4F1D9;color:#3E6B21">OK</span><small>75 kg · fertigation after pruning</small></div>
<div class="iv"><b>Onion seed N-53</b><span class="pill b" style="background:#E4F1D9;color:#3E6B21">OK</span><small>8 kg · for O2 transplant</small></div></div>
<div class="card"><div class="ch"><h3>Sales &amp; margin</h3><span>*cane at FRP</span></div>
<div class="ld"><div>Milk co-op · 21–30 Sep<small>3,912 L × ₹36.40</small></div><b>₹1,42,397</b></div>
<div class="ld"><div>Onion · Lasalgaon<small>48 qtl × ₹2,450, less 3%</small></div><b>₹1,14,072</b></div>
<div class="pl"><div><span>Grapes</span><i style="width:100%"></i><b>₹10.5L</b></div><div><span>Dairy</span><i style="width:65%"></i><b>₹6.8L</b></div><div><span>Sugarcane</span><i style="width:32%;background:#B9B4A6"></i><b>₹3.4L*</b></div><div><span>Onion</span><i style="width:16%"></i><b>₹1.7L</b></div>
</div></div>
</div></div></div></body></html>`;
})();
