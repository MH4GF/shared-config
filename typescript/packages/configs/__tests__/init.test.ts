import { describe, expect, it, vi } from 'vitest'
import { Init } from '../src/commands/init.js'

describe('Init command', () => {
  it('should only log placeholder message (not yet implemented)', async () => {
    const initCommand = new Init([], { bin: 'shared-config', version: '1.0.0' })
    const logSpy = vi.spyOn(initCommand, 'log').mockImplementation(() => {})

    await initCommand.run()

    expect(logSpy).toHaveBeenCalledWith('Hello, this is the init command!')
    expect(logSpy).toHaveBeenCalledTimes(1)

    logSpy.mockRestore()
  })
})
