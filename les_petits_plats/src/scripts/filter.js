import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';
import { displayFilter } from '../templates/filter.js';
import { displayRecipes } from '../templates/cards.js';

const searchInput = document.querySelector('.search-input');

// Appliquer les filtres et mettre à jour l'affichage 
export function applyFilters() {
    let filteredRecipes = [...recipes];

    // Filtrer par recherche dans la barre principale
    if (filters.search.length >= 3){
        filteredRecipes = filteredRecipes.filter(recipe => {
            let isMatch = recipe.description.toLowerCase().includes(filters.search) || recipe.name.toLowerCase().includes(filters.search)
        })
    }
}
