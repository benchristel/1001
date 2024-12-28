import {test, expect, is} from "@benchristel/taste"
import {curry} from "./curry.js"

test("add()", {
    "adds two numbers"() {
        const result = add(1, 2)
        expect(result, is, 3)
    },

    "is curried"() {
        const result = add(1)(2)
        expect(result, is, 3)
    },
})

const add = curry(function (a: number, b: number): number {
    return a + b
})

test("sum()", {
    "adds up an array of numbers"() {
        const result = sum([1, 2, 5])
        expect(result, is, 8)
    },

    "returns a lone number"() {
        const result = sum([1])
        expect(result, is, 1)
    },

    "returns 0 given empty array"() {
        const result = sum([])
        expect(result, is, 0)
    },
})

function sum(numbers: number[]): number {
    return numbers.reduce(add, 0)
}

