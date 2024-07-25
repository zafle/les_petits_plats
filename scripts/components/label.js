class Label {
    /** Manage all label functionalities
     *
     * @param {Array} allRecipes RecipeData Objects
     * @param {String} name is request or filter tag name to display as label's text and data-name
     * @param {String} type for data-search-type (search_bar or filter)
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

        this.$label = {}
        this.$labelWrapper = {}

        this.$labelsList = document.querySelector(".search-labels__list")

        this.$ingredients = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils = document.querySelector(".filters-labels__list--ustensils")
    }

    // --- Display label ---

    displayLabel() {
        // label to display in labels
        if (this._destination === "labels") {
            this.$labelWrapper = this.$labelsList

            if (this._type === "search_bar") {
                this.removeOtherLabel()
            }

        // label to display in filters
        } else if (this._destination === "filters"){

            this.$labelWrapper = this[`$${this._filter}`]
            this.displayFilterLabelsWrapper()
        }
        // create label with LabelFactory
        this.$label = this.createLabel()
        // Append label in its wrapper
        this.$labelWrapper.append(this.$label)


        this.onRemoveLabel()
    }

    removeOtherLabel() {
        // remove search bar query label if exists (must be only one)
        const searchBarLabel = document.querySelector("[data-search-type='search_bar']")
        if (searchBarLabel) {
            searchBarLabel.remove()
        }
    }

    displayFilterLabelsWrapper() {
         // display filter label wrapper
        if (this.$labelWrapper.classList.contains("d-none")) {
            this.$labelWrapper.classList.remove("d-none")
        }
    }

    createLabel() {
        const newLabel = new LabelFactory(this._name, this._type, this._filter, this._destination).createLabel()
        return newLabel.createLabelTag()
    }

    // --- Remove Label ---
    onRemoveLabel() {
        const closeButton = this.$label.querySelector(".close-label")
        closeButton.addEventListener("click", () => {

            const name = this.$label.dataset.labelName
            this.$label.remove()

            if (this._type === "filter") {
                this.removeTwinLabel(name)
            }
            if (this._destination === "filters") {
                this.hideFilterWrapper()
            }

            new SearchLabels(this._allRecipes).searchAllLabels()
        })
    }

    removeTwinLabel(name) {
        // remove the corresponding filter label from labels section
        const twinLabel = document.querySelector(`[data-label-name="${name}"]`)
        twinLabel.remove()
    }

    hideFilterWrapper() {
        // hide filter wrapper if empty
        if (!this.$labelWrapper.hasChildNodes()) {
            this.$labelWrapper.classList.add("d-none")
        }
    }
}