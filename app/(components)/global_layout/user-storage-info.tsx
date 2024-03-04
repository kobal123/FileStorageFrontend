'use client'

import { Box, Progress } from "@chakra-ui/react"

export interface UserStorageInformation {
    max_bytes: number,
    used_bytes: number
}

function UserStorageComponent() {
    // 'use client'

    // console.log('HELLO CLIENT!');
    return (
        <div>hello from client component</div>
    )
}


export default function UserStorageInfo() {
    return (
        <Box paddingLeft={'10px'} paddingRight={'10px'}>
            Storage

            20.44 MB used of 2 GB
            <Progress value={70}></Progress>
        </Box>
    )
}