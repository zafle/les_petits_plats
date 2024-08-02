/* global CustomString */
class Search {
    /** Functions to execute request search
     *
     */

    static testRequest(request, property) {
        /** test request string against property string, return false or true
         *
         * @param {String} request
         * @param {String} property
         */

        // remove accents and brackets from strings
        request = CustomString.simplify(request)
        property = CustomString.simplify(property)

        return property.toLowerCase().includes(request.toLowerCase())
    }

    static searchRequest(request, property) {
        /** search request into given string or array, return false or true
         *
         * @param {String} request
         * @param {String|Array} property
         */

        let requestFound = false

        // if the property to check request against is a string
        if (typeof property === "string" ) {

            requestFound = this.testRequest(request, property)

        // if the property to check request against is an array
        } else if (typeof property === "object" ) {

            const filteredElements = property.filter(element => {
                return this.testRequest(request, element)
            } )

            if (filteredElements.length) {
                requestFound = true
            }
        }

        return requestFound
    }

    static searchByRequest(request, recipes) {
        /** search request into title, ingredients and description
         *  return matching recipes array of RecipeDatas objects
         *
         * @param {String} request
         * @param {Array} recipes
         */

        const filteredRecipes = recipes.filter( recipe => {
            return this.searchRequest(request, recipe.name) || this.searchRequest(request, recipe.ingredientsTags) || this.searchRequest(request, recipe.description)
        })

        return filteredRecipes
    }


    static searchTagFilter(request, tagsArray) {
        /** search request into HTML filters tags to hide all non matching tags by modifying DOM
         *
         * @param {String} request
         * @param {Array} tagsArray
         *
         */

        tagsArray.forEach(element => {

            element.classList.remove("d-none")

            if ( !this.searchRequest(request, element.innerText) ) {
                element.classList.add("d-none")
            }
        })
    }

    static searchByFilter(request, filter, recipes) {
        /** search request into filters tags property of RecipeDatas, return array of matching recipes
         *
         * @param {String} request
         * @param {String} filter
         * @param {Array} recipes
         *
         */

        const filteredRecipes = recipes.filter(recipe => {
            return this.searchRequest(request, recipe[`${filter}Tags`])
        })

        return filteredRecipes
    }

    static searchByLabel(labelsArray, recipes) {
        /** search one or multiple requests (request is a given array of labels) into RecipeDatas objects
         *
         * @param {Array} labelsArray
         * @param {Array} recipes
         *
         */

        let filteredRecipes = []

        // to store recipes that have to be filtered in the loop
        // first iteration search into all recipes
        let recipesToFilter = recipes

        // loop into labels array
        labelsArray.forEach(label => {
            const filter = label["filter"]
            const request = label["request"]

            // if label is from search bar request
            if (filter === "null") {
                filteredRecipes = this.searchByRequest(request, recipesToFilter)

            // if label is from filter
            } else {
                filteredRecipes = this.searchByFilter(request, filter, recipesToFilter)
            }

            // store result from the loop into variable for next iteration
            recipesToFilter = filteredRecipes
        })

        return filteredRecipes
    }
}