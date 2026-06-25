// ===== NUTRITION PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitchers();
    updateLanguage();
    loadNutritionData();
    displayMeals();
    updateMacroDisplay();
});

let dailyCalorieGoal = 2000;

// ===== LOAD NUTRITION DATA =====
function loadNutritionData() {
    const nutrition = JSON.parse(localStorage.getItem('nutrition')) || {};
    
    if (nutrition.dailyCalories) {
        dailyCalorieGoal = nutrition.dailyCalories;
        document.getElementById('dailyCalories').value = dailyCalorieGoal;
    } else {
        document.getElementById('dailyCalories').value = 2000;
    }
    
    if (nutrition.proteinPercent) {
        document.getElementById('proteinPercent').value = nutrition.proteinPercent;
    }
    if (nutrition.carbsPercent) {
        document.getElementById('carbsPercent').value = nutrition.carbsPercent;
    }
    if (nutrition.fatPercent) {
        document.getElementById('fatPercent').value = nutrition.fatPercent;
    }
}

// ===== UPDATE CALORIES =====
function updateCalories() {
    const input = document.getElementById('dailyCalories').value;
    if (input && input > 0) {
        dailyCalorieGoal = parseInt(input);
        const nutrition = JSON.parse(localStorage.getItem('nutrition')) || {};
        nutrition.dailyCalories = dailyCalorieGoal;
        localStorage.setItem('nutrition', JSON.stringify(nutrition));
        document.getElementById('calorieDisplay').textContent = `${currentLanguage === 'nl' ? 'Doel:' : 'Goal:'} ${dailyCalorieGoal} kcal`;
        updateMacroDisplay();
    }
}

// ===== UPDATE MACROS =====
function updateMacros() {
    const protein = parseInt(document.getElementById('proteinPercent').value) || 30;
    const carbs = parseInt(document.getElementById('carbsPercent').value) || 40;
    const fat = parseInt(document.getElementById('fatPercent').value) || 30;
    
    if (protein + carbs + fat !== 100) {
        alert(currentLanguage === 'nl' ? 'Het totaal moet 100% zijn!' : 'Total must be 100%!');
        return;
    }
    
    const nutrition = JSON.parse(localStorage.getItem('nutrition')) || {};
    nutrition.proteinPercent = protein;
    nutrition.carbsPercent = carbs;
    nutrition.fatPercent = fat;
    localStorage.setItem('nutrition', JSON.stringify(nutrition));
    
    updateMacroDisplay();
    alert(currentLanguage === 'nl' ? 'Macro\'s bijgewerkt!' : 'Macros updated!');
}

function updateMacroDisplay() {
    const protein = parseInt(document.getElementById('proteinPercent').value) || 30;
    const carbs = parseInt(document.getElementById('carbsPercent').value) || 40;
    const fat = parseInt(document.getElementById('fatPercent').value) || 30;
    
    const proteinGrams = Math.round((protein / 100) * dailyCalorieGoal / 4);
    const carbsGrams = Math.round((carbs / 100) * dailyCalorieGoal / 4);
    const fatGrams = Math.round((fat / 100) * dailyCalorieGoal / 9);
    
    document.getElementById('proteinGrams').textContent = proteinGrams + 'g';
    document.getElementById('carbsGrams').textContent = carbsGrams + 'g';
    document.getElementById('fatGrams').textContent = fatGrams + 'g';
    
    document.getElementById('calorieDisplay').textContent = `${currentLanguage === 'nl' ? 'Doel:' : 'Goal:'} ${dailyCalorieGoal} kcal`;
}

// ===== MEAL MANAGEMENT =====
function addMeal() {
    const mealName = document.getElementById('mealName').value;
    const mealCalories = document.getElementById('mealCalories').value;
    
    if (mealName && mealCalories) {
        let meals = JSON.parse(localStorage.getItem('meals')) || [];
        const today = new Date().toISOString().split('T')[0];
        
        meals.push({
            name: mealName,
            calories: parseInt(mealCalories),
            date: today,
            timestamp: new Date().getTime()
        });
        
        localStorage.setItem('meals', JSON.stringify(meals));
        document.getElementById('mealName').value = '';
        document.getElementById('mealCalories').value = '';
        displayMeals();
    }
}

function displayMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = meals.filter(m => m.date === today);
    const mealList = document.getElementById('mealList');
    
    if (todayMeals.length === 0) {
        mealList.innerHTML = '<p>' + (currentLanguage === 'nl' ? 'Geen maaltijden opgeslagen' : 'No meals saved') + '</p>';
        return;
    }
    
    let totalCalories = 0;
    let html = '';
    
    todayMeals.forEach((meal, index) => {
        totalCalories += parseInt(meal.calories);
        html += `
            <div class="meal-item">
                <div class="meal-item-info">
                    <div class="meal-item-name">${meal.name}</div>
                    <div class="meal-item-calories">${meal.calories} kcal</div>
                </div>
                <button class="meal-item-delete" onclick="deleteMeal(${meal.timestamp})">${currentLanguage === 'nl' ? 'Verwijderen' : 'Delete'}</button>
            </div>
        `;
    });
    
    html += `
        <div style="background: #667eea; color: white; padding: 10px; border-radius: 5px; margin-top: 10px; font-weight: bold;">
            ${currentLanguage === 'nl' ? 'Totaal vandaag:' : 'Total today:'} ${totalCalories} / ${dailyCalorieGoal} kcal (${Math.round((totalCalories/dailyCalorieGoal)*100)}%)
        </div>
    `;
    
    mealList.innerHTML = html;
}

function deleteMeal(timestamp) {
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals = meals.filter(m => m.timestamp !== timestamp);
    localStorage.setItem('meals', JSON.stringify(meals));
    displayMeals();
}