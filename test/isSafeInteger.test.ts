import {test, expect, is} from "@benchristel/taste"
import {isSafeInteger} from "../src/index.js"

const maxSafeInteger = 2 ** 53 - 1

test("isSafeInteger", {
    "returns true given a positive integer"() {
        expect(isSafeInteger(1), is, true)
    },

    "returns true given a negative integer"() {
        expect(isSafeInteger(-1), is, true)
    },

    "returns true given zero"() {
        expect(isSafeInteger(0), is, true)
    },

    "returns true given 2^53 - 1"() {
        expect(isSafeInteger(2 ** 53 - 1), is, true)
    },

    "returns false given 2^53"() {
        expect(isSafeInteger(2 ** 53), is, false)
    },

    "returns true given -(2^53 - 1)"() {
        expect(isSafeInteger(-(2 ** 53 - 1)), is, true)
    },

    "returns true given -(2^53)"() {
        expect(isSafeInteger(-(2 ** 53)), is, false)
    },

    "returns false given a decimal"() {
        expect(isSafeInteger(0.1), is, false)
    },

    "returns false given a numeric string"() {
        expect(isSafeInteger("0"), is, false)
    },

    "returns false given a boolean"() {
        expect(isSafeInteger(true), is, false)
    },

    "returns false given NaN"() {
        expect(isSafeInteger(NaN), is, false)
    },

    "returns false given Infinity"() {
        expect(isSafeInteger(Infinity), is, false)
    },
})
