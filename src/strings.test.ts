import {test, expect, equals} from "@benchristel/taste"
import {indicesOf} from "./strings.js"

test("indicesOf", {
    "finds an empty string in an empty string"() {
        expect([...indicesOf("", "")], equals, [0])
    },

    "finds an empty string at each position"() {
        expect([...indicesOf("", "123")], equals, [0, 1, 2, 3])
    },

    "returns an empty array if `needle` is not in `haystack`"() {
        expect([...indicesOf("a", "")], equals, [])
    },
})
