// app.js
import { displayRecipes } from '../templates/cards.js';
import { displayFilter } from '../templates/filter.js';
import { sortCards } from './filter.js';

document.addEventListener('DOMContentLoaded', function () {
    displayFilter(displayRecipes);
    sortCards(displayRecipes);
});
