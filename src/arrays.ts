export const isArray = Array.isArray

export function map<T, U>(f: (elem: T) => U) {
    return (array: T[]): U[] => {
        return array.map((elem) => f(elem))
    }
}

export function filter<
    Narrowed,
    Predicate extends (x: any) => x is Narrowed,
>(predicate: Predicate): <Element extends Parameters<Predicate>[0]>(array: Element[]) => Narrowed[]
export function filter<
    Predicate extends (x: any) => unknown,
>(predicate: Predicate): <Element extends Parameters<Predicate>[0]>(array: Element[]) => Element[]
export function filter(predicate: any) {
    return (array: any) => array.filter(predicate)
}
