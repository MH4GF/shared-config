#!/usr/bin/env node

import { execute } from '@oclif/core'
import { ResultAsync } from 'neverthrow'

ResultAsync.fromThrowable(
  async () => execute({ development: false, dir: import.meta.url }),
  (error) => {
    console.error('Error:', error)
    process.exit(1)
  },
)
