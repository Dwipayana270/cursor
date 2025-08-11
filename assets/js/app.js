(function(){
  let currentBab = null;
  let currentLevel = null;
  let placementAnswers = {};
  let evaluationAnswers = {};

  // GeoGebra applet 1
  const parameters = {
    id: "ggbApplet",
    width: 600,
    height: 400,
    showMenuBar: false,
    showAlgebraInput: false,
    showToolBar: false,
    customToolBar: "0 73 62 | 1 501 67 , 5 19 , 72 75 76 | 2 15 45 , 18 65 , 7 37 | 4 3 8 9 , 13 44 , 58 , 47 | 16 51 64 , 70 | 10 34 53 11 , 24  20 22 , 21 23 | 55 56 57 , 12 | 36 46 , 38 49  50 , 71  14  68 | 30 29 54 32 31 33 | 25 17 26 60 52 61 | 40 41 42 , 27 28 35 , 6",
    showToolBarHelp: true,
    showResetIcon: false,
    enableLabelDrags: false,
    enableShiftDragZoom: false,
    enableRightClick: false,
    errorDialogsActive: false,
    useBrowserForJS: false,
    allowStyleBar: false,
    preventFocus: false,
    showZoomButtons: false,
    capturingThreshold: 3,
    appletOnLoad: function(api) {},
    showFullscreenButton: true,
    scale: 1,
    disableAutoScale: false,
    allowUpscale: false,
    clickToLoad: false,
    appName: "classic",
    buttonRounding: 0.7,
    buttonShadows: false,
    language: "en",
    material_id: "kmncrg2b",
  };
  const views = { is3D:0, AV:0, SV:0, CV:0, EV2:0, CP:0, PC:0, DA:0, FI:0, macro:0 };
  let applet = null;
  if (typeof GGBApplet !== "undefined") {
    applet = new GGBApplet(parameters, "5.0", views);
  }
  function waitForDivAndInject() {
    const observer = new MutationObserver(() => {
      const el = document.getElementById('ggbApplet');
      if (el && applet) { observer.disconnect(); applet.inject('ggbApplet'); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  waitForDivAndInject();

  // GeoGebra applet 2
  const parameters2 = { ...parameters, id: "ggbApplet2", material_id: "ad8amant" };
  const views2 = { ...views };
  let applet2 = null;
  if (typeof GGBApplet !== "undefined") {
    applet2 = new GGBApplet(parameters2, "5.0", views2);
  }
  function waitForDivAndInject2() {
    const observer = new MutationObserver(() => {
      const el = document.getElementById('ggbApplet2');
      if (el && applet2) { observer.disconnect(); applet2.inject('ggbApplet2'); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  waitForDivAndInject2();

  function renderMathJax(targetEl) {
    if (!window.MathJax) return;
    const target = targetEl || document.body;
    if (window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([target]).catch(()=>{});
    }
  }

  function saveUIState(state) {
    try { localStorage.setItem('mathUI', JSON.stringify(state || {})); } catch(_) {}
  }
  function getUIState() {
    try { const s = localStorage.getItem('mathUI'); return s ? JSON.parse(s) : null; } catch(_) { return null; }
  }

  function initApp() {
    const savedProgress = localStorage.getItem("mathProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      updateProgressUI(progress);
      updateBabStatus(progress);
    }
    // Restore last UI state
    const ui = getUIState();
    if (ui && ui.screen) {
      switch (ui.screen) {
        case 'home':
          showHome();
          break;
        case 'placement':
          if (ui.bab) startPlacement(ui.bab); else showHome();
          break;
        case 'learning':
          if (ui.bab && ui.level) showLearning(ui.bab, ui.level); else showHome();
          break;
        case 'evaluation':
          if (ui.bab) showEvaluation(ui.bab); else showHome();
          break;
        case 'progress':
          showProgress();
          break;
        case 'about':
          showAbout();
          break;
        default:
          showHome();
      }
    } else {
      showHome();
    }
  }

  function clearAndAppend(el, children) {
    el.innerHTML = '';
    children.forEach((child)=>el.appendChild(child));
  }

  function showHome() {
    document.getElementById("home-screen").classList.remove("hidden");
    document.getElementById("placement-screen").classList.add("hidden");
    document.getElementById("learning-screen").classList.add("hidden");
    document.getElementById("evaluation-screen").classList.add("hidden");
    document.getElementById("progress-screen").classList.add("hidden");
    document.getElementById("about-screen").classList.add("hidden");
    saveUIState({ screen: 'home' });
    scrollToTop();
  }

  function startBab(bab) {
    currentBab = bab;
    saveUIState({ screen: 'placement', bab });
    const progress = getProgress();
    if (progress[bab] && progress[bab].level) {
      document.getElementById("home-screen").classList.add("hidden");
      showLearning(bab, progress[bab].level);
    } else {
      startPlacement(bab);
    }
  }

  function updateBabStatus(progress) {
    const setStatus = (elId, babKey) => {
      const el = document.getElementById(elId);
      el.innerHTML = '';
      const span = document.createElement('span');
      span.className = "p-2 rounded bg-white bg-opacity-70";
      if (progress[babKey] && progress[babKey].level) {
        span.textContent = `Level: ${progress[babKey].level.toUpperCase()}`;
        span.classList.add('text-green-600');
      } else {
        span.textContent = "Belum dimulai";
        span.classList.add('text-red-600');
      }
      el.appendChild(span);
    };
    setStatus('bab4-status', '4');
    setStatus('bab5-status', '5');
    setStatus('bab6-status', '6');
  }

  function startPlacement(bab) {
    currentBab = bab;
    placementAnswers = {};
    saveUIState({ screen: 'placement', bab });
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("placement-screen").classList.remove("hidden");

    const questions = window.placementTests[bab];
    const container = document.getElementById('placement-questions');
    container.innerHTML = '';

    questions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'neo-brutal rounded-brutal p-6';

      const label = document.createElement('span');
      label.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 border-2 border-black text-black';
      label.textContent = `Pertanyaan ${index+1}`;
      const qText = document.createElement('p');
      qText.className = 'text-lg font-semibold mt-2 mb-4';
      qText.textContent = q.question;

      const optsBox = document.createElement('div');
      optsBox.className = 'space-y-3';

      q.options.forEach((opt, optIndex) => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-3 cursor-pointer';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${index}`;
        input.value = String(optIndex);
        input.className = 'w-5 h-5';
        const span = document.createElement('span');
        span.textContent = opt.text;
        label.appendChild(input);
        label.appendChild(span);
        optsBox.appendChild(label);
      });

      card.appendChild(label);
      card.appendChild(qText);
      card.appendChild(optsBox);
      container.appendChild(card);
    });
  }

  function submitPlacement() {
    const questions = window.placementTests[currentBab];
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected) {
        const answerIndex = parseInt(selected.value);
        placementAnswers[index] = answerIndex;
        if (q.options[answerIndex].correct) score++;
      }
    });
    let level;
    if (score >= questions.length * 0.8) level = 'lanjut';
    else if (score >= questions.length * 0.5) level = 'menengah';
    else level = 'dasar';
    saveProgress(currentBab, level);
    showLearning(currentBab, level);
  }

  function showLearning(bab, level) {
    currentBab = bab;
    currentLevel = level;
    saveUIState({ screen: 'learning', bab, level });
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("placement-screen").classList.add("hidden");
    document.getElementById("learning-screen").classList.remove("hidden");

    const levelIndicator = document.getElementById("level-indicator");
    levelIndicator.textContent = `BAB ${bab} - Level ${level.toUpperCase()}`;

    updateJourneyMap(bab, level);
    loadContent(bab, level);
    updateProgress();
  }

  function updateJourneyMap(bab, level) {
    const journeyMap = document.getElementById('journey-map');
    journeyMap.innerHTML = '';
    const levels = ["dasar", "menengah", "lanjut"];
    const levelNames = { dasar:"Dasar", menengah:"Menengah", lanjut:"Lanjut" };
    const progress = getProgress();

    levels.forEach((lvl, idx) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'journey-step';
      if (lvl === level) stepDiv.classList.add('active');
      if (progress[bab] && progress[bab][lvl]) stepDiv.classList.add('completed');
      const row = document.createElement('div');
      row.className = 'flex items-center';
      const dot = document.createElement('div');
      dot.className = 'journey-dot';
      dot.textContent = String(idx+1);
      const label = document.createElement('div');
      label.className = 'ml-4 font-bold';
      label.textContent = levelNames[lvl];
      row.appendChild(dot); row.appendChild(label);
      stepDiv.appendChild(row);
      journeyMap.appendChild(stepDiv);
    });
  }

  async function loadContent(bab, level) {
    let cfg;
    if (level === 'dasar') {
      cfg = window.contentData.dasar[bab];
    } else {
      const levelData = window.contentData[level];
      const chapter = levelData.chapters.find((ch) => ch.id === bab);
      cfg = { title: chapter.title, description: levelData.description, partial: chapter.partial, exercise: levelData.exercise };
    }

    const contentArea = document.getElementById('content-area');
    // skeleton placeholder while loading
    contentArea.innerHTML = '';
    const skeletonWrap = document.createElement('div');
    skeletonWrap.className = 'space-y-4 mb-8';
    const sk1 = document.createElement('div'); sk1.className = 'skeleton skeleton-title';
    const sk2 = document.createElement('div'); sk2.className = 'skeleton skeleton-line';
    const sk3 = document.createElement('div'); sk3.className = 'skeleton skeleton-line';
    const skCard = document.createElement('div'); skCard.className = 'skeleton skeleton-card';
    skeletonWrap.appendChild(sk1); skeletonWrap.appendChild(sk2); skeletonWrap.appendChild(sk3); skeletonWrap.appendChild(skCard);
    contentArea.appendChild(skeletonWrap);

    const title = document.createElement('h2');
    title.className = 'text-3xl font-black mb-2';
    title.textContent = cfg.title;

    const desc = document.createElement('p');
    desc.className = 'text-xl mb-8';
    desc.textContent = cfg.description || '';

    const contentBox = document.createElement('div');
    contentBox.className = 'mb-8';

    const html = await fetch(cfg.partial).then(r=>r.text());
    contentBox.innerHTML = html;
    // remove skeleton
    contentArea.innerHTML = '';

    const exerciseCard = document.createElement('div');
    exerciseCard.className = 'neo-brutal-red rounded-brutal p-6 mb-8';

    const exTitle = document.createElement('h3');
    exTitle.className = 'text-2xl font-bold mb-4';
    exTitle.textContent = 'LATIHAN';

    const exQ = document.createElement('p');
    exQ.className = 'text-lg mb-6';
    exQ.textContent = cfg.exercise.question;

    const exOpts = document.createElement('div');
    exOpts.className = 'space-y-3';

    cfg.exercise.options.forEach((opt, index) => {
      const label = document.createElement('label');
      label.className = 'flex items-center space-x-3 cursor-pointer';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'exercise';
      input.value = String(index);
      input.className = 'w-5 h-5';
      const span = document.createElement('span');
      span.textContent = opt.text;
      label.appendChild(input); label.appendChild(span);
      exOpts.appendChild(label);
    });

    const exBtn = document.createElement('button');
    exBtn.className = 'btn-brutal bg-white text-black mt-6 px-6 py-3';
    exBtn.textContent = 'CEK JAWABAN';
    exBtn.addEventListener('click', checkExercise);

    const exResult = document.createElement('div');
    exResult.id = 'exercise-result';
    exResult.className = 'mt-4 hidden';

    exerciseCard.appendChild(exTitle);
    exerciseCard.appendChild(exQ);
    exerciseCard.appendChild(exOpts);
    exerciseCard.appendChild(exBtn);
    exerciseCard.appendChild(exResult);

    const nav = document.createElement('div');
    nav.className = 'flex justify-between';
    const prev = document.createElement('button');
    prev.className = 'btn-brutal bg-gray-200 px-6 py-3';
    prev.textContent = '← SEBELUMNYA';
    prev.addEventListener('click', previousLevel);
    const next = document.createElement('button');
    next.className = 'btn-brutal neo-brutal-yellow text-black px-6 py-3';
    next.textContent = 'SELANJUTNYA →';
    next.addEventListener('click', nextLevel);
    nav.appendChild(prev); nav.appendChild(next);

    contentArea.appendChild(title);
    contentArea.appendChild(desc);
    contentArea.appendChild(contentBox);
    contentArea.appendChild(exerciseCard);
    contentArea.appendChild(nav);



    renderMathJax(contentArea);
  }

  function checkExercise() {
    const selected = document.querySelector('input[name="exercise"]:checked');
    if (!selected) { alert('Pilih jawaban dulu ya!'); return; }
    const answerIndex = parseInt(selected.value);
    let exercise;
    if (currentLevel === 'dasar') exercise = window.contentData.dasar[currentBab].exercise;
    else exercise = window.contentData[currentLevel].exercise;

    const resultDiv = document.getElementById('exercise-result');
    resultDiv.innerHTML = '';

    if (exercise.options[answerIndex].correct) {
      resultDiv.className = 'neo-brutal-green rounded-brutal p-4 mt-4';
      const p = document.createElement('p'); p.className = 'font-bold text-lg'; p.textContent = 'Mantap! Jawaban kamu benar 🎉';
      resultDiv.appendChild(p);
      const progress = getProgress();
      if (!progress[currentBab]) progress[currentBab] = {};
      progress[currentBab][currentLevel] = true;
      saveProgressData(progress);
      updateProgress();
      updateJourneyMap(currentBab, currentLevel);
    } else {
      resultDiv.className = 'neo-brutal-red rounded-brutal p-4 mt-4 text-white';
      const p = document.createElement('p'); p.className = 'font-bold text-lg'; p.textContent = 'Masih belum tepat. Coba lagi ya! 🤔';
      resultDiv.appendChild(p);
    }
    resultDiv.classList.remove('hidden');
  }

  function previousLevel() {
    const levels = ["dasar", "menengah", "lanjut"];
    const idx = levels.indexOf(currentLevel);
    if (idx > 0) showLearning(currentBab, levels[idx-1]); else showHome();
    scrollToTop();
  }

  function nextLevel() {
    const levels = ["dasar", "menengah", "lanjut"];
    const idx = levels.indexOf(currentLevel);
    if (idx < levels.length - 1) showLearning(currentBab, levels[idx+1]); else showEvaluation(currentBab);
    scrollToTop();
  }

  function showEvaluation(bab) {
    currentBab = bab;
    evaluationAnswers = {};
    saveUIState({ screen: 'evaluation', bab });
    document.getElementById('learning-screen').classList.add('hidden');
    document.getElementById('evaluation-screen').classList.remove('hidden');

    // Always hide and clear previous evaluation result on load
    const evalResult = document.getElementById('evaluation-result');
    if (evalResult) { evalResult.classList.add('hidden'); evalResult.innerHTML = ''; }

    const questions = window.evaluationTests[bab];
    const container = document.getElementById('evaluation-questions');
    container.innerHTML = '';

    questions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'neo-brutal rounded-brutal p-6';
      const label = document.createElement('span');
      label.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 border-2 border-black text-black';
      label.textContent = `Soal ${index+1}`;
      const qText = document.createElement('p');
      qText.className = 'text-lg font-semibold mt-2 mb-4';
      qText.textContent = q.question;
      const opts = document.createElement('div'); opts.className = 'space-y-3';
      q.options.forEach((opt, optIndex) => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-3 cursor-pointer';
        const input = document.createElement('input'); input.type = 'radio'; input.name = `eq${index}`; input.value = String(optIndex); input.className = 'w-5 h-5';
        const span = document.createElement('span'); span.textContent = opt.text;
        label.appendChild(input); label.appendChild(span);
        opts.appendChild(label);
      });
      card.appendChild(label);
      card.appendChild(qText);
      card.appendChild(opts);
      container.appendChild(card);
    });
  }

  function submitEvaluation() {
    const questions = window.evaluationTests[currentBab];
    let score = 0;
    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="eq${index}"]:checked`);
      if (selected) {
        const answerIndex = parseInt(selected.value);
        evaluationAnswers[index] = answerIndex;
        if (q.options[answerIndex].correct) score++;
      }
    });
    const percentage = Math.round((score / questions.length) * 100);
    const resultDiv = document.getElementById('evaluation-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = '';

    let resultClass = '', resultText = '', resultEmoji = '';
    if (percentage >= 80) { resultClass = 'neo-brutal-green rounded-brutal p-6'; resultText = 'Hebat! Kamu menguasai materi ini dengan sangat baik.'; resultEmoji = '🎉👏'; }
    else if (percentage >= 60) { resultClass = 'neo-brutal-yellow rounded-brutal p-6'; resultText = 'Keren! Kamu sudah cukup paham materinya.'; resultEmoji = '👍😊'; }
    else { resultClass = 'neo-brutal-red rounded-brutal p-6 text-white'; resultText = 'Ayo semangat! Kamu perlu sedikit lagi memahami materi ini.'; resultEmoji = '📚💪'; }

    resultDiv.className = resultClass;
    const emoji = document.createElement('div'); emoji.className = 'text-4xl mb-4'; emoji.textContent = resultEmoji;
    const h3 = document.createElement('h3'); h3.className = 'text-2xl font-bold mb-2'; h3.textContent = 'HASIL EVALUASI';
    const p1 = document.createElement('p'); p1.className = 'text-xl mb-2'; p1.textContent = `Skor: ${score}/${questions.length} (${percentage}%)`;
    const p2 = document.createElement('p'); p2.className = 'text-lg'; p2.textContent = resultText;
    const actions = document.createElement('div'); actions.className = 'mt-6 flex justify-center space-x-4';
    const homeBtn = document.createElement('button'); homeBtn.className = 'btn-brutal neo-brutal-yellow text-black px-6 py-3'; homeBtn.textContent = 'Kembali ke Beranda'; homeBtn.addEventListener('click', showHome);
    actions.appendChild(homeBtn);

    resultDiv.appendChild(emoji); resultDiv.appendChild(h3); resultDiv.appendChild(p1); resultDiv.appendChild(p2); resultDiv.appendChild(actions);

    const progress = getProgress();
    if (!progress[currentBab]) progress[currentBab] = {};
    progress[currentBab].evaluation = { score, total: questions.length, percentage };
    saveProgressData(progress);

    window.scrollTo(0, document.body.scrollHeight);
  }

  function getProgress() { const saved = localStorage.getItem('mathProgress'); return saved ? JSON.parse(saved) : {}; }
  function saveProgress(bab, level) { const p = getProgress(); if (!p[bab]) p[bab] = {}; p[bab].level = level; saveProgressData(p); updateBabStatus(p); }
  function saveProgressData(data) { localStorage.setItem('mathProgress', JSON.stringify(data)); }

  function updateProgress() {
    const progress = getProgress();
    let completed = 0, total = 0;
    ["4","5","6"].forEach(bab => {
      if (progress[bab]) {
        ["dasar","menengah","lanjut"].forEach(level => { total++; if (progress[bab][level]) completed++; });
      }
    });
    const percentage = total > 0 ? Math.round((completed/total)*100) : 0;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}%`;
  }

  function updateProgressUI(progress) {
    const renderBabProgress = (containerId, key) => {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      if (!progress[key]) return;
      const levelP = document.createElement('div'); levelP.className = 'mb-2';
      const levelSpan = document.createElement('span'); levelSpan.className = 'font-bold'; levelSpan.textContent = `Level: ${progress[key].level || 'Belum ditentukan'}`;
      levelP.appendChild(levelSpan);

      const mkRow = (labelText, done) => {
        const row = document.createElement('div'); row.className = 'flex items-center';
        const label = document.createElement('span'); label.className = 'w-32'; label.textContent = labelText;
        const barWrap = document.createElement('div'); barWrap.className = 'flex-1 h-4 bg-gray-300 rounded';
        const bar = document.createElement('div'); bar.className = 'h-full bg-green-500 rounded'; bar.style.width = done ? '100%' : '0%';
        barWrap.appendChild(bar);
        row.appendChild(label); row.appendChild(barWrap);
        return row;
      };

      const dasarRow = mkRow('Dasar:', !!progress[key]['dasar']);
      const menengahRow = mkRow('Menengah:', !!progress[key]['menengah']);
      const lanjutRow = mkRow('Lanjut:', !!progress[key]['lanjut']);

      container.appendChild(levelP);
      container.appendChild(dasarRow);
      container.appendChild(menengahRow);
      container.appendChild(lanjutRow);

      if (progress[key].evaluation && typeof progress[key].evaluation.score !== 'undefined') {
        const evalBox = document.createElement('div'); evalBox.className = 'mt-4 p-3 bg-blue-100 border-2 border-black rounded';
        const span = document.createElement('span'); span.className = 'font-bold'; span.textContent = `Evaluasi: ${progress[key].evaluation.score}/${progress[key].evaluation.total} (${progress[key].evaluation.percentage}%)`;
        evalBox.appendChild(span); container.appendChild(evalBox);
      }
    };

    renderBabProgress('bab4-progress', '4');
    renderBabProgress('bab5-progress', '5');
    renderBabProgress('bab6-progress', '6');
  }

  function showProgress() {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("placement-screen").classList.add("hidden");
    document.getElementById("learning-screen").classList.add("hidden");
    document.getElementById("evaluation-screen").classList.add("hidden");
    document.getElementById("progress-screen").classList.remove("hidden");
    document.getElementById("about-screen").classList.add("hidden");
    saveUIState({ screen: 'progress' });
    const progress = getProgress();
    updateProgressUI(progress);
  }

  function showAbout() {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("placement-screen").classList.add("hidden");
    document.getElementById("learning-screen").classList.add("hidden");
    document.getElementById("evaluation-screen").classList.add("hidden");
    document.getElementById("progress-screen").classList.add("hidden");
    document.getElementById("about-screen").classList.remove("hidden");
    saveUIState({ screen: 'about' });
  }

  function confirmReset() {
    if (confirm('Apakah Anda yakin ingin menghapus semua progress pembelajaran? Tindakan ini tidak dapat dibatalkan.')) { resetProgress(); showHome(); }
  }

  function resetProgress() {
    localStorage.removeItem('mathProgress');
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 neo-brutal-green rounded-brutal p-4 text-white z-50';
    const p = document.createElement('p'); p.className = 'font-bold text-lg'; p.textContent = '✓ Progress berhasil direset!';
    successDiv.appendChild(p); document.body.appendChild(successDiv);
    setTimeout(()=>successDiv.remove(), 3000);
    updateBabStatus({}); updateProgress();
    if (!document.getElementById('progress-screen').classList.contains('hidden')) updateProgressUI({});
  }

  function toggleSolution(id) { const el = document.getElementById(id); if (el) el.classList.toggle('hidden'); }

  let currentSlide = 0;
  function changeSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-item');
    const buttons = document.querySelectorAll('.carousel-btn');
    slides.forEach(s => s.classList.add('hidden'));
    if (slides[slideIndex]) slides[slideIndex].classList.remove('hidden');
    buttons.forEach((btn, idx) => {
      if (idx === slideIndex) { btn.classList.remove('bg-gray-300','text-gray-700'); btn.classList.add('bg-blue-500','text-white'); }
      else { btn.classList.remove('bg-blue-500','text-white'); btn.classList.add('bg-gray-300','text-gray-700'); }
    });
    currentSlide = slideIndex;
  }

  function scrollToTop() { window.scrollTo({ top: 0 }); }

  function checkAnswer(button, correctAnswer, babId) {
    const userAnswer = button.textContent;
    const isCorrect = typeof correctAnswer === 'number' ? parseInt(userAnswer) === correctAnswer : userAnswer === correctAnswer;
    if (isCorrect) {
      button.classList.remove('border-gray-400');
      button.classList.add('border-green-500','bg-green-200');
      button.disabled = true;
    } else {
      button.classList.remove('border-gray-400');
      button.classList.add('border-red-500','bg-red-200');
      setTimeout(()=>{ button.classList.remove('border-red-500','bg-red-200'); button.classList.add('border-gray-400'); }, 1000);
    }
    const container = button.closest('.bg-orange-100');
    if (!container) return;
    const allButtons = container.querySelectorAll('.answer-btn');
    const answeredButtons = container.querySelectorAll('.answer-btn:disabled');
    if (allButtons.length === answeredButtons.length) {
      const resultDiv = document.getElementById(`prerequisite-result-${babId}`);
      const correctCount = container.querySelectorAll('.answer-btn.border-green-500').length;
      if (resultDiv) {
        resultDiv.classList.remove('hidden');
        resultDiv.className = 'mt-4 text-center font-bold text-lg ' + (correctCount === allButtons.length ? 'text-green-600' : 'text-yellow-600');
        resultDiv.textContent = correctCount === allButtons.length ? '🎉 Semua benar! Kamu siap ke Level Menengah!' : `Benar ${correctCount}/${allButtons.length}. Terus berlatih!`;
      }
    }
  }

  async function checkEssayAnswer(button, babId, questionId) {
    const container = button.parentElement;
    const textarea = container.querySelector('textarea');
    const feedbackDiv = container.querySelector('.feedback');
    const userAnswer = (textarea?.value || '').trim();
    if (!userAnswer) { alert('Silakan isi jawaban dulu ya!'); return; }

    feedbackDiv.classList.remove('hidden');
    feedbackDiv.innerHTML = '';
    const loading = document.createElement('p'); loading.textContent = 'Memproses jawaban...'; feedbackDiv.appendChild(loading);

    setTimeout(()=>{
      feedbackDiv.innerHTML = '';
      const p = document.createElement('p');
      const strong = document.createElement('strong'); strong.textContent = 'Feedback: ';
      p.appendChild(strong);

      let text = '';
      if (babId === 4) {
        if (questionId === 1) text = userAnswer.includes('11x') ? 'Jawaban Anda benar! 4x + 7x = 11x.' : 'Jawaban Anda belum tepat. 4x + 7x = (4 + 7)x = 11x.';
        else if (questionId === 2) text = (userAnswer.includes('3x') && userAnswer.includes('12')) ? 'Benar! 3(x + 4) = 3x + 12.' : 'Belum tepat. Gunakan sifat distributif: 3(x + 4) = 3x + 12.';
        else if (questionId === 3) text = userAnswer.includes('13') ? 'Benar! 2x + 3 saat x=5 adalah 13.' : 'Belum tepat. Substitusikan x=5: 2(5)+3=13.';
      } else if (babId === 5) {
        if (questionId === 1) text = userAnswer.includes('75') ? 'Benar! 180° - 55° - 50° = 75°.' : 'Belum tepat. Jumlah sudut segitiga 180° → 75°.';
        else if (questionId === 2) text = userAnswer.includes('10') ? 'Benar! 2/t = 3/15 → t=10 m.' : 'Belum tepat. Gunakan perbandingan kesebangunan: t=10 m.';
        else if (questionId === 3) text = userAnswer.includes('4.8') ? 'Benar! Perbandingan sisi memberi DE = 20/7 ≈ 2.86 cm.' : 'Belum tepat. Gunakan perbandingan sisi segitiga sebangun.';
      } else if (babId === 6) {
        if (questionId === 1) text = userAnswer.includes('April') ? 'Benar! 7 GB pada bulan April.' : 'Perhatikan kembali diagram batang: cari 7 GB.';
        else if (questionId === 2) text = `Jawaban Anda: ${userAnswer}. Koreksi: 1) Numerik 2) Kategorik 3) Kategorik 4) Numerik`;
        else if (questionId === 3) text = 'Pastikan setiap kategori dihitung persentasenya dan proporsinya sesuai.';
      }
      const tp = document.createTextNode(text);
      p.appendChild(tp);
      feedbackDiv.appendChild(p);
    }, 800);
  }

  window.startBab = startBab;
  window.showHome = showHome;
  window.showProgress = showProgress;
  window.showAbout = showAbout;
  window.submitPlacement = submitPlacement;
  window.previousLevel = previousLevel;
  window.nextLevel = nextLevel;
  window.checkExercise = checkExercise;
  window.showEvaluation = showEvaluation;
  window.submitEvaluation = submitEvaluation;
  window.confirmReset = confirmReset;
  window.resetProgress = resetProgress;
  window.toggleSolution = toggleSolution;
  window.changeSlide = changeSlide;
  window.checkAnswer = checkAnswer;
  window.checkEssayAnswer = checkEssayAnswer;

  document.addEventListener('DOMContentLoaded', initApp);
})();