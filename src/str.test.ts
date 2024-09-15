import {test, expect, is} from "@benchristel/taste"

test("str", {
    "returns empty string given an empty array"() {
        expect(str([]), is, "")
    },

    "returns a solitary string"() {
        expect(str(["foo"]), is, "foo")
    },

    "concatenates multiple strings"() {
        expect(str(["foo", "bar", "baz"]), is, "foobarbaz")
    },
})
