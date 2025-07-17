import { describe, expect, it, vi } from 'vitest'
import { Init } from '../src/commands/init.js'

describe('Init command', () => {
  it('should show interactive mode with Ink UI', async () => {
    const initCommand = new Init([], {
      bin: 'shared-config',
      version: '1.0.0',
      runHook: vi.fn().mockResolvedValue({}),
      config: {
        runHook: vi.fn().mockResolvedValue({}),
      },
    })
    const logSpy = vi.spyOn(initCommand, 'log').mockImplementation(() => {})
    const warnSpy = vi.spyOn(initCommand, 'warn').mockImplementation(() => {})

    await initCommand.run()

    // Verify it shows the initialization message
    expect(logSpy).toHaveBeenCalledWith('🛠  Initializing shared configuration files...')

    // Verify it starts interactive configuration selection
    expect(logSpy).toHaveBeenCalledWith('📋 Starting interactive configuration selection...')

    logSpy.mockRestore()
    warnSpy.mockRestore()
  })
})
