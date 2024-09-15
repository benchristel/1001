import {test, expect, is} from "@benchristel/taste"
import {times} from "./times.js"

test("times", {
    "multiplies two numbers"() {
        expect(times(3, 5), is, 15)
    },
})
