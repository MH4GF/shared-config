import { render } from 'ink-testing-library'
import { describe, expect, it } from 'vitest'
import { InitForm } from './InitForm.js'

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
})
