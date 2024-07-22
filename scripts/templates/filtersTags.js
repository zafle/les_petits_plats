class FiltersTags {
    /** Template to display filters tags
     *
     * @param {Array} tagsDatas
     * @param {Array} recipes
     *
     */
    constructor(tagsDatas) {
        // recipes
        // this._recipes = recipes

        // Arrays of tags
        this._ingredients = tagsDatas.ingredientsTags
        this._appliances = tagsDatas.appliancesTags
        this._ustensils = tagsDatas.ustensilsTags

        // filters HTML elements
        this.$ingredientsTags = document.querySelector(".filters__tags--ingredients")
        this.$appliancesTags = document.querySelector(".filters__tags--appliances")
        this.$ustensilsTags = document.querySelector(".filters__tags--ustensils")

        // this.$filtersButtons = document.querySelectorAll(".filters__header")
        // this.$filtersInputs = document.querySelectorAll(".filters__search__input")
    }

    createTag(type, tag, $tags) {
        const $tagItem = document.createElement("a")
        $tagItem.setAttribute("href", "#")
        $tagItem.dataset.tagType = type
        $tagItem.classList.add("filter__tag", "list-group-item", "border-0", "py-0", "fs-2", "text-dark", "bg-transparent")
        $tagItem.innerText = tag
        $tags.append($tagItem)
    }

    displayTags() {
        // ingredients tags
        this._ingredients.forEach(ingredient => {
            this.createTag("ingredients", ingredient, this.$ingredientsTags)
        })
        // appliances tags
        this._appliances.forEach(appliance => {
            this.createTag("appliances", appliance, this.$appliancesTags)
        })

        // ustensils tags
        this._ustensils.forEach(ustensil => {
            this.createTag("ustensils", ustensil, this.$ustensilsTags)
        })
    }

    // updateTags(type, array, filteredTags) {
    //     filteredTags.forEach(tag => {
    //         this.createTag()
    //     })


    // }

    // openFilter() {
    //     this.$filtersButtons.forEach(button => {
    //         button.addEventListener("click", (e) => {
    //             e.target.nextElementSibling.classList.toggle("animate-height-auto")
    //             e.target.firstElementChild.classList.toggle("transform-scale-vmirror")
    //         })
    //     })
    // }

    // mettre les écouteurs d'événement ici et instancier nouveaux objet searchfilter ?



    // run() {
    //     this.displayTags()
    //     // this.openFilter()
    // }
}