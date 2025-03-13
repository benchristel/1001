import {test, expect, is} from "@benchristel/taste"
import {getDisplayName} from "../src/index.js"

test("getDisplayName", {
    "returns the function's `displayName`"() {
        function foo() {}
        foo.displayName = "the display name"

        expect(getDisplayName(foo), is, "the display name")
    },

    "falls back to `name` if `displayName` is undefined"() {
        function named() {}
        expect(getDisplayName(named), is, "named")
    },

    "falls back to `name` if `displayName` is null"() {
        function named() {}
        named.displayName = null

        expect(getDisplayName(named), is, "named")
    },

    "falls back to `name` if `displayName` is empty"() {
        function named() {}
        named.displayName = ""

        expect(getDisplayName(named), is, "named")
    },
})
