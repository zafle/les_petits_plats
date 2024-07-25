class Search {

    static removeAccent(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    static removeFirstLastSpaces(string) {
        return string.replace(/^\s|\s$/g, '')
    }

    static removeBrackets(string) {
        return string.replace(/[()]/g, '')
    }

    static testRequest(request, property) {

        request =this.removeFirstLastSpaces(request)
        request = this.removeAccent(request)
        request = this.removeBrackets(request)
        property = this.removeAccent(property)
        property = this.removeBrackets(property)

        const pattern = new RegExp(`${request}`, "i")
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

        // const filteredTags = []

        for (let item of tagsArray) {

            item.classList.remove("d-none")

            let tag = item.innerText

            if ( !this.searchRequest(request, tag) ) {

                item.classList.add("d-none")
            }
        }

        // return filteredTags
    }
    // static searchTagFilter(request, tagsArray) {

    //     const filteredTags = []

    //     for (let item of tagsArray) {
    //        let tag = item.innerText

    //         if ( this.searchRequest(request, tag) ) {
    //             filteredTags.push(item)
    //         }
    //     }

    //     return filteredTags
    // }

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

    static searchByLabel(labelsArray, recipes) {

        // to store final result
        let finalRecipes = []

        // to store result after each loop
        let filteredRecipes = []

        // to store recipes that have to be filtered in the loop
        let recipesToFilter = recipes

        for (let label of labelsArray) {

            const filter = label["filter"]

            const request = label["request"]

            if (filter === "null") {
                filteredRecipes = this.searchBarRequest(request, recipesToFilter)

            } else {
                filteredRecipes = this.filterRecipes(request, filter, recipesToFilter)
            }

            recipesToFilter = filteredRecipes
        }

        finalRecipes = filteredRecipes


        return finalRecipes
    }

}