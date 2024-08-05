/* global CustomString Search */
class Filters {
    /** Manage filters component and events listeners
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

        // Displayed filter's Tags
        this.$tagsArray = []

        // search bar
        this.$searchBarInput = document.querySelector(".main-header__search-input")

        // labels
        this.$labelsSection = document.querySelector(".search-labels")
    }

    // --- open / close filter events ---

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

    // open filter events / utils functions

    toggleFilter(filter) {
        /** open or close filter dropdown
         *
         * @param {string} filter data-filter value
         *
         */
        const dropdown = document.querySelector(`.filters__dropdown[data-filter="${filter}"]`)
        const button = document.querySelector(`.filters__header[data-filter="${filter}"]`)
        dropdown.classList.toggle("mh-0")
        dropdown.classList.toggle("mh-100")
        dropdown.classList.toggle("pe-auto")
        // transform button's image
        button.firstElementChild.classList.toggle("transform-scale-vmirror")
    }

    closeOtherFilters(openedFilter) {
        /** close other filters dropdown
         *
         *@param {string} openedFilter data-filter value
         *
         */
        this.$filtersDropdown.forEach(dropdown => {
            const filterName = dropdown.dataset.filter
            if ( (filterName !== openedFilter) && (dropdown.classList.contains("mh-100")) ) this.toggleFilter(filterName)
        })
    }

    // close filter on click out filter
    onClickOut() {
        document.addEventListener("click", (e) => {

            let isfilter = false

            if (
                e.target.hasAttribute("data-filter") ||
                e.target.parentNode.hasAttribute("data-filter") ||
                e.target.parentNode.classList.contains("filters__search")
            ) {
                isfilter = true
            }

            if (isfilter === false) {
                this.closeOtherFilters(null)
            }
        })
    }

    // --- labels related events ---

    // close filters on remove label in label section
    onRemoveLabel() {
        this.$labelsSection.addEventListener("click", () => {
            this.closeOtherFilters(null)
        })
    }

    // --- search filter events ---

    // close search
    onClickCloseSearchButton() {
        this.$filtersCloseSearchButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                this.closeSearch(e.target)
            })
        })
    }

    // search filter tag
    onSearchTagRequest() {

        this.$filtersInputs.forEach(input => {

            input.addEventListener("input", (e) => {

                // secure request
                const request = CustomString.secure(e.target.value)
                // get type of filters array
                const tagType = e.target.name

                // display close button
                this.displaySearchButton(input)
                // send request
                this.searchTag(request, tagType)
            })
        })
    }

    searchTag(request, tagType) {
        /** send request for tag filter and display result
         *
         *@param {string} request
         *@param {string} tagType input name attribut === type of filter
         *
         */

        // get filter tags HTML elements from type and create tags array
        this.createTagsArray(tagType)

        if (request.length) {
            // Execute search (will add class "d-none" to all tags that don't match search)
            Search.searchTagFilter(request, this.$tagsArray)

        } else {
            this.displayAllTags()
        }
    }

    createTagsArray(tagType) {
        /** get filter tags HTML elements from type and create tags array
         *
         *@param {string} tagType input name attribut === type of filter
        *
        */

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
        this.onRemoveLabel()
        this.onClickOut()
    }
}