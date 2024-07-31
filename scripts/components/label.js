class Label {
    /** Manage all label functionalities and display
     * if label is from filter => display into filter dropdown or display into labels list
     * if label is from search bar request => display into label list (only one label from search bar request can exist)
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

        // new label HTML element
        this.$label = {}

        // label wrappers HTML elements
        this.$labelWrapper = {}

        this.$labelsList = document.querySelector(".search-labels__list")

        this.$ingredients = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils = document.querySelector(".filters-labels__list--ustensils")
    }

    // --- Display label ---

    displayLabel() {
        // if label is to display in labels list
        if (this._destination === "labels") {
            this.$labelWrapper = this.$labelsList

            if (this._type === "search_bar") {
                this.removeOtherLabel()
            }

        // if label is to display in filter
        } else if (this._destination === "filters"){
            this.$labelWrapper = this[`$${this._filter}`]
            this.displayFilterLabelsWrapper()
        }

        // create label with LabelFactory according to type and destination
        this.$label = this.createLabel()
        // Append label in its wrapper
        this.$labelWrapper.append(this.$label)

        // add events listeners
        this.onHoverLabel()
        this.onRemoveLabel()
    }

    // --- labels events ---

    // display close button on hover filter label
    onHoverLabel() {
        const closeFilterLabelButton = this.$label.querySelector(".close-filter-label")

        // if this label is filter label
        if (closeFilterLabelButton) {

            this.$label.addEventListener("mouseover", () => {
                closeFilterLabelButton.classList.remove("d-none")
                this.$label.getElementsByTagName("span")[0].classList.add("fw-bold")
            })
            this.$label.addEventListener("mouseout", (e) => {
                closeFilterLabelButton.classList.add("d-none")
                this.$label.getElementsByTagName("span")[0].classList.remove("fw-bold")
            })

        }
    }

    // send search request from remaining labels on remove Label
    onRemoveLabel() {
        const closeButton = this.$label.querySelector(".close-label")
        closeButton.addEventListener("click", () => {

            const name = this.$label.dataset.labelName
            this.$label.remove()

            if (this._type === "filter") this.removeTwinLabel(name)
            if (this._destination === "filters") this.hideFilterWrapper()

            // launch new search from remaining labels
            new SearchLabels(this._allRecipes).searchAllLabels()
        })
    }

    // --- utils functions ---

    // remove search bar query label if exists (must be only one)
    removeOtherLabel() {
        const searchBarLabel = document.querySelector("[data-search-type='search_bar']")
        if (searchBarLabel) searchBarLabel.remove()
    }

    // display filter label wrapper
    displayFilterLabelsWrapper() {
        if (this.$labelWrapper.classList.contains("d-none")) this.$labelWrapper.classList.remove("d-none")
    }

    // create new label
    createLabel() {
        const newLabel = new LabelFactory(this._name, this._type, this._filter, this._destination).createLabel()
        return newLabel.createLabelTag()
    }

    // remove the corresponding filter label from labels section
    removeTwinLabel(name) {
        const twinLabel = document.querySelector(`[data-label-name="${name}"]`)
        twinLabel.remove()
    }

    // hide filter wrapper if empty
    hideFilterWrapper() {
        if (!this.$labelWrapper.hasChildNodes()) this.$labelWrapper.classList.add("d-none")
    }
}