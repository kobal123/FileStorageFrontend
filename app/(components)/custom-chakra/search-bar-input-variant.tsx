import { inputAnatomy } from '@chakra-ui/anatomy'
import { Input, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const pill = definePartsStyle({
  field: {
    border: '5px solid',
    borderColor: 'gray.200',
    background: 'gray.50',
    borderRadius: 'full',

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
    _hover: {
        background: 'red'
    }
  },
  addon: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.200',
    borderRadius: 'full',
    color: 'gray.500',

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
})

export const inputTheme: any = defineMultiStyleConfig({
  variants: { pill }    
});

// Now we can use the new `pill` variant
