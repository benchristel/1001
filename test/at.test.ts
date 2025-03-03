import {test, expect, is} from "@benchristel/taste"
import {_, at} from "../src/index.js"

test("at()", {
    "returns the array element at the specified index"() {
        expect(_([42], at(0)), is, 42)
        expect(_([3, 76], at(1)), is, 76)
    },

    "returns undefined if the element is not found"() {
        const notFound = at(3)([1])
        // @ts-expect-error - the return type includes 'undefined'
        notFound satisfies number
    },

    "is typed to always return a value given a tuple and a valid index"() {
        at(0)([1] as const) satisfies number

        at(0)(["", 1] as const) satisfies string
        at(1)(["", 1] as const) satisfies number

        at(0)([true, "", 1] as const) satisfies boolean
        at(1)([true, "", 1] as const) satisfies string
        at(2)([true, "", 1] as const) satisfies number

        at(0)([null, true, "", 1] as const) satisfies null
        at(1)([null, true, "", 1] as const) satisfies boolean
        at(2)([null, true, "", 1] as const) satisfies string
        at(3)([null, true, "", 1] as const) satisfies number
    },
})
