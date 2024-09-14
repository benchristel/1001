import {test, expect, is} from "@benchristel/taste"

test("plus", {
    "adds two numbers"() {
        expect(plus(1, 2), is, 3)
    },
})
