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

        let filteredRecipes = []

        const allLabels = GetLabels.getLabelsArray()

        if (allLabels !== null) {
            filteredRecipes = this.sendRequest(allLabels)

        } else {
            filteredRecipes = this._allRecipes
        }

        this.displayRecipes(filteredRecipes)
    }

    sendRequest(allLabels) {
        // new search from labels list
        return Search.searchByLabel(allLabels, this._allRecipes)
    }

    displayRecipes(filteredRecipes) {
        // update content
        new DisplayContent(this._allRecipes, filteredRecipes).updateContent()
    }
}