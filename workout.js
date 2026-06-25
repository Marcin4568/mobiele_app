// ===== WORKOUT PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    displayWorkoutHistory();
    displayPersonalRecords();
});

// ===== START NEW WORKOUT =====
function startNewWorkout() {
    navigateTo('training');
}

// ===== DISPLAY WORKOUT HISTORY =====
function displayWorkoutHistory() {
    const workoutHistory = JSON.parse(localStorage.getItem('workouts')) || [];
    const historyContainer = document.getElementById('workoutHistory');
    
    if (workoutHistory.length === 0) {
        historyContainer.innerHTML = '<p>' + (currentLanguage === 'nl' ? 'Geen workouts opgeslagen' : 'No workouts saved') + '</p>';
        return;
    }
    
    let html = '';
    workoutHistory.slice().reverse().forEach((workout, index) => {
        html += `
            <div class="workout-item">
                <h4>${workout.date}</h4>
                <p><strong>${currentLanguage === 'nl' ? 'Moeilijkheid:' : 'Difficulty:'}</strong> ${workout.difficulty}</p>
                <p><strong>${currentLanguage === 'nl' ? 'Oefeningen:' : 'Exercises:'}</strong> ${workout.exercises}</p>
                <p><strong>${currentLanguage === 'nl' ? 'Calorieën:' : 'Calories:'}</strong> ${workout.totalCalories}</p>
                <p><strong>${currentLanguage === 'nl' ? 'Duur:' : 'Duration:'}</strong> ${workout.duration} minuten</p>
            </div>
        `;
    });
    
    historyContainer.innerHTML = html;
}

// ===== DISPLAY PERSONAL RECORDS =====
function displayPersonalRecords() {
    const exerciseHistory = JSON.parse(localStorage.getItem('exerciseHistory')) || [];
    const prContainer = document.getElementById('personalRecords');
    
    if (exerciseHistory.length === 0) {
        prContainer.innerHTML = '<p>' + (currentLanguage === 'nl' ? 'Geen records opgeslagen' : 'No records saved') + '</p>';
        return;
    }
    
    // Group by exercise name and find max sets
    const records = {};
    exerciseHistory.forEach(exercise => {
        if (!records[exercise.name]) {
            records[exercise.name] = exercise;
        } else {
            if (parseInt(exercise.completedSets) > parseInt(records[exercise.name].completedSets)) {
                records[exercise.name] = exercise;
            }
        }
    });
    
    let html = '';
    Object.values(records).forEach(record => {
        html += `
            <div class="pr-item">
                <h4>${record.name}</h4>
                <p><strong>${currentLanguage === 'nl' ? 'Max Series:' : 'Max Sets:'}</strong> ${record.completedSets} / ${record.sets}</p>
                <p><strong>${currentLanguage === 'nl' ? 'Herhalingen:' : 'Reps:'}</strong> ${record.reps}</p>
                <p><strong>${currentLanguage === 'nl' ? 'Datum:' : 'Date:'}</strong> ${new Date(record.date).toLocaleDateString()}</p>
            </div>
        `;
    });
    
    prContainer.innerHTML = html;
}