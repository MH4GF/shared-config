import { Box, Text, useInput } from 'ink'
import { useState } from 'react'

interface ConfigOption {
  name: string
  checked: boolean
  subOptions?: SubOption[]
}

interface SubOption {
  name: string
  selected: boolean
}

interface InitFormProps {
  initialConfigs?: ConfigOption[]
}

export function InitForm({ initialConfigs }: InitFormProps = {}): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [configs, setConfigs] = useState<ConfigOption[]>(
    initialConfigs || [
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
        checked: false,
        subOptions: [{ name: 'base', selected: false }],
      },
    ],
  )

  const [focusedSubOption, setFocusedSubOption] = useState<number | null>(null)

  useInput((input, key) => {
    if (key.upArrow) {
      if (focusedSubOption !== null) {
        if (focusedSubOption > 0) {
          setFocusedSubOption(focusedSubOption - 1)
        } else {
          setFocusedSubOption(null)
        }
      } else if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
      }
    } else if (key.downArrow) {
      if (focusedSubOption !== null) {
        const currentConfig = configs[selectedIndex]
        if (currentConfig?.subOptions && focusedSubOption < currentConfig.subOptions.length - 1) {
          setFocusedSubOption(focusedSubOption + 1)
        }
      } else {
        const currentConfig = configs[selectedIndex]
        if (
          currentConfig?.checked &&
          currentConfig.subOptions &&
          currentConfig.subOptions.length > 0
        ) {
          // Move to sub-options if current config is checked
          setFocusedSubOption(0)
        } else if (selectedIndex < configs.length - 1) {
          // Move to next main option
          setSelectedIndex(selectedIndex + 1)
        }
      }
    } else if (input === ' ') {
      if (focusedSubOption !== null) {
        // Handle radio button selection
        setConfigs((prev) => {
          const newConfigs = [...prev]
          const currentConfig = newConfigs[selectedIndex]
          if (currentConfig?.subOptions) {
            // Clear all selections in the group
            currentConfig.subOptions.forEach((option) => {
              option.selected = false
            })
            // Select the focused option
            if (currentConfig.subOptions[focusedSubOption]) {
              currentConfig.subOptions[focusedSubOption].selected = true
            }
          }
          return newConfigs
        })
      } else {
        // Handle checkbox selection
        setConfigs((prev) => {
          const newConfigs = [...prev]
          const currentConfig = newConfigs[selectedIndex]
          if (currentConfig) {
            currentConfig.checked = !currentConfig.checked
            // Clear sub-option focus when unchecking
            if (!currentConfig.checked) {
              setFocusedSubOption(null)
            }
          }
          return newConfigs
        })
      }
    }
  })

  return (
    <Box flexDirection="column">
      <Text>🛠 What do you want to set up?</Text>
      {configs.map((config) => (
        <Box key={config.name} flexDirection="column">
          <Text>
            {config.checked ? '☑' : '☐'} {config.name}
          </Text>
          {config.checked && config.subOptions && (
            <Box flexDirection="column" marginLeft={2}>
              {config.subOptions.map((subOption) => (
                <Text key={subOption.name}>
                  {subOption.selected ? '●' : '○'} {subOption.name}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
