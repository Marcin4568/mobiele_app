// ===== PROGRESS PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    updateStatistics();
    displayMeasurementHistory();
    updateProgressChart();
});

// ===== UPDATE STATISTICS =====
function updateStatistics() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    
    document.getElementById('workoutsCount').textContent = workouts.length;
    
    const totalCalories = workouts.reduce((sum, w) => sum + (w.totalCalories || 0), 0);
    document.getElementById('caloriesBurned').textContent = totalCalories;
    
    // Calculate streak
    const streak = calculateStreak();
    document.getElementById('streakDays').textContent = streak;
    
    // Count completed goals
    const goals = localStorage.getItem('goals');
    document.getElementById('goalsCount').textContent = goals ? 1 : 0;
}

function calculateStreak() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    if (workouts.length === 0) return 0;
    
    const dates = workouts.map(w => new Date(w.date).getTime()).sort((a, b) => b - a);
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < dates.length - 1; i++) {
        const current = new Date(dates[i]);
        const next = new Date(dates[i + 1]);
        current.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        
        const diff = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// ===== ADD MEASUREMENT =====
function addMeasurement(type) {
    const input = document.getElementById(type);
    if (input && input.value) {
        let measurements = JSON.parse(localStorage.getItem('measurements')) || [];
        measurements.push({
            type: type,
            value: parseFloat(input.value),
            date: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('measurements', JSON.stringify(measurements));
        input.value = '';
        displayMeasurementHistory();
        updateProgressChart();
        alert(currentLanguage === 'nl' ? 'Meting opgeslagen!' : 'Measurement saved!');
    }
}

// ===== DISPLAY MEASUREMENT HISTORY =====
function displayMeasurementHistory() {
    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    const historyContainer = document.getElementById('measurementHistory');
    
    if (measurements.length === 0) {
        historyContainer.innerHTML = '<p>' + (currentLanguage === 'nl' ? 'Geen metingen opgeslagen' : 'No measurements saved') + '</p>';
        return;
    }
    
    const grouped = {};
    measurements.forEach(m => {
        if (!grouped[m.type]) grouped[m.type] = [];
        grouped[m.type].push(m);
    });
    
    let html = '';
    Object.keys(grouped).forEach(type => {
        const typeLabel = {
            'weight': currentLanguage === 'nl' ? 'Gewicht' : 'Weight',
            'chest': currentLanguage === 'nl' ? 'Borst' : 'Chest',
            'waist': currentLanguage === 'nl' ? 'Taille' : 'Waist',
            'bicep': currentLanguage === 'nl' ? 'Biceps' : 'Biceps'
        };
        
        html += `<h4>${typeLabel[type] || type}</h4>`;
        grouped[type].slice().reverse().forEach(m => {
            html += `
                <div class="measurement-entry">
                    <p><strong>${m.date}:</strong> ${m.value} ${type === 'weight' ? 'kg' : 'cm'}</p>
                </div>
            `;
        });
    });
    
    historyContainer.innerHTML = html;
}

// ===== UPDATE PROGRESS CHART =====
function updateProgressChart() {
    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    const weight = measurements.filter(m => m.type === 'weight').sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (weight.length < 2) {
        document.getElementById('progressChart').innerHTML = '<p>' + (currentLanguage === 'nl' ? 'Niet genoeg gegevens voor trends' : 'Not enough data for trends') + '</p>';
        return;
    }
    
    const firstWeight = weight[0].value;
    const lastWeight = weight[weight.length - 1].value;
    const change = (lastWeight - firstWeight).toFixed(1);
    const direction = change > 0 ? '📈' : change < 0 ? '📉' : '→';
    
    let html = `
        <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p><strong>${currentLanguage === 'nl' ? 'Startgewicht:' : 'Start Weight:'}</strong> ${firstWeight} kg</p>
            <p><strong>${currentLanguage === 'nl' ? 'Huidig Gewicht:' : 'Current Weight:'}</strong> ${lastWeight} kg</p>
            <p><strong>${currentLanguage === 'nl' ? 'Verandering:' : 'Change:'}</strong> ${direction} ${change} kg</p>
            <p><strong>${currentLanguage === 'nl' ? 'Periode:' : 'Period:'}</strong> ${weight[0].date} tot ${weight[weight.length - 1].date}</p>
        </div>
    `;
    
    document.getElementById('progressChart').innerHTML = html;
}