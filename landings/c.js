window.LANDINGS = window.LANDINGS || {};

/* ---------- GYM: Studio OS — cobalt colour field, poster type, tilted phone ---------- */
window.LANDINGS.gym = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#1F35E8;color:#fff;font-family:Manrope,Arial,sans-serif;position:relative}
.grain{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 1px,transparent 1px 120px)}
nav{position:relative;display:flex;align-items:center;padding:30px 64px;gap:40px}
.logo{font-family:Anton,sans-serif;font-size:28px;letter-spacing:.02em}
.logo b{color:#D7FF3A;font-weight:400}
nav ul{display:flex;gap:32px;list-style:none;font-size:15px;font-weight:600;color:rgba(255,255,255,.78)}
nav .cta{margin-left:auto;display:flex;gap:12px;align-items:center}
.ghost{font-weight:700;font-size:15px}
.pill{background:#fff;color:#1F35E8;padding:12px 22px;border-radius:999px;font-weight:800;font-size:15px}
.hero{position:relative;padding:28px 64px 0;display:grid;grid-template-columns:780px 1fr}
.tag{display:inline-flex;gap:10px;align-items:center;border:1.5px solid rgba(255,255,255,.4);border-radius:999px;padding:7px 16px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.tag i{width:8px;height:8px;border-radius:50%;background:#D7FF3A;display:block}
h1{font-family:Anton,sans-serif;font-weight:400;font-size:104px;line-height:.92;text-transform:uppercase;margin-top:26px;letter-spacing:-.005em}
h1 span{color:#D7FF3A}
.sub{font-size:20px;line-height:1.5;color:rgba(255,255,255,.86);max-width:560px;margin-top:28px}
.ctas{display:flex;gap:14px;margin-top:34px;align-items:center}
.big{background:#D7FF3A;color:#0B1460;padding:18px 30px;border-radius:999px;font-weight:800;font-size:17px}
.out{border:2px solid #fff;padding:16px 28px;border-radius:999px;font-weight:800;font-size:17px}
.proof{display:flex;gap:28px;margin-top:40px;font-size:14px;color:rgba(255,255,255,.75);font-weight:600}
.proof b{display:block;font-family:Anton,sans-serif;font-weight:400;font-size:34px;color:#fff;letter-spacing:.01em}
.stage{position:relative;height:760px}
.phone{position:absolute;left:150px;top:10px;width:320px;height:650px;background:#0A0F2E;border-radius:46px;padding:12px;transform:rotate(6deg);box-shadow:0 40px 80px rgba(5,10,60,.5)}
.scr{width:100%;height:100%;background:#F4F5F9;border-radius:36px;overflow:hidden;color:#0B1022;padding:46px 18px 18px;display:flex;flex-direction:column;gap:12px}
.hi{font-size:13px;color:#6B7180;font-weight:600}.nm{font-size:22px;font-weight:800;margin-top:-6px}
.pass{background:#0B1022;color:#fff;border-radius:22px;padding:18px;display:flex;flex-direction:column;gap:10px}
.pass small{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#D7FF3A;font-weight:800}
.qr{width:120px;height:120px;align-self:center;background:#fff;border-radius:10px;padding:8px;display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.qr i{background:#0B1022;border-radius:2px}.qr i.o{background:transparent}
.pass p{font-size:13px;text-align:center;color:rgba(255,255,255,.7)}
.cls{background:#fff;border-radius:16px;padding:12px 14px;display:flex;align-items:center;gap:12px;border:1px solid #E6E8EF}
.cls .t{font-family:Anton,sans-serif;font-size:22px;color:#1F35E8;width:52px}
.cls b{display:block;font-size:14px}.cls span{font-size:12px;color:#6B7180}
.cls em{margin-left:auto;font-style:normal;font-size:11px;font-weight:800;background:#E8EBFF;color:#1F35E8;padding:4px 9px;border-radius:999px}
.float{position:absolute;background:#fff;color:#0B1022;border-radius:20px;padding:16px 18px;box-shadow:0 24px 50px rgba(5,10,60,.35)}
.f1{left:-30px;top:120px;width:230px;transform:rotate(-4deg)}
.f1 small{font-size:12px;color:#6B7180;font-weight:700}.f1 b{display:block;font-family:Anton,sans-serif;font-weight:400;font-size:44px;line-height:1.05;color:#1F35E8}
.bars{display:flex;gap:5px;align-items:flex-end;height:44px;margin-top:8px}.bars i{flex:1;background:#1F35E8;border-radius:3px}.bars i:last-child{background:#D7FF3A}
.f2{left:330px;top:540px;width:240px;transform:rotate(3deg)}
.f2 .row{display:flex;gap:10px;align-items:center}
.av{width:36px;height:36px;border-radius:50%;background:#FFB27A;display:grid;place-items:center;font-weight:800;font-size:13px}
.f2 b{font-size:14px;display:block}.f2 span{font-size:12px;color:#6B7180}
.f2 .ok{margin-top:10px;font-size:12px;font-weight:800;color:#127A3E;background:#DDF5E6;border-radius:8px;padding:6px 10px}
.f3{left:30px;top:560px;width:250px;background:#D7FF3A}
.f3 small{font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.f3 b{display:block;font-family:Anton,sans-serif;font-weight:400;font-size:40px;margin-top:4px}
.f3 span{font-size:13px;font-weight:700}
</style></head><body><div class="grain"></div>
<nav><div class="logo">STUDIO<b>OS</b></div><ul><li>Classes</li><li>Memberships</li><li>Member app</li><li>Pricing</li></ul><div class="cta"><span class="ghost">Log in</span><span class="pill">Book a demo</span></div></nav>
<section class="hero"><div>
<span class="tag"><i></i>Built for gyms, boxes and studios</span>
<h1>Run the floor.<br><span>Not the</span><br>spreadsheet.</h1>
<p class="sub">Memberships that renew themselves, a class schedule members book from their phone, and door check-in in one tap. Your gym, your rules, your brand.</p>
<div class="ctas"><span class="big">Start free for 30 days</span><span class="out">See the member app</span></div>
<div class="proof"><div><b>1,900+</b>gyms and studios</div><div><b>4.9</b>average app rating</div><div><b>-31%</b>member churn in year one</div></div>
</div>
<div class="stage">
<div class="phone"><div class="scr"><p class="hi">Good morning</p><p class="nm">Ava Johnson</p>
<div class="pass"><small>Forge Strength Club · Gold</small><div class="qr">
<i></i><i></i><i></i><i class="o"></i><i></i><i></i><i></i>
<i></i><i class="o"></i><i></i><i></i><i class="o"></i><i class="o"></i><i></i>
<i></i><i></i><i></i><i class="o"></i><i></i><i></i><i></i>
<i class="o"></i><i></i><i class="o"></i><i></i><i class="o"></i><i></i><i class="o"></i>
<i></i><i></i><i></i><i class="o"></i><i></i><i class="o"></i><i></i>
<i></i><i class="o"></i><i></i><i></i><i class="o"></i><i></i><i></i>
<i></i><i></i><i></i><i class="o"></i><i></i><i></i><i></i></div><p>Tap to check in at the door</p></div>
<div class="cls"><span class="t">6:00</span><div><b>Strength 101</b><span>Coach Marcus · 18/20</span></div><em>Booked</em></div>
<div class="cls"><span class="t">18:30</span><div><b>Bootcamp</b><span>Coach Kayla · 22/24</span></div><em>Join</em></div>
</div></div>
<div class="float f1"><small>Check-ins today</small><b>214</b><div class="bars"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:80%"></i><i style="height:70%"></i><i style="height:100%"></i></div></div>
<div class="float f2"><div class="row"><span class="av">LP</span><div><b>Leo Park renewed</b><span>Gold · $129/mo · autopay</span></div></div><div class="ok">Failed card recovered</div></div>
<div class="float f3"><small>Monthly recurring</small><b>$58,420</b><span>+4.1% this month</span></div>
</div></section></body></html>`;

/* ---------- SCHOOL: Campus OS — mint paper, Fraunces, centered hero, product below ---------- */
window.LANDINGS.school = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#EAF3EE;color:#12352A;font-family:"Plus Jakarta Sans",Arial,sans-serif;position:relative}
.dots{position:absolute;inset:0;background-image:radial-gradient(#C9DED2 1.2px,transparent 1.2px);background-size:26px 26px;opacity:.7}
nav{position:relative;display:flex;align-items:center;padding:26px 72px;gap:44px}
.logo{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-weight:700;font-size:26px}
.logo i{width:30px;height:30px;border-radius:9px 9px 9px 2px;background:#12352A;position:relative;display:block}
.logo i::after{content:"";position:absolute;inset:8px;border-radius:50%;background:#F5C33B}
nav ul{display:flex;gap:30px;list-style:none;font-size:15px;font-weight:600;color:#3D5E52}
.right{margin-left:auto;display:flex;align-items:center;gap:18px;font-weight:700;font-size:15px}
.btn{background:#12352A;color:#fff;padding:12px 22px;border-radius:12px}
.hero{position:relative;text-align:center;padding:34px 0 0}
.badge{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1px solid #CFE2D7;border-radius:999px;padding:6px 14px 6px 6px;font-size:13px;font-weight:700}
.badge span{background:#F5C33B;border-radius:999px;padding:3px 10px;font-size:12px}
h1{font-family:Fraunces,serif;font-weight:600;font-size:76px;line-height:1.02;letter-spacing:-.02em;margin:22px auto 0;width:980px}
h1 em{font-style:italic;color:#1E7A57}
.sub{font-size:19px;color:#3D5E52;width:700px;margin:20px auto 0;line-height:1.55}
.ctas{display:flex;gap:12px;justify-content:center;margin-top:28px}
.c1{background:#F5C33B;color:#12352A;padding:15px 26px;border-radius:14px;font-weight:800;font-size:16px;box-shadow:0 3px 0 #C99A06}
.c2{background:#fff;border:1.5px solid #12352A;padding:14px 24px;border-radius:14px;font-weight:800;font-size:16px}
.trust{margin-top:22px;font-size:14px;color:#5B7A6E;font-weight:600}
.app{position:absolute;left:220px;top:552px;width:1000px;height:420px;background:#fff;border-radius:20px;border:1px solid #CFE2D7;box-shadow:0 30px 70px rgba(18,53,42,.16);display:grid;grid-template-columns:200px 1fr;overflow:hidden}
.side{background:#F5FAF7;border-right:1px solid #E1EDE6;padding:18px 14px;display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:#5B7A6E}
.side .on{background:#12352A;color:#fff;border-radius:9px;padding:8px 10px}.side p{padding:8px 10px}
.main{padding:18px 22px}
.mh{display:flex;justify-content:space-between;align-items:center}
.mh b{font-family:Fraunces,serif;font-size:21px}.mh span{font-size:12px;color:#5B7A6E;font-weight:600}
.grid{display:grid;grid-template-columns:150px repeat(10,1fr);gap:5px;margin-top:14px;font-size:12px;align-items:center}
.grid .n{font-weight:700;color:#12352A}.grid .h{color:#8AA399;font-weight:700;text-align:center;font-size:11px}
.c{height:22px;border-radius:6px;background:#DDF0E5}.c.a{background:#FAD4CF}.c.l{background:#FCEBB8}
.fee{position:absolute;right:50px;top:610px;width:270px;background:#12352A;color:#fff;border-radius:18px;padding:18px;box-shadow:0 24px 50px rgba(18,53,42,.3);transform:rotate(2deg)}
.fee small{font-size:12px;color:#A9CDBE;font-weight:700}.fee b{display:block;font-family:Fraunces,serif;font-size:40px;margin-top:2px}
.fee .bar{height:8px;background:#2B5546;border-radius:9px;margin-top:10px;overflow:hidden}.fee .bar i{display:block;width:82%;height:100%;background:#F5C33B}
.fee p{font-size:12px;margin-top:8px;color:#A9CDBE}
.parent{position:absolute;left:36px;top:660px;width:270px;background:#fff;border-radius:18px;padding:14px 16px;border:1px solid #CFE2D7;box-shadow:0 24px 50px rgba(18,53,42,.18);transform:rotate(-3deg)}
.parent .top{display:flex;gap:8px;align-items:center;font-size:11px;font-weight:800;color:#5B7A6E;text-transform:uppercase;letter-spacing:.06em}
.parent .top i{width:20px;height:20px;border-radius:6px;background:#1E7A57;display:block}
.parent b{display:block;font-size:14px;margin-top:8px}.parent p{font-size:13px;color:#3D5E52;margin-top:3px;line-height:1.4}
</style></head><body><div class="dots"></div>
<nav><div class="logo"><i></i>Campus OS</div><ul><li>Admissions</li><li>Attendance</li><li>Fees</li><li>Parent app</li></ul><div class="right"><span>Sign in</span><span class="btn">Book a walkthrough</span></div></nav>
<section class="hero">
<span class="badge"><span>New</span>WhatsApp fee reminders for parents</span>
<h1>Every class, every fee, every parent, <em>finally in one place.</em></h1>
<p class="sub">Admissions, batches, attendance, exams and fee collection for schools and coaching centres. Parents see it all in their own app.</p>
<div class="ctas"><span class="c1">Start your free term</span><span class="c2">Watch a 3-minute tour</span></div>
<p class="trust">Trusted by 640 schools and tuition centres across India, UAE and the UK</p>
</section>
<div class="app"><div class="side"><p class="on">Attendance</p><p>Admissions</p><p>Batches</p><p>Fees</p><p>Exams</p><p>Parents</p></div>
<div class="main"><div class="mh"><b>Class 10-B · Mathematics</b><span>Week of 28 Sep · 32 students · 94% present</span></div>
<div class="grid"><span></span><span class="h">M</span><span class="h">T</span><span class="h">W</span><span class="h">T</span><span class="h">F</span><span class="h">M</span><span class="h">T</span><span class="h">W</span><span class="h">T</span><span class="h">F</span>
<span class="n">Aarav Sharma</span><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i>
<span class="n">Diya Patel</span><i class="c"></i><i class="c"></i><i class="c l"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i>
<span class="n">Kabir Singh</span><i class="c"></i><i class="c a"></i><i class="c"></i><i class="c"></i><i class="c l"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c l"></i><i class="c"></i>
<span class="n">Ananya Iyer</span><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i>
<span class="n">Rohan Gupta</span><i class="c"></i><i class="c"></i><i class="c a"></i><i class="c a"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c a"></i><i class="c"></i><i class="c"></i>
</div></div></div>
<div class="parent"><div class="top"><i></i>Parent app · now</div><b>Kabir arrived at 8:52</b><p>Maths test on Friday. Term 2 fee of ₹18,500 is due 10 Oct.</p></div>
<div class="fee"><small>Term 2 fees collected</small><b>₹38.2L</b><div class="bar"><i></i></div><p>82% of ₹46.5L · 61 reminders sent</p></div>
</body></html>`;

/* ---------- LMS: Course OS — editorial serif, white + tomato, course player split ---------- */
window.LANDINGS.lms = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#FBFAF8;color:#16130F;font-family:Geist,Arial,sans-serif;position:relative}
nav{display:flex;align-items:center;padding:28px 72px;border-bottom:1px solid #E9E5DE;gap:44px}
.logo{font-family:"Instrument Serif",serif;font-size:30px;letter-spacing:-.01em}
.logo em{color:#E2462C}
nav ul{display:flex;gap:30px;list-style:none;font-size:15px;color:#5D564C;font-weight:500}
.r{margin-left:auto;display:flex;gap:18px;align-items:center;font-size:15px;font-weight:600}
.btn{background:#16130F;color:#FBFAF8;padding:11px 20px;border-radius:8px}
.wrap{display:grid;grid-template-columns:600px 1fr;gap:56px;padding:64px 72px 0}
.kick{font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#E2462C}
h1{font-family:"Instrument Serif",serif;font-weight:400;font-size:98px;line-height:.95;letter-spacing:-.025em;margin-top:22px}
h1 em{font-style:italic;color:#E2462C}
.sub{font-size:19px;line-height:1.55;color:#4A443B;margin-top:26px;max-width:500px}
.ctas{display:flex;gap:12px;margin-top:32px}
.c1{background:#E2462C;color:#fff;padding:15px 24px;border-radius:9px;font-weight:600;font-size:16px}
.c2{border:1px solid #CFC8BC;padding:14px 22px;border-radius:9px;font-weight:600;font-size:16px}
.quote{margin-top:44px;padding-top:22px;border-top:1px solid #E9E5DE;display:flex;gap:16px;align-items:center}
.quote .a{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#F3B79F,#E2462C)}
.quote p{font-family:"Instrument Serif",serif;font-size:21px;line-height:1.3}
.quote small{display:block;font-size:13px;color:#7A7266;margin-top:4px;font-family:Geist,sans-serif}
.player{position:relative;background:#fff;border:1px solid #E9E5DE;border-radius:16px;box-shadow:0 30px 60px rgba(40,30,20,.10);overflow:hidden;display:grid;grid-template-columns:1fr 250px;height:520px}
.vid{background:#1C1915;position:relative;display:flex;flex-direction:column}
.screen{flex:1;position:relative;background:radial-gradient(circle at 30% 40%,#3A2E25,#1C1915 70%)}
.board{position:absolute;left:40px;top:40px;right:40px;bottom:80px;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:26px}
.board h3{font-family:"Instrument Serif",serif;font-weight:400;color:#F6EFE6;font-size:36px}
.board p{color:#BDB2A3;font-size:14px;margin-top:6px}
.frames{display:flex;gap:12px;margin-top:26px}
.frames i{width:96px;height:130px;border-radius:10px;border:1.5px solid rgba(255,255,255,.25);display:block}
.frames i:nth-child(2){border-color:#E2462C;background:rgba(226,70,44,.12)}
.play{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;background:#E2462C;display:grid;place-items:center;box-shadow:0 0 0 12px rgba(226,70,44,.18)}
.play::after{content:"";border-left:22px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;margin-left:6px}
.ctrl{padding:14px 20px;display:flex;align-items:center;gap:14px;color:#BDB2A3;font-size:12px}
.prog{flex:1;height:4px;background:#3A342C;border-radius:4px}.prog i{display:block;width:38%;height:100%;background:#E2462C;border-radius:4px}
.ch{padding:18px 16px;display:flex;flex-direction:column;gap:4px;font-size:13px}
.ch h4{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#7A7266;font-weight:600;margin-bottom:8px}
.ch div{display:flex;gap:10px;align-items:center;padding:9px 8px;border-radius:8px}
.ch div.on{background:#FCEDE8}
.ch span{width:20px;height:20px;border-radius:50%;border:1.5px solid #CFC8BC;flex:none;display:grid;place-items:center;font-size:10px}
.ch span.d{background:#16130F;border-color:#16130F;color:#fff}
.ch span.p{border-color:#E2462C;background:#E2462C}
.ch small{margin-left:auto;color:#9A9184}
.f{position:absolute;background:#fff;border:1px solid #E9E5DE;border-radius:14px;padding:14px 16px;box-shadow:0 18px 40px rgba(40,30,20,.12)}
.f1{right:40px;top:600px;width:240px}
.f1 small{font-size:12px;color:#7A7266}.f1 b{display:block;font-family:"Instrument Serif",serif;font-weight:400;font-size:40px}
.f1 .sp{display:flex;align-items:flex-end;gap:4px;height:34px}.f1 .sp i{flex:1;background:#F3D3C9;border-radius:2px}.f1 .sp i:last-child{background:#E2462C}
.f2{left:700px;top:640px;width:290px;display:flex;gap:12px;align-items:center}
.cert{width:46px;height:56px;border:1.5px solid #16130F;border-radius:4px;position:relative;flex:none}
.cert::after{content:"";position:absolute;left:12px;bottom:-8px;width:20px;height:20px;border-radius:50%;background:#E2462C}
.f2 b{font-size:14px;display:block}.f2 span{font-size:12px;color:#7A7266}
</style></head><body>
<nav><div class="logo">Course<em>OS</em></div><ul><li>Courses</li><li>Cohorts</li><li>Community</li><li>Payments</li></ul><div class="r"><span>Log in</span><span class="btn">Start teaching</span></div></nav>
<div class="wrap"><div>
<p class="kick">For creators and training teams</p>
<h1>Teach once.<br>Get paid <em>every</em><br>single month.</h1>
<p class="sub">Courses, live cohorts, quizzes, certificates and a community, on your own domain. Checkout, subscriptions and payouts are built in.</p>
<div class="ctas"><span class="c1">Launch your school free</span><span class="c2">Browse examples</span></div>
<div class="quote"><div class="a"></div><p>"We moved 8,400 students off three tools in a weekend."<small>Leah Brooks, Craft Academy</small></p></div>
</div>
<div class="player"><div class="vid"><div class="screen"><div class="board"><h3>Grids that breathe</h3><p>Module 4 · Layout systems</p><div class="frames"><i></i><i></i><i></i></div></div><div class="play"></div></div>
<div class="ctrl"><span>12:48</span><div class="prog"><i></i></div><span>33:20</span></div></div>
<div class="ch"><h4>Product Design Foundations</h4>
<div><span class="d">1</span>Seeing like a designer<small>18m</small></div>
<div><span class="d">2</span>Type that works<small>24m</small></div>
<div><span class="d">3</span>Colour with intent<small>21m</small></div>
<div class="on"><span class="p"></span>Grids that breathe<small>33m</small></div>
<div><span>5</span>Components<small>29m</small></div>
<div><span>6</span>Capstone review<small>Live</small></div></div></div>
</div>
<div class="f f1"><small>Revenue this month</small><b>$41,620</b><div class="sp"><i style="height:40%"></i><i style="height:52%"></i><i style="height:47%"></i><i style="height:66%"></i><i style="height:72%"></i><i style="height:100%"></i></div></div>
<div class="f f2"><div class="cert"></div><div><b>Hana Sato earned a certificate</b><span>Product Design Foundations · 2m ago</span></div></div>
</body></html>`;

/* ---------- ACCOUNTING: Practice OS — cool slate, bento grid, mono details ---------- */
window.LANDINGS.accounting = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#F2F4F3;color:#0E2423;font-family:"IBM Plex Sans",Arial,sans-serif}
nav{display:flex;align-items:center;padding:24px 64px;gap:42px}
.logo{font-family:"Familjen Grotesk",sans-serif;font-weight:700;font-size:24px;display:flex;align-items:center;gap:10px}
.logo i{width:26px;height:26px;border:2.5px solid #0E2423;border-radius:6px;position:relative;display:block}
.logo i::after{content:"";position:absolute;left:4px;right:4px;top:9px;height:2.5px;background:#0F8C83;box-shadow:0 5px 0 #0F8C83}
nav ul{display:flex;gap:28px;list-style:none;font-size:15px;color:#4B605E}
.r{margin-left:auto;display:flex;gap:16px;align-items:center;font-size:15px;font-weight:600}
.btn{background:#0E2423;color:#fff;padding:11px 18px;border-radius:8px}
.top{display:grid;grid-template-columns:1fr 470px;gap:40px;padding:34px 64px 0;align-items:end}
.mono{font-family:"IBM Plex Mono",monospace;font-size:13px;color:#0F8C83;letter-spacing:.04em}
h1{font-family:"Familjen Grotesk",sans-serif;font-weight:600;font-size:80px;line-height:.98;letter-spacing:-.03em;margin-top:14px}
h1 span{color:#0F8C83}
.side p{font-size:18px;line-height:1.55;color:#33504D}
.ctas{display:flex;gap:10px;margin-top:22px}
.c1{background:#0F8C83;color:#fff;padding:14px 22px;border-radius:9px;font-weight:600;font-size:15px}
.c2{background:#fff;border:1px solid #C8D3D1;padding:13px 20px;border-radius:9px;font-weight:600;font-size:15px}
.bento{display:grid;grid-template-columns:1.3fr 1fr 1fr;grid-template-rows:230px 200px;gap:16px;padding:40px 64px 0}
.b{background:#fff;border:1px solid #DCE3E1;border-radius:16px;padding:20px;position:relative;overflow:hidden}
.b h4{font-family:"Familjen Grotesk",sans-serif;font-size:17px;font-weight:600;display:flex;justify-content:space-between}
.b h4 span{font-family:"IBM Plex Mono",monospace;font-size:12px;color:#7D918E;font-weight:400}
.wide{grid-row:span 2;display:flex;flex-direction:column}
.k{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px;flex:1}
.k div{background:#F5F8F7;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}
.k small{font-family:"IBM Plex Mono",monospace;font-size:11px;color:#7D918E;text-transform:uppercase}
.card{background:#fff;border:1px solid #DCE3E1;border-left:3px solid #0F8C83;border-radius:8px;padding:9px 10px;font-size:12.5px}
.card b{display:block;font-size:13px}.card span{color:#7D918E;font-family:"IBM Plex Mono",monospace;font-size:11px}
.card.w{border-left-color:#E0A21B}.card.d{border-left-color:#9AA9A6;opacity:.75}
.dl .row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px dashed #DCE3E1;font-size:13.5px}
.dl .row:last-child{border:0}
.tg{font-family:"IBM Plex Mono",monospace;font-size:11px;padding:3px 8px;border-radius:5px;background:#E2F3F1;color:#0F6E67}
.tg.o{background:#FBE5E0;color:#B23B22}.tg.w{background:#FBF0D5;color:#8C5F05}
.dark{background:#0E2423;color:#fff;border:0}
.dark .big{font-family:"Familjen Grotesk",sans-serif;font-size:58px;font-weight:600;letter-spacing:-.03em;margin-top:10px}
.dark p{color:#9BB7B3;font-size:13px}
.dark svg{position:absolute;left:0;right:0;bottom:0}
.docs{display:flex;flex-direction:column;gap:9px;margin-top:14px}
.doc{display:flex;gap:10px;align-items:center;font-size:13px}
.doc i{width:26px;height:32px;border:1.5px solid #9DB0AD;border-radius:3px;display:block;position:relative;flex:none}
.doc i::after{content:"";position:absolute;left:5px;right:5px;top:8px;height:2px;background:#9DB0AD;box-shadow:0 5px 0 #9DB0AD,0 10px 0 #9DB0AD}
.doc.ok i{border-color:#0F8C83}.doc em{margin-left:auto;font-style:normal;font-family:"IBM Plex Mono",monospace;font-size:11px;color:#7D918E}
.time{display:flex;align-items:flex-end;gap:8px;height:90px;margin-top:16px}
.time i{flex:1;background:#CDE8E5;border-radius:4px 4px 0 0}.time i.t{background:#0F8C83}
.lbl{display:flex;justify-content:space-between;font-family:"IBM Plex Mono",monospace;font-size:11px;color:#7D918E;margin-top:6px}
</style></head><body>
<nav><div class="logo"><i></i>Practice OS</div><ul><li>Workflow</li><li>Client portal</li><li>Billing</li><li>Security</li></ul><div class="r"><span>Sign in</span><span class="btn">Get a demo</span></div></nav>
<div class="top"><div><p class="mono">// for bookkeeping, tax and advisory firms</p><h1>Close the books.<br><span>Not your evenings.</span></h1></div>
<div class="side"><p>Recurring work that schedules itself, a client portal that chases documents for you, and billing that follows the hours. SOC 2 Type II.</p><div class="ctas"><span class="c1">Try it with 5 clients</span><span class="c2">Import from Karbon</span></div></div></div>
<div class="bento">
<div class="b wide"><h4>October close <span>124 jobs · 18 due this week</span></h4>
<div class="k">
<div><small>Waiting on client</small><div class="card w"><b>Hollis Dental</b><span>Q3 statements</span></div><div class="card w"><b>Rivera Bakery</b><span>Payroll export</span></div></div>
<div><small>In progress</small><div class="card"><b>Maple Logistics</b><span>Bookkeeping · 6.5h</span></div><div class="card"><b>Chen Family</b><span>Extension</span></div><div class="card"><b>Northside Gym</b><span>Sales tax Q3</span></div></div>
<div><small>Review</small><div class="card"><b>Greenway LLC</b><span>Form 941 Q3</span></div></div>
<div><small>Filed</small><div class="card d"><b>Bloom Studio</b><span>Sales tax Sep</span></div><div class="card d"><b>Oak Dental</b><span>1120-S</span></div></div>
</div></div>
<div class="b dl"><h4>Deadlines <span>Oct</span></h4>
<div class="row">Chen Family · 1040 ext.<span class="tg w">Oct 15</span></div>
<div class="row">Hollis Dental · docs<span class="tg o">6d late</span></div>
<div class="row">Maple Logistics · 941<span class="tg">Oct 31</span></div>
<div class="row">Greenway LLC · 941<span class="tg">Filed</span></div></div>
<div class="b dark"><p>Billed in September</p><div class="big">$142,380</div><p>+9.4% vs August · 96% collected</p>
<svg width="100%" height="90" viewBox="0 0 400 90" preserveAspectRatio="none"><path d="M0 70 L50 62 L100 66 L150 48 L200 52 L250 34 L300 38 L350 20 L400 12 L400 90 L0 90Z" fill="#0F8C83" opacity=".35"/><path d="M0 70 L50 62 L100 66 L150 48 L200 52 L250 34 L300 38 L350 20 L400 12" fill="none" stroke="#36D1C4" stroke-width="2.5"/></svg></div>
<div class="b"><h4>Client portal <span>Hollis Dental</span></h4><div class="docs">
<div class="doc ok"><i></i>July bank statement<em>received</em></div>
<div class="doc ok"><i></i>August bank statement<em>received</em></div>
<div class="doc"><i></i>September bank statement<em>reminded 2x</em></div></div></div>
<div class="b"><h4>Time this week <span>Paula G.</span></h4><div class="time"><i style="height:60%"></i><i style="height:84%"></i><i style="height:70%"></i><i class="t" style="height:100%"></i><i style="height:42%"></i></div><div class="lbl"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div></div>
</div></body></html>`;

/* ---------- LEGAL: Counsel OS — oxblood band, Newsreader, overlapping documents ---------- */
window.LANDINGS.legal = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Outfit:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#2B0F12;color:#F4EDE4;font-family:Outfit,Arial,sans-serif;position:relative}
.band{position:absolute;right:0;top:0;width:620px;height:900px;background:#F3ECE2}
.rule{position:absolute;left:0;right:0;top:92px;height:1px;background:rgba(244,237,228,.14)}
nav{position:relative;display:flex;align-items:center;padding:30px 72px;gap:40px;height:92px}
.logo{font-family:Newsreader,serif;font-size:28px;font-weight:500;letter-spacing:.01em}
.logo span{font-style:italic;color:#E4A57A}
nav ul{display:flex;gap:30px;list-style:none;font-size:15px;color:rgba(244,237,228,.72)}
.r{margin-left:auto;display:flex;gap:18px;align-items:center;font-size:15px;font-weight:600;color:#2B0F12}
.r .btn{background:#2B0F12;color:#F4EDE4;padding:11px 20px;border-radius:2px}
.hero{position:relative;padding:86px 72px 0;width:780px}
.k{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#E4A57A;font-weight:600}
h1{font-family:Newsreader,serif;font-weight:400;font-size:92px;line-height:.98;letter-spacing:-.02em;margin-top:24px}
h1 em{color:#E4A57A}
.sub{font-size:19px;line-height:1.6;color:rgba(244,237,228,.78);margin-top:28px;max-width:560px}
.ctas{display:flex;gap:14px;margin-top:36px}
.c1{background:#E4A57A;color:#2B0F12;padding:16px 26px;border-radius:2px;font-weight:700;font-size:16px}
.c2{border:1px solid rgba(244,237,228,.4);padding:15px 24px;border-radius:2px;font-weight:600;font-size:16px}
.bar{display:flex;gap:44px;margin-top:56px;padding-top:24px;border-top:1px solid rgba(244,237,228,.14);font-size:13px;color:rgba(244,237,228,.6)}
.bar b{display:block;font-family:Newsreader,serif;font-weight:400;font-size:34px;color:#F4EDE4}
.doc{position:absolute;background:#fff;color:#1F1A17;box-shadow:0 30px 60px rgba(43,15,18,.25);border-radius:3px}
.d1{left:880px;top:150px;width:420px;height:540px;padding:40px 40px;transform:rotate(-2.5deg)}
.d1 small{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8A7D72}
.d1 h3{font-family:Newsreader,serif;font-weight:500;font-size:28px;margin-top:10px;line-height:1.15}
.l{height:7px;background:#ECE6DE;border-radius:4px;margin-top:12px}
.sig{margin-top:92px;border-top:1px solid #1F1A17;padding-top:8px;font-size:12px;color:#8A7D72;position:relative}
.sig svg{position:absolute;left:0;top:-58px}
.stamp{position:absolute;right:34px;bottom:46px;width:96px;height:96px;border:2.5px solid #7A1E22;border-radius:50%;display:grid;place-items:center;color:#7A1E22;font-size:11px;font-weight:700;letter-spacing:.1em;text-align:center;transform:rotate(-12deg)}
.d2{left:1080px;top:560px;width:320px;padding:20px;border-radius:8px;transform:rotate(2deg)}
.d2 h4{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#8A7D72;font-weight:600}
.tl{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.tl div{display:grid;grid-template-columns:14px 1fr auto;gap:10px;align-items:center;font-size:13.5px}
.tl i{width:10px;height:10px;border-radius:50%;background:#7A1E22;display:block}
.tl i.o{background:transparent;border:2px solid #C9BBAE}
.tl span{font-size:12px;color:#8A7D72}
.d3{left:800px;top:620px;width:270px;padding:18px 20px;border-radius:8px;background:#2B0F12;color:#F4EDE4;transform:rotate(-1deg);box-shadow:0 30px 60px rgba(0,0,0,.35)}
.d3 small{font-size:12px;color:#E4A57A;font-weight:600}
.d3 b{display:block;font-family:Newsreader,serif;font-weight:400;font-size:44px;margin-top:4px}
.d3 p{font-size:12.5px;color:rgba(244,237,228,.65)}
.run{display:inline-flex;gap:6px;align-items:center;margin-top:10px;font-size:12px;font-weight:600;background:rgba(228,165,122,.16);color:#E4A57A;padding:5px 10px;border-radius:20px}
.run i{width:7px;height:7px;border-radius:50%;background:#E4A57A;display:block}
</style></head><body><div class="band"></div><div class="rule"></div>
<nav><div class="logo">Counsel<span>OS</span></div><ul><li>Matters</li><li>Intake</li><li>Billing &amp; trust</li><li>Client portal</li></ul><div class="r"><span>Sign in</span><span class="btn">Request access</span></div></nav>
<section class="hero"><p class="k">Practice management for small firms</p>
<h1>Bill every <em>minute</em> you already worked.</h1>
<p class="sub">Matters, intake, documents, time and trust accounting in one quiet place. Clients sign, pay and message through a portal with your firm's name on it.</p>
<div class="ctas"><span class="c1">Start a 14-day trial</span><span class="c2">Talk to a former litigator</span></div>
<div class="bar"><div><b>11.6 h</b>more billable time per lawyer, per month</div><div><b>3-way</b>trust reconciliation, daily</div><div><b>ABA</b>compliant e-signature</div></div>
</section>
<div class="doc d1"><small>Matter 2026-0418 · Okafor Estate</small><h3>Last Will and Testament of Daniel A. Okafor</h3>
<div class="l" style="width:92%"></div><div class="l" style="width:86%"></div><div class="l" style="width:95%"></div><div class="l" style="width:70%"></div><div class="l" style="width:58%"></div>
<div class="sig"><svg width="200" height="60" viewBox="0 0 200 60"><path d="M6 44 C 26 6, 40 58, 58 30 S 92 10, 104 38 S 140 50, 150 22 C 158 8, 170 44, 194 30" fill="none" stroke="#1F1A17" stroke-width="2.2" stroke-linecap="round"/></svg>Signed electronically · 1 Oct 2026, 15:04</div>
<div class="stamp">EXECUTED<br>WITNESSED</div></div>
<div class="doc d2"><h4>Hughes v. Tate</h4><div class="tl">
<div><i></i>Complaint filed<span>12 Aug</span></div>
<div><i></i>Discovery served<span>9 Sep</span></div>
<div><i></i>Deposition · J. Tate<span>28 Sep</span></div>
<div><i class="o"></i>Motion to compel due<span>Fri</span></div></div></div>
<div class="doc d3"><small>Unbilled this week</small><b>$14,860</b><p>48.2 hours across 17 matters</p><span class="run"><i></i>Timer running · Lin lease review</span></div>
</body></html>`;

/* ---------- STORE: Store OS — sun-yellow field, Unbounded, storefront + checkout phone ---------- */
window.LANDINGS.store = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800&family=Archivo:wght@400;500;600;700&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1440px;height:900px;overflow:hidden;background:#FFD84A;color:#141414;font-family:Archivo,Arial,sans-serif;position:relative}
nav{display:flex;align-items:center;padding:26px 60px;gap:40px}
.logo{font-family:Unbounded,sans-serif;font-weight:800;font-size:24px;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
.logo i{width:24px;height:24px;background:#141414;border-radius:50% 50% 50% 0;display:block}
nav ul{display:flex;gap:28px;list-style:none;font-size:15px;font-weight:600}
.r{margin-left:auto;display:flex;gap:16px;align-items:center;font-weight:700;font-size:15px}
.btn{background:#141414;color:#FFD84A;padding:12px 20px;border-radius:999px}
h1{font-family:Unbounded,sans-serif;font-weight:700;font-size:96px;line-height:.95;letter-spacing:-.045em;padding:22px 60px 0;width:1100px}
h1 i{font-style:normal;display:inline-block;background:#141414;color:#FFD84A;padding:0 18px;border-radius:20px;transform:rotate(-2deg)}
.row{display:grid;grid-template-columns:440px 1fr;gap:40px;padding:30px 60px 0}
.sub{font-size:19px;line-height:1.5;font-weight:500}
.ctas{display:flex;gap:12px;margin-top:24px}
.c1{background:#141414;color:#fff;padding:16px 26px;border-radius:999px;font-weight:700;font-size:16px}
.c2{background:#fff;padding:16px 24px;border-radius:999px;font-weight:700;font-size:16px;border:2px solid #141414}
.stars{margin-top:26px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:10px}
.stars b{font-family:Unbounded,sans-serif;font-size:22px}
.st{display:flex;gap:3px}.st i{width:14px;height:14px;background:#141414;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);display:block}
.shop{position:relative;background:#fff;border:2.5px solid #141414;border-radius:22px;box-shadow:10px 10px 0 #141414;height:470px;overflow:hidden}
.bar{display:flex;align-items:center;gap:20px;padding:14px 20px;border-bottom:2px solid #141414;font-size:13px;font-weight:600}
.bar b{font-family:Unbounded,sans-serif;font-size:16px}
.bar span:last-child{margin-left:auto;background:#141414;color:#fff;border-radius:999px;padding:4px 12px}
.prods{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:18px 20px}
.p .img{height:300px;border-radius:14px;position:relative;overflow:hidden}
.p b{display:block;font-size:14px;margin-top:10px}.p span{font-size:13px;color:#555}
.p em{font-style:normal;font-weight:700;font-size:14px;float:right;color:#141414}
.vase{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);width:70px;height:120px;background:#E86A3A;border-radius:35px 35px 20px 20px}
.mug{position:absolute;left:50%;bottom:36px;transform:translateX(-50%);width:84px;height:84px;background:#2E5BFF;border-radius:6px 6px 20px 20px}
.mug::after{content:"";position:absolute;right:-26px;top:16px;width:30px;height:40px;border:9px solid #2E5BFF;border-left:0;border-radius:0 20px 20px 0}
.throw{position:absolute;left:24px;right:24px;top:40px;bottom:30px;background:repeating-linear-gradient(90deg,#3E7B5B 0 14px,#5E9C78 14px 28px);border-radius:10px;transform:rotate(-6deg)}
.candle{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);width:66px;height:96px;background:#F4EBDD;border:3px solid #141414;border-radius:8px}
.candle::before{content:"";position:absolute;left:50%;top:-30px;width:14px;height:24px;background:#FF8A00;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;transform:translateX(-50%)}
.sale{position:absolute;right:30px;top:700px;width:300px;background:#141414;color:#fff;border-radius:18px;padding:16px 18px;box-shadow:0 20px 40px rgba(0,0,0,.25);transform:rotate(2deg)}
.sale small{font-size:12px;color:#FFD84A;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.sale b{display:block;font-family:Unbounded,sans-serif;font-size:36px;margin-top:4px}
.sale .sp{display:flex;align-items:flex-end;gap:4px;height:36px;margin-top:8px}.sale .sp i{flex:1;background:#4A4A4A;border-radius:2px}.sale .sp i:last-child{background:#FFD84A}
.order{position:absolute;left:520px;top:780px;width:340px;background:#fff;border:2px solid #141414;border-radius:16px;padding:12px 14px;display:flex;gap:12px;align-items:center;transform:rotate(-1.5deg)}
.order .dot{width:38px;height:38px;border-radius:50%;background:#2DBE6C;display:grid;place-items:center;flex:none}
.order .dot::after{content:"";width:12px;height:7px;border-left:3px solid #fff;border-bottom:3px solid #fff;transform:rotate(-45deg) translate(1px,-2px)}
.order b{font-size:14px;display:block}.order span{font-size:12.5px;color:#555}
</style></head><body>
<nav><div class="logo"><i></i>store/os</div><ul><li>Storefront</li><li>Checkout</li><li>Inventory</li><li>Shipping</li></ul><div class="r"><span>Log in</span><span class="btn">Open your store</span></div></nav>
<h1>Sell the thing. <i>Skip</i> the plugins.</h1>
<div class="row"><div><p class="sub">A beautiful storefront, one-page checkout, inventory, shipping labels and customer emails in one place. No apps to stitch together, no surprise fees.</p>
<div class="ctas"><span class="c1">Start selling free</span><span class="c2">See live stores</span></div>
<div class="stars"><div class="st"><i></i><i></i><i></i><i></i><i></i></div><b>4.9</b>from 3,100 independent brands</div></div>
<div class="shop"><div class="bar"><b>Kindred Goods</b><span>Home</span><span>Ceramics</span><span>Textiles</span><span>Gifts</span><span>Cart (2)</span></div>
<div class="prods">
<div class="p"><div class="img" style="background:#FBE3D6"><div class="vase"></div></div><b>Clay bud vase <em>$64</em></b><span>Terracotta · 3 left</span></div>
<div class="p"><div class="img" style="background:#E0E7FF"><div class="mug"></div></div><b>Stoneware mug <em>$28</em></b><span>Cobalt glaze</span></div>
<div class="p"><div class="img" style="background:#E3F1E7"><div class="throw"></div></div><b>Linen throw <em>$118</em></b><span>Sage stripe</span></div>
<div class="p"><div class="img" style="background:#F7F1E6"><div class="candle"></div></div><b>Beeswax candle <em>$42</em></b><span>Set of 2</span></div>
</div></div></div>
<div class="sale"><small>Sales today</small><b>$4,812</b><div class="sp"><i style="height:30%"></i><i style="height:45%"></i><i style="height:40%"></i><i style="height:62%"></i><i style="height:70%"></i><i style="height:100%"></i></div></div>
<div class="order"><span class="dot"></span><div><b>New order #10482 · $118.00</b><span>Jess T. in Portland · label printed</span></div></div>
</body></html>`;
