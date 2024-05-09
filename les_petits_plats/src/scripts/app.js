// app.js
import { displayRecipes } from './cards.js';
import { displayFilter } from './filter.js';
import { sortCards } from './sort.js';

document.addEventListener('DOMContentLoaded', function() {
    displayFilter(displayRecipes);
    sortCards(displayRecipes); 
});
