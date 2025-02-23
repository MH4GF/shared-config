# @mh4gf/configs

[![npm version](https://badge.fury.io/js/@mh4gf%2Fconfigs.svg)](https://badge.fury.io/js/@mh4gf%2Fconfigs)

Various configuration files used by @mh4gf.

- tsconfig.json
- biome.json

## Install

    pnpm add -D @mh4gf/configs

## usage

### tsconfig.json

```json
// in tsconfig.json
{
  "extends": "@mh4gf/configs/typescript/base.json"
}
```

### biome.json

For basic configuration:

```json
// in biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["./node_modules/@mh4gf/configs/biome/index.jsonc"]
}
```

For React projects:

```json
// in biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "./node_modules/@mh4gf/configs/biome/index.jsonc",
    "./node_modules/@mh4gf/configs/biome/react.jsonc"
  ]
}
```
