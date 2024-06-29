class TagsDatas {
    /** Constructor pattern to log tags'datas from all recipes
     *
     */
    constructor() {
        this._ingredientsTags = []
        this._appliancesTags = []
        this._ustensilsTags = []
    }

    // getters
    get ingredientsTags() {
        return this._ingredientsTags
    }

    get appliancesTags() {
        return this._appliancesTags
    }

    get ustensilsTags() {
        return this._ustensilsTags
    }

    // setters
    set ingredientsTags(ingredient) {
        this.checkAndPushTag(ingredient, this._ingredientsTags)
    }

    set appliancesTags(appliance) {
        this.checkAndPushTag(appliance, this._appliancesTags)
    }

    set ustensilsTags(ustensil) {
        this.checkAndPushTag(ustensil, this._ustensilsTags)
    }

    // check if tag already exists before pushing it into array
    checkAndPushTag(tag, array) {
        const tagsLength = array.length
        let tagExists = false

        for (let i = 0; i < tagsLength; i++) {
            if (array[i].toLowerCase() === tag.toLowerCase()) {
                tagExists = true
                break
            }
        }

        if (tagExists === false) {
            array.push(tag)
        }
    }
}