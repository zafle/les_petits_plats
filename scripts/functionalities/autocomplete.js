/* global AutocompleteDatas CustomString AutocompleteTags */
class Autocomplete {
    /** Autocomplete functionnality for search bar request
     *
     * @param {Array} recipes RecipeData Objects
     * @param {Object} searchBarRequest SearchBarRequest Object
     *
     */

    constructor(recipes, searchBarRequest) {

        this._allRecipes = recipes

        this.SearchBarRequest = searchBarRequest

        this._currentFocus = -1

        // HTML elements
        this.$searchInput = document.querySelector(".main-header__search-input")

        // Tags array to compare with
        this._autocompleteArray = []
    }

    // --- tags array construction ---
    createTagsArray() {
        this._autocompleteArray = new AutocompleteDatas(this._allRecipes).autocompleteTags
    }

    // --- autocomplete events ---

    // close all autocomplete generated lists when user clicks in the document
    onOutClick() {
        document.addEventListener("click", (e) => {
            this.closeAllLists(e.target)
        })
    }

    // display a list of tags corresponding to search bar input value
    autocomplete() {
        this.$searchInput.addEventListener("input", (e) => {

            // secure request
            let request = CustomString.secure(e.target.value)

            // remove any already opened lists of autocompleted tags
            this.closeAllLists()

            if (!request) return false

            // create a list of autocomplete tags
            const list = new AutocompleteTags(request, this._autocompleteArray).createTagList()

            // add event listener on each tag
            list.childNodes.forEach(item => {
                this.onClickTag(item)
            })

            // append the list to search bar input
            this.$searchInput.parentNode.append(list)
        })
    }

    onClickTag(item) {
        /** send search request on click tag
         *
         * @param {Object} item autocomplete tag
         *
         */
        item.addEventListener("click", (e) => {

            const tagInput = e.target.getElementsByTagName("input")[0]

            const request = tagInput.value
            const filter = tagInput.dataset.autoFilter

            // insert the value of tag request into search bar input
            this.$searchInput.value = request

            // send request with SearchBarRequest object method
            this.SearchBarRequest.sendRequest(request, filter)

            // close the list of autocompleted values,
            // (or any other open lists of autocompleted values)
            this.closeAllLists()
        })
    }

    // navigate into the list when user presses a key on the keyboard
    onListNavigation() {
        this.$searchInput.addEventListener("keydown", (e) => {

            let list = document.getElementById(e.target.id + "_autocomplete-list")

            if (list) list = list.getElementsByTagName("div")

            if (e.keyCode === 40) {
                // If the arrow DOWN key is pressed,
                // increase the currentFocus variable
                this._currentFocus++

                // and make the current item more visible
                this.addActive(list)

            } else if (e.keyCode === 38) {
                // If the arrow UP key is pressed,
                // decrease the currentFocus variable
                this._currentFocus--

                // and make the current item more visible
                this.addActive(list)

            } else if (e.keyCode === 13) {
                // If the ENTER key is pressed, prevent the form from being submitted
                e.preventDefault()

                if (this._currentFocus > -1) {
                    // simulate a click on the "active" item
                    if (list) list[this._currentFocus].click()
                }
            }
        })
    }

    // --- Utils functions ---

    addActive(list) {
        /** a function to classify an item as "active"
         *
         * @param {Object} list autocomplete tag list
         *
         */

        if (!list) return false

        // start by removing the "active" class on all items
        this.removeActive(list)

        if (this._currentFocus >= list.length) this._currentFocus = 0
        if (this._currentFocus < 0) this._currentFocus = (list.length - 1)

        /*add class "autocomplete-active":*/
        list[this._currentFocus].classList.add("active")
    }

    removeActive(list) {
        /** a function to remove the "active" class from all autocomplete items
         *
         * @param {Object} list autocomplete tag list
         *
         */
        for (let item of list) {
            item.classList.remove("active")
        }
    }

    closeAllLists(elmnt) {
        /** close all autocomplete lists in the document, except the one passed as an argument = clicked element
         *
         * @param {Object} elmnt autocomplete tag list
         *
         */
        // select all autocomplete lists
        const items = document.getElementsByClassName("autocomplete-items")
        // for each list
        for (let item of items) {
            // if clicked element is not a list or main search input
            if (elmnt !== item && elmnt !== this.$searchInput) {
                // remove the list
                item.parentNode.removeChild(item)
            }
        }
    }

    run() {
        this.createTagsArray()
        this.autocomplete()
        this.onListNavigation()
        this.onOutClick()
    }
}