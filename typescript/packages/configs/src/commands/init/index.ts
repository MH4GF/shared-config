import type { Command } from 'commander'
import { render } from 'ink'
import React from 'react'
import { InitForm } from './ui/InitForm.js'

/**
 * initコマンドの設定
 * @param program Commanderプログラムインスタンス
 */
export const initCommand = (program: Command): void => {
  program
    .command('init')
    .description('Initialize project with shared configurations')
    .option('--dry-run', 'Show what would be done without making changes')
    .action(async (options) => {
      try {
        // TypeScriptの型安全性を確保
        const dryRun = options && typeof options === 'object' && 'dryRun' in options 
          ? Boolean(options.dryRun) 
          : false
          
        const { waitUntilExit } = render(
          React.createElement(InitForm, { dryRun }),
          {
            stdin: process.stdin,
            stdout: process.stdout,
            stderr: process.stderr,
            exitOnCtrlC: true,
          },
        )
        await waitUntilExit()
      } catch (error) {
        // エラーログは出力せずに終了
        process.exit(1)
      }
    })
}
