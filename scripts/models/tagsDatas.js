class TagsDatas {
    /** Constructor patternfor tags'datas from all recipes
     *
     * @param {Array} recipes RecipeData Objects
     *
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
        /** create an array of uniques tags from filter type
         *
         * @param {String} filter type of filter
         *
         */

        // map recipes with filter tags and then flat arrays
        const tags = this._recipes.flatMap(recipe => recipe[`${filter}Tags`])

        // transform tag to lower case and capitalize first letter to allow finding duplicates
        const capitalizedTagsArray = tags.map(tag => this.capitalizeFirstLetter(tag))

        // return new array with uniques values
        return Array.from(new Set(capitalizedTagsArray))
    }

    capitalizeFirstLetter(string) {
        /** transform tag to lower case and capitalize first letter
         *
         * @param {String} string tag's name
         *
         */

        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    }
}