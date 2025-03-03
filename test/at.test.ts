import {test, expect, is} from "@benchristel/taste"
import {_, at} from "../src/index.js"

test("at()", {
    "returns the array element at the specified index"() {
        expect(_([42], at(0)), is, 42)
        expect(_([3, 76], at(1)), is, 76)
    },
})
