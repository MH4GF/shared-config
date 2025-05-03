# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Lint: `pnpm lint` - Run all linters
- Format: `pnpm fmt` - Format all code
- Build: `pnpm build` - Build the project
- Test: `pnpm test` - Run tests
- Specific linters:
  - Biome: `pnpm lint:biome` / `pnpm fmt:biome`
  - ESLint: `pnpm lint:eslint` / `pnpm fmt:eslint`
  - Knip: `pnpm lint:knip` / `pnpm fmt:knip`

## Code Style Guidelines
- Formatting: Space indentation, 100-character line width
- Semicolons: "as needed" (not required)
- Quotes: Single quotes preferred
- Imports: Use organized imports with consistent type imports
- Naming: Use camelCase for variables, PascalCase for types/components
- Error handling: Use typed errors with proper documentation
- File naming: Follow file naming conventions (not strictly case-sensitive)
  - Test files: Use kebab-case (e.g., `component-name.test.tsx`)
- When creating PRs, follow existing patterns in similar files

## Task Completion Criteria
For any implementation task to be considered complete, it must satisfy all of the following conditions:
1. All linters must pass (`pnpm lint` / `pnpm fmt` must succeed without errors)
2. The build must succeed (`pnpm build` must complete without errors)
3. All tests must pass (`pnpm test` must succeed)
4. The feature must be fully implemented and integrated with dependent systems
5. All required files must be created and properly configured
6. Code must follow the project's style guidelines
7. User must confirm and approve the implementation