// Fonction principale pour afficher les recettes
export function displayRecipes(recipes) {
    const cardsSection = document.querySelector('.cards-section');
    cardsSection.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        const recipeCard = createRecipeCard(recipes[i]);
        cardsSection.appendChild(recipeCard);
    }
}


// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card-element');

    recipeCard.appendChild(createRecipeImage(recipe.image));
    recipeCard.appendChild(createRecipeContainer(recipe));

    return recipeCard;
}

// Fonction pour créer l'image de la recette
function createRecipeImage(imageFilename) {
    const recipeImage = document.createElement('img');
    recipeImage.setAttribute('src', 'src/assets/recipes_images/' + imageFilename);
    recipeImage.classList.add('recipe-img');
    return recipeImage;
}

// Fonction pour créer le conteneur de la recette avec nom, label, description et ingrédients
function createRecipeContainer(recipe) {
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe-container');

    recipeContainer.appendChild(createRecipeName(recipe.name));
    recipeContainer.appendChild(createRecipeLabel());
    recipeContainer.appendChild(createRecipeDescription(recipe.description));
    recipeContainer.appendChild(createIngredientLabel());  // Ajout du label "Ingrédients" ici
    recipeContainer.appendChild(createIngredientsContainer(recipe.ingredients));
    
    return recipeContainer;
}

// Fonction pour créer le label "Ingrédients" séparément
function createIngredientLabel() {
    const ingredientLabel = document.createElement('p');
    ingredientLabel.textContent = "Ingrédients";
    ingredientLabel.classList.add('label');
    return ingredientLabel;
}

// Fonction pour créer le nom de la recette
function createRecipeName(name) {
    const recipeName = document.createElement('h3');
    recipeName.textContent = name;
    return recipeName;
}

// Fonction pour créer le label "recette"
function createRecipeLabel() {
    const recipeLabel = document.createElement("p");
    recipeLabel.textContent = "recette";
    recipeLabel.classList.add('label');
    return recipeLabel;
}

// Fonction pour créer la description de la recette
function createRecipeDescription(description) {
    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    recipeDescription.classList.add('recipe-description');
    return recipeDescription;
}

// Fonction pour créer le conteneur des ingrédients sans le label
function createIngredientsContainer(ingredients) {
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('ingredients-container');

    for (let i = 0; i < ingredients.length; i++) {
        ingredientsContainer.appendChild(createIngredientDetail(ingredients[i]));
    }

    return ingredientsContainer;
}

// Fonction pour créer les détails d'un ingrédient
function createIngredientDetail(ingredient) {
    const ingredientDetail = document.createElement('div');
    const ingredientName = document.createElement('p');
    ingredientName.textContent = ingredient.ingredient;
    ingredientName.classList.add('recipe-ingredients');

    const ingredientQuantity = document.createElement('p');
    ingredientQuantity.textContent = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';
    ingredientQuantity.classList.add('ingredient-quantity');

    ingredientDetail.appendChild(ingredientName);
    ingredientDetail.appendChild(ingredientQuantity);
    return ingredientDetail;
}
