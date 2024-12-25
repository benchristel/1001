import {test, expect, equals} from "@benchristel/taste"
import {indicesOf, nonOverlappingIndicesOf} from "./strings.js"

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
})

test("nonOverlappingIndicesOf()", {
    "finds an empty string in an empty string"() {
        expect([...nonOverlappingIndicesOf("", "")], equals, [0])
    },

    "finds an empty string at each position"() {
        expect([...nonOverlappingIndicesOf("", "123")], equals, [0, 1, 2, 3])
    },

    "returns an empty array if `needle` is not in `haystack`"() {
        expect([...nonOverlappingIndicesOf("a", "")], equals, [])
    },

    "doesn't find overlapping occurrences of `needle`"() {
        expect([...nonOverlappingIndicesOf("aaa", "aaaa")], equals, [0])
    },

    "finds repeated occurrences of a one-character string"() {
        expect([...nonOverlappingIndicesOf("a", "aaa")], equals, [0, 1, 2])
    },

    "finds non-overlapping occurrences of a multi-character string"() {
        const needle = "abc"
        const haystack = "abcabc"
        expect([...nonOverlappingIndicesOf(needle, haystack)], equals, [0, 3])
    },

    "finds non-adjacent non-overlapping occurrences"() {
        const needle = "abc"
        const haystack = "-abc-abc-"
        expect([...nonOverlappingIndicesOf(needle, haystack)], equals, [1, 5])
    },
})
