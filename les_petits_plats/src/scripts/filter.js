import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';
import { displayFilter } from '../templates/filter.js'
import { displayRecipes } from '../templates/cards.js';

const searchInput = document.querySelector('.search-input');

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
}
