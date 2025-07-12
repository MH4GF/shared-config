#!/usr/bin/env node

import { execute } from '@oclif/core'
import { ResultAsync } from 'neverthrow'

const result: ResultAsync<unknown, unknown> = ResultAsync.fromThrowable(
  () => execute({ development: false, dir: import.meta.url }),
  (error) => error,
)()

result.match(
  () => {
    // Success case
  },
  (error) => {
    console.error('CLI execution failed:', error)
    process.exit(1)
  },
)
