'use client'

import { FileMetadata } from "./file-grid";
import { List, ListIcon, ListItem, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fileMetadataService } from "@/service/filemetadata/fileservice-provider";
import { FaFile, FaFolder } from "react-icons/fa";


export interface FileModalBodyProps {
    onSelectCallback?: (newPath: string) => void,
    _path: string[]
}
export default function FileModalBody({onSelectCallback = () => {}, _path}: FileModalBodyProps) {
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
    const [directoryToList, setdirectoryToList] = useState<FileMetadata | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const {colorMode} = useColorMode();

    useEffect(() => {
        if (directoryToList != null) {
            fileMetadataService.listDirectory(directoryToList.full_path)
            .then(filemetadata => {
                setFiles(filemetadata);
                setIsFetching(false);
                onSelectCallback(directoryToList.full_path);
                setdirectoryToList(null);
            });

        } else {
            fileMetadataService.listDirectory("/" + _path.join("/"))
            .then(filemetadata => {
                setFiles(filemetadata);
                setIsFetching(false);
            });
        }

    }, [_path]);

    return (
        <>
            <List gap={'2px'} height={'150px'} padding={'5px'} overflowY={'auto'}>
                {files.filter(file => file.isDirectory).map(file => {
                    return (

                        <ListItem
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            tabIndex={0}
                            cursor={'pointer'}
                            border={file === selectedFile ? '2px solid #6D6AF9' : '2px solid transparent'}
                            _hover={
                                {
                                    background: colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'
                                }
                            }
                            key={file.full_path}
                            onDoubleClick={() => {setIsFetching(true); setdirectoryToList(file); setSelectedFile(null)}}
                            onClick={() => {
                                // setIsFetching(true);
                                setSelectedFile(file);
                            }}>
                                <ListIcon as={FaFolder}></ListIcon>
                            <span>{file.name}</span>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}