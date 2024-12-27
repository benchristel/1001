import {test, expect, not} from "@benchristel/taste"
import {isPlainObject} from "./objects.js"

test("isPlainObject()", {
    "is false for an array"() {
        expect([], not(isPlainObject))
    },

    "is true for an object created via a literal"() {
        expect({}, isPlainObject)
    },

    "is true for an object with null prototype"() {
        const object = Object.create(null)
        expect(object, isPlainObject)
    },

    "is false for a class instance"() {
        const object = new(class {})()
        expect(object, not(isPlainObject))
    },

    "is false for null"() {
        expect(null, not(isPlainObject))
    },

    "is false for undefined"() {
        expect(undefined, not(isPlainObject))
    },

    "is false for a boolean"() {
        expect(true, not(isPlainObject))
    },

    "is true for a plain object with its own constructor property"() {
        const object = {constructor: "bork"}
        expect(object, isPlainObject)
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
