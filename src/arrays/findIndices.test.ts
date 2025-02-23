import {test, expect, equals, is} from "@benchristel/taste"
import {findIndices} from "./findIndices.js"
import {curry} from "../curry.js"

const greaterThan = curry((a: number, b: number) => b > a)

test("findIndices", {
    "doesn't find anything in an empty array"() {
        expect([...findIndices(() => true, [])], equals, [])
    },

    "finds elements matching a predicate"() {
        const result = [...findIndices(greaterThan(3), [1, 5, 3, 2, 10])]
        expect(result, equals, [1, 4])
    },

    "is curried"() {
        const findPositive = findIndices(greaterThan(0))
        expect([...findPositive([0, 1, -1, 2])], equals, [1, 3])
    },

    "is lazy"() {
        const foundIndices = []
        let calls = 0
        function spyPredicate() {
            calls++
            return true
        }

        for (const index of findIndices(spyPredicate, [1, 2, 3])) {
            foundIndices.push(index)
            break
        }

        expect(foundIndices, equals, [0])
        expect(calls, is, 1)
    },
})
