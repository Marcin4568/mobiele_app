let level = "easy";
let stepIndex = 0;
let started = false;

const plan = {
  monday: {
    name: "Push dag",
    steps: {
      easy: ["Warming-up", "10 push-ups", "Plank 20 sec"],
      medium: ["Warming-up", "20 push-ups", "Plank 40 sec", "dips"],
      hard: ["Intense warm-up", "40 push-ups", "1 min plank", "burpees"]
    }
  },
  tuesday: {
    name: "Cardio",
    steps: {
      easy: ["10 min wandelen"],
      medium: ["20 min joggen"],
      hard: ["30 min interval run"]
    }
  },
  wednesday: {
    name: "Core",
    steps: {
      easy: ["lichte core"],
      medium: ["abs training"],
      hard: ["intense core workout"]
    }
  }
};

function getToday() {
  return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()];
}

// START
document.getElementById("startBtn").addEventListener("click", () => {
  started = true;
  stepIndex = 0;

  document.getElementById("box").style.display = "block";
  loadStep();
});

// LEVEL
window.setLevel = function(lvl) {
  level = lvl;
  stepIndex = 0;
  if (started) loadStep();
};

// STEP
function loadStep() {
  const today = getToday();
  const data = plan[today] || plan.monday;

  document.getElementById("title").innerText = data.name;
  document.getElementById("step").innerText = data.steps[level][stepIndex];
}

// NEXT
document.getElementById("nextBtn").addEventListener("click", () => {
  const today = getToday();
  const data = plan[today];

  stepIndex++;

  if (stepIndex >= data.steps[level].length) {
    document.getElementById("step").innerText = "Training klaar 💪";
    saveWorkout();
    return;
  }

  loadStep();
});

// RESET
document.getElementById("resetBtn").addEventListener("click", () => {
  stepIndex = 0;
  loadStep();
});

// SAVE
function saveWorkout() {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][now.getDay()];

  let data = JSON.parse(localStorage.getItem("workout")) || [];

  let existing = data.find(w => w.date === date);

  if (!existing) {
    data.push({
      date,
      day,
      level,
      done: true
    });
  }

  localStorage.setItem("workout", JSON.stringify(data));
}