// =========================
// ELEMENTEN
// =========================
const daysContainer = document.getElementById("daysContainer");
const todayDay = document.getElementById("todayDay");
const todayWorkout = document.getElementById("todayWorkout");
const exerciseBox = document.getElementById("exerciseBox");

const startTrainingBtn = document.getElementById("startTrainingBtn");
const nextExerciseBtn = document.getElementById("nextExerciseBtn");
const finishWorkoutBtn = document.getElementById("finishWorkoutBtn");
const resetWorkoutBtn = document.getElementById("resetWorkoutBtn");
const langBtn = document.getElementById("langBtn");

// =========================
// SAFETY CHECK
// =========================
if (!startTrainingBtn || !nextExerciseBtn || !finishWorkoutBtn || !resetWorkoutBtn) {
  console.error("❌ Knoppen niet gevonden. Check je HTML IDs.");
}

// =========================
// TAAL
// =========================
let currentLang = localStorage.getItem("language") || "nl";

const i18n = {
  nl: {
    weekTitle: "Workout overzicht",
    trainingTitle: "Training van vandaag",
    today: "Vandaag",
    pressStart: "Druk op start om te beginnen",
    start: "Start training",
    next: "Volgende oefening",
    finish: "Training afronden",
    reset: "Opnieuw doen",
    noExercises: "Rustdag",
    allDone: "Alle oefeningen klaar",
    completed: "Training afgerond 💪",
    done: "Done",
    missed: "Niet gedaan",
    rest: "Rust"
  },
  en: {
    weekTitle: "Workout overview",
    trainingTitle: "Today's workout",
    today: "Today",
    pressStart: "Press start to begin",
    start: "Start workout",
    next: "Next exercise",
    finish: "Finish workout",
    reset: "Restart workout",
    noExercises: "Rest day",
    allDone: "All exercises done",
    completed: "Workout completed 💪",
    done: "Done",
    missed: "Missed",
    rest: "Rest"
  }
};

function t(key) {
  return i18n[currentLang][key];
}

// =========================
// TRAINING DATA
// =========================
const weeklyTraining = {
  Ma: { name: "Borst & Triceps", exercises: [
    { name: "Bench Press", sets: 4, reps: 8 },
    { name: "Incline Press", sets: 3, reps: 10 }
  ]},
  Di: { name: "Rug & Biceps", exercises: [
    { name: "Lat Pulldown", sets: 4, reps: 10 }
  ]},
  Wo: { name: "Benen", exercises: [
    { name: "Squat", sets: 4, reps: 8 }
  ]},
  Do: { name: "Schouders", exercises: [
    { name: "Shoulder Press", sets: 4, reps: 8 }
  ]},
  Vr: { name: "Full Body", exercises: [
    { name: "Deadlift", sets: 4, reps: 6 }
  ]},
  Za: { name: "Cardio", exercises: [
    { name: "Hardlopen", duration: "20 min" }
  ]},
  Zo: { name: "Rustdag", exercises: [] }
};

const todayMap = {
  0: "Zo", 1: "Ma", 2: "Di", 3: "Wo",
  4: "Do", 5: "Vr", 6: "Za"
};

const todayShort = todayMap[new Date().getDay()];
const todayTraining = weeklyTraining[todayShort];

// =========================
// STORAGE
// =========================
function getWorkoutStatus() {
  return JSON.parse(localStorage.getItem("workouts")) || {};
}

function saveWorkoutStatus(data) {
  localStorage.setItem("workouts", JSON.stringify(data));
}

function getActiveWorkout() {
  return JSON.parse(localStorage.getItem("activeWorkout")) || null;
}

function saveActiveWorkout(data) {
  localStorage.setItem("activeWorkout", JSON.stringify(data));
}

function clearActiveWorkout() {
  localStorage.removeItem("activeWorkout");
}

// =========================
// WEEK OVERVIEW
// =========================
function renderWeekOverview() {
  const status = getWorkoutStatus();
  daysContainer.innerHTML = "";

  Object.keys(weeklyTraining).forEach(day => {
    if (!status[day]) {
      status[day] = weeklyTraining[day].exercises.length === 0 ? "rest" : "missed";
    }

    let text = status[day];
    if (status[day] === "done") text = t("done");
    if (status[day] === "missed") text = t("missed");
    if (status[day] === "rest") text = t("rest");

    const card = document.createElement("div");
    card.className = "day-card";
    card.innerHTML = `
      <strong>${day}</strong><br>
      <small>${weeklyTraining[day].name}</small>
      <div>${text}</div>
    `;

    daysContainer.appendChild(card);
  });

  saveWorkoutStatus(status);
}

// =========================
// EXERCISE
// =========================
function renderExercise(ex, i, total) {
  let meta = "";
  if (ex.sets) meta += `<p>Sets: ${ex.sets}</p>`;
  if (ex.reps) meta += `<p>Reps: ${ex.reps}</p>`;
  if (ex.duration) meta += `<p>Duur: ${ex.duration}</p>`;

  exerciseBox.innerHTML = `
    <h3>${ex.name}</h3>
    ${meta}
    <small>${i + 1} / ${total}</small>
  `;
}

// =========================
// STATE
// =========================
function renderTrainingState() {
  todayDay.textContent = `${t("today")}: ${todayShort}`;
  todayWorkout.textContent = todayTraining.name;

  const active = getActiveWorkout();

  startTrainingBtn.disabled = false;
  nextExerciseBtn.disabled = true;
  finishWorkoutBtn.disabled = true;

  if (todayTraining.exercises.length === 0) {
    exerciseBox.innerHTML = `<p>${t("noExercises")}</p>`;
    return;
  }

  if (!active || active.day !== todayShort) {
    exerciseBox.innerHTML = `<p>${t("pressStart")}</p>`;
    return;
  }

  if (active.finished) {
    exerciseBox.innerHTML = `<p>${t("completed")}</p>`;
    return;
  }

  if (active.currentExerciseIndex >= todayTraining.exercises.length) {
    exerciseBox.innerHTML = `<p>${t("allDone")}</p>`;
    finishWorkoutBtn.disabled = false;
    return;
  }

  const ex = todayTraining.exercises[active.currentExerciseIndex];
  renderExercise(ex, active.currentExerciseIndex, todayTraining.exercises.length);

  startTrainingBtn.disabled = true;
  nextExerciseBtn.disabled = false;
  finishWorkoutBtn.disabled = false;
}

// =========================
// BUTTONS
// =========================

// START
startTrainingBtn.addEventListener("click", () => {
  saveActiveWorkout({
    day: todayShort,
    currentExerciseIndex: 0,
    finished: false
  });

  const status = getWorkoutStatus();
  status[todayShort] = "active";
  saveWorkoutStatus(status);

  renderWeekOverview();
  renderTrainingState();
});

// NEXT
nextExerciseBtn.addEventListener("click", () => {
  const active = getActiveWorkout();
  if (!active) return;

  active.currentExerciseIndex++;
  saveActiveWorkout(active);

  renderTrainingState();
});

// FINISH
finishWorkoutBtn.addEventListener("click", () => {
  const active = getActiveWorkout();
  if (!active) return;

  active.finished = true;
  saveActiveWorkout(active);

  const status = getWorkoutStatus();
  status[todayShort] = "done";
  saveWorkoutStatus(status);

  renderWeekOverview();
  renderTrainingState();
});

// RESET
resetWorkoutBtn.addEventListener("click", () => {
  clearActiveWorkout();

  const status = getWorkoutStatus();
  status[todayShort] = "missed";
  saveWorkoutStatus(status);

  renderWeekOverview();
  renderTrainingState();
});

// =========================
// TAAL
// =========================
function applyLanguage() {
  document.getElementById("weekTitle").textContent = t("weekTitle");
  document.getElementById("trainingTitle").textContent = t("trainingTitle");

  startTrainingBtn.textContent = t("start");
  nextExerciseBtn.textContent = t("next");
  finishWorkoutBtn.textContent = t("finish");
  resetWorkoutBtn.textContent = t("reset");

  langBtn.textContent = currentLang === "nl" ? "EN" : "NL";
}

// SWITCH
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "nl" ? "en" : "nl";
  localStorage.setItem("language", currentLang);
  applyLanguage();
});

// =========================
// INIT
// =========================
applyLanguage();
renderWeekOverview();
renderTrainingState();