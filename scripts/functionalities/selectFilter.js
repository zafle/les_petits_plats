/* global GetLabels DisplayContent Search Label */
class SelectFilter {
    /** Select Filter functionalities
     *
     * @param {Array} allRecipes RecipeData Objects
     * @param {Array} displayedRecipes RecipeData Objects --- displayed recipes to search within
     *
     */

    constructor(allRecipes, displayedRecipes) {

        // recipes
        this._allRecipes = allRecipes
        this._displayedRecipes = displayedRecipes

        // filters
        this.$ingredients_Input = document.querySelector(".filters__search__input[name='ingredients']")
        this.$appliances_Input = document.querySelector(".filters__search__input[name='appliances']")
        this.$ustensils_Input = document.querySelector(".filters__search__input[name='ustensils']")

        this.$ingredients_Wrapper = document.querySelector(".filters__tags--ingredients")
        this.$appliances_Wrapper = document.querySelector(".filters__tags--appliances")
        this.$ustensils_Wrapper = document.querySelector(".filters__tags--ustensils")

        this.$ingredients_Labels = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances_Labels = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils_Labels = document.querySelector(".filters-labels__list--ustensils")

        // labels
        this.$labelsList = document.querySelector(".search-labels__list")

        // search bar
        this.$searchBarInput = document.querySelector(".main-header__search-input")
        this.$closeBarButton = document.querySelector(".main-header__close-search")
    }

    // --- click and select filter tag functions ---

    onClickTag() {

        const tags = document.querySelectorAll(".filter__tag")

        tags.forEach(tag => {
            tag.addEventListener("click", (e) => {
                e.preventDefault()

                const request = e.target.innerText
                const type = e.target.dataset.tagType
                const filter = e.target.dataset.filter

                // send request and display result
                this.applyFilter(request, type, filter)
                // remove all selected filters tags from all filters list
                this.removeLabeledFilters()
                // clear filter search input
                this.clearFilterInput(filter)
                // clear search bar input => if add new filter = search bar request is over
                this.clearSearchBarInput()
            })
        })
    }

    removeLabeledFilters() {
        // remove all selected filters tags from all filters list

        // get all labels array
        const allLabels = GetLabels.getLabelsArray()

        // for each label, get name and origin (filter)
        allLabels.forEach(label => {
            const filter = label["filter"]
            const request = label["request"]
            // if label is not from search bar
            // remove filter tag that matches label
            if (filter !== "null") document.querySelector(`.filter__tag[data-tag-name="${request}"]`).remove()
        })
    }

    clearFilterInput(filter) {
        /** clear search filter input
         *
         * @param {string} filter
         *
         */

        if (this[`$${filter}_Input`].value !== "") this[`$${filter}_Input`].value = ""
    }

    clearSearchBarInput() {
        this.$closeBarButton.classList.add("d-none")
        if (this.$searchBarInput.value !== "") this.$searchBarInput.value = ""
        // add data-request to inform that the search is finished
        if (this.$searchBarInput.dataset.request !== "dead") this.$searchBarInput.dataset.request = "dead"
    }

    applyFilter(request, type, filter) {
        /** send search request, display result recipes and filters, display labels
         *
         * @param {string} request
         * @param {string} filter
         * @param {string} type
         *
         */

        // filter displayed recipes
        const filteredRecipes = Search.searchByFilter(request, filter, this._displayedRecipes)
        // update content
        new DisplayContent(this._allRecipes, filteredRecipes).updateContent()
        // display label
        this.displayLabels(this._allRecipes, request, type, filter)
    }

    //  --- add labels ---

    displayLabels(allRecipes, request, type, filter) {
        /** display labels from search
         *
         * @param {Array} allRecipes
         * @param {string} request
         * @param {string} type
         * @param {string} filter
         *
         */
        // display label in filters
        try {
            const destination = "filters"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
        // display label in main label section
        try {
            const destination = "labels"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
    }

    run() {
        this.onClickTag()
    }
}