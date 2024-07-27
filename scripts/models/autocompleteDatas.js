class AutocompleteDatas {
    constructor(recipes) {
        this._recipes = recipes
        this._autocompleteTags = []

        this._ingredientsTags = []
        this._appliancesTags = []
        this._ustensilsTags = []
    }

    get autocompleteTags() {

        const tagsDatas = new TagsDatas(this._recipes)
        tagsDatas.createTagsArrays()

        this._ingredientsTags = tagsDatas._ingredientsTags
        this._appliancesTags = tagsDatas._appliancesTags
        this._ustensilsTags = tagsDatas._ustensilsTags

        const ingredients = this.createTagArray(this._ingredientsTags, "ingredients")
        const appliances = this.createTagArray(this._appliancesTags, "appliances")
        const ustensils = this.createTagArray(this._ustensilsTags, "ustensils")

        this._autocompleteTags = ingredients.concat(appliances).concat(ustensils)

        return this._autocompleteTags
    }

    createTagArray(array, filter) {

        const newArray = Array.from(array).map(item => {
            const rObj = {}
            rObj["filter"] = filter
            rObj["name"] = item
            return rObj
        })

        return newArray
    }
}
