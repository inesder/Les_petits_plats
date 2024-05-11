// Importer les recettes et les filtres partagés
import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';

// Sélectionner l'élément d'entrée de recherche principal
const searchInput = document.querySelector('.search-input');

// Fonction pour appliquer les filtres et mettre à jour l'affichage des recettes
export function applyFilters(displayFilteredRecipes) {
    let tempFilteredRecipes = [...recipes]; // Initialiser avec toutes les recettes

    // Filtrer par recherche dans la barre principale
    if (filters.search.length >= 3) {
        let filteredBySearch = [];
        // Parcourir toutes les recettes pour vérifier les correspondances avec le terme de recherche
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let isMatch = recipe.description.toLowerCase().includes(filters.search) ||
                          recipe.name.toLowerCase().includes(filters.search);

            // Vérifier si un des ingrédients correspond au terme de recherche
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.search)) {
                    isMatch = true;
                    break;
                }
            }

            // Si une correspondance est trouvée, ajouter la recette aux résultats filtrés
            if (isMatch) {
                filteredBySearch.push(recipe);
            }
        }
        // Mettre à jour la liste des recettes filtrées
        tempFilteredRecipes = filteredBySearch;
    }

    // Filtrer par ingrédient
    if (filters.ingredients.length > 0) {
        let filteredByIngredient = [];
        // Parcourir toutes les recettes pour vérifier les correspondances avec les ingrédients sélectionnés
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let matchesAllIngredients = true;
            // Parcourir tous les ingrédients sélectionnés
            for (let k = 0; k < filters.ingredients.length; k++) {
                let found = false;
                // Vérifier si chaque ingrédient sélectionné est présent dans la recette
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    if (recipe.ingredients[j].ingredient.toLowerCase().includes(filters.ingredients[k])) {
                        found = true;
                        break;
                    }
                }
                // Si un ingrédient sélectionné n'est pas trouvé, la recette ne correspond pas
                if (!found) {
                    matchesAllIngredients = false;
                    break;
                }
            }
            // Si la recette contient tous les ingrédients sélectionnés, l'ajouter aux résultats filtrés
            if (matchesAllIngredients) {
                filteredByIngredient.push(recipe);
            }
        }
        // Mettre à jour la liste des recettes filtrées
        tempFilteredRecipes = filteredByIngredient;
    }

    // Filtrer par appareil
    if (filters.appliance) {
        let filteredByAppliance = [];
        // Parcourir toutes les recettes pour vérifier les correspondances avec l'appareil sélectionné
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            if (recipe.appliance.toLowerCase().includes(filters.appliance)) {
                filteredByAppliance.push(recipe);
            }
        }
        // Mettre à jour la liste des recettes filtrées
        tempFilteredRecipes = filteredByAppliance;
    }

    // Filtrer par ustensile
    if (filters.ustensils.length > 0) {
        let filteredByUstensil = [];
        // Parcourir toutes les recettes pour vérifier les correspondances avec les ustensiles sélectionnés
        for (let i = 0; i < tempFilteredRecipes.length; i++) {
            let recipe = tempFilteredRecipes[i];
            let matchesAllustensils = true;
            // Parcourir tous les ustensiles sélectionnés
            for (let k = 0; k < filters.ustensils.length; k++) {
                let found = false;
                // Vérifier si chaque ustensile sélectionné est présent dans la recette
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    if (recipe.ustensils[j].toLowerCase().includes(filters.ustensils[k])) {
                        found = true;
                        break;
                    }
                }
                // Si un ustensile sélectionné n'est pas trouvé, la recette ne correspond pas
                if (!found) {
                    matchesAllustensils = false;
                    break;
                }
            }
            // Si la recette contient tous les ustensiles sélectionnés, l'ajouter aux résultats filtrés
            if (matchesAllustensils) {
                filteredByUstensil.push(recipe);
            }
        }
        // Mettre à jour la liste des recettes filtrées
        tempFilteredRecipes = filteredByUstensil;
    }

    console.log('Recettes filtrées:', tempFilteredRecipes);  // Log pour vérifier les données filtrées
    displayFilteredRecipes(tempFilteredRecipes);  // Mettre à jour l'affichage avec les recettes filtrées
}

// Fonction pour gérer la recherche principale et les champs de recherche des filtres
function handleSearch(displayFilteredRecipes) {
    // Afficher toutes les recettes initialement
    displayFilteredRecipes([...recipes]);

    // Ajouter un écouteur d'événement pour la barre de recherche principale
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

// Fonction pour initier le tri et le filtrage des cartes de recettes
export function filterCards(displayFilteredRecipes) {
    handleSearch(displayFilteredRecipes);
}
