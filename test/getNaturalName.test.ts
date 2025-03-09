import {test, expect, is} from "@benchristel/taste"
import {getNaturalName, DisplayName} from "../src/index.js"

test("getNaturalName", {
    "returns the `name` of a function"() {
        function stephen() {}
        expect(getNaturalName(stephen), is, "stephen")
    },

    "returns the `name` of a class"() {
        class Stephen {}
        expect(getNaturalName(Stephen), is, "Stephen")
    },

    "returns the `description` of a symbol"() {
        const symbol = Symbol("ism")
        expect(getNaturalName(symbol), is, "ism")
    },

    "is unaffected by display names"() {
        function stephen() {}
        DisplayName.set("phteven", stephen)
        expect(getNaturalName(stephen), is, "stephen")
    },
})
