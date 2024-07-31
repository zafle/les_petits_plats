class CustomString {
    /** functions to modify strings with regular expressions
     *
     */

    static simplify(string) {
        string = this.removeAccent(string)
        string = this.removeBrackets(string)
        return string
    }

    static secure(string) {
        string = this.removeExtraSpaces(string)
        string = this.removeUnauthorizedCharacters(string)
        return string
    }

    static removeUnauthorizedCharacters(string) {
        // keep only authorised caracters : spaces, letters, ', -
        return string.replace(/[^\x20\x2DA-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF']/g, '')
    }

    static removeExtraSpaces(string) {
        // replace multiple spaces, tab, new lines... with single space
        string = string.replace(/\s\s+/g, ' ')
        // remove first and last space
        string = string.replace(/^\s|\s$/g, '')
        return string
    }

    static removeAccent(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    static removeBrackets(string) {
        return string.replace(/[()]/g, '')
    }

}