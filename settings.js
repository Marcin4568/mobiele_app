// ===== SETTINGS PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    loadUserSettings();
    setupLanguageButtons();
});

// ===== SETUP LANGUAGE BUTTONS =====
function setupLanguageButtons() {
    const langNlBtn = document.getElementById('langNlBtn');
    const langEnBtn = document.getElementById('langEnBtn');
    
    if (langNlBtn) {
        langNlBtn.addEventListener('click', function() {
            setLanguageSetting('nl');
        });
    }
    if (langEnBtn) {
        langEnBtn.addEventListener('click', function() {
            setLanguageSetting('en');
        });
    }
}

function setLanguageSetting(lang) {
    setLanguage(lang);
    updateLanguageBtnStates();
}

function updateLanguageBtnStates() {
    const langNlBtn = document.getElementById('langNlBtn');
    const langEnBtn = document.getElementById('langEnBtn');
    
    if (langNlBtn && langEnBtn) {
        langNlBtn.classList.toggle('active', currentLanguage === 'nl');
        langEnBtn.classList.toggle('active', currentLanguage === 'en');
    }
}

// ===== LOAD USER SETTINGS =====
function loadUserSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    
    if (settings.name) document.getElementById('userName').value = settings.name;
    if (settings.age) document.getElementById('userAge').value = settings.age;
    if (settings.gender) document.getElementById('userGender').value = settings.gender;
    if (settings.fitnessGoal) document.getElementById('fitnessGoal').value = settings.fitnessGoal;
    if (settings.reminders !== undefined) document.getElementById('reminders').checked = settings.reminders;
    if (settings.soundNotifications !== undefined) document.getElementById('soundNotifications').checked = settings.soundNotifications;
    
    updateLanguageBtnStates();
}

// ===== SAVE PROFILE =====
function saveProfile() {
    const settings = {
        name: document.getElementById('userName').value,
        age: document.getElementById('userAge').value,
        gender: document.getElementById('userGender').value,
        fitnessGoal: document.getElementById('fitnessGoal').value,
        reminders: document.getElementById('reminders').checked,
        soundNotifications: document.getElementById('soundNotifications').checked
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    alert(currentLanguage === 'nl' ? 'Profiel opgeslagen!' : 'Profile saved!');
}

// ===== EXPORT DATA =====
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

// ===== CLEAR DATA =====
function clearData() {
    if (confirm(currentLanguage === 'nl' ? 'Weet je zeker dat je alle gegevens wilt wissen? Dit kan niet ongedaan gemaakt worden!' : 'Are you sure you want to clear all data? This cannot be undone!')) {
        localStorage.clear();
        alert(currentLanguage === 'nl' ? 'Alle gegevens gewist!' : 'All data cleared!');
        location.reload();
    }
}