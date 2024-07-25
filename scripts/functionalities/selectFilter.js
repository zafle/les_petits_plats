class SelectFilter {
    constructor(allRecipes, filteredRecipes) {
        // recipes
        this._allRecipes = allRecipes
        this._displayedRecipes = filteredRecipes

        // this.$filtersButtons = document.querySelectorAll(".filters__header")
        // this.$filtersInputs = document.querySelectorAll(".filters__search__input")

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

        // Recipes wrapper
        // this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
    }
    // --- click and select tag functions ---

    // event listener
    onClickTag() {
        const tags = document.querySelectorAll(".filter__tag")
        tags.forEach(tag => {
            tag.addEventListener("click", (e) => {
                e.preventDefault()
                const request = e.target.innerText
                const type = e.target.dataset.tagType
                const filter = e.target.dataset.filter
                this.applyFilter(request, type, filter)
                this.removeLabeledFilters()
                this.clearFilterInput(filter)
                // clear search bar input => if add new filter = search bar request is over
                this.clearSearchBarInput()
                // effacer message d'erreur
            })
        })
    }

    removeLabeledFilters() {
        const allLabels = GetLabels.getLabelsArray()
        allLabels.forEach(label => {
            const filter = label["filter"]
            const request = label["request"]
            console.log(request)
            // if label is not from search bar
            if (filter !== "null") {
                // remove filter that matches label
                document.querySelector(`.filter__tag[data-tag-name="${request}"]`).remove()
            }
        })
    }

    clearFilterInput(filter) {
        if (this[`$${filter}_Input`].value !== "") {
            this[`$${filter}_Input`].value = ""
        }
    }

    clearSearchBarInput() {
        if (this.$searchBarInput.value !== "") {
            this.$searchBarInput.value = ""
        }
        if (this.$searchBarInput.dataset.request !== "dead") {
            // add data-request to inform that the search is finished
            this.$searchBarInput.dataset.request = "dead"
        }
    }

    applyFilter(request, type, filter) {

        // filter recipes
        const filteredRecipes = Search.filterRecipes(request, filter, this._displayedRecipes)

        // update content
        new DisplayContent(this._allRecipes, filteredRecipes).updateContent()

        // remove labels that are in filters

        // display label
        this.displayLabels(this._allRecipes, request, type, filter)
    }

    //  --- add labels ---
    displayLabels(allRecipes, request, type, filter) {
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