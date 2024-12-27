import {test, expect, is, not} from "@benchristel/taste"
import {isPlainObject, prop} from "./objects.js"

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

test("prop", {
    "retrieves a property from an object"() {
        const object = {foo: 42}
        expect(prop("foo")(object), is, 42)
    },

    "retrieves the length of an array"() {
        const array: never[] = []
        expect(prop("length")(array), is, 0)
    },

    "retrieves the length of a string"() {
        const string = "abc"
        expect(prop("length")(string), is, 3)
    },

    "returns a correctly-typed value"() {
        const object = {foo: 42}
        prop("foo")(object) satisfies number

        // @ts-expect-error
        prop("foo")(object) satisfies string
    },

    "forbids unsound access"() {
        const object = {foo: 42}
        // @ts-expect-error
        prop("bar")(object)
    },
})
