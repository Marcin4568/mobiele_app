const trainingPlans = {
    easy: [
        { name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
        { name: 'Squats', sets: 3, reps: 15, rest: 90 },
        { name: 'Planks', sets: 3, reps: 30, rest: 60 },
    ],
    medium: [
        { name: 'Barbell Bench Press', sets: 4, reps: 8, rest: 120 },
        { name: 'Squats', sets: 4, reps: 6, rest: 120 },
        { name: 'Bent Over Rows', sets: 4, reps: 8, rest: 120 },
    ],
    hard: [
        { name: 'Heavy Barbell Bench Press', sets: 5, reps: 5, rest: 180 },
        { name: 'Heavy Squats', sets: 5, reps: 3, rest: 180 },
        { name: 'Heavy Deadlifts', sets: 3, reps: 3, rest: 300 },
    ]
};

let currentDifficulty = null;
let currentExerciseIndex = 0;
let currentExercises = [];
let trainingInProgress = false;

document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
});

function selectDifficulty(difficulty) {
    currentDifficulty = difficulty;
    currentExerciseIndex = 0;
    currentExercises = trainingPlans[difficulty];
    
    document.getElementById('difficultySection').style.display = 'none';
    document.getElementById('workoutSection').style.display = 'block';
    
    displayExercise();
    trainingInProgress = true;
}

function displayExercise() {
    if (currentExerciseIndex >= currentExercises.length) {
        return;
    }
    
    const exercise = currentExercises[currentExerciseIndex];
    document.getElementById('exerciseName').textContent = exercise.name;
    document.getElementById('setsValue').textContent = exercise.sets;
    document.getElementById('repsValue').textContent = exercise.reps;
    document.getElementById('restValue').textContent = exercise.rest + 's';
    document.getElementById('exerciseCounter').textContent = `${currentExerciseIndex + 1} / ${currentExercises.length}`;
    document.getElementById('completedSets').value = '';
}

function nextExercise() {
    if (currentExerciseIndex < currentExercises.length - 1) {
        currentExerciseIndex++;
        displayExercise();
    }
}

function previousExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        displayExercise();
    }
}

function completeExercise() {
    const completedSets = document.getElementById('completedSets').value;
    if (completedSets) {
        if (currentExerciseIndex < currentExercises.length - 1) {
            nextExercise();
        } else {
            alert('Goed gedaan! Dit was de laatste oefening.');
        }
    } else {
        alert('Voer aub het aantal series in');
    }
}

function finishTraining() {
    const totalCalories = (currentExerciseIndex + 1) * (currentDifficulty === 'easy' ? 50 : currentDifficulty === 'medium' ? 100 : 150);
    
    const workout = {
        date: new Date().toISOString().split('T')[0],
        difficulty: currentDifficulty,
        exercises: currentExerciseIndex + 1,
        totalCalories: totalCalories,
    };
    
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    
    alert(`Training afgerond! ${totalCalories} calorieën verbrand.`);
    resetTraining();
}

function cancelTraining() {
    if (confirm('Weet je zeker dat je de training wilt annuleren?')) {
        resetTraining();
    }
}

function resetTraining() {
    currentDifficulty = null;
    currentExerciseIndex = 0;
    currentExercises = [];
    trainingInProgress = false;
    
    document.getElementById('workoutSection').style.display = 'none';
    document.getElementById('difficultySection').style.display = 'block';
}