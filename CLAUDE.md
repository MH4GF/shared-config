# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `pnpm build` - Build all packages
- Lint: `pnpm lint` - Run all linters
- Format: `pnpm fmt` - Format all code
- Test: `pnpm test` - Run all tests
- Test with coverage: `pnpm test:coverage` - Run tests with coverage report
- Test UI: `pnpm test:ui` - Run tests with interactive UI
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
- When creating PRs, follow existing patterns in similar files