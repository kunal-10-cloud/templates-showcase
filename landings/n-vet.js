// Vet & Pet OS · Paws & Claws Animal Hospital — patient-flow whiteboard + opened record + boarding
(function () {
  window.LANDINGS = window.LANDINGS || {};
  const ic = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    paw: '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="5.5" r="2"/><circle cx="17" cy="8" r="2"/><path d="M8 15c0-2.5 2-4.5 4-4.5s4 2 4 4.5-1.8 3.5-4 3.5-4-1-4-3.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', alert: '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    msg: '<path d="M4 5h16v11H8l-4 4z"/>', check: '<path d="M5 12l5 5 9-10"/>', bowl: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>',
    pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)"/><path d="M9.5 8.5l5 7"/>', scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5 20 20M8.5 15.5 20 4"/>',
    syringe: '<path d="M18 2l4 4M15 5l4 4M3 21l4-4M7 17l-2-2 9-9 4 4-9 9z"/>', scale: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 10a4 4 0 0 1 8 0z"/>'
  };

  const cards = {
    "Checked in": [
      ["golden", "Biscuit", "Golden Retriever · 7y · M/N", "34.2 kg", [["Limping R hind", "n"]], "Hannah Ortiz", "Dr. Patel", "9:40", "Waiting 6 min", 1],
      ["tabby", "Miso", "DSH tabby · 3y · F/S", "4.1 kg", [["FAS 3 · towel wrap", "w"], ["Cat-only room", "n"]], "Leo Brandt", "Dr. Kim", "9:50", "Room 4 ready", 0]
    ],
    "In exam": [
      ["frenchie", "Otis", "French Bulldog · 2y · M", "12.6 kg", [["BOAS · no sedation w/o O2", "r"]], "Priya Shah", "Dr. Kim", "9:15", "Exam · 18 min", 0],
      ["collie", "Lady", "Border Collie · 9y · F/S", "18.9 kg", [["Allergy · chicken", "r"], ["Senior panel", "n"]], "The Mendez family", "Dr. Patel", "9:20", "Exam · 12 min", 0]
    ],
    "Treatment & hospital": [
      ["beagle", "Waffles", "Beagle · 5y · M/N", "13.4 kg", [["Fear Free · muzzle", "w"]], "Sam Okafor", "Dr. Patel", "8:10", "Dental · in recovery", 0],
      ["siamese", "Nori", "Siamese mix · 11y · F/S", "3.6 kg", [["CKD 2 · IV fluids", "w"]], "Grace Lin", "Dr. Kim", "Day 2", "Next check 10:30", 0]
    ],
    "Ready to go home": [
      ["lab", "Pepper", "Labrador mix · 4y · F/S", "27.8 kg", [["Spay · e-collar 10d", "n"]], "Tom Becker", "Dr. Patel", "7:30", "Discharge 11:00", 0]
    ]
  };
  const tone = { n: ["#EEF2F7", "#3B4A63"], w: ["#FFF3D6", "#8A5A00"], r: ["#FFE4E1", "#B42318"] };
  const card = ([img, name, breed, wt, alerts, owner, doc, time, status, sel]) => `
    <div class="pc${sel ? " sel" : ""}">
      <div class="ph"><img src="img/vet/${img}.jpg" alt=""><span class="wt">${wt}</span></div>
      <div class="pb">
        <div class="pn"><b>${name}</b><span class="tm">${time}</span></div>
        <div class="br">${breed}</div>
        <div class="al">${alerts.map(([t, k]) => `<span style="background:${tone[k][0]};color:${tone[k][1]}">${k === "r" || k === "w" ? ic(I.alert, 11) : ""}${t}</span>`).join("")}</div>
        <div class="ow"><span>${owner}</span><span class="dr">${doc}</span></div>
        <div class="st">${ic(I.clock, 12)}${status}</div>
      </div>
    </div>`;
  const colTone = { "Checked in": "#4F7CFF", "In exam": "#7A5AF8", "Treatment & hospital": "#F2994A", "Ready to go home": "#22A06B" };
  const board = Object.entries(cards).map(([col, list]) => `
    <div class="col"><div class="ch"><i style="background:${colTone[col]}"></i>${col}<em>${list.length}</em></div>${list.map(card).join("")}</div>`).join("");

  const runs = [
    ["R1", "Bella", "Lab · 4 nights", "1½ c kibble", "AM · PM", "", "g"], ["R2", "Mochi", "Shiba · 2 nights", "own food", "AM · PM", "Apoquel 16mg · 8am", "a"],
    ["R3", "Duke", "GSD · 6 nights", "Hill's i/d", "3× daily", "", "g"], ["R4", "", "", "", "", "", "e"],
    ["R5", "Coco", "Poodle · 1 night", "own food", "AM", "Insulin 6u · 7am / 7pm", "r"], ["R6", "Rex", "Boxer · 3 nights", "1 c kibble", "AM · PM", "", "g"],
    ["C1", "Luna", "Cat · 5 nights", "wet ½ can", "AM · PM", "", "g"], ["C2", "Tofu", "Cat · 2 nights", "Renal diet", "AM · PM", "Benazepril · 8am", "a"],
    ["C3", "", "", "", "", "", "e"], ["S1", "Ziggy", "Pug · day play", "lunch only", "12pm", "", "g"]
  ];
  const runTone = { g: "#22A06B", a: "#F2994A", r: "#E5484D", e: "#C9D0DC" };
  const kennels = runs.map(([r, n, d, food, when, med, k]) => n ? `
    <div class="kn"><div class="kh"><b>${r}</b><i style="background:${runTone[k]}"></i></div><div class="kname">${n}</div><div class="kd">${d}</div>
      <div class="kf">${ic(I.bowl, 11)}${food} · ${when}</div>${med ? `<div class="km">${ic(I.pill, 11)}${med}</div>` : ""}</div>`
    : `<div class="kn empty"><div class="kh"><b>${r}</b></div><div class="kd">Open · cleaned 8:45</div></div>`).join("");

  const vax = [["Rabies (3-yr)", "Due 12 Oct", "w"], ["DHPP", "Due 20 Nov", "n"], ["Leptospirosis", "Overdue · 9 Sep", "r"], ["Bordetella", "Current · Mar 2027", "g"]];
  const vt = { n: "#3B4A63", w: "#8A5A00", r: "#B42318", g: "#167A4C" };
  const wts = [31.8, 32.4, 33.0, 33.5, 33.9, 34.2];
  const wPts = wts.map((w, i) => `${10 + i * 44},${62 - (w - 31.5) * 18}`).join(" ");

  window.LANDINGS.vet = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=JetBrains+Mono:wght@500;600&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;width:1440px;height:900px;overflow:hidden;font:13.5px/1.4 'Nunito',system-ui,sans-serif;color:#1B2436;background:#F4F1EC}
.mono{font-family:'JetBrains Mono',monospace}
.top{height:56px;background:#1C2B4A;color:#E7ECF5;display:flex;align-items:center;gap:22px;padding:0 20px}
.lg{display:flex;align-items:center;gap:10px}.lg i{width:34px;height:34px;border-radius:11px;background:#FF7A59;display:grid;place-items:center;color:#fff;font-style:normal}
.lg b{display:block;white-space:nowrap;font-size:15px;font-weight:800;color:#fff;line-height:1.1}.lg span{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.12em;color:#93A3C3}
.tabs{display:flex;gap:4px}.tabs span{padding:7px 10px;white-space:nowrap;border-radius:9px;font-weight:700;color:#B9C5DB;display:flex;gap:6px;align-items:center}.tabs span.on{background:#2B3D63;color:#fff}
.tabs em{font-style:normal;font-size:11px;background:#FF7A59;color:#fff;border-radius:8px;padding:0 6px;line-height:17px}
.sr{margin-left:auto;display:flex;align-items:center;gap:8px;background:#26375A;border-radius:10px;padding:8px 12px;color:#93A3C3;width:210px;white-space:nowrap}
.ask{white-space:nowrap;display:flex;align-items:center;gap:6px;background:#FFD98A;color:#1C2B4A;font-weight:800;border-radius:10px;padding:8px 13px}
.me{width:34px;height:34px;border-radius:50%;background:#7A5AF8;display:grid;place-items:center;font-weight:800;font-size:12px;color:#fff}
.wrap{display:grid;grid-template-columns:946px 1fr;gap:14px;padding:12px 14px;height:844px}
.left{display:flex;flex-direction:column;gap:12px;min-width:0}
.hd{display:flex;align-items:center;gap:10px}.hd h1{margin:0;font-size:22px;font-weight:900;letter-spacing:-.01em}
.chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E5DFD5;border-radius:999px;padding:4px 10px;font-weight:700;font-size:12px;color:#4A5568}
.chip.d{background:#1C2B4A;color:#fff;border-color:#1C2B4A}
.board{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.col{background:#EAE5DC;border-radius:16px;padding:9px;display:flex;flex-direction:column;gap:8px;height:466px}
.ch{display:flex;align-items:center;gap:7px;font-weight:800;font-size:12.5px;padding:2px 4px}.ch i{width:9px;height:9px;border-radius:50%}.ch em{margin-left:auto;font-style:normal;background:#fff;border-radius:8px;padding:0 7px;font-size:11.5px}
.pc{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(28,43,74,.08);display:flex;flex-direction:column;border:2px solid transparent}
.pc.sel{border-color:#FF7A59;box-shadow:0 8px 22px rgba(255,122,89,.22)}
.ph{height:78px;position:relative}.ph img{width:100%;height:100%;object-fit:cover;display:block}
.wt{position:absolute;right:7px;bottom:7px;background:rgba(28,43,74,.86);color:#fff;font:600 10.5px 'JetBrains Mono',monospace;padding:2px 7px;border-radius:7px}
.pb{padding:8px 10px 9px;display:flex;flex-direction:column;gap:4px}
.pn{display:flex;justify-content:space-between;align-items:baseline}.pn b{font-size:15.5px;font-weight:900}.tm{font:600 11px 'JetBrains Mono',monospace;color:#8A94A6}
.br{font-size:11.5px;color:#5B6478}
.al{display:flex;flex-wrap:wrap;gap:4px}.al span{display:inline-flex;align-items:center;gap:3px;border-radius:6px;padding:1px 6px;font-size:10.5px;font-weight:800}
.ow{display:flex;justify-content:space-between;font-size:11.5px;color:#3B4A63;font-weight:700}.dr{color:#7A5AF8}
.st{display:flex;align-items:center;gap:4px;font-size:11px;color:#8A94A6;font-weight:700}
.bottom{display:grid;grid-template-columns:1fr 268px;gap:12px;flex:1;min-height:0}
.box{background:#fff;border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:9px;min-height:0}
.bh{display:flex;align-items:center;gap:8px;font-weight:900;font-size:14.5px}.bh span{margin-left:auto;font-weight:700;font-size:11.5px;color:#8A94A6}
.kg{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}
.kn{border:1.5px solid #ECE7DE;border-radius:11px;padding:6px 8px;display:flex;flex-direction:column;gap:2px;min-height:82px}
.kn.empty{border-style:dashed;background:#FAF8F4}
.kh{display:flex;justify-content:space-between;align-items:center}.kh b{font:600 10.5px 'JetBrains Mono',monospace;color:#8A94A6}.kh i{width:8px;height:8px;border-radius:50%}
.kname{font-weight:900;font-size:13.5px}.kd{font-size:10.5px;color:#5B6478}
.kf,.km{display:flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;color:#3B4A63}.km{color:#B4540A}
.rem{display:flex;flex-direction:column;gap:7px}
.rr{display:flex;gap:8px;align-items:flex-start;font-size:12px}.rr i{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;flex:none;font-style:normal}
.rr b{display:block;font-size:12.5px}.rr small{color:#8A94A6;font-weight:700}
.right{background:#fff;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 2px 6px rgba(28,43,74,.06)}
.rh{display:flex;gap:12px;padding:14px;align-items:center;background:linear-gradient(180deg,#FFF5EE,#fff)}
.rh img{width:74px;height:74px;border-radius:20px;object-fit:cover}
.rh h2{margin:0;font-size:24px;font-weight:900}.rh .s{font-size:12px;color:#5B6478}
.tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:5px}.tags span{font-size:10.5px;font-weight:800;border-radius:6px;padding:1px 7px}
.rt{display:flex;gap:4px;padding:0 14px;border-bottom:1px solid #F0ECE5}.rt span{padding:7px 10px;font-weight:800;font-size:12px;color:#8A94A6;border-bottom:2px solid transparent}.rt span.on{color:#1C2B4A;border-color:#FF7A59}
.rb{padding:10px 14px;display:flex;flex-direction:column;gap:10px;flex:1;min-height:0}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sec{font:600 10px 'JetBrains Mono',monospace;letter-spacing:.1em;color:#8A94A6;text-transform:uppercase;margin-bottom:4px}
.vx{display:flex;justify-content:space-between;font-size:12px;padding:3px 0;border-bottom:1px dashed #F0ECE5}.vx b{font-weight:800}
.soap{background:#FAF8F4;border-radius:12px;padding:9px 11px;font-size:12px;display:flex;flex-direction:column;gap:4px}
.soap p{margin:0}.soap b{display:inline-block;width:18px;color:#FF7A59;font-weight:900}
.est{border:1.5px solid #ECE7DE;border-radius:12px;padding:9px 11px;display:flex;flex-direction:column;gap:3px}
.el{display:flex;justify-content:space-between;font-size:12px}.el span:last-child{font-family:'JetBrains Mono',monospace;font-weight:600}
.tot{border-top:1px solid #ECE7DE;margin-top:3px;padding-top:5px;font-weight:900;font-size:14px}
.ok{display:flex;align-items:center;gap:6px;background:#E3F7EC;color:#167A4C;border-radius:8px;padding:5px 8px;font-size:11.5px;font-weight:800}
.inv{display:flex;justify-content:space-between;align-items:center;background:#F1F4FA;border-radius:9px;padding:6px 9px;font-size:11.5px}
.act{display:flex;gap:8px;padding:10px 14px;border-top:1px solid #F0ECE5}
.b1{flex:1;text-align:center;border-radius:11px;padding:10px;font-weight:900}.b1.p{background:#1C2B4A;color:#fff}.b1.s{background:#F4F1EC;color:#1C2B4A}
</style></head><body>
<div class="top"><div class="lg"><i>${ic(I.paw, 20)}</i><div><b>Paws &amp; Claws Animal Hospital</b><span>VET &amp; PET OS · DENVER</span></div></div>
<div class="tabs"><span class="on">Whiteboard</span><span>Appointments</span><span>Patients</span><span>Boarding <em>9</em></span><span>Grooming</span><span>Inventory</span><span>Reminders</span></div>
<div class="sr">${ic(I.search, 15)}Pet, owner or microchip</div><span class="ask">${ic(I.spark, 14)}Ask Vet &amp; Pet OS</span><span class="me">AP</span></div>
<div class="wrap">
<div class="left">
<div class="hd"><h1>Today's patients</h1><span class="chip">Tue 6 Oct · 10:02</span><span class="chip d">All doctors</span><span class="chip">Dr. Patel · 11</span><span class="chip">Dr. Kim · 9</span><span class="chip">${ic(I.scissors, 12)}Grooming · 6</span><span class="chip" style="margin-left:auto;color:#B42318">${ic(I.alert, 12)}2 alerts need a plan</span></div>
<div class="board">${board}</div>
<div class="bottom">
<div class="box"><div class="bh">${ic(I.bowl, 16)}Boarding &amp; daycare<span>8 of 10 runs · feeding round 12:00 · meds 1 due at 19:00</span></div><div class="kg">${kennels}</div></div>
<div class="box"><div class="bh">${ic(I.msg, 16)}Reminders today<span>auto</span></div><div class="rem">
<div class="rr"><i style="background:#FFF3D6;color:#8A5A00">${ic(I.syringe, 14)}</i><div><b>Vaccines due · 38 pets</b><small>SMS sent 8:00 · 14 booked</small></div></div>
<div class="rr"><i style="background:#E8EEFF;color:#4F7CFF">${ic(I.clock, 14)}</i><div><b>Appointment confirms · 22</b><small>19 confirmed · 3 no reply</small></div></div>
<div class="rr"><i style="background:#E3F7EC;color:#167A4C">${ic(I.pill, 14)}</i><div><b>Refills · Apoquel, Rimadyl</b><small>6 approved by Dr. Patel</small></div></div>
</div></div>
</div></div>
<div class="right">
<div class="rh"><img src="img/vet/golden.jpg" alt=""><div><h2>Biscuit</h2><div class="s">Golden Retriever · M/N · 7y · microchip 985 112 004 381 776</div><div class="s">Owner <b>Hannah Ortiz</b> · (720) 555-0182 · prefers text</div>
<div class="tags"><span style="background:#E3F7EC;color:#167A4C">Wellness plan · Gold</span><span style="background:#FFE4E1;color:#B42318">Allergy · cefalexin</span><span style="background:#EEF2F7;color:#3B4A63">Room 2 · Dr. Patel</span></div></div></div>
<div class="rt"><span class="on">Visit · lameness</span><span>History · 23</span><span>Labs</span><span>Imaging</span><span>Files</span></div>
<div class="rb">
<div class="two"><div><div class="sec">Vaccines</div>${vax.map(([n, d, k]) => `<div class="vx"><b>${n}</b><span style="color:${vt[k]};font-weight:800">${d}</span></div>`).join("")}</div>
<div><div class="sec">Weight · 12 months</div><svg width="240" height="72" viewBox="0 0 240 72"><polyline points="${wPts}" fill="none" stroke="#FF7A59" stroke-width="2.5" stroke-linecap="round"/>${wts.map((w, i) => `<circle cx="${10 + i * 44}" cy="${62 - (w - 31.5) * 18}" r="${i === 5 ? 4 : 2.5}" fill="#FF7A59"/>`).join("")}</svg><div style="font-size:11.5px;color:#B4540A;font-weight:800">+2.4 kg · BCS 6/9 · diet plan suggested</div></div></div>
<div class="soap"><div class="sec" style="margin:0">SOAP · draft</div>
<p><b>S</b>Limping on right hind for 3 days after a hike. Eating normally.</p>
<p><b>O</b>T 101.8°F · HR 96 · lameness 2/5 R hind · cranial drawer negative · mild stifle effusion.</p>
<p><b>A</b>Soft-tissue strain, R stifle. Rule out early CCL tear.</p>
<p><b>P</b>Radiographs today, carprofen 14 days, leash rest, recheck in 10 days.</p></div>
<div class="est"><div class="sec" style="margin:0">Estimate · approved</div>
<div class="el"><span>Exam · lameness</span><span>$72.00</span></div><div class="el"><span>Radiographs · stifle, 2 views</span><span>$245.00</span></div><div class="el"><span>Carprofen 75 mg × 14 tabs</span><span>$38.50</span></div>
<div class="el tot"><span>Total</span><span>$355.50</span></div>
<div class="ok">${ic(I.check, 13)}Hannah approved by text at 9:44 · card on file</div></div>
<div class="inv"><span>${ic(I.pill, 12)} Carprofen 75 mg · lot CP2418 · exp 03/2028</span><span class="mono" style="font-weight:600">186 → 172 tabs</span></div>
<div class="est" style="gap:5px"><div class="sec" style="margin:0">Hospital · treatment sheet</div>
<div class="el"><span><b>Nori</b> · IV LRS 10 mL/h · vitals q4h</span><span style="color:#B4540A">10:30</span></div>
<div class="el"><span><b>Waffles</b> · post-dental · buprenorphine</span><span style="color:#B4540A">11:00</span></div>
<div class="el"><span><b>Pepper</b> · discharge call with owner</span><span>11:00</span></div></div>
</div>
<div class="act"><span class="b1 s">Send home instructions</span><span class="b1 p">Move to imaging</span></div>
</div></div></body></html>`;
})();
