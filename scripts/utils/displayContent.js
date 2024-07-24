class DisplayContent {
    /** Display content for filters and recipes
     *
     * @param {Array} allRecipes RecipeData Objects
     * @param {Array} filteredRecipes RecipeData Objects
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

    // --- create Tags datas ---
    createTagsDatas() {
        const tagsDatas = new TagsDatas(this._filteredRecipes)
        tagsDatas.createTagsArrays()
        this._tagsDatas = tagsDatas
    }

    // display Filters tags ---
    displayFilters() {
        const filtersTags = new FiltersTags(this._tagsDatas)
        this._filters.forEach(filter => {
            const tags = filtersTags.createTags(filter)
            tags.forEach(tag => {
                this[`$${filter}Tags`].append(tag)
            })
        })
    }

    //  --- recipes ---
    displayRecipes() {
        this._filteredRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    // --- recipes amount ---
    displayAmount() {
        // get 2 digits min number
        const nbRecipes = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(this._filteredRecipes.length)
        this.$recipesAmount.innerText = `${nbRecipes} recettes`
    }

    // launch functionalities with new recipes and tags datas
    launchFunctionalities() {
        const searchFilter = new SearchFilter()
        searchFilter.run()

        const selectFilter = new SelectFilter(this._allRecipes, this._filteredRecipes)
        selectFilter.run()

        const searchBarRequest = new SearchBarRequest(this._allRecipes, this._filteredRecipes)
        searchBarRequest.run()
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