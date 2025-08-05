// 🌐 Fetch recipes based on search input
async function searchRecipe() {
  const query = document.getElementById('searchInput').value;
  if (!query) {
    alert("Please enter a recipe name");
    return;
  }

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  displayRecipe(data.meals);
}

// 🔄 Display recipes and translate if needed 
async function displayRecipe(meals) {
  const selectedLang = document.getElementById('languageSelect').value;
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (!meals) {
    results.innerHTML = '<p>No recipe found.</p>';
    return;
  }

  for (let meal of meals) {
    let translatedInstructions = meal.strInstructions;

    // 🌍 Translate instructions if language is not English
    if (selectedLang !== 'en') {
      translatedInstructions = await translateText(meal.strInstructions, selectedLang);
    }

    const div = document.createElement('div');
    div.className = 'recipe-card';
    div.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" width="300" />
      <p><strong>Instructions:</strong><br>${translatedInstructions}</p>
    `;
    results.appendChild(div);
  }
}

// 🌍 Google Translate API function
async function translateText(text, targetLang) {
  const apiKey = 'YOUR_GOOGLE_API_KEY'; // 🔐 Replace with your actual API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.data && data.data.translations && data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    } else {
      console.warn("Translation failed. Using original text.");
      return text;
    }
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

// Login function
// Show/hide login popup
document.getElementById("loginBtn").addEventListener("click", function () {
  const popup = document.getElementById("loginPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});

// Handle login check
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginMessage").innerText = "Login successful!";
    // Optional: hide the popup
    document.getElementById("loginPopup").style.display = "none";
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials";
  }
}
const translations = {
  en: {
    searchPlaceholder: "Search for a recipe...",
    login: "Login",
    username: "Username",
    password: "Password",
    submit: "Submit",
    close: "Close",
  },
  hi: {
    searchPlaceholder: "एक रेसिपी खोजें...",
    login: "लॉग इन करें",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    submit: "जमा करें",
    close: "बंद करें",
  }
};

document.getElementById('languageSelect').addEventListener('change', function () {
  const lang = this.value;
  const t = translations[lang];
  document.getElementById('searchInput').placeholder = t.searchPlaceholder;
  document.getElementById('loginBtn').innerText = t.login;
  document.getElementById('username').placeholder = t.username;
  document.getElementById('password').placeholder = t.password;
  document.querySelector('#loginPopup button:nth-child(4)').innerText = t.submit;
  document.querySelector('#loginPopup button:nth-child(5)').innerText = t.close;
});
function searchRecipe() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";

  const dummyRecipes = ["pasta", "poha", "dal", "rajma"];
  if (dummyRecipes.includes(input)) {
    results.innerHTML = `<h3>Result: ${input.charAt(0).toUpperCase() + input.slice(1)}</h3><p>This is a simple ${input} recipe.</p>`;
  } else {
    results.innerHTML = "<p>No recipe found. Try 'dal' or 'pasta'.</p>";
  }
}
function searchRecipe() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  // Dummy recipe data
  const recipes = {
    pasta: {
      title: "Pasta",
      ingredients: ["200g pasta", "1 tbsp olive oil", "2 garlic cloves", "1 cup tomato puree", "Salt", "Cheese"],
      steps: [
        "Boil pasta for 8–10 minutes.",
        "Heat olive oil and sauté garlic.",
        "Add tomato puree and cook.",
        "Mix pasta and cook for 2 more minutes.",
        "Top with cheese and serve hot."
      ]
    },
    dal: {
      title: "Dal (Lentils)",
      ingredients: ["1 cup toor dal", "2 cups water", "Salt", "Turmeric", "Mustard seeds", "Ghee"],
      steps: [
        "Boil dal with salt and turmeric.",
        "Heat ghee, add mustard seeds.",
        "Mix the tempering into the dal.",
        "Serve hot with rice or roti."
      ]
    },
    paneer: {
      title: "Paneer Butter Masala",
      ingredients: ["200g paneer", "2 onions", "2 tomatoes", "1/2 cup cream", "Butter", "Spices (garam masala, chili, turmeric)"],
      steps: [
        "Sauté onions and tomatoes, blend to make a gravy.",
        "Cook gravy with spices and butter.",
        "Add paneer cubes and cook for 5 mins.",
        "Add cream and cook 2 more mins.",
        "Serve with naan or rice."
      ]
    },
    poha: {
      title: "Poha",
      ingredients: ["2 cups poha (flattened rice)", "1 onion", "1 green chili", "Mustard seeds", "Salt", "Lemon juice", "Coriander"],
      steps: [
        "Wash and drain poha.",
        "Sauté mustard seeds, onion, and green chili.",
        "Add poha, salt, and mix well.",
        "Garnish with lemon juice and coriander."
      ]
    },
    rajma: {
      title: "Rajma",
      ingredients: ["1 cup rajma (kidney beans)", "2 tomatoes", "1 onion", "Spices", "Ginger garlic paste", "Salt"],
      steps: [
        "Soak rajma overnight and pressure cook.",
        "Sauté onion, tomatoes, and spices.",
        "Add rajma and simmer for 20 minutes.",
        "Serve with steamed rice."
      ]
    }
  };

  if (recipes[input]) {
    const recipe = recipes[input];

    // Build HTML for recipe
    const ingredientList = recipe.ingredients.map(item => `<li>${item}</li>`).join("");
    const stepList = recipe.steps.map((step, index) => `<li><strong>Step ${index + 1}:</strong> ${step}</li>`).join("");

    results.innerHTML = `
      <h2>${recipe.title}</h2>
      <h4>🧂 Ingredients:</h4>
      <ul>${ingredientList}</ul>
      <h4>👨‍🍳 Instructions:</h4>
      <ol>${stepList}</ol>
    `;
  } else {
    results.innerHTML = "<p>No recipe found. Try 'dal', 'poha', 'rajma', 'pasta' or 'paneer'.</p>";
  }
}

document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

async function searchRecipe() {
  const query = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("results");
  results.innerHTML = "Loading...";

  const apiKey = "31642a10d73b40ef9bfa7f12be283e4a";

  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=1&addRecipeInformation=true&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const recipe = data.results[0];
      results.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" style="max-width: 100%; border-radius: 10px;">
        <p>${recipe.summary}</p>
        <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
      `;
    } else {
      results.innerHTML = `<p>${translations[currentLang].noResult}</p>`;
    }
  } catch (error) {
    results.innerHTML = `<p>Error fetching recipe. Try again later.</p>`;
  }
}



async function translateText(text, sourceLang, targetLang) {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Translation API error');
    }
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      throw new Error('No translation found');
    }
  }

  document.getElementById("translateBtn").addEventListener("click", async () => {
    const contentDiv = document.getElementById("content");
    const originalText = contentDiv.innerText.trim();

    try {
      contentDiv.innerHTML = "<em>Translating...</em>";
      const translatedText = await translateText(originalText, "en", "hi");
      contentDiv.innerText = translatedText;
    } catch (error) {
      contentDiv.innerText = originalText;
      alert("Translation failed: " + error.message);
    }
  });


  