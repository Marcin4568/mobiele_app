document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    loadUserSettings();
});

function loadUserSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    if (settings.name) document.getElementById('userName').value = settings.name;
    if (settings.age) document.getElementById('userAge').value = settings.age;
}

function saveProfile() {
    const settings = {
        name: document.getElementById('userName').value,
        age: document.getElementById('userAge').value,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('Profiel opgeslagen!');
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
    if (confirm('Weet je zeker dat je alle gegevens wilt wissen? Dit kan niet ongedaan gemaakt worden!')) {
        localStorage.clear();
        alert('Alle gegevens gewist!');
        location.reload();
    }
}