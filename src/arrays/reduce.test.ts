import {test, expect, is, equals} from "@benchristel/taste"
import {_} from "../composition.js"
import {reduce} from "./reduce.js"

const plus = (a: number, b: number) => a + b

test("reduce", {
    "returns the initial state given an empty array"() {
        expect(_([], reduce(plus, 42)), is, 42)
    },

    "combines the initial state with a lone array element"() {
        expect(_([3], reduce(plus, 7)), is, 10)
    },

    "combines multiple array elements"() {
        expect(_([1, 2, 3], reduce(plus, 7)), is, 13)
    },

    "passes only two arguments to the callback"() {
        let received
        function spy(...args: any[]) {
            received = args
        }
        _([1], reduce(spy, 0))
        expect(received, equals, [0, 1])
    },

    "can handle a state with a different type from the array elements"() {
        function intoObject(obj: Record<number, number>, n: number) {
            return {
                ...obj,
                [n]: n,
            }
        }

        const result = _([1, 2, 3], reduce(intoObject, {}))
        expect(result, equals, {1: 1, 2: 2, 3: 3})
    },
})
