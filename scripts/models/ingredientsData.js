class IngredientData {
    /** Constructor pattern for ingredients datas from one recipe
     *
     */
    constructor(ingredientData) {
        this._name = ingredientData.ingredient
        this._quantity = ingredientData.quantity ? ingredientData.quantity : null
        this._unit = ingredientData.unit ? ingredientData.unit : null
    }

    get name() {
        return this._name
    }

    get quantity() {

        let quantity = ""

        // if quantity exists
        if (this._quantity !== null) {

            // if unit exists
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