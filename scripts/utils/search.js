class Search {
    constructor() {
        // this._request = request
        this._sortedRecipes = []



    }

    removeAccent(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    testRequest(request, property) {

        // remove accents
        request = this.removeAccent(request)
        property = this.removeAccent(property)

        // test regex : without final s, with an additionnal final s, case insensitive

        // const pattern = new RegExp(`\\b${request}?(?:s)?\\b`, "i") ---- pour mot entier != groupe de lettres
        const pattern = new RegExp(`${request}(?:s)?`, "i")
        return pattern.test(property)
    }

    searchRequest(request, property) {

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

    fire(request, recipes) {

        for (let recipe of recipes) {

            // search request in title
            if ( this.searchRequest(request, recipe.name) ) {
                this._sortedRecipes.push(recipe)

            // search request in ingredients
            } else if ( this.searchRequest(request, recipe.ingredientsTags) ) {
                this._sortedRecipes.push(recipe)

            // search request in description
            } else if ( this.searchRequest(request, recipe.description) ) {
                this._sortedRecipes.push(recipe)
            }
        }

        console.log(this._sortedRecipes)
        return this._sortedRecipes
    }


    fireSearchTag(request, tagsArray) {

        const filteredTags = []

        for (let item of tagsArray) {
           let tag = item.innerText

            if ( this.searchRequest(request, tag) ) {
                filteredTags.push(item)
            }
        }

        return filteredTags
    }

    fireFilterRecipes(request, filter, recipes) {

        const filteredRecipes = []

        for (let recipe of recipes) {

            const property = recipe[`${filter}Tags`]

            if ( this.searchRequest(request, property) ) {
                filteredRecipes.push(recipe)
            }
        }

        return filteredRecipes
    }

}