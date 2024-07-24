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

    }

    //  --- bar event listeners ---
    buttonHover() {
        this.$button.addEventListener("mouseover", () => {
            this.$button.src = "assets/images/magnifier-black.png"
        })
        this.$button.addEventListener("mouseout", () => {
            this.$button.src = "assets/images/magnifier-white.png"
        })
    }


    closeSearch() {
        this.$closeButton.addEventListener("click", () => {
            this.$searchInput.value = ""

            // afficher recettes avec filtres en cours => nouvelle recherche
            // this.updateContent(this._recipes)
        })
    }



    // run
    run() {
        this.buttonHover()
        this.closeSearch()
    }
}