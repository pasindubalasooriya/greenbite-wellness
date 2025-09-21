let sessions = JSON.parse(localStorage.getItem("mindfulnessSessions")) || {
  totalSessions: 0,
};

let timerInterval;
let timeLeft;
let isTimerRunning = false;
const defaultTime = 25 * 60;

let isBreathing = false;
let breathingInterval;

const sounds = {
  rain: new Audio("../sounds/rain.mp3"),
  waves: new Audio("../sounds/waves.mp3"),
  forest: new Audio("../sounds/forest.mp3"),
};

Object.values(sounds).forEach((sound) => {
  sound.loop = true;
});

document.addEventListener("DOMContentLoaded", () => {
  updateSessionStats();
  initializeBreathingAnimation();
  initializeTimer();
  initializeSoundControls();
});

function initializeBreathingAnimation() {
  const breathingContainer = document.querySelector(".breathing-container");

  breathingContainer.addEventListener("click", () => {
    if (isBreathing) {
      stopBreathing();
    } else {
      startBreathing();
    }
  });
}

function startBreathing() {
  isBreathing = true;
  const breathingGif = document.getElementById("breathing-gif");
  const breathingText = document.querySelector(".breathing-text");

  breathingGif.src = "../images/b.gif";
  breathingText.textContent = "Follow the animation";
}

function stopBreathing() {
  isBreathing = false;
  const breathingGif = document.getElementById("breathing-gif");
  const breathingText = document.querySelector(".breathing-text");

  breathingGif.src = "../images/b.png";
  breathingText.textContent = "Click to start";

  sessions.totalSessions++;
  localStorage.setItem("mindfulnessSessions", JSON.stringify(sessions));
  updateSessionStats();
}

function initializeTimer() {
  timeLeft = defaultTime;
  updateTimerDisplay();

  document
    .querySelector(".timer-button.start")
    .addEventListener("click", startTimer);
  document
    .querySelector(".timer-button.pause")
    .addEventListener("click", pauseTimer);
  document
    .querySelector(".timer-button.reset")
    .addEventListener("click", resetTimer);

  document.querySelectorAll(".preset-button").forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = parseInt(button.dataset.time);
      timeLeft = minutes * 60;
      updateTimerDisplay();
      document
        .querySelectorAll(".preset-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        completeSession();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  pauseTimer();
  timeLeft = defaultTime;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.querySelector(".timer-display").textContent = display;
}

function completeSession() {
  pauseTimer();
  alert("Session completed! Great job!");
  resetTimer();
}

function initializeSoundControls() {
  document
    .querySelectorAll('.toggle-button input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const soundName = e.target.dataset.sound;
        toggleSound(soundName, e.target);
      });
    });
}

function toggleSound(soundName, checkbox) {
  const sound = sounds[soundName];

  if (checkbox.checked) {
    sound.play().catch((e) => {
      console.log("Error playing sound:", e);
      checkbox.checked = false;
    });
  } else {
    sound.pause();
  }
}

function updateSessionStats() {
  document.getElementById("total-sessions").textContent =
    sessions.totalSessions;
}
