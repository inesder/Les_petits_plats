import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';  // Importer les filtres partagés

const searchInput = document.querySelector('.search-input');

export function applyFilters(displayFilteredRecipes) {
    let tempFilteredRecipes = [...recipes];

    // Filtrer par recherche
    if (filters.search.length >= 3) {
        let filteredBySearch = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let isMatch = recipe.description.toLowerCase().includes(filters.search) ||
                          recipe.name.toLowerCase().includes(filters.search);

            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.search)) {
                    isMatch = true;
                    break;
                }
            }

            if (isMatch) {
                filteredBySearch.push(recipe);
            }
        }
        tempFilteredRecipes = filteredBySearch;
    }

    // Filtrer par ingrédient
    if (filters.ingredients.length > 0) {
        let filteredByIngredient = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let matchesAllIngredients = true;
            for (let k = 0; k < filters.ingredients.length; k++) {
                let found = false;
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.ingredients[k])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    matchesAllIngredients = false;
                    break;
                }
            }
            if (matchesAllIngredients) {
                filteredByIngredient.push(recipe);
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
    if (filters.ustensils.length > 0) {
        let filteredByUstensil = [];
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let matchesAllustensils = true;
            for (let k = 0; k < filters.ustensils.length; k++) {
                let found = false;
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    if (recipe.ustensils[j].toLowerCase().includes(filters.ustensils[k])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    matchesAllustensils = false;
                    break;
                }
            }
            if (matchesAllustensils) {
                filteredByUstensil.push(recipe);
            }
        }
        tempFilteredRecipes = filteredByUstensil;
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

    // Ajouter des écouteurs d'événements pour les champs de recherche des filtres
    
    document.getElementById('ingredient-search').addEventListener('input', function(event) {
        filters.ingredientSearch = event.target.value.trim().toLowerCase();
        applyFilters(displayFilteredRecipes);
    });

    document.getElementById('equipment-search').addEventListener('input', function(event) {
        filters.applianceSearch = event.target.value.trim().toLowerCase();
        applyFilters(displayFilteredRecipes);
    });

    document.getElementById('ustensil-search').addEventListener('input', function(event) {
        filters.ustensilsearch = event.target.value.trim().toLowerCase();
        applyFilters(displayFilteredRecipes);
    });
}

export function sortCards(displayFilteredRecipes) {
    handleSearch(displayFilteredRecipes);
}
