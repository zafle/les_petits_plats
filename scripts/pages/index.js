class RecipesPage {
    /** Display homepage
     *
     */
    constructor() {
        this._recipesDatas = [];

        this.$recipeSection = document.querySelector(".recipes")

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

    // logTags(recipe) {


    //     // log tags in tags arrays from TagsData object

    //     // ingredients tags
    //     recipe.ingredientsTags.forEach(ingredient => {
    //         this._tagsDatas.ingredientsTags = ingredient
    //     })

    //     // ustensils tags
    //     recipe.ustensilsTags.forEach(ustensil => {
    //         this._tagsDatas.ustensilsTags = ustensil
    //     })

    //     // appliance tagt
    //     this._tagsDatas.appliancesTags = recipe.applianceTag
    // }
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
        // map recipes datas
        this.mapRecipes()

        this._recipesDatas.forEach(recipe => {
            // display recipes cards
            this.displayRecipeCard(recipe)
            // log filters tags
            // this.logTags(recipe)
        })
        // console.log(this._tagsDatas)
        // display filters tags
        // this.displayFiltersTags()
    }

    run() {
        this.launchSearchBar()
        this.displayContent()
        this.displayFiltersTags()

        // this._tagsDatas.createTags(this._recipesDatas)

    }
}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()


}

init()