const NOT_FOUND_INDEX = -1

/**
 * Finds occurrences of `needle` in `haystack`.
 *
 * @yields each index in `haystack` at which an occurrence of `needle` starts,
 * in ascending order. Occurrences can overlap.
 */
export function *indicesOf(needle: string, haystack: string) {
    for (let i = 0; i <= haystack.length; i++) {
        i = haystack.indexOf(needle, i)
        if (i === NOT_FOUND_INDEX) {
            break
        }
        yield i
    }
}
