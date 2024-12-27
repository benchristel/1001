type Curried1<A, Ret> = (
    & ((a: A) => Ret)
    & (() => Curried1<A, Ret>)
)

type Curried2<A, B, Ret> = (
    & ((a: A, b: B) => Ret)
    & ((a: A) => Curried1<B, Ret>)
    & (() => Curried2<A, B, Ret>)
)

type Curried3<A, B, C, Ret> = (
    & ((a: A, b: B, c: C) => Ret)
    & ((a: A, b: B) => Curried1<C, Ret>)
    & ((a: A) => Curried2<B, C, Ret>)
    & (() => Curried3<A, B, C, Ret>)
)

export function curry<A, Ret>(f: (a: A) => Ret): Curried1<A, Ret>
export function curry<A, B, Ret>(f: (a: A, b: B) => Ret): Curried2<A, B, Ret>
export function curry<A, B, C, Ret>(f: (a: A, b: B, c: C) => Ret): Curried3<A, B, C, Ret>
export function curry(f: (...args: any[]) => any) {
    return function curried(...args: any[]) {
        if (args.length < f.length) {
            return (...moreArgs: any[]) => curried(...args, ...moreArgs)
        } else {
            return f(...args)
        }
    }
}
