document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    updateStatistics();
    displayMeasurementHistory();
});

function updateStatistics() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    document.getElementById('workoutsCount').textContent = workouts.length;
    
    const totalCalories = workouts.reduce((sum, w) => sum + (w.totalCalories || 0), 0);
    document.getElementById('caloriesBurned').textContent = totalCalories;
}

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
        alert('Meting opgeslagen!');
    }
}

function displayMeasurementHistory() {
    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    const historyContainer = document.getElementById('measurementHistory');
    
    if (measurements.length === 0) {
        historyContainer.innerHTML = '<p>Geen metingen opgeslagen</p>';
        return;
    }
    
    const grouped = {};
    measurements.forEach(m => {
        if (!grouped[m.type]) grouped[m.type] = [];
        grouped[m.type].push(m);
    });
    
    let html = '';
    const typeLabels = {
        'weight': 'Gewicht',
        'chest': 'Borst',
        'waist': 'Taille'
    };
    
    Object.keys(grouped).forEach(type => {
        html += `<h4>${typeLabels[type] || type}</h4>`;
        grouped[type].slice().reverse().forEach(m => {
            html += `<div class="measurement-entry"><p><strong>${m.date}:</strong> ${m.value} ${type === 'weight' ? 'kg' : 'cm'}</p></div>`;
        });
    });
    
    historyContainer.innerHTML = html;
}