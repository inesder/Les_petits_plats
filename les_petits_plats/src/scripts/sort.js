import recipes from '../datas/recipes.js';
import { filters } from './state.js';  // Importer les filtres partagés

const searchInput = document.querySelector('.search-input');

export function applyFilters(displayFilteredRecipes) {
    let tempFilteredRecipes = [];

    // Filtrer par recherche
    if (filters.search.length >= 3) {
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let isMatch = recipe.description.toLowerCase().includes(filters.search) ||
                          recipe.name.toLowerCase().includes(filters.search);

            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.search)) {
                    isMatch = true;
                    break;
                }
            }

            if (isMatch) {
                tempFilteredRecipes.push(recipe);
            }
        }
    } else {
        tempFilteredRecipes = [...recipes];
    }

    // Filtrer par ingrédient
    if (filters.ingredient) {
        let filteredByIngredient = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.ingredient)) {
                    filteredByIngredient.push(recipe);
                    break;
                }
            }
        }
        tempFilteredRecipes = filteredByIngredient;
    }

    // Filtrer par appareil
    if (filters.appliance) {
        let filteredByAppliance = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            if (recipe.appliance.toLowerCase().includes(filters.appliance)) {
                filteredByAppliance.push(recipe);
            }
        }
        tempFilteredRecipes = filteredByAppliance;
    }

    // Filtrer par ustensile
    if (filters.utensil) {
        let filteredByUtensil = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            for (let j = 0; j < recipe.ustensils.length; j++) {
                if (recipe.ustensils[j].toLowerCase().includes(filters.utensil)) {
                    filteredByUtensil.push(recipe);
                    break;
                }
            }
        }
        tempFilteredRecipes = filteredByUtensil;
    }

    console.log('Recettes filtrées:', tempFilteredRecipes);  // Log pour vérifier les données filtrées
    displayFilteredRecipes(tempFilteredRecipes);  // Mettre à jour l'affichage avec les recettes filtrées
}

function handleSearch(displayFilteredRecipes) {
    displayFilteredRecipes([...recipes]);  // Afficher toutes les recettes initialement

    searchInput.addEventListener('input', function(event) {
        filters.search = event.target.value.trim().toLowerCase();
        applyFilters(displayFilteredRecipes);
    });
}

export function sortCards(displayFilteredRecipes) {
    handleSearch(displayFilteredRecipes);
}
