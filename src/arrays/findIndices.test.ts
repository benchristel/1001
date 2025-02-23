import {test, expect, equals} from "@benchristel/taste"
import {findIndices} from "./findIndices.js"
import {curry} from "../curry.js"

test("findIndices", {
    "doesn't find anything in an empty array"() {
        expect([...findIndices(() => true, [])], equals, [])
    },

    "finds elements matching a predicate"() {
        const greaterThan = curry((a: number, b: number) => b > a)
        const result = [...findIndices(greaterThan(3), [1, 5, 3, 2, 10])]
        expect(result, equals, [1, 4])
    },
})
