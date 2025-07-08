#!/usr/bin/env node

import { execute } from '@oclif/core'

try {
  await execute({ development: false, dir: import.meta.url })
} catch (error) {
  console.error('Error:', error)
  process.exit(1)
}
