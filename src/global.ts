declare global {
    interface Object {
        _<T, U>(this: T, f: (value: T) => U): U;
    }
}

Object.prototype._ = function<T, U>(this: T, f: (value: T) => U): U {
    return f(this)
}
