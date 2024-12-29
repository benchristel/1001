export function map<T, U>(f: (elem: T) => U) {
    return (array: T[]): U[] => array.map((elem) => f(elem))
}
