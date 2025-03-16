import {test, expect, is} from "@benchristel/taste"
import {assertFailure, assertSuccess, failure, flatMapSuccess, mapFailure, Result, success, Success} from "./result.js"
import {curry} from "../index.js"
/**
 * ## Config File Exercise
 *
 * This is an exercise I invented to explore designs for monadic error
 * handling. The problems I frequently see with existing approaches include:
 *
 * - Low-level errors being reported directly to the user.
 * - Low-level code knowing about user-facing error messages (coupling code to
 *   one usage context).
 * - Error messages not being translatable.
 * - Errors not having stacktrace-like information that lets you figure out
 *   where they're coming from.
 * - Extremely complex and verbose error-handling code.
 * - Impedance mismatches from one dependency using `Maybe`, another using
 *   `Either`, another using `Task`, etc. Let's suppose for the sake of
 *   argument that I can wrap all third-party code in shims. Which monad should
 *   I pick?
 *
 * ### The Exercise: Level 1
 *
 * Read and parse a config file from a given path. You have access to a
 * `parseConfig(string): Config` function that throws an exception if the
 * config is malformed. The exception's message may contain a line number in
 * the format `/line \d+$/`. Error messages must include the file path, the
 * error from the filesystem (if any), the parse error and line number (if
 * any), and the stacktrace. Errors must be returned in abstract form; they
 * will be formatted and translated into the user's preferred language
 * elsewhere.
 */

/*
 * Stubs for APIs given in the exercise:
 */

type ReadFile = (path: string) => Promise<string>

type ParseConfig = (text: string) => Config

class Config {}

/*
 * Library types that we wish into existence:
 */

type Task<S, F> = Promise<Result<S, F>>

/*
 * The solution to the exercise:
 */

test("readConfigLevel1", {
    async "succeeds"() {
        // Arrange outputs:
        const theConfig = new Config()
        // Arrange inputs:
        const readFile = () => Promise.resolve(success(""))
        const parseConfig = () => success(theConfig)
        const path = "the-path.cfg"

        const result = await readConfigLevel1(readFile, parseConfig, path)

        assertSuccess(result)
        expect(result.value, is, theConfig)
    },

    async "fails when the file doesn't exist"() {
        // Arrange inputs:
        const readFile: ReadFileAsTask = async (path: string) => {
            return failure({mode: ProblemReadingFile_NotFound, path})
        }
        const parseConfig = () => {
            throw "parseConfig shouldn't be called"
        }
        const path = "the-path.cfg"

        const result = await readConfigLevel1(readFile, parseConfig, path)

        assertFailure(result)
        expect(result.detail.mode, is, ProblemReadingConfig_NotFound)
        expect(result.detail.path, is, "the-path.cfg")
    },

    "fails when we don't have permission to read the file"() {
        throw "TODO"
    },

    "fails when there is a syntax error containing a line number"() {
        throw "TODO"
    },

    "fails when there is a syntax error without a line number"() {
        throw "TODO"
    },
})

async function readConfigLevel1(
    readFile: ReadFileAsTask,
    parseConfig: ParseConfigAsResult,
    path: string,
): Task<Config, ProblemReadingConfig> {
    return readFile(path)
        .then(flatMapSuccess(parseConfig))
        .then(mapFailure(toProblemReadingConfig(path)))
}

type ProblemReadingConfig =
    | {
        mode: typeof ProblemReadingConfig_NotFound;
        path: string;
    }
    | {
        mode: typeof ProblemReadingConfig_NoPermission;
        path: string;
    }
    | {
        mode: typeof ProblemReadingConfig_SyntaxError;
        path: string;
        line?: string;
    }

const ProblemReadingConfig_NotFound = "ProblemReadingConfig_NotFound"
const ProblemReadingConfig_NoPermission = "ProblemReadingConfig_NoPermission"
const ProblemReadingConfig_SyntaxError = "ProblemReadingConfig_SyntaxError"

const toProblemReadingConfig = curry(
    function (
        path: string,
        problem: ProblemReadingFile | ProblemParsingConfig,
    ): ProblemReadingConfig {
        const {mode} = problem
        switch (mode) {
            case ProblemReadingFile_NotFound:
                return {mode: ProblemReadingConfig_NotFound, path}
            case ProblemReadingFile_NoPermission:
                return {mode: ProblemReadingConfig_NoPermission, path}
            case ProblemParsingConfig_SyntaxError:
                return {mode: ProblemReadingConfig_SyntaxError, path}
            default:
                throw impossible("failure mode", mode)
        }
    },
)

test("readFileAsTask", {
    "succeeds"() {
        throw "TODO"
    },

    "fails when the file doesn't exist"() {
        throw "TODO"
    },

    "fails when we don't have read permission"() {
        throw "TODO"
    },
})

type ReadFileAsTask = (path: string) => Task<string, ProblemReadingFile>

function readFileAsTask(readFile: ReadFile): ReadFileAsTask {
    return async function (path) {
        throw "not implemented"
    }
}

type ProblemReadingFile =
    | {
        mode: typeof ProblemReadingFile_NotFound;
        path: string;
    }
    | {
        mode: typeof ProblemReadingFile_NoPermission;
        path: string;
    }

const ProblemReadingFile_NotFound = "ProblemReadingFile_NotFound"
const ProblemReadingFile_NoPermission = "ProblemReadingFile_NoPermission"

test("parseConfigAsResult", {
    "succeeds"() {
        throw "TODO"
    },

    "fails with a line number when the parse error has one"() {
        throw "TODO"
    },

    "fails without a line number when the parse error has none"() {
        throw "TODO"
    },
})

type ParseConfigAsResult =
    (text: string) => Result<Config, ProblemParsingConfig>

function parseConfigAsResult(parseConfig: ParseConfig): ParseConfigAsResult {
    return function (text) {
        throw "not implemented"
    }
}

type ProblemParsingConfig = {
    mode: typeof ProblemParsingConfig_SyntaxError;
    line?: string;
}

const ProblemParsingConfig_SyntaxError = "ProblemParsingConfig_SyntaxError"

function impossible(message: string, value: never): Error {
    return new Error(`impossible ${message} ${value}`)
}
