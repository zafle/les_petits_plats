/* global SearchBar */

class SearchBar {
    constructor() {
        this.$button = document.querySelector(".main-header__search-button")
        this.$searchInput = document.querySelector(".main-header__search-input")
        this.$closeButton = document.querySelector(".main-header__close-search")

    }

    buttonHover() {
        this.$button.addEventListener("mouseover", () => {
            this.$button.src = "assets/images/magnifier-black.png"
        })
        this.$button.addEventListener("mouseout", () => {
            this.$button.src = "assets/images/magnifier-white.png"
        })
    }

    displayCloseButton() {
        this.$searchInput.addEventListener("input", () => {
            this.$closeButton.style.display = "block"
        })
    }

    launchSearch(recipes) {
        this.$searchInput.addEventListener("change", () => {


        })
    }



    run() {
        this.buttonHover()
        this.displayCloseButton()
    }
}