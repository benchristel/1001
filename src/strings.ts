const NOT_FOUND_INDEX = -1

export function *indicesOf(needle: string, haystack: string) {
    for (let i = 0; i <= haystack.length; i++) {
        i = haystack.indexOf(needle, i)
        if (i === NOT_FOUND_INDEX) {
            break
        }
        yield i
    }
}
