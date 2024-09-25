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

test("the result of curry()", {
    "can be called with all its arguments"() {
        const result: number = curry(add)(1, 2)
        expect(result, is, 3)
    },

    "can be passed two arguments one by one"() {
        expect(curry(add)(1)(2), is, 3)
    },

    "can be passed three arguments one by one"() {
        const add3 = (a: number, b: number, c: number) => a + b + c
        expect(curry(add3)(1)(2)(3), is, 6)
    },

    "can be passed three arguments as (a)(b, c)"() {
        const add3 = (a: number, b: number, c: number) => a + b + c
        const result: number = curry(add3)(1)(2, 3)
        expect(result, is, 6)
    },

    "can be passed three arguments as (a, b)(c)"() {
        const add3 = (a: number, b: number, c: number) => a + b + c
        const result: number = curry(add3)(1, 2)(3)
        expect(result, is, 6)
    },
})

function curry(f: (...args: any[]) => any) {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs)
        } else {
            return f(...args)
        }
    }
}
