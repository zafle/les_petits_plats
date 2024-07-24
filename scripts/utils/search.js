class Search {

    static removeAccent(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    static testRequest(request, property) {

        // remove accents
        request = this.removeAccent(request)
        property = this.removeAccent(property)

        // test regex : without final s, with an additionnal final s, case insensitive

        // const pattern = new RegExp(`\\b${request}?(?:s)?\\b`, "i") ---- pour mot entier != groupe de lettres
        const pattern = new RegExp(`${request}(?:s)?`, "i")
        return pattern.test(property)
    }

    static  searchRequest(request, property) {

        let requestFound = false

        // if the property to check is title (name) or description
        if (typeof property === "string" ) {

            requestFound = this.testRequest(request, property)

        // else if property is array of ingredients
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

    // old name : fire
    static searchBarRequest(request, recipes) {

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


    // old name : fireSearchTag
    static searchTagFilter(request, tagsArray) {

        const filteredTags = []

        for (let item of tagsArray) {
           let tag = item.innerText

            if ( this.searchRequest(request, tag) ) {
                filteredTags.push(item)
            }
        }

        return filteredTags
    }

    // old name : fireFilterRecipes
    static filterRecipes(request, filter, recipes) {

        const filteredRecipes = []

        for (let recipe of recipes) {

            const property = recipe[`${filter}Tags`]

            if ( this.searchRequest(request, property) ) {
                filteredRecipes.push(recipe)
            }
        }

        return filteredRecipes
    }

    static  searchByLabel(labelsArray, recipes) {
        console.log("searchby label fired")

        // to store final result
        const finalRecipes = []

        // to store result after each loop
        const filteredRecipes = []

        // to store recipes that have to be filtered in the loop
        const recipesToFilter = recipes

        for (let label of labelsArray) {

            const type = label["filter"]
            const request = label["request"]

            if (type === "search_bar") {
                filteredRecipes = this.fire(request, recipesToFilter)
            } else {
                filteredRecipes = this.fireFilterRecipes(request, type, recipesToFilter)
            }

            recipesToFilter = filteredRecipes
        }

        return finalRecipes
    }

}