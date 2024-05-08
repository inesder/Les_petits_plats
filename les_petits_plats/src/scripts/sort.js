import recipes from '../datas/recipes.js';

const searchInput = document.querySelector('.search-input');

function handleSearch(displayFilteredRecipes) {
    displayFilteredRecipes([...recipes]);  // Afficher toutes les recettes initialement

    searchInput.addEventListener('input', function(event) {
        const inputValue = event.target.value.trim().toLowerCase();
        let tempFilteredRecipes = [];
        if (inputValue.length >= 3) {
            recipes.forEach(recipe => {
                let isMatch = recipe.description.toLowerCase().includes(inputValue) ||
                              recipe.name.toLowerCase().includes(inputValue);
                              for (let j = 0; j < recipe.ingredients.length; j++) {
                                if (recipe.ingredients[j].ingredient.toLowerCase().includes(inputValue)) {
                                    isMatch = true;
                                    break;
                                }
                            }
                if (isMatch) {
                    tempFilteredRecipes.push(recipe);
                }
            });
        } else {
            tempFilteredRecipes = [...recipes];  // Retour à toutes les recettes si la recherche est vide ou moins de 3 caractères
        }
        console.log('Recettes filtrées:', tempFilteredRecipes);  // Log pour vérifier les données filtrées
        displayFilteredRecipes(tempFilteredRecipes);  // Mettre à jour l'affichage avec les recettes filtrées
    });
}



export function sortCards(displayFilteredRecipes) {
    handleSearch(displayFilteredRecipes);
}
