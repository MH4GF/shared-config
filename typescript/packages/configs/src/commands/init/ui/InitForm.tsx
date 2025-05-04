import { Box, Text, useInput } from 'ink'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { BiomeConfigType, TypeScriptConfigType } from '../services/configGenerator.js'
import { ConfigGenerator } from '../services/configGenerator.js'

// UIの状態タイプ
type InitFormState = {
  selectedBiome: boolean
  selectedTypeScript: boolean
  biomeFocus: number
  biomeConfig: BiomeConfigType
  tsConfig: TypeScriptConfigType
  currentFocus: number
  isDone: boolean
  isProcessing: boolean
  processingStatus: string
}

// キー入力の種類ごとに処理を分割
type KeyHandlerState = Pick<
  InitFormState,
  'currentFocus' | 'selectedBiome' | 'selectedTypeScript' | 'biomeFocus' | 'biomeConfig'
>

type KeyHandlerHandlers = {
  setCurrentFocus: (value: number) => void
  setSelectedBiome: (value: boolean) => void
  setSelectedTypeScript: (value: boolean) => void
  setBiomeFocus: (value: number) => void
  setBiomeConfig: (value: BiomeConfigType) => void
  setIsDone: (value: boolean) => void
}

// 上キー処理
function handleUpArrow(
  state: KeyHandlerState,
  handlers: Pick<KeyHandlerHandlers, 'setCurrentFocus' | 'setBiomeFocus'>,
): void {
  const { currentFocus, selectedBiome, biomeFocus } = state
  const { setCurrentFocus, setBiomeFocus } = handlers

  if (currentFocus === 0 && selectedBiome && biomeFocus > 0) {
    // Biomeのサブメニュー内での移動
    setBiomeFocus(Math.max(0, biomeFocus - 1))
  } else {
    // メインメニューでの移動
    setCurrentFocus(Math.max(0, currentFocus - 1))
  }
}

// 下キー処理
function handleDownArrow(
  state: KeyHandlerState,
  handlers: Pick<KeyHandlerHandlers, 'setCurrentFocus' | 'setBiomeFocus'>,
): void {
  const { currentFocus, selectedBiome, biomeFocus } = state
  const { setCurrentFocus, setBiomeFocus } = handlers

  if (currentFocus === 0 && selectedBiome && biomeFocus < 2) {
    // Biomeのサブメニュー内での移動
    setBiomeFocus(Math.min(2, biomeFocus + 1))
  } else {
    // メインメニューでの移動
    setCurrentFocus(Math.min(1, currentFocus + 1))
  }
}

// 左右キー処理
function handleLeftRightArrow(
  key: { leftArrow?: boolean; rightArrow?: boolean },
  state: KeyHandlerState,
  handlers: Pick<KeyHandlerHandlers, 'setBiomeConfig'>,
): void {
  const { currentFocus, selectedBiome, biomeFocus, biomeConfig } = state
  const { setBiomeConfig } = handlers

  // Biomeのサブメニューでのみ有効
  if (currentFocus !== 0 || !selectedBiome || biomeFocus <= 0) {
    return
  }

  if (key.leftArrow) {
    // 左キーで前のタイプに移動
    if (biomeConfig === 'nodejs') {
      setBiomeConfig('base')
    } else if (biomeConfig === 'react') {
      setBiomeConfig('nodejs')
    }
  } else if (key.rightArrow) {
    // 右キーで次のタイプに移動
    if (biomeConfig === 'base') {
      setBiomeConfig('nodejs')
    } else if (biomeConfig === 'nodejs') {
      setBiomeConfig('react')
    }
  }
}

// スペースキー処理
function handleSpaceKey(
  state: KeyHandlerState,
  handlers: Pick<KeyHandlerHandlers, 'setSelectedBiome' | 'setSelectedTypeScript'>,
): void {
  const { currentFocus, selectedBiome, selectedTypeScript } = state
  const { setSelectedBiome, setSelectedTypeScript } = handlers

  if (currentFocus === 0) {
    setSelectedBiome(!selectedBiome)
  } else if (currentFocus === 1) {
    setSelectedTypeScript(!selectedTypeScript)
  }
}

// Enter処理
function handleEnterKey(
  state: KeyHandlerState,
  handlers: Pick<KeyHandlerHandlers, 'setIsDone'>,
): void {
  const { selectedBiome, selectedTypeScript } = state
  const { setIsDone } = handlers

  if (selectedBiome || selectedTypeScript) {
    setIsDone(true)
  }
}

// キー入力の入口関数
function handleKeyInput(
  input: string,
  key: {
    upArrow?: boolean
    downArrow?: boolean
    return?: boolean
    leftArrow?: boolean
    rightArrow?: boolean
  },
  state: KeyHandlerState,
  handlers: KeyHandlerHandlers,
): void {
  // 上キー
  if (key.upArrow) {
    handleUpArrow(state, handlers)
    return
  }

  // 下キー
  if (key.downArrow) {
    handleDownArrow(state, handlers)
    return
  }

  // 左右キー
  if (key.leftArrow || key.rightArrow) {
    handleLeftRightArrow(key, state, handlers)
    return
  }

  // スペースキー
  if (input === ' ') {
    handleSpaceKey(state, handlers)
    return
  }

  // Enterキー
  if (key.return) {
    handleEnterKey(state, handlers)
  }
}

// 完了画面のレンダリング
function DoneScreen({
  selectedBiome,
  selectedTypeScript,
  biomeConfig,
  status,
}: {
  selectedBiome: boolean
  selectedTypeScript: boolean
  biomeConfig: BiomeConfigType
  status: string
}) {
  return (
    <Box flexDirection="column">
      <Text>✅ Configuration files installed successfully!</Text>
      <Text>Selected configurations:</Text>
      {selectedBiome && <Text> - Biome ({biomeConfig})</Text>}
      {selectedTypeScript && <Text> - TypeScript Config (base)</Text>}
      {status && <Text>{status}</Text>}
    </Box>
  )
}

// プロセス中画面のレンダリング
function ProcessingScreen({ status }: { status: string }) {
  return (
    <Box flexDirection="column">
      <Text>⏳ Installing configurations...</Text>
      <Text>{status}</Text>
    </Box>
  )
}

// 選択画面のレンダリング
function SelectionScreen({
  currentFocus,
  biomeFocus,
  selectedBiome,
  selectedTypeScript,
  biomeConfig,
}: {
  currentFocus: number
  biomeFocus: number
  selectedBiome: boolean
  selectedTypeScript: boolean
  biomeConfig: BiomeConfigType
}) {
  return (
    <Box flexDirection="column">
      <Text>🛠 What do you want to set up?</Text>
      <Text>
        {currentFocus === 0 && biomeFocus === 0 ? '>' : ' '} {selectedBiome ? '☑' : '☐'} Biome
      </Text>
      {selectedBiome && (
        <BiomeOptions
          currentFocus={currentFocus}
          biomeFocus={biomeFocus}
          biomeConfig={biomeConfig}
        />
      )}
      <Text>
        {currentFocus === 1 ? '>' : ' '} {selectedTypeScript ? '☑' : '☐'} TypeScript Config
      </Text>
      {selectedTypeScript && <Text> └─ base</Text>}
      <InstructionsFooter selectedBiome={selectedBiome} />
    </Box>
  )
}

// Biomeのオプション表示
function BiomeOptions({
  currentFocus,
  biomeFocus,
  biomeConfig,
}: {
  currentFocus: number
  biomeFocus: number
  biomeConfig: BiomeConfigType
}) {
  return (
    <>
      <Text>
        {currentFocus === 0 && biomeFocus === 1 ? '>' : ' '} └─ {biomeConfig === 'base' ? '●' : '○'}{' '}
        TypeScript (base)
      </Text>
      <Text>
        {currentFocus === 0 && biomeFocus === 2 ? '>' : ' '} └─{' '}
        {biomeConfig === 'nodejs' ? '●' : '○'} Node.js
      </Text>
      <Text>
        {currentFocus === 0 && biomeFocus === 3 ? '>' : ' '} └─{' '}
        {biomeConfig === 'react' ? '●' : '○'} TypeScript + React
      </Text>
    </>
  )
}

// 操作説明フッター
function InstructionsFooter({ selectedBiome }: { selectedBiome: boolean }) {
  return (
    <Box marginTop={1}>
      <Text>Use arrow keys to navigate, space to toggle, enter to confirm.</Text>
      {selectedBiome && <Text>Use left/right arrows to select Biome configuration type.</Text>}
    </Box>
  )
}

export const InitForm: React.FC = () => {
  const [selectedBiome, setSelectedBiome] = useState(false)
  const [selectedTypeScript, setSelectedTypeScript] = useState(false)
  const [biomeFocus, setBiomeFocus] = useState(0)
  const [biomeConfig, setBiomeConfig] = useState<BiomeConfigType>('base')
  const [_tsConfig] = useState<TypeScriptConfigType>('base')
  const [currentFocus, setCurrentFocus] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState('')

  // Biome設定のインストール
  const installBiomeConfig = useCallback(
    async (
      configType: BiomeConfigType,
      statusUpdater: (message: string) => void,
    ): Promise<void> => {
      statusUpdater('Installing Biome configuration...')
      await ConfigGenerator.copyBiomeConfig(configType)
      await ConfigGenerator.addBiomeScriptsToPackageJson()
    },
    [],
  )

  // TypeScript設定のインストール
  const installTypeScriptConfig = useCallback(
    async (
      configType: TypeScriptConfigType,
      statusUpdater: (message: string) => void,
    ): Promise<void> => {
      statusUpdater('Installing TypeScript configuration...')
      await ConfigGenerator.copyTypeScriptConfig(configType)
    },
    [],
  )

  // 選択が完了したときの処理
  const handleDone = useCallback(async () => {
    if (!(selectedBiome || selectedTypeScript)) {
      return
    }

    setIsProcessing(true)

    try {
      // Biome設定のインストール
      if (selectedBiome) {
        await installBiomeConfig(biomeConfig, setProcessingStatus)
      }

      // TypeScript設定のインストール
      if (selectedTypeScript) {
        await installTypeScriptConfig('base', setProcessingStatus)
      }

      setProcessingStatus('All configurations installed successfully!')
    } catch (error) {
      setProcessingStatus(`Error: ${(error as Error).message}`)
    } finally {
      setIsProcessing(false)
    }
  }, [selectedBiome, selectedTypeScript, biomeConfig, installBiomeConfig, installTypeScriptConfig])

  // 選択完了時の処理を実行
  useEffect(() => {
    // すでに処理中、または何も選択されていない場合は何もしない
    if (!isDone || isProcessing) {
      return
    }

    // 直接handleDoneを呼び出し（エラーは内部で処理済み）
    handleDone().catch(() => {
      // handleDone内で既にエラーハンドリング済み
    })
  }, [handleDone, isDone, isProcessing])

  useInput((input, key) => {
    if (isProcessing) {
      return
    }

    handleKeyInput(
      input,
      key,
      { currentFocus, selectedBiome, selectedTypeScript, biomeFocus, biomeConfig },
      {
        setCurrentFocus,
        setSelectedBiome,
        setSelectedTypeScript,
        setBiomeFocus,
        setBiomeConfig,
        setIsDone,
      },
    )
  })

  if (isProcessing) {
    return <ProcessingScreen status={processingStatus} />
  }

  if (isDone) {
    return (
      <DoneScreen
        selectedBiome={selectedBiome}
        selectedTypeScript={selectedTypeScript}
        biomeConfig={biomeConfig}
        status={processingStatus}
      />
    )
  }

  return (
    <SelectionScreen
      currentFocus={currentFocus}
      biomeFocus={biomeFocus}
      selectedBiome={selectedBiome}
      selectedTypeScript={selectedTypeScript}
      biomeConfig={biomeConfig}
    />
  )
}
