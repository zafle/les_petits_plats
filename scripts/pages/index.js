class RecipesPage {
    /** Display homepage
     *
     */
    constructor() {
        this._recipesDatas = [];

        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
    }

    launchSearchBar() {
        const searchBar = new SearchBar()
        searchBar.run()
    }

    mapRecipes() {
        this._recipesDatas = recipes.map(recipe => new RecipeData(recipe))
    }

    displayRecipeCard(recipe) {
        const Template = new RecipeCard(recipe)
        this.$recipesCardsWrapper.append(Template.createRecipeCard())
    }

    createFiltersTags() {
        this._tagsDatas = new TagsDatas(this._recipesDatas)
        this._tagsDatas.createTags()
    }

    displayFiltersTags() {
        this.createFiltersTags()
        const filtersTags = new FiltersTags(this._tagsDatas)
        filtersTags.run()
    }

    displayContent() {
        this.mapRecipes()

        this._recipesDatas.forEach(recipe => {
            this.displayRecipeCard(recipe)
        })
    }

    run() {
        this.launchSearchBar()
        this.displayContent()
        this.displayFiltersTags()
    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()
}

init()