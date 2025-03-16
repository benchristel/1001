# 1001

## Development

Dependencies: node 20.9.0, bun 1.1.42, npm 10.1.0

```sh
make deps    # one-time setup; installs dependencies and configures git hooks
make test    # run unit tests
make ts      # run typechecker in watch mode
make lint    # run linter
make fix     # fix lint
make verify  # run all checks (do this before you commit)
```

The [Husky](https://typicode.github.io/husky/) git hook framework will run `verify` automatically when you try to commit changes. To bypass this check, use `git commit -n` or `git commit --no-verify`.
