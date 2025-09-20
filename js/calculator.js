//Runs when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculator-form");
  const resultsContainer = document.getElementById("results");
  const finalResultsContainer = document.getElementById("final-results");

  /*
    For males: 
    BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5 

    For females: 
    BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161 
  */
  function calculateBMR(weight, height, age, gender) {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return gender === "male" ? base + 5 : base - 161;
  }

  // TDEE = BMR x Activity Factor
  function calculateTDEE(bmr, activityLevel) {
    return bmr * activityLevel;
  }

  /*
    Macronutrient breakdown - how calories are divided into carbs, protein, and fat. 

        Carbohydrates (4 kcal per gram) 
        Proteins (4 kcal per gram) 
        Fats (9 kcal per gram) 

    A common healthy ratio is: 

        50% Carbs 
        20% Protein 
        30% Fat 

    To calculate macros from TDEE: 

        Carbs (g) = (TDEE × 0.50) ÷ 4 
        Protein (g) = (TDEE × 0.20) ÷ 4 
        Fat (g) = (TDEE × 0.30) ÷ 9 
    */

  function calculateMacros(tdee) {
    return {
      carbs: {
        grams: Math.round((tdee * 0.5) / 4),
        calories: Math.round(tdee * 0.5),
      },
      protein: {
        grams: Math.round((tdee * 0.2) / 4),
        calories: Math.round(tdee * 0.2),
      },
      fat: {
        grams: Math.round((tdee * 0.3) / 9),
        calories: Math.round(tdee * 0.3),
      },
    };
  }

  function animateCircle(className, percentage) {
    const circle = document.querySelector(`.${className}`);
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }

  function updateResults(results) {
    resultsContainer.classList.remove("hidden");
    let progress = 0;
    const progressBarDuration = 1500;
    const progressBarStep = 100;
    const progressBar = document.getElementById("result-progress");
    progressBar.style.width = "0%";

    const progressInterval = setInterval(() => {
      progress += 100 / (progressBarDuration / progressBarStep);
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      progressBar.style.width = `${progress}%`;
    }, progressBarStep);

    setTimeout(() => {
      finalResultsContainer.classList.remove("hidden");
    }, 2000);

    const bmrElement = document.getElementById("bmr");
    bmrElement.textContent = Math.round(results.bmr);

    const tdeeElement = document.getElementById("tdee");
    tdeeElement.textContent = Math.round(results.tdee);

    const carbsElement = document.getElementById("carbs");
    const proteinElement = document.getElementById("protein");
    const fatElement = document.getElementById("fat");

    carbsElement.textContent = results.macros.carbs.grams;
    proteinElement.textContent = results.macros.protein.grams;
    fatElement.textContent = results.macros.fat.grams;

    const carbsCalElement = document.getElementById("carbs-calories");
    const proteinCalElement = document.getElementById("protein-calories");
    const fatCalElement = document.getElementById("fat-calories");

    carbsCalElement.textContent = results.macros.carbs.calories;
    proteinCalElement.textContent = results.macros.protein.calories;
    fatCalElement.textContent = results.macros.fat.calories;

    animateCircle("carbs-circle", 50);
    animateCircle("protein-circle", 20);
    animateCircle("fat-circle", 30);

    // resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document
      .getElementById("calculator-section")
      .classList.add("calculator-section-expanded");
    document
      .getElementById("calculator-section")
      .classList.remove("calculator-section");
    document
      .getElementById("calculator-container")
      .classList.add("calculator-container-expanded");
    document
      .getElementById("calculator-container")
      .classList.remove("calculator-container");
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = parseFloat(document.getElementById("activity").value);

    const bmr = calculateBMR(weight, height, age, gender);

    const tdee = calculateTDEE(bmr, activityLevel);

    const macros = calculateMacros(tdee);

    updateResults({
      bmr,
      tdee,
      macros,
    });
  });
});
