export type Result<S, F> = Success<S> | Failure<F>

export class Success<S> {
    public readonly type = "success"

    constructor(public readonly value: S) {}

    isSuccess(): this is Success<S> {
        return true
    }

    mapSuccess<SOut>(f: (value: S) => SOut): Success<SOut> {
        return success(f(this.value))
    }
}

type UnusedCallback = (...args: any[]) => unknown

export class Failure<F> {
    public readonly type = "failure"

    constructor(public readonly detail: F) {}

    isSuccess(): this is Success<never> {
        return false
    }

    mapSuccess(_: UnusedCallback): Failure<F> {
        return this
    }
}

export function success<S>(value: S): Success<S> {
    return new Success(value)
}

export function failure<F>(detail: F): Failure<F> {
    return new Failure(detail)
}

export function flatMapSuccess<SIn, FIn, SOut, FOut>(
    f: (value: SIn) => Result<SOut, FOut>,
): (r: Result<SIn, FIn>) => Result<SOut, FIn | FOut> {
    return (r) => r.isSuccess() ? f(r.value) : r
}

export function mapFailure<S, FIn, FOut>(
    f: (detail: FIn) => FOut,
): (r: Result<S, FIn>) => Result<S, FOut> {
    return (r) => r.isSuccess() ? r : failure(f(r.detail))
}

export function assertSuccess<S, F>(
    result: Result<S, F>,
): asserts result is Success<S> {
    if (!result.isSuccess()) {
        throw new Error("Assertion failed: expected a Success, but got a Failure")
    }
}

export function assertFailure<S, F>(
    result: Result<S, F>,
): asserts result is Failure<F> {
    if (result.isSuccess()) {
        throw new Error("Assertion failed: expected a Failure, but got a Success")
    }
}
