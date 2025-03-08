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

/** ### type `AnyFunction` */
/**
 * Represents a function with any arguments and return type. Intended for use
 * in type parameter constraints (i.e. `extends` clauses).
 */

export type AnyFunction = (...args: any[]) => any

/** ### type `AnyClass` */
/**
 * Represents a class whose constructor takes any arguments. Intended for use
 * in type parameter constraints (i.e. `extends` clauses).
 */

export type AnyClass = new (...args: any[]) => void
