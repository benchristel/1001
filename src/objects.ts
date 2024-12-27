import type {UnknownObject} from "./typescript.js"

/**
 * isPlainObject checks if its argument is a "plain object", i.e. something
 * that supports property access and isn't an Array or a class instance.
 *
 * @returns true if the argument is a plain object, false otherwise.
 */
export function isPlainObject(x: unknown): x is UnknownObject {
    if (x == null) return false
    const prototype = Object.getPrototypeOf(x)
    return prototype === null || prototype === Object.prototype
}
