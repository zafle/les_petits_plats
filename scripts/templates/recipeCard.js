class RecipeCard {
    /** Template to display recipe card
     *
     * @param {Object} recipe RecipeData
     *
     */
    constructor(recipe) {
        this._recipe = recipe
        this._ingredients = recipe.ingredients

        // this.$card = document.createElement("article")
        this.$cardWrapper = document.createElement("div")
        // this.$card = document.createElement("div")
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

    //  bootstrap
    createRecipeIngredientsBootstrapList() {
        let list = ""

        this._ingredients.forEach(ingredient => {
            const li =  `
                <li class="ingredient__item ">
                    <p class="ingredient__name fs-2 fw-medium text-dark mb-0">${ingredient.name}</p>
                    <p class="ingredient__quantity fs-2 text-secondary mb-0">${ingredient.quantity}</p>
                </li>
            `
            list += li
        })
        return list
    }

    createRecipeBootstrapCard() {
        this.$cardWrapper.classList.add("col")
        this.$cardWrapper.innerHTML = `
            <div class="card h-100 border-0 rounded-9">
                <img src="${this._recipe.image}" alt="${this._recipe.name}" class="recipe__image card-img-top h-253 object-fit-cover rounded-top-9">
                <div class="card-img-overlay h-253 p-20">
                    <span class="recipe__time fs-1 float-end bg-primary text-black w-63 h-26 rounded-pill text-center lh-lg">${this._recipe.time}</span>
                </div>
                <div class="card-body pt-30 px-25 pb-60">
                    <h2 class="recipe__name card-title fs-4 text-black mb-30 font-title">${this._recipe.name}</h2>
                    <h3 class="recipe__subtitle card-subtitle fs-1 text-secondary fw-bold text-uppercase mb-15">Recette</h3>
                    <p class="recipe__recipe card-text lh-sm h-76 fs-2 overflow-hidden text-dark">${this._recipe.description}</p>
                    <h3 class="recipe__subtitle card-subtitle fs-1 text-secondary fw-bold text-uppercase mb-15">Ingrédients</h3>
                    <ul class="ingredient__list list-unstyled row row-cols-2 gx-30 gy-20 mb-0">
                        ${this.createRecipeIngredientsBootstrapList()}
                    </ul>

                </div>
            </div>
        `
        return this.$cardWrapper


    }
}