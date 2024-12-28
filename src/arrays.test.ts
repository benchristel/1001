import {test, expect, is, equals} from "@benchristel/taste"
import {isArray, map} from "./arrays.js"

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
})

test("map", {
    "transforms each array element"() {
        const increment = (x: number) => x + 1
        expect(map(increment)([0, 1, 2]), equals, [1, 2, 3])
    },

    "does not pass the array index to the callback"() {
        expect(map(parseInt)(["10", "10", "10"]), equals, [10, 10, 10])
    },
})
