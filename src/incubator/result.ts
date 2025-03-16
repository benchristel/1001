export type Result<S, F> = Success<S> | Failure<F>

export interface Success<S> {
    type: "success";
    value: S;
    isSuccess(): this is Success<S>;
    mapSuccess<SOut>(f: (value: S) => SOut): Success<SOut>;
}

export interface Failure<F> {
    type: "failure";
    detail: F;
    isSuccess(): this is Success<never>;
    mapSuccess<SOut>(_: unknown): Failure<F>;
}

export function success<S>(value: S): Success<S> {
    return {
        type: "success",
        value,
        isSuccess(): this is Success<S> {
            return true
        },
        mapSuccess(f) {
            return success(f(value))
        },
    }
}

export function failure<F>(detail: F): Failure<F> {
    return {
        type: "failure",
        detail,
        isSuccess(): this is Success<never> {
            return false
        },
        mapSuccess(_: unknown) {
            return failure(detail)
        },
    }
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
