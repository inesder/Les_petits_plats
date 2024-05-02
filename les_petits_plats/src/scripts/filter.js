import recipes from '../datas/recipes.js';

function createIngredientFilterButton(recipes) {
    const container = createFilterButton("Ingrédients");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    // Logique pour ajouter les ingrédients uniques au menu déroulant
    const ingredients = new Set(); // Utiliser un Set pour éviter les doublons
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
        dropdownMenu.appendChild(item);
    });
    return container;
}

function createEquipmentFilterButton(recipes) {
    const container = createFilterButton("Appareils");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    // Logique similaire pour les appareils
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
        dropdownMenu.appendChild(link);
    });
    return container;
}

function createToolFilterButton(recipes) {
    const container = createFilterButton("Ustensiles");
    const dropdownMenu = container.querySelector('.dropdown-menu');
    // Logique similaire pour les ustensiles
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


export function displayFilter() {
    const filtersSection = document.querySelector('.filters-section');
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add("filters-container");
    filtersSection.appendChild(filtersContainer); 

    const ingredientFilter = createIngredientFilterButton(recipes);
    const equipmentFilter = createEquipmentFilterButton(recipes);
    const toolFilter = createToolFilterButton(recipes);

    filtersContainer.appendChild(ingredientFilter);
    filtersContainer.appendChild(equipmentFilter);
    filtersContainer.appendChild(toolFilter);
}
