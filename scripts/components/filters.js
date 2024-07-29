class Filters {
    /** Manage filters dropdowns
     *
     *
     */
    constructor() {

        // Filters HTML Elements
        this.$filtersButtons = document.querySelectorAll(".filters__header")
        this.$filtersInputs = document.querySelectorAll(".filters__search__input")
        this.$filtersCloseSearchButtons = document.querySelectorAll(".filters__close-search")
        this.$filtersDropdown = document.querySelectorAll(".filters__dropdown")
        this.$filters = document.querySelectorAll(".filters__item")

        // Opened filter's Tags
        this.$tagsArray = []

        // search bar
        this.$searchBarInput = document.querySelector(".main-header__search-input")

    }

    // --- open filter events ---

    // open /close filter on cick
    onClickFilter() {
        this.$filtersButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const filter = e.target.dataset.filter
                this.toggleFilter(filter)
                this.closeOtherFilters(filter)
            })
        })
    }

    // --- open filter events / utils functions ---

    toggleFilter(filter) {
        const dropdown = document.querySelector(`.filters__dropdown[data-filter="${filter}"]`)
        const button = document.querySelector(`.filters__header[data-filter="${filter}"]`)
        dropdown.classList.toggle("mh-0")
        dropdown.classList.toggle("mh-100")
        button.firstElementChild.classList.toggle("transform-scale-vmirror")
    }

    closeOtherFilters(openedFilter) {
        this.$filtersDropdown.forEach(dropdown => {
            const filterName = dropdown.dataset.filter
            if ((filterName !== openedFilter) && (dropdown.classList.contains("mh-100"))) {
                this.toggleFilter(filterName)
            }
        })
    }

    onClickCloseSearchButton() {
        this.$filtersCloseSearchButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const closeSearchButton = e.target
                this.closeSearch(closeSearchButton)
            })
        })
    }

    onClickSearchBarInput() {
        this.$searchBarInput.addEventListener("click", () => {
            this.closeOtherFilters(null)
        })
    }

    // --- search filter tag ---
    onSearchTagRequest() {

        this.$filtersInputs.forEach(input => {

            input.addEventListener("input", (e) => {

                // secure request
                const request = CustomString.secure(e.target.value)
                // get type of tag's array
                const tagType = e.target.name

                this.displaySearchButton(input)
                this.searchTag(request, tagType)

            })
        })
    }

    searchTag(request, tagType) {
        // get HTML elements tags array from type
        this.createTagsArray(tagType)

        if (request.length) {
            // Execute search (will add class "d-none" to all tags that don't match search)
            Search.searchTagFilter(request, this.$tagsArray)

        } else {
            this.displayAllTags()
        }
    }

    createTagsArray(tagType) {
        // get HTML elements tags array from type
        this.$tagsArray = document.querySelectorAll(`.filter__tag[data-filter="${tagType}"]`)
    }

    displayAllTags() {
        this.$tagsArray.forEach(tag => {
            tag.classList.remove("d-none")
        })
    }

    emptySearchInput(closeSearchButton) {
        closeSearchButton.classList.add("d-none")
        closeSearchButton.previousElementSibling.value = ""
    }

    closeSearch(closeSearchButton) {
        this.emptySearchInput(closeSearchButton)
        this.displayAllTags()
    }



    displaySearchButton(input) {
        input.nextElementSibling.classList.remove("d-none")
    }

    run() {
        this.onClickFilter()
        this.onSearchTagRequest()
        this.onClickCloseSearchButton()
        this.onClickSearchBarInput()
    }


}