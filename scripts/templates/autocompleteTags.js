/* global CustomString */
class AutocompleteTags {
    /** Template for autocomplete Tags
     *
     * @param {String} request
     * @param {Array} tagsArray all tags from filters
     */

    constructor(request, tagsArray) {

        this._request = request
        this._tagsArray = tagsArray

        this.$searchInput = document.querySelector(".main-header__search-input")
    }

    createList() {
        // create a div to contain the list of autocomplete tags
        const list = document.createElement("div")
        list.id = this.$searchInput.id + "_autocomplete-list"
        list.classList.add("autocomplete-items", "list-group", "list-group-flush", "position-absolute", "z-2", "top-52", "start-0", "end-0")

        return list
    }

    createTag(tagName, tagFilter) {
        /** create a DIV element for each matching element
         *
         * @param {String} tagName
         * @param {String} tagFilter
         *
         */

        const item = document.createElement("div")
        item.classList.add("autocomplete-item", "list-group-item", "list-group-item-action", "cursor-pointer", `${tagFilter}`)

        // make the matching letters bold
        item.innerHTML = "<strong>" + tagName.substr(0, this._request.length) + "</strong>"
        item.innerHTML += tagName.substr(this._request.length)

        // insert a input field that will hold the current array tag's value
        item.innerHTML += `<input type="hidden" value="${tagName}" data-auto-filter="${tagFilter}">`

        return item
    }

    createTagList() {

        /*create a DIV element that will contain the items (values):*/
        const list = this.createList()

        /*for each item in the array...*/
        for(let tag of this._tagsArray) {
            const tagName = tag["name"]
            const tagFilter = tag["filter"]

            const tagToTest = CustomString.simplify(tagName)
            const requestToTest = CustomString.simplify(this._request)

            /*check if the tag starts with the same letters as the request :*/
            if (tagToTest.substr(0, this._request.length).toLowerCase() === requestToTest.toLowerCase()) {
                const item = this.createTag(tagName, tagFilter, this._request)
                list.append(item)
            }
        }

        return list
    }
}