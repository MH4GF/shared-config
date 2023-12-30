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
  "description": "{{ inputs.value }}",
  "repository": {
    "type": "git",
    "url": "https://github.com/mh4gf/shared-config.git",
    "directory": "typescript/packages/{{ inputs.value }}"
  },
  "author": "MH4GF <h.miyagi.cnw@gmail.com>",
  "license": "MIT",
  "packageManager": "pnpm@7.24.3",
  "publishConfig": {
    "access": "public"
  },
  "main": "index.js"
}
```

# `{{ inputs.value }}/README.md`

```markdown
# @mh4gf/{{ inputs.value }}

[![npm version](https://badge.fury.io/js/@mh4gf%2F{{ inputs.value }}.svg)](https://badge.fury.io/js/@mh4gf%2F{{ inputs.value }})

{{ inputs.value }}

## Install

    pnpm add -D @mh4gf/{{ inputs.value }}
```

# `{{ inputs.value }}/index.js`

```javascript
console.log('hello world!')
```
