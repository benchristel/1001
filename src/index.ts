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
 * elements cohere and need to be tested together (such as `DisplayName.get`
 * and `DisplayName.set`), these are grouped into a single exported object (in
 * this example, `DisplayName`) so the test file can be named after that
 * object. We hope that this organization will make it easier to find the tests
 * that document a particular facet of the library.
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

export function curry<RV>(F: Function0<RV>): Curried0<RV>
export function curry<A, RV>(f: Function1<A, RV>): Curried1<A, RV>
export function curry<A, B, RV>(f: Function2<A, B, RV>): Curried2<A, B, RV>
export function curry<A, B, C, RV>(f: Function3<A, B, C, RV>): Curried3<A, B, C, RV>
export function curry<A, B, C, D, RV>(f: Function4<A, B, C, D, RV>): Curried4<A, B, C, D, RV>
export function curry<A, B, C, D, E, RV>(f: Function5<A, B, C, D, E, RV>): Curried5<A, B, C, D, E, RV>
export function curry(f: AnyFunction): AnyFunction {
    function curried(...args: any[]) {
        return args.length >= f.length
            ? f(...args)
            : DisplayName.inheritFrom(curried, (...moreArgs: any[]) =>
                curried(...args, ...moreArgs))
    }

    return DisplayName.inheritFrom(f, curried)
}

/**
 * ## Display Names
 *
 * An object may be given a *display name*, which is shown when the object is
 * pretty-printed using `inspect()`.
 *
 * Some objects, such as functions and classes, have a "natural name," which is
 * set when the following syntaxes are used:
 *
 * ```typescript
 * function theNaturalName() {
 *     // ...
 * }
 *
 * class TheNaturalName {
 *     // ...
 * }
 *
 * const object = {
 *     aMethodWithANaturalName() {}
 * }
 * ```
 *
 * The natural name of a function or class is given by its `name` property.
 * The display name of an object defaults to its natural name, if it has one.
 */

// TODO: add an inspect() function that uses displayName

/** */
const displayNames = new WeakMap<WeakKey, string | undefined>()

export const DisplayName = {

    /** ### `DisplayName.get` function */
    /**
     * @Returns the display name of the given object. Defaults to the object's
     * natural name, or `undefined` if it has none.
     */

    get(namedObject: WeakKey): string | undefined {
        if (displayNames.has(namedObject)) {
            return displayNames.get(namedObject)
        }

        return getNaturalName(namedObject)
    },

    /** ### `DisplayName.set` function */
    /**
     * Associates a display name with the object. The given `name` may be
     * `undefined`; if it is, subsequent calls to `DisplayName.get` will return
     * `undefined` even if the object has a natural name.
     *
     * @Returns the named object.
     */

    set<T extends WeakKey>(name: string | undefined, namedObject: T): T {
        displayNames.set(namedObject, name)
        return namedObject
    },

    /** ### `DisplayName.inheritFrom` function */
    /**
     * A convenience wrapper for composing DisplayName.set and DisplayName.get.
     * Causes the `inheritor` to have the same display name as the `original`
     * object.
     *
     * @Returns the inheritor of the name.
     */

    inheritFrom<T extends WeakKey>(original: WeakKey, inheritor: T): T {
        return DisplayName.set(DisplayName.get(original), inheritor)
    },
}

/** ### `getNaturalName` function */
/**
 * @Returns the given object's "natural name," if it has one. For functions and
 * classes, the natural name is given by the `name` property.
 */

// TODO: I'm not sure if this should return undefined or empty string for
// anonymous functions. I'll probably figure it out when I start implementing
// inspect().
export function getNaturalName(namedObject: WeakKey): string | undefined {
    if (typeof namedObject === "function") {
        return namedObject.name
    }

    return undefined
}
