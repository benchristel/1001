.DEFAULT_GOAL = right
TEST = bun dev/scripts/test.ts
LINT = bun run eslint src test --config dev/config/eslint.config.js
TYPE = bun run tsc --noEmit --project dev/config/tsconfig.json
TYPETEST = bun run tsd

.PHONY: deps fix lint test ts typecheck typetest verify build release publish

right: test typecheck typetest fix ;
verify: test typecheck lint typetest ;

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

typetest: build
	@$(TYPETEST)

build:
	@rm -rf dist
	@bun run tsc --project dev/config/tsconfig.build.json

release: verify build
	@node_modules/.bin/bumpp --no-push --commit "Release v"

publish:
	@npm publish && git push --tags
