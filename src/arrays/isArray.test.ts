import {test, expect, is} from "@benchristel/taste"
import {isArray} from "./isArray.js"

test("isArray()", {
    "is true for an array"() {
        expect(isArray([]), is, true)
    },

    "is false for a string"() {
        expect(isArray(""), is, false)
    },

    "is false for an object"() {
        expect(isArray({}), is, false)
    },

    "is false for `arguments`"() {
        expect(isArray(arguments), is, false)
    },

    "is false for a typed array"() {
        expect(isArray(new Uint8Array()), is, false)
    },

    "is false for null"() {
        expect(isArray(null), is, false)
    },

    "narrows types"() {
        let x: unknown = []
        // @ts-expect-error
        x[0]
        if (isArray(x)) {
            // no type error here
            x[0]
        }
    },

    "uses 'unknown' as the array element type"() {
        let x: unknown = []
        if (isArray(x)) {
            // @ts-expect-error - x[0] should have type unknown
            x[0] satisfies string
        }
    },
})
