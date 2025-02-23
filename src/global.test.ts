import {test, expect, equals, not} from "@benchristel/taste"
import {map} from "./arrays/map.js"
import "./global.js"
import {errorThrownFrom} from "./errorThrownFrom.js"
import {isInstanceOf} from "./isInstanceOf.js"
import {includes} from "./arrays/includes.js"

test("Object._()", {
    "passes the receiving object to the given function"() {
        const double = (x: number) => x * 2
        const result = [1, 2, 3]._(map(double))
        expect(result, equals, [2, 4, 6])
    },

    "can't be unbound"() {
        const _ = ({foo: 1})._
        function callUnbound() {
            _((object) => {
                // @ts-expect-error - property 'foo' does not exist on type
                // 'void'
                object.foo
            })
        }

        expect(errorThrownFrom(callUnbound), isInstanceOf, TypeError)
    },

    "isn't enumerable"() {
        expect(Object.keys({}), not(includes("_")))
    },
})
