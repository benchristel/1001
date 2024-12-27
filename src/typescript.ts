/**
 * `UnknownObject` represents a "plain object" (not an Array, null, or class
 * instance) with any keys.
 */
export type UnknownObject = Record<keyof any, unknown>
