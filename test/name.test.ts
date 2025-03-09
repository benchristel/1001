import {test, expect, is} from "@benchristel/taste"
import {DisplayName, name} from "../src/index.js"

test("name", {
    "sets the display name of a function"() {
        function jamesBond() {}
        name("007")(jamesBond)
        expect(DisplayName.get(jamesBond), is, "007")
    },
})
