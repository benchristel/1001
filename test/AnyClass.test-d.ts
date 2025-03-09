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

/**
 * An abstract class cannot be used as an `AnyClass`, because it isn't
 * constructable.
 */

abstract class AnAbstractClass {}

expectNotAssignable<AnyClass>(AnAbstractClass)
