import type {FirstParam} from "./typescript.js"

export const isArray = Array.isArray

export function map<T, U>(f: (elem: T) => U) {
    return (array: T[]): U[] => {
        return array.map((elem) => f(elem))
    }
}

export function filter<Narrowed, P extends (x: any) => x is Narrowed>(
    predicate: P
): <E extends FirstParam<P>>(array: E[]) => Narrowed[]
export function filter<P extends (x: any) => unknown>(
    predicate: P,
): <E extends FirstParam<P>>(array: E[]) => E[]
export function filter(predicate: any) {
    return (array: any) => array.filter(predicate)
}
