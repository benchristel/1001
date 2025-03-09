import {test, expect, is} from "@benchristel/taste"
import {naturalNameOf, DisplayName} from "../src/index.js"

test("naturalNameOf", {
    "returns the `name` of a function"() {
        function stephen() {}
        expect(naturalNameOf(stephen), is, "stephen")
    },

    "returns the `name` of a class"() {
        class Stephen {}
        expect(naturalNameOf(Stephen), is, "Stephen")
    },

    "returns the empty string given an anonymous function"() {
        expect(naturalNameOf(() => {}), is, "")
    },

    "returns undefined given a nameless object"() {
        expect(naturalNameOf({}), is, undefined)
    },

    "is unaffected by display names"() {
        function stephen() {}
        DisplayName.set("phteven", stephen)
        expect(naturalNameOf(stephen), is, "stephen")
    },
})
