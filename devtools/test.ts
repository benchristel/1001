#!/usr/bin/env bun
import {glob} from "glob"
import {join} from "path"
import {
    getAllTests,
    runTests,
    formatTestResultsAsText,
    type TestResult
} from "@benchristel/taste"

const testPaths = join(__dirname, "..", "src", "**", "*.test.ts")

glob(testPaths)
    .then((paths) => Promise.all(paths.map((path) => import(path))))
    .then(getAllTests)
    .then(runTests)
    .then(reportResults)
    .catch(console.error)

function reportResults({results}: {results: TestResult[]}): void {
    const failed = results.some((result) => result.error)
    console.log(formatTestResultsAsText({results}))
    if (failed) process.exit(1)
}