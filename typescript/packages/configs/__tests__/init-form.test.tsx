import { render } from 'ink-testing-library'
import { describe, expect, it } from 'vitest'
import { InitForm } from '../src/ui/InitForm.js'

describe('InitForm component', () => {
  it('should render with no options selected initially', () => {
    const { lastFrame } = render(<InitForm />)

    // 初期状態では何も選択されていない
    expect(lastFrame()).toContain('☐ Biome')
    expect(lastFrame()).toContain('☐ TypeScript Config')

    // Biomeのサブオプションは表示されていない（親が選択されていないため）
    expect(lastFrame()).not.toContain('○ TypeScript')
    expect(lastFrame()).not.toContain('○ TypeScript + React')

    // TypeScript Configのサブオプションも表示されていない
    expect(lastFrame()).not.toContain('base')
  })

  it('should show Biome sub-options when Biome is checked', () => {
    const configsWithBiomeChecked = [
      {
        name: 'Biome',
        checked: true,
        subOptions: [
          { name: 'TypeScript', selected: false },
          { name: 'TypeScript + React', selected: false },
        ],
      },
      {
        name: 'TypeScript Config',
        checked: false,
        subOptions: [{ name: 'base', selected: false }],
      },
    ]

    const { lastFrame } = render(<InitForm initialConfigs={configsWithBiomeChecked} />)

    // Biomeがチェックされている
    expect(lastFrame()).toContain('☑ Biome')

    // Biomeのサブオプションが表示される
    expect(lastFrame()).toContain('○ TypeScript')
    expect(lastFrame()).toContain('○ TypeScript + React')

    // デフォルトでは何も選択されていない（○ラジオボタン）
    expect(lastFrame()).not.toContain('● TypeScript')
    expect(lastFrame()).not.toContain('● TypeScript + React')
  })

  it('should show TypeScript Config sub-options when TypeScript Config is checked', () => {
    const configsWithTsConfigChecked = [
      {
        name: 'Biome',
        checked: false,
        subOptions: [
          { name: 'TypeScript', selected: false },
          { name: 'TypeScript + React', selected: false },
        ],
      },
      {
        name: 'TypeScript Config',
        checked: true,
        subOptions: [{ name: 'base', selected: false }],
      },
    ]

    const { lastFrame } = render(<InitForm initialConfigs={configsWithTsConfigChecked} />)

    // TypeScript Configがチェックされている
    expect(lastFrame()).toContain('☑ TypeScript Config')

    // TypeScript Configのサブオプションが表示される
    expect(lastFrame()).toContain('○ base')

    // デフォルトでは何も選択されていない（○ラジオボタン）
    expect(lastFrame()).not.toContain('● base')
  })

  it('should allow exclusive selection within radio button groups', () => {
    const configsWithRadioSelected = [
      {
        name: 'Biome',
        checked: true,
        subOptions: [
          { name: 'TypeScript', selected: false },
          { name: 'TypeScript + React', selected: true },
        ],
      },
      {
        name: 'TypeScript Config',
        checked: false,
        subOptions: [{ name: 'base', selected: false }],
      },
    ]

    const { lastFrame } = render(<InitForm initialConfigs={configsWithRadioSelected} />)

    // TypeScript + Reactが選択されている
    expect(lastFrame()).toContain('● TypeScript + React')

    // TypeScriptは選択されていない（○で表示）
    expect(lastFrame()).toContain('○ TypeScript')

    // 確認: ● TypeScript（単体）の行がないことを確認
    const lines = lastFrame()?.split('\n') || []
    const typeScriptLine = lines.find(
      (line) => line.includes('TypeScript') && !line.includes('React'),
    )
    expect(typeScriptLine).toContain('○')
  })
})
