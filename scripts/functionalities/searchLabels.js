/* global GetLabels DisplayContent Search */
class SearchLabels {
    /** Functionality to search recipes from all displayed labels
     *
     * @param {Array} allRecipes RecipeData Objects
     *
     */
    constructor(allRecipes) {
        this._allRecipes = allRecipes

        // search bar
        this.$searchInput = document.querySelector(".main-header__search-input")
        this.$closeButton = document.querySelector(".main-header__close-search")
    }

    searchAllLabels() {
        // get all labels array
        const allLabels = GetLabels.getLabelsArray()

        let filteredRecipes

        if (allLabels !== null) {
            // new search from labels list
            filteredRecipes = Search.searchByLabel(allLabels, this._allRecipes)

        } else {
            // display all recipes
            filteredRecipes = this._allRecipes
            // clear search bar input
            this.$searchInput.value = ""
            this.$closeButton.classList.add("d-none")
        }

        // update content
        new DisplayContent(this._allRecipes, filteredRecipes).updateContent()
    }
}