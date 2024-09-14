import {test, expect, is} from "@benchristel/taste"
import {plus} from "./plus.js"

test("plus", {
    "adds two numbers"() {
        expect(plus(1, 2), is, 3)
    },

    "concatenates two strings"() {
        expect(plus("foo", "bar"), is, "foobar")
    },
})
