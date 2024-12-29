import {test, expect, equals} from "@benchristel/taste"
import {filter} from "./filter.js"
import {_} from "../composition.js"

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
