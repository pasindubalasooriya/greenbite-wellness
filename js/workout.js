const exercises = {
  arms: {
    noEquipment: [
      {
        name: "Push-Ups",
        description:
          "Standard push-ups targeting chest, shoulders, and triceps",
        duration: 45,
        sets: 3,
        rest: 15,
      },
      {
        name: "Diamond Push-Ups",
        description: "Close-grip push-ups targeting triceps",
        duration: 30,
        sets: 3,
        rest: 15,
      },
      {
        name: "Arm Circles",
        description: "Circular motions with arms extended",
        duration: 30,
        sets: 2,
        rest: 10,
      },
    ],
    dumbbells: [
      {
        name: "Bicep Curls",
        description: "Standing bicep curls with dumbbells",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Tricep Extensions",
        description: "Overhead tricep extensions with dumbbells",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Hammer Curls",
        description: "Standing hammer curls with dumbbells",
        duration: 45,
        sets: 3,
        rest: 20,
      },
    ],
  },
  legs: {
    noEquipment: [
      {
        name: "Bodyweight Squats",
        description: "Standard squats targeting quadriceps and glutes",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Lunges",
        description: "Alternating lunges targeting legs and balance",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Calf Raises",
        description: "Standing calf raises for lower leg strength",
        duration: 30,
        sets: 3,
        rest: 15,
      },
    ],
    dumbbells: [
      {
        name: "Dumbbell Squats",
        description: "Squats while holding dumbbells",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Weighted Lunges",
        description: "Lunges while holding dumbbells",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Romanian Deadlifts",
        description: "Dumbbell deadlifts targeting hamstrings",
        duration: 45,
        sets: 3,
        rest: 20,
      },
    ],
  },
  core: {
    noEquipment: [
      {
        name: "Crunches",
        description: "Basic crunches targeting upper abs",
        duration: 30,
        sets: 3,
        rest: 15,
      },
      {
        name: "Plank",
        description: "Standard plank hold for core stability",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Mountain Climbers",
        description: "Dynamic movement targeting full core",
        duration: 30,
        sets: 3,
        rest: 15,
      },
    ],
    dumbbells: [
      {
        name: "Russian Twists",
        description: "Seated twists with dumbbell",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Weighted Sit-Ups",
        description: "Sit-ups holding a dumbbell",
        duration: 45,
        sets: 3,
        rest: 20,
      },
      {
        name: "Side Bends",
        description: "Standing side bends with dumbbell",
        duration: 30,
        sets: 3,
        rest: 15,
      },
    ],
  },
};

let currentExercise = null;
let timerInterval = null;
let timeLeft = 0;
let isResting = false;
const beepSound = new Audio("../sounds/beep.mp3");

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("generate-workout")
    .addEventListener("click", generateWorkout);
});

function generateWorkout() {
  const selectedParts = getSelectedOptions("body-part");
  const selectedEquipment = getSelectedOptions("equipment");

  if (selectedParts.length === 0 || selectedEquipment.length === 0) {
    alert("Please select at least one body part and equipment type");
    return;
  }

  const workoutPlan = createWorkoutPlan(selectedParts, selectedEquipment);
  displayWorkoutPlan(workoutPlan);
}

function getSelectedOptions(name) {
  return Array.from(
    document.querySelectorAll(`input[name="${name}"]:checked`)
  ).map((input) => input.value);
}

function createWorkoutPlan(parts, equipment) {
  const workoutPlan = [];

  parts.forEach((part) => {
    equipment.forEach((equip) => {
      const availableExercises = exercises[part][equip];
      if (availableExercises) {
        const selected = availableExercises.slice(0, 2);
        workoutPlan.push(...selected);
      }
    });
  });

  return workoutPlan;
}

function displayWorkoutPlan(plan) {
  const workoutPlan = document.getElementById("workout-plan");
  workoutPlan.innerHTML = "";

  plan.forEach((exercise, index) => {
    const card = createExerciseCard(exercise, index);
    workoutPlan.appendChild(card);
  });

  workoutPlan.classList.add("visible");
}

function createExerciseCard(exercise, index) {
  const card = document.createElement("div");
  card.className = "exercise-card";
  card.innerHTML = `
        <div class="exercise-header">
            <span class="exercise-name">${index + 1}. ${exercise.name}</span>
            <span>${exercise.sets} sets</span>
        </div>
        <div class="exercise-details">${exercise.description}</div>
        <div class="exercise-timer">
            <div class="timer-display">00:${exercise.duration}</div>
            <div class="timer-controls">
                <button class="timer-button start" onclick="startExerciseTimer(${index}, ${
    exercise.duration
  }, ${exercise.sets}, ${exercise.rest})">Start</button>
                <button class="timer-button pause" onclick="pauseTimer()">Pause</button>
                <button class="timer-button reset" onclick="resetTimer(${
                  exercise.duration
                })">Stop</button>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
    `;
  return card;
}

function startExerciseTimer(index, duration, sets, rest) {
  if (timerInterval) return;

  const card = document.querySelectorAll(".exercise-card")[index];
  currentExercise = { index, duration, sets, rest, currentSet: 1 };

  startTimer(card);
}

function startTimer(card) {
  const timerDisplay = card.querySelector(".timer-display");
  const progressBar = card.querySelector(".progress");
  const totalTime = isResting ? currentExercise.rest : currentExercise.duration;
  beepSound.play();

  timeLeft = totalTime;
  card.classList.add("exercise-active");

  timerInterval = setInterval(() => {
    timeLeft--;
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${percentage}%`;

    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;

    if (timeLeft <= 5 && timeLeft > 0) {
      beepSound.play();
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      card.classList.remove("exercise-active");

      if (isResting) {
        isResting = false;
        if (currentExercise.currentSet < currentExercise.sets) {
          currentExercise.currentSet++;
          startTimer(card);
        }
      } else {
        if (currentExercise.currentSet < currentExercise.sets) {
          isResting = true;
          timerDisplay.textContent = `Rest: ${currentExercise.rest}s`;
          setTimeout(() => startTimer(card), 1000);
        }
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer(duration) {
  pauseTimer();
  const cards = document.querySelectorAll(".exercise-card");
  cards.forEach((card) => {
    card.classList.remove("exercise-active");
    card.querySelector(".timer-display").textContent = `00:${duration}`;
    card.querySelector(".progress").style.width = "0%";
  });
  currentExercise = null;
  isResting = false;
}
