import { Box, Text, useInput } from 'ink'
import type React from 'react'
import { useState } from 'react'

// キー入力の処理を別関数に分割
function handleKeyInput(
  input: string,
  key: { upArrow?: boolean; downArrow?: boolean; return?: boolean },
  state: {
    currentFocus: number
    selectedBiome: boolean
    selectedTypeScript: boolean
  },
  handlers: {
    setCurrentFocus: (value: number) => void
    setSelectedBiome: (value: boolean) => void
    setSelectedTypeScript: (value: boolean) => void
    setIsDone: (value: boolean) => void
  },
) {
  const { currentFocus, selectedBiome, selectedTypeScript } = state
  const { setCurrentFocus, setSelectedBiome, setSelectedTypeScript, setIsDone } = handlers

  // 上キーでフォーカスを上に移動
  if (key.upArrow) {
    setCurrentFocus(Math.max(0, currentFocus - 1))
    return
  }

  // 下キーでフォーカスを下に移動
  if (key.downArrow) {
    setCurrentFocus(Math.min(1, currentFocus + 1))
    return
  }

  // スペースキーで項目を選択/選択解除
  if (input === ' ') {
    if (currentFocus === 0) {
      setSelectedBiome(!selectedBiome)
    } else if (currentFocus === 1) {
      setSelectedTypeScript(!selectedTypeScript)
    }
    return
  }

  // Enterキーで確定
  if (key.return && (selectedBiome || selectedTypeScript)) {
    setIsDone(true)
  }
}

// 完了画面のレンダリング
function DoneScreen({
  selectedBiome,
  selectedTypeScript,
}: { selectedBiome: boolean; selectedTypeScript: boolean }) {
  return (
    <Box flexDirection="column">
      <Text>✅ Configuration files installed successfully!</Text>
      <Text>Selected configurations:</Text>
      {selectedBiome && <Text> - Biome</Text>}
      {selectedTypeScript && <Text> - TypeScript Config</Text>}
    </Box>
  )
}

export const InitForm: React.FC = () => {
  const [selectedBiome, setSelectedBiome] = useState(false)
  const [selectedTypeScript, setSelectedTypeScript] = useState(false)
  const [currentFocus, setCurrentFocus] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useInput((input, key) => {
    handleKeyInput(
      input,
      key,
      { currentFocus, selectedBiome, selectedTypeScript },
      { setCurrentFocus, setSelectedBiome, setSelectedTypeScript, setIsDone },
    )
  })

  if (isDone) {
    return <DoneScreen selectedBiome={selectedBiome} selectedTypeScript={selectedTypeScript} />
  }

  return (
    <Box flexDirection="column">
      <Text>🛠 What do you want to set up?</Text>
      <Text>
        {currentFocus === 0 ? '>' : ' '} {selectedBiome ? '☑' : '☐'} Biome
      </Text>
      {selectedBiome && (
        <>
          <Text> └─ TypeScript</Text>
          <Text> └─ TypeScript + React</Text>
        </>
      )}
      <Text>
        {currentFocus === 1 ? '>' : ' '} {selectedTypeScript ? '☑' : '☐'} TypeScript Config
      </Text>
      {selectedTypeScript && <Text> └─ base</Text>}
      <Box marginTop={1}>
        <Text>Use arrow keys to navigate, space to toggle, and enter to confirm.</Text>
      </Box>
    </Box>
  )
}
