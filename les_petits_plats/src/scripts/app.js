import recipes from '../datas/recipes.js';
import { displayRecipes } from '../templates/cards.js';
import { displayFilter } from '../templates/filter.js';
import { filterCards } from './filter.js';

displayFilter(recipes);
filterCards();
displayRecipes(recipes);
