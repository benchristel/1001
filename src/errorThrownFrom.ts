export function errorThrownFrom(f: () => unknown): unknown {
    try {
        f()
    } catch (e) {
        return e
    }
}
