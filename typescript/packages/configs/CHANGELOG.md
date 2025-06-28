# @mh4gf/configs

## 0.5.0

### Minor Changes

- a9ac375: chore(deps): upgrade Biome from v1.9.4 to v2.0.6

  - Updated @biomejs/biome to v2.0.6 in all packages
  - Migrated configuration files to v2 format:
    - Changed `ignore` to `includes` in files section
    - Moved `organizeImports` to `assist.actions.source`
    - Replaced `all: true` with `recommended: true` and domain settings
    - Added `noDefaultExport` rule to style rules
    - Added explicit severity levels for style rules
  - Fixed type annotation in vite-project example

  This is a major version bump due to potential breaking changes in Biome configuration format and rule behavior.

## 0.4.7

### Patch Changes

- 107e074: Migrate naming convention rules from eslint to biome
- 436b696: fix: update linter rules for nursery and complexity categories
- 0f50824: fix: add erasableSyntaxOnly option to tsconfig

## 0.4.6

### Patch Changes

- bfd33f4: Add biome config for node.js

## 0.4.5

### Patch Changes

- fbda9d4: fix: update repository URLs to use git+ protocol for consistency

## 0.4.4

### Patch Changes

- c65b8f7: Update repository URLs to use consistent casing for GitHub links

## 0.4.3

### Patch Changes

- cc85d5b: chore: configure provenance

## 0.4.2

### Patch Changes

- 3faeddf: feat: enhance biome configuration for React projects
- 0419382: feat: add JSON parser configuration to allow comments in biome settings

## 0.4.1

### Patch Changes

- 8fd44a9: update biome config

## 0.4.0

### Minor Changes

- 0764ce2: add biome configuration

## 0.3.0

### Minor Changes

- ec8ddce: remove prettier config

## 0.2.3

### Patch Changes

- Updated dependencies [c54f1dd]
  - @mh4gf/prettier-config@0.2.2

## 0.2.2

### Patch Changes

- upgrade dependencies

## 0.2.1

### Patch Changes

- Updated dependencies
  - @mh4gf/prettier-config@0.2.1

## 0.2.0

### Minor Changes

- 86a9eb4: change to peer dependency of @tsconfig/strictest

## 0.1.0

### Minor Changes

- 9af559b: add tsconfig
- 43c2134: add prettier config
