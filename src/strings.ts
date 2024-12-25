export function *indicesOf(needle: string, haystack: string) {
    for (let i = 0; i <= haystack.length; i++) {
        if (haystack.slice(i, i + needle.length) !== needle) {
            continue
        }
        yield i
    }
}
