class TagsDatas {
    /** Constructor patternfor tags'datas from all recipes
     *
     * @param {Array} recipes RecipeData Objects
     */
    constructor(recipes) {
        this._recipes = recipes

        this._ingredientsTags = []
        this._appliancesTags = []
        this._ustensilsTags = []
    }

    get ingredientsTags() {
        this._ingredientsTags = this.createArray("ingredients")
        return this._ingredientsTags
    }

    get appliancesTags() {
        this._appliancesTags = this.createArray("appliances")
        return this._appliancesTags
    }

    get ustensilsTags() {
        this._ustensilsTags = this.createArray("ustensils")
        return this._ustensilsTags
    }

    createArray(filter) {
        const tags = this._recipes.flatMap(recipe => recipe[`${filter}Tags`])
        const capitalizedTagsArray = tags.map(tag => this.capitalizeFirstLetter(tag))
        return Array.from(new Set(capitalizedTagsArray))
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    }
}