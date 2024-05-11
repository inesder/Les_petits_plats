import recipes from '../datas/recipes.js';
import { filters } from '../models/state.js';  // Importer les filtres partagés
import { applyFilters } from '../scripts/filter.js';  // Importer la fonction applyFilters

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
    searchInput.addEventListener('input', onInput);

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
function createTag(tagText, filterType, displayFilteredRecipes) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = tagText;

    const closeButton = document.createElement('span');
    closeButton.classList.add('tag-close');
    closeButton.textContent = 'x';

    // Ajout du gestionnaire d'événements pour supprimer le tag et mettre à jour les filtres
    closeButton.addEventListener('click', function() {
        tag.remove();
        if (filterType === 'ingredients' || filterType === 'ustensils') {
            // Mise à jour des filtres pour supprimer l'élément correspondant
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
        applyFilters(displayFilteredRecipes);
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
    dropdownMenu.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        dropdownMenu.appendChild(items[i]);
    }
}

// Fonction pour créer le bouton de filtre des ingrédients
function createIngredientFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Ingrédients");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    // Collecter les ingrédients uniques des recettes
    const ingredients = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient;
            if (!ingredients.includes(ingredient)) {
                ingredients.push(ingredient);
            }
        }
    }

    // Créer les éléments de menu pour chaque ingrédient
    const allIngredientItems = [];
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.href = "#";
        item.textContent = ingredient;

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        item.addEventListener('click', function() {
            filters.ingredients.push(ingredient.toLowerCase());
            applyFilters(displayFilteredRecipes);
            createTag(ingredient, 'ingredients', displayFilteredRecipes);
        });
        allIngredientItems.push(item);
    }

    // Mettre à jour le menu déroulant avec tous les ingrédients
    updateDropdownMenu(dropdownMenu, allIngredientItems);

    // Ajouter le champ de recherche dans le menu déroulant
    dropdownMenu.appendChild(createSearchInput('ingredient-search', function(event) {
        const searchTerm = event.target.value;
        const filteredItems = filterDropdownItems(allIngredientItems, searchTerm);
        updateDropdownMenu(dropdownMenu, filteredItems);
    }));

    return container;
}

// Fonction pour créer le bouton de filtre des appareils
function createEquipmentFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Appareils");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    // Collecter les appareils uniques des recettes
    const equipment = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.appliance && !equipment.includes(recipe.appliance)) {
            equipment.push(recipe.appliance);
        }
    }

    // Créer les éléments de menu pour chaque appareil
    const allEquipmentItems = [];
    for (let i = 0; i < equipment.length; i++) {
        const item = equipment[i];
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = item;

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        link.addEventListener('click', function() {
            filters.appliance = item.toLowerCase();
            applyFilters(displayFilteredRecipes);
            createTag(item, 'appliance', displayFilteredRecipes);
        });
        allEquipmentItems.push(link);
    }

    // Mettre à jour le menu déroulant avec tous les appareils
    updateDropdownMenu(dropdownMenu, allEquipmentItems);

    // Ajouter le champ de recherche dans le menu déroulant
    dropdownMenu.appendChild(createSearchInput('equipment-search', function(event) {
        const searchTerm = event.target.value;
        const filteredItems = filterDropdownItems(allEquipmentItems, searchTerm);
        updateDropdownMenu(dropdownMenu, filteredItems);
    }));

    return container;
}

// Fonction pour créer le bouton de filtre des ustensiles
function createToolFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Ustensiles");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    // Collecter les ustensiles uniques des recettes
    const tools = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        for (let j = 0; j < recipe.ustensils.length; j++) {
            const ustensil = recipe.ustensils[j];
            if (!tools.includes(ustensil)) {
                tools.push(ustensil);
            }
        }
    }

    // Créer les éléments de menu pour chaque ustensile
    const allToolItems = [];
    for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = tool;

        // Ajout du gestionnaire d'événements pour mettre à jour les filtres et créer un tag
        link.addEventListener('click', function() {
            filters.ustensils.push(tool.toLowerCase());
            applyFilters(displayFilteredRecipes);
            createTag(tool, 'ustensils', displayFilteredRecipes);
        });
        allToolItems.push(link);
    }

    // Mettre à jour le menu déroulant avec tous les ustensiles
    updateDropdownMenu(dropdownMenu, allToolItems);

    // Ajouter le champ de recherche dans le menu déroulant
    dropdownMenu.appendChild(createSearchInput('ustensil-search', function(event) {
        const searchTerm = event.target.value;
        const filteredItems = filterDropdownItems(allToolItems, searchTerm);
        updateDropdownMenu(dropdownMenu, filteredItems);
    }));

    return container;
}

// Fonction principale pour afficher les filtres
export function displayFilter(displayFilteredRecipes) {
    const filtersSection = document.querySelector('.filters-section');
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add("filters-container");
    filtersSection.appendChild(filtersContainer); 
    
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');
    filtersSection.insertBefore(tagsContainer, filtersContainer);

    // Créer les boutons de filtre pour les ingrédients, les appareils et les ustensiles
    const ingredientFilter = createIngredientFilterButton(displayFilteredRecipes);
    const equipmentFilter = createEquipmentFilterButton(displayFilteredRecipes);
    const toolFilter = createToolFilterButton(displayFilteredRecipes);

    // Ajouter les boutons de filtre au conteneur de filtres
    filtersContainer.appendChild(ingredientFilter);
    filtersContainer.appendChild(equipmentFilter);
    filtersContainer.appendChild(toolFilter);
}
