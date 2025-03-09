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
