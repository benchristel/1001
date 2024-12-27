import {test, expect, is} from "@benchristel/taste"
import {_} from "./composition.js"

test("_ pipelining function", {
    "returns a lone argument"() {
        expect(_(1), is, 1)
    },

    "applies one function"() {
        const inc = (x: number) => x + 1
        expect(_(1, inc), is, 2)
    },

    "applies multiple functions"() {
        const inc = (x: number) => x + 1
        expect(_(1, inc, inc, inc), is, 4)
    },

    "typechecks the joints"() {
        const numberToString = (x: number) => String(x)
        const stringToNumber = (s: string) => +s
        expect(_(1, numberToString, stringToNumber), is, 1)

        // @ts-expect-error
        _(1, stringToNumber)
        // @ts-expect-error
        _(1, numberToString, numberToString)
    },

    "has the correct return type"() {
        _(1, String) satisfies string

        // @ts-expect-error
        _(1, String) satisfies number
    },
})
