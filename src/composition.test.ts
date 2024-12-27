import {test, expect, is} from "@benchristel/taste"
import {_, startWith} from "./composition.js"

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

test("startWith", {
    "wraps and unwraps a value"() {
        expect(startWith(42).value, is, 42)
    },

    "pipes a value through a function"() {
        const increment = (x: number) => x + 1
        expect(startWith(1).and(increment).value, is, 2)
    },

    "constructs typesafe pipelines of arbitrary length"() {
        const stringToNumber = (s: string) => +s
        const numberToString = (x: number) => String(x)
        const increment = (x: number) => x + 1
        const concat1 = (s: string) => s + "1"
        const value = startWith("0")
            .and(stringToNumber)
            .and(increment)
            .and(numberToString)
            .and(concat1)
            .and(stringToNumber)
            .and(increment)
            .and(numberToString)
            .and(concat1)
            .value
        expect(value, is, "121")
    },

    "has the correct return type"() {
        startWith(42).value satisfies number

        // @ts-expect-error
        startWith(42).value satisfies string
    },
})
