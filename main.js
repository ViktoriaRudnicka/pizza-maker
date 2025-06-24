const ingredients = {
    cheeses: [
        { name: "Cheder", price: 4, imgSrc: "img/img/ingredients/Cheeses/cheder.jpg" },
        { name: "Feta", price: 1, imgSrc: "img/img/ingredients/Cheeses/Feta.jpg" },
        { name: "Gorgonzola", price: 1, imgSrc: "img/img/ingredients/Cheeses/Gorgonzola.jpg" },
        { name: "Parmesan", price: 1, imgSrc: "img/img/ingredients/Cheeses/Parmesan.jpg" },
        { name: "Ricotta", price: 3, imgSrc: "img/img/ingredients/Cheeses/Ricotta.jpg" },
        { name: "Mozzarella", price: 3, imgSrc: "img/img/ingredients/Cheeses/Моцарелла.jpg" }
    ],
    meats: [
        { name: "Bacon", price: 3, imgSrc: "img/img/ingredients/Meat/Bacon.jpg" },
        { name: "Beef", price: 2, imgSrc: "img/img/ingredients/Meat/Beef.jpg" },
        { name: "Chicken", price: 2, imgSrc: "img/img/ingredients/Meat/Chicken.jpg" },
        { name: "Ham", price: 2, imgSrc: "img/img/ingredients/Meat/Ham.jpg" },
        { name: "Italian salami", price: 3, imgSrc: "img/img/ingredients/Meat/Italian salami.jpg" },
        { name: "Minced meat", price: 3, imgSrc: "img/img/ingredients/Meat/Minced meat.jpg" },
        { name: "Pepperoni", price: 4, imgSrc: "img/img/ingredients/Meat/Pepperoni.jpg" },
        { name: "Sausages", price: 3, imgSrc: "img/img/ingredients/Meat/Sausages.jpg" }
    ],
    seafood: [
        { name: "Anchovies", price: 1, imgSrc: "img/img/ingredients/Seafood/Anchovies.jpg" },
        { name: "Salmon", price: 3, imgSrc: "img/img/ingredients/Seafood/salmon.jpg" },
        { name: "Scallops", price: 5, imgSrc: "img/img/ingredients/Seafood/Scallops.jpg" },
        { name: "Shrimp", price: 5, imgSrc: "img/img/ingredients/Seafood/Shrimp.jpg" },
        { name: "Squid", price: 5, imgSrc: "img/img/ingredients/Seafood/Squid.jpg" }
    ],
    veggies: [
        { name: "Basil", price: 1, imgSrc: "img/img/ingredients/Vegetables/Basil.jpg" },
        { name: "Broccoli", price: 1, imgSrc: "img/img/ingredients/Vegetables/Broccoli.jpg" },
        { name: "Chili", price: 2, imgSrc: "img/img/ingredients/Vegetables/Chili.jpg" },
        { name: "Corn", price: 2, imgSrc: "img/img/ingredients/Vegetables/Corn.jpg" },
        { name: "Garlic", price: 1, imgSrc: "img/img/ingredients/Vegetables/Garlic.jpg" },
        { name: "Jalapeño", price: 2, imgSrc: "img/img/ingredients/Vegetables/Jalapeño.jpg" },
        { name: "Mushrooms", price: 3, imgSrc: "img/img/ingredients/Vegetables/Mushrooms.jpg" },
        { name: "Mussels", price: 4, imgSrc: "img/img/ingredients/Vegetables/Mussels.jpg" },
        { name: "Olives", price: 2, imgSrc: "img/img/ingredients/Vegetables/Olives.jpg" },
        { name: "Onions", price: 2, imgSrc: "img/img/ingredients/Vegetables/Onions.jpg" },
        { name: "Peppers", price: 2, imgSrc: "img/img/ingredients/Vegetables/Peppers.jpg" },
        { name: "Spinach", price: 1, imgSrc: "img/img/ingredients/Vegetables/Spinach.jpg" },
        { name: "Tomato", price: 2, imgSrc: "img/img/ingredients/Vegetables/tomato.jpg" }
    ]
};

const fullList = [...ingredients.cheeses, ...ingredients.meats, ...ingredients.seafood, ...ingredients.veggies];

let totalCost = 0;
let ingredientsCount = 50;

const generateIngredientCategories = () => {
    const categories = Object.keys(ingredients);

    categories.forEach(category => {
        const categoryDiv = $('<div class="category"></div>');
        const categoryTitle = $(`<h2 class="category-title">${category}</h2>`);
        const ingredientsList = $('<div class="ingredients-list"></div>');

        ingredients[category].forEach(ingredient => {
            const ingredientItem = $(`
                <div class="ingredient-item" data-name="${ingredient.name}">
                    <img src="${ingredient.imgSrc}" alt="${ingredient.name}">
                    <p>${ingredient.name} ${ingredient.price} UA</p>
                </div>
            `);

            ingredientsList.append(ingredientItem);
        });

        categoryDiv.append(categoryTitle);
        categoryDiv.append(ingredientsList);

        $('.ingredients-categories').append(categoryDiv);

        categoryTitle.on("click", () => {
            ingredientsList.fadeToggle(500);
        });
    });
};

const updateTotalCost = (price) => {
    totalCost += price;
    $("#total-cost").text(totalCost);
};

const addIngredientToPizza = (ingredient) => {
    if ($(`.pizza-base img[alt="${ingredient.name}"]`).length) {
        alert("Інгредієнт вже додано!");
        return;
    }

    const ingredientItem = $(`
        <div class="ingredient-item">
            <img src="${ingredient.imgSrc}" alt="${ingredient.name}">
            <p>${ingredient.name}</p>
        </div>
    `);

    $('.pizza-base').append(ingredientItem);

    ingredientItem.draggable({
        containment: ".pizza-base"
    });

    ingredientsCount++;
    updateTotalCost(ingredient.price);

    ingredientItem.on("click", () => {
        ingredientItem.remove();
        updateTotalCost(-ingredient.price);
        ingredientsCount--;
    });
};

$(document).ready(() => {
    generateIngredientCategories();

    $(".ingredients-categories").on("click", ".ingredient-item", function () {
        const ingredientName = $(this).data("name");
        const ingredient = fullList.find(i => i.name === ingredientName);
        if (ingredient) addIngredientToPizza(ingredient);
    });
});
