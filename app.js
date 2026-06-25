const goalText = document.getElementById("goalText");
const saveGoalBtn = document.getElementById("saveGoalBtn");

// 🔹 Load opgeslagen data bij starten
function loadGoal() {
  const savedGoal = localStorage.getItem("goal");
  if (savedGoal) {
    goalText.value = savedGoal;
  }
}

// 🔹 Opslaan functie
function saveGoal() {
  const value = goalText.value.trim();

  if (value === "") {
    alert("Je doelstelling is leeg!");
    return;
  }

  localStorage.setItem("goal", value);
  alert("Doelstelling opgeslagen!");
}

// 🔹 Event listener
saveGoalBtn.addEventListener("click", saveGoal);

// 🔹 Start
loadGoal();