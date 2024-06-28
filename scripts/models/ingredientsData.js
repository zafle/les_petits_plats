class IngredientData {
    constructor(ingredient) {
        this._name = ingredient.ingredient
        this._quantity = ingredient.quantity ? ingredient.quantity : null
        this._unit = ingredient.unit ? ingredient.unit : null
    }

    get name() {
        return this._name
    }
    get quantity() {

        let quantity = ""

        if (this._quantity !== null) {

            if (this._unit !== null) {
                quantity = `${this._quantity} ${this._unit}`
            } else {
                quantity = `${this._quantity}`
            }

        } else {
            quantity = "-"
        }

        return quantity
    }
}