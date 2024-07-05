class FiltersTags {
    /** Template to display filters tags
     *
     * @param {Array} ingredients
     * @param {Array} appliances
     * @param {Array} ustensils
     *
     */
    constructor(tagsDatas) {

        // Arrays of tags
        this._ingredients = tagsDatas.ingredientsTags
        this._appliances = tagsDatas.appliancesTags
        this._ustensils = tagsDatas.ustensilsTags

        // filters HTML elements
        this.$ingredientsTags = document.querySelector(".filters__tags--ingredients")
        this.$appliancesTags = document.querySelector(".filters__tags--appliance")
        this.$ustensilsTags = document.querySelector(".filters__tags--ustensils")

        this.$filterButton = document.querySelectorAll(".filters__header")
    }

    createTag(tag, $tags) {
        const $tagItem = document.createElement("a")
        $tagItem.setAttribute("href", "#")
        $tagItem.classList.add("filter__tag")
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

    openFilter() {
        this.$filterButton.forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation()
                e.target.closest(".filters__item").classList.toggle("filter--opened")
                e.target.nextElementSibling.classList.toggle("filter--opened")
            })
        })
    }

    onClickTag() {


    }

    run() {
        this.displayTags()
        this.openFilter()
    }
}