export type Result<S, F> = Success<S> | Failure<F>

export interface Success<S> {
    type: "success";
    value: S;
    mapSuccess<SOut>(f: (value: S) => SOut): Success<SOut>;
}

export interface Failure<F> {
    type: "failure";
    detail: F;
    mapSuccess<SOut>(): Failure<F>;
}

export function success<S>(value: S): Success<S> {
    return {
        type: "success",
        value,
        mapSuccess(f) {
            return success(f(value))
        },
    }
}

export function failure<F>(detail: F): Failure<F> {
    return {
        type: "failure",
        detail,
        mapSuccess() {
            return failure(detail)
        },
    }
}
