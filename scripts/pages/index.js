class RecipesPage {
    /** Display homepage
     *
     */
    constructor() {
        this._recipesDatas = [];

        this.$recipeSection = document.querySelector(".recipes")

        this._tagsDatas = new TagsDatas()
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
        this.$recipeSection.append(Template.createRecipeCard())
    }

    logTags(recipe) {
        // log tags in tags arrays from TagsData object

        // ingredients tags
        recipe.ingredientsTags.forEach(ingredient => {
            this._tagsDatas.ingredientsTags = ingredient
        })

        // ustensils tags
        recipe.ustensilsTags.forEach(ustensil => {
            this._tagsDatas.ustensilsTags = ustensil
        })

        // appliance tagt
        this._tagsDatas.appliancesTags = recipe.applianceTag
    }

    displayFiltersTags() {
        const filtersTags = new FiltersTags(this._tagsDatas.ingredientsTags, this._tagsDatas.appliancesTags, this._tagsDatas.ustensilsTags)
        filtersTags.run()
    }

    displayContent() {
        // map recipes datas
        this.mapRecipes()

        this._recipesDatas.forEach(recipe => {
            // display recipes cards
            this.displayRecipeCard(recipe)
            // log filters tags
            this.logTags(recipe)
        })
        console.log(this._tagsDatas)
        // display filters tags
        this.displayFiltersTags()
    }

    run() {
        this.launchSearchBar()
        this.displayContent()
    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()


}

init()