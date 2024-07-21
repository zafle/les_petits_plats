class RecipesPage {
    /** Display homepage
     *
     */
    constructor() {
        this._recipesDatas = [];
        this._tagsDatas = []

        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
        this.$noRecipe = document.querySelector(".norecipe")

        this.$searchButton = document.querySelector(".main-header__search-button")
        this.$searchInput = document.querySelector(".main-header__search-input")
    }

    // Recipes Content
    mapRecipes() {
        this._recipesDatas = recipes.map(recipe => new RecipeData(recipe))
    }

    // displayRecipeCard(recipe) {
    //     const Template = new RecipeCard(recipe)
    //     this.$recipesCardsWrapper.append(Template.createRecipeCard())
    // }

    displayContent(recipes) {
        recipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }

    // // Filters Content
    // createFiltersTags() {
    //     this._tagsDatas = new TagsDatas(this._recipesDatas)
    //     this._tagsDatas.createTags()
    // }

    // displayFiltersTags() {
    //     this.createFiltersTags()
    //     const filtersTags = new FiltersTags(this._tagsDatas, this._recipesDatas)
    //     filtersTags.run()
    // }



    // Filters Functionnalities
    createFiltersTags() {
        this._tagsDatas = new TagsDatas(this._recipesDatas)
        this._tagsDatas.createTagsArrays()
    }
    runFilters() {
        const searchFilter = new SearchFilter(this._recipesDatas, this._tagsDatas)
        searchFilter.run()
    }

    // Search bar functionnality
    runSearchBar() {
        const searchBar = new SearchBar(this._recipesDatas)
        searchBar.run()
    }

    // run
    run() {
        this.mapRecipes()
        this.displayContent(this._recipesDatas)
        // this.displayFiltersTags()
        this.createFiltersTags()
        this.runFilters()
        this.runSearchBar()
    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()
}

init()