'use client'
import { Flex, Text, useColorMode } from "@chakra-ui/react";
import ColorModeSensitiveBox from "./(components)/custom-chakra/color-mode-box";

export default function Custom404() {

  return (
    <ColorModeSensitiveBox width={'100%'} height={'100%'} >
      <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'} >
        <Text>
          404 - Page could not be found.
        </Text>
      </Flex>
    </ColorModeSensitiveBox>
  )
}