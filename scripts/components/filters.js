class Filters {
    /** Manage filters dropdowns
     *
     *
     */
    constructor() {
        // Filters HTML Elements
        this.$filtersButtons = document.querySelectorAll(".filters__header")
        this.$filtersInputs = document.querySelectorAll(".filters__search__input")


    }
    // --- open filter event ---
    openFilter() {
        this.$filtersButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const filter = e.target.dataset.filter
                document.querySelector(`.filters__dropdown[data-filter="${filter}"]`).classList.toggle("animate-height-auto")
                e.target.firstElementChild.classList.toggle("transform-scale-vmirror")
            })
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

                this.searchTag(request, tagType)
            })
        })
    }

    searchTag(request, tagType) {
        // get HTML elements tags array from type
        const tagsArray = document.querySelectorAll(`.filter__tag[data-filter="${tagType}"]`)

        if (request.length) {
            // Execute search (will add class "d-none" to all tags that don't match search)
            Search.searchTagFilter(request, tagsArray)

        } else {
            // display all tags
            tagsArray.forEach(tag => {
                tag.classList.remove("d-none")
            })
        }
    }

    run() {
        this.openFilter()
        this.onSearchTagRequest()
    }


}