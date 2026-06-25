document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    displayWorkoutHistory();
});

function startNewWorkout() {
    navigateTo('training');
}

function displayWorkoutHistory() {
    const workoutHistory = JSON.parse(localStorage.getItem('workouts')) || [];
    const historyContainer = document.getElementById('workoutHistory');
    
    if (workoutHistory.length === 0) {
        historyContainer.innerHTML = '<p>Geen workouts opgeslagen</p>';
        return;
    }
    
    let html = '';
    workoutHistory.slice().reverse().forEach((workout) => {
        html += `
            <div class="workout-item">
                <h4>${workout.date}</h4>
                <p><strong>Moeilijkheid:</strong> ${workout.difficulty}</p>
                <p><strong>Oefeningen:</strong> ${workout.exercises}</p>
                <p><strong>Calorieën:</strong> ${workout.totalCalories}</p>
            </div>
        `;
    });
    
    historyContainer.innerHTML = html;
}