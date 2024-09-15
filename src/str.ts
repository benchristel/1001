import {plus} from "./plus.js"

export function str(strings: string[]): string {
    return strings.reduce(plus, "")
}
