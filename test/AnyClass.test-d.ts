import {expectAssignable, expectNotAssignable} from "tsd"
import {AnyClass} from "../src/index.js"

/**
 * A class is assignable to `AnyClass`, regardless of how many constructor
 * parameters it has.
 */

expectAssignable<AnyClass>(class {})

expectAssignable<AnyClass>(
    class {
        constructor(x: number) {}
    },
)

/**
 * A function that returns an object is not a constructor.
 */

expectNotAssignable<AnyClass>(() => ({}))
