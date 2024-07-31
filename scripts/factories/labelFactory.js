class LabelFactory {
    /** Factory to instantiate new Label Object
     * instantiate SearchLabel Object (extends Label Object) if label is for labels section
     * instantiate FilterLabel Object (extends Label Object) if label is for filters dropdown
     *
     * @param {String} name is request or filter tag name to display as label's text and data-name
     * @param {String} type for data-type (search_bar or filter) according to label origin
     * @param {String} filter for data-filter (name of filter - ingredient... - or null if origin is search bar)
     * @param {String} destination to determine if label is to be displayed in label section or in filters dropdown
     *
     */
    constructor(name, type, filter, destination) {
        this._name = name
        this._type = type
        this._filter = filter
        this._destination = destination
    }
    createLabel() {
        switch (this._destination) {
            case "labels" :
                return new SearchLabel(this._name, this._type, this._filter)
            case "filters" :
                return new FilterLabel(this._name, this._type, this._filter)

        }
    }
}