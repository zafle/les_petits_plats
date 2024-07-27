class SearchBar {
    constructor(recipes, autocomplete) {

        // necessaire ?
        this._recipes = recipes

        // search bar
        this.$button = document.querySelector(".main-header__search-button")
        this.$searchInput = document.querySelector(".main-header__search-input")
        this.$closeButton = document.querySelector(".main-header__close-search")

        // recipe section
        this.$noRecipe = document.querySelector(".norecipe")

        // filter tags
        this.$filtersTags = document.querySelectorAll(".filters__tags")

        // labels
        this.$labelsList = document.querySelector(".search-labels__list")

        //  search request
        this.SearchBarRequest = new SearchBarRequest(this._recipes)
        this.Autocomplete = {}
    }

    // --- autocomplete ---
    createAutocomplete() {
        this.Autocomplete = new Autocomplete(this._recipes)
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
            let request = CustomString.secure(e.target.value)
            this.SearchBarRequest.customRequest(request)
        })
    }

    onSubmitRequestButton() {
        this.$button.addEventListener("click", (e) => {
            e.preventDefault()
        })
    }

    // run
    run() {
        this.createAutocomplete()
        this.onButtonHover()
        this.onCloseSearch()
        this.onSearchBarRequest()
        this.onSubmitRequestButton()
    }
}