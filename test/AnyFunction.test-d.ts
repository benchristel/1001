import {expectAssignable, expectNotAssignable} from "tsd"
import type {AnyFunction} from "../src/index.js"

/**
 * Functions with any number of arguments and any return type are assignable to
 * `AnyFunction`.
 */

expectAssignable<AnyFunction>(() => {})
expectAssignable<AnyFunction>((x: number) => x)

/**
 * Even functions that never return satisfy `AnyFunction`.
 */

function neverReturns(): never {
    throw 0
}

expectAssignable<AnyFunction>(neverReturns)

/**
 * Non-callable objects are not assignable.
 */

expectNotAssignable<AnyFunction>({})
