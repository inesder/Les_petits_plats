// Fonction principale pour afficher les recettes
export function displayRecipes(recipes) {
    // Sélectionner la section des cartes dans le DOM
    const cardsSection = document.querySelector('.cards-section');
    // Effacer tout le contenu existant dans la section des cartes
    cardsSection.innerHTML = '';
    // Parcourir toutes les recettes et créer une carte pour chacune d'elles
    for (let i = 0; i < recipes.length; i++) {
        const recipeCard = createRecipeCard(recipes[i]);
        cardsSection.appendChild(recipeCard);
    }
}

// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
    // Créer un élément div pour la carte de recette
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card-element');

    // Ajouter l'image et le conteneur de la recette à la carte
    recipeCard.appendChild(createRecipeImage(recipe.image));
    recipeCard.appendChild(createRecipeContainer(recipe));

    return recipeCard;
}

// Fonction pour créer l'image de la recette
function createRecipeImage(imageFilename) {
    // Créer un élément img pour l'image de la recette
    const recipeImage = document.createElement('img');
    recipeImage.setAttribute('src', 'src/assets/recipes_images/' + imageFilename);
    recipeImage.classList.add('recipe-img');
    return recipeImage;
}

// Fonction pour créer le conteneur de la recette avec nom, label, description et ingrédients
function createRecipeContainer(recipe) {
    // Créer un élément div pour le conteneur de la recette
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe-container');

    // Ajouter le nom, le label, la description et les ingrédients au conteneur
    recipeContainer.appendChild(createRecipeName(recipe.name));
    recipeContainer.appendChild(createRecipeLabel());
    recipeContainer.appendChild(createRecipeDescription(recipe.description));
    recipeContainer.appendChild(createIngredientLabel());  // Ajout du label "Ingrédients" ici
    recipeContainer.appendChild(createIngredientsContainer(recipe.ingredients));
    
    return recipeContainer;
}

// Fonction pour créer le label "Ingrédients" séparément
function createIngredientLabel() {
    // Créer un élément p pour le label "Ingrédients"
    const ingredientLabel = document.createElement('p');
    ingredientLabel.textContent = "Ingrédients";
    ingredientLabel.classList.add('label');
    return ingredientLabel;
}

// Fonction pour créer le nom de la recette
function createRecipeName(name) {
    // Créer un élément h3 pour le nom de la recette
    const recipeName = document.createElement('h3');
    recipeName.textContent = name;
    return recipeName;
}

// Fonction pour créer le label "recette"
function createRecipeLabel() {
    // Créer un élément p pour le label "recette"
    const recipeLabel = document.createElement("p");
    recipeLabel.textContent = "recette";
    recipeLabel.classList.add('label');
    return recipeLabel;
}

// Fonction pour créer la description de la recette
function createRecipeDescription(description) {
    // Créer un élément p pour la description de la recette
    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    recipeDescription.classList.add('recipe-description');
    return recipeDescription;
}

// Fonction pour créer le conteneur des ingrédients sans le label
function createIngredientsContainer(ingredients) {
    // Créer un élément div pour le conteneur des ingrédients
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('ingredients-container');

    // Parcourir tous les ingrédients et ajouter les détails de chaque ingrédient au conteneur
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsContainer.appendChild(createIngredientDetail(ingredients[i]));
    }

    return ingredientsContainer;
}

// Fonction pour créer les détails d'un ingrédient
function createIngredientDetail(ingredient) {
    // Créer un élément div pour les détails de l'ingrédient
    const ingredientDetail = document.createElement('div');
    // Créer un élément p pour le nom de l'ingrédient
    const ingredientName = document.createElement('p');
    ingredientName.textContent = ingredient.ingredient;
    ingredientName.classList.add('recipe-ingredients');

    // Créer un élément p pour la quantité de l'ingrédient
    const ingredientQuantity = document.createElement('p');
    ingredientQuantity.textContent = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';
    ingredientQuantity.classList.add('ingredient-quantity');

    // Ajouter le nom et la quantité de l'ingrédient aux détails de l'ingrédient
    ingredientDetail.appendChild(ingredientName);
    ingredientDetail.appendChild(ingredientQuantity);
    return ingredientDetail;
}
