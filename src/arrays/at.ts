type ArrayIndexer = <T>(array: T[]) => T | undefined

type Indexer0 = <A extends readonly any[]>(array: A) =>
A extends readonly [any, ...any[]]
    ? A[0]
    : A[number] | undefined

type Indexer1 = <A extends readonly any[]>(array: A) =>
A extends readonly [any, any, ...any[]]
    ? A[1]
    : A[number] | undefined

type Indexer2 = <A extends readonly any[]>(array: A) =>
A extends readonly [any, any, any, ...any[]]
    ? A[2]
    : A[number] | undefined

type Indexer3 = <A extends readonly any[]>(array: A) =>
A extends readonly [any, any, any, ...any[]]
    ? A[3]
    : A[number] | undefined

type Indexer4 = <A extends readonly any[]>(array: A) =>
A extends readonly [any, any, any, any, ...any[]]
    ? A[4]
    : A[number] | undefined

export function at(index: 0): Indexer0
export function at(index: 1): Indexer1
export function at(index: 2): Indexer2
export function at(index: 3): Indexer3
export function at(index: 4): Indexer4
export function at(index: number): ArrayIndexer
export function at(index: number): <T>(array: T[]) => T | undefined {
    return (array) => array[index]
}
