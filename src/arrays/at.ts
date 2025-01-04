type ArrayIndexer = <T>(array: T[]) => T | undefined

type Indexer0 = (
    & (<Tuple extends [any, ...any[]]>(tuple: Tuple) => Tuple[0])
    & ArrayIndexer
)

type Indexer1 = (
    & (<Tuple extends [any, any, ...any[]]>(tuple: Tuple) => Tuple[1])
    & ArrayIndexer
)

type Indexer2 = (
    & (<Tuple extends [any, any, any, ...any[]]>(tuple: Tuple) => Tuple[2])
    & ArrayIndexer
)

type Indexer3 = (
    & (<Tuple extends [any, any, any, any, ...any[]]>(tuple: Tuple) => Tuple[3])
    & ArrayIndexer
)

type Indexer4 = (
    & (<Tuple extends [any, any, any, any, any, ...any[]]>(tuple: Tuple) => Tuple[4])
    & ArrayIndexer
)

export function at(index: 0): Indexer0
export function at(index: 1): Indexer1
export function at(index: 2): Indexer2
export function at(index: 3): Indexer3
export function at(index: 4): Indexer4
export function at(index: number): ArrayIndexer
export function at(index: number): <T>(array: T[]) => T | undefined {
    return (array) => array[index]
}
