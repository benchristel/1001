import {Consumer} from "../typescript.js"

/**
 * Finds elements of `array` for which `predicate` returns truthy.
 *
 * @yields each index at which a matching element is found.
 */
export function *findIndices<T>(predicate: Consumer<T>, array: T[]) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            yield i
        }
    }
}
