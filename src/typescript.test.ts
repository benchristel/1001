import type {UnknownObject} from "./typescript.js"

// `UnknownObject`s can have any keys.
;({foo: "bar", baz: 1}) satisfies UnknownObject
;({1: 2}) satisfies UnknownObject
;({}) satisfies UnknownObject

// `null` is not an `UnknownObject`.
// @ts-expect-error
null satisfies UnknownObject

// Arrays are not `UnknownObject`s.
// @ts-expect-error
;[] satisfies UnknownObject

// Strings are not `UnknownObject`s.
// @ts-expect-error
"" satisfies UnknownObject

// RegExps are not `UnknownObject`s.
// @ts-expect-error
;/a/ satisfies UnknownObject

// Class instances are not `UnknownObject`s.
class Dummy {}
// @ts-expect-error
new Dummy() satisfies UnknownObject
