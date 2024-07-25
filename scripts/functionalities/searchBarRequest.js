class SearchBarRequest {
    /** Search bar request functionality
     *
     * @param {Array} recipes RecipeData Objects
     *
     */
    constructor(recipes) {
        // this._recipes = recipes
        this._allRecipes = recipes
        this._displayedRecipes = recipes

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
    searchBarRequest(request) {
        console.log(request.length)

        //  check if the search has to be reset (remove all labels and update content befor search)
        console.log("this.$searchInput.dataset.request")
        console.log(this.$searchInput.dataset.request)

        if (this.$searchInput.dataset.request === "dead") {
            this.startNewSearch()
        }



        if (request.length > 2) {
            this.sendRequest(request)

        } else if (request.length === 0) {
            // if user erase caracters and request is null
            // if all recipes are not displayed, display all recipes --- reset search
            // if (this._displayedRecipes.length !== this._allRecipes.length) {
                console.log("updated reset")
                this.clearSearchInput()
                this.clearLabels()
                this.clearNoRequestFound()
                this.updateContent(this._allRecipes)
            // }
        }

    }

    startNewSearch() {
        this.clearLabels()
        this.updateContent(this._allRecipes)
        this.$searchInput.dataset.request = "alive"
    }

    // onSubmitRequestButton() {
    //     this.$button.addEventListener("click", (e) => {
    //         e.preventDefault()
    //     })
    // }

    closeSearch() {
        this.$closeButton.addEventListener("click", () => {
            this.clearSearchInput()
            this.clearLabels()
            this.clearNoRequestFound()
            this.updateContent(this._allRecipes)
            // this.resetSearch()
        })
    }

    // --- actions on search request ---

    sendRequest(request) {

        // add condition here
        this.$closeButton.classList.remove("d-none")

        // send search request into displayed recipes only
        const filteredRecipes = Search.searchBarRequest(request, this._allRecipes)

        // console.log("send request has been done and :")
        // console.log("filteredRecipes")
        // console.log(filteredRecipes)
        // console.log("this._displayedRecipes")
        // console.log(this._displayedRecipes)

        // if request found no recipes, display no recipe message
        if (filteredRecipes.length === 0) {
            this.displayNoRequestFound(request)

        // if request found recipes

        //  check if

        // check if number of filtered recipes are equal to displayed recipes
        //  if not equal
        // } else if (filteredRecipes.length !== this._displayedRecipes.length) {
        } else {
            // console.log("filterde recipes are not equal to displayed ones, then update is done")
            this.clearNoRequestFound()
            this.updateContent(filteredRecipes)
            this.displayLabel(this._allRecipes, request, "search_bar", null)
        }

        // if equal
        // } else {
        //     console.log("update label")
        //     this.displayLabel(this._allRecipes, request, "search_bar", null)

        // }
    }


    // --- display  ---
    updateContent(recipes) {
        // display recipes and filters
        new DisplayContent(this._allRecipes, recipes).updateContent()
        // update displayed recipes
        // this._displayedRecipes = recipes
        // console.log("this._displayedRecipes updated")
        // console.log("this._displayedRecipes :")
        // console.log(this._displayedRecipes)
        // console.log("should be equal to :")
        // console.log(recipes)
    }

    clearSearchInput()  {
        this.$searchInput.value = ""
        this.$closeButton.classList.add("d-none")
    }

    // resetSearch() {
    //     this.$closeButton.classList.add("d-none")
    //     this.clearLabels()
    //     this.updateContent(this._allRecipes)
    // }

    displayNoRequestFound(request) {
        // Remove recipes and tags
        this.$recipesCardsWrapper.innerHTML = ''
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
        // Display content
        this.$recipesAmount.innerText = `0 recettes`
        this.$noRecipe.innerText = `Aucune recette ne contient "${request}", vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
        // clear labels
        this.clearLabels()
        this._displayedRecipes = this._allRecipes
    }

    clearNoRequestFound() {
        this.$noRecipe.innerText = ""
    }



    // --- Label ---
    clearLabels() {
        this.$labelsList.innerHTML = ""
        this.$filtersLabelsLists.forEach(list => {
            list.innerHTML = ""
            list.classList.add("d-none")
        })
    }

    displayLabel(allRecipes, request, type, filter) {
        try {
            const destination = "labels"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
    }



    // run
    // run() {
    //     this.onSearchBarRequest()
    //     this.onCloseRequest()
    //     this.onSubmitRequestButton()
    // }
}