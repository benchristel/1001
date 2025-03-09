import {test, expect, is} from "@benchristel/taste"
import {DisplayName} from "../src/index.js"

test("the display name of a function", {
    "defaults to its natural name"() {
        function naturallyNamed() {}
        expect(DisplayName.get(naturallyNamed), is, "naturallyNamed")
    },

    "is the empty string, when the function is anonymous"() {
        expect(DisplayName.get(() => {}), is, "")
    },

    "can be customized via DisplayName.set()"() {
        function naturallyNamed() {}

        DisplayName.set("custom", naturallyNamed)

        expect(DisplayName.get(naturallyNamed), is, "custom")
    },
})

test("the display name of a class", {
    "defaults to its natural name"() {
        class NaturallyNamed {}
        expect(DisplayName.get(NaturallyNamed), is, "NaturallyNamed")
    },

    "is the empty string, when the class is anonymous"() {
        expect(DisplayName.get(class {}), is, "")
    },

    "can be customized via DisplayName.set()"() {
        class NaturallyNamed {}

        DisplayName.set("custom", NaturallyNamed)

        expect(DisplayName.get(NaturallyNamed), is, "custom")
    },
})

test("the display name of a plain object", {
    "defaults to `undefined`"() {
        expect(DisplayName.get({}), is, undefined)
    },

    "can be customized"() {
        const obj = {}

        DisplayName.set("custom", obj)

        expect(DisplayName.get(obj), is, "custom")
    },

    "is unique to each object instance"() {
        const obj1 = DisplayName.set("one", {})
        const obj2 = DisplayName.set("two", {})
        expect(DisplayName.get(obj1), is, "one")
        expect(DisplayName.get(obj2), is, "two")
    },
})

test("DisplayName.inheritFrom", {
    "copies the display name from one object to another"() {
        const original = DisplayName.set("the name", {})
        const inheritor = {}

        DisplayName.inheritFrom(original, inheritor)

        expect(DisplayName.get(inheritor), is, "the name")
    },
})
