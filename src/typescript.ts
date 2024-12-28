/**
 * ObjectKey represents a value that can index a property of a `PlainObject` in
 * TypeScript. It is equivalent to `string | number | Symbol`.
 *
 * Note that `PlainObject`s cannot have number keys at runtime (numbers are
 * converted to strings), but TypeScript allows numbers to be used as keys
 * anyway.
 */
export type ObjectKey = keyof any

/**
 * `PlainObject` represents a "plain old JavaScript object" (not an Array,
 * null, or class instance). A PlainObject may have any keys.
 */
export type PlainObject = Record<ObjectKey, unknown>

/**
 * `AnyFunction` represents a function. It is intended for use in `extends`
 * clauses of type parameters.
 */
export type AnyFunction = (...args: any[]) => any

export type FirstParam<F extends AnyFunction> =
    Parameters<F> extends [any]
        ? Parameters<F>[0]
        : never
