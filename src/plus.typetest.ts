import {plus} from "./plus.js"

plus(1, 1) satisfies number
plus("a", "a") satisfies string

// @ts-expect-error
plus(true, true)
