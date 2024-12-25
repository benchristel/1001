export function *indicesOf(needle: string, haystack: string) {
    for (let i = 0; i <= haystack.length; i++) {
        yield i
    }
}
