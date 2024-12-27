import {test, expect, is} from "@benchristel/taste"
import {curry} from "./curry.js"

{
    const curriedIncrement = curry((x: number) => x + 1)

    test("a curried increment() function", {
        "can be called with its argument"() {
            const result = curriedIncrement(1)
            expect(result, is, 2)
        },

        "can be called with no arguments"() {
            const result = curriedIncrement()()(1)
            expect(result, is, 2)
        },

        "has the correct return type"() {
            curriedIncrement(1) satisfies number

            // @ts-expect-error
            curriedIncrement(1) satisfies string
        },

        "has the correct argument types"() {
            // @ts-expect-error
            curriedIncrement("a")
            // @ts-expect-error
            curriedIncrement()("a")
        },
    })
}

{
    const curriedAdd = curry((a: number, b: number) => a + b)

    test("a curried add() function", {
        "can be given both arguments at once"() {
            const result = curriedAdd(1, 2)
            expect(result, is, 3)
        },

        "can be given its arguments one by one"() {
            const result = curriedAdd(1)(2)
            expect(result, is, 3)
        },

        "can be called with zero arguments"() {
            const result = curriedAdd()()(1)()()(2)
            expect(result, is, 3)
        },

        "has the correct return type"() {
            curriedAdd(1, 2) satisfies number
            curriedAdd(1)(2) satisfies number

            // @ts-expect-error
            curriedAdd(1, 2) satisfies string
            // @ts-expect-error
            curriedAdd(1)(2) satisfies string
        },

        "has the correct argument types"() {
            // @ts-expect-error
            curriedAdd("a", 2)
            // @ts-expect-error
            curriedAdd(1, "b")
            // @ts-expect-error
            curriedAdd("a")
            // @ts-expect-error
            curriedAdd(1)("b")
        },
    })
}

{
    const curriedAdd3 = curry((a: number, b: number, c: number) => a + b + c)

    test("a curried ternary add() function", {
        "can be given all 3 arguments at once"() {
            expect(curriedAdd3(1, 2, 3), is, 6)
        },

        "can be given its arguments one by one"() {
            expect(curriedAdd3(1)(2)(3), is, 6)
        },

        "can be given its arguments as (a)(b, c)"() {
            expect(curriedAdd3(1)(2, 3), is, 6)
        },

        "can be given its arguments as (a, b)(c)"() {
            expect(curriedAdd3(1, 2)(3), is, 6)
        },

        "can be called with zero arguments"() {
            const result = curriedAdd3()()(1)()()(2)()()(3)
            expect(result, is, 6)
        },

        "has the correct return type"() {
            curriedAdd3(1, 2, 3) satisfies number
            curriedAdd3(1, 2)(3) satisfies number
            curriedAdd3(1)(2, 3) satisfies number
            curriedAdd3(1)(2)(3) satisfies number

            // @ts-expect-error
            curriedAdd3(1, 2, 3) satisfies string
            // @ts-expect-error
            curriedAdd3(1, 2)(3) satisfies string
            // @ts-expect-error
            curriedAdd3(1)(2, 3) satisfies string
            // @ts-expect-error
            curriedAdd3(1)(2)(3) satisfies string
        },

        "has the correct argument types"() {
            // @ts-expect-error
            curriedAdd3("a", 2, 3)
            // @ts-expect-error
            curriedAdd3(1, "b", 3)
            // @ts-expect-error
            curriedAdd3(1, 2, "c")

            // @ts-expect-error
            curriedAdd3("a", 2)
            // @ts-expect-error
            curriedAdd3(1, "b")
            // @ts-expect-error
            curriedAdd3(1, 2)("c")

            // @ts-expect-error
            curriedAdd3("a")
            // @ts-expect-error
            curriedAdd3(1)("b", 3)
            // @ts-expect-error
            curriedAdd3(1)(2, "c")

            // @ts-expect-error
            curriedAdd3("a")(2)(3)
            // @ts-expect-error
            curriedAdd3(1)("b")(3)
            // @ts-expect-error
            curriedAdd3(1)(2)("c")
        },
    })
}
