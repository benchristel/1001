import {expectAssignable, expectNotAssignable} from "tsd"
import {AnyAbstractClass} from "../src/index.js"

/**
 * Any class can be treated as abstract, since a concrete class allows strictly
 * more operations than an abstract one.
 */

abstract class AnAbstractClass {}

expectAssignable<AnyAbstractClass>(AnAbstractClass)

expectAssignable<AnyAbstractClass>(class {})

/**
 * A function that returns an object is not a class.
 */

expectNotAssignable<AnyAbstractClass>(() => ({}))
