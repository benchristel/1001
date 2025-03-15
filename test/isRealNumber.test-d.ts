import {expectType} from "tsd"
import {isRealNumber} from "../src/index.js"

/**
 * `isRealNumber` narrows the type of its argument when used in a conditional
 * statement.
 */

let x: unknown

if (isRealNumber(x)) {
    expectType<number>(x)
}
