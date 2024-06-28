class RecipesPage {
    constructor() {
        this._recipes = recipes;

        this.$recipeSection = document.querySelector(".recipes")
    }

    mapRecipes() {
        this._recipes = this._recipes.map(recipe => new RecipeData(recipe))
    }

    displayRecipes() {
        this.mapRecipes()
        this._recipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipeSection.append(Template.createRecipeCard())
        })
    }

    launchSearchBar() {
        const searchBar = new SearchBar()
        searchBar.run()
    }

    run() {
        this.displayRecipes()
        this.launchSearchBar()
    }


}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()

}

init()