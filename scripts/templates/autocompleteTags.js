class AutocompleteTags {
    constructor() {
        this.$searchInput = document.querySelector(".main-header__search-input")
    }

    createList() {
        const list = document.createElement("div")
        list.id = this.$searchInput.id + "_autocomplete-list"
        list.classList.add("autocomplete-items", "list-group", "list-group-flush", "position-absolute", "z-2", "top-52", "start-0", "end-0")

        return list
    }

    createTag(tagName, tagFilter, request) {
        /*create a DIV element for each matching element:*/
        const item = document.createElement("div")
        item.classList.add("autocomplete-item", "list-group-item", "list-group-item-action", "cursor-pointer", `${tagFilter}`)

        /*make the matching letters bold:*/
        item.innerHTML = "<strong>" + tagName.substr(0, request.length) + "</strong>"
        item.innerHTML += tagName.substr(request.length)

        /*insert a input field that will hold the current array tag's value:*/
        item.innerHTML += `<input type="hidden" value="${tagName}" data-auto-filter="${tagFilter}">`

        return item
    }

    createTagList(request, tagsArray) {

        /*create a DIV element that will contain the items (values):*/
        const list = this.createList()

        /*for each item in the array...*/
        for(let tag of tagsArray) {
            const tagName = tag["name"]
            const tagFilter = tag["filter"]

            const tagToTest = CustomString.simplify(tagName)
            const requestToTest = CustomString.simplify(request)

            /*check if the tag starts with the same letters as the request :*/
            if (tagToTest.substr(0, request.length).toLowerCase() === requestToTest.toLowerCase()) {
                const item = this.createTag(tagName, tagFilter, request)
                list.append(item)
            }
        }
        return list
    }
}