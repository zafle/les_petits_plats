/* global GetLabels DisplayContent Search */
class SearchLabels {
    /** Functionality to search recipes from all displayed labels
     *
     * @param {Array} allRecipes RecipeData Objects
     *
     */
    constructor(allRecipes) {
        this._allRecipes = allRecipes
    }

    searchAllLabels() {
        // get all labels array
        const allLabels = GetLabels.getLabelsArray()
        // new search from labels list
        const filteredRecipes = (allLabels !== null) ? Search.searchByLabel(allLabels, this._allRecipes) : this._allRecipes
        // update content
        new DisplayContent(this._allRecipes, filteredRecipes).updateContent()
    }
}