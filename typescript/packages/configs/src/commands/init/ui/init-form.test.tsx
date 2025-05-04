import { render } from 'ink-testing-library'
import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest'
import { InitForm } from './InitForm.js'
import { ConfigGenerator } from '../services/configGenerator.js'

// ConfigGeneratorのメソッドをモック化
const originalCopyBiomeConfig = ConfigGenerator.copyBiomeConfig
const originalCopyTypeScriptConfig = ConfigGenerator.copyTypeScriptConfig
const originalAddBiomeScriptsToPackageJson = ConfigGenerator.addBiomeScriptsToPackageJson

// モック実装
const mockConfigGenerator = {
  copyBiomeConfig: vi.fn().mockResolvedValue(undefined),
  copyTypeScriptConfig: vi.fn().mockResolvedValue(undefined),
  addBiomeScriptsToPackageJson: vi.fn().mockResolvedValue(undefined),
}

// テスト用にConfigGeneratorをオーバーライド
beforeAll(() => {
  ConfigGenerator.copyBiomeConfig = mockConfigGenerator.copyBiomeConfig
  ConfigGenerator.copyTypeScriptConfig = mockConfigGenerator.copyTypeScriptConfig
  ConfigGenerator.addBiomeScriptsToPackageJson = mockConfigGenerator.addBiomeScriptsToPackageJson
})

// テスト後に元の実装を復元
afterAll(() => {
  ConfigGenerator.copyBiomeConfig = originalCopyBiomeConfig
  ConfigGenerator.copyTypeScriptConfig = originalCopyTypeScriptConfig
  ConfigGenerator.addBiomeScriptsToPackageJson = originalAddBiomeScriptsToPackageJson
})

describe('InitForm', () => {
  it('renders the initial UI correctly', () => {
    const { lastFrame } = render(<InitForm />)
    const output = lastFrame()

    expect(output).toMatchInlineSnapshot(`
      "🛠 What do you want to set up?
      > ☐ Biome
        ☐ TypeScript Config

      Use arrow keys to navigate, space to toggle, and enter to confirm."
    `)
  })

  it('shows Biome config options when Biome is selected', () => {
    const { lastFrame, stdin } = render(<InitForm />)

    // Biomeを選択
    stdin.write(' ')

    const output = lastFrame()
    expect(output).toContain('☑ Biome')
    expect(output).toContain('TypeScript (base)')
    expect(output).toContain('Node.js')
    expect(output).toContain('TypeScript + React')
  })

  it('shows TypeScript config options when TypeScript is selected', () => {
    const { lastFrame, stdin } = render(<InitForm />)

    // TypeScriptに移動
    stdin.write('\u001B[B') // 下矢印キー

    // TypeScriptを選択
    stdin.write(' ')

    const output = lastFrame()
    expect(output).toContain('☑ TypeScript Config')
    expect(output).toContain('└─ base')
  })
})
