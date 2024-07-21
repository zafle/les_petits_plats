class SecureRequest {
    static secure(request) {
        // replace multiple spaces, tab, new lines... with single space
        request = request.replace(/\s\s+/g, ' ')
        // keep only authorised caracters : spaces, letters, ', -
        request = request.replace(/[^\x20\x2DA-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF']/g, '')

        return request
    }
}