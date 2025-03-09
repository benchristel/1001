import {test, expect, is} from "@benchristel/taste"
import {isString} from "../src/index.js"

test("isString", {
    "returns true given a string"() {
        expect(isString("ok"), is, true)
    },

    "returns false given a non-string"() {
        expect(isString(99), is, false)
    },
})
