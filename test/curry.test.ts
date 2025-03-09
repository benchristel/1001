import {test, expect, is} from "@benchristel/taste"
import {curry, DisplayName, name} from "../src/index.js"

test("curry", {
    "does nothing to a zero-argument function"() {
        const curriedZero = curry(() => 0)
        expect(curriedZero(), is, 0)
    },

    "does nothing to a one-argument function"() {
        const curriedIncrement = curry((n: number) => n + 1)
        expect(curriedIncrement(1), is, 2)
    },

    "preserves the name of the original function"() {
        function named() {}
        const curried = curry(named)
        expect(DisplayName.get(curried), is, "named")
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

test("a partial application of a curried function", {
    "retains the name of the original function"() {
        function add(a: number, b: number) {
            return a + b
        }
        const add1 = curry(add)(1)
        expect(DisplayName.get(add1), is, "add")
    },

    "retains a name given to the curried function"() {
        const add = name("add")(curry((a: number, b: number) => a + b))
        expect(DisplayName.get(add(1)), is, "add")
    },
})
