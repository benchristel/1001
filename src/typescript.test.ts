import type {PlainObject} from "./typescript.js"

/*
 * PlainObject type tests
 */

// `PlainObject`s can have any keys.
;({foo: "bar", baz: 1}) satisfies PlainObject
;({1: 2}) satisfies PlainObject
;({}) satisfies PlainObject

// `null` is not a `PlainObject`.
// @ts-expect-error
null satisfies PlainObject

// Arrays are not `PlainObject`s.
// @ts-expect-error
;[] satisfies PlainObject

// Strings are not `PlainObject`s.
// @ts-expect-error
"" satisfies PlainObject

// RegExps are not `PlainObject`s.
// @ts-expect-error
;/a/ satisfies PlainObject

// Class instances are not `PlainObject`s.
class Dummy {}
// @ts-expect-error
new Dummy() satisfies PlainObject
