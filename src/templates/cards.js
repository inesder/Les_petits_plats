// Fonction principale pour afficher les recettes
export function displayRecipes(recipes) {
    const cardsSection = document.querySelector('.cards-section');
    cardsSection.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        cardsSection.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card-element');
    recipeCard.appendChild(createRecipeImage(recipe.image));
    recipeCard.appendChild(createRecipeContainer(recipe));
    return recipeCard;
}

function createRecipeImage(imageFilename) {
    const recipeImage = document.createElement('img');
    recipeImage.setAttribute('src', 'src/assets/recipes_images/' + imageFilename);
    recipeImage.classList.add('recipe-img');
    return recipeImage;
}

function createRecipeContainer(recipe) {
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe-container');
    recipeContainer.appendChild(createRecipeName(recipe.name));
    recipeContainer.appendChild(createRecipeLabel());
    recipeContainer.appendChild(createRecipeDescription(recipe.description));
    recipeContainer.appendChild(createIngredientLabel());
    recipeContainer.appendChild(createIngredientsContainer(recipe.ingredients));
    return recipeContainer;
}

function createIngredientLabel() {
    const ingredientLabel = document.createElement('p');
    ingredientLabel.textContent = "Ingrédients";
    ingredientLabel.classList.add('label');
    return ingredientLabel;
}

function createRecipeName(name) {
    const recipeName = document.createElement('h3');
    recipeName.textContent = name;
    return recipeName;
}

function createRecipeLabel() {
    const recipeLabel = document.createElement("p");
    recipeLabel.textContent = "recette";
    recipeLabel.classList.add('label');
    return recipeLabel;
}

function createRecipeDescription(description) {
    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    recipeDescription.classList.add('recipe-description');
    return recipeDescription;
}

function createIngredientsContainer(ingredients) {
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('ingredients-container');
    ingredients.forEach(ingredient => {
        ingredientsContainer.appendChild(createIngredientDetail(ingredient));
    });
    return ingredientsContainer;
}

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
