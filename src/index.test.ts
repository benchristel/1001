import {test, expect, is} from "@benchristel/taste"

test("add()", {
    "adds two numbers"() {
        const result = add(1, 2)
        expect(result, is, 3)
    },

    "is curried"() {
        const result = add(1)(2)
        expect(result, is, 3)
    },
})

const add = curry(function (a: number, b: number): number {
    return a + b
})

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

type Curried1<A, Ret> = (
    & ((a: A) => Ret)
    & (() => Curried1<A, Ret>)
)

type Curried2<A, B, Ret> = (
    & ((a: A, b: B) => Ret)
    & ((a: A) => Curried1<B, Ret>)
    & (() => Curried2<A, B, Ret>)
)

type Curried3<A, B, C, Ret> = (
    & ((a: A, b: B, c: C) => Ret)
    & ((a: A, b: B) => Curried1<C, Ret>)
    & ((a: A) => Curried2<B, C, Ret>)
    & (() => Curried3<A, B, C, Ret>)
)

function curry<A, Ret>(f: (a: A) => Ret): Curried1<A, Ret>
function curry<A, B, Ret>(f: (a: A, b: B) => Ret): Curried2<A, B, Ret>
function curry<A, B, C, Ret>(f: (a: A, b: B, c: C) => Ret): Curried3<A, B, C, Ret>
function curry(f: (...args: any[]) => any) {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs)
        } else {
            return f(...args)
        }
    }
}

const isArray = Array.isArray

test("isArray()", {
    "is true for an array"() {
        expect(isArray([]), is, true)
    },

    "is false for a string"() {
        expect(isArray(""), is, false)
    },

    "is false for an object"() {
        expect(isArray({}), is, false)
    },

    "is false for `arguments`"() {
        expect(isArray(arguments), is, false)
    },

    "is false for a typed array"() {
        expect(isArray(new Uint8Array()), is, false)
    },

    "is false for null"() {
        expect(isArray(null), is, false)
    },

    "narrows types"() {
        let x: unknown = []
        // @ts-expect-error
        x[0]
        if (isArray(x)) {
            // no type error here
            x[0]
        }
    },
})

type UnknownObject = Record<keyof any, unknown>

function isPlainObject(x: unknown): x is UnknownObject {
    if (x == null) return false
    const prototype = Object.getPrototypeOf(x)
    return prototype === null || prototype === Object.prototype
}

test("isPlainObject()", {
    "is false for an array"() {
        expect(isPlainObject([]), is, false)
    },

    "is true for an object created via a literal"() {
        expect(isPlainObject({}), is, true)
    },

    "is true for an object with null prototype"() {
        const object = Object.create(null)
        expect(isPlainObject(object), is, true)
    },

    "is false for a class instance"() {
        const object = new(class {})()
        expect(isPlainObject(object), is, false)
    },

    "is false for null"() {
        expect(isPlainObject(null), is, false)
    },

    "is false for undefined"() {
        expect(isPlainObject(undefined), is, false)
    },

    "is false for a boolean"() {
        expect(isPlainObject(true), is, false)
    },

    "is true for a plain object with its own constructor property"() {
        const object = {constructor: "bork"}
        expect(isPlainObject(object), is, true)
    },

    "narrows types"() {
        let x: unknown = {}
        // @ts-expect-error
        "foo" in x
        if (isPlainObject(x)) {
            "foo" in x
        }
    },

    "types properties as unknown"() {
        // Ensures that the return type of isPlainObject is not just
        // `x is Object`, which would not allow property access.
        let x: unknown = {}
        if (isPlainObject(x)) {
            x.foo satisfies unknown
            // @ts-expect-error
            x.foo satisfies string
        }
    },
})