import {expectType} from "tsd"
import {isInteger} from "../src/index.js"

/**
 * `isInteger` narrows the type of its argument when used in a conditional
 * statement.
 */

let x: unknown

if (isInteger(x)) {
    expectType<number>(x)
}
