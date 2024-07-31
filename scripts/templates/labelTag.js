class LabelTag {
    /** Template to display labels
     *
     * @param {String} name
     * @param {String} type
     * @param {String} filter
     *
     */

    constructor(name, type, filter) {

        this._name = name
        this._type = type
        this._filter = filter
    }

    createLabelTag() {

        // main function to create label HTML element
        const label = document.createElement("li")
        label.dataset.searchType = this._type
        label.dataset.labelName = this._name
        label.dataset.filter = this._filter
        label.classList.add("d-flex", "justify-content-between", "align-items-center", "bg-primary")
        label.classList.add(...this.labelClass().split(' '))
        label.innerHTML = `
            <span class="${this.spanClass()} text-black fs-md-2 fs-1">${this._name}</span>
        `
        const closeButton = document.createElement("img")
        closeButton.classList.add("close-label", "cursor-pointer")
        closeButton.classList.add(...this.buttonClass().split(' '))
        closeButton.setAttribute("src", this.srcImg())
        closeButton.setAttribute("alt", "remove label")

        label.append(closeButton)

        return label
    }
}

class SearchLabel extends LabelTag {
    /** Template to display labels into labels section
     *
     */

    labelClass() {
        return "main-label rounded-6 h-53 px-20 min-w-195 me-2 mb-10"
    }

    spanClass() {
        return "me-20"
    }

    buttonClass() {
        return "w-10 h-10"
    }

    srcImg() {
        return "assets/images/close-label.png"
    }
}

class FilterLabel extends LabelTag {
    /** Template to display labels into filters
     *
     */

    labelClass() {
        return "filter-label h-37 mb-6 px-md-3 px-2 py-10"
    }

    spanClass() {
        return "text-overflow-ellipsis overflow-hidden text-nowrap"
    }

    buttonClass() {
        return "w-17 h-17 d-none close-filter-label"
    }

    srcImg() {
        return "assets/images/close-filter-label.png"
    }
}