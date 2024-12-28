export const isArray = Array.isArray

export function map<T, U>(f: (elem: T) => U) {
    return (array: T[]): U[] => {
        return array.map((elem) => f(elem))
    }
}
