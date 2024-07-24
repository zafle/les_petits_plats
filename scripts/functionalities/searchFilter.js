class SearchFilter {
    /** Functionnalities for filters : open filter and search input
     *
    //  * @param {Object} tagsDatas TagsDatas Object
     *
     */
    constructor() {

        // Arrays of tags

        // this._ingredients = tagsDatas.ingredientsTags
        // this._appliances = tagsDatas.appliancesTags
        // this._ustensils = tagsDatas.ustensilsTags

        this.$ingredients = document.querySelectorAll(`[data-tag-type="ingredients"]`)
        this.$appliances = document.querySelectorAll(`[data-tag-type="appliances"]`)
        this.$ustensils = document.querySelectorAll(`[data-tag-type="ustensils"]`)


        // recipes
        // this._allRecipes = recipes
        // this._displayedRecipes = recipes

        // Filters HTML Elements
        this.$filtersButtons = document.querySelectorAll(".filters__header")
        this.$filtersInputs = document.querySelectorAll(".filters__search__input")

        this.$ingredients_Wrapper = document.querySelector(".filters__tags--ingredients")
        this.$appliances_Wrapper = document.querySelector(".filters__tags--appliances")
        this.$ustensils_Wrapper = document.querySelector(".filters__tags--ustensils")

        // this.$ingredients_Labels = document.querySelector(".filters-labels__list--ingredients")
        // this.$appliances_Labels = document.querySelector(".filters-labels__list--appliances")
        // this.$ustensils_Labels = document.querySelector(".filters-labels__list--ustensils")

        // // Labels HTML Element
        // this.$labelsList = document.querySelector(".search-labels__list")

        // // Recipes HTML Element
        // this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
    }


    // search tag
    onSearchTagRequest() {

        this.$filtersInputs.forEach(input => {

            input.addEventListener("input", (e) => {

                // secure request
                const request = SecureRequest.secure(e.target.value)
                // get type of tag's array
                const tagType = e.target.name
                // get tags array
                const tagsArray = this[`$${tagType}`]


                if (request.length) {
                    // Execute search
                    const filteredTags = Search.searchTagFilter(request, tagsArray)
                    // display result
                    this.displayTags(tagType, filteredTags)

                } else {
                    // display all tags
                    this.displayTags(tagType, tagsArray)
                }

            })
        })
    }

    displayTags(tagType, filteredTags) {
        const wrapper = this[`$${tagType}_Wrapper`]
        wrapper.innerHTML = ""
        filteredTags.forEach(tag => {
            wrapper.append(tag)
        })
    }

    run() {
        // this.openFilter()
        this.onSearchTagRequest()
    }
}