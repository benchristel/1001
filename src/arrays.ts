export function isArray(x: unknown): x is unknown[] {
    return Array.isArray(x)
}

export function map<T, U>(f: (elem: T) => U) {
    return (array: T[]): U[] => {
        return array.map((elem) => f(elem))
    }
}

export function filter<Element, Narrowed extends Element>(
    predicate: (x: Element) => x is Narrowed
): (array: Element[]) => Narrowed[]
export function filter<Element>(
    predicate: (x: Element) => unknown,
): (array: Element[]) => Element[]
export function filter(predicate: any) {
    return (array: any) => array.filter(predicate)
}
