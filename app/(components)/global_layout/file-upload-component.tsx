'use client'
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Box, Flex, CloseButton, Button, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { fileMetadataService } from '@/service/filemetadata/fileservice-provider';
import { FileMetadata } from '@/app/home/[[...slug]]/_components/file-grid';


interface UploadContextProps {
    upload: (path: string, file: File) => void,
    items: FileMetadata[],
    setItems: Dispatch<SetStateAction<FileMetadata[]>>
}

export const UploadContext = createContext<UploadContextProps>({ upload: (file, path) => { }, items: [], setItems: () => { } });


interface CustomResponse {
    data: FileMetadata;
}

function UploadComponent({ path, file }: { path: string, file: File }) {
    const uploadContext = useContext(UploadContext);
    const [uploadPercent, setUploadPercent] = useState<number>(0);

    useEffect(() => {
        const upload = async () => {
            await fileMetadataService.uploadFile(path, file, {
                onUploadProgress: (progressEvent) => {
                    const total: number = progressEvent.total || 1;
                    const progress = Math.round((progressEvent.loaded * 100) / total);
                    setUploadPercent(progress);
                }
            }).then((res) => {
                
                // const files = req.data;
                // console.log('setting file ' + JSON.stringify(data))
                uploadContext.setItems((prevState) => [...prevState, res.data])
                })
                .catch((error) => {
                    console.log('error: ' + error);
                });
        }
        upload();
    }, [])



    return (
        <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Text>{file.name}</Text>
            <CircularProgress size={'40px'} value={uploadPercent}>
                <CircularProgressLabel>{`${uploadPercent}%`}</CircularProgressLabel>
            </CircularProgress>
        </Flex >
    )
}




export const FloatingComponent = ({ children }: Readonly<{
    children: React.ReactNode,
}>) => {
    const [expanded, setExpanded] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [_children, setChildren] = useState<React.JSX.Element[]>([]);
    const [uploadedItems, setUploadedItems] = useState<FileMetadata[]>([]);
    const handleExpandToggle = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleClose = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const addChild = (path: string, file: File) => {
        setChildren((previous) => [...previous, <UploadComponent file={file} path={path} />]);
    }


    return (

        <UploadContext.Provider value={{ upload: addChild, items: uploadedItems, setItems: setUploadedItems }}>
            {<Box
                position="fixed"
                bottom={0}
                right={'100px'}
                w={'350px'}
                bgColor="teal.500"
                color="white"
                maxH={'350px'}
                transition="border-radius 0.3s"
                cursor="pointer"
                tabIndex={0}
                display={hidden ? 'none' : ''}
                zIndex={10000}
            >
                <Flex
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flex={1}
                    h={'50px'}
                    onClick={handleExpandToggle}
                >
                    File uploads
                    <Flex alignItems={'center'}>
                        {expanded ? <GoChevronDown /> : <GoChevronUp />}
                        <CloseButton onClick={handleClose}></CloseButton>
                    </Flex>
                </Flex>
                {(
                    <Flex
                        display={expanded ? 'none' : ''}
                        flexDir={'column'}
                        bgColor="teal.700"
                        maxWidth={'350px'}
                        w={'350px'}
                        maxH={'300px'}
                        overflowY={'auto'}
                    >
                        {_children}
                    </Flex>
                )}
            </Box>}

            {children}
        </UploadContext.Provider>
    );
};