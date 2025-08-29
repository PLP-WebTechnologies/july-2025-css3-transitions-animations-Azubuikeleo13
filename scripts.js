let currentMood = "neutral";

// Mood quotes
const moodQuotes = {
  happy: "Keep smiling – it's contagious! 😊",
  sad: "This too shall pass. You're stronger than you know. 💙",
  excited: "Your energy is magnetic! ⚡",
};

// Handle mood selection
function selectMood(mood) {
  showLoader();

  setTimeout(() => {
    hideLoader();
    setMood(mood);
    showModal(moodQuotes[mood]);
    storeMood(mood);
    updateMoodHistory();
  }, 1500); // Simulate loading
}

// Sets mood style on face
function setMood(mood) {
  const face = document.getElementById("face");
  face.className = "face"; // Reset
  face.classList.add(mood);
  currentMood = mood;
}

// Modal handling
function showModal(quote) {
  document.getElementById("quoteText").innerText = quote;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Loader
function showLoader() {
  document.getElementById("loader").style.display = "block";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// Store mood with today's date
function storeMood(mood) {
  const history = JSON.parse(sessionStorage.getItem("moodHistory")) || [];
  const today = new Date().toLocaleDateString();
  history.push({ date: today, mood });
  sessionStorage.setItem("moodHistory", JSON.stringify(history));
}

// Load and display mood history
function updateMoodHistory() {
  const historyList = document.getElementById("moodHistory");
  historyList.innerHTML = ""; // Clear
  const history = JSON.parse(sessionStorage.getItem("moodHistory")) || [];
  history
    .slice(-5)
    .reverse()
    .forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.date}: ${entry.mood}`;
      historyList.appendChild(li);
    });
}

// On load
document.addEventListener("DOMContentLoaded", updateMoodHistory);
