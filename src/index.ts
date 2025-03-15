/**
 * Note to vscode users: you can navigate this file using ctrl+shift+O to jump
 * to a symbol.
 *
 * This library is written in Markdown using a vaguely "[literate]" style.
 * I suggest reading the entire thing from top to bottom.
 *
 * [literate]: http://www.literateprogramming.com/
 *
 *
 * ## Design Choices
 *
 * ### Principles
 *
 * In designing, organizing, and documenting this library, we adhere to a few
 * principles:
 *
 * - **Usage-driven design:** New elements are added to this library only
 *   when they have proven useful under real-world conditions.
 * - **Test-driven development:** Each public export has at least one
 *   corresponding test file in the `test` directory: either a unit test file,
 *   or a `tsd` type test file, or both. Every complication to the library must
 *   be motivated by a test.
 * - **Functional programming:** We avoid mutating shared objects. We strive to
 *   enable clients of this library to write compositional, point-free,
 *   typesafe programs.
 * - **Object-oriented programming:** We also recognize the significant
 *   benefits of object-oriented programming: in particular, encapsulation of
 *   process state, and discoverability through method autocompletion.
 *
 * ### Naming
 *
 * Test files are named after the public export they test. When several
 * elements cohere and need to be tested together, these are grouped into a
 * single exported object so the test file can be named after that object. We
 * hope that this organization will make it easier to find the tests that
 * document a particular facet of the library.
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
 * ## Type Predicates
 *
 * This section contains functions that check the type of a value at runtime.
 */

/** ### `isString` function */
/**
 * @Returns true iff the given `value` is a `string`.
 */

export function isString(value: unknown): value is string {
    return typeof value === "string"
}

/** ### `isNumber` function */
/**
 * @Returns true iff the given `value` is of type `number`. Note that
 * `isNumber` considers `NaN`, `Infinity`, and `-Infinity` to be numbers,
 * because they satisfy the `number` type. For stricter checks, see
 * {@link isRealNumber} and {@link isInteger}.
 */

export function isNumber(value: unknown): value is number {
    return typeof value === "number"
}

// TODO: isRealNumber
// TODO: isInteger

/**
 * ## Display Names
 *
 * A function may be given a *display name*, which is shown when the function
 * is pretty-printed using `inspect()`. The display name default's to the
 * function's `name` property, and may be overridden by setting the
 * `displayName` property.
 *
 * `displayName` is a nonstandard property, although [it is used by React's and
 * Firefox's dev tools][1]. Therefore, we declare the `displayName` property on
 * `Function` to prevent type errors when we get or set it.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName
 */

declare global {
    interface Function {
        displayName: string | undefined;
    }
}

// TODO: add an inspect() function that uses displayName

/** ### `getDisplayName` function */
/**
 * @Returns the display name of the given function. The "display name" is the
 * function's `displayName` property, or its `name` if `displayName` is null,
 * undefined, or empty.
 */

export function getDisplayName(f: AnyFunction): string {
    return f.displayName || f.name
}

/**
 * ## Currying and partial function application
 *
 * [Currying] is the process of taking a function that accepts
 * multiple arguments, and converting it to a function that accepts those
 * arguments in a sequence of chained calls.
 *
 * ```typescript
 * // Calling an uncurried function looks like this:
 * add(1, 2, 3) // => 6
 *
 * // Calling a curried version of the same function looks like this:
 * add(1)(2)(3) // => 6
 * ```
 *
 * [Currying]: https://wiki.haskell.org/Currying
 *
 * More precisely: a curried function, when called with its first argument,
 * returns another curried function that accepts the remaining arguments.
 * You'll see this definition represented quite literally in the `CurriedN`
 * types below.
 *
 * Currying is useful because it allows *[partial application]*;
 * that is, supplying only some of the arguments to a function so the rest can
 * be supplied elsewhere. This enables programming in a concise [point-free]
 * (or "tacit") style.
 *
 * ```typescript
 * const greaterThan = curry(
 *     (threshold: number, x: number) => x > threshold,
 * )
 *
 * ;[1, 2, 3, 4, 5].filter(greaterThan(3)) // => [4, 5]
 * ```
 *
 * [partial application]: https://wiki.haskell.org/index.php?title=Partial_application
 * [point-free]: https://en.wikipedia.org/wiki/Tacit_programming
 *
 * In this section, we provide facilities for currying functions. Due to
 * limitations of TypeScript's type system, currying functions with an
 * arbitrary number of parameters is not possible. Therefore, we limit the
 * number of parameters to five. We have found that in practice, functions
 * rarely need more than two or three parameters.
 */

/* The following unexported `FunctionN` types exist as abbreviations for
 * function type literals. No one wants to look at all those dummy parameter
 * names.
 */

/** */
type Function0<RV> = () => RV
type Function1<A, RV> = (a: A) => RV
type Function2<A, B, RV> = (a: A, b: B) => RV
type Function3<A, B, C, RV> = (a: A, b: B, c: C) => RV
type Function4<A, B, C, D, RV> = (a: A, b: B, c: C, d: D) => RV
type Function5<A, B, C, D, E, RV> = (a: A, b: B, c: C, d: D, e: E) => RV

/** ### `Curried0` type */
/**
 * Represents a zero-argument "curried" function. This is identical to an
 * ordinary zero-argument function. This type only exists for the sake of
 * symmetry.
 */

export type Curried0<RV> = Function0<RV>

/** ### `Curried1` type */
/**
 * Represents a one-argument "curried" function. This is identical to an
 * ordinary one-argument function. This type only exists for the sake of
 * symmetry.
 */

export type Curried1<A, RV> = Function1<A, RV>

/** ### `Curried2` type */
/**
 * Represents a two-argument curried function, which can be passed its
 * arguments in a single call, or in two chained calls.
 */

export type Curried2<A, B, RV> = (
    & ((a: A, b: B) => RV)
    & ((a: A) => Curried1<B, RV>)
)

/** ### `Curried3` type */
/**
 * Represents a three-argument curried function, which can be passed its
 * arguments in a single call, or in several chained calls. If not all
 * arguments are supplied, returns a curried function that takes the remaining
 * arguments.
 */

export type Curried3<A, B, C, RV> = (
    & ((a: A, b: B, c: C) => RV)
    & ((a: A, b: B) => Curried1<C, RV>)
    & ((a: A) => Curried2<B, C, RV>)
)

/** ### `Curried4` type */
/**
 * Represents a four-argument curried function, which can be passed its
 * arguments in a single call, or in several chained calls. If not all
 * arguments are supplied, returns a curried function that takes the remaining
 * arguments.
 */

export type Curried4<A, B, C, D, RV> = (
    & ((a: A, b: B, c: C, d: D) => RV)
    & ((a: A, b: B, c: C) => Curried1<D, RV>)
    & ((a: A, b: B) => Curried2<C, D, RV>)
    & ((a: A) => Curried3<B, C, D, RV>)
)

/** ### `Curried5` type */
/**
 * Represents a five-argument curried function, which can be passed its
 * arguments in a single call, or in several chained calls. If not all
 * arguments are supplied, returns a curried function that takes the remaining
 * arguments.
 */

export type Curried5<A, B, C, D, E, RV> = (
    & ((a: A, b: B, c: C, d: D, e: E) => RV)
    & ((a: A, b: B, c: C, d: D) => Curried1<E, RV>)
    & ((a: A, b: B, c: C) => Curried2<D, E, RV>)
    & ((a: A, b: B) => Curried3<C, D, E, RV>)
    & ((a: A) => Curried4<B, C, D, E, RV>)
)

/** ### `curry` function */
/**
 * Returns a curried version of the given function, which may have up to five
 * parameters. The function passed to `curry` must not be generic, and must not
 * have [default parameters] or [rest parameters].
 *
 * [default parameters]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
 * [rest parameters]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
 */

export function curry<RV>(f: Function0<RV>): Curried0<RV>
export function curry<A, RV>(f: Function1<A, RV>): Curried1<A, RV>
export function curry<A, B, RV>(f: Function2<A, B, RV>): Curried2<A, B, RV>
export function curry<A, B, C, RV>(f: Function3<A, B, C, RV>): Curried3<A, B, C, RV>
export function curry<A, B, C, D, RV>(f: Function4<A, B, C, D, RV>): Curried4<A, B, C, D, RV>
export function curry<A, B, C, D, E, RV>(f: Function5<A, B, C, D, E, RV>): Curried5<A, B, C, D, E, RV>
export function curry(f: AnyFunction): AnyFunction {
    /* Optimize the common cases. Curried functions can run up to 75x faster
     * when we use positional parameters instead of rest parameters. Based on
     * our performance testing (with `bun` as the JS runtime), it seems that
     * concatenating argument lists is particularly slow.
     */
    switch (f.length) {
        case 0:
        case 1:
            return f
        case 2:
            return curry2(f)
        case 3:
            return curry3(f)
        default:
            /* It's rare for curried functions to need more than 3 parameters,
             * so rather than make web users download special-case code for
             * curry4 and curry5, we just use rest parameters for those cases.
             */
            return curryVariadic(f)
    }
}

function curry2(f: AnyFunction): AnyFunction {
    function curried(a: any, b: any) {
        let partiallyApplied: AnyFunction

        switch (arguments.length) {
            case 0:
                partiallyApplied = curried
                break
            case 1:
                partiallyApplied = (b: any) => f(a, b)
                break
            default:
                return f(a, b)
        }

        return copyDisplayDataFrom(curried, partiallyApplied)
    }

    return copyDisplayDataFrom(f, curried)
}

function curry3(f: AnyFunction): AnyFunction {
    function curried(a: any, b: any, c: any) {
        let partiallyApplied: AnyFunction

        switch (arguments.length) {
            case 0:
                partiallyApplied = curried
                break
            case 1:
                partiallyApplied = curry2((b: any, c: any) => f(a, b, c))
                break
            case 2:
                partiallyApplied = (c: any) => f(a, b, c)
                break
            default:
                return f(a, b, c)
        }

        return copyDisplayDataFrom(curried, partiallyApplied)
    }

    return copyDisplayDataFrom(f, curried)
}

function curryVariadic(f: AnyFunction): AnyFunction {
    function curried(...args: any[]): any {
        if (args.length >= f.length) {
            return f(...args)
        } else {
            const partiallyApplied =
                (...moreArgs: unknown[]) => curried(...args, ...moreArgs)
            return copyDisplayDataFrom(curried, partiallyApplied)
        }
    }

    return copyDisplayDataFrom(f, curried)
}

function copyDisplayDataFrom<T extends AnyFunction>(
    source: AnyFunction,
    dest: T,
): T {
    dest.displayName = getDisplayName(source)
    return dest
}
