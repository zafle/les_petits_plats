class RecipeData {
    /** Constructor pattern for recipe's datas
     *
     * @param {Object} recipe RecipeData
     */
    constructor(recipe) {
        this._recipe = recipe
        this._id = recipe.id
        this._image = recipe.image
        this._name = recipe.name
        this._servings = recipe.servings
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._ingredients = recipe.ingredients
        this._ustensils = recipe.ustensils
    }

    get id() {
        return this._id
    }

    get image() {
        return `../assets/medias/${this._image}`
    }

    get time() {
        return `${this._time}min`
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get ingredients() {
        return this._ingredients.map(ingredient => new IngredientData(ingredient))
    }

    get ingredientsTags() {
        return this._ingredients.map(element => element.ingredient)
    }

    get applianceTag() {
        return this._appliance
    }

    get ustensilsTags() {
        return this._ustensils
    }
}