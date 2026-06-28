"use strict";

const storageKeys = {
  entries: "fitfocus.entries",
  nutrition: "fitfocus.nutrition",
  settings: "fitfocus.settings",
  language: "fitfocus.language"
};

const defaultNutrition = {
  carbs: 250,
  protein: 140,
  fat: 70,
  kcal: 2190
};

const defaultSettings = {
  bodyWeight: 75,
  weeklyWorkouts: 4,
  weeklyMinutes: 180
};

const translations = {
  nl: {
    language: "Taal",
    home: "Home",
    train: "Trainen",
    progress: "Progressie",
    nutrition: "Voeding",
    settings: "Instellingen",
    todayFocus: "Vandaag",
    homeTitle: "Jouw fitness voortgang",
    homeIntro: "Bekijk je weekdoel, log een gezondheidsonderdeel en ga direct door naar je progressie.",
    viewProgress: "Bekijk progressie",
    weekGoal: "Weekdoel",
    currentProgress: "Huidige progressie",
    workouts: "Trainingen",
    minutes: "Minuten",
    kcal: "Kcal",
    lastSevenDays: "Laatste 7 dagen",
    trainingTrend: "Trainingstrend",
    quickAdd: "Snel toevoegen",
    healthPart: "Gezondheidsonderdeel",
    date: "Datum",
    category: "Categorie",
    training: "Training",
    weight: "Gewicht",
    cardio: "Conditie",
    description: "Omschrijving",
    descriptionExample: "Bijv. borsttraining of lunch",
    value: "Waarde",
    unit: "Eenheid",
    saveEntry: "Opslaan",
    recent: "Recent",
    latestItems: "Laatste onderdelen",
    noEntries: "Nog geen onderdelen opgeslagen.",
    strengthPlan: "Krachtplan",
    trainingTitle: "Start een training",
    trainingIntro: "Kies een spiergroep, start de sessie en sla je minuten en kcal direct op.",
    muscleGroups: "Spiergroepen",
    chooseMuscle: "Kies je focus",
    selectedWorkout: "Gekozen training",
    plannedMinutes: "Geplande minuten",
    effort: "Intensiteit",
    light: "Licht",
    normal: "Normaal",
    heavy: "Zwaar",
    trainingNote: "Notitie",
    trainingNoteExample: "Bijv. meer gewicht bij bench press",
    startTraining: "Start training",
    finishSave: "Afronden en opslaan",
    overview: "Overzicht",
    progressTitle: "Progressie per periode",
    progressIntro: "Filter je opgeslagen gezondheidsonderdelen per dag, week of maand.",
    day: "Dag",
    week: "Week",
    month: "Maand",
    items: "Onderdelen",
    trainingMinutes: "Trainingsminuten",
    burnedKcal: "Verbrande kcal",
    protein: "Eiwitten",
    visual: "Visualisatie",
    activityChart: "Activiteit",
    storedData: "Opgeslagen data",
    periodItems: "Onderdelen in periode",
    noPeriodEntries: "Geen onderdelen voor deze periode.",
    nutritionPlan: "Voedingsplan",
    nutritionTitle: "Macro's en kcal aanpassen",
    nutritionIntro: "Stel je koolhydraten, vetten, eiwitten en kcal in en log maaltijden in LocalStorage.",
    targets: "Doelen",
    dailyTargets: "Dagelijkse voedingsdoelen",
    carbs: "Koolhydraten",
    fat: "Vetten",
    calculatedKcal: "Berekend uit macro's",
    saveTargets: "Doelen opslaan",
    mealLog: "Maaltijdlog",
    addMeal: "Maaltijd toevoegen",
    mealExample: "Bijv. havermout ontbijt",
    carbsShort: "Kh",
    proteinShort: "Eiwit",
    fatShort: "Vet",
    kcalOptional: "Kcal optioneel",
    autoKcal: "Automatisch berekend",
    saveMeal: "Maaltijd opslaan",
    today: "Vandaag",
    nutritionProgress: "Voedingsprogressie",
    preferences: "Voorkeuren",
    settingsTitle: "Instellingen",
    settingsIntro: "Pas taal, doelen en profielwaarden aan voor je berekeningen.",
    languageSwitch: "Taalswitch",
    chooseLanguage: "Kies taal",
    profile: "Profiel",
    calculationSettings: "Berekeningen",
    bodyWeight: "Lichaamsgewicht",
    weeklyWorkouts: "Weektrainingen",
    weeklyMinutes: "Weekminuten",
    saveSettings: "Instellingen opslaan",
    offline: "Offline",
    pwaStatus: "PWA status",
    storage: "Opslag",
    localStorage: "LocalStorage actief",
    serviceWorker: "Service worker",
    installApp: "Installeren",
    data: "Data",
    resetData: "Gegevens resetten",
    resetAll: "Alles verwijderen",
    active: "Actief",
    unavailableOnFile: "Alleen via server",
    saved: "Opgeslagen",
    deleted: "Verwijderd",
    confirmDelete: "Weet je zeker dat je dit onderdeel wilt verwijderen?",
    confirmReset: "Weet je zeker dat je alle FitFocus data wilt verwijderen?",
    chest: "Borst",
    legs: "Benen",
    back: "Rug",
    arms: "Armen",
    shoulders: "Schouders",
    core: "Core",
    fullBody: "Full body",
    chestHint: "Duwen, stabiliteit en kracht",
    legsHint: "Squat, lunge en explosiviteit",
    backHint: "Trekken, houding en grip",
    armsHint: "Biceps, triceps en volume",
    shouldersHint: "Press, controle en balans",
    coreHint: "Buikspieren en rompstijfheid",
    fullBodyHint: "Compound oefeningen",
    benchPress: "Bench press 4 x 8",
    inclinePushup: "Incline push-up 3 x 12",
    cableFly: "Cable fly 3 x 12",
    squat: "Squat 4 x 8",
    romanianDeadlift: "Romanian deadlift 3 x 10",
    calfRaise: "Calf raise 3 x 15",
    latPulldown: "Lat pulldown 4 x 10",
    dumbbellRow: "Dumbbell row 3 x 10",
    facePull: "Face pull 3 x 12",
    bicepsCurl: "Biceps curl 3 x 12",
    tricepsPushdown: "Triceps pushdown 3 x 12",
    hammerCurl: "Hammer curl 3 x 10",
    shoulderPress: "Shoulder press 4 x 8",
    lateralRaise: "Lateral raise 3 x 12",
    rearDeltFly: "Rear delt fly 3 x 12",
    plank: "Plank 3 x 45 sec",
    deadBug: "Dead bug 3 x 10",
    hangingKneeRaise: "Hanging knee raise 3 x 10",
    deadlift: "Deadlift 4 x 5",
    pullup: "Pull-up 3 x max",
    gobletSquat: "Goblet squat 3 x 12"
  },
  en: {
    language: "Language",
    home: "Home",
    train: "Train",
    progress: "Progress",
    nutrition: "Nutrition",
    settings: "Settings",
    todayFocus: "Today",
    homeTitle: "Your fitness progress",
    homeIntro: "See your weekly goal, log a health item and jump straight to your progress.",
    viewProgress: "View progress",
    weekGoal: "Weekly goal",
    currentProgress: "Current progress",
    workouts: "Workouts",
    minutes: "Minutes",
    kcal: "Kcal",
    lastSevenDays: "Last 7 days",
    trainingTrend: "Training trend",
    quickAdd: "Quick add",
    healthPart: "Health item",
    date: "Date",
    category: "Category",
    training: "Training",
    weight: "Weight",
    cardio: "Fitness",
    description: "Description",
    descriptionExample: "E.g. chest workout or lunch",
    value: "Value",
    unit: "Unit",
    saveEntry: "Save",
    recent: "Recent",
    latestItems: "Latest items",
    noEntries: "No items saved yet.",
    strengthPlan: "Strength plan",
    trainingTitle: "Start a workout",
    trainingIntro: "Choose a muscle group, start the session and save your minutes and kcal.",
    muscleGroups: "Muscle groups",
    chooseMuscle: "Choose focus",
    selectedWorkout: "Selected workout",
    plannedMinutes: "Planned minutes",
    effort: "Intensity",
    light: "Light",
    normal: "Normal",
    heavy: "Heavy",
    trainingNote: "Note",
    trainingNoteExample: "E.g. more weight on bench press",
    startTraining: "Start workout",
    finishSave: "Finish and save",
    overview: "Overview",
    progressTitle: "Progress by period",
    progressIntro: "Filter your saved health items by day, week or month.",
    day: "Day",
    week: "Week",
    month: "Month",
    items: "Items",
    trainingMinutes: "Training minutes",
    burnedKcal: "Burned kcal",
    protein: "Protein",
    visual: "Visual",
    activityChart: "Activity",
    storedData: "Stored data",
    periodItems: "Items in period",
    noPeriodEntries: "No items for this period.",
    nutritionPlan: "Nutrition plan",
    nutritionTitle: "Adjust macros and kcal",
    nutritionIntro: "Set carbohydrates, fats, protein and kcal and log meals in LocalStorage.",
    targets: "Targets",
    dailyTargets: "Daily nutrition targets",
    carbs: "Carbs",
    fat: "Fats",
    calculatedKcal: "Calculated from macros",
    saveTargets: "Save targets",
    mealLog: "Meal log",
    addMeal: "Add meal",
    mealExample: "E.g. oatmeal breakfast",
    carbsShort: "Carbs",
    proteinShort: "Prot",
    fatShort: "Fat",
    kcalOptional: "Optional kcal",
    autoKcal: "Calculated automatically",
    saveMeal: "Save meal",
    today: "Today",
    nutritionProgress: "Nutrition progress",
    preferences: "Preferences",
    settingsTitle: "Settings",
    settingsIntro: "Adjust language, goals and profile values for your calculations.",
    languageSwitch: "Language switch",
    chooseLanguage: "Choose language",
    profile: "Profile",
    calculationSettings: "Calculations",
    bodyWeight: "Body weight",
    weeklyWorkouts: "Weekly workouts",
    weeklyMinutes: "Weekly minutes",
    saveSettings: "Save settings",
    offline: "Offline",
    pwaStatus: "PWA status",
    storage: "Storage",
    localStorage: "LocalStorage active",
    serviceWorker: "Service worker",
    installApp: "Install",
    data: "Data",
    resetData: "Reset data",
    resetAll: "Delete everything",
    active: "Active",
    unavailableOnFile: "Server only",
    saved: "Saved",
    deleted: "Deleted",
    confirmDelete: "Are you sure you want to delete this item?",
    confirmReset: "Are you sure you want to delete all FitFocus data?",
    chest: "Chest",
    legs: "Legs",
    back: "Back",
    arms: "Arms",
    shoulders: "Shoulders",
    core: "Core",
    fullBody: "Full body",
    chestHint: "Push strength and stability",
    legsHint: "Squat, lunge and power",
    backHint: "Pulling, posture and grip",
    armsHint: "Biceps, triceps and volume",
    shouldersHint: "Pressing, control and balance",
    coreHint: "Abs and trunk stability",
    fullBodyHint: "Compound exercises",
    benchPress: "Bench press 4 x 8",
    inclinePushup: "Incline push-up 3 x 12",
    cableFly: "Cable fly 3 x 12",
    squat: "Squat 4 x 8",
    romanianDeadlift: "Romanian deadlift 3 x 10",
    calfRaise: "Calf raise 3 x 15",
    latPulldown: "Lat pulldown 4 x 10",
    dumbbellRow: "Dumbbell row 3 x 10",
    facePull: "Face pull 3 x 12",
    bicepsCurl: "Biceps curl 3 x 12",
    tricepsPushdown: "Triceps pushdown 3 x 12",
    hammerCurl: "Hammer curl 3 x 10",
    shoulderPress: "Shoulder press 4 x 8",
    lateralRaise: "Lateral raise 3 x 12",
    rearDeltFly: "Rear delt fly 3 x 12",
    plank: "Plank 3 x 45 sec",
    deadBug: "Dead bug 3 x 10",
    hangingKneeRaise: "Hanging knee raise 3 x 10",
    deadlift: "Deadlift 4 x 5",
    pullup: "Pull-up 3 x max",
    gobletSquat: "Goblet squat 3 x 12"
  }
};

const muscles = [
  { id: "chest", nameKey: "chest", hintKey: "chestHint", met: 5.3, exercises: ["benchPress", "inclinePushup", "cableFly"] },
  { id: "legs", nameKey: "legs", hintKey: "legsHint", met: 6.0, exercises: ["squat", "romanianDeadlift", "calfRaise"] },
  { id: "back", nameKey: "back", hintKey: "backHint", met: 5.8, exercises: ["latPulldown", "dumbbellRow", "facePull"] },
  { id: "arms", nameKey: "arms", hintKey: "armsHint", met: 4.5, exercises: ["bicepsCurl", "tricepsPushdown", "hammerCurl"] },
  { id: "shoulders", nameKey: "shoulders", hintKey: "shouldersHint", met: 5.0, exercises: ["shoulderPress", "lateralRaise", "rearDeltFly"] },
  { id: "core", nameKey: "core", hintKey: "coreHint", met: 4.2, exercises: ["plank", "deadBug", "hangingKneeRaise"] },
  { id: "fullBody", nameKey: "fullBody", hintKey: "fullBodyHint", met: 6.5, exercises: ["deadlift", "pullup", "gobletSquat"] }
];

let selectedMuscleId = "chest";
let activeSessionStart = null;
let timerInterval = null;
let deferredInstallPrompt = null;
let currentPeriod = "day";

document.addEventListener("DOMContentLoaded", () => {
  setDefaultDates();
  applyLanguage(getLanguage());
  activateNavigation();
  registerServiceWorker();
  wireLanguageSelectors();
  wireInstallPrompt();
  initPage();
});

function initPage() {
  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "training") initTrainingPage();
  if (page === "progress") initProgressPage();
  if (page === "nutrition") initNutritionPage();
  if (page === "settings") initSettingsPage();
}

function getLanguage() {
  return localStorage.getItem(storageKeys.language) || "nl";
}

function t(key) {
  const language = getLanguage();
  return translations[language][key] || translations.nl[key] || key;
}

function applyLanguage(language) {
  localStorage.setItem(storageKeys.language, language);
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.value = language;
  });

  if (document.body.dataset.page === "training") renderTrainingPlan();
  if (document.body.dataset.page === "home") renderHome();
  if (document.body.dataset.page === "progress") renderProgress();
  if (document.body.dataset.page === "nutrition") renderNutritionProgress();
  updateServiceWorkerStatus();
}

function wireLanguageSelectors() {
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.addEventListener("change", (event) => {
      applyLanguage(event.target.value);
    });
  });
}

function activateNavigation() {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === page);
  });
}

function setDefaultDates() {
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    if (!input.value) input.value = todayISO();
  });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getEntries() {
  return loadJSON(storageKeys.entries, []);
}

function saveEntries(entries) {
  saveJSON(storageKeys.entries, entries);
}

function addEntry(entry) {
  const entries = getEntries();
  const newEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
    ...entry
  };
  entries.unshift(newEntry);
  saveEntries(entries);
  return newEntry;
}

function deleteEntry(entryId) {
  const entries = getEntries().filter((entry) => entry.id !== entryId);
  saveEntries(entries);
  renderCurrentPage();
}

function getNutritionTargets() {
  return { ...defaultNutrition, ...loadJSON(storageKeys.nutrition, defaultNutrition) };
}

function getSettings() {
  return { ...defaultSettings, ...loadJSON(storageKeys.settings, defaultSettings) };
}

function renderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "progress") renderProgress();
  if (page === "nutrition") renderNutritionProgress();
}

function initHomePage() {
  const form = document.querySelector("#quickEntryForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    addEntry({
      date: formData.get("date"),
      category: formData.get("category"),
      description: formData.get("description") || t(formData.get("category")),
      value: Number(formData.get("value")),
      unit: formData.get("unit"),
      meta: {}
    });
    form.reset();
    setDefaultDates();
    renderHome();
  });
  renderHome();
}

function renderHome() {
  const entries = getEntries();
  const settings = getSettings();
  const weekEntries = entries.filter((entry) => isInPeriod(entry.date, "week"));
  const trainingEntries = weekEntries.filter((entry) => entry.category === "training");
  const minutes = sum(trainingEntries.map((entry) => getEntryMinutes(entry)));
  const kcal = sum(trainingEntries.map((entry) => getEntryKcal(entry)));
  const workoutGoal = Math.max(settings.weeklyWorkouts, 1);
  const minuteGoal = Math.max(settings.weeklyMinutes, 1);
  const progress = Math.min(100, Math.round(((trainingEntries.length / workoutGoal) + (minutes / minuteGoal)) * 50));

  setText("#homeProgressPercent", `${progress}%`);
  setText("#homeWorkoutCount", trainingEntries.length);
  setText("#homeMinutes", Math.round(minutes));
  setText("#homeKcal", Math.round(kcal));

  const bar = document.querySelector("#homeProgressBar");
  if (bar) bar.style.width = `${progress}%`;

  renderEntryList("#homeRecentList", entries.slice(0, 5), t("noEntries"), false);
  renderBarChart("#homeTrendChart", buildLastDaysSeries(7), { label: t("minutes"), color: "#1c7c54" });
}

function initTrainingPage() {
  const startButton = document.querySelector("#startTrainingButton");
  const form = document.querySelector("#trainingForm");

  renderMuscleGrid();
  renderTrainingPlan();

  startButton?.addEventListener("click", () => {
    activeSessionStart = Date.now();
    startTimer();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const muscle = muscles.find((item) => item.id === selectedMuscleId) || muscles[0];
    const settings = getSettings();
    const plannedMinutes = Number(document.querySelector("#trainingMinutes")?.value || 45);
    const elapsedMinutes = activeSessionStart ? Math.max(1, Math.round((Date.now() - activeSessionStart) / 60000)) : 0;
    const minutes = Math.max(elapsedMinutes, plannedMinutes);
    const effort = document.querySelector("#trainingEffort")?.value || "normal";
    const kcal = calculateWorkoutKcal(minutes, muscle.met, settings.bodyWeight, effort);
    const note = document.querySelector("#trainingNote")?.value.trim();

    addEntry({
      date: document.querySelector("#trainingDate")?.value || todayISO(),
      category: "training",
      description: note || t(muscle.nameKey),
      value: minutes,
      unit: "min",
      meta: {
        muscle: muscle.id,
        muscleNameKey: muscle.nameKey,
        effort,
        kcal,
        minutes
      }
    });

    stopTimer();
    form.reset();
    setDefaultDates();
    document.querySelector("#trainingMinutes").value = 45;
    document.querySelector("#trainingEffort").value = "normal";
  });
}

function renderMuscleGrid() {
  const grid = document.querySelector("#muscleGrid");
  if (!grid) return;
  grid.innerHTML = "";

  muscles.forEach((muscle) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "muscle-card";
    button.dataset.muscle = muscle.id;
    button.innerHTML = `<strong>${t(muscle.nameKey)}</strong><span>${t(muscle.hintKey)}</span>`;
    button.addEventListener("click", () => {
      selectedMuscleId = muscle.id;
      renderMuscleGrid();
      renderTrainingPlan();
    });
    button.classList.toggle("is-active", muscle.id === selectedMuscleId);
    grid.append(button);
  });
}

function renderTrainingPlan() {
  renderMuscleGrid();
  const muscle = muscles.find((item) => item.id === selectedMuscleId) || muscles[0];
  setText("#selectedMuscleTitle", t(muscle.nameKey));

  const list = document.querySelector("#exerciseList");
  if (!list) return;
  list.innerHTML = "";
  muscle.exercises.forEach((exerciseKey) => {
    const item = document.createElement("li");
    item.textContent = t(exerciseKey);
    list.append(item);
  });
}

function startTimer() {
  stopTimer(false);
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 1000);
}

function stopTimer(reset = true) {
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = null;
  if (reset) {
    activeSessionStart = null;
    setText("#sessionTimer", "00:00");
  }
}

function updateTimer() {
  if (!activeSessionStart) return;
  const elapsed = Math.floor((Date.now() - activeSessionStart) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  setText("#sessionTimer", `${minutes}:${seconds}`);
}

function calculateWorkoutKcal(minutes, met, bodyWeight, effort) {
  const effortFactor = { light: 0.85, normal: 1, heavy: 1.18 }[effort] || 1;
  return Math.round(met * effortFactor * 3.5 * bodyWeight / 200 * minutes);
}

function initProgressPage() {
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPeriod = button.dataset.period;
      document.querySelectorAll("[data-period]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderProgress();
    });
  });
  renderProgress();
}

function renderProgress() {
  const periodEntries = getEntries().filter((entry) => isInPeriod(entry.date, currentPeriod));
  const trainingEntries = periodEntries.filter((entry) => entry.category === "training");
  const minutes = sum(trainingEntries.map((entry) => getEntryMinutes(entry)));
  const kcal = sum(periodEntries.map((entry) => getEntryKcal(entry)));
  const protein = sum(periodEntries.map((entry) => Number(entry.meta?.protein || 0)));

  setText("#progressItemCount", periodEntries.length);
  setText("#progressMinutes", Math.round(minutes));
  setText("#progressKcal", Math.round(kcal));
  setText("#progressProtein", `${Math.round(protein)}g`);

  renderBarChart("#progressChart", buildPeriodSeries(currentPeriod), { label: t("trainingMinutes"), color: "#2f6fed" });
  renderEntryList("#progressList", periodEntries, t("noPeriodEntries"), true);
}

function initNutritionPage() {
  const targets = getNutritionTargets();
  setValue("#targetCarbs", targets.carbs);
  setValue("#targetProtein", targets.protein);
  setValue("#targetFat", targets.fat);
  setValue("#targetKcal", targets.kcal);
  updateMacroResult();

  ["#targetCarbs", "#targetProtein", "#targetFat"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", updateMacroResult);
  });

  document.querySelector("#nutritionTargetForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveJSON(storageKeys.nutrition, {
      carbs: numberFrom("#targetCarbs"),
      protein: numberFrom("#targetProtein"),
      fat: numberFrom("#targetFat"),
      kcal: numberFrom("#targetKcal")
    });
    renderNutritionProgress();
  });

  document.querySelector("#mealForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const carbs = numberFrom("#mealCarbs");
    const protein = numberFrom("#mealProtein");
    const fat = numberFrom("#mealFat");
    const kcal = numberFrom("#mealKcal") || calculateMacroKcal(carbs, protein, fat);
    const description = document.querySelector("#mealDescription")?.value.trim() || t("nutrition");

    addEntry({
      date: document.querySelector("#mealDate")?.value || todayISO(),
      category: "nutrition",
      description,
      value: kcal,
      unit: "kcal",
      meta: { carbs, protein, fat, kcal }
    });

    event.target.reset();
    setDefaultDates();
    setValue("#mealCarbs", 0);
    setValue("#mealProtein", 0);
    setValue("#mealFat", 0);
    renderNutritionProgress();
  });

  renderNutritionProgress();
}

function updateMacroResult() {
  const kcal = calculateMacroKcal(numberFrom("#targetCarbs"), numberFrom("#targetProtein"), numberFrom("#targetFat"));
  setText("#macroKcalResult", `${kcal} kcal`);
}

function calculateMacroKcal(carbs, protein, fat) {
  return Math.round((carbs * 4) + (protein * 4) + (fat * 9));
}

function renderNutritionProgress() {
  const targets = getNutritionTargets();
  const todayMeals = getEntries().filter((entry) => entry.category === "nutrition" && isInPeriod(entry.date, "day"));
  const totals = {
    carbs: sum(todayMeals.map((entry) => Number(entry.meta?.carbs || 0))),
    protein: sum(todayMeals.map((entry) => Number(entry.meta?.protein || 0))),
    fat: sum(todayMeals.map((entry) => Number(entry.meta?.fat || 0))),
    kcal: sum(todayMeals.map((entry) => Number(entry.meta?.kcal || entry.value || 0)))
  };

  setText("#todayCarbs", `${Math.round(totals.carbs)}g`);
  setText("#todayProtein", `${Math.round(totals.protein)}g`);
  setText("#todayFat", `${Math.round(totals.fat)}g`);
  setText("#todayNutritionKcal", Math.round(totals.kcal));

  setBar("#todayCarbsBar", totals.carbs, targets.carbs);
  setBar("#todayProteinBar", totals.protein, targets.protein);
  setBar("#todayFatBar", totals.fat, targets.fat);
  setBar("#todayKcalBar", totals.kcal, targets.kcal);
}

function initSettingsPage() {
  const settings = getSettings();
  setValue("#bodyWeight", settings.bodyWeight);
  setValue("#weeklyWorkouts", settings.weeklyWorkouts);
  setValue("#weeklyMinutes", settings.weeklyMinutes);
  updateServiceWorkerStatus();

  document.querySelector("#settingsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveJSON(storageKeys.settings, {
      bodyWeight: numberFrom("#bodyWeight"),
      weeklyWorkouts: numberFrom("#weeklyWorkouts"),
      weeklyMinutes: numberFrom("#weeklyMinutes")
    });
  });

  document.querySelector("#resetAllButton")?.addEventListener("click", () => {
    if (!confirm(t("confirmReset"))) return;
    localStorage.removeItem(storageKeys.entries);
    localStorage.removeItem(storageKeys.nutrition);
    localStorage.removeItem(storageKeys.settings);
    setValue("#bodyWeight", defaultSettings.bodyWeight);
    setValue("#weeklyWorkouts", defaultSettings.weeklyWorkouts);
    setValue("#weeklyMinutes", defaultSettings.weeklyMinutes);
  });
}

function renderEntryList(selector, entries, emptyText, allowDelete) {
  const list = document.querySelector(selector);
  if (!list) return;
  list.classList.toggle("empty-state", entries.length === 0);
  list.innerHTML = "";

  if (entries.length === 0) {
    list.textContent = emptyText;
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "entry-item";
    const title = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = entry.description || t(entry.category);
    const meta = document.createElement("p");
    meta.textContent = `${formatDate(entry.date)} · ${t(entry.category) || entry.category} · ${entry.value} ${entry.unit}`;
    title.append(heading, meta);
    item.append(title);

    if (allowDelete) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "delete-entry";
      button.setAttribute("aria-label", t("deleted"));
      button.textContent = "X";
      button.addEventListener("click", () => deleteEntry(entry.id));
      item.append(button);
    }

    list.append(item);
  });
}

function buildLastDaysSeries(days) {
  const labels = [];
  const today = startOfDay(new Date());
  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const iso = date.toISOString().slice(0, 10);
    labels.push({
      label: date.toLocaleDateString(getLanguage() === "nl" ? "nl-NL" : "en-US", { weekday: "short" }),
      value: getTrainingMinutesForDate(iso)
    });
  }
  return labels;
}

function buildPeriodSeries(period) {
  if (period === "day") {
    return getEntries()
      .filter((entry) => isInPeriod(entry.date, "day"))
      .filter((entry) => entry.category === "training")
      .slice(0, 6)
      .reverse()
      .map((entry) => ({ label: entry.description.slice(0, 8), value: getEntryMinutes(entry) }));
  }
  if (period === "week") return buildLastDaysSeries(7);
  return buildLastDaysSeries(30).filter((_, index) => index % 3 === 0);
}

function renderBarChart(selector, series, options) {
  const canvas = document.querySelector(selector);
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);

  const padding = 34;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(10, ...series.map((item) => item.value));

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#dfe6ef";
  context.lineWidth = 1;

  for (let line = 0; line <= 4; line += 1) {
    const y = padding + (chartHeight / 4) * line;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  if (series.length === 0) {
    context.fillStyle = "#657085";
    context.font = "16px Segoe UI, sans-serif";
    context.fillText(t("noEntries"), padding, height / 2);
    return;
  }

  const gap = 10;
  const barWidth = Math.max(10, (chartWidth - gap * (series.length - 1)) / series.length);
  context.font = "13px Segoe UI, sans-serif";
  context.textAlign = "center";

  series.forEach((item, index) => {
    const x = padding + index * (barWidth + gap);
    const barHeight = Math.round((item.value / maxValue) * (chartHeight - 20));
    const y = padding + chartHeight - barHeight;

    context.fillStyle = options.color;
    context.fillRect(x, y, barWidth, barHeight);
    context.fillStyle = "#657085";
    context.fillText(item.label, x + barWidth / 2, height - 10);
  });
}

function getTrainingMinutesForDate(isoDate) {
  return sum(
    getEntries()
      .filter((entry) => entry.category === "training" && entry.date === isoDate)
      .map((entry) => getEntryMinutes(entry))
  );
}

function getEntryMinutes(entry) {
  if (entry.unit === "min") return Number(entry.value || 0);
  return Number(entry.meta?.minutes || 0);
}

function getEntryKcal(entry) {
  if (entry.unit === "kcal") return Number(entry.value || 0);
  return Number(entry.meta?.kcal || 0);
}

function isInPeriod(isoDate, period) {
  const date = startOfDay(new Date(`${isoDate}T00:00:00`));
  const now = startOfDay(new Date());
  if (period === "day") return date.getTime() === now.getTime();
  if (period === "week") return date >= startOfWeek(now) && date <= endOfWeek(now);
  if (period === "month") return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  return false;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfWeek(date) {
  const copy = startOfDay(date);
  const day = copy.getDay() || 7;
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function endOfWeek(date) {
  const copy = startOfWeek(date);
  copy.setDate(copy.getDate() + 6);
  copy.setHours(23, 59, 59, 999);
  return copy;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(getLanguage() === "nl" ? "nl-NL" : "en-US", {
    day: "2-digit",
    month: "short"
  });
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setValue(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.value = value;
}

function numberFrom(selector) {
  return Number(document.querySelector(selector)?.value || 0);
}

function setBar(selector, value, target) {
  const element = document.querySelector(selector);
  if (!element) return;
  const percentage = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  element.style.width = `${percentage}%`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    updateServiceWorkerStatus();
    return;
  }

  if (location.protocol === "file:") {
    updateServiceWorkerStatus();
    return;
  }

  navigator.serviceWorker.register("./service-worker.js").then(updateServiceWorkerStatus).catch(updateServiceWorkerStatus);
}

function updateServiceWorkerStatus() {
  const status = document.querySelector("#serviceWorkerStatus");
  if (!status) return;
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    status.textContent = t("unavailableOnFile");
    return;
  }
  status.textContent = navigator.serviceWorker.controller ? t("active") : t("active");
}

function wireInstallPrompt() {
  const installButton = document.querySelector("#installButton");
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  installButton?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.hidden = true;
  });
}
