import recipes from '../datas/recipes.js';
import { filters } from './state.js';  // Importer les filtres partagés
import { applyFilters } from './sort.js';  // Importer la fonction applyFilters

function createIngredientFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Ingrédients");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    const ingredients = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.add(ingredient.ingredient);
        });
    });
    ingredients.forEach(ingredient => {
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.href = "#";
        item.textContent = ingredient;
        item.addEventListener('click', function() {
            filters.ingredient = ingredient.toLowerCase();
            applyFilters(displayFilteredRecipes);
            createTag(ingredient, 'ingredient', displayFilteredRecipes);  // Créer un tag
        });
        dropdownMenu.appendChild(item);
    });
    return container;
}

function createEquipmentFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Appareils");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    const equipment = new Set();
    recipes.forEach(recipe => {
        if (recipe.appliance) {
            equipment.add(recipe.appliance);
        }
    });
    equipment.forEach(item => {
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = item;
        link.addEventListener('click', function() {
            filters.appliance = item.toLowerCase();
            applyFilters(displayFilteredRecipes);
            createTag(item, 'appliance', displayFilteredRecipes);  // Créer un tag
        });
        dropdownMenu.appendChild(link);
    });
    return container;
}

function createToolFilterButton(displayFilteredRecipes) {
    const container = createFilterButton("Ustensiles");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    const tools = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            tools.add(ustensil);
        });
    });
    tools.forEach(tool => {
        const link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.href = "#";
        link.textContent = tool;
        link.addEventListener('click', function() {
            filters.utensil = tool.toLowerCase();
            applyFilters(displayFilteredRecipes);
            createTag(tool, 'utensil', displayFilteredRecipes);  // Créer un tag
        });
        dropdownMenu.appendChild(link);
    });
    return container;
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

function createTag(tagText, filterType, displayFilteredRecipes) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = tagText;

    const closeButton = document.createElement('span');
    closeButton.classList.add('tag-close');
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', function() {
        tag.remove();
        filters[filterType] = '';  // Supprimer le filtre correspondant
        applyFilters(displayFilteredRecipes);
    });

    tag.appendChild(closeButton);
    document.querySelector('.tags-container').appendChild(tag);
}

export function displayFilter(displayFilteredRecipes) {
    const filtersSection = document.querySelector('.filters-section');
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add("filters-container");
    filtersSection.appendChild(filtersContainer); 
    
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');
    filtersSection.insertBefore(tagsContainer, filtersContainer);

    const ingredientFilter = createIngredientFilterButton(displayFilteredRecipes);
    const equipmentFilter = createEquipmentFilterButton(displayFilteredRecipes);
    const toolFilter = createToolFilterButton(displayFilteredRecipes);

    filtersContainer.appendChild(ingredientFilter);
    filtersContainer.appendChild(equipmentFilter);
    filtersContainer.appendChild(toolFilter);
}
