class TagsDatas {
    /** Constructor pattern to log tags'datas from all recipes
     *
     */
    constructor(recipes) {
        this._recipes = recipes

        this._ingredientsTags = []
        this._appliancesTags = []
        this._ustensilsTags = []
    }

    get ingredientsTags() {
        return this._ingredientsTags
    }

    get appliancesTags() {
        return this._appliancesTags
    }

    get ustensilsTags() {
        return this._ustensilsTags
    }

    removeDuplicates(array) {
        const arrayToLowerCase = array.map(tag => tag.toLowerCase())
        let uniquesToLowerCase = []
        let uniques = []

        for (let i = 0; i < array.length; i++) {
            if (!uniquesToLowerCase.includes(arrayToLowerCase[i])) {
                uniquesToLowerCase.push(arrayToLowerCase[i])
                uniques.push(array[i])
            }
        }

        return uniques
    }

    createArrays() {
        this._recipes.forEach(recipe => {
            recipe.ingredientsTags.forEach(ingredient => {
                this._ingredientsTags.push(ingredient)
            })

            this._appliancesTags.push(recipe.applianceTag)

            recipe.ustensilsTags.forEach(ustensil => {
                this._ustensilsTags.push(ustensil)
            })
        })
    }

    createUniquesTagsArrays() {
        this._ingredientsTags = this.removeDuplicates(this._ingredientsTags)
        this._appliancesTags = this.removeDuplicates(this._appliancesTags)
        this._ustensilsTags = this.removeDuplicates(this._ustensilsTags)
    }

    createTags() {
        this.createArrays()
        this.createUniquesTagsArrays()
    }


}