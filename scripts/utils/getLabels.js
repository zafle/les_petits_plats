/* global CustomString */
class GetLabels {
    /** return all displayed labels array
     *
     *
     */
    static getLabelsArray() {
        // get all displayed labels in an array
        const allLabels = document.querySelectorAll(".main-label")

        // if labels array is not empty
        if (allLabels.length) {
            //  build array of labels objects with filter and request keys
            const labelsArray = Array.from(allLabels).map((label) => {
                const rObj = {}
                // will return filter's name or null if search bar filter
                rObj["filter"] = label.dataset.filter
                // will return request
                rObj["request"] = CustomString.removeBrackets(label.dataset.labelName)

                return rObj
            })
            return labelsArray

        // if no label, return null
        } else {
            return null
        }
    }
}