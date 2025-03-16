type Function1<A, Ret> = (a: A) => Ret

export type Result<S, F> = Success<S, F> | Failure<S, F>

(null as any as Result<true, false>) satisfies ResultLike<true, false>

export interface ResultLike<S, F> {
    isSuccess(): this is Success<S, F>;
    isFailure(): this is Failure<S, F>;
    assertSuccess(): asserts this is Success<S, F>;
    assertFailure(): asserts this is Failure<S, F>;
    mapSuccess<Out>(f: Function1<S, Out>): Result<Out, F>;
    mapFailure<Out>(f: Function1<F, Out>): Result<S, Out>;
    recover(f: Function1<F, S>): S;

    /**
     * Performs further checks on the value of a {@link Success}, possibly
     * returning a {@link Failure}.
     *
     * For those who are curious: yes, this is the monadic "bind" operation
     * from functional programming lore.
     *
     * @example
     * ```typescript
     * const result = parseIntInBase10(userInput)
     *     .mapFailure(({badValue}) => badValue + " is not an integer")
     *     .validate(x =>
     *         x <= 0
     *             ? Failure.of("Please enter a positive integer")
     *             : Success.of(x)
     *     )
     * ```
     */
    // TODO: "validate" is usually a domain-level concept, so it seems rude to
    // take that name. Maybe `flatMapSuccess`
    validate<SOut, FOut>(
        validator: Function1<S, ResultLike<SOut, FOut>>,
    ): Result<SOut, F | FOut>;

    // TODO: maybe there should be a mirror-image of validate() that lets you
    // selectively recover from some failures.
}

export class Success<S, F> implements ResultLike<S, F> {
    constructor(public readonly value: S) {}

    isSuccess(): this is Success<S, F> {
        throw new Error("Method not implemented.")
    }
    isFailure(): this is Failure<S, F> {
        throw new Error("Method not implemented.")
    }
    assertSuccess(): asserts this is Success<S, F> {
        throw new Error("Method not implemented.")
    }
    assertFailure(): asserts this is Failure<S, F> {
        throw new Error("Method not implemented.")
    }
    mapSuccess<Out>(f: Function1<S, Out>): Result<Out, F> {
        throw new Error("Method not implemented.")
    }
    mapFailure<Out>(f: Function1<F, Out>): Result<S, Out> {
        throw new Error("Method not implemented.")
    }
    recover(f: Function1<never, S>): S {
        throw new Error("Method not implemented.")
    }
    validate<SOut, FOut>(validator: Function1<S, ResultLike<SOut, FOut>>): Result<SOut, FOut> {
        throw new Error("Method not implemented.")
    }

}

export class Failure<S, F> implements ResultLike<S, F> {
    constructor(public readonly detail: F) {}

    assertSuccess(): asserts this is Success<S, F> {
        throw new Error("Method not implemented.")
    }
    assertFailure(): asserts this is Failure<S, F> {
        throw new Error("Method not implemented.")
    }
    mapSuccess<Out>(f: Function1<S, Out>): Result<Out, F> {
        throw new Error("Method not implemented.")
    }
    mapFailure<Out>(f: Function1<F, Out>): Result<S, Out> {
        throw new Error("Method not implemented.")
    }
    recover(f: Function1<F, S>): S {
        throw new Error("Method not implemented.")
    }
    validate<SOut, FOut>(validator: Function1<S, Result<SOut, FOut>>): Result<SOut, F | FOut> {
        throw new Error("Method not implemented.")
    }
    isSuccess(): this is Success<S, F> {
        return false
    }

    isFailure(): this is Failure<S, F> {
        return true
    }

    static of<F>(detail: F): Failure<never, F> {
        return new Failure(detail)
    }
}

/**
 * What information is important to include in an error report?
 * - what went wrong (error code or description of the problem)
 * - where it happened (stacktrace)
 * - inputs involved
 * - who can fix it (user or programmer)
 * - how to fix it
 *
 * The Error type represents most of these, but not in a machine-readable way.
 * Additionally, "what went wrong" can be described at many levels of
 * abstraction. It might not be clear who can fix the error except at the
 * highest level of abstraction (near the entrypoint). For example, treating
 * all errors from parseInt as "invalid input" obscures the fact that some of the
 * errors might be due to bad input from the user, while others might be caused
 * by programmer goofs.
 */

interface Problem {
    getSources(): string[];
    withSource(newSource: string): Problem;
    toError(): Error;
}

interface ErrorCause {
    getCauses: ErrorCause[];

}

interface LibraryParseFailureDetail<Input, Mode, Site extends string> {
    input: Input; // the invalid input. May be an object or tuple if more than one
    // input was involved
    mode: Mode; // how it failed, i.e. the error code
    site: Site[]; // where it failed, i.e. the stack trace
}

type ParseIntFailureDetail = LibraryParseFailureDetail<string, void, "parseInt" | "parseBase10Int">
type ParseIntResult = Result<number, ParseIntFailureDetail>

let f: ParseIntResult = null as any
//  = Failure.of({
//     input: "",
//     mode: undefined,
//     operation: "parseInt",
//     site: [""],
// })

if (f.isFailure()) {
    const x = f.detail.mode
    console.log(x)
} else {
    f.value
}

/*

const configResult = await readFile(filename)
    .then(flatMapSuccess(parseJson))
    .then(mapFailure(f => {
        let detail = f.detail.withContext("loading config")
        switch (f.mode) {
            case JSONParseError:
                return detail
                    .withMode(filename)
                    .withInput(filename)
        }
    }))

if (configResult.isFailure()) {
    const failure = configResult.detail
    switch (failure.mode) {
        case FileNotFound:
            return ConfigFileNotFound.of({path: failure.path})
        case FileNoReadPermission
            return ConfigFileNoReadPermission.of({path: failure.path})
        case JsonParseError:
            // Here's an interesting problem! How do we get the path
            // information? JsonParseError can't know about files!
            return ConfigFileJsonParseError.of({path: TODO, loc: failure.loc})
    }
}
*/
