function saveNutrition() {
    const data = {
        kcal: document.getElementById("kcal").value,
        protein: document.getElementById("protein").value,
        fat: document.getElementById("fat").value,
        carbs: document.getElementById("carbs").value
    };

    localStorage.setItem("nutrition", JSON.stringify(data));
    alert("Opgeslagen!");
}