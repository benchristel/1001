// This dummy export is just to make TypeScript happy, as described here:
// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {}

declare global {
    interface Object {
        _<T, U>(this: T, f: (value: T) => U): U;
    }
}

Object.prototype._ = function<T, U>(this: T, f: (value: T) => U): U {
    return f(this)
}
