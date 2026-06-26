function start(level) {
    let msg = "";

    if (level === "easy") msg = "Makkelijke training gestart 💪";
    if (level === "medium") msg = "Medium training gestart 🔥";
    if (level === "hard") msg = "Zware training gestart 🚀";

    document.getElementById("status").innerText = msg;

    localStorage.setItem("lastWorkout", level);
}