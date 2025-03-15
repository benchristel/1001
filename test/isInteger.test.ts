import {test, expect, is, debug} from "@benchristel/taste"
import {isInteger} from "../src/index.js"

test("isInteger", {
    "returns true given a positive integer"() {
        expect(isInteger(1), is, true)
    },

    "returns true given a negative integer"() {
        expect(isInteger(-1), is, true)
    },

    "returns true given zero"() {
        expect(isInteger(0), is, true)
    },

    "returns false given a decimal"() {
        expect(isInteger(0.1), is, false)
    },

    "returns false given a numeric string"() {
        expect(isInteger("0"), is, false)
    },

    "returns false given a boolean"() {
        expect(isInteger(true), is, false)
    },

    "returns false given NaN"() {
        expect(isInteger(NaN), is, false)
    },

    "returns false given Infinity"() {
        expect(isInteger(Infinity), is, false)
    },
})
