/* global TagsDatas FiltersTags RecipeCard SelectFilter */
class DisplayContent {
    /** Display or update content for filters and recipes
     *
     * @param {Array} allRecipes RecipeData Objects --- to display all recipes when needed
     * @param {Array} filteredRecipes RecipeData Objects --- to display a filtered array of recipes
     *
     */
    constructor(allRecipes, filteredRecipes) {

        this._allRecipes = allRecipes
        this._filteredRecipes = filteredRecipes
        this._tagsDatas = []

        this._filters = ["ingredients", "appliances", "ustensils"]

        // recipe section HTML Element
        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")

        // filters HTML Elements
        this.$filtersTags = document.querySelectorAll(".filters__tags")
        this.$ingredientsTags = document.querySelector(".filters__tags--ingredients")
        this.$appliancesTags = document.querySelector(".filters__tags--appliances")
        this.$ustensilsTags = document.querySelector(".filters__tags--ustensils")

        // amount HTML Element
        this.$recipesAmount = document.getElementById("recipes_amount")
        this.$textAmount = document.getElementById("recipes_amount_text")
    }

    // --- create arrays of tags from RecipeData objects ---
    createTagsDatas() {
        this._tagsDatas = new TagsDatas(this._filteredRecipes)
    }

    // --- display Filters tags ---
    displayFilters() {
        // instantiate new FiltersTags Template from the TagsDatas constructor
        const filtersTags = new FiltersTags(this._tagsDatas)

        this._filters.forEach(filter => {

            // create an array of filters tags for each filter
            const tags = filtersTags.createTags(filter)
            // append each filter tag to its HTML wrapper
            tags.forEach(tag => {
                this[`$${filter}Tags`].append(tag)
            })
        })
    }

    //  --- display recipes cards ---
    displayRecipes() {
        // create a template for each recipe card and append it to recipes section
        this._filteredRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    // --- display recipes amount ---
    displayAmount() {
        const recipesAmount = this._filteredRecipes.length
        let displayedAmount = recipesAmount

        // get 2 digits min number from the total amount of recipes that are being displayed
        if (recipesAmount > 0) {
            displayedAmount = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(recipesAmount)
        }
        // update the total number of recipes
        this.$recipesAmount.innerText = displayedAmount

        // update amount text
        if (parseInt(recipesAmount) < 2) {
            this.$textAmount.innerText = "recette"
        } else {
            this.$textAmount.innerText = "recettes"
        }
    }

    // launch select filter functionalities for new filters
    launchNewFilters() {
        new SelectFilter(this._allRecipes, this._filteredRecipes).run()
    }

    // clear recipe section and filters
    clearContent() {
        this.$recipesCardsWrapper.innerHTML = ""
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
    }

    displayContent() {
        this.createTagsDatas()
        this.displayFilters()
        this.displayRecipes()
        this.displayAmount()
        this.launchNewFilters()
    }

    updateContent() {
        this.clearContent()
        this.displayContent()
    }
}