import {test, expect, is} from "@benchristel/taste"
import {sum} from "./sum.js"

test("sum", {
    "returns zero given an empty array"() {
        expect(sum([]), is, 0)
    },

    "returns a solitary number"() {
        expect(sum([42]), is, 42)
    },
})
