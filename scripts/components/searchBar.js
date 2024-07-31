class SearchBar {
    /** Manage all search bar functionalities and event listeners
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

        // search request
        this.SearchBarRequest = new SearchBarRequest(this._allRecipes)
        this.Autocomplete = {}
    }

    // --- autocomplete ---
    launchAutocomplete() {
        this.Autocomplete = new Autocomplete(this._allRecipes, this.SearchBarRequest)
        this.Autocomplete.run()
    }

    //  --- bar event listeners ---
    onButtonHover() {
        this.$button.addEventListener("mouseover", () => {
            this.$button.src = "assets/images/magnifier-black.png"
        })
        this.$button.addEventListener("mouseout", () => {
            this.$button.src = "assets/images/magnifier-white.png"
        })
    }

    onCloseSearch() {
        this.$closeButton.addEventListener("click", () => {
            this.SearchBarRequest.resetSearch()
            this.SearchBarRequest.clearSearchInput()
            this.$closeButton.classList.add("d-none")
        })
    }

    onSearchBarRequest() {
        this.$searchInput.addEventListener("input", (e) => {
            e.preventDefault()
            this.$closeButton.classList.remove("d-none")
            // secure request
            let request = CustomString.secure(e.target.value)
            // send request
            this.SearchBarRequest.customRequest(request)
        })
    }

    onSubmitRequestButton() {
        this.$button.addEventListener("click", (e) => {
            e.preventDefault()
        })
    }

    run() {
        this.launchAutocomplete()
        this.onButtonHover()
        this.onCloseSearch()
        this.onSearchBarRequest()
        this.onSubmitRequestButton()
    }
}