// Importation des recettes
import recipes from '../datas/recipes.js';

// Fonction pour afficher les recettes dans la console
function logRecipes() {
    const cardsSection = document.querySelector('.cards-section');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('card-element');

        const recipeImage = document.createElement('img');
        recipeImage.setAttribute('src', 'src/assets/recipes_images/' + recipe.image);
        recipeImage.classList.add('recipe-img');

        const recipeContainer = document.createElement('div');
        recipeContainer.classList.add('recipe-container')
        const recipeName = document.createElement('h3');
        recipeName.textContent = recipe.name;

        const recipeLabel = document.createElement("p");
        recipeLabel.textContent = "recette";
        recipeLabel.classList.add('label');

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        recipeDescription.classList.add('recipe-description');

        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');

        const ingredientLabel = document.createElement('p');
        ingredientLabel.classList.add('label');
        ingredientLabel.textContent = "Ingrédients"

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeContainer);
        recipeContainer.appendChild(recipeName);
        recipeContainer.appendChild(recipeLabel);
        recipeContainer.appendChild(recipeDescription);
        recipeContainer.appendChild(ingredientLabel);
        cardsSection.appendChild(recipeCard);

        recipe.ingredients.forEach(ingredient => {

            const ingredientInformations = document.createElement('div');

            const recipeIngredients = document.createElement('p');
            recipeIngredients.textContent = ingredient.ingredient;
            recipeIngredients.classList.add('recipe-ingredients');

            const ingredientQuantity = document.createElement('p');
            ingredientQuantity.textContent = ingredient.quantity + ingredient.unit;
            ingredientQuantity.classList.add('ingredient-quantity');

            if (ingredient.quantity && ingredient.unit) {
                ingredientQuantity.textContent = ingredient.quantity + ' ' + ingredient.unit;
            } else if (ingredient.quantity) { // S'il n'y a pas d'unité mais une quantité
                ingredientQuantity.textContent = ingredient.quantity;
            } else { // Si ni quantité ni unité n'est fournie
                ingredientQuantity.textContent = ''; // Ne rien mettre ou mettre un texte par défaut
            }

            ingredientInformations.appendChild(recipeIngredients);
            ingredientInformations.appendChild(ingredientQuantity);
            ingredientsContainer.appendChild(ingredientInformations);
            recipeContainer.appendChild(ingredientsContainer);

        })

    });
}

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', logRecipes);
