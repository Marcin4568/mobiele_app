function getDays() {
  return ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
}

function loadWorkout() {
  let data = JSON.parse(localStorage.getItem("workout")) || [];

  let days = getDays();

  // PROGRESS
  let done = days.filter(d =>
    data.some(w => w.day === d && w.done)
  ).length;

  document.getElementById("text").innerText =
    `${done} / ${days.length} trainingen gedaan`;

  document.getElementById("bar").style.width =
    (done / days.length) * 100 + "%";

  // LIST
  document.getElementById("list").innerHTML =
    days.map(d => {
      let ok = data.some(w => w.day === d && w.done);
      return `<li>${d} - ${ok ? "✔" : "❌"}</li>`;
    }).join("");

  // STATS
  let easy = data.filter(w => w.level === "easy").length;
  let medium = data.filter(w => w.level === "medium").length;
  let hard = data.filter(w => w.level === "hard").length;

  document.getElementById("stats").innerText =
    `Easy: ${easy} | Medium: ${medium} | Hard: ${hard}`;
}

loadWorkout();