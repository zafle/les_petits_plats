class Label {
    /** Manage all label functionalities
     *
     * @param {Array} allRecipes RecipeData Objects
     * @param {String} name is request or filter tag name to display as label's text and data-name
     * @param {String} type for data-type (search_bar or filter)
     * @param {String} filter for data-filter (name of filter - ingredient... - or null)
     * @param {String} destination to determine if label is to be displayed in label section or in filters dropdown
     *
     */
    constructor(allRecipes, name, type, filter, destination) {
        this._allRecipes = allRecipes
        this._name = name
        this._type = type
        this._filter = filter
        this._destination = destination

        this.Label = {}

        this.$labelsList = document.querySelector(".search-labels__list")

        this.$ingredients = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils = document.querySelector(".filters-labels__list--ustensils")
    }

    displayLabel() {
        // label to display in labels
        if (this._destination === "labels") {
            this.Label = this.displayInLabels()


        // label to display in filters
        } else {
            this.Label = this.displayInFilters()

        }

        this.onRemoveLabel()
    }

    displayInLabels() {
        // remove search bar query label if exists (must be only one)
        const searchBarLabel = document.querySelector("[data-search-type='search_bar']")
        if (searchBarLabel) {
            searchBarLabel.remove()
        }
        // create label with LabelFactory
        const searchLabel = this.createLabel()
        // Append label in labels section
        this.$labelsList.append(searchLabel)
        return searchLabel
    }

    displayInFilters() {
         // display filter label wrapper
        const labelWrapper = document.querySelector(`.filters-labels[data-label="${this._filter}"]`)
        if (labelWrapper.classList.contains("d-none")) {
            labelWrapper.classList.remove("d-none")
        }
        // create label with LabelFactory
        const filterLabel = this.createLabel()
        // Append Label in filter dropdown
        this[`$${this._filter}`].append(filterLabel)
        return filterLabel
    }


    createLabel() {
        const newLabel = new LabelFactory(this._name, this._type, this._filter, this._destination).createLabel()
        return newLabel.createLabelTag()
    }


    onRemoveLabel() {

    }

    filterRecipesByLabels(recipes) {
        console.log("fired")
        //  build array of labels objects with type and name keys
        const allSearchLabels = document.querySelectorAll("[data-search-type]")
        const labelsArray = Array.from(allSearchLabels)
        console.log(labelsArray)
        const labelsMap = labelsArray.map((label) => {
            const rObj = {}
            rObj["filter"] = label.dataset.searchType
            rObj["request"] = label.dataset.labelName

            console.log(rObj)
            return rObj
        })

        // new search from labels list
        const result = new Search()
        const filteredRecipes = result.searchByLabel(labelsMap, recipes)

        return filteredRecipes
    }

}