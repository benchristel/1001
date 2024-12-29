import {test, expect, equals} from "@benchristel/taste"
import {indicesOf} from "./indicesOf.js"

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

    "finds overlapping occurrences of `needle`"() {
        expect([...indicesOf("aaa", "aaaa")], equals, [0, 1])
    },

    "finds non-overlapping occurrences"() {
        const needle = "cal"
        const haystack = "Electrical calculator"
        expect([...indicesOf(needle, haystack)], equals, [7, 11])
    },

    "finds multi-bytepair UTF-16 characters"() {
        expect([...indicesOf("🥬", "🥬🥬🥬")], equals, [0, 2, 4])
    },
})
