import {expectType} from "tsd"
import {isSafeInteger} from "../src/index.js"

/**
 * `isSafeInteger` narrows the type of its argument when used in a conditional
 * statement.
 */

let x: unknown

if (isSafeInteger(x)) {
    expectType<number>(x)
}
