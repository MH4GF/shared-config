# @mh4gf/configs

[![npm version](https://badge.fury.io/js/@mh4gf%2Fconfigs.svg)](https://badge.fury.io/js/@mh4gf%2Fconfigs)

Various configuration files used by @mh4gf.

- prettier
- tsconfig.json

## Install

    pnpm add -D @mh4gf/configs

## usage

### prettier

```json
// in package.json
{
  "prettier": "@mh4gf/configs/prettier"
}
```

```js
// or in .prettierrc.cjs
module.exports = {
  ...require('@mh4gf/configs/prettier'),
  // your overrides
}
```

### tsconfig.json

```json
// in tsconfig.json
{
  "extends": "@mh4gf/configs/base.json"
}
```
