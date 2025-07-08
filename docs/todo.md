# TODO List for @mh4gf/shared-config CLI Tool

## 🚧 Phase 0: Foundation (All streams can start)
### Stream 1: Project Setup
- [ ] Initialize oclif project structure
- [ ] Configure TypeScript for CLI development
- [ ] Set up build configuration
- [ ] Create directory structure (`src/commands/`, `src/ui/`, `templates/`)

### Stream 2: Template Creation
- [ ] Create templates directory structure
- [ ] Add Biome templates:
  - [ ] `biome.json` for TypeScript
  - [ ] `biome.json` for TypeScript + React
- [ ] Add TypeScript templates:
  - [ ] `tsconfig.json` base configuration

### Stream 3: Type Definitions & Interfaces
- [ ] Define configuration types (ToolConfig, UserSelection, etc.)
- [ ] Create shared interfaces for commands
- [ ] Define template metadata structure
- [ ] Create error types

### Stream 4: Documentation & Testing Setup
- [ ] Set up testing framework (Jest/Vitest)
- [ ] Create test directory structure
- [ ] Write initial README structure
- [ ] Set up CI/CD pipeline configuration

## 🛠 Phase 1: Core Development (After Phase 0)
### Stream 1: CLI Entry & Command
**Depends on: Project Setup**
- [ ] Create main CLI entry point (`bin/cli.ts`)
- [ ] Create `init` command (`src/commands/init.ts`)
- [ ] Implement command help and descriptions
- [ ] Add command argument parsing

### Stream 2: UI Components
**Depends on: Type Definitions**
- [ ] Set up Ink dependencies
- [ ] Create `InitForm.tsx` component (`src/ui/InitForm.tsx`)
- [ ] Implement checkbox selection UI
- [ ] Add selection state management
- [ ] Implement confirmation step

### Stream 3: Core Logic Implementation
**Depends on: Type Definitions, Templates**
- [ ] Create template loader module
- [ ] Implement file detection logic
- [ ] Create package.json parser/merger
- [ ] Build configuration validator

### Stream 4: Utility Functions
**Depends on: Type Definitions**
- [ ] Create file system utilities
- [ ] Implement package manager detector
- [ ] Create logging utilities
- [ ] Build error handling utilities

## 🔄 Phase 2: Integration (After Phase 1)
### Stream 1: Command Integration
**Depends on: CLI Command, UI Components**
- [ ] Wire UI to command logic
- [ ] Implement user selection handling
- [ ] Add non-interactive mode support

### Stream 2: File Operations
**Depends on: Core Logic, Utilities**
- [ ] Implement file copying from templates
- [ ] Add existing file detection and overwrite confirmation
- [ ] Implement package.json script addition with deduplication
- [ ] Create backup/rollback mechanism

### Stream 3: Package Management
**Depends on: Utilities**
- [ ] Implement package installation logic
- [ ] Add `@mh4gf/configs` installation
- [ ] Handle additional dependencies
- [ ] Support npm/yarn/pnpm

### Stream 4: Testing Implementation
**Depends on: All core components**
- [ ] Write unit tests for utilities
- [ ] Write unit tests for core logic
- [ ] Create integration tests for commands
- [ ] Test UI components with Ink Test Utils

## 🚀 Phase 3: Polish & Release (After Phase 2)
### Stream 1: Error Handling & UX
- [ ] Add comprehensive error messages
- [ ] Implement graceful failure handling
- [ ] Add progress indicators
- [ ] Improve UI feedback

### Stream 2: Build & Distribution
- [ ] Configure build process for CLI
- [ ] Set up bin configuration in package.json
- [ ] Test npx execution flow
- [ ] Ensure proper npm package registration

### Stream 3: Documentation
- [ ] Complete README with examples
- [ ] Document all CLI options and flags
- [ ] Create troubleshooting guide
- [ ] Add contribution guidelines

### Stream 4: Final Testing & QA
- [ ] Test cross-platform compatibility
- [ ] Test edge cases (permissions, monorepos)
- [ ] Performance testing
- [ ] Security audit

## 📊 Dependency Graph Summary
```
Phase 0 (All parallel) → Phase 1 (Partial dependencies) → Phase 2 (Integration) → Phase 3 (Polish)
```

## 🎯 Critical Path
1. Project Setup → CLI Entry → Command Integration → Build & Distribution
2. Type Definitions → Core Logic → File Operations
3. Templates → Core Logic → File Operations
4. UI Components → Command Integration

## 🔮 Future Enhancements (Phase 2)
- [ ] Add `--yes` flag for non-interactive mode
- [ ] Add `--all` flag to install all configurations
- [ ] Implement configuration update/upgrade functionality
- [ ] Add version management for templates
- [ ] Consider adding Vite templates

## 🐛 Known Issues / Considerations
- [ ] Define behavior for monorepo scenarios
- [ ] Handle different package managers (npm, yarn, pnpm)
- [ ] Consider Windows path compatibility
- [ ] Define merge strategy for complex package.json scripts

## 💡 Technical Decisions Needed
- [ ] Decide on template versioning strategy
- [ ] Define configuration override policies
- [ ] Establish conventions for template organization
- [ ] Determine dependency version pinning strategy