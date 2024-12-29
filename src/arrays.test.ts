import {test, expect, is, equals} from "@benchristel/taste"
import {filter, isArray, map} from "./arrays.js"
import {_} from "./composition.js"

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

test("map", {
    "transforms each array element"() {
        const increment = (x: number) => x + 1
        expect(map(increment)([0, 1, 2]), equals, [1, 2, 3])
    },

    "does not pass the array index to the callback"() {
        expect(map(parseInt)(["10", "10", "10"]), equals, [10, 10, 10])
    },
})

test("filter", {
    "keeps only elements for which the predicate returns true"() {
        const isEven = (n: number) => n % 2 === 0
        expect(_([0, 1, 2, 3], filter(isEven)), equals, [0, 2])
    },

    "treats truthy values as true and falsey values as false"() {
        const isOdd = (n: number) => n % 2
        expect(_([0, 1, 2, 3], filter(isOdd)), equals, [1, 3])
    },

    "has the correct return type"() {
        const isOdd = (n: number) => n % 2
        _([0, 1, 2, 3], filter(isOdd)) satisfies number[]

        // @ts-expect-error
        _([0, 1, 2, 3], filter(isOdd)) satisfies string[]
    },

    "narrows types given a type predicate function"() {
        const isString = (x: unknown): x is string => typeof x === "string"
        _(["a", 1, "b", 2], filter(isString)) satisfies string[]

        // @ts-expect-error
        _(["a", 1, "b", 2], filter(isString)) satisfies number[]
    },
})
