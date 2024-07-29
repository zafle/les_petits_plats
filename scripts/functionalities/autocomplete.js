class Autocomplete {
    constructor(recipes) {
        this._recipes = recipes
        this._currentFocus = -1

        // HTML elements
        this.$searchInput = document.querySelector(".main-header__search-input")

        // Tags array to compare with
        this._autocompleteArray = []
    }

    createTagsArray() {
        this._autocompleteArray = new AutocompleteDatas(this._recipes).autocompleteTags
    }

    /*close all autocomplete lists when user clicks in the document:*/
    onOutClick() {
        document.addEventListener("click", (e) => {
            this.closeAllLists(e.target)
        })
    }

    autocomplete() {
        this.$searchInput.addEventListener("input", (e) => {

            let request = CustomString.secure(e.target.value)

            // close any already open lists of autocompleted values
            this.closeAllLists()

            if (!request) {
                return false
            }

            // create a DIV element that will contain the items (values)
            const list = new AutocompleteTags().createTagList(request, this._autocompleteArray)

            list.childNodes.forEach(item => {
                this.onClickTag(item)
            })

            // append the DIV element as a child of the autocomplete container
            this.$searchInput.parentNode.append(list)
        })
    }

    /*send search request on click tag*/
    onClickTag(item) {
        item.addEventListener("click", (e) => {

            const request = e.target.getElementsByTagName("input")[0].value
            const filter = e.target.getElementsByTagName("input")[0].dataset.autoFilter

            /*insert the value for the autocomplete text field:*/
            this.$searchInput.value = request

            /*send request*/
            new SearchBarRequest(this._recipes).sendRequest(request, filter)

            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            this.closeAllLists()
        })
    }

    /*navigate into the list when user presses a key on the keyboard:*/
    onListNavigation() {
        this.$searchInput.addEventListener("keydown", (e) => {
            let list = document.getElementById(e.target.id + "_autocomplete-list")
            if (list) list = list.getElementsByTagName("div")

            if (e.keyCode === 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                this._currentFocus++
                /*and make the current item more visible:*/
                this.addActive(list)

            } else if (e.keyCode === 38) {
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                this._currentFocus--
                /*and make the current item more visible:*/
                this.addActive(list)

            } else if (e.keyCode === 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault()
                if (this._currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (list) list[this._currentFocus].click()
                }
            }
        })
    }

    // Utils functions

    addActive(list) {
        /*a function to classify an item as "active":*/
        if (!list) return false
        /*start by removing the "active" class on all items:*/
        this.removeActive(list)

        if (this._currentFocus >= list.length) this._currentFocus = 0;
        if (this._currentFocus < 0) this._currentFocus = (list.length - 1);

        /*add class "autocomplete-active":*/
        list[this._currentFocus].classList.add("active")
    }

    removeActive(list) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let item of list) {
            item.classList.remove("active")
        }
    }

    closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument = clicked element:*/

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