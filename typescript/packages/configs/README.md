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
  "extends": "@mh4gf/configs/base.json"
}
```

### biome.json

```json
// in biome.json
{
  "extends": ["./node_modules/@mh4gf/configs/biome/index.jsonc"]
}
```