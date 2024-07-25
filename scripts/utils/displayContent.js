class DisplayContent {
    /** Display content for filters and recipes
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
    }

    // --- create arrays of tags from RecipeData objects ---
    createTagsDatas() {
        const tagsDatas = new TagsDatas(this._filteredRecipes)
        tagsDatas.createTagsArrays()
        this._tagsDatas = tagsDatas
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

    //  --- recipes ---
    displayRecipes() {
        // create a template for each recipe card and append it to recipes section
        this._filteredRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    // --- recipes amount ---
    displayAmount() {
        // get 2 digits min number from the total amount of recipes tha are being displayed
        const nbRecipes = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(this._filteredRecipes.length)
        // update the total number of recipes
        this.$recipesAmount.innerText = nbRecipes
    }

    // launch functionalities for new recipes and new filters
    launchFunctionalities() {
        // new SearchFilter().onSearchTagRequest()
        new SelectFilter(this._allRecipes, this._filteredRecipes).run()
    }

    // clear recipe section and filters
    clearContent() {
        this.$recipesCardsWrapper.innerHTML = ''
        this.$filtersTags.forEach(filter => filter.innerHTML = "")
    }

    displayContent() {
        this.createTagsDatas()
        this.displayFilters()
        this.displayRecipes()
        this.displayAmount()
        this.launchFunctionalities()
    }

    updateContent() {
        this.clearContent()
        this.displayContent()
    }
}