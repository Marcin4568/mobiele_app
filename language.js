function changeLanguage(lang) {

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-lang]").forEach(element => {

        const key = element.dataset.lang;

        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }

    });

}

window.onload = () => {

    const saved = localStorage.getItem("language") || "nl";

    const select = document.getElementById("lang");

    if (select) {

        select.value = saved;

        select.addEventListener("change", () => {
            changeLanguage(select.value);
        });

    }

    changeLanguage(saved);

}