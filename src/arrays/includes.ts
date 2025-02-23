export function includes<T>(elem: T): (array: T[]) => boolean {
    return (array) => array.includes(elem)
}
