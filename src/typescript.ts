/**
 * `PlainObject` represents a "plain old JavaScript object" (not an Array,
 * null, or class instance). A PlainObject may have any keys.
 */
export type PlainObject = Record<keyof any, unknown>
