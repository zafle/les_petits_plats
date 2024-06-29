class FiltersTags {
    /** Template to display filters tags
     *
     * @param {Array} ingredients
     * @param {Array} appliances
     * @param {Array} ustensils
     *
     */
    constructor(ingredients, appliances, ustensils) {

        // Arrays of tags
        this._ingredients = ingredients
        this._appliances = appliances
        this._ustensils = ustensils

        // filters HTML elements
        this.$ingredientsTags = document.querySelector(".filters__tags--ingredients")
        this.$appliancesTags = document.querySelector(".filters__tags--appliance")
        this.$ustensilsTags = document.querySelector(".filters__tags--ustensils")
    }

    createTag(tag, $tags) {
        const $tagItem = document.createElement("a")
        $tagItem.setAttribute("href", "#")
        $tagItem.innerText = tag
        $tags.append($tagItem)
    }

    displayTags() {
        // ingredients tags
        this._ingredients.forEach(ingredient => {
            this.createTag(ingredient, this.$ingredientsTags)
        })
        // appliances tags
        this._appliances.forEach(appliance => {
            this.createTag(appliance, this.$appliancesTags)
        })

        // ustensils tags
        this._ustensils.forEach(ustensil => {
            this.createTag(ustensil, this.$ustensilsTags)
        })
    }
}