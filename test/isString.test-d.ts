import {expectType} from "tsd"
import {isString} from "../src/index.js"

/**
 * `isString` narrows the type of its argument when used in a conditional
 * statement.
 */

let x: unknown

if (isString(x)) {
    expectType<string>(x)
}
