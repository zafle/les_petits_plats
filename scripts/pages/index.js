class RecipesPage {
    constructor() {
        this._recipes = recipes;

    }

    launchSearchBar() {
        const searchBar = new SearchBar()
        searchBar.run()
    }

    run() {
        this.launchSearchBar()
    }


}

function init() {
    const recipesPage = new RecipesPage()
    recipesPage.run()
    console.log(recipes)

}

init()