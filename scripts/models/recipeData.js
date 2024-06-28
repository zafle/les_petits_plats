class RecipeData {
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
        const ingredients = this._ingredients.map(ingredient => new IngredientData(ingredient))
        this._ingredients = ingredients

        return this._ingredients
    }
}