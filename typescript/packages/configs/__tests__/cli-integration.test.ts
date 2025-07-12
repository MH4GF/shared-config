import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * CLI Integration Tests
 *
 * These tests verify that the CLI actually executes and produces output.
 * They catch issues like:
 * - CLI not executing at all
 * - Silent failures in neverthrow usage
 * - Missing output/UI rendering
 * - Process hanging without termination
 */
describe('CLI Integration', () => {
  const cliPath = join(__dirname, '../src/cli.ts')
  const timeout = 10000 // 10 seconds timeout

  /**
   * Helper function to run CLI command and capture output
   */
  async function runCLI(
    args: string[] = [],
    input?: string,
  ): Promise<{
    stdout: string
    stderr: string
    exitCode: number | null
  }> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        child.kill('SIGTERM')
        reject(new Error(`CLI command timed out after ${timeout}ms`))
      }, timeout)

      const child = spawn('npx', ['tsx', cliPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, NODE_ENV: 'test' },
      })

      let stdout = ''
      let stderr = ''

      child.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      child.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      if (input) {
        child.stdin.write(input)
        child.stdin.end()
      }

      child.on('close', (code) => {
        clearTimeout(timeoutId)
        resolve({
          stdout,
          stderr,
          exitCode: code,
        })
      })

      child.on('error', (error) => {
        clearTimeout(timeoutId)
        reject(error)
      })
    })
  }

  it('should execute CLI without hanging', async () => {
    // This test ensures the CLI actually starts and doesn't hang indefinitely
    const result = await runCLI(['--help'])

    // The CLI should exit (not hang)
    expect(result.exitCode).not.toBe(null)

    // Should have some output (help text)
    expect(result.stdout.length + result.stderr.length).toBeGreaterThan(0)
  })

  it('should show help text when --help flag is used', async () => {
    const result = await runCLI(['--help'])

    // Should exit successfully
    expect(result.exitCode).toBe(0)

    // Should contain help information
    expect(result.stdout).toContain('shared-config')
    expect(result.stdout).toContain('Initialize shared configuration')
  })

  it('should execute init command and show output', async () => {
    const result = await runCLI(['init', '--help'])

    // Should exit successfully
    expect(result.exitCode).toBe(0)

    // Should show init command help
    expect(result.stdout).toContain('Initialize shared configuration files')
    expect(result.stdout).toContain('--yes')
    expect(result.stdout).toContain('--all')
  })

  it('should start init command in interactive mode', async () => {
    // Test that init command actually starts and shows initial output
    // We'll send Ctrl+C to exit quickly to avoid hanging
    const result = await runCLI(['init'], '\u0003') // Send Ctrl+C

    // The command should have started (even if interrupted)
    // Should show the initialization message
    expect(result.stdout).toContain('Initializing shared configuration files')
  })

  it('should handle --yes flag in init command', async () => {
    const result = await runCLI(['init', '--yes'])

    // Should exit successfully
    expect(result.exitCode).toBe(0)

    // Should show installation message
    expect(result.stdout).toContain('Installing default configurations')
    expect(result.stdout).toContain('configurations installed successfully')
  })

  it('should handle --all flag in init command', async () => {
    const result = await runCLI(['init', '--all'])

    // Should exit successfully
    expect(result.exitCode).toBe(0)

    // Should show all configurations message
    expect(result.stdout).toContain('Installing all configurations')
    expect(result.stdout).toContain('All configurations installed successfully')
  })

  it('should handle --all --yes flags together', async () => {
    const result = await runCLI(['init', '--all', '--yes'])

    // Should exit successfully
    expect(result.exitCode).toBe(0)

    // Should show combined message
    expect(result.stdout).toContain('Installing all configurations without prompts')
    expect(result.stdout).toContain('All configurations installed successfully')
  })

  it('should not hang when CLI has errors', async () => {
    // This test ensures that even if there are errors in the CLI code,
    // it doesn't hang indefinitely (which was the original problem)

    // Try various scenarios that could cause hanging
    const scenarios = [
      ['init', '--invalid-flag'],
      ['init', 'extra-arg'],
    ]

    for (const args of scenarios) {
      const result = await runCLI(args)

      // The key requirement: CLI should exit, not hang
      expect(result.exitCode).not.toBe(null)
    }
  })
})
