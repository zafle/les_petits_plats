class SearchBarRequest {
    /** Search bar request functionality
     *
     * @param {Array} recipes RecipeData Objects
     *
     */
    constructor(recipes) {
        this._allRecipes = recipes

        // search bar
        this.$button = document.querySelector(".main-header__search-button")
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

    // --- search bar events ---
    customRequest(request) {

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

        // this.$closeButton.classList.remove("d-none")

        // remove labels if some labels are displayed
        this.checkIfNewSearch()

        const filteredRecipes = this.searchFunction(request, filter)

        // if request found no recipes, display no recipe message
        if (filteredRecipes.length === 0) {
            this.displayNoRequestFound(request)

        } else {
            // display filtered recipes
            this.displayNewContent(filteredRecipes, request)
        }
    }

    searchFunction(request, filter) {
        if (filter === null) {
            const filteredRecipes = Search.searchByRequest(request, this._allRecipes)
            return filteredRecipes
        } else {
            const filteredRecipes = Search.searchByFilter(request, filter, this._allRecipes)
            return filteredRecipes
        }
    }

    // --- if new search ---

    checkIfNewSearch() {
        if (this.$searchInput.dataset.request === "dead") {
            this.startNewSearch()
        }
    }

    startNewSearch() {
        this.clearLabels()
        this.$searchInput.dataset.request = "alive"
    }

    // --- display content ---

    updateContent(recipes) {
        // display recipes and filters
        new DisplayContent(this._allRecipes, recipes).updateContent()
    }

    // --- update on request found ---

    displayNewContent(filteredRecipes, request) {
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
        // Remove recipes and tags
        this.$recipesCardsWrapper.innerHTML = ''
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
        // Display content
        this.$recipesAmount.innerText = `0`
        this.$noRecipe.innerText = `Aucune recette ne contient "${request}", vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
        // clear labels
        this.clearLabels()
    }

    clearNoRequestFound() {
        this.$noRecipe.innerText = ""
    }

    // --- Labels ---

    displayLabel(request) {
        try {
            const destination = "labels"
            new Label(this._allRecipes, request, "search_bar", null, destination).displayLabel()

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