class SearchBar {
    constructor(recipes) {

        // necessaire ?
        this._recipes = recipes

        // search bar
        this.$button = document.querySelector(".main-header__search-button")
        this.$searchInput = document.querySelector(".main-header__search-input")
        this.$closeButton = document.querySelector(".main-header__close-search")

        // recipe section
        this.$noRecipe = document.querySelector(".norecipe")
        // this.$recipesAmount = document.getElementById("recipes_amount")
        // this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")

        // filter tags
        this.$filtersTags = document.querySelectorAll(".filters__tags")

        // labels
        this.$labelsList = document.querySelector(".search-labels__list")

        //  search request
        this.SearchBar = new SearchBarRequest(this._recipes)

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
            this.SearchBar.closeSearch()
        })
    }

    onSearchBarRequest() {
        this.$searchInput.addEventListener("input", (e) => {
            e.preventDefault()

            let request = SecureRequest.secure(e.target.value)
            this.SearchBar.searchBarRequest(request)
        })
    }

    onSubmitRequestButton() {
        this.$button.addEventListener("click", (e) => {
            e.preventDefault()
        })
    }




    // run
    run() {
        this.onButtonHover()
        this.onCloseSearch()
        this.onSearchBarRequest()
        this.onSubmitRequestButton()
    }
}