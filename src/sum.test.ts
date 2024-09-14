import {test, expect, is} from "@benchristel/taste"

test("sum", {
    "returns zero given an empty array"() {
        expect(sum([]), is, 0)
    },
})
