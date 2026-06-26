const nutrition = JSON.parse(localStorage.getItem("nutrition"));

if (nutrition) {
    document.getElementById("data").innerText =
        `Kcal: ${nutrition.kcal}, Eiwit: ${nutrition.protein}, Vet: ${nutrition.fat}, Carbs: ${nutrition.carbs}`;
}