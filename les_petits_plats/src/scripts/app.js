// Dans app.js
import { displayRecipes } from './cards.js';
import { displayFilter } from './filter.js';

// Appel de la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', displayFilter);
document.addEventListener('DOMContentLoaded', displayRecipes);

