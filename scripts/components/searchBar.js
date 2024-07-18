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
        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
        this.$recipesAmount = document.getElementById("recipes_amount")
        this.$labelsList = document.querySelector(".search-labels__list")

        // filter tags
        this.$filtersTags = document.querySelectorAll(".filters__tags")
    }

    // bar
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
            this.displayAllRecipes()
        })
    }

    // Tags
    updateTags(sortedRecipes) {
        this.$filtersTags.forEach(filter => filter.innerHTML = "")

        const newTagsDatas = new TagsDatas(sortedRecipes)
        newTagsDatas.createTags()

        const newFilterTags = new FiltersTags(newTagsDatas)
        newFilterTags.displayTags()
    }

    // launchClickTagEvent() {
    // }

    launchSearchTagEvent() {

    }

    // Recipes
    displayAllRecipes() {
        this.displayRecipes(this._recipes)
        this.$closeButton.classList.add("d-none")
    }

    displayRecipes(sortedRecipes) {
        this.$noRecipe.innerText = ""

        sortedRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    displayNbRecipes(sortedRecipes) {
        // get 2 digits min number
        const nbRecipes = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(sortedRecipes.length)
        this.$recipesAmount.innerText = `${nbRecipes} recettes`
    }

    displaySearchRequest(request) {
        const labelSearch = document.createElement("li")
        labelSearch.classList.add("d-flex", "justify-content-between", "align-items-center", "bg-primary", "rounded-6", "h-53", "px-20")
        labelSearch.innerHTML = `
            <span class="me-60 text-black fs-2">${request}</span>
            <img src="assets/images/close-label.png" alt="remove label" class="close-label w-10 h-10 cursor-pointer">
        `
        this.$labelsList.append(labelSearch)

        const closeButton = document.querySelector(".close-label")

        this.onClickSearchLabel(closeButton, labelSearch)
    }

    onClickSearchLabel(closeButton, label) {
        closeButton.addEventListener("click", (e) => {
            label.remove()

            // ici ajouter du code pour afficher les recettes en fonction des filtres éventuellmetn sélectionnés
        })
    }

    // search
    secureRequest(request) {
        // replace multiple spaces, tab, new lines... with single space
        request = request.replace(/\s\s+/g, ' ')
        // keep only authorised caracters : spaces, letters, ', -
        request = request.replace(/[^\x20\x2DA-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF']/g, '')

        return request
    }

    sendRequest(request) {

        const searchRecipes = new Search()
        const sortedRecipes = searchRecipes.fire(request, this._recipes)

        this.$recipesCardsWrapper.innerHTML = ''

        if (sortedRecipes.length) {
            this.displayRecipes(sortedRecipes)
            this.displayNbRecipes(sortedRecipes)
            this.displaySearchRequest(request)
            this.updateTags(sortedRecipes)

        } else {
            this.$noRecipe.innerText = `Aucune recette ne contient "${request}", vous pouvez chercher "Tarte aux Pommes", "Poisson", etc.`
        }

        this.$closeButton.classList.remove("d-none")
    }

    launchSearchEvent() {
        this.$searchInput.addEventListener("input", (e) => {

            let request = this.secureRequest(e.target.value)

            if (request.length > 2) {
                this.sendRequest(request)
            } else {
                this.displayAllRecipes()
            }
        })
    }

    // run
    run() {
        this.buttonHover()
        this.launchSearchEvent()
        this.closeSearch()
    }
}