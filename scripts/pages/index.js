class RecipesPage {
    /** Display homepage and run functionnalities
     *
     */
    constructor() {
        this._recipesDatas = []
    }

    // Map recipes datas
    mapRecipes() {
        this._recipesDatas = recipes.map(recipe => new RecipeData(recipe))
    }


    // Display content and search functionalities
    displayContent() {
       const content = new DisplayContent(this._recipesDatas, this._recipesDatas)
       content.displayContent()
    }


    // Filters functionnalities
    runFilters() {
        const filters = new Filters()
        filters.run()

        // const searchFilter = new SearchFilter(this._recipesDatas)
        // searchFilter.run()

        // const selectFilter = new SelectFilter(this._recipesDatas)
        // selectFilter.run()
    }

    // Search bar functionnality
    runSearchBar() {
        const searchBar = new SearchBar(this._recipesDatas)
        searchBar.run()
    }

    // run
    run() {
        this.mapRecipes()
        this.displayContent()
        this.runFilters()
        this.runSearchBar()
    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()
}

init()