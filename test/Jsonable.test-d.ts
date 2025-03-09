import {expectAssignable, expectNotAssignable} from "tsd"
import {Jsonable} from "../src/index.js"

/**
 * Any type that can be losslessly converted to JSON is JSONable.
 */

expectAssignable<Jsonable>(null)
expectAssignable<Jsonable>(true)
expectAssignable<Jsonable>(false)
expectAssignable<Jsonable>(42)
expectAssignable<Jsonable>("foo")
expectAssignable<Jsonable>(["foo", 42])
expectAssignable<Jsonable>([["foo"]])
expectAssignable<Jsonable>([{}])
expectAssignable<Jsonable>({foo: 42, bar: []})

/**
 * `undefined` is not JSONable.
 */

expectNotAssignable<Jsonable>(undefined)

/**
 * Functions, and objects with methods, are not JSONable.
 */

expectNotAssignable<Jsonable>(() => {})
expectNotAssignable<Jsonable>({foo() {}})

/**
 * Objects with symbol keys are not JSONable.
 */

expectNotAssignable<Jsonable>({[Symbol("foo")]: 42})
