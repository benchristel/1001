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
    })
}

function curry(f: (...args: any[]) => any) {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs)
        } else {
            return f(...args)
        }
    }
}
