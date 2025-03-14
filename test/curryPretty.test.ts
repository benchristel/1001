import {test, expect, is} from "@benchristel/taste"
import {curryPretty, getDisplayName} from "../src/index.js"

test("curryPretty", {
    "has no effect on the behavior of a zero-argument function"() {
        const curriedZero = curryPretty("zero", () => 0)
        expect(curriedZero(), is, 0)
    },

    "has no effect on the behavior of a one-argument function"() {
        const curriedIncrement = curryPretty("increment", (n: number) => n + 1)
        expect(curriedIncrement(1), is, 2)
    },

    "gives the returned function a displayName"() {
        const curriedZero = curryPretty("zero", () => 0)
        expect(getDisplayName(curriedZero), is, "zero")
    },
})

const curriedConcat3 = curryPretty(
    "concat3",
    (a: string, b: string, c: string) => a + b + c,
)

test("a function curried by curryPretty", {
    "can be passed all its arguments at once"() {
        expect(curriedConcat3("a", "b", "c"), is, "abc")
    },

    "can be passed its arguments one by one"() {
        expect(curriedConcat3("a")("b")("c"), is, "abc")
    },

    "can be passed its arguments in groups"() {
        expect(curriedConcat3("a", "b")("c"), is, "abc")
        expect(curriedConcat3("x")("y", "z"), is, "xyz")
    },

    "bequeaths its name on its partial applications"() {
        expect(getDisplayName(curriedConcat3("a")), is, "concat3")
    },
})
