let currentLevel = "easy";

const workouts = {
  monday: {
    name: "Push dag",
    exercises: {
      easy: ["10 push-ups", "20 sec plank"],
      medium: ["20 push-ups", "40 sec plank", "10 dips"],
      hard: ["40 push-ups", "1 min plank", "20 dips", "burpees"]
    }
  },

  tuesday: {
    name: "Cardio",
    exercises: {
      easy: ["10 min wandelen"],
      medium: ["20 min hardlopen"],
      hard: ["30 min hardlopen + sprint intervals"]
    }
  },

  wednesday: {
    name: "Rustdag",
    exercises: {
      easy: ["Rust & herstel"],
      medium: ["Lichte stretch"],
      hard: ["Actieve recovery + mobiliteit"]
    }
  },

  thursday: {
    name: "Leg day",
    exercises: {
      easy: ["10 squats", "10 lunges"],
      medium: ["20 squats", "20 lunges", "plank"],
      hard: ["50 squats", "40 lunges", "jump squats"]
    }
  },

  friday: {
    name: "Full body",
    exercises: {
      easy: ["lichte workout"],
      medium: ["full body circuit"],
      hard: ["intensieve HIIT training"]
    }
  },

  saturday: {
    name: "Rustdag",
    exercises: {
      easy: ["rust"],
      medium: ["wandeling"],
      hard: ["lichte training"]
    }
  },

  sunday: {
    name: "Flex dag",
    exercises: {
      easy: ["stretching"],
      medium: ["yoga"],
      hard: ["core training"]
    }
  }
};

// DAG OPHALEN
function getToday() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  return days[new Date().getDay()];
}

// LEVEL INSTELLEN
function setLevel(level) {
  currentLevel = level;
  renderTraining();
}

// RENDER TRAINING
function renderTraining() {
  const today = getToday();
  const data = workouts[today];

  const container = document.getElementById("trainingContainer");

  container.innerHTML = `
    <h3>${data.name}</h3>
    <ul>
      ${data.exercises[currentLevel]
        .map(ex => `<li onclick="completeExercise(this)">💪 ${ex}</li>`)
        .join("")}
    </ul>
  `;
}

// MARK AS DONE
function completeExercise(el) {
  el.style.textDecoration = "line-through";
  el.style.opacity = "0.5";
}

// START
renderTraining();