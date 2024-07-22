/* global SearchBar */

class SearchBar {
    constructor(recipes) {
        this._recipes = recipes

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
            this.clearContent()
            this.updateContent(this._recipes)
        })
    }

    onSearchBarRequest() {
        this.$searchInput.addEventListener("input", (e) => {

            let request = SecureRequest.secure(e.target.value)

            if (request.length > 2) {
                this.sendRequest(request)
                this.$closeButton.classList.remove("d-none")

            } else {
                this.updateContent(this._recipes)
                this.$closeButton.classList.add("d-none")
            }
        })
    }

    // --- search request ---
    sendRequest(request) {

        const searchRecipes = new Search()
        const sortedRecipes = searchRecipes.fire(request, this._recipes)

        this.clearContent()

        // if recipes
        if (sortedRecipes.length) {
            this.updateContent(sortedRecipes)
            this.displaySearchLabelRequest(request)

        // if no recipes
        } else {
            this.$recipesAmount.innerText = `0 recettes`
            this.$noRecipe.innerText = `Aucune recette ne contient "${request}", vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
        }
    }

    // --- Tags ---
    updateTags(recipes) {
        const newTagsDatas = new TagsDatas(recipes)
        newTagsDatas.createTagsArrays()

        const newFilters = new SearchFilter(recipes, newTagsDatas)
        newFilters.displayFiltersTags()
    }
    //  --- recipes ---
    updateRecipes(recipes) {
        this.$noRecipe.innerText = ""

        recipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    // --- recipes amount ---
    updateAmount(sortedRecipes) {
        RecipesAmount.updateAmount(sortedRecipes)
    }

    // --- Label ---
    displaySearchLabelRequest(request) {
        const label = new Label()
        label.displaySearchLabel(request, "search_bar")
    }

    // --- content ---
    clearContent() {
        // Remove recipes and tags
        this.$recipesCardsWrapper.innerHTML = ''
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
    }

    updateContent(recipes) {
        this.updateTags(recipes)
        this.updateRecipes(recipes)
        this.updateAmount(recipes)
    }





    // run
    run() {
        this.buttonHover()
        this.onSearchBarRequest()
        this.closeSearch()
    }
}