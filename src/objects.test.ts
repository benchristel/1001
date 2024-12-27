import {test, expect, is} from "@benchristel/taste"
import {isPlainObject} from "./objects.js"

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
