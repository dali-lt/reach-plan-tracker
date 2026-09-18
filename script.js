(function(){
  const STORAGE_KEY = 'medali_plan_v3';
  const LANG_KEY = 'medali_tracker_lang';
  const TOTAL_DAYS = 30;

  const clientNames = ['Amal','Jalloul','Khalil'];

  const dayMeta = {
    en: {
      dayLabel: (n)=> 'Day ' + n,
      startTitle: 'Ready to start?',
      startDesc: 'Day 1 begins today. The plan runs 30 days, in a repeating 6-day cycle.',
      statday: 'Day', statstreak: 'Streak', statsignals: 'Signals', statclients: 'Clients',
      catchupTitle: 'Catch-up pending',
      catchupText: (list)=> `You have ${list.length} day(s) waiting: ${list.map(d=>'Day '+d.n+' ('+d.title+')').join(', ')}. Tap them below whenever you can.`,
      today: 'Today', alldays: 'All 30 days', monthgoal: 'Month goal', newclients: 'New clients',
      prospectlabel: "Prospect handle (save it — you'll need it tomorrow)",
      problemLabel: "What's weak about their visual identity?",
      problemPlaceholder: "e.g. no real logo, inconsistent colors, phone-camera photos...",
      noteLabel: "Note (optional)",
      notePlaceholder: "Anything worth remembering about today",
      editWindowNote: "This day is view-only now — editing is only open for today and yesterday.",
      dayAdvanceNote: "The day number moves forward with the real calendar, one day at a time — finishing early doesn't skip ahead to tomorrow.",
      yourprospect: "Yesterday's prospect",
      reconnectwho: "Share this person's post today",
      markDone: 'Mark today done', doneLabel: 'Done ✓',
      sigNone: 'No signal', sigReply: 'Got a reply', sigConvo: 'New conversation',
      resetBtn: 'Reset everything (fresh start)',
      restartBtn: 'Start over',
      startDatePrefix: 'Today is',
      bigGapText: (n)=> `${n} days missed in a row — start fresh if you'd like`,
      notStartedText: "No day logged yet — reset the date if this was just a test",
      footer: 'Raykom Fil Projet — precision, honesty, proof.',
      poslabel: 'Your edge',
      postext: "Precision from geomatics. Honesty I won't compromise on. Every brand gets a precisely built, honestly built system — backed by real results since 2023.",
      confirmReset: 'Are you sure? This wipes all progress and starts over.',
      sprintDone: "30 days complete. Review the results and decide the next cycle.",
      copyBtn: 'COPY', copied: 'COPIED',
      tasks: [
        { title: 'Scout + Engage', desc: 'Find one new small jewelry/accessories brand (under 5K followers, weak visual identity, still active). Save the handle below. Then leave a real comment — not just a like — on 3 accounts: this prospect, a fellow designer, and a past client.' },
        { title: 'Outreach', desc: "Message the prospect you found yesterday. Use the template below, personalize the bracketed part, and send." },
        { title: 'Targeted Engagement', desc: 'Comment for real on 3 more jewelry/accessories accounts — new ones, not the same as before. This is what fixes who actually sees you, not just how many.' },
        { title: 'Content', desc: null },
        { title: 'Reconnect (no ask)', desc: null },
        { title: 'Reply + Review', desc: 'Clear any replies or comments waiting for you. Quick check: how many days did you complete this week? Any replies from outreach? Any new signals?' }
      ],
      contentTypes: [
        'Case study — share a before/after or a breakdown of a past project.',
        'Behind the scenes — a process shot: sketches, an Illustrator screenshot, a decision you made.',
        'Proof — a real number or a client comment, presented simply.',
        "Your call — reuse something you already have ready if time is tight."
      ],
      reconnectDesc: (name)=> `Share one of ${name}'s posts to your story — no message, no ask. Just stay visible, with zero pressure.`,
      template: "Hi! I saw your work and loved [specific detail]. I'm a Graphic & Brand Identity Designer — I build every detail with precision and I'm always upfront about what's realistic. I recently worked with Accessoires Plus and their launch post got 1,000+ real engagements after a full identity rebuild. I think your brand deserves a visual system that matches the quality of what you're making. Happy to help if you're interested — no pressure at all."
    },
    ar: {
      dayLabel: (n)=> 'اليوم ' + n,
      startTitle: 'مستعد تبدا؟',
      startDesc: 'اليوم 1 يبدا اليوم. الخطة 30 يوم، فـ دورة 6 أيام تتكرر.',
      statday: 'اليوم', statstreak: 'Streak', statsignals: 'Signals', statclients: 'Clients',
      catchupTitle: 'عندك أيام معلّقة',
      catchupText: (list)=> `عندك ${list.length} يوم مستني: ${list.map(d=>'يوم '+d.n+' ('+d.title+')').join('، ')}. كبس عليهم تحت وقتما تحب.`,
      today: 'اليوم', alldays: 'الـ30 يوم', monthgoal: 'هدف الشهر', newclients: 'Clients جداد',
      prospectlabel: 'اسم البراند (احفظو — تحتاجو غدوة)',
      problemLabel: 'شنوة الضعف فـ الهوية البصرية متاعهم؟',
      problemPlaceholder: 'مثال: بلا لوقو حقيقي، ألوان مش متناسقة، صور موبايل...',
      noteLabel: 'ملاحظة (اختياري)',
      notePlaceholder: 'أي حاجة تحب تتفكرها على اليوم',
      editWindowNote: 'هاذا اليوم توا للمشاهدة بس — التعديل متاح لليوم والبارح بس.',
      dayAdvanceNote: 'رقم اليوم يتقدم مع التاريخ الحقيقي، يوم بيوم — كي تكمل بدري ما يقفزش لغدوة.',
      yourprospect: 'البراند اللي لقيتو أمس',
      reconnectwho: 'شارك بوست هاذا الشخص اليوم',
      markDone: 'علّم اليوم كتم', doneLabel: 'تم ✓',
      sigNone: 'بلا رد', sigReply: 'جاني رد', sigConvo: 'محادثة جديدة',
      resetBtn: 'Reset الكل (بداية جديدة)',
      restartBtn: 'ابدأ من جديد',
      startDatePrefix: 'اليوم',
      bigGapText: (n)=> `فاتوك ${n} أيام متتالية — تقدر تبدا من جديد إذا حبيت`,
      notStartedText: 'لسا ما علمت حتى يوم — تقدر تصفي التاريخ إذا كانت بس تجربة',
      footer: 'Raykom Fil Projet — دقة، صدق، دليل.',
      poslabel: 'الميزة الحقيقية متاعك',
      postext: 'الدقة يلي جتني من الجيوماتيك، والصدق يلي ما نتنازلش عليه — هوما يلي يميزوني. كل براند نخدم معاه، يلقى نظام مضبوط بالتفصيل، مبني على الحقيقة مش المبالغة — ونتائج حقيقية تشهد بيه من 2023 لتوا.',
      confirmReset: 'متأكد؟ هذا يمسح كل التقدم ويبدا من جديد.',
      sprintDone: 'كملت الـ30 يوم. راجع النتائج وقرر الدورة الجاية.',
      copyBtn: 'انسخ', copied: 'اتنسخ',
      tasks: [
        { title: 'Scout + تفاعل', desc: 'تلقى براند مجوهرات/إكسسوارات صغير جديد (تحت 5K follower، هوية بصرية ضعيفة، نشيط). تسجل اسمو تحت. بعدها تعلق بجدية (ماشي لايك بس) على 3 حسابات: هاذا البراند، designer، وعميل قديم.' },
        { title: 'Outreach', desc: 'تبعث رسالة للبراند اللي لقيتو أمس. استعمل القالب تحت، بدل الجزء بين قوسين، وابعث.' },
        { title: 'تفاعل مستهدف', desc: 'تعلق بجدية على 3 حسابات مجوهرات/إكسسوارات إضافية — جداد، ماشي نفس اللي قبل. هذا يصلح شكون يشوفك فعليًا، ماشي بس كم واحد.' },
        { title: 'Content', desc: null },
        { title: 'Reconnect (بلا طلب)', desc: null },
        { title: 'رد + مراجعة', desc: 'تصفي كل رد/تعليق وصلك. مراجعة سريعة: كم يوم عملت هالأسبوع؟ فما رد من الـ outreach؟ فما تفاعل جديد؟' }
      ],
      contentTypes: [
        'Case study — شارك قبل/بعد أو تفصيل مشروع سابق.',
        'Behind the scenes — سكرينشوت من مرحلة التصميم، قرار اتخذتو.',
        'Proof — رقم حقيقي أو تعليق عميل، بشكل بسيط.',
        'اختيارك — استعمل حاجة عندك جاهزة إذا الوقت ضيق.'
      ],
      reconnectDesc: (name)=> `تشارك بوست ${name} فـ الستوري — بلا رسالة، بلا طلب. بس تبقى حاضر، بلا أي ضغط.`,
      template: 'أهلا! شفت الشغل متاعكم، عجبني [حاجة محددة]. أنا Graphic & Brand Identity Designer، نخدم بدقة على كل تفصيل ونصارح بصراحة تامة فـ أي حاجة. خدمت مؤخرًا مع Accessoires Plus وجابت النتيجة أكثر من 1,000 تفاعل حقيقي بعد إعادة الهوية. حسيت الشغل متاعكم يستاهل نظام بصري يعكس الجودة الحقيقية متاعو. نحب نساعد لو تحبو، بلا أي التزام.'
    }
  };

  let currentLang = 'en';

  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return { startDate: null, days: {}, clients: 0 };
      const p = JSON.parse(raw);
      return { startDate: p.startDate || null, days: p.days || {}, clients: p.clients || 0 };
    }catch(e){ return { startDate: null, days: {}, clients: 0 }; }
  }
  function save(s){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }catch(e){} }
  function loadLang(){ try{ const l = localStorage.getItem(LANG_KEY); return (l==='ar'||l==='en')?l:'en'; }catch(e){ return 'en'; } }
  function saveLang(l){ try{ localStorage.setItem(LANG_KEY, l); }catch(e){} }

  let state = load();

  function dayCycleIndex(n){ return (n-1) % 6; }
  function cycleNumber(n){ return Math.floor((n-1)/6); }

  function currentDayNumber(){
    if(!state.startDate) return 1;
    const start = new Date(state.startDate);
    const today = new Date();
    const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = Math.round((todayMid - startMid) / 86400000);
    return Math.min(TOTAL_DAYS, Math.max(1, diff + 1));
  }

  function getDayEntry(n){
    if(!state.days[n]) state.days[n] = { done:false, signal:null, prospect:'' };
    return state.days[n];
  }

  function getTaskInfo(n, lang){
    const t = dayMeta[lang];
    const ci = dayCycleIndex(n);
    const cyc = cycleNumber(n);
    const base = t.tasks[ci];
    let title = base.title, desc = base.desc;
    if(ci === 3){ desc = t.contentTypes[cyc % t.contentTypes.length]; }
    if(ci === 4){
      const name = clientNames[cyc % clientNames.length];
      desc = t.reconnectDesc(name);
    }
    return { title, desc, ci };
  }

  function renderStart(){
    const t = dayMeta[currentLang];
    document.getElementById('txt-startTitle').textContent = t.startTitle;
    document.getElementById('txt-startDesc').textContent = t.startDesc;
    const today = new Date();
    const locale = currentLang === 'ar' ? 'ar-TN' : 'en-GB';
    let formatted;
    try{
      formatted = new Intl.DateTimeFormat(locale, { weekday:'long', day:'numeric', month:'long', year:'numeric' }).format(today);
    }catch(e){
      formatted = today.toDateString();
    }
    document.getElementById('startDateDisplay').textContent = t.startDatePrefix + ' — ' + formatted;
  }

  function renderStats(){
    const n = currentDayNumber();
    document.getElementById('statDay').textContent = n + '/' + TOTAL_DAYS;
    let streak = 0;
    for(let i=n;i>=1;i--){
      if(state.days[i] && state.days[i].done) streak++; else break;
    }
    document.getElementById('statStreak').textContent = streak;
    let signals = 0;
    Object.values(state.days).forEach(d=>{ if(d.signal==='reply'||d.signal==='convo') signals++; });
    document.getElementById('statSignals').textContent = signals;
    document.getElementById('statClients').textContent = state.clients + '/2';
  }

  function renderCatchup(){
    const t = dayMeta[currentLang];
    const n = currentDayNumber();
    const missed = [];
    for(let i=1;i<n;i++){
      if(!state.days[i] || !state.days[i].done){
        const info = getTaskInfo(i, currentLang);
        missed.push({ n:i, title: info.title });
      }
    }
    const banner = document.getElementById('catchupBanner');
    if(missed.length){
      banner.style.display = 'block';
      document.getElementById('txt-catchupTitle').textContent = t.catchupTitle;
      document.getElementById('catchupText').textContent = t.catchupText(missed);
    } else {
      banner.style.display = 'none';
    }
  }

  function findLastProspect(beforeDay){
    for(let i=beforeDay-1;i>=1;i--){
      if(state.days[i] && state.days[i].prospect) return state.days[i].prospect;
    }
    return '';
  }

  function renderToday(){
    const t = dayMeta[currentLang];
    const n = currentDayNumber();
    const info = getTaskInfo(n, currentLang);
    const entry = getDayEntry(n);

    document.getElementById('todayDayLabel').textContent = t.dayLabel(n) + ' — ' + info.title;
    document.getElementById('todayTaskTitle').textContent = info.title;
    document.getElementById('todayTaskDesc').textContent = info.desc;

    document.getElementById('scoutField').style.display = (info.ci === 0) ? 'block' : 'none';
    document.getElementById('outreachField').style.display = (info.ci === 1) ? 'block' : 'none';
    document.getElementById('reconnectField').style.display = (info.ci === 4) ? 'block' : 'none';

    if(info.ci === 0){
      document.getElementById('txt-prospectlabel').textContent = t.prospectlabel;
      document.getElementById('prospectInput').value = entry.prospect || '';
    }
    if(info.ci === 1){
      document.getElementById('txt-yourprospect').textContent = t.yourprospect;
      document.getElementById('prospectDisplay').value = findLastProspect(n) || '—';
      document.getElementById('templateText').textContent = t.template;
      document.getElementById('btnCopyTemplate').textContent = t.copyBtn;
    }
    if(info.ci === 4){
      document.getElementById('txt-reconnectwho').textContent = t.reconnectwho;
      const cyc = cycleNumber(n);
      document.getElementById('reconnectDisplay').value = clientNames[cyc % clientNames.length];
    }

    const btn = document.getElementById('btnMarkDone');
    btn.textContent = entry.done ? t.doneLabel : t.markDone;
    btn.classList.toggle('is-done', entry.done);

    const sigRow = document.getElementById('signalRow');
    sigRow.style.display = entry.done ? 'flex' : 'none';
    document.getElementById('sigNone').textContent = t.sigNone;
    document.getElementById('sigReply').textContent = t.sigReply;
    document.getElementById('sigConvo').textContent = t.sigConvo;
    ['none','reply','convo'].forEach(s=>{
      const el = document.getElementById('sig' + s.charAt(0).toUpperCase() + s.slice(1));
      el.classList.toggle('active', entry.signal === s);
    });
  }

  const expandedDays = new Set();

  function renderDayList(){
    const t = dayMeta[currentLang];
    const n = currentDayNumber();
    const list = document.getElementById('dayList');
    list.innerHTML = '';
    for(let i=1;i<=TOTAL_DAYS;i++){
      const info = getTaskInfo(i, currentLang);
      const entry = state.days[i];
      const done = entry && entry.done;
      const futureLocked = i > n;
      const editWindowLocked = i <= (n - 2);
      const locked = futureLocked || editWindowLocked;
      const missed = !futureLocked && i < n && !done;
      const isExpanded = expandedDays.has(i);

      const wrap = document.createElement('div');
      wrap.className = 'day-wrap' + (done?' done':'');

      const row = document.createElement('div');
      row.className = 'day-row' + (done?' done':'') + (missed?' missed':'') + (locked?' locked':'') + (isExpanded?' expanded':'');
      const sigIcon = entry && entry.signal === 'reply' ? '\ud83d\udcac' : (entry && entry.signal === 'convo' ? '\ud83d\udd25' : '');

      const dn = document.createElement('div');
      dn.className = 'dn';
      dn.textContent = done ? '\u2713' : i;

      const dtask = document.createElement('div');
      dtask.className = 'dtask';
      dtask.textContent = t.dayLabel(i) + ' \u00b7 ' + info.title;

      const dsig = document.createElement('div');
      dsig.className = 'dsignal';
      dsig.textContent = sigIcon;

      const chevron = document.createElement('div');
      chevron.className = 'dchevron';
      chevron.textContent = '\u25be';

      row.appendChild(dn);
      row.appendChild(dtask);
      row.appendChild(dsig);
      row.appendChild(chevron);

      dn.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        if(locked) return;
        const e = getDayEntry(i);
        e.done = !e.done;
        if(!e.done) e.signal = null;
        save(state);
        renderAll();
      });

      row.addEventListener('click', ()=>{
        if(expandedDays.has(i)) expandedDays.delete(i); else expandedDays.add(i);
        renderDayList();
      });

      wrap.appendChild(row);

      if(isExpanded){
        const detail = document.createElement('div');
        detail.className = 'day-detail';
        const e = getDayEntry(i);

        let extraFieldHtml = '';
        const disabledAttr = editWindowLocked ? 'disabled' : '';
        if(info.ci === 0){
          extraFieldHtml = '<div class="dd-field"><label>' + t.prospectlabel + '</label><input type="text" ' + disabledAttr + ' data-note-type="prospect" data-day="' + i + '" value="' + (e.prospect||'').replace(/"/g,'&quot;') + '" placeholder="@handle"></div>' +
            '<div class="dd-field"><label>' + t.problemLabel + '</label><input type="text" ' + disabledAttr + ' data-note-type="note" data-day="' + i + '" value="' + (e.note||'').replace(/"/g,'&quot;') + '" placeholder="' + t.problemPlaceholder + '"></div>';
        } else {
          extraFieldHtml = '<div class="dd-field"><label>' + t.noteLabel + '</label><input type="text" ' + disabledAttr + ' data-note-type="note" data-day="' + i + '" value="' + (e.note||'').replace(/"/g,'&quot;') + '" placeholder="' + t.notePlaceholder + '"></div>';
        }

        detail.innerHTML = '<div class="dd-title">' + info.title + '</div><div>' + info.desc + '</div>' + (editWindowLocked ? '<div class="dd-locked-note">' + t.editWindowNote + '</div>' : '') + extraFieldHtml;
        wrap.appendChild(detail);

        detail.querySelectorAll('input').forEach(function(inp){
          inp.addEventListener('click', function(ev){ ev.stopPropagation(); });
          inp.addEventListener('input', function(ev){
            const day = parseInt(ev.target.dataset.day,10);
            const type = ev.target.dataset.noteType;
            const entry2 = getDayEntry(day);
            if(type === 'prospect') entry2.prospect = ev.target.value;
            else entry2.note = ev.target.value;
            save(state);
          });
        });
      }

      list.appendChild(wrap);
    }
  }

  function renderGoal(){
    document.getElementById('clientCount').textContent = state.clients;
    document.querySelectorAll('#goalSlots .slot').forEach((s,i)=> s.classList.toggle('filled', i < state.clients));
  }

  function applyLang(lang){
    currentLang = lang;
    const t = dayMeta[lang];
    document.getElementById('htmlRoot').setAttribute('dir', lang==='ar'?'rtl':'ltr');
    document.getElementById('htmlRoot').setAttribute('lang', lang);
    document.getElementById('txt-h1').innerHTML = lang==='ar'
      ? '30 يوم.<br><span class="hl">نظام واحد.</span>'
      : '30 Days.<br><span class="hl">One system.</span>';
    document.getElementById('txt-sub').textContent = lang==='ar'
      ? 'الهدف: 1-2 clients، وتصحيح شكون يشوفك فعليًا.'
      : 'Goal: 1-2 clients, and fixing who actually sees you.';
    document.getElementById('txt-poslabel').textContent = t.poslabel;
    document.getElementById('txt-postext').textContent = t.postext;
    document.getElementById('txt-statday').textContent = t.statday;
    document.getElementById('txt-statstreak').textContent = t.statstreak;
    document.getElementById('txt-statsignals').textContent = t.statsignals;
    document.getElementById('txt-statclients').textContent = t.statclients;
    document.getElementById('txt-today').textContent = t.today;
    document.getElementById('txt-alldays').textContent = t.alldays;
    document.getElementById('txt-monthgoal').textContent = t.monthgoal;
    document.getElementById('txt-newclients').textContent = t.newclients;
    document.getElementById('txt-dayadvance').textContent = t.dayAdvanceNote;
    document.getElementById('txt-sprintdone').textContent = t.sprintDone;
    if(typeof restartCtrl !== 'undefined') restartCtrl.refreshLabel();
    document.getElementById('txt-footer').textContent = t.footer;
    document.getElementById('btnEn').classList.toggle('active', lang==='en');
    document.getElementById('btnAr').classList.toggle('active', lang==='ar');
    saveLang(lang);
    renderStart();
    renderAll();
  }

  function currentMissedStreak(){
    const n = currentDayNumber();
    let count = 0;
    for(let i = n - 1; i >= 1; i--){
      if(state.days[i] && state.days[i].done) break;
      count++;
    }
    return count;
  }

  function renderAll(){
    if(!state.startDate){
      document.getElementById('startScreen').style.display = 'block';
      document.getElementById('mainApp').style.display = 'none';
      return;
    }
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    renderStats();
    renderCatchup();
    renderToday();
    renderDayList();
    renderGoal();

    const t = dayMeta[currentLang];
    const n = currentDayNumber();
    const finished = n >= TOTAL_DAYS;
    document.getElementById('completionPanel').style.display = finished ? 'block' : 'none';

    const bigGapEl = document.getElementById('bigGapNotice');
    bigGapEl.style.display = 'block';
    if(typeof restartSubtleCtrl !== 'undefined') restartSubtleCtrl.refreshLabel();
  }

  document.getElementById('btnStart').addEventListener('click', ()=>{
    state.startDate = new Date().toISOString();
    save(state);
    renderAll();
  });

  document.getElementById('btnMarkDone').addEventListener('click', ()=>{
    const n = currentDayNumber();
    const info = getTaskInfo(n, currentLang);
    const entry = getDayEntry(n);
    if(info.ci === 0){
      entry.prospect = document.getElementById('prospectInput').value.trim();
    }
    entry.done = !entry.done;
    if(!entry.done) entry.signal = null;
    save(state);
    renderAll();
  });

  ['none','reply','convo'].forEach(s=>{
    document.getElementById('sig' + s.charAt(0).toUpperCase() + s.slice(1)).addEventListener('click', ()=>{
      const n = currentDayNumber();
      const entry = getDayEntry(n);
      entry.signal = s;
      save(state);
      renderToday();
      renderStats();
      renderDayList();
    });
  });

  document.getElementById('btnCopyTemplate').addEventListener('click', ()=>{
    const t = dayMeta[currentLang];
    const txt = document.getElementById('templateText').textContent;
    const btn = document.getElementById('btnCopyTemplate');
    try{
      navigator.clipboard.writeText(txt).then(()=>{
        btn.textContent = t.copied;
        setTimeout(()=>{ btn.textContent = t.copyBtn; }, 1500);
      });
    }catch(e){}
  });

  document.getElementById('btnPlus').addEventListener('click', ()=>{
    state.clients = Math.min(2, (state.clients||0)+1);
    save(state); renderGoal(); renderStats();
  });
  document.getElementById('btnMinus').addEventListener('click', ()=>{
    state.clients = Math.max(0, (state.clients||0)-1);
    save(state); renderGoal(); renderStats();
  });

  function wireResetButton(id, defaultTextFn){
    const el = document.getElementById(id);
    let pending = false;
    let timeoutId = null;

    function doReset(){
      state = { startDate: null, days: {}, clients: 0 };
      save(state);
      pending = false;
      if(timeoutId) clearTimeout(timeoutId);
      renderAll();
    }

    el.addEventListener('click', ()=>{
      const t = dayMeta[currentLang];
      if(!pending){
        pending = true;
        el.textContent = t.confirmReset;
        el.classList.add('is-confirming');
        timeoutId = setTimeout(()=>{
          pending = false;
          el.classList.remove('is-confirming');
          el.textContent = defaultTextFn(t);
        }, 4000);
      } else {
        doReset();
      }
    });

    return { refreshLabel: ()=>{
      if(!pending){ el.textContent = defaultTextFn(dayMeta[currentLang]); }
    }};
  }

  const restartCtrl = wireResetButton('btnRestart', (t)=> t.restartBtn);
  const restartSubtleCtrl = wireResetButton('btnRestartSubtle', (t)=> t.resetBtn);

  document.getElementById('btnEn').addEventListener('click', ()=> applyLang('en'));
  document.getElementById('btnAr').addEventListener('click', ()=> applyLang('ar'));

  applyLang(loadLang());
})();
