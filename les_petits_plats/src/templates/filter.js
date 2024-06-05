import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';  // Importer les filtres partagés
import { applyFilters } from '../scripts/filter.js';  // Importer la fonction applyFilters

const allIngredientItems = [];
const allEquipmentItems = [];
const allToolItems = [];

// Fonction pour créer un champ de recherche
function createSearchInput(id, onInput) {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    const formOutline = document.createElement('div');
    formOutline.classList.add('form-outline');
    formOutline.setAttribute('data-mdb-input-init', '');

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = id;
    searchInput.classList.add('form-control');

    // Ajout du gestionnaire d'événements pour l'entrée de recherche
    searchInput.addEventListener('input', function (event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            onInput(event);
        } /*else {
            // Si la longueur est inférieure à 3, mettreà jour le menu avec tous les éléments
            const allItems = id === 'ingredient-search' ? allIngredientItems :
                id === 'equipment-search' ? allEquipmentItems :
                    allToolItems;
            updateDropdownMenu(searchInput.closest('.dropdown-menu'), allItems);
        }*/
    });

    const searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.classList.add('btn', 'btn-primary');
    searchButton.setAttribute('data-mdb-ripple-init', '');

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fas', 'fa-search');

    // Assembler les éléments du champ de recherche
    formOutline.appendChild(searchInput);
    searchButton.appendChild(searchIcon);
    inputGroup.appendChild(formOutline);
    inputGroup.appendChild(searchButton);

    return inputGroup;
}

// Fonction pour créer un bouton de filtre
function createFilterButton(label) {
    const container = document.createElement('div');
    container.classList.add('btn-group');

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-secondary', 'btn-lg', 'dropdown-toggle');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'dropdown');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = label;

    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    container.appendChild(button);
    container.appendChild(dropdownMenu);

    return container;
}

// Fonction pour créer un tag avec un bouton de suppression
function createTag(tagText, filterType) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = tagText;

    const closeButton = document.createElement('span');
    closeButton.classList.add('tag-close');
    closeButton.textContent = 'x';

    // Ajout du gestionnaire d'événements pour supprimer le tag et mettre à jour les filtres
    closeButton.addEventListener('click', function () {
        tag.remove();
        if (filterType === 'ingredients' || filterType === 'ustensils') {
            const updatedFilters = [];
            for (let i = 0; i < filters[filterType].length; i++) {
                if (filters[filterType][i] !== tagText.toLowerCase()) {
                    updatedFilters.push(filters[filterType][i]);
                }
            }
            filters[filterType] = updatedFilters;
        } else {
            filters[filterType] = '';
        }
        applyFilters();
    });

    tag.appendChild(closeButton);
    document.querySelector('.tags-container').appendChild(tag);
}

// Fonction pour filtrer les éléments du menu déroulant en fonction de la recherche
function filterDropdownItems(items, searchTerm) {
    const filteredItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredItems.push(items[i]);
        }
    }
    return filteredItems;
}

// Fonction pour mettre à jour le menu déroulant avec les éléments filtrés
function updateDropdownMenu(dropdownMenu, items) {
    const searchInput = dropdownMenu.querySelector('.input-group');
    const searchInputElement = searchInput.querySelector('input');
    const searchValue = searchInputElement.value; // Conservez la valeur de l'input
    const searchFocus = document.activeElement === searchInputElement; // Conservez le focus de l'input

    dropdownMenu.innerHTML = '';
    dropdownMenu.prepend(searchInput); // Conservez l'input de recherche en place
    for (let i = 0; i < items.length; i++) {
        dropdownMenu.appendChild(items[i]);
    }

    // Restaurez la valeur et le focus de l'input après la mise à jour du menu
    searchInputElement.value = searchValue;
    if (searchFocus) {
        searchInputElement.focus();
    }
}

// Fonction pour créer le bouton de filtre des ingrédients
function createIngredientFilterButton(filteredRecipes) {
    const container = createFilterButton("Ingrédients");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    // Vider les éléments existants pour éviter les doublons
    allIngredientItems.length = 0;
    dropdownMenu.innerHTML = '';  // Vider le menu déroulant également

    // Collecter les ingrédients uniques des recettes
    const ingredients = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
            if (!ingredients.includes(ingredient) && !filters.ingredients.includes(ingredient)) {
                ingredients.push(ingredient);
            }
        }
    }

    // Créer les éléments de menu pour chaque ingrédient
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.href = "#";
        item.textContent = ingredient;

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        item.addEventListener('click', function () {
            if (!filters.ingredients.includes(ingredient.toLowerCase())) {
                filters.ingredients.push(ingredient.toLowerCase());
                applyFilters();
                createTag(ingredient, 'ingredients');
            }
        });
        allIngredientItems.push(item);
    }

    // Ajouter le champ de recherche dans le menu déroulant et le mettre à jour
    const searchInput = createSearchInput('ingredient-search', function (event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            const filteredItems = filterDropdownItems(allIngredientItems, searchTerm);
            updateDropdownMenu(dropdownMenu, filteredItems);
        } else {
            updateDropdownMenu(dropdownMenu, allIngredientItems);
        }
    });

    dropdownMenu.prepend(searchInput);
    updateDropdownMenu(dropdownMenu, allIngredientItems);
console.log('les ingredients:', ingredients)

    return container;
}


// Fonction pour créer le bouton de filtre des appareils
function createEquipmentFilterButton(filteredRecipes) {
    const container = createFilterButton("Appareils");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    allEquipmentItems.length = 0;
    dropdownMenu.innerHTML = '';

    // Collecter les appareils uniques des recettes
    const equipment = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const appliance = recipe.appliance.toLowerCase();
        if (recipe.appliance && !equipment.includes(recipe.appliance) && !filters.appliance.includes(appliance)) {
            equipment.push(recipe.appliance);
        }
    }

    // Créer les éléments de menu pour chaque appareil

    for (let i = 0; i < equipment.length; i++) {
        const item = equipment[i];
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = item.toLowerCase();

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        link.addEventListener('click', function () {
            const applianceLowerCase = item.toLowerCase();
            if (filters.appliance !== applianceLowerCase) {
                filters.appliance = applianceLowerCase;
                applyFilters();
                createTag(item, 'appliance');
            }
        });
        allEquipmentItems.push(link);
    }

    // Ajouter le champ de recherche dans le menu déroulant
    const searchInput = createSearchInput('equipment-search', function (event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            const filteredItems = filterDropdownItems(allEquipmentItems, searchTerm);
            updateDropdownMenu(dropdownMenu, filteredItems);
        } else {
            updateDropdownMenu(dropdownMenu, allEquipmentItems);
        }
    });

    dropdownMenu.prepend(searchInput);
    updateDropdownMenu(dropdownMenu, allEquipmentItems);
console.log('les appareils', equipment);
    return container;
}

// Fonction pour créer le bouton de filtre des ustensiles
function createToolFilterButton(filteredRecipes) {
    const container = createFilterButton("Ustensiles");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    allToolItems.length = 0;
    dropdownMenu.innerHTML = '';

    // Collecter les ustensiles uniques des recettes
    const tools = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        for (let j = 0; j < recipe.ustensils.length; j++) {
            const tool = recipe.ustensils[j].toLowerCase();
            if (!tools.includes(tool) && !filters.ustensils.includes(tool)) {
                tools.push(tool);
            }
        }
    }

    // Créer les éléments de menu pour chaque ustensile

    for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = tool;

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        link.addEventListener('click', function () {
            if (!filters.ustensils.includes(tool.toLowerCase())) {
                filters.ustensils.push(tool.toLowerCase());
                applyFilters();
                createTag(tool, 'ustensils');
            }
        });
        allToolItems.push(link);
    }

    // Ajouter le champ de recherche dans le menu déroulant
    const searchInput = createSearchInput('ustensil-search', function (event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            const filteredItems = filterDropdownItems(allToolItems, searchTerm);
            updateDropdownMenu(dropdownMenu, filteredItems);
        } else {
            updateDropdownMenu(dropdownMenu, allToolItems);
        }
    });

    dropdownMenu.prepend(searchInput);
    updateDropdownMenu(dropdownMenu, allToolItems);

    return container;
}

// Fonction principale pour afficher les filtres
export function displayFilter(filteredRecipes) {
    const filtersSection = document.querySelector('.filters-section');

    let filtersContainer = document.querySelector('.filters-container');
    let tagsContainer = document.querySelector('.tags-container');

    // Créer le conteneur de filtres s'il n'existe pas déjà
    if (!filtersContainer) {
        filtersContainer = document.createElement('div');
        filtersContainer.classList.add("filters-container");
        filtersSection.appendChild(filtersContainer);
    } else {
        filtersContainer.innerHTML = ''; // Nettoyer uniquement le conteneur de filtres
    }

    // Créer le conteneur de tags s'il n'existe pas déjà
    if (!tagsContainer) {
        tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        filtersSection.insertBefore(tagsContainer, filtersContainer);
    }

    // Créer les boutons de filtre pour les ingrédients, les appareils et les ustensiles
    const ingredientFilter = createIngredientFilterButton(filteredRecipes);
    const equipmentFilter = createEquipmentFilterButton(filteredRecipes);
    const toolFilter = createToolFilterButton(filteredRecipes);

    // Ajouter les boutons de filtre au conteneur de filtres
    filtersContainer.appendChild(ingredientFilter);
    filtersContainer.appendChild(equipmentFilter);
    filtersContainer.appendChild(toolFilter);
}

