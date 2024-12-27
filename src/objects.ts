import type {ObjectKey, PlainObject} from "./typescript.js"

/**
 * isPlainObject checks if its argument is a "plain object", i.e. something
 * that supports property access and isn't an Array or a class instance.
 *
 * @returns true if the argument is a plain object, false otherwise.
 */
export function isPlainObject(x: unknown): x is PlainObject {
    if (x == null) return false
    const prototype = Object.getPrototypeOf(x)
    return prototype === null || prototype === Object.prototype
}

/**
 * prop retrieves a property value from an object. It is hard-curried and
 * intended for use in pipelines.
 */
export function prop<K extends ObjectKey>(key: K) {
    return <T extends {[_ in K]: any}>(object: T) => object[key]
}
