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

    checkTagExists(tag, array) {
        let tagExists = false
        if (array.length) {
            for (let item of array) {
                if (item.toLowerCase() === tag.toLowerCase()) {
                    tagExists = true
                    break
                }
            }
        }
        if (tagExists === false) {
            array.push(tag)
        }
    }

    createTagsArrays() {
        this._recipes.forEach(recipe => {
            recipe.ingredientsTags.forEach(ingredient => {
                this.checkTagExists(ingredient, this._ingredientsTags)
            })

            this.checkTagExists(recipe.applianceTag, this._appliancesTags)

            recipe.ustensilsTags.forEach(ustensil => {
                this.checkTagExists(ustensil, this._ustensilsTags)
            })
        })
    }

    // createTags() {
    //     this.createArrays()
    //     // this.createUniquesTagsArrays()
    // }


}