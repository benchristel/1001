import {AnyConstructor} from "./typescript.js"

export function isInstanceOf(
    constructor: AnyConstructor,
    value: unknown,
): boolean {
    return value instanceof constructor
}
