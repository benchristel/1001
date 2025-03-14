#!/usr/bin/env bun
import {glob} from "glob"
import {join} from "path"
import {
    getAllTests,
    runTests,
    formatTestResultsAsText,
    type TestResult
} from "@benchristel/taste"

glob(getTestPathGlobs())
    .then((paths) => Promise.all(paths.map((path) => import(path))))
    .then(getAllTests)
    .then(runTests)
    .then(reportResults)
    .catch(printErrorAndExit)

function getTestPathGlobs() {
    const repoRoot = join(__dirname, "..", "..")
    const commandLineArgs = process.argv.slice(2)
    if (commandLineArgs.length > 0) {
        return commandLineArgs.map(path => join(repoRoot, path))
    }

    return [
        join(repoRoot, "src", "**", "*.test.ts"),
        join(repoRoot, "test", "**", "*.test.ts"),
    ]
}

function reportResults({results}: {results: TestResult[]}): void {
    const failed = results.some((result) => result.error)
    console.log(formatTestResultsAsText({results}))
    if (failed) process.exit(1)
}

function printErrorAndExit(e: Error) {
    console.error(e)
    process.exit(1)
}
