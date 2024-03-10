'use client'

import { userservice } from "@/service/user/userservice-provider"
import { formatBytes } from "@/util/byte-format"
import { Box, Progress, Text, VStack } from "@chakra-ui/react"




export default function UserStorageInfo() {

    const storageInfo = userservice.getStorageInfo();

    return (
        <Box paddingLeft={'10px'} paddingRight={'10px'} >
            <VStack >
                <Text fontSize={'1.5rem'}>Storage</Text>
                <Text>{`${formatBytes(storageInfo.used_bytes)} used of ${formatBytes(storageInfo.max_bytes)}`}</Text>
            </VStack>
            <Progress marginTop={'5px'} value={(storageInfo.used_bytes / storageInfo.max_bytes)*100}></Progress>
        </Box>
    )
}