import {test, expect, is} from "@benchristel/taste"
import {DisplayName} from "../src/index.js"

test("the display name of a function", {
    "defaults to its natural name"() {
        function naturallyNamed() {}
        expect(DisplayName.get(naturallyNamed), is, "naturallyNamed")
    },
})
