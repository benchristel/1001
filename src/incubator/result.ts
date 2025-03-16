export type Result<S, F> = Success<S> | Failure<F>

export type Success<S> = {
    type: "success";
    value: S;
}

export type Failure<F> = {
    type: "failure";
    detail: F;
}

export function success<S>(value: S): Success<S> {
    return {type: "success", value}
}

export function failure<F>(detail: F): Failure<F> {
    return {type: "failure", detail}
}
