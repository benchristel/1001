import {expectType} from "tsd"
import {at, _} from "../src/index.js"

const nums: number[] = []
const num: [number] = [42]
const strNum: [string, number] = ["foo", 42]
const boolStrNum: [boolean, string, number] = [true, "", 1]
const nullBoolStrNum: [null, boolean, string, number] = [null, true, "", 1]

/*
 * Test indexing into an array.
 */

expectType<number | undefined>(nums._(at(0)))

expectType<number | undefined>(nums._(at(42)))

/*
 * Test accessing a tuple at a statically known index.
 */

expectType<number>(num._(at(0)))

expectType<string>(strNum._(at(0)))

expectType<number>(strNum._(at(1)))

expectType<boolean>(boolStrNum._(at(0)))

expectType<string>(boolStrNum._(at(1)))

expectType<number>(boolStrNum._(at(2)))

expectType<null>(nullBoolStrNum._(at(0)))

expectType<number>(nullBoolStrNum._(at(3)))

/*
 * Test accessing a tuple at an index that is not known statically.
 */

const dynamicIndex: number = 0

expectType<null | boolean | string | number | undefined>(
    nullBoolStrNum._(at(dynamicIndex)),
)

/*
 * Test accessing readonly tuples
 */

const readOnlyNats = [1, 2, 3, 4, 5] as const

expectType<1>(readOnlyNats._(at(0)))
expectType<2>(readOnlyNats._(at(1)))
expectType<3>(readOnlyNats._(at(2)))
expectType<4>(readOnlyNats._(at(3)))
expectType<5>(readOnlyNats._(at(4)))
