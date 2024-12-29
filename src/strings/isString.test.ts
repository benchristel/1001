import {test, expect, not} from "@benchristel/taste"
import {isString} from "./isString.js"

test("isString", {
    "recognizes a string"() {
        expect("", isString)
    },

    "rejects an array"() {
        expect([], not(isString))
    },
})
