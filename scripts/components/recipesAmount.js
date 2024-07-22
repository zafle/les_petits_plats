class RecipesAmount {
    static updateAmount(recipes) {
        // get 2 digits min number
        const nbRecipes = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(recipes.length)
        document.getElementById("recipes_amount").innerText = `${nbRecipes} recettes`
    }
}