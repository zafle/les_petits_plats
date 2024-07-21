class Label {
    constructor() {
        this.$labelsList = document.querySelector(".search-labels__list")
    }


    displayLabel(request, type) {
        // remove search bar query label if exists
        if (type === "search_bar") {
            const searchBarLabel = document.querySelector("[data-search-type='search_bar']")
            if (searchBarLabel) {
                searchBarLabel.remove()
            }
        }
        //  display label
        const labelSearch = document.createElement("li")
        labelSearch.dataset.searchType = type
        labelSearch.classList.add("d-flex", "justify-content-between", "align-items-center", "bg-primary", "rounded-6", "h-53", "px-20")
        labelSearch.innerHTML = `
            <span class="me-60 text-black fs-2">${request}</span>
            <img src="assets/images/close-label.png" alt="remove label" class="close-label w-10 h-10 cursor-pointer">
        `
        this.$labelsList.append(labelSearch)

        // add event listener on close button
        const closeButton = document.querySelector(".close-label")
        this.onClickSearchLabel(closeButton, labelSearch)
    }

    onClickSearchLabel(closeButton, label) {
        closeButton.addEventListener("click", (e) => {
            label.remove()

            // ici ajouter du code pour mettre à jour et afficher les recettes en fonction des filtres éventuellmetn sélectionnés
        })
    }
}