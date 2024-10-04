# 1001 TypeScript Functions, With Empirical Derivations

A software engineering tutorial which walks through the process of creating a NodeJS library, start to finish. Every step and decision is described in detail. The finished book will be compiled from a sequence of git commits that generate the finished library.

## Introduction

This is a different kind of software book. In this book, I'm not going to lecture you about coding style, algorithms, or software design. I'm not going to talk about development process or best practices.

Instead, I'm going to show you.

Together, we will be writing a library of TypeScript functions that you can use as the building blocks of beautiful, maintainable programs. By following the step-by-step evolution of tests, types, and code, you'll see exactly how these functions work and why each facet and wrinkle is there.

Additionally, you will learn:

- What expert software engineers pay attention to while programming — and, just as important, what they _don't_ pay attention to.
- How to create abstractions that let you write code in higher-level terms and raise the power level of your programming language.
- How to separate custom, application-specific code from reusable, app-agnostic code.
- Practical functional programming techniques, such as how to work effectively with immutable data and curried functions. (Don't worry, I won't mention monads[^monad] even once.)

[^monad]: Well, okay, exactly once.

Along the way, we'll visit many out-of-the way but useful features of JavaScript and TypeScript. If you don't yet feel that you've mastered these languages, I hope you will by the end of this book.

That said, if you've never programmed in JavaScript or TypeScript, this book will not be a good introduction. I recommend other resources for that, which are freely available online:

- [_Eloquent JavaScript_ by Marijn Haverbeke](https://eloquentjavascript.net/)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

The code examples in this book are released under a CC0 license, so you are free to do whatever you like with them. The prose is copyright Ben Christel; please don't redistribute or modify it. You can access it for free on the web.

Above all, I hope this book shows you what a joyful experience programming can be.

## Development

Dependencies: node 20.9.0, bun 0.6.12, npm 10.1.0

```sh
npm install  # one-time setup
./run test   # run unit tests
./run ts     # run typechecker in watch mode
./run lint   # run linter
./run fix    # fix lint
./run verify # run all checks (do this before you commit)
./run st     # display codebase status
```

`./run st` deserves a bit more explanation. It does the following:

- Fixes lint
- Adds all files to the git cache
- Displays the diff that would be committed if you ran `git commit`
- Displays the pass/fail status of the various checks.

The intended use is to `./run st` before every commit, so you know exactly what's what.

The [Husky](https://typicode.github.io/husky/) git hook framework will run `verify` automatically when you try to commit changes. To bypass this check, use `git commit -n` or `git commit --no-verify`.

## Plan

<details>
<summary>show/hide author's notes</summary>

I suspect that trying to write the code and prose together in one pass is going to be a nightmare. I'll certainly need to backtrack and fix up code at various points; if that also involves revisions to prose it will be much harder.

Therefore, my current plan is to implement the functions first, committing each step of the TDD cycle separately. That means one commit for red, a second commit for green, and possibly a third commit for refactor. I will maintain a notes file so I remember interesting decisions I made along the way.

Once the code is in a good state, I will start to write the prose, referencing specific commits for code examples. https://diff2html.xyz appears to be a good tool for converting git diffs to HTML. A template syntax like this should suffice:

```
{{diff [commit sha] --context-lines 5}}
```

If I'm using mdsite, that probably means writing a plugin system for it, which I've been meaning to do anyway.

</details>

## Why

<details>
<summary>show/hide author's notes</summary>

I have several reasons for working on this particular project.

1. Programmers who want to improve their craft face a hurdle: they don't encounter many examples of good code. They have to go out of their way to find such examples. The search is difficult. Good code is typically not labeled as such. No one is directing their attention to it. As a result, it's hard for new programmers to develop good taste in software.
2. Reading good code isn't enough to know how to write it. The process of programming rarely mirrors the finished product in structure. To learn to program well, one needs to see what good process looks like — but it should be a somewhat sanitized, curated version of the process, with the false starts and mistakes abridged, and called out as soon as they happen.
3. A common design problem I see in my daily work is that programs do not cleanly separate different domains or layers of abstraction. This lack of distinction makes the program harder to understand, and its parts impossible to reuse safely. In order to separate domains, one needs to be able to distinguish (at least) between application-specific and application-agnostic functions. It becomes easier to recognize application-agnostic functionality in a program when one has a ready-made concept, already learned, which fits the functionality. The library developed in this tutorial provides a vocabulary of such concepts.
4. Another design problem I often see is that parsing and serialization are not distinguished from core business logic. The result is that all of the code is more complex and error-prone than it needs to be. I'd like to believe this problem arises because programmers aren't comfortable writing parsers and serializers, or don't know patterns for doing so. This tutorial will hopefully build that comfort and introduce those patterns.
5. The final problem I aim to address is software development's lack of empiricism. By empiricism, I mean simply the engineer's ability to articulate why each facet or distinction in a design exists, by pointing out a specific, concrete problem that would occur if the distinction were not there. The lack of empiricism in software leads to designs that are more complicated, and thus more expensive to change, than they need to be. It also creates an atmosphere where engineers fear making significant changes to existing code, because they don't know what they might accidentally break. In this tutorial, I take an empirical approach, using examples of desired behavior to motivate each step in the evolution of the code. (Yes, this means TDD.) I have found the way of thinking that TDD teaches to be very valuable, whether or not I choose to write tests for any particular bit of code.

</details>

## Functions

- is (===)
- isCloseTo (compares floats - use Math.fround?)
- exists (checks for nullishness)
- times
- product
- mod
- isEven
- isOdd
- inverse (1/x)
- minus (unary)
- isFinite
- isInfinite
- isNaN
- isInteger
- isFractional
- keys
- values
- entries
- average
- get
- update (immutably)
- set (immutably)
- getAt(path)
- setAt(path)
- append (immutable push)
- concat
- join
- objectHash
- objectDiff
- zip
- equals (deepEquals)
- withIndex (used for `withIndex(array).map(f)`)
- countTo (for use with `for...of` loops, replacing most C-style for loops)

### Higher Order Functions

- map
- filter
- reduce (TODO: reduce or fold?)
- reduceRight
- find
- findLast
- contains(element)
- includes(subCollection)
- compose
- composeRight
- pass
- pipe
- Object.prototype._
- curry
- Y
- trampoline

### String Processing

- pad (TODO research)
- indent
- trimMargin

### Parsing

- typed parser combinators

### Serialization

- pretty

## Data Structures

- nonempty list
- zip list
- heap
- fiber?

## Data Types

- result/either
- optional/maybe

## Prototypical Stateful Objects

- not "patterns" because patterns are abstract. I want to show you examples!

- Observable
- Reactive store
- Caching (could be a whole chapter, maybe a whole book)
- Stream wordcount
- Stream parser
- Signal?
- Registry (e.g. a test registry)
- seeded RNG

### Functions for working with Promises

TODO