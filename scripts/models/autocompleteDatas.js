/* global TagsDatas */
class AutocompleteDatas {
    /** Create the tags array for autocomplete functionality
     *
     * @param {Array} recipes RecipeData Objects
     *
     */

    constructor(recipes) {
        this._recipes = recipes

        this._filters = ["ingredients", "appliances", "ustensils"]

        this._autocompleteTags = []

        this._ingredientsTags = []
        this._appliancesTags = []
        this._ustensilsTags = []
    }

    get autocompleteTags() {

        // construct tags datas
        const tagsDatas = new TagsDatas(this._recipes)

        let allTags = []

        // for each type of filter, get tags from tagsDatas, map each array, and push each array into allTags array
        this._filters.forEach( filter => {
            this[`_${filter}Tags`] = this.createTagArray(tagsDatas[`${filter}Tags`], filter)
            allTags.push(this[`_${filter}Tags`])
        })

        // flat alltags array
        this._autocompleteTags = allTags.flat()

        return this._autocompleteTags
    }

    createTagArray(array, filter) {
        /** map the array of tags to to construs a key/value array : filter = filter's name and name = tag's name
         *
         * @param {Array} array array of tags
         * @param {String} filter type of filter
         *
         */

        const newArray = Array.from(array).map(item => {
            const rObj = {}
            rObj["filter"] = filter
            rObj["name"] = item
            return rObj
        })

        return newArray
    }
}
