import {test, expect, equals} from "@benchristel/taste"
import {Result} from "./result.js"

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

/** */
type ReadFile = (path: string) => Promise<string>

/** */
type ParseConfig = (text: string) => Config

/** */
class Config {}

/*
 * Library types that we wish into existence:
 */

type Task<S, F> = Promise<Result<S, F>>

/*
 * The solution to the exercise:
 */

test("readConfigLevel1", {
    "succeeds"() {
        throw "TODO"
    },

    "fails when the file doesn't exist"() {
        throw "TODO"
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

/** */
async function readConfigLevel1(
    readFile: ReadFileAsTask,
    parseConfig: ParseConfigAsResult,
    path: string,
): Task<Config, ProblemReadingConfig> {
    throw "not implemented"
}

/** */
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

/** */
type ReadFileAsTask = typeof readFileAsTask

/** */
async function readFileAsTask(
    readFile: ReadFile,
    path: string,
): Task<string, ProblemReadingFile> {
    throw "not implemented"
}

/** */
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

/** */
type ParseConfigAsResult = typeof parseConfigAsResult

/** */
function parseConfigAsResult(
    parseConfig: ParseConfig,
    text: string,
): Result<string, ProblemParsingConfig> {
    throw "not implemented"
}

type ProblemParsingConfig = {
    mode: typeof ProblemParsingConfig_SyntaxError;
    line?: string;
}

const ProblemParsingConfig_SyntaxError = "ProblemParsingConfig_SyntaxError"
