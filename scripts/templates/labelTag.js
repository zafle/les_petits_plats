class LabelTag {
    constructor(name, type, filter) {
        this._name = name
        this._type = type
        this._filter = filter
    }

    createLabelTag() {

        const label = document.createElement("li")
        label.dataset.searchType = this._type
        label.dataset.labelName = this._name
        label.dataset.filter = this._filter
        label.classList.add("d-flex", "justify-content-between", "align-items-center", "bg-primary")
        label.classList.add(...this.labelClass().split(' '))
        label.innerHTML = `
            <span class="${this.spanClass()} text-black fs-2">${this._name}</span>
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

    labelClass() {
        return "main-label rounded-6 h-53 px-20"
    }

    spanClass() {
        return "me-60"
    }

    buttonClass() {
        return "w-10 h-10"
    }

    srcImg() {
        return "assets/images/close-label.png"
    }

}

class FilterLabel extends LabelTag {

    labelClass() {
        return "filter-label h-37 mb-6 px-3 py-10"
    }

    spanClass() {
        return ""
    }

    buttonClass() {
        return "w-17 h-17"
    }

    srcImg() {
        return "assets/images/close-filter-label.png"
    }

}