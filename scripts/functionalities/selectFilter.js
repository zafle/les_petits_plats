class SelectFilter {
    constructor(allRecipes, filteredRecipes) {
        // recipes
        this._allRecipes = allRecipes
        this._displayedRecipes = filteredRecipes

        console.log("selectFilter")
        console.log("allRecipes")
        console.log(allRecipes)
        console.log("filteredRecipes")
        console.log(filteredRecipes)


        // this.$filtersButtons = document.querySelectorAll(".filters__header")
        // this.$filtersInputs = document.querySelectorAll(".filters__search__input")

        this.$ingredients_Wrapper = document.querySelector(".filters__tags--ingredients")
        this.$appliances_Wrapper = document.querySelector(".filters__tags--appliances")
        this.$ustensils_Wrapper = document.querySelector(".filters__tags--ustensils")

        this.$ingredients_Labels = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances_Labels = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils_Labels = document.querySelector(".filters-labels__list--ustensils")

        this.$labelsList = document.querySelector(".search-labels__list")

        // Recipes wrapper
        // this.$recipesCardsWrapper = document.querySelector(".recipes__cards-wrapper")
    }
    // --- click and select tag functions ---

    // event listener
    onClickTag() {
        const tags = document.querySelectorAll(".filter__tag")
        tags.forEach(tag => {
            tag.addEventListener("click", (e) => {
                e.preventDefault()
                const request = e.target.innerText
                const type = e.target.dataset.tagType
                const filter = e.target.dataset.filter
                this.applyFilter(request, type, filter)
                this.removeFilter(request, filter)
            })
        })
    }

    // remove filter from list
    removeFilter(request, filter) {
        const filters = this[`$${filter}_Wrapper`].childNodes
        for (let element of filters) {
            if (element.innerText === request) {
                element.remove()
                break
            }
        }
    }

    applyFilter(request, type, filter) {

        // filter recipes
        const filteredRecipes = Search.filterRecipes(request, filter, this._displayedRecipes)

        // update content
        const updateContent = new DisplayContent(this._allRecipes, filteredRecipes)
        updateContent.updateContent()

        // log new array of recipes datas
        // this._displayedRecipes = filteredRecipes

        // add event listebners on filters tags
        // this.onClickTag()

        // display label
        this.displayLabels(this._allRecipes, request, type, filter)
    }

    //  --- add labels ---
    displayLabels(allRecipes, request, type, filter) {
        // display label in filters
        try {
            const destination = "filters"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }
        // display label in main label section
        try {
            const destination = "labels"
            new Label(allRecipes, request, type, filter, destination).displayLabel()

        } catch (error) {
            console.error(`Unknown destination`, error)
        }

    }

            // display filter label
            // const filterLabel = SearchLabel.createFilterLabel(request, "filter", filter)
            // const wrapper = this[`$${filter}_Labels`]
            // wrapper.append(filterLabel)

            // // display search labels
            // const searchLabel = SearchLabel.createSearchLabel(request, filter)
            // this.$labelsList.append(searchLabel)

            // // add event listener on close buttons labels
            // const closeButtonFL = filterLabel.querySelector(".close-label")
            // this.onCloseLabel(closeButtonFL, filterLabel, wrapper)

            // const closeButtonSL = searchLabel.querySelector(".close-label")
            // this.onCloseLabel(closeButtonSL, searchLabel)



    // event listener on close button label
    onCloseLabel(closeButton, label, wrapper) {

        closeButton.addEventListener("click", (e) => {

            // remove label
            label.remove()

            // if filter and filter wrapper has no other label, hide wrapper
            if (!wrapper.querySelector(".filters-labels__list").hasChildNodes()) {
                wrapper.classList.add("d-none")
            }

            // get new recipes from new array of filters
            const filteredRecipes = SearchLabel.filterRecipesByLabels(this._allRecipes)
            this.updateContent(filteredRecipes)
        })
    }

    run() {
        this.onClickTag()
    }



}