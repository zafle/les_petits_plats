class RecipeCard {
    /** Template to display recipe card
     *
     * @param {Object} recipe RecipeData
     *
     */
    constructor(recipe) {
        this._recipe = recipe
        this._ingredients = recipe.ingredients

        this.$card = document.createElement("article")
    }

    createRecipeIngredientsList() {
        let list = ""

        this._ingredients.forEach(ingredient => {
            const li =  `
                <li class="ingredient__item">
                    <p class="ingredient__name">${ingredient.name}</p>
                    <p class="ingredient__quantity">${ingredient.quantity}</p>
                </li>
            `
            list += li
        })
        return list
    }

    createRecipeCard() {
        this.$card.classList.add("recipe")
        this.$card.dataset.id = this._recipe.id

        this.$card.innerHTML = `
            <img src="${this._recipe.image}" alt="${this._recipe.name}" class="recipe__image">
            <span class="recipe__time">${this._recipe.time}</span>
            <div class="recipe__description">
                <h2 class="recipe__name">${this._recipe.name}</h2>
                <h3 class="recipe__subtitle">Recette</h3>
                <p class="recipe__recipe">${this._recipe.description}</p>
                <h3 class="recipe__subtitle">Ingrédients</h3>
                <ul class="ingredient__list">
                    ${this.createRecipeIngredientsList()}
                </ul>
            </div>
        `
        return this.$card
    }
}