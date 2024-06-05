import recipes from '../datas/recipes.js'; // Ajout de l'importation de recipes
import { filters } from '../models/state.js';  // Importer les filtres partagés
import { applyFilters } from '../scripts/filter.js';  // Importer la fonction applyFilters

const allIngredientItems = [];
const allEquipmentItems = [];
const allToolItems = [];

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

    searchInput.addEventListener('input', function (event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            onInput(event);
        }/* else {
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

    formOutline.appendChild(searchInput);
    searchButton.appendChild(searchIcon);
    inputGroup.appendChild(formOutline);
    inputGroup.appendChild(searchButton);

    return inputGroup;
}

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

function createTag(tagText, filterType) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = tagText;

    const closeButton = document.createElement('span');
    closeButton.classList.add('tag-close');
    closeButton.textContent = 'x';

    closeButton.addEventListener('click', function () {
        tag.remove();
        if (filterType === 'ingredients' || filterType === 'ustensils') {
            filters[filterType] = filters[filterType].filter(filter => filter !== tagText.toLowerCase());
        } else {
            filters[filterType] = '';
        }
        applyFilters();
    });

    tag.appendChild(closeButton);
    document.querySelector('.tags-container').appendChild(tag);
}

function filterDropdownItems(items, searchTerm) {
    return items.filter(item => item.textContent.toLowerCase().includes(searchTerm.toLowerCase()));
}

function updateDropdownMenu(dropdownMenu, items) {
    const searchInput = dropdownMenu.querySelector('.input-group');
    const searchInputElement = searchInput.querySelector('input');
    const searchValue = searchInputElement.value;
    const searchFocus = document.activeElement === searchInputElement;

    dropdownMenu.innerHTML = '';
    dropdownMenu.prepend(searchInput);
    items.forEach(item => dropdownMenu.appendChild(item));

    searchInputElement.value = searchValue;
    if (searchFocus) {
        searchInputElement.focus();
    }
}

function createIngredientFilterButton(filteredRecipes) {
    const container = createFilterButton("Ingrédients");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    allIngredientItems.length = 0;
    dropdownMenu.innerHTML = '';

    const ingredients = [];
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredientObj => {
            const ingredient = ingredientObj.ingredient.toLowerCase();
            if (!ingredients.includes(ingredient)) {
                ingredients.push(ingredient);
            }
        });
    });

    ingredients.forEach(ingredient => {
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.href = "#";
        item.textContent = ingredient;

        item.addEventListener('click', function () {
            if (!filters.ingredients.includes(ingredient)) {
                filters.ingredients.push(ingredient);
                applyFilters();
                createTag(ingredient, 'ingredients');
            }
        });
        allIngredientItems.push(item);
    });

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

    return container;
}

function createEquipmentFilterButton(filteredRecipes) {
    const container = createFilterButton("Appareils");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    allEquipmentItems.length = 0;
    dropdownMenu.innerHTML = '';

    const equipment = [];
    filteredRecipes.forEach(recipe => {
        const appliance = recipe.appliance.toLowerCase();
        if (appliance && !equipment.includes(appliance)) {
            equipment.push(appliance);
        }
    });

    equipment.forEach(appliance => {
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = appliance;

        link.addEventListener('click', function () {
            if (filters.appliance !== appliance) {
                filters.appliance = appliance;
                applyFilters();
                createTag(appliance, 'appliance');
            }
        });
        allEquipmentItems.push(link);
    });

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

    return container;
}

function createToolFilterButton(filteredRecipes) {
    const container = createFilterButton("Ustensiles");
    const dropdownMenu = container.querySelector('.dropdown-menu');

    allToolItems.length = 0;
    dropdownMenu.innerHTML = '';

    const tools = [];
    filteredRecipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            const lowerCaseUstensil = ustensil.toLowerCase();
            if (!tools.includes(lowerCaseUstensil)) {
                tools.push(lowerCaseUstensil);
            }
        });
    });

    tools.forEach(tool => {
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = tool;

        link.addEventListener('click', function () {
            if (!filters.ustensils.includes(tool)) {
                filters.ustensils.push(tool);
                applyFilters();
                createTag(tool, 'ustensils');
            }
        });
        allToolItems.push(link);
    });

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

export function displayFilter(filteredRecipes) {
    const filtersSection = document.querySelector('.filters-section');

    let filtersContainer = document.querySelector('.filters-container');
    let tagsContainer = document.querySelector('.tags-container');

    if (!filtersContainer) {
        filtersContainer = document.createElement('div');
        filtersContainer.classList.add("filters-container");
        filtersSection.appendChild(filtersContainer);
    } else {
        filtersContainer.innerHTML = '';
    }

    if (!tagsContainer) {
        tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        filtersSection.insertBefore(tagsContainer, filtersContainer);
    }

    const ingredientFilter = createIngredientFilterButton(filteredRecipes);
    const equipmentFilter = createEquipmentFilterButton(filteredRecipes);
    const toolFilter = createToolFilterButton(filteredRecipes);

    filtersContainer.appendChild(ingredientFilter);
    filtersContainer.appendChild(equipmentFilter);
    filtersContainer.appendChild(toolFilter);
}
