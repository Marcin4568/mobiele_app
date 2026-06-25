let progress = 3;
let goal = localStorage.getItem("goal") || "";

// INIT
window.onload = function () {
  loadProgress();
  loadGoal();
  updateProgressUI();
};

// PROGRESS UI
function loadProgress() {
  document.getElementById("progressText").innerText =
    `${progress} van de 5 trainingen gedaan`;

  document.getElementById("progressFill").style.width =
    (progress / 5) * 100 + "%";
}

// DOEL OPSLAAN
function saveGoal() {
  const input = document.getElementById("goalInput").value;

  if (input.trim() === "") return;

  localStorage.setItem("goal", input);
  loadGoal();
}

// DOEL VERWIJDEREN
function deleteGoal() {
  localStorage.removeItem("goal");

  document.getElementById("goalText").innerText =
    "Nog geen doel ingesteld";

  document.getElementById("goalInput").value = "";
}

// DOEL LADEN
function loadGoal() {
  const saved = localStorage.getItem("goal");

  if (saved) {
    document.getElementById("goalText").innerText = saved;
  }
}

// TRAINING PAGINA
function goTraining() {
  window.location.href = "training.html";
}

// TAAL SWITCH (simpel maar werkend basis)
document.getElementById("languageSwitch").addEventListener("change", (e) => {
  const lang = e.target.value;

  if (lang === "en") {
    document.querySelector("h1").innerText = "Health App";
    document.getElementById("progressText").innerText =
      `${progress} of 5 workouts done`;
  } else {
    document.querySelector("h1").innerText = "Mijn Gezondheid";
    loadProgress();
  }
});