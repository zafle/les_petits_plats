class Filters {
    /** Manage filters dropdowns
     *
     *
     */
    constructor() {
        // Filters HTML Elements
        this.$filtersButtons = document.querySelectorAll(".filters__header")

    }
    // open filter event
    openFilter() {
        this.$filtersButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const filter = e.target.dataset.filter
                document.querySelector(`.filters__dropdown[data-filter="${filter}"]`).classList.toggle("animate-height-auto")
                e.target.firstElementChild.classList.toggle("transform-scale-vmirror")
            })
        })
    }

    run() {
        this.openFilter()
    }


}