# @mh4gf/shared-config

[![@mh4gf/prettier-config](https://badge.fury.io/js/@mh4gf%2Fprettier-config.svg)](https://badge.fury.io/js/@mh4gf%2Fprettier-config)

A collection of shared configuration files and utilities for modern JavaScript/TypeScript projects. This monorepo provides consistent linting, formatting, and TypeScript configurations across multiple projects.

## Packages

### [@mh4gf/configs](./typescript/packages/configs)
Core configuration package containing:
- **Biome configurations**: For JavaScript/TypeScript formatting and linting
- **TypeScript configurations**: Base tsconfig.json files for different project types
- **CLI tool**: Interactive setup and configuration management

### [@mh4gf/eslint-config](./typescript/packages/eslint-config)
ESLint configuration package with:
- **Base configuration**: JavaScript best practices and code quality rules
- **TypeScript support**: Type-aware linting rules and import management
- **Vitest integration**: Testing-specific rules and globals

## Installation

```bash
# Install individual packages
npm install --save-dev @mh4gf/configs
npm install --save-dev @mh4gf/eslint-config

# Or with pnpm
pnpm add -D @mh4gf/configs @mh4gf/eslint-config
```

## Quick Start

### Using the CLI
```bash
# Initialize configurations in your project
npx @mh4gf/configs init
```

### Manual Setup

#### Biome Configuration
Create `biome.json` in your project root:
```json
{
  "extends": ["@mh4gf/configs/biome/index.jsonc"]
}
```

#### ESLint Configuration
Create `eslint.config.js` in your project root:
```javascript
import eslintConfig from '@mh4gf/eslint-config'

export default [
  ...eslintConfig.configs.recommended,
  ...eslintConfig.configs.typescript,
  ...eslintConfig.configs.vitest,
]
```

#### TypeScript Configuration
Create `tsconfig.json` in your project root:
```json
{
  "extends": "@mh4gf/configs/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

## Development

### Prerequisites
- Node.js 18+ 
- pnpm 9+

### Setup
```bash
# Clone the repository
git clone https://github.com/MH4GF/shared-config.git
cd shared-config

# Install dependencies
pnpm install

# Run linting
pnpm lint

# Run tests
pnpm test

# Build packages
pnpm build

# Format code
pnpm fmt
```

### Testing
The project uses Vitest for testing:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test --watch

# Run tests with UI
pnpm test:ui
```

### Project Structure
```
.
├── typescript/packages/
│   ├── configs/           # Core configuration package
│   │   ├── src/          # CLI source code
│   │   ├── biome/        # Biome configuration files
│   │   ├── tsconfig/     # TypeScript configuration files
│   │   └── __tests__/    # Unit tests
│   └── eslint-config/    # ESLint configuration package
│       ├── src/          # ESLint plugin source
│       └── __tests__/    # Unit tests
├── examples/             # Example projects using the configs
├── tests/                # Integration tests
└── docs/                 # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`pnpm test`)
6. Ensure linting passes (`pnpm lint`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Development Guidelines
- Follow the existing code style (enforced by Biome and ESLint)
- Add tests for new functionality
- Update documentation as needed
- Ensure all CI checks pass

## License

MIT © [MH4GF](https://github.com/MH4GF)
