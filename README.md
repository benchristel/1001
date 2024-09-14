# 1001 TypeScript Functions, With Empirical Derivations

A software engineering tutorial which walks through the process of creating a NodeJS library, start to finish. Every step and decision is described in detail. The finished book will be compiled from a sequence of git commits that generate the finished library.

## Development

Dependencies: node 20.9.0, bun 0.6.12, npm 10.1.0

```sh
npm install  # one-time setup
./run test   # run unit tests
./run ts     # run typechecker in watch mode
./run lint   # run linter
./run fix    # fix lint
./run verify # run all checks (do this before you commit)
```

## Why

<details>
<summary>show/hide author's notes</summary>

I have several reasons for working on this particular project.

1. Programmers who want to improve their craft face a hurdle: they don't encounter many examples of good code. They have to go out of their way to find such examples. The search is difficult. Good code is typically not labeled as such. No one is directing their attention to it. As a result, it's hard for new programmers to develop good taste in software.
2. Reading good code isn't enough to know how to write it. The process of programming rarely mirrors the finished product in structure. To learn to program well, one needs to see what good process looks like — but it should be a somewhat sanitized, curated version of the process, with the false starts and mistakes abridged, and called out as soon as they happen.
3. A common design problem I see in my daily work is that programs do not cleanly separate different domains or layers of abstraction. This lack of distinction makes the program harder to understand, and its parts impossible to reuse safely. In order to separate domains, one needs to be able to distinguish between application-specific and application-agnostic functions. It becomes easier to recognize application-agnostic functionality in a program when one has a ready-made concept, already learned, which fits the functionality. The library developed in this tutorial provides a vocabulary of such concepts.
4. Another design problem I often see is that parsing and serialization are not distinguished from core business logic. The result is that all of the code is more complex and error-prone than it needs to be. I'd like to believe this problem arises because programmers aren't comfortable writing parsers and serializers, or don't know patterns for doing so. This tutorial will hopefully build that comfort and introduce those patterns.
5. The final problem I aim to address is software development's lack of empiricism. By empiricism, I mean simply the engineer's ability to articulate why each facet or distinction in a design exists, by pointing out a specific, concrete problem that would occur if the distinction were not there. The lack of empiricism in software leads to designs that are more complicated, and thus more expensive to change, than they need to be. It also creates an atmosphere where engineers fear making significant changes to existing code, because they don't know what they might accidentally break. In this tutorial, I take an empirical approach, using examples of desired behavior to motivate each step in the evolution of the code. (Yes, this means TDD.) I have found the way of thinking that TDD teaches to be very valuable, whether or not I choose to write tests for any particular bit of code.

</details>