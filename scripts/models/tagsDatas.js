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
        return this._ingredientsTags
    }

    get appliancesTags() {
        return this._appliancesTags
    }

    get ustensilsTags() {
        return this._ustensilsTags
    }

    // build an array of tags for each filter
    createTagsArrays() {

        this._recipes.forEach(recipe => {

            recipe.ingredientsTags.forEach(ingredient => {
                this.checkTagExists(ingredient, this._ingredientsTags)
            })

            this.checkTagExists(recipe.appliancesTags, this._appliancesTags)

            recipe.ustensilsTags.forEach(ustensil => {
                this.checkTagExists(ustensil, this._ustensilsTags)
            })
        })
    }

    checkTagExists(tag, array) {
        /** return only uniques tags
         *
         * @param {string} tag recipe property to test
         * @param {Array} array array of tags to create
         */

        let tagExists = false

        // for each first iteration of the createTagsArrays() loop, the array is empty => array.length === 0
        if (array.length) {
            // for each item of the array, check if the tag already exists
            for (let item of array) {
                if (item.toLowerCase() === tag.toLowerCase()) {
                    tagExists = true
                    break
                }
            }
        }
        if (tagExists === false) {
            array.push(tag)
        }
    }
}