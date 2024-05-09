import recipes from '../datas/recipes.js';
import { filters } from './state.js';  // Importer les filtres partagés

const searchInput = document.querySelector('.search-input');

export function applyFilters(displayFilteredRecipes) {
    let tempFilteredRecipes = [...recipes];

    // Appliquer le filtre de recherche
    if (filters.search.length >= 3) {
        tempFilteredRecipes = tempFilteredRecipes.filter(recipe => {
            let isMatch = recipe.description.toLowerCase().includes(filters.search) ||
                          recipe.name.toLowerCase().includes(filters.search);

            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.search)) {
                    isMatch = true;
                    break;
                }
            }

            return isMatch;
        });
    }

    // Appliquer le filtre d'ingrédient
    if (filters.ingredient) {
        tempFilteredRecipes = tempFilteredRecipes.filter(recipe => {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.ingredient)) {
                    return true;
                }
            }
            return false;
        });
    }

    // Appliquer le filtre d'appareil
    if (filters.appliance) {
        tempFilteredRecipes = tempFilteredRecipes.filter(recipe => 
            recipe.appliance.toLowerCase().includes(filters.appliance)
        );
    }

    // Appliquer le filtre d'ustensile
    if (filters.utensil) {
        tempFilteredRecipes = tempFilteredRecipes.filter(recipe => {
            for (let j = 0; j < recipe.ustensils.length; j++) {
                if (recipe.ustensils[j].toLowerCase().includes(filters.utensil)) {
                    return true;
                }
            }
            return false;
        });
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
