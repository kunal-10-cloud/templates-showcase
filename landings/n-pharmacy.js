// Pharmacy POS · Lifeline Pharmacy (Kothrud, Pune): keyboard-first billing with FEFO batch picker, Rx + H1 register.
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const sch = (s) => s ? `<span class="sch ${s === "H1" ? "s-h1" : "s-h"}">Sch ${s}</span>` : `<span class="sch s-otc">OTC</span>`;

  window.LANDINGS.pharmacy = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Caveat:wght@500;700&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;background:#EEF4F2;color:#0F2A3A;font:13.5px/1.4 'IBM Plex Sans',system-ui,sans-serif}
.mono{font-family:'IBM Plex Mono',monospace}
.top{height:58px;background:#fff;border-bottom:1px solid #D8E3DF;display:flex;align-items:center;gap:16px;padding:0 20px}
.logo{display:flex;align-items:center;gap:11px}.cross{width:34px;height:34px;position:relative}.cross:before,.cross:after{content:"";position:absolute;background:#0B7A55;border-radius:3px}.cross:before{left:12px;top:2px;width:10px;height:30px}.cross:after{left:2px;top:12px;width:30px;height:10px}
.logo b{display:block;font-size:16px;font-weight:700;line-height:1.1}.logo span{font:500 10.5px 'IBM Plex Mono';letter-spacing:.12em;color:#5B7383}
.tag{font:500 11px 'IBM Plex Mono';color:#3D5868;border:1px solid #D8E3DF;border-radius:7px;padding:3px 8px;background:#F7FAF9}
.keys{display:flex;gap:6px;margin-left:8px}.keys span{font-size:12px;color:#5B7383}.keys kbd{font:600 11px 'IBM Plex Mono';border:1px solid #C9D7D2;border-bottom-width:2px;border-radius:5px;padding:0 5px;margin-right:4px;background:#fff;color:#0F2A3A}
.tr{margin-left:auto;display:flex;align-items:center;gap:12px}.ph{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#3D5868}.ph i{width:30px;height:30px;border-radius:50%;background:#0B7A55;color:#fff;display:grid;place-items:center;font:600 11px 'IBM Plex Sans';font-style:normal}
.ask{background:#0F2A3A;color:#fff;border-radius:9px;padding:7px 12px;font-weight:600;font-size:13px}
.main{display:grid;grid-template-columns:1fr 452px;gap:16px;padding:16px 18px 0;height:584px}
.card{background:#fff;border:1px solid #D8E3DF;border-radius:14px;min-width:0;overflow:hidden}
/* bill */
.bill{display:flex;flex-direction:column}
.bh{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid #E6EEEB}
.bh b{font-size:16px}.bh .mono{font-size:12px;color:#5B7383}
.search{flex:1;display:flex;align-items:center;gap:8px;border:2px solid #0B7A55;border-radius:10px;padding:6px 10px;background:#F4FBF8;font:500 13.5px 'IBM Plex Mono'}
.search .c{width:2px;height:16px;background:#0B7A55;animation:bl 1s steps(1) infinite}@keyframes bl{50%{opacity:0}}
.search small{margin-left:auto;font:500 11.5px 'IBM Plex Sans';color:#5B7383}
table{width:100%;border-collapse:collapse}th{font:600 10.5px 'IBM Plex Mono';letter-spacing:.08em;text-transform:uppercase;color:#7D93A0;text-align:left;padding:8px 10px;border-bottom:1px solid #E6EEEB;background:#F7FAF9}th.n,td.n{text-align:right}
td{padding:5px 10px;border-bottom:1px solid #EEF3F1;vertical-align:middle}td.n{font:500 12.5px 'IBM Plex Mono'}
.it{display:flex;gap:10px;align-items:center}.it img{width:34px;height:34px;border-radius:8px;object-fit:cover;flex:none;border:1px solid #E6EEEB}
.it b{font-size:13.5px;display:flex;gap:6px;align-items:center}.it small{display:block;color:#5B7383;font-size:11.5px}
.sch{font:600 9.5px 'IBM Plex Mono';letter-spacing:.04em;padding:1px 5px;border-radius:4px}.sch.s-h1{background:#C2264B;color:#fff}.sch.s-h{background:#FDECC8;color:#8A5300}.sch.s-otc{background:#E6F4EE;color:#0B7A55}
.bt{font:500 11.5px 'IBM Plex Mono'}.ex{font:500 11.5px 'IBM Plex Mono';padding:1px 6px;border-radius:5px;background:#F1F5F4}.ex.soon{background:#FFF1D6;color:#8A5300}
tr.sel td{background:#F4FBF8}tr.sel td:first-child{box-shadow:inset 3px 0 0 #0B7A55}
.picker td{padding:0 10px 8px 54px;background:#F4FBF8}
.pk{border:1px solid #CFE4DB;border-radius:11px;background:#fff;overflow:hidden}
.pk .ph2{display:flex;justify-content:space-between;align-items:center;padding:7px 12px;background:#E9F6F0;font-size:12px;color:#0B5A40;font-weight:600}.pk .ph2 span{font:500 11px 'IBM Plex Mono';color:#3D5868}
.br{display:grid;grid-template-columns:20px 92px 1fr 130px 70px 70px 96px;gap:10px;align-items:center;padding:4px 12px;border-top:1px solid #EEF3F1;font-size:12.5px}
.br .rad{width:15px;height:15px;border-radius:50%;border:2px solid #A9BEB6}.br.on .rad{border:5px solid #0B7A55}
.br.on{background:#FBFFFD}.br .bar{height:6px;border-radius:4px;background:#EEF3F1;overflow:hidden}.br .bar i{display:block;height:100%;border-radius:4px}
.br small{color:#5B7383;font-size:11px}
.fefo{font:600 10px 'IBM Plex Mono';background:#0B7A55;color:#fff;border-radius:4px;padding:1px 5px}
.loose{font:600 10px 'IBM Plex Mono';background:#E8EEF7;color:#2C4A8A;border-radius:4px;padding:1px 5px}
.tot{margin-top:auto;display:grid;grid-template-columns:1fr auto;gap:14px;align-items:end;padding:9px 16px 11px;border-top:1px solid #E6EEEB;background:#F7FAF9}
.tl{display:grid;grid-template-columns:auto auto auto auto;gap:3px 16px;font-size:12.5px;color:#3D5868}.tl span:nth-child(even){font-family:'IBM Plex Mono';color:#0F2A3A}
.tr2{display:flex;align-items:center;gap:14px}.big small{display:block;font-size:11.5px;color:#5B7383;text-align:right}.big b{font:700 32px 'IBM Plex Sans';letter-spacing:-.02em}
.btn{display:inline-flex;align-items:center;gap:6px;border-radius:9px;padding:8px 13px;font-weight:600;font-size:13px;border:1px solid #C9D7D2;background:#fff;color:#0F2A3A}.btn.p{background:#0B7A55;border-color:#0B7A55;color:#fff}.btn.s{padding:5px 10px;font-size:12px}
/* right */
.rx{padding:12px 14px;display:flex;flex-direction:column;gap:10px;height:100%}
.pt{display:flex;justify-content:space-between;align-items:flex-start}.pt b{font-size:15px;display:block}.pt small{color:#5B7383;font-size:12px}
.ok{font:600 11px 'IBM Plex Mono';color:#0B7A55;background:#E6F4EE;border-radius:6px;padding:2px 7px}
.paper{position:relative;background:#FFFEF8;border:1px solid #E7E1CC;border-radius:6px;padding:12px 14px 10px;transform:rotate(-1.2deg);box-shadow:0 10px 22px rgba(15,42,58,.12)}
.paper .lh{display:flex;justify-content:space-between;border-bottom:2px solid #1D4E89;padding-bottom:5px}.paper .lh b{font-size:13px;color:#1D4E89}.paper .lh small{font-size:9.5px;color:#4B5F70;display:block}
.paper .hw{font:500 18px/1.25 'Caveat',cursive;color:#1D3F7A}.paper .hw div{display:flex;gap:8px}.paper .hw .rxs{font:700 24px 'Caveat';color:#1D4E89}
.paper .sig{position:absolute;right:16px;bottom:8px;font:700 20px 'Caveat';color:#1D3F7A;transform:rotate(-6deg)}
.paper .stamp{position:absolute;right:16px;top:70px;border:2px solid #0B7A55;color:#0B7A55;font:700 10px 'IBM Plex Mono';padding:2px 6px;border-radius:4px;transform:rotate(8deg);opacity:.85;background:rgba(255,255,255,.6)}
.reg{border:1px solid #F3C9D3;background:#FFF6F8;border-radius:11px;padding:9px 12px}
.reg .t{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;font-weight:600;color:#9E1B3B}.reg .t span{font:500 11px 'IBM Plex Mono';color:#9E1B3B}
.kv{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin-top:6px;font-size:12px}.kv span:nth-child(odd){color:#7D93A0}.kv span:nth-child(even){font-family:'IBM Plex Mono';font-size:11.5px}
.sub{border:1px solid #D8E3DF;border-radius:11px;overflow:hidden}
.sub .t{display:flex;justify-content:space-between;align-items:center;padding:7px 12px;background:#F7FAF9;font-size:12.5px;font-weight:600}.sub .t span{font:500 11px 'IBM Plex Mono';color:#5B7383;font-weight:500}
.sr{display:grid;grid-template-columns:1fr 70px 76px;gap:8px;align-items:center;padding:5px 12px;border-top:1px solid #EEF3F1;font-size:12.5px}.sr small{display:block;color:#5B7383;font-size:11px}.sr .m{font:600 11.5px 'IBM Plex Mono';text-align:right}.sr .pr{font:500 12px 'IBM Plex Mono';text-align:right}
.sr.cur{background:#F7FAF9}.sr.best .m{color:#0B7A55}.sr.best{background:#F4FBF8}
.mbar{height:5px;border-radius:3px;background:#E6EEEB;margin-top:3px}.mbar i{display:block;height:100%;border-radius:3px;background:#0B7A55}
/* bottom */
.bot{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:14px 18px 0}
.bot .card{height:228px}
.h{display:flex;justify-content:space-between;align-items:center;padding:10px 14px 6px}.h b{font-size:14px}.h span{font:500 11px 'IBM Plex Mono';color:#5B7383}
.row{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:6px 14px;border-top:1px solid #EEF3F1;font-size:12.5px}.row small{display:block;color:#5B7383;font-size:11px}.row .v{font:600 12px 'IBM Plex Mono'}
.chip{font:600 10.5px 'IBM Plex Mono';padding:2px 6px;border-radius:5px;white-space:nowrap}.chip.r{background:#FDE2E6;color:#9E1B3B}.chip.a{background:#FFF1D6;color:#8A5300}.chip.g{background:#E6F4EE;color:#0B7A55}
.foot{display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-top:1px solid #EEF3F1;font-size:12px;color:#3D5868}
.pur{padding:2px 14px 0;font-size:12.5px}.pur .ln{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:5px 0;border-bottom:1px dashed #E0E9E5}.pur .ln span:nth-child(even){font-family:'IBM Plex Mono';text-align:right}
.scheme{display:flex;align-items:center;gap:10px;background:#F4FBF8;border:1px solid #CFE4DB;border-radius:10px;padding:7px 10px;margin:6px 14px 0}.scheme b{font:700 18px 'IBM Plex Mono';color:#0B7A55}.scheme small{display:block;color:#3D5868;font-size:11.5px}
.wa{width:20px;height:20px;border-radius:50%;background:#25D366;color:#fff;display:inline-grid;place-items:center;font:700 9px 'IBM Plex Sans'}
</style></head><body>
<div class="top"><div class="logo"><div class="cross"></div><div><b>Lifeline Pharmacy</b><span>PHARMACY POS · KOTHRUD, PUNE</span></div></div>
<span class="tag">DL 20B/21B · MH-PZ3-118204</span>
<div class="keys"><span><kbd>F2</kbd>New bill</span><span><kbd>F3</kbd>Batch</span><span><kbd>F6</kbd>Attach Rx</span><span><kbd>F9</kbd>Substitute</span></div>
<div class="tr"><div class="ph"><i>SP</i>S. Patil · Reg. pharmacist</div><span class="ask">✦ Ask Pharmacy POS</span></div></div>

<div class="main">
<div class="card bill">
<div class="bh"><div><b>Bill</b> <span class="mono">LP/26-27/24518</span></div><div class="search">dolo<span class="c"></span><small>brand or salt · ↵ to add</small></div><span class="btn s">Hold bill</span></div>
<table>
<tr><th>Medicine</th><th>Batch</th><th>Expiry</th><th class="n">Qty</th><th class="n">MRP</th><th class="n">Amount</th></tr>
<tr class="sel"><td><div class="it"><img src="img/pharmacy/para.jpg" alt=""><div><b>Dolo 650 ${sch("")}</b><small>Paracetamol 650 mg · strip of 15 · Micro Labs</small></div></div></td><td class="bt">DOL4012</td><td><span class="ex soon">11/26</span></td><td class="n">2 strips</td><td class="n">33.60</td><td class="n"><b>67.20</b></td></tr>
<tr class="picker"><td colspan="6"><div class="pk"><div class="ph2">Choose batch · first expiry, first out<span>169 strips in stock · 3 batches</span></div>
<div class="br on"><span class="rad"></span><span class="mono">DOL4012</span><span>Exp <b>Nov 2026</b> <span class="fefo">FEFO</span> <small>· 54 days left</small></span><span><div class="bar"><i style="width:6%;background:#E08A00"></i></div><small>3 strips</small></span><span class="mono">₹24.10</span><small>PTR</small><b class="mono">use 2</b></div>
<div class="br"><span class="rad"></span><span class="mono">DOL4521</span><span>Exp Mar 2027</span><span><div class="bar"><i style="width:28%;background:#0B7A55"></i></div><small>46 strips</small></span><span class="mono">₹24.10</span><small>PTR</small><small>next</small></div>
<div class="br"><span class="rad"></span><span class="mono">DOL4790</span><span>Exp Aug 2027 <small>· received today</small></span><span><div class="bar"><i style="width:72%;background:#0B7A55"></i></div><small>120 strips</small></span><span class="mono">₹21.91</span><small>eff. PTR</small><small>scheme</small></div>
</div></td></tr>
<tr><td><div class="it"><img src="img/pharmacy/strip.jpg" alt=""><div><b>Azithral 500 ${sch("H1")}</b><small>Azithromycin 500 mg · strip of 3 · Alembic</small></div></div></td><td class="bt">AZ2310</td><td><span class="ex">03/27</span></td><td class="n">1 strip</td><td class="n">119.50</td><td class="n"><b>119.50</b></td></tr>
<tr><td><div class="it"><img src="img/pharmacy/strip.jpg" alt="" style="filter:hue-rotate(160deg) saturate(.6)"><div><b>Pantocid 40 ${sch("H")}</b><small>Pantoprazole 40 mg · strip of 15 · Sun Pharma</small></div></div></td><td class="bt">PT8821</td><td><span class="ex">08/27</span></td><td class="n">1 strip</td><td class="n">155.00</td><td class="n"><b>155.00</b></td></tr>
<tr><td><div class="it"><img src="img/pharmacy/syrup.jpg" alt=""><div><b>Ascoril LS Syrup ${sch("H")}</b><small>Ambroxol + Levosalbutamol + Guaiphenesin · 100 ml</small></div></div></td><td class="bt">AS1190</td><td><span class="ex">01/27</span></td><td class="n">1</td><td class="n">118.00</td><td class="n"><b>118.00</b></td></tr>
<tr><td><div class="it"><img src="img/pharmacy/strip.jpg" alt="" style="filter:grayscale(.4) brightness(1.08)"><div><b>Shelcal 500 ${sch("")} <span class="loose">LOOSE</span></b><small>Calcium + Vitamin D3 · 10 of 15 tabs · ₹8.07/tab</small></div></div></td><td class="bt">SH6604</td><td><span class="ex">06/27</span></td><td class="n">10 tabs</td><td class="n">121.00</td><td class="n"><b>80.67</b></td></tr>
</table>
<div class="tot"><div class="tl">
<span>Gross</span><span>₹540.37</span><span>Discount 10%</span><span>−₹54.04</span>
<span>Taxable</span><span>₹463.17</span><span>CGST 2.5% + SGST 2.5%</span><span>₹11.58 + ₹11.58</span>
<span>Round off</span><span>−₹0.33</span><span>Patient saves</span><span style="color:#0B7A55">₹54.37</span></div>
<div class="tr2"><div class="big"><small>5 items · incl. GST</small><b>₹486.00</b></div><span class="btn">UPI / Card</span><span class="btn p">Save &amp; print · F10</span></div></div>
</div>

<div class="card"><div class="rx">
<div class="pt"><div><b>Anil Deshpande · 58 M</b><small>Kothrud, Pune 411038 · +91 98220 •••17 · 6 visits</small></div><span class="ok">Rx attached ✓</span></div>
<div class="paper"><div class="lh"><div><b>Dr. Meera Kulkarni</b><small>MBBS, MD (Medicine) · Reg. MMC 2009/03/4471</small></div><small style="text-align:right">Karve Road, Pune<br>05/10/2026</small></div>
<span class="stamp">DISPENSED · LP 24518</span>
<div class="hw"><div><span class="rxs">℞</span><span style="margin-top:4px">Mr. Anil Deshpande, 58</span></div>
<div>1. Tab Azithral 500 &nbsp;1-0-0 × 3 d</div><div>2. Tab Pantocid 40 &nbsp;1-0-0 × 15 d</div><div>3. Syp Ascoril LS &nbsp;10 ml TDS</div><div>4. Tab Dolo 650 &nbsp;SOS</div></div>
<span class="sig">MKulkarni</span></div>
<div class="reg"><div class="t">Schedule H1 register · auto-entry on save<span>Sr. 1,248</span></div>
<div class="kv"><span>Drug</span><span>Azithral 500 · AZ2310 · 1 strip (3 tabs)</span><span>Patient</span><span>Anil Deshpande, Kothrud, Pune</span><span>Prescriber</span><span>Dr. Meera Kulkarni · MMC 2009/03/4471</span></div></div>
<div class="sub"><div class="t">Same salt · Pantoprazole 40 mg<span>F9 to swap</span></div>
<div class="sr cur"><div>Pantocid 40 · Sun<small>in bill</small></div><span class="pr">₹155.00</span><span class="m">20%<div class="mbar"><i style="width:43%"></i></div></span></div>
<div class="sr"><div>Pan 40 · Alkem</div><span class="pr">₹149.00</span><span class="m">24%<div class="mbar"><i style="width:52%"></i></div></span></div>
<div class="sr best"><div>Pantoprazole 40 · generic<small>patient saves ₹113.00</small></div><span class="pr">₹42.00</span><span class="m">46%<div class="mbar"><i style="width:100%"></i></div></span></div>
</div>
</div></div>
</div>

<div class="bot">
<div class="card"><div class="h"><b>Near expiry · next 90 days</b><span>12 items · ₹6,940 at PTR</span></div>
<div class="row"><div>Augmentin 625 Duo<small>2 strips · AG7712</small></div><span class="chip r">exp 11/26</span><span class="v">₹402</span></div>
<div class="row"><div>Montair LC<small>4 strips · MT3398</small></div><span class="chip a">exp 12/26</span><span class="v">₹648</span></div>
<div class="row"><div>Becosules Z<small>6 strips · BC1150</small></div><span class="chip a">exp 12/26</span><span class="v">₹270</span></div>
<div class="foot"><span>Expiry return to Sai Pharma</span><span class="btn p s">Raise claim · ₹2,840</span></div></div>

<div class="card"><div class="h"><b>Purchase inward</b><span>SP/26-27/4418 · 05 Oct</span></div>
<div class="scheme"><b>10+1</b><div><b style="font:600 13px 'IBM Plex Sans';color:#0F2A3A">Dolo 650 · scheme applied</b><small>100 strips + 10 free · PTR ₹24.10 → eff. ₹21.91 · margin 31.5%</small></div></div>
<div class="pur"><div class="ln"><span>Sai Pharma Distributors · 4 items</span><span>₹9,862.00</span></div><div class="ln"><span>GST 5% on purchase</span><span>₹493.10</span></div><div class="ln"><span>Batches and expiries captured</span><span style="color:#0B7A55">4 / 4 ✓</span></div></div>
<div class="foot"><span>Payable due 04 Nov · 30 days</span><span class="btn s">View invoice</span></div></div>

<div class="card"><div class="h"><b>Refill reminders</b><span>chronic patients · WhatsApp</span></div>
<div class="row"><div>Lata Joshi · Glycomet GP 1<small>30-day pack · runs out in 3 days</small></div><span class="chip g">sent ✓</span><span class="wa">WA</span></div>
<div class="row"><div>Prakash Rao · Telma 40<small>due tomorrow · usually picks up</small></div><span class="chip a">today 7 pm</span><span class="wa">WA</span></div>
<div class="row"><div>Vasant Kulkarni · Thyronorm 50<small>due 9 Oct · home delivery</small></div><span class="chip a">queued</span><span class="wa">WA</span></div>
<div class="foot"><span>Make it yours: add home delivery slots</span><span class="btn s">All 38</span></div></div>
</div>
</body></html>`;
})();
