export function reduce<S, T>(
    combine: (state: S, element: T) => S,
    initialState: S,
): (array: T[]) => S {
    return (array) => array.reduce(
        (state, elem) => combine(state, elem),
        initialState,
    )
}
