// Dans app.js
import { displayRecipes } from './cards.js';
import { displayFilter } from './filter.js';
import { sortCards } from './sort.js'

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    displayFilter();
    sortCards(displayRecipes); // Assurez-vous que cette fonction gère l'affichage initial
});
