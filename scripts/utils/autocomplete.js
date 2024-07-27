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

            let list, item

            /*close any already open lists of autocompleted values*/
            this.closeAllLists()
            if (!request) {
                return false
            }
            // currentFocus = -1

            /*create a DIV element that will contain the items (values):*/
            list = document.createElement("div")
            list.id = this.$searchInput.id + "_autocomplete-list"
            list.classList.add("autocomplete-items", "list-group", "list-group-flush", "position-absolute", "z-2", "top-52", "start-0", "end-0")

            /*append the DIV element as a child of the autocomplete container:*/
            this.$searchInput.parentNode.append(list)

            /*for each item in the array...*/
            for(let tag of this._autocompleteArray) {

                const tagName = tag["name"]
                const tagFilter = tag["filter"]

                const tagToTest = CustomString.simplify(tagName)
                const requestToTest = CustomString.simplify(request)

                /*check if the tag starts with the same letters as the request :*/
                if (tagToTest.substr(0, request.length).toLowerCase() === requestToTest.toLowerCase()) {

                    /*create a DIV element for each matching element:*/
                    item = document.createElement("div")
                    item.classList.add("autocomplete-item", "list-group-item", "list-group-item-action", "cursor-pointer", `${tagFilter}`)

                    /*make the matching letters bold:*/
                    item.innerHTML = "<strong>" + tagName.substr(0, request.length) + "</strong>"
                    item.innerHTML += tagName.substr(request.length)

                    /*insert a input field that will hold the current array tag's value:*/
                    item.innerHTML += `<input type="hidden" value="${tagName}">`

                    /*execute a function when someone clicks on the tag value (DIV element):*/
                    item.addEventListener("click", (e) => {

                        /*insert the value for the autocomplete text field:*/
                        this.$searchInput.value = e.target.getElementsByTagName("input")[0].value

                        new SearchBarRequest(this._recipes).sendRequest(tagName, tagFilter)

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        this.closeAllLists()

                    })
                    list.append(item)
                }
            }

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
        except the one passed as an argument:*/
        const items = document.getElementsByClassName("autocomplete-items")
        for (let item of items) {
            if (elmnt !== item && elmnt !== this.$searchInput) {
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