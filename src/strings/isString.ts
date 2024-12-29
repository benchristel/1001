/**
 * Checks whether a value is a string.
 *
 * @returns true if the given `value` is a string, and false otherwise.
 */
export function isString(value: unknown): value is string {
    return typeof value === "string"
}
