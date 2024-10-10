import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';
import { displayFilter } from '../templates/filter.js'
import { displayRecipes } from '../templates/cards.js';

const searchInput = document.querySelector('.search-input');

// Fonction pour créer et mettre à jour le compteur de recettes
function recipeCounter(filteredRecipes) {
    const recipeCountElement = document.querySelector('.recipe-count');
    if (recipeCountElement) {
        const count = filteredRecipes.length;
        if (count === 0) {
            recipeCountElement.textContent = 'Aucune recette';
        } else if (count === 1) {
            recipeCountElement.textContent = '1 recette';
        } else {
            recipeCountElement.textContent = `${count} recettes`;
        }
    }
}


export function applyFilters() {
    let filteredRecipes = [...recipes]; // Initialiser avec toutes les recettes

    // Filtrer par recherche dans la barre principale
    if (filters.search.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            let isMatch = recipe.description.toLowerCase().includes(filters.search) ||
                recipe.name.toLowerCase().includes(filters.search);

            if (!isMatch) {
                isMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filters.search));
            }

            return isMatch;
        });
    }

    // Filtrer par ingrédient
    if (filters.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            let matchesAllIngredients = true;
            filters.ingredients.forEach(ingredientFilter => {
                let found = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(ingredientFilter));
                if (!found) {
                    matchesAllIngredients = false;
                }
            });
            return matchesAllIngredients;
        });
    }

    // Filtrer par appareil
    if (filters.appliance) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.appliance.toLowerCase().includes(filters.appliance)
        );
    }

    // Filtrer par ustensile
    if (filters.ustensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            let matchesAllUstensils = true;
            filters.ustensils.forEach(ustensilFilter => {
                let found = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilFilter));
                if (!found) {
                    matchesAllUstensils = false;
                }
            });
            return matchesAllUstensils;
        });
    }

    console.log('Recettes filtrées:', filteredRecipes);  // Log pour vérifier les données filtrées
    // Mettre à jour le compteur de recettes
    recipeCounter(filteredRecipes);
    displayRecipes(filteredRecipes); // Mettre à jour l'affichage avec les recettes filtrées
    displayFilter(filteredRecipes);
}

function handleSearch() {
    searchInput.addEventListener('input', function (event) {
        filters.search = event.target.value.trim().toLowerCase();
        applyFilters();
    });
}

export function filterCards() {
    handleSearch();
    applyFilters();
}
