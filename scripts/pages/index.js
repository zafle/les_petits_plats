class Recipes {
    constructor() {

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
    const recipes = new Recipes()
    recipes.run()

}

init()