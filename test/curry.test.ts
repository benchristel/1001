import {test, expect, is} from "@benchristel/taste"
import {curry} from "../src/index.js"

test("curry", {
    "does nothing to a zero-argument function"() {
        const curriedZero = curry(() => 0)
        expect(curriedZero(), is, 0)
    },

    "does nothing to a one-argument function"() {
        const curriedIncrement = curry((n: number) => n + 1)
        expect(curriedIncrement(1), is, 2)
    },
})

const curriedConcat2 = curry((a: string, b: string) => a + b)

test("a curried two-argument function", {
    "can be passed both arguments at once"() {
        expect(curriedConcat2("a", "b"), is, "ab")
    },

    "can be passed its arguments one by one"() {
        expect(curriedConcat2("a")("b"), is, "ab")
    },

    "ignores extra arguments"() {
        expect((curriedConcat2 as any)("a", "b", "99"), is, "ab")
    },
})

const curriedAdd3 = curry((a: number, b: number, c: number) => a + b + c)

test("a curried three-argument function", {
    "can be passed all its arguments at once"() {
        expect(curriedAdd3(1, 2, 3), is, 6)
    },

    "can be passed its arguments one by one"() {
        expect(curriedAdd3(1)(2)(3), is, 6)
    },

    "can be passed its arguments in groups"() {
        expect(curriedAdd3(1, 2)(4), is, 7)
        expect(curriedAdd3(1)(3, 4), is, 8)
    },
})
