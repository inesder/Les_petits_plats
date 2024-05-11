// Importer les fonctions nécessaires depuis les modules correspondants
import { displayRecipes } from '../templates/cards.js';
import { displayFilter } from '../templates/filter.js';
import { filterCards } from './filter.js';

// Ajouter un écouteur d'événement pour exécuter le code lorsque le contenu du document est entièrement chargé
document.addEventListener('DOMContentLoaded', function () {
    // Appeler la fonction pour afficher les filtres et lui passer la fonction displayRecipes
    // Cette fonction sera utilisée pour mettre à jour l'affichage des recettes lorsque les filtres sont appliqués
    displayFilter(displayRecipes);
    
    // Appeler la fonction pour trier et afficher les cartes de recettes
    // Cette fonction est responsable de la gestion de la recherche et du tri des recettes en fonction des filtres appliqués
    filterCards(displayRecipes);
});
