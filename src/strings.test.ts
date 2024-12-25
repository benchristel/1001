import {test, expect, equals} from "@benchristel/taste"
import {indicesOf} from "./strings.js"

test("indicesOf", {
    "finds an empty string in an empty string"() {
        const needle = ""
        const haystack = ""
        const expected: number[] = [0]
        const result = [...indicesOf(needle, haystack)]
        expect(result, equals, expected)
    },
})
