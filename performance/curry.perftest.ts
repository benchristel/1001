import {test, debug} from "@benchristel/taste"
import { curry } from "../src/index.js"

const add3 = (a: number, b: number, c: number) => a + b + c
const curried = curry(add3)
const handCurried = (a: number) => (b: number) => (c: number) => a + b + c

test("curry versus curryPretty:", {
    "warmup"() {
        benchmark(() => curried(1)(2)(3), 10_000)
        benchmark(() => curried(1, 2, 3), 10_000)
        benchmark(() => handCurried(1)(2)(3), 10_000)
    },

    "calling a curry()d function 1M times"() {
        benchmark(() => curried(1)(2)(3), 1_000_000)
    },

    "calling a hand-curried function 1M times"() {
        benchmark(() => handCurried(1)(2)(3), 1_000_000)
    },

    "calling the last application of a curry()d function 1M times"() {
        const f = curried(1)(2)
        benchmark(() => f(3), 1_000_000)
    },

    "passing all arguments to a curry()d function 1M times"() {
        benchmark(() => curried(1, 2, 3), 1_000_000)
    },

    "calling the last application of a hand-curried function 1M times"() {
        const f = handCurried(1)(2)
        benchmark(() => f(3), 1_000_000)
    },

    "calling a plain function 1M times"() {
        benchmark(() => 1 + 2 + 3, 1_000_000)
    }
})

function benchmark(f: any, reps: number) {    
    const t0 = +new Date()
    for (let i = 0; i < reps; i++) {
        f()
    }
    const t1 = +new Date()
    debug(`${t1 - t0} ms`)
}