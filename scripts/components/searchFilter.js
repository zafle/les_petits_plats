class SearchFilter {
    constructor(recipes, tagsDatas) {
        // recipes
        this._allRecipes = recipes
        this._displayedRecipes = recipes

        // tags
        this._allTagsDatas = tagsDatas
        this._displayedTagsDatas = tagsDatas

        // // Arrays of tags
        // this._ingredients = document.querySelectorAll("[data-tag-type='ingredients']")
        // this._appliances = document.querySelectorAll("[data-tag-type='appliances']")
        // this._ustensils = document.querySelectorAll("[data-tag-type='ustensils']")

        this.$ingredients_Wrapper = document.querySelector(".filters__tags--ingredients")
        this.$appliance_Wrapper = document.querySelector(".filters__tags--appliances")
        this.$ustensils_Wrapper = document.querySelector(".filters__tags--ustensils")

        this.$filtersButtons = document.querySelectorAll(".filters__header")
        this.$filtersInputs = document.querySelectorAll(".filters__search__input")

        // Recipes wrapper
        this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")


    }

    displayFiltersTags() {
        const filtersTags = new FiltersTags(this._displayedTagsDatas)
        filtersTags.displayTags()
        // add event listener
        this.onClickTag()
    }

    // --- Events on filters ---

    // open filter
    openFilter() {
        this.$filtersButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.target.nextElementSibling.classList.toggle("animate-height-auto")
                e.target.firstElementChild.classList.toggle("transform-scale-vmirror")
            })
        })
    }

    // --- search tag functions ---

    // event listener
    onSearchTagRequest() {
        this.$filtersInputs.forEach(input => {
            input.addEventListener("input", (e) => {

                // secure request
                const request = SecureRequest.secure(e.target.value)
                // get type of tag's array
                const tagType = e.target.name

                this.applySearchTag(request, tagType)
            })
        })
    }

    applySearchTag(request, tagType) {
        const tagsArray = document.querySelectorAll(`[data-tag-type="${tagType}"]`)
        const filteredTags = this.sendSearchFilterRequest(request, tagsArray)
        this.displayFilteredTags(tagType, filteredTags)
    }

    sendSearchFilterRequest(request, tagsArray) {
        const searchTag = new Search()
        return searchTag.fireSearchTag(request, tagsArray)
    }

    displayFilteredTags(type, filteredTags) {
        const wrapper = this[`$${type}_Wrapper`]
        wrapper.innerHTML = ""
        filteredTags.forEach(tag => {
            wrapper.append(tag)
        })
    }

    // --- click and select tag functions ---

    // event listener
    onClickTag() {
        const tags = document.querySelectorAll(".filter__tag")
        tags.forEach(tag => {
            tag.addEventListener("click", (e) => {
                e.preventDefault()
                const request = e.target.innerText
                const filter = e.target.dataset.tagType
                this.applyFilter(request, filter)
            })
        })
    }

    applyFilter(request, filter) {

        // filter recipes
        const filteredRecipes = this.sendFilterRequest(request, filter)
        // update tags
        this.updateTags(filteredRecipes)
        // update recipes
        this.updateRecipes(filteredRecipes)
    }

    sendFilterRequest(request, filter) {
        const filterRequest = new Search()
        return filterRequest.fireFilterRecipes(request, filter, this._displayedRecipes)
    }

    //  --update and display tags
    updateTags(filteredRecipes) {
        // clear old tags
        this.$ingredients_Wrapper.innerHTML = ""
        this.$appliance_Wrapper.innerHTML = ""
        this.$ustensils_Wrapper.innerHTML = ""

        // Build new Tags Datas
        const tagsDatas = new TagsDatas(filteredRecipes)
        tagsDatas.createTagsArrays()

        // update tag datas property
        this._displayedTagsDatas = tagsDatas

        // display new tags
        this.displayFiltersTags()
    }

    //  --update and display recipes
    updateRecipes(filteredRecipes) {
        // clear old recipes
        this.$recipesCardsWrapper.innerHTML = ""

        // update recipes property
        this._displayedRecipes = filteredRecipes

        //  build and display new recipes Cards
        filteredRecipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)
            this.$recipesCardsWrapper.append(Template.createRecipeCard())
        })
    }




    run() {
        this.displayFiltersTags()
        this.openFilter()
        this.onSearchTagRequest()
        // this.onClickTag()
    }

}