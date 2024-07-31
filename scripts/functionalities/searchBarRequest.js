/* global Search DisplayContent Label */

class SearchBarRequest {
    /** Search bar request functionality
     *
     * @param {Array} recipes RecipeData Objects
     *
     */
    constructor(recipes) {

        this._allRecipes = recipes

        // search bar
        this.$searchInput = document.querySelector(".main-header__search-input")
        this.$closeButton = document.querySelector(".main-header__close-search")

        // recipe section
        this.$noRecipe = document.querySelector(".norecipe")
        this.$recipesAmount = document.getElementById("recipes_amount")
        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")

        // filter tags
        this.$filtersTags = document.querySelectorAll(".filters__tags")

        // labels
        this.$labelsList = document.querySelector(".search-labels__list")
        this.$filtersLabelsLists = document.querySelectorAll(".filters-labels__list")
    }

    // --- search requests ---

    customRequest(request) {
        /** search bar request from user input entry
         *
         * @param {String} request
         *
         */

        if (request.length > 2) {
            this.sendRequest(request, null)

        // if user erase caracters and request is null
        } else if (request.length === 0) {
            // if all recipes are not displayed, display all recipes --- reset recipes and search
            if (parseInt(this.$recipesAmount) !== this._allRecipes.length) {
                this.resetSearch()
            }
        }
    }

    sendRequest(request, filter) {
        /** send search bar request (from custom user's input or from autocomplete tag selection)
         *
         * @param {String} request
         * @param {String} filter type of filter
         *
         */

        // remove labels if some labels are displayed
        this.checkIfNewSearch()

        const filteredRecipes = this.searchFunction(request, filter)

        // if request found no recipes, display no recipe message
        if (!filteredRecipes.length) {
            this.displayNoRequestFound(request)

        } else {
            // display filtered recipes
            this.displayNewContent(filteredRecipes, request)
        }
    }

    searchFunction(request, filter) {
        /** determine wich kind of search to execute
         *
         * @param {String} request
         * @param {String} filter type of filter
         *
         */

        const filteredRecipes = (filter === null) ? Search.searchByRequest(request, this._allRecipes) : Search.searchByFilter(request, filter, this._allRecipes)
        return filteredRecipes
    }

    // --- if new search ---
    checkIfNewSearch() {
        if (this.$searchInput.dataset.request === "dead") {
            this.clearLabels()
            this.$searchInput.dataset.request = "alive"
        }
    }

    // --- display content ---

    updateContent(recipes) {
        /** update content
         *
         * @param {Array} recipes
         *
         */

        // display recipes and filters
        new DisplayContent(this._allRecipes, recipes).updateContent()
    }

    // --- update on request found ---

    displayNewContent(filteredRecipes, request) {
        /** update content
         *
         * @param {Array} filteredRecipes
         * @param {String} request
         *
         */
        this.clearNoRequestFound()
        this.updateContent(filteredRecipes)
        this.displayLabel(request)
    }

    // --- clear content ---

    clearSearchInput()  {
        this.$searchInput.value = ""
    }

    removeCloseButton() {
        this.$closeButton.classList.add("d-none")
    }

    resetSearch() {
        this.removeCloseButton()
        this.clearLabels()
        this.clearNoRequestFound()
        this.updateContent(this._allRecipes)
    }

    // --- Request not found ---

    displayNoRequestFound(request) {
        /** display no recipes found message
         *
         * @param {String} request
         *
         */

        // Remove recipes and tags
        this.$recipesCardsWrapper.innerHTML = ""
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
        // Display content
        this.$recipesAmount.innerText = `0`
        this.$noRecipe.innerHTML = `Aucune recette ne contient <strong>"${request}"</strong>, vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
        // clear labels
        this.clearLabels()
    }

    clearNoRequestFound() {
        this.$noRecipe.innerText = ""
    }

    // --- Labels ---

    displayLabel(request) {
        /** display request label
         *
         * @param {String} request
         *
         */

        try {
            new Label(this._allRecipes, request, "search_bar", null, "labels").displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
    }

    clearLabels() {
        this.$labelsList.innerHTML = ""
        this.$filtersLabelsLists.forEach(list => {
            list.innerHTML = ""
            list.classList.add("d-none")
        })
    }
}