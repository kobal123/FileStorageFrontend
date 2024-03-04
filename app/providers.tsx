// app/providers.tsx
'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export function CustomChakraProvider({ children }: { children: React.ReactNode }) {
    const styles = {
        global: (props: any) => ({
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('#FFFCFC', '#131313')(props),
                lineHeight: 'base',
            },
            '*::placeholder': {
                color: mode('gray.400', 'whiteAlpha.400')(props),
            },
            '*, *::before, &::after': {
                borderColor: mode('gray.200', 'whiteAlpha.300')(props),
                wordWrap: 'break-word',
            },
        }),

    }

    const theme = extendTheme(
        {
            styles,
            components: {
                Checkbox: {
                    baseStyle: {
                        control: {
                            border: 'none',
                            _checked: {
                                background: 'black',
                                border: 'black'
                            },
                            _dark: {
                                _checked: {
                                    background: 'white',
                                    border: 'white'
                                }
                            }
                        },
                        container: {
                            border: '1px solid black',
                            _dark: {
                                border: '1px solid white',
                                _hover: {
                                    backgroundColor: 'whiteAlpha.400'
                                }
                            },
                            _hover: {
                                backgroundColor: 'blackAlpha.100'
                            }
                        },

                    }
                },
                Button: {
                    baseStyle: {
                        _light: {
                            background: 'blackAlpha.100',
                            _hover: {
                                background: 'blackAlpha.200',
                            }
                        },
                        _dark: {
                            background: 'whiteAlpha.200',
                            _hover: {
                                background: 'whiteAlpha.300',
                            }
                        }
                    },
                    colorScheme:{
                        blue:{
                            background:'blue'
                        }
                    }
                }
            }
        }
    )
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}