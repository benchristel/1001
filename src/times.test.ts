import {test, expect, is} from "@benchristel/taste"

test("times", {
    "multiplies two numbers"() {
        expect(times(3, 5), is, 15)
    },
})
