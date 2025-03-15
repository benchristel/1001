import {test, expect, is} from "@benchristel/taste"
import {isRealNumber} from "../src/index.js"

test("isRealNumber", {
    "returns true given an integer"() {
        expect(isRealNumber(0), is, true)
    },

    "returns true given a decimal"() {
        expect(isRealNumber(0.1), is, true)
    },

    "returns false given a numeric string"() {
        expect(isRealNumber("0"), is, false)
    },

    "returns false given a BigInt"() {
        expect(isRealNumber(BigInt(0)), is, false)
    },

    "returns false given a boolean"() {
        expect(isRealNumber(true), is, false)
    },

    "returns false given NaN"() {
        expect(isRealNumber(NaN), is, false)
    },

    "returns false given Infinity"() {
        expect(isRealNumber(Infinity), is, false)
    },
})
