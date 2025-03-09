/**
 * Note to vscode users: you can navigate this file using ctrl+shift+O to jump
 * to a symbol.
 *
 * This library is written in Markdown using a vaguely ["literate"][lp] style.
 * I suggest reading the entire thing from top to bottom.
 *
 * [lp]: http://www.literateprogramming.com/
 *
 *
 * ## Foundational Types
 *
 * This section contains types that are so generally useful, they could have
 * been built into TypeScript. You will probably find these types useful even
 * if you don't use anything else from this library.
 */

/** ### `AnyFunction` type */
/**
 * Represents a function, disregarding parameters and return type. Intended for
 * use in type parameter constraints (i.e. `extends` clauses).
 */

export type AnyFunction = (...args: any[]) => void

/** ### `AnyClass` type */
/**
 * Represents a class, disregarding constructor parameters. Intended for use in
 * type parameter constraints (i.e. `extends` clauses).
 */

export type AnyClass = new (...args: any[]) => void

/** ### `AnyAbstractClass` type */
/**
 * Represents an abstract class, disregarding constructor parameters. Intended
 * for use in type parameter constraints (i.e. `extends` clauses).
 */

export type AnyAbstractClass = abstract new (...args: any[]) => void

/** ### `Jsonable` type */
/**
 * Represents data that can be losslessly converted to JSON.
 */

export type Jsonable =
    | null
    | boolean
    | number
    | string
    | Jsonable[]
    | JsonableObject

interface JsonableObject {
    [key: string]: Jsonable;
    [key: symbol]: never;
}

/**
 * ## Currying and partial function application
 */

type Function0<RV> = () => RV
type Function1<A, RV> = (a: A) => RV
type Function2<A, B, RV> = (a: A, b: B) => RV
type Function3<A, B, C, RV> = (a: A, b: B, c: C) => RV
type Function4<A, B, C, D, RV> = (a: A, b: B, c: C, d: D) => RV
type Function5<A, B, C, D, E, RV> = (a: A, b: B, c: C, d: D, e: E) => RV

export type Curried0<RV> = Function0<RV>

export type Curried1<A, RV> = Function1<A, RV>

export type Curried2<A, B, RV> = (
    & ((a: A, b: B) => RV)
    & ((a: A) => Curried1<B, RV>)
)

export type Curried3<A, B, C, RV> = (
    & ((a: A, b: B, c: C) => RV)
    & ((a: A, b: B) => Curried1<C, RV>)
    & ((a: A) => Curried2<B, C, RV>)
)

export type Curried4<A, B, C, D, RV> = (
    & ((a: A, b: B, c: C, d: D) => RV)
    & ((a: A, b: B, c: C) => Curried1<D, RV>)
    & ((a: A, b: B) => Curried2<C, D, RV>)
    & ((a: A) => Curried3<B, C, D, RV>)
)

export type Curried5<A, B, C, D, E, RV> = (
    & ((a: A, b: B, c: C, d: D, e: E) => RV)
    & ((a: A, b: B, c: C, d: D) => Curried1<E, RV>)
    & ((a: A, b: B, c: C) => Curried2<D, E, RV>)
    & ((a: A, b: B) => Curried3<C, D, E, RV>)
    & ((a: A) => Curried4<B, C, D, E, RV>)
)

export function curry<RV>(F: Function0<RV>): Curried0<RV>
export function curry<A, RV>(f: Function1<A, RV>): Curried1<A, RV>
export function curry<A, B, RV>(f: Function2<A, B, RV>): Curried2<A, B, RV>
export function curry<A, B, C, RV>(f: Function3<A, B, C, RV>): Curried3<A, B, C, RV>
export function curry<A, B, C, D, RV>(f: Function4<A, B, C, D, RV>): Curried4<A, B, C, D, RV>
export function curry<A, B, C, D, E, RV>(f: Function5<A, B, C, D, E, RV>): Curried5<A, B, C, D, E, RV>
export function curry(f: AnyFunction): AnyFunction {
    return function curried(...args: any[]) {
        return args.length >= f.length
            ? f(...args)
            : (...moreArgs: any[]) => curried(...args, ...moreArgs)
    }
}
