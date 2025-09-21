const recipes = [
  {
    id: 1,
    title: "Quinoa Buddha Bowl",
    image: "../images/recipes/bb.png",
    description:
      "A nutritious and colorful bowl packed with protein-rich quinoa, roasted vegetables, and tahini dressing.",
    category: "Lunch",
    ingredients: [
      "1 cup quinoa",
      "2 cups mixed vegetables (sweet potato, broccoli, carrots)",
      "1 can chickpeas",
      "2 tbsp olive oil",
      "1 avocado",
      "2 tbsp tahini",
      "1 lemon",
      "Salt and pepper to taste",
    ],
    steps: [
      "Cook quinoa according to package instructions",
      "Preheat oven to 400°F (200°C)",
      "Chop vegetables and toss with olive oil, salt, and pepper",
      "Roast vegetables for 25-30 minutes",
      "Drain and rinse chickpeas, season and roast for 15-20 minutes",
      "Make tahini dressing by mixing tahini, lemon juice, and water",
      "Assemble bowl with quinoa, roasted vegetables, chickpeas",
      "Top with sliced avocado and drizzle with tahini dressing",
    ],
    nutrition: {
      calories: 450,
      protein: "15g",
      carbs: "52g",
      fat: "22g",
      fiber: "12g",
    },
  },
  {
    id: 2,
    title: "Green Smoothie Bowl",
    image: "../images/recipes/gs.jpg",
    description:
      "Start your day with this refreshing and nutritious smoothie bowl topped with fresh fruits and seeds.",
    category: "Breakfast",
    ingredients: [
      "2 cups spinach",
      "1 banana",
      "1 cup mango",
      "1 cup almond milk",
      "1 tbsp chia seeds",
      "1 tbsp honey",
      "Toppings: berries, granola, coconut flakes",
    ],
    steps: [
      "Blend spinach and almond milk until smooth",
      "Add banana, mango, and honey, blend until creamy",
      "Pour into a bowl",
      "Top with fresh berries, granola, and coconut flakes",
      "Sprinkle chia seeds on top",
    ],
    nutrition: {
      calories: 320,
      protein: "8g",
      carbs: "65g",
      fat: "6g",
      fiber: "9g",
    },
  },
  {
    id: 3,
    title: "Baked Salmon with Roasted Vegetables",
    image: "../images/recipes/bs.jpg",
    description:
      "Heart-healthy salmon fillet with herb-roasted vegetables and lemon sauce.",
    category: "Dinner",
    ingredients: [
      "4 salmon fillets",
      "2 cups mixed vegetables",
      "3 tbsp olive oil",
      "2 lemons",
      "Fresh herbs (dill, parsley)",
      "Garlic cloves",
      "Salt and pepper",
    ],
    steps: [
      "Preheat oven to 400°F (200°C)",
      "Season salmon with herbs, garlic, lemon",
      "Prepare vegetables and toss with olive oil",
      "Place salmon and vegetables on baking sheet",
      "Bake for 20-25 minutes",
      "Squeeze fresh lemon before serving",
    ],
    nutrition: {
      calories: 380,
      protein: "34g",
      carbs: "14g",
      fat: "22g",
      fiber: "4g",
    },
  },
  {
    id: 4,
    title: "Overnight Oats",
    image: "../images/recipes/oo.jpg",
    description:
      "Easy and healthy breakfast prepared the night before with oats, yogurt, and fruits.",
    category: "Breakfast",
    ingredients: [
      "1 cup rolled oats",
      "1 cup almond milk",
      "1/2 cup Greek yogurt",
      "1 tbsp honey",
      "1/2 cup mixed berries",
      "1 tbsp chia seeds",
      "1/4 tsp vanilla extract",
    ],
    steps: [
      "Mix oats, milk, yogurt in a jar",
      "Add honey and vanilla extract",
      "Stir in chia seeds",
      "Cover and refrigerate overnight",
      "Top with fresh berries before serving",
    ],
    nutrition: {
      calories: 290,
      protein: "12g",
      carbs: "45g",
      fat: "8g",
      fiber: "7g",
    },
  },
];

function getRecipeCards(recipesToRender = recipes) {
  const recipeContainer = document.querySelector(".recipe-grid");
  recipeContainer.innerHTML = "";

  recipesToRender.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <button onclick="openRecipeModal(${recipe.id})">View Recipe</button>
            </div>
        `;
    recipeContainer.appendChild(card);
  });
}

function filterRecipes() {
  const searchText = document
    .getElementById("recipe-search")
    .value.toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  getRecipeCards(filteredRecipes);
}

function openRecipeModal(recipeId) {
  const recipe = recipes.find((r) => r.id === recipeId);
  const modal = document.getElementById("recipe-modal");
  const modalContent = document.querySelector(".modal-content");

  modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        
        <div class="recipe-details">
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    ${recipe.ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="steps">
                <h3>Instructions</h3>
                <ol>
                    ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
                </ol>
            </div>
            
            <div class="nutrition">
                <h3>Nutrition Information</h3>
                <table>
                    <tr>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Fiber</th>
                    </tr>
                    <tr>
                        <td>${recipe.nutrition.calories}</td>
                        <td>${recipe.nutrition.protein}</td>
                        <td>${recipe.nutrition.carbs}</td>
                        <td>${recipe.nutrition.fat}</td>
                        <td>${recipe.nutrition.fiber}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

  modal.style.display = "block";

  // Closing the modal
  const closeBtn = modalContent.querySelector(".close-modal");
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  getRecipeCards();

  document
    .getElementById("recipe-search")
    .addEventListener("input", filterRecipes);
  document
    .getElementById("category-filter")
    .addEventListener("change", filterRecipes);
});
