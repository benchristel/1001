.DEFAULT_GOAL = verify
TEST = bun devtools/test.ts
LINT = bun run eslint src
TYPE = bun run tsc --noEmit

.PHONY: deps fix lint test ts typecheck verify build release st

verify: test typecheck lint

deps:
	npm install

fix:
	@$(LINT) --fix

lint:
	@$(LINT)

test:
	@$(TEST)

ts:
	@$(TYPE) --watch

typecheck:
	@$(TYPE)

build:
	@rm -rf dist
	@bun run tsc

release:
	@npm run bumpp --no-push

st:
	@$(LINT) --fix > /dev/null
	@git add src > /dev/null
	@GIT_PAGER= git diff --cached
	@$(TEST) > /dev/null && echo 'test: PASS' || echo 'test: FAIL'
	@$(LINT) > /dev/null && echo 'lint: PASS' || echo 'lint: FAIL'
	@$(TYPE) > /dev/null && echo 'type: PASS' || echo 'type: FAIL'
