/**
 * Pipes the given `initialValue` through zero to five functions.
 *
 * @see startWith for longer pipelines.
 */
export function _<Ret>(
    initialValue: Ret): Ret
export function _<A, Ret>(
    initialValue: A,
    f1: (a: A) => Ret): Ret
export function _<A, B, Ret>(
    initialValue: A,
    f1: (a: A) => B,
    f2: (b: B) => Ret): Ret
export function _<A, B, C, Ret>(
    initialValue: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => Ret): Ret
export function _<A, B, C, D, Ret>(
    initialValue: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => Ret): Ret
export function _<A, B, C, D, E, Ret>(
    initialValue: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => E,
    f5: (e: E) => Ret): Ret
export function _(initialValue: any, ...functions: any[]) {
    return functions.reduce((x, f) => f(x), initialValue)
}

export function startWith<T>(initialValue: T): Pipeline<T> {
    return new Pipeline(initialValue)
}

class Pipeline<T> {
    constructor(public value: T) {}

    and<U>(f: (arg: T) => U): Pipeline<U> {
        return new Pipeline(f(this.value))
    }
}
