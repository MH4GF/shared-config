import type { Command } from 'commander'
import { render } from 'ink'
import React from 'react'
import { InitForm } from './ui/InitForm.js'

export const initCommand = (program: Command): void => {
  program
    .command('init')
    .description('Initialize project with shared configurations')
    .action(async () => {
      const { waitUntilExit } = render(React.createElement(InitForm), {
        stdin: process.stdin,
        stdout: process.stdout,
        stderr: process.stderr,
        exitOnCtrlC: true,
      })
      await waitUntilExit()
    })
}
