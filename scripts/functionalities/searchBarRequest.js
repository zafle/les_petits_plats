class SearchBarRequest {
    /** Search bar request functionality
     *
     * @param {Array} recipes RecipeData Objects
     *
     */
    constructor(allRecipes, filteredRecipes) {
        // this._recipes = recipes
        this._allRecipes = allRecipes
        this._displayedRecipes = filteredRecipes

        console.log("searchbar")
        console.log("allRecipes")
        console.log(allRecipes)
        console.log("filteredRecipes")
        console.log(filteredRecipes)


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
    }

    // --- search request ---
    onSearchBarRequest() {
        this.$searchInput.addEventListener("input", (e) => {
            e.preventDefault()

            let request = SecureRequest.secure(e.target.value)

            if (request.length > 2) {
                this.sendRequest(request)
                this.$closeButton.classList.remove("d-none")

            } else {
                this.updateContent(this._displayedRecipes)
                this.$closeButton.classList.add("d-none")
            }
        })
    }

    sendRequest(request) {

        const sortedRecipes = Search.searchBarRequest(request, this._displayedRecipes)

        // if recipes
        if (sortedRecipes.length) {
            this.$noRecipe.innerText = ""
            this.updateContent(sortedRecipes)
            this.displayLabel(this._allRecipes, request, "search_bar", null)

        // if no recipes
        } else {
            this.displayNoRequestFound(request)
        }
    }

    updateContent(recipes) {
        const updateContent= new DisplayContent(this._allRecipes, recipes)
        updateContent.updateContent()
    }

    displayNoRequestFound(request) {
        // Remove recipes and tags
        this.$recipesCardsWrapper.innerHTML = ''
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
        // Display content
        this.$recipesAmount.innerText = `0 recettes`
        this.$noRecipe.innerText = `Aucune recette ne contient "${request}", vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
    }

    // --- Label ---
    displayLabel(allRecipes, request, type, filter) {
        try {
            const destination = "labels"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
    }


    // event listener on close button label
    onCloseLabel(closeButton, label) {

        closeButton.addEventListener("click", (e) => {

            // remove label
            label.remove()

            // get new recipes from new array of filters
            const filteredRecipes = SearchLabel.filterRecipesByLabels(this._allRecipes)
            this.updateContent(filteredRecipes)
        })
    }

    // run
    run() {
        this.onSearchBarRequest()
    }
}