/**
 * Pipes the given `value` through zero to five functions.
 *
 * @see startWith for longer pipelines.
 */
export function _<Ret>(
    value: Ret): Ret
export function _<A, Ret>(
    value: A,
    f1: (a: A) => Ret): Ret
export function _<A, B, Ret>(
    value: A,
    f1: (a: A) => B,
    f2: (b: B) => Ret): Ret
export function _<A, B, C, Ret>(
    value: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => Ret): Ret
export function _<A, B, C, D, Ret>(
    value: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => Ret): Ret
export function _<A, B, C, D, E, Ret>(
    value: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => E,
    f5: (e: E) => Ret): Ret
export function _(value: any, ...functions: any[]) {
    return functions.reduce((curr, f) => f(curr), value)
}

export function startWith<T>(value: T): Pipeline<T> {
    return new Pipeline(value)
}

class Pipeline<T> {
    constructor(public value: T) {}

    and<U>(f: (arg: T) => U): Pipeline<U> {
        return new Pipeline(f(this.value))
    }
}
