import {test, expect, is} from "@benchristel/taste"
import {curry} from "./curry.js"
import {UnknownObject} from "./typescript.js"

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
