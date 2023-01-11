---
name: 'package'
root: '.'
output: './packages'
ignore: []
questions:
  value: 'Please enter any text.'
---

# `{{ inputs.value }}/package.json`

```json
{
  "name": "@mh4gf/{{ inputs.value }}",
  "version": "0.0.1",
  "author": "MH4GF <h.miyagi.cnw@gmail.com>",
  "license": "MIT",
  "packageManager": "pnpm@7.24.3",
  "main": "index.js"
}
```

# `{{ inputs.value }}/README.md`

````markdown
# @mh4gf/{{ inputs.value }}

## Install

```bash
pnpm add -D prettier @mh4gf/prettier-config
```
````

````

# `{{ inputs.value }}/index.js`

```javascript
console.log("hello world!");
````
