// State
let currentBab = null;
let currentLevel = null;
let placementAnswers = {};
let evaluationAnswers = {};

// Data (questions remain as data; content HTML will be loaded from templates)
const placementTests = {
  4: [
    { question: "Manakah operasi perkalian yang sesuai dengan 3 + 3 + 3 + 3 + 3?", options: [
      { text: "5 x 3", correct: true },
      { text: "3 x 5", correct: false },
      { text: "5 x 5", correct: false },
      { text: "3 : 5", correct: false },
    ]},
    { question: "Bentuk yang sama dengan 3 x (3 + 4) adalah …", options: [
      { text: "3:3 + 3:7", correct: false },
      { text: "3 x 3 - 3 x 4", correct: false },
      { text: "4 x 4 + 3 x 3", correct: false },
      { text: "3 x 3 + 3 x 4", correct: true },
    ]},
    { question: "Bentuk yang sama dengan 7 x 2 - 7 x 6 adalah …", options: [
      { text: "7 x 2 + 7x 6", correct: false },
      { text: "2 x (7 - 6)", correct: false },
      { text: "7 x (2 - 6)", correct: true },
      { text: "6 x 7", correct: false },
    ]},
    { question: "FPB dari 24 dan 12 adalah …", options: [
      { text: "12", correct: true },
      { text: "24", correct: false },
      { text: "2", correct: false },
      { text: "6", correct: false },
    ]},
    { question: "5 x (-2) = …", options: [
      { text: "-7", correct: false },
      { text: "10", correct: false },
      { text: "-10", correct: true },
      { text: "7", correct: false },
    ]},
    { question: "-½ + 4 = …", options: [
      { text: "¼", correct: false },
      { text: "2/4", correct: false },
      { text: "¾", correct: true },
      { text: "1", correct: false },
    ]},
  ],
  5: [
    { question: "DIketahui sudut a dan b saling berpenyiku, a = 30 derajat, berapakah b?", options: [
      { text: "50", correct: false },
      { text: "60", correct: true },
      { text: "70", correct: false },
      { text: "80", correct: false },
    ]},
    { question: "Diketahui sudut p dan q saling berpelurus, p = 20 derajat, berapakah q?", options: [
      { text: "140", correct: false },
      { text: "150", correct: false },
      { text: "160", correct: true },
      { text: "170", correct: false },
    ]},
    { question: "Bentuk yang senilai dengan ⅔ adalah…", options: [
      { text: "6/9", correct: true },
      { text: "⅓", correct: false },
      { text: "2/7", correct: false },
      { text: "4/3", correct: false },
    ]},
    { question: "FPB dari 8 dan 14 adalah …", options: [
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ]},
    { question: "KPK dari 4 dan 6 adalah …", options: [
      { text: "10", correct: false },
      { text: "14", correct: false },
      { text: "12", correct: true },
      { text: "13", correct: false },
    ]},
  ],
  6: [
    { question: "Berapakah 20% dari 80?", options: [
      { text: "40", correct: false },
      { text: "60", correct: false },
      { text: "16", correct: true },
      { text: "20", correct: false },
    ]},
    { question: "½ + ¼ + ¼ = …", options: [
      { text: "⅔", correct: false },
      { text: "¾", correct: false },
      { text: "1", correct: true },
      { text: "2", correct: false },
    ]},
    { question: "Bentuk persen dari ⅖ adalah …", options: [
      { text: "30", correct: false },
      { text: "40", correct: true },
      { text: "50", correct: false },
      { text: "60", correct: false },
    ]},
    { question: "Diketahui semua siswa memilih satu jenis buah yang berbeda, 12 siswa suka apel, 14 suka jeruk, dan 11 suka mangga. Berapakah jumlah siswa?", options: [
      { text: "26", correct: false },
      { text: "25", correct: false },
      { text: "36", correct: false },
      { text: "37", correct: true },
    ]},
    { question: "Diketahui total siswa kelas D sebanyak 29, banyak siswa laki-laki 14 siswa. Berapakah banyak siswi perempuan?", options: [
      { text: "43", correct: false },
      { text: "14", correct: false },
      { text: "15", correct: true },
      { text: "14", correct: false },
    ]},
  ],
};

const evaluationTests = {
  4: [
    { question: "Sederhanakan bentuk aljabar: (2x + 3y) + (4x - 2y)", options: [
      { text: "6x + y", correct: true },
      { text: "6x + 5y", correct: false },
      { text: "2x + y", correct: false },
      { text: "2x + 5y", correct: false },
    ]},
    { question: "Faktorkan bentuk aljabar: x² - 9", options: [
      { text: "(x - 3)(x + 3)", correct: true },
      { text: "(x - 9)(x + 1)", correct: false },
      { text: "(x - 3)²", correct: false },
      { text: "x(x - 9)", correct: false },
    ]},
    { question: "Jika x + y = 10 dan x - y = 4, maka nilai x adalah...", options: [
      { text: "3", correct: false },
      { text: "7", correct: true },
      { text: "10", correct: false },
      { text: "14", correct: false },
    ]},
    { question: "Hasil dari (x + 2)² adalah...", options: [
      { text: "x² + 4", correct: false },
      { text: "x² + 4x + 4", correct: true },
      { text: "x² + 2x + 4", correct: false },
      { text: "x² + 4x + 2", correct: false },
    ]},
    { question: "Sebuah persegi panjang memiliki panjang (2x + 3) cm dan lebar (x - 1) cm. Luasnya adalah...", options: [
      { text: "2x² + x - 3", correct: true },
      { text: "2x² + 5x - 3", correct: false },
      { text: "3x² + 2x - 3", correct: false },
      { text: "2x² - x - 3", correct: false },
    ]},
  ],
  5: [
    { question: "Dua segitiga ABC dan PQR sebangun. Jika AB = 6 cm, PQ = 9 cm, dan BC = 8 cm, panjang QR adalah...", options: [
      { text: "10 cm", correct: false },
      { text: "12 cm", correct: true },
      { text: "14 cm", correct: false },
      { text: "16 cm", correct: false },
    ]},
    { question: "Sebuah foto berukuran 4 cm × 6 cm akan diperbesar menjadi sebangun dengan ukuran 12 cm × ... cm", options: [
      { text: "16 cm", correct: false },
      { text: "18 cm", correct: true },
      { text: "20 cm", correct: false },
      { text: "24 cm", correct: false },
    ]},
    { question: "Pada segitiga sebangun, perbandingan sisi-sisi yang bersesuaian adalah 3:5. Jika keliling segitiga pertama 24 cm, keliling segitiga kedua adalah...", options: [
      { text: "30 cm", correct: false },
      { text: "35 cm", correct: false },
      { text: "40 cm", correct: true },
      { text: "45 cm", correct: false },
    ]},
    { question: "Sebuah peta memiliki skala 1:250.000. Jarak dua kota di peta 8 cm, jarak sebenarnya adalah...", options: [
      { text: "20 km", correct: true },
      { text: "25 km", correct: false },
      { text: "30 km", correct: false },
      { text: "35 km", correct: false },
    ]},
    { question: "Dua segitiga sebangun memiliki perbandingan luas 4:9. Perbandingan sisi-sisi yang bersesuaian adalah...", options: [
      { text: "2:3", correct: true },
      { text: "4:9", correct: false },
      { text: "1:3", correct: false },
      { text: "3:5", correct: false },
    ]},
  ],
  6: [
    { question: "Dalam sebuah kelas, nilai rata-rata matematika adalah 75. Jika ada 30 siswa, jumlah nilai semua siswa adalah...", options: [
      { text: "2150", correct: false },
      { text: "2250", correct: true },
      { text: "2350", correct: false },
      { text: "2450", correct: false },
    ]},
    { question: "Median dari data 5, 7, 8, 10, 12, 15, 18 adalah...", options: [
      { text: "8", correct: false },
      { text: "10", correct: true },
      { text: "12", correct: false },
      { text: "15", correct: false },
    ]},
    { question: "Modus dari data 2, 3, 4, 4, 5, 5, 5, 6, 7, 7 adalah...", options: [
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "7", correct: false },
    ]},
    { question: "Dalam survei preferensi warna, 40% menyukai merah, 30% biru, 20% hijau, dan 10% kuning. Diagram yang paling tepat adalah...", options: [
      { text: "Diagram batang", correct: false },
      { text: "Diagram lingkaran", correct: true },
      { text: "Diagram garis", correct: false },
      { text: "Peta", correct: false },
    ]},
    { question: "Jangkauan dari data 12, 15, 18, 22, 25, 28, 30 adalah...", options: [
      { text: "12", correct: false },
      { text: "16", correct: false },
      { text: "18", correct: true },
      { text: "20", correct: false },
    ]},
  ],
};

// Utility: fetch and inject lesson template by bab and level id
async function loadLessonTemplate(bab, level) {
  const map = {
    dasar: `templates/bab${bab}-dasar.html`,
    menengah: `templates/bab${bab}-menengah.html`,
    lanjut: `templates/bab${bab}-lanjut.html`,
  };
  const url = map[level];
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Gagal memuat template: ${url}`);
  return await res.text();
}

// Initialize app
function initApp() {
  const savedProgress = localStorage.getItem("mathProgress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    updateProgressUI(progress);
    updateBabStatus(progress);
  } else {
    updateBabStatus({});
  }
}

// Navigation between screens
function showHome() {
  toggleScreens({ home: true });
}
function showProgress() {
  toggleScreens({ progress: true });
  const progress = getProgress();
  updateProgressUI(progress);
}
function showAbout() { toggleScreens({ about: true }); }

function toggleScreens(target) {
  const map = {
    home: "home-screen",
    placement: "placement-screen",
    learning: "learning-screen",
    evaluation: "evaluation-screen",
    progress: "progress-screen",
    about: "about-screen",
  };
  for (const key of Object.keys(map)) {
    const el = document.getElementById(map[key]);
    if (!el) continue;
    if (target[key]) el.classList.remove("hidden");
    else el.classList.add("hidden");
  }
}

// Start BAB
function startBab(bab) {
  currentBab = bab;
  const progress = getProgress();
  if (progress[bab] && progress[bab].level) {
    showLearning(bab, progress[bab].level);
  } else {
    startPlacement(bab);
  }
}

// Placement
function startPlacement(bab) {
  currentBab = bab;
  placementAnswers = {};
  toggleScreens({ placement: true });
  const container = document.getElementById("placement-questions");
  container.innerHTML = "";
  const questions = placementTests[bab];
  questions.forEach((q, idx) => {
    const outer = document.createElement("div");
    outer.className = "neo-brutal rounded-brutal p-6";
    outer.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Pertanyaan ${idx + 1}: ${q.question}</h3>
      <div class="space-y-3">
        ${q.options.map((opt, oi) => `
          <label class="flex items-center space-x-3 cursor-pointer">
            <input type="radio" name="q${idx}" value="${oi}" class="w-5 h-5">
            <span>${opt.text}</span>
          </label>
        `).join("")}
      </div>
    `;
    container.appendChild(outer);
  });
}

function submitPlacement() {
  const questions = placementTests[currentBab];
  let score = 0;
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected) {
      const ansIdx = parseInt(selected.value);
      placementAnswers[idx] = ansIdx;
      if (q.options[ansIdx].correct) score++;
    }
  });
  let level;
  if (score >= questions.length * 0.8) level = "lanjut";
  else if (score >= questions.length * 0.5) level = "menengah";
  else level = "dasar";
  saveProgress(currentBab, level);
  showLearning(currentBab, level);
}

// Learning
async function showLearning(bab, level) {
  currentBab = bab;
  currentLevel = level;
  toggleScreens({ learning: true });
  document.getElementById("level-indicator").textContent = `BAB ${bab} - Level ${level.toUpperCase()}`;
  updateJourneyMap(bab, level);
  await loadContent(bab, level);
  updateProgress();
}

async function loadContent(bab, level) {
  const contentArea = document.getElementById("content-area");
  contentArea.innerHTML = `<div class=\"text-center py-8\">Memuat konten...</div>`;
  try {
    const html = await loadLessonTemplate(bab, level);
    contentArea.innerHTML = html;
    // After injecting HTML, trigger MathJax typesetting if available
    if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
      MathJax.typesetPromise([contentArea]).catch(() => {});
    }
    // Inject GeoGebra applets if placeholders exist
    setupGeoGebraIfPresent();
  } catch (e) {
    contentArea.innerHTML = `<div class=\"neo-brutal-red rounded-brutal p-4 text-white\">${e.message}</div>`;
  }
}

function updateJourneyMap(bab, level) {
  const journeyMap = document.getElementById("journey-map");
  const levels = ["dasar", "menengah", "lanjut"];
  const names = { dasar: "Dasar", menengah: "Menengah", lanjut: "Lanjut" };
  journeyMap.innerHTML = "";
  const progress = getProgress();
  levels.forEach((lvl, i) => {
    const step = document.createElement("div");
    step.className = "journey-step";
    if (lvl === level) step.classList.add("active");
    if (progress[bab] && progress[bab][lvl]) step.classList.add("completed");
    step.innerHTML = `
      <div class="flex items-center">
        <div class="journey-dot">${i + 1}</div>
        <div class="ml-4 font-bold">${names[lvl]}</div>
      </div>`;
    journeyMap.appendChild(step);
  });
}

// Exercise checker: expects a container with inputs having name="exercise" and data-correct attributes
function checkExercise() {
  const selected = document.querySelector('input[name="exercise"]:checked');
  const resultDiv = document.getElementById("exercise-result");
  if (!selected) {
    alert("Pilih jawaban terlebih dahulu!");
    return;
  }
  const isCorrect = selected.dataset.correct === "true";
  if (isCorrect) {
    resultDiv.className = "neo-brutal-green rounded-brutal p-4 mt-4";
    resultDiv.innerHTML = '<p class="font-bold text-lg">Jawaban BENAR! 🎉</p>';
    const progress = getProgress();
    if (!progress[currentBab]) progress[currentBab] = {};
    progress[currentBab][currentLevel] = true;
    saveProgressData(progress);
    updateProgress();
    updateJourneyMap(currentBab, currentLevel);
  } else {
    resultDiv.className = "neo-brutal-red rounded-brutal p-4 mt-4 text-white";
    resultDiv.innerHTML = '<p class="font-bold text-lg">Jawaban SALAH. Coba lagi! 🤔</p>';
  }
  resultDiv.classList.remove("hidden");
}

// Dasar short answer checker: expects #answer{n} and #feedback{n}
function checkDasarExercise(questionNum, correctAnswer) {
  const input = document.getElementById(`answer${questionNum}`);
  const feedbackDiv = document.getElementById(`feedback${questionNum}`);
  if (!input || !feedbackDiv) return;
  const user = (input.value || "").trim();
  const ok = (user.toLowerCase() === String(correctAnswer).toLowerCase());
  if (ok) {
    feedbackDiv.className = "mt-2 p-2 bg-green-100 border-2 border-green-500 rounded";
    feedbackDiv.innerHTML = "<p class='text-green-700 font-bold'>✓ Jawaban benar!</p>";
  } else {
    feedbackDiv.className = "mt-2 p-2 bg-red-100 border-2 border-red-500 rounded";
    feedbackDiv.innerHTML = "<p class='text-red-700 font-bold'>✗ Jawaban salah. Coba lagi!</p>";
  }
  feedbackDiv.classList.remove("hidden");
}

// Multiple choice prerequisite checker: marks buttons with .answer-btn
function checkAnswer(button, correctAnswer) {
  const userAnswer = button.textContent.trim();
  const isCorrect = typeof correctAnswer === "number"
    ? parseInt(userAnswer) === correctAnswer
    : userAnswer === correctAnswer;
  if (isCorrect) {
    button.classList.remove("border-gray-400");
    button.classList.add("border-green-500", "bg-green-200");
    button.disabled = true;
  } else {
    button.classList.remove("border-gray-400");
    button.classList.add("border-red-500", "bg-red-200");
    setTimeout(() => {
      button.classList.remove("border-red-500", "bg-red-200");
      button.classList.add("border-gray-400");
    }, 1000);
  }
  const allButtons = document.querySelectorAll(".answer-btn");
  const answeredButtons = document.querySelectorAll(".answer-btn:disabled");
  if (allButtons.length === answeredButtons.length) {
    const resultDiv = document.getElementById("prerequisite-result");
    const correctCount = document.querySelectorAll(".answer-btn.border-green-500").length;
    if (resultDiv) {
      if (correctCount === allButtons.length) {
        resultDiv.textContent = "🎉 Semua benar! Anda siap untuk Level Menengah!";
        resultDiv.className = "mt-4 text-center font-bold text-lg text-green-600";
      } else {
        resultDiv.textContent = `Benar ${correctCount}/${allButtons.length}. Terus berlatih!`;
        resultDiv.className = "mt-4 text-center font-bold text-lg text-yellow-600";
      }
      resultDiv.classList.remove("hidden");
    }
  }
}

// Essay (simple keyword scoring based on bab)
function submitEssay(bab) {
  const essayInput = document.getElementById("essay-answer");
  const feedbackDiv = document.getElementById("essay-feedback");
  if (!essayInput || !feedbackDiv) return;
  const essayAnswer = (essayInput.value || "").trim().toLowerCase();
  if (!essayAnswer) {
    feedbackDiv.className = "mt-3 p-3 bg-yellow-100 border-2 border-yellow-500 rounded";
    feedbackDiv.innerHTML = "<p class='text-yellow-700 font-bold'>⚠️ Silakan tulis jawaban terlebih dahulu!</p>";
    feedbackDiv.classList.remove("hidden");
    return;
  }
  let score = 0; let feedback = "";
  if (bab === 4) {
    if (essayAnswer.includes("luas") && essayAnswer.includes("aljabar")) score += 30;
    if (essayAnswer.includes("(x+3)(x-1)") || essayAnswer.includes("x²+2x-3") || essayAnswer.includes("x^2+2x-3")) score += 40;
    if (essayAnswer.includes("x=5") && (essayAnswer.includes("35") || essayAnswer.includes("32"))) score += 30;
    if (score >= 70) {
      feedback = "<p class='text-green-700 font-bold'>✓ Jawaban sangat baik!</p><p>Anda telah dengan benar menghitung luas dalam bentuk aljabar dan menghitung nilai saat x=5. Penjelasan Anda jelas dan terstruktur.</p>";
    } else if (score >= 40) {
      feedback = "<p class='text-yellow-700 font-bold'>⚠️ Jawaban cukup baik</p><p>Anda telah memahami konsep dasar, namun perlu lebih teliti dalam perhitungan. Pastikan rumus luas yang digunakan sudah benar.</p>";
    } else {
      feedback = "<p class='text-red-700 font-bold'>✗ Jawaban perlu diperbaiki</p><p>Anda perlu memahami kembali konsep luas persegi panjang dalam bentuk aljabar. Luas = (x+3)(x-1) = x²+2x-3. Saat x=5, luas = 32 cm².</p>";
    }
  } else if (bab === 5) {
    if (essayAnswer.includes("skala") && essayAnswer.includes("jarak")) score += 30;
    if (essayAnswer.includes("8") && essayAnswer.includes("250.000")) score += 40;
    if (essayAnswer.includes("20") || essayAnswer.includes("kilometer")) score += 30;
    if (score >= 70) {
      feedback = "<p class='text-green-700 font-bold'>✓ Jawaban sangat baik!</p><p>Anda telah dengan benar menerapkan konsep skala peta untuk menghitung jarak sebenarnya. Perhitungan dan penjelasan Anda akurat.</p>";
    } else if (score >= 40) {
      feedback = "<p class='text-yellow-700 font-bold'>⚠️ Jawaban cukup baik</p><p>Anda telah memahami konsep dasar skala, namun perlu lebih teliti dalam perhitungan dan konversi satuan.</p>";
    } else {
      feedback = "<p class='text-red-700 font-bold'>✗ Jawaban perlu diperbaiki</p><p>Jarak sebenarnya = 8 cm × 250.000 = 2.000.000 cm = 20 km.</p>";
    }
  } else if (bab === 6) {
    if (essayAnswer.includes("matematika") && essayAnswer.includes("40%")) score += 20;
    if (essayAnswer.includes("bahasa") && essayAnswer.includes("30%")) score += 20;
    if (essayAnswer.includes("ipa") && essayAnswer.includes("30%")) score += 20;
    if (essayAnswer.includes("20") || essayAnswer.includes("15")) score += 20;
    if (essayAnswer.includes("diagram") || essayAnswer.includes("lingkaran")) score += 20;
    if (score >= 70) {
      feedback = "<p class='text-green-700 font-bold'>✓ Jawaban sangat baik!</p><p>Anda telah menghitung jumlah siswa untuk setiap mata pelajaran dan menjelaskan diagram lingkaran dengan benar.</p>";
    } else if (score >= 40) {
      feedback = "<p class='text-yellow-700 font-bold'>⚠️ Jawaban cukup baik</p><p>Anda memahami konsep persentase; perbaiki penjelasan pembuatan diagram.</p>";
    } else {
      feedback = "<p class='text-red-700 font-bold'>✗ Jawaban perlu diperbaiki</p><p>Matematika: 20 siswa, Bahasa Indonesia: 15, IPA: 15. Buat diagram lingkaran sesuai proporsi.</p>";
    }
  }
  feedbackDiv.className = "mt-3 p-3 bg-blue-50 border-2 border-blue-500 rounded";
  feedbackDiv.innerHTML = feedback + `<p class="mt-2 text-sm text-gray-600"><i>Simulasi AI - Score: ${score}/100</i></p>`;
  feedbackDiv.classList.remove("hidden");
}

// Evaluation
function showEvaluation(bab) {
  currentBab = bab;
  evaluationAnswers = {};
  toggleScreens({ evaluation: true });
  const questions = evaluationTests[bab];
  const container = document.getElementById("evaluation-questions");
  container.innerHTML = "";
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "neo-brutal rounded-brutal p-6";
    div.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Soal ${idx + 1}: ${q.question}</h3>
      <div class="space-y-3">
        ${q.options.map((opt, oi) => `
          <label class="flex items-center space-x-3 cursor-pointer">
            <input type="radio" name="eq${idx}" value="${oi}" class="w-5 h-5">
            <span>${opt.text}</span>
          </label>
        `).join("")}
      </div>`;
    container.appendChild(div);
  });
}

function submitEvaluation() {
  const questions = evaluationTests[currentBab];
  let score = 0;
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="eq${idx}"]:checked`);
    if (selected) {
      const ansIdx = parseInt(selected.value);
      evaluationAnswers[idx] = ansIdx;
      if (q.options[ansIdx].correct) score++;
    }
  });
  const percentage = Math.round((score / questions.length) * 100);
  const resultDiv = document.getElementById("evaluation-result");
  resultDiv.classList.remove("hidden");
  let resultClass, resultText, resultEmoji;
  if (percentage >= 80) {
    resultClass = "neo-brutal-green rounded-brutal p-6";
    resultText = "LUAR BIASA! Anda telah menguasai materi ini dengan sangat baik.";
    resultEmoji = "🎉👏";
  } else if (percentage >= 60) {
    resultClass = "neo-brutal-yellow rounded-brutal p-6";
    resultText = "BAIK! Anda telah memahami materi ini dengan cukup baik.";
    resultEmoji = "👍😊";
  } else {
    resultClass = "neo-brutal-red rounded-brutal p-6 text-white";
    resultText = "Belajar lagi! Anda perlu memperdalam pemahaman materi ini.";
    resultEmoji = "📚💪";
  }
  resultDiv.className = resultClass;
  resultDiv.innerHTML = `
    <div class="text-4xl mb-4">${resultEmoji}</div>
    <h3 class="text-2xl font-bold mb-2">HASIL EVALUASI</h3>
    <p class="text-xl mb-2">Skor: ${score}/${questions.length} (${percentage}%)</p>
    <p class="text-lg">${resultText}</p>
    <div class="mt-6 flex justify-center space-x-4">
      <button onclick="showLearning('${currentBab}', 'dasar')" class="btn-brutal bg-white text-black px-6 py-3">ULANGI MATERI</button>
      <button onclick="showHome()" class="btn-brutal neo-brutal-yellow text-black px-6 py-3">KEMBALI</button>
    </div>`;
  const progress = getProgress();
  if (!progress[currentBab]) progress[currentBab] = {};
  progress[currentBab].evaluation = { score, total: questions.length, percentage };
  saveProgressData(progress);
}

// Inserted: GeoGebra setup to inject applets when placeholders exist
function setupGeoGebraIfPresent() {
  if (typeof GGBApplet === 'undefined') return;
  const applet1 = document.getElementById('ggbApplet');
  if (applet1) {
    const params1 = {
      id: 'ggbApplet',
      width: 800,
      height: 400,
      showMenuBar: false,
      showAlgebraInput: false,
      showToolBar: false,
      showFullscreenButton: true,
      language: 'en',
      material_id: 'px7d7qz5'
    };
    try { new GGBApplet(params1, '5.0', { AV:0, SV:0, CV:0, EV2:0, CP:0, PC:0, DA:0, FI:0, macro:0 }).inject('ggbApplet'); } catch(_) {}
  }
  const applet2 = document.getElementById('ggbApplet2');
  if (applet2) {
    const params2 = {
      id: 'ggbApplet2',
      width: 800,
      height: 400,
      showMenuBar: false,
      showAlgebraInput: false,
      showToolBar: false,
      showFullscreenButton: true,
      language: 'en',
      material_id: 'wkC2wGgK'
    };
    try { new GGBApplet(params2, '5.0', { AV:0, SV:0, CV:0, EV2:0, CP:0, PC:0, DA:0, FI:0, macro:0 }).inject('ggbApplet2'); } catch(_) {}
  }
}

// Progress persistence
function getProgress() {
  const saved = localStorage.getItem("mathProgress");
  return saved ? JSON.parse(saved) : {};
}
function saveProgress(bab, level) {
  const progress = getProgress();
  if (!progress[bab]) progress[bab] = {};
  progress[bab].level = level;
  saveProgressData(progress);
  updateBabStatus(progress);
}
function saveProgressData(data) { localStorage.setItem("mathProgress", JSON.stringify(data)); }

function updateProgress() {
  const progress = getProgress();
  let completed = 0;
  let total = 0;
  ["4", "5", "6"].forEach((bab) => {
    if (progress[bab]) {
      ["dasar", "menengah", "lanjut"].forEach((level) => {
        total++;
        if (progress[bab][level]) completed++;
      });
    }
  });
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pf = document.getElementById("progress-fill");
  const pt = document.getElementById("progress-text");
  if (pf) pf.style.width = `${percentage}%`;
  if (pt) pt.textContent = `${percentage}%`;
}

function updateBabStatus(progress) {
  const setStatus = (id, val, startedColor = "text-green-600") => {
    const el = document.getElementById(id);
    if (!el) return;
    if (val && val.level) {
      el.innerHTML = `<span class="${startedColor} p-2 rounded bg-white bg-opacity-70">Level: ${val.level.toUpperCase()}</span>`;
    } else {
      el.innerHTML = `<span class="text-red-600 p-2 rounded bg-white bg-opacity-70">Belum dimulai</span>`;
    }
  };
  setStatus("bab4-status", progress["4"]);
  setStatus("bab5-status", progress["5"], "text-green-600");
  setStatus("bab6-status", progress["6"], "text-green-600");
}

function updateProgressUI(progress) {
  const fill = (rootId, key) => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const evaluation = (progress[key] || {}).evaluation || {};
    root.innerHTML = `
      <div class="mb-2"><span class="font-bold">Level: ${(progress[key] && progress[key].level) || "Belum ditentukan"}</span></div>
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="w-32">Dasar:</span>
          <div class="flex-1 h-4 bg-gray-300 rounded">
            <div class="h-full bg-green-500 rounded" style="width: ${(progress[key] && progress[key]["dasar"]) ? "100%" : "0%"}"></div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="w-32">Menengah:</span>
          <div class="flex-1 h-4 bg-gray-300 rounded">
            <div class="h-full bg-green-500 rounded" style="width: ${(progress[key] && progress[key]["menengah"]) ? "100%" : "0%"}"></div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="w-32">Lanjut:</span>
          <div class="flex-1 h-4 bg-gray-300 rounded">
            <div class="h-full bg-green-500 rounded" style="width: ${(progress[key] && progress[key]["lanjut"]) ? "100%" : "0%"}"></div>
          </div>
        </div>
        ${evaluation.score !== undefined ? `
          <div class="mt-4 p-3 bg-blue-100 border-2 border-black rounded">
            <span class="font-bold">Evaluasi: ${evaluation.score}/${evaluation.total} (${evaluation.percentage}%)</span>
          </div>` : ""}
      </div>`;
  };
  fill("bab4-progress", "4");
  fill("bab5-progress", "5");
  fill("bab6-progress", "6");
}

// Reset
function confirmReset() {
  if (confirm("Apakah Anda yakin ingin menghapus semua progress pembelajaran? Tindakan ini tidak dapat dibatalkan.")) {
    resetProgress();
  }
}
function resetProgress() {
  localStorage.removeItem("mathProgress");
  const successDiv = document.createElement("div");
  successDiv.className = "fixed top-4 right-4 neo-brutal-green rounded-brutal p-4 text-white z-50";
  successDiv.innerHTML = '<p class="font-bold text-lg">✓ Progress berhasil direset!</p>';
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
  updateBabStatus({});
  updateProgress();
  if (!document.getElementById("progress-screen").classList.contains("hidden")) {
    updateProgressUI({});
  }
}

// Level navigation
function previousLevel() {
  const levels = ["dasar", "menengah", "lanjut"];
  const i = levels.indexOf(currentLevel);
  if (i > 0) showLearning(currentBab, levels[i - 1]);
  else showHome();
}
function nextLevel() {
  const levels = ["dasar", "menengah", "lanjut"];
  const i = levels.indexOf(currentLevel);
  if (i < levels.length - 1) showLearning(currentBab, levels[i + 1]);
  else showEvaluation(currentBab);
}

// Expose functions to global for inline handlers
window.showHome = showHome;
window.showProgress = showProgress;
window.showAbout = showAbout;
window.startBab = startBab;
window.submitPlacement = submitPlacement;
window.checkExercise = checkExercise;
window.checkDasarExercise = checkDasarExercise;
window.checkAnswer = checkAnswer;
window.submitEssay = submitEssay;
window.showEvaluation = showEvaluation;
window.submitEvaluation = submitEvaluation;
window.confirmReset = confirmReset;
window.previousLevel = previousLevel;
window.nextLevel = nextLevel;

// Boot
document.addEventListener("DOMContentLoaded", initApp);