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
        $tagItem.classList.add("filter__tag", "list-group-item", "border-0", "py-0", "fs-2", "text-dark", "bg-transparent")
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
                e.target.nextElementSibling.classList.toggle("animate-height-271")
                e.target.firstElementChild.classList.toggle("transform-scale-vmirror")
            })
        })
    }

    onClickTag() {
        const tags = document.querySelectorAll(".filter__tag")
        tags.forEach(tag => {
            tag.addEventListener("click", (e) => {
                e.preventDefault()

            })
        })

    }

    addTag() {



    }

    run() {
        this.displayTags()
        this.openFilter()
    }
}