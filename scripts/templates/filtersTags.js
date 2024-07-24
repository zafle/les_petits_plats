class FiltersTags {
    /** Template to display filters tags
     *
     * @param {Array} tagsDatas TagsDatas Objects
     *
     */
    constructor(tagsDatas) {

        // Arrays of tags
        this._ingredients = tagsDatas.ingredientsTags
        this._appliances = tagsDatas.appliancesTags
        this._ustensils = tagsDatas.ustensilsTags
    }

    createTags(filter) {

        const tagItems = []

        this[`_${filter}`].forEach(tag => {

            const $tagItem = document.createElement("a")
            $tagItem.setAttribute("href", "#")
            $tagItem.dataset.tagType = "filter"
            $tagItem.dataset.filter = filter
            $tagItem.classList.add("filter__tag", "list-group-item", "border-0", "py-0", "fs-2", "text-dark", "bg-transparent")
            $tagItem.innerText = tag

            tagItems.push($tagItem)
        })

        return tagItems
    }
}