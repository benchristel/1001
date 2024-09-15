import {plus} from "./plus.js"

export function sum(numbers: number[]): number {
    return numbers.reduce(plus, 0)
}
