import {test, expect, is} from "@benchristel/taste"
import {isNumber} from "../src/index.js"

test("isNumber", {
    "returns true given a number"() {
        expect(isNumber(0), is, true)
    },

    "returns false given a string"() {
        expect(isNumber("0"), is, false)
    },

    "returns false given a boolean"() {
        expect(isNumber(true), is, false)
    },

    "returns true given NaN"() {
        expect(isNumber(NaN), is, true)
    },

    "returns true given Infinity"() {
        expect(isNumber(Infinity), is, true)
    },
})
