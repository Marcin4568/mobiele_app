// ===== LANGUAGE SUPPORT =====
const translations = {
    nl: {
        appTitle: 'Fitness Tracker',
        welcomeTitle: 'Welkom',
        welcomeText: 'Start je fitness reis vandaag!',
        goalsTitle: 'Doelstellingen',
        progressTitle: 'Recente Voortgang',
        startTrainingBtn: 'Start Training',
        navHomeText: 'Home',
        navFoodText: 'Voeding',
        navWorkoutText: 'Training',
        navProgressText: 'Voortgang',
        navSettingsText: 'Instellingen',
    },
    en: {
        appTitle: 'Fitness Tracker',
        welcomeTitle: 'Welcome',
        welcomeText: 'Start your fitness journey today!',
        goalsTitle: 'Goals',
        progressTitle: 'Recent Progress',
        startTrainingBtn: 'Start Training',
        navHomeText: 'Home',
        navFoodText: 'Food',
        navWorkoutText: 'Workout',
        navProgressText: 'Progress',
        navSettingsText: 'Settings',
    }
};

let currentLanguage = localStorage.getItem('language') || 'nl';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    loadAllData();
});

// ===== LANGUAGE FUNCTIONS =====
function initLanguageSwitchers() {
    const langNlBtn = document.getElementById('langNl');
    const langEnBtn = document.getElementById('langEn');
    
    if (langNlBtn) {
        langNlBtn.addEventListener('click', () => setLanguage('nl'));
    }
    if (langEnBtn) {
        langEnBtn.addEventListener('click', () => setLanguage('en'));
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguage();
}

function updateLanguage() {
    const langNl = document.getElementById('langNl');
    const langEn = document.getElementById('langEn');
    
    if (langNl) {
        langNl.classList.toggle('active', currentLanguage === 'nl');
    }
    if (langEn) {
        langEn.classList.toggle('active', currentLanguage === 'en');
    }
    
    document.documentElement.lang = currentLanguage;
}

function t(key) {
    return translations[currentLanguage][key] || translations['nl'][key] || key;
}

// ===== NAVIGATION =====
function navigateTo(page) {
    const pages = {
        'index': 'index.html',
        'training': 'training.html',
        'workout': 'workout.html',
        'nutrition': 'nutrition.html',
        'progress': 'progress.html',
        'settings': 'settings.html'
    };
    
    window.location.href = pages[page] || 'index.html';
}

// ===== DATA STORAGE =====
function loadAllData() {
    const goals = localStorage.getItem('goals');
    if (goals && document.getElementById('goalDisplay')) {
        document.getElementById('goalDisplay').textContent = goals;
    }
}

function saveGoal() {
    const goalInput = document.getElementById('goalInput');
    if (goalInput && goalInput.value) {
        localStorage.setItem('goals', goalInput.value);
        document.getElementById('goalDisplay').textContent = goalInput.value;
        alert(currentLanguage === 'nl' ? 'Doelstelling opgeslagen!' : 'Goal saved!');
        goalInput.value = '';
    }
}

// ===== DATA MANAGEMENT =====
function getAllData() {
    return {
        language: localStorage.getItem('language'),
        goals: localStorage.getItem('goals'),
        workouts: JSON.parse(localStorage.getItem('workouts')) || [],
        measurements: JSON.parse(localStorage.getItem('measurements')) || [],
        meals: JSON.parse(localStorage.getItem('meals')) || [],
        settings: JSON.parse(localStorage.getItem('settings')) || {},
        nutrition: JSON.parse(localStorage.getItem('nutrition')) || {},
    };
}

function exportData() {
    const data = getAllData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function clearData() {
    if (confirm(currentLanguage === 'nl' ? 'Weet je zeker dat je alle gegevens wilt wissen?' : 'Are you sure you want to clear all data?')) {
        localStorage.clear();
        alert(currentLanguage === 'nl' ? 'Alle gegevens gewist!' : 'All data cleared!');
        location.reload();
    }
}