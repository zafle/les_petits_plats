class Label {
    constructor() {
        this.$labelsList = document.querySelector(".search-labels__list")

        this.$ingredients = document.querySelector(".filters-labels__list--ingredients")
        this.$appliances = document.querySelector(".filters-labels__list--appliances")
        this.$ustensils = document.querySelector(".filters-labels__list--ustensils")
    }


    // --- Search Bar label ---
    displaySearchLabel(request, type) {
        // remove search bar query label if exists
        if (type === "search_bar") {
            const searchBarLabel = document.querySelector("[data-search-type='search_bar']")
            if (searchBarLabel) {
                searchBarLabel.remove()
            }
        }
        //  display label
        const searchLabel = document.createElement("li")
        const closeButton = document.createElement("img")

        closeButton.classList.add("close-label", "w-10", "h-10", "cursor-pointer")
        closeButton.setAttribute("src", "assets/images/close-label.png")
        closeButton.setAttribute("alt", "remove label")

        searchLabel.dataset.searchType = type
        searchLabel.classList.add("d-flex", "justify-content-between", "align-items-center", "bg-primary", "rounded-6", "h-53", "px-20")
        searchLabel.innerHTML = `
            <span class="me-60 text-black fs-2 label-name">${request}</span>
        `
        searchLabel.append(closeButton)
        this.$labelsList.append(searchLabel)

        // add event listener on close button
        this.onClickLabel(closeButton, searchLabel)
    }

    // --- Filters Labels ---
    displayFilterLabel(request, filter) {

        this.displaySearchLabel(request, filter)

        const labelWrapper = document.querySelector(`.filters-labels[data-label="${filter}"]`)
        if (labelWrapper.classList.contains("d-none")) {
            labelWrapper.classList.remove("d-none")
        }

        const filterLabel = document.createElement("li")
        const closeButton = document.createElement("img")

        closeButton.classList.add("close-label", "w-17", "h-17", "cursor-pointer")
        closeButton.setAttribute("src", "assets/images/close-filter-label.png")
        closeButton.setAttribute("alt", "remove label")

        filterLabel.classList.add("filter-label", "h-37", "mb-6", "px-3", "py-10", "bg-primary", "d-flex", "justify-content-between", "align-items-center")
        filterLabel.innerHTML = `
            <span class="text-black fs-2">${request}</span>
        `
        filterLabel.append(closeButton)
        this[`$${filter}`].append(filterLabel)

        // add event listener on close button
        this.onClickLabel(closeButton, filterLabel, labelWrapper)
    }

    // remove label event
    onClickLabel(closeButton, label, wrapper) {
        closeButton.addEventListener("click", (e) => {
            // remove label
            label.remove()

            // hide wrapper
            if (!wrapper.querySelector(".filters-labels__list").hasChildNodes()) {
                wrapper.classList.add("d-none")
            }

            //  build array of labels objects {type : name}
            const allSearchLabels = document.querySelectorAll("[data-search-type]")
            const labelsArray = Array.from(allSearchLabels)
            const labelsMap = labelsArray.map((label) => {
                const rObj = {}
                const type = label.dataset.searchType
                const name = label.querySelector(".label-name").innerText
                rObj[type] = name
                return rObj
            })

            // new search from labels list
            const result = new Search()
            // const filteredRecipes = result.searchByLabel(labelsMap)




            // ici ajouter du code pour mettre à jour et afficher les recettes en fonction des filtres éventuellmetn sélectionnés
        })
    }
}