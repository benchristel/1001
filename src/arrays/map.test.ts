import {test, expect, equals} from "@benchristel/taste"
import {map} from "./map.js"

test("map", {
    "transforms each array element"() {
        const increment = (x: number) => x + 1
        expect(map(increment)([0, 1, 2]), equals, [1, 2, 3])
    },

    "does not pass the array index to the callback"() {
        expect(map(parseInt)(["10", "10", "10"]), equals, [10, 10, 10])
    },
})
