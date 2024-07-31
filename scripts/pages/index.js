/* global recipes RecipeData DisplayContent Filters SearchBar*/
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

    // Display content, search and select filter functionalities
    displayContent() {
        new DisplayContent(this._recipesDatas, this._recipesDatas).displayContent()
    }

    // Filters functionnalities
    runFilters() {
        new Filters().run()
    }

    // Search bar functionnality
    runSearchBar() {
        new SearchBar(this._recipesDatas).run()
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
    new RecipesPage().run()
}

init()