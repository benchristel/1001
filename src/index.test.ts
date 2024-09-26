import {test, expect, is} from "@benchristel/taste"

test("add()", {
    "adds two numbers"() {
        const result = add(1, 2)
        expect(result, is, 3)
    },
})

function add(a: number, b: number): number {
    return a + b
}

test("sum()", {
    "adds up an array of numbers"() {
        const result = sum([1, 2, 5])
        expect(result, is, 8)
    },

    "returns a lone number"() {
        const result = sum([1])
        expect(result, is, 1)
    },

    "returns 0 given empty array"() {
        const result = sum([])
        expect(result, is, 0)
    },
})

function sum(numbers: number[]): number {
    return numbers.reduce(add, 0)
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

type Curried1<A, Ret> = (
    & ((a: A) => Ret)
    & (() => Curried1<A, Ret>)
)

type Curried2<A, B, Ret> = (
    & ((a: A, b: B) => Ret)
    & ((a: A) => Curried1<B, Ret>)
    & (() => Curried2<A, B, Ret>)
)

type Curried3<A, B, C, D> = (
    & ((a: A, b: B, c: C) => D)
    & ((a: A, b: B) => Curried1<C, D>)
    & ((a: A) => Curried2<B, C, D>)
    & (() => Curried3<A, B, C, D>)
)

function curry<A, B, C>(f: (a: A, b: B) => C): Curried2<A, B, C>
function curry<A, B, C, D>(f: (a: A, b: B, c: C) => D): Curried3<A, B, C, D>
function curry(f: (...args: any[]) => any) {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs)
        } else {
            return f(...args)
        }
    }
}
