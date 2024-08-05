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


        const tagsDatas = new TagsDatas(this._recipes)
        tagsDatas.createTagsArrays()

        let allTags = []

        this._filters.forEach( filter => {
            this[`_${filter}Tags`] = this.createTagArray(tagsDatas[`_${filter}Tags`], filter)
            allTags.push(this[`_${filter}Tags`])
        })

        this._autocompleteTags = allTags.flat()
        return this._autocompleteTags
    }

    createTagArray(array, filter) {

        const newArray = Array.from(array).map(item => {
            const rObj = {}
            rObj["filter"] = filter
            rObj["name"] = item
            return rObj
        })

        return newArray
    }
}
