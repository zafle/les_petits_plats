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

        // test request against property
        const pattern = new RegExp(`${request}`, "i")
        return pattern.test(property)
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

            for (let element of property) {
                requestFound = this.testRequest(request, element)
                if (requestFound === true) {
                    break
                }
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

        const filteredRecipes = []

        for (let recipe of recipes) {

            // search request in title
            if ( this.searchRequest(request, recipe.name) ) {
                filteredRecipes.push(recipe)

            // search request in ingredients
            } else if ( this.searchRequest(request, recipe.ingredientsTags) ) {
                filteredRecipes.push(recipe)

            // search request in description
            } else if ( this.searchRequest(request, recipe.description) ) {
                filteredRecipes.push(recipe)
            }
        }

        return filteredRecipes
    }


    static searchTagFilter(request, tagsArray) {
        /** search request into HTML filters tags to hide all non matching tags by modifying DOM
         *
         * @param {String} request
         * @param {Array} tagsArray
         *
         */

        for (let item of tagsArray) {

            item.classList.remove("d-none")

            let tag = item.innerText
            if ( !this.searchRequest(request, tag) ) {
                item.classList.add("d-none")
            }
        }
    }

    static searchByFilter(request, filter, recipes) {
        /** search request into filters tags property of RecipeDatas, return array of matching recipes
         *
         * @param {String} request
         * @param {String} filter
         * @param {Array} recipes
         *
         */

        const filteredRecipes = []

        // loop into RecipeDatas
        for (let recipe of recipes) {

            const property = recipe[`${filter}Tags`]

            if ( this.searchRequest(request, property) ) {
                filteredRecipes.push(recipe)
            }
        }
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
        for (let label of labelsArray) {

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
        }

        return filteredRecipes
    }
}