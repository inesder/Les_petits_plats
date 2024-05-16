// Importer les fonctions nécessaires depuis les modules correspondants
import recipes from '../datas/recipes.js';
import { displayRecipes } from '../templates/cards.js';
import { displayFilter } from '../templates/filter.js';
import { filterCards } from './filter.js';


    displayFilter(recipes);
    filterCards(displayRecipes);
    displayRecipes(recipes)
