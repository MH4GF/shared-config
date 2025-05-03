#!/usr/bin/env node

import { program } from 'commander'
import { initCommand } from './commands/init/index.js'

// プログラムの設定
program.name('@mh4gf/configs').description('Shared configuration setup tool').version('0.1.0')

// コマンドの追加
initCommand(program)

// プログラムの実行
program.parse()
