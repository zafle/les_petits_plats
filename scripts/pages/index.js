class RecipesPage {
    /** Display homepage
     *
     */
    constructor() {
        this._recipesDatas = [];

        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
        this.$noRecipe = document.querySelector(".norecipe")

        this.$searchButton = document.querySelector(".main-header__search-button")
        this.$searchInput = document.querySelector(".main-header__search-input")
    }

    // Recipes
    mapRecipes() {
        this._recipesDatas = recipes.map(recipe => new RecipeData(recipe))
    }

    displayRecipeCard(recipe) {
        const Template = new RecipeCard(recipe)
        this.$recipesCardsWrapper.append(Template.createRecipeCard())
    }

    displayContent(recipes) {
        recipes.forEach(recipe => {
            this.displayRecipeCard(recipe)
        })
    }

    // Filters
    createFiltersTags() {
        this._tagsDatas = new TagsDatas(this._recipesDatas)
        this._tagsDatas.createTags()
    }

    displayFiltersTags() {
        this.createFiltersTags()
        const filtersTags = new FiltersTags(this._tagsDatas)
        filtersTags.run()
    }

    // Search bar
    runSearchBar() {
        const searchBar = new SearchBar(this._recipesDatas)
        searchBar.run()
    }

    // run
    run() {
        this.mapRecipes()
        this.displayContent(this._recipesDatas)
        this.displayFiltersTags()
        this.runSearchBar()
    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()
}

init()