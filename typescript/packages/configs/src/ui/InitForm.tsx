import { Box, Text } from 'ink'
import type React from 'react'

interface InitFormProps {
  onComplete: (selections: string[]) => void
}

export const InitForm: React.FC<InitFormProps> = ({ onComplete: _onComplete }: InitFormProps) => {
  return (
    <Box flexDirection="column">
      <Text>🛠 What do you want to set up?</Text>
      <Text>TODO: Implement checkbox selection UI</Text>
    </Box>
  )
}
