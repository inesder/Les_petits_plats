// Importation des recettes
import recipes from '../datas/recipes.js';

// Fonction pour afficher les recettes dans la console
function logRecipes() {
    const cardsSection = document.querySelector('.cards-section');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');

        const recipeImage = document.createElement('img');
        recipeImage.setAttribute('src', '../assets/recipes_images/Recette40.jpg')
        const recipeName = document.createElement('h3');
        recipeName.textContent = recipe.name;
        console.log(recipe.name);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeName);
        cardsSection.appendChild(recipeCard);
        /*recipe.ingredients.forEach(ingredient => {

        })
        recipeName.textContent = recipes.name;
        const recipeDescription = document.createElement("p");
        const recipeIngredients = document.createElement('p');
        */
    });
}

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', logRecipes);
