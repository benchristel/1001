import {curry, Curried1} from "../curry.js"
import {Consumer} from "../typescript.js"

/**
 * Finds elements of `array` for which `predicate` returns truthy.
 *
 * @yields each index at which a matching element is found.
 */
type NumberGenerator = Generator<number, void, unknown>
interface FindIndices {
    <T>(predicate: Consumer<T>): Curried1<T[], NumberGenerator>;
    <T>(predicate: Consumer<T>, array: T[]): NumberGenerator;
}
export const findIndices: FindIndices = curry(function *(predicate: any, array: any[]) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            yield i
        }
    }
})
