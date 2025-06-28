---
"@mh4gf/configs": major
---

chore(deps): upgrade Biome from v1.9.4 to v2.0.6

- Updated @biomejs/biome to v2.0.6 in all packages
- Migrated configuration files to v2 format:
  - Changed `ignore` to `includes` in files section
  - Moved `organizeImports` to `assist.actions.source`
  - Replaced `all: true` with `recommended: true` and domain settings
  - Added `noDefaultExport` rule to style rules
  - Added explicit severity levels for style rules
- Fixed type annotation in vite-project example

This is a major version bump due to potential breaking changes in Biome configuration format and rule behavior.