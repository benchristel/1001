import {expectType} from "tsd"
import {isNumber} from "../src/index.js"

/**
 * `isNumber` narrows the type of its argument when used in a conditional
 * statement.
 */

let x: unknown

if (isNumber(x)) {
    expectType<number>(x)
}
