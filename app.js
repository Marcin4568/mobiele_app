let goal = localStorage.getItem("goal") || "";

window.onload = function () {
  loadGoal();
  loadProgress();
};

function saveGoal() {
  const input = document.getElementById("goalInput").value;
  if (!input) return;

  localStorage.setItem("goal", input);
  loadGoal();
}

function deleteGoal() {
  localStorage.removeItem("goal");
  document.getElementById("goalText").innerText = "Nog geen doel";
}

function loadGoal() {
  const g = localStorage.getItem("goal");
  if (g) document.getElementById("goalText").innerText = g;
}

function loadProgress() {
  let data = JSON.parse(localStorage.getItem("workouts")) || [];

  const weekData = getThisWeek(data);

  let total = 5;
  let percent = (weekData / total) * 100;

  document.getElementById("progressText").innerText =
    `${weekData} van ${total} trainingen gedaan`;

  document.getElementById("progressFill").style.width =
    percent + "%";
}

function getThisWeek(data) {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 7);

  return data.filter(w => {
    let d = new Date(w.date);
    return w.done && d >= start;
  }).length;
}