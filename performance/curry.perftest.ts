import {test, debug} from "@benchristel/taste"
import { curry } from "../src/index.js"

const add3 = (a: number, b: number, c: number) => a + b + c
const add4 = (a: number, b: number, c: number, d: number) => b + c + d
const curriedAdd3 = curry(add3)
const curriedAdd4 = curry(add4)
const handCurriedAdd3 = (a: number) => (b: number) => (c: number) => a + b + c

const curriedAdd3Partial = curriedAdd3(1, 2)
const curriedAdd4Partial = curriedAdd4(1, 2, 3)
const handCurriedAdd3Partial = handCurriedAdd3(1)(2)

test("curry:", {
    "warmup"() {
        benchmark(() => add3(1, 2, 3), 10_000)
        benchmark(() => curriedAdd3(1, 2, 3), 10_000)
        benchmark(() => curriedAdd3Partial(3), 10_000)
        benchmark(() => curriedAdd4(1, 2, 3, 4), 10_000)
        benchmark(() => curriedAdd4Partial(4), 10_000)
        benchmark(() => handCurriedAdd3Partial(3), 10_000)
    },

    "passing the last argument to a curry()d function 10M times"() {
        benchmark(() => curriedAdd3Partial(3), 10_000_000)
    },

    "passing the last argument to a hand-curried function 10M times"() {
        benchmark(() => handCurriedAdd3Partial(3), 10_000_000)
    },

    "passing the last argument to an unoptimized 4-argument curried function 10M times"() {
        benchmark(() => curriedAdd4Partial(4), 10_000_000)
    },

    "passing all arguments to a curry()d function 10M times"() {
        benchmark(() => curriedAdd3(1, 2, 3), 10_000_000)
    },

    "passing all arguments to a hand-curried function 10M times"() {
        benchmark(() => handCurriedAdd3(1)(2)(3), 10_000_000)
    },

    "passing all arguments to an unoptimized 4-argument curried function 10M times"() {
        benchmark(() => curriedAdd4(1, 2, 3, 4), 10_000_000)
    },

    "calling a plain function 10M times"() {
        benchmark(() => add3(1, 2, 3), 10_000_000)
    },
})

function benchmark(f: any, reps: number) {    
    const t0 = +new Date()
    for (let i = 0; i < reps; i++) {
        f()
    }
    const t1 = +new Date()
    debug(`${t1 - t0} ms`)
}