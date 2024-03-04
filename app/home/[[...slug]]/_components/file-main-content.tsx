'use client'
import { createContext, useContext, useEffect, useState } from "react"
import FileButtons from "./file-buttons"
import FileGrid, { FileMetadata } from "./file-grid"
import { Box, Checkbox, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Skeleton, Spacer, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, useColorModeValue, useTheme } from "@chakra-ui/react"
import { BreadcrumbPath } from "@/app/(components)/breadcrumb-path"
import FileTable from "./file-table"
import { RowSelectionState } from "@tanstack/react-table"
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import { FaList } from "react-icons/fa"
import ColorModeSensitiveBox from "@/app/(components)/custom-chakra/color-mode-box"
import { fileMetadataService } from "@/service/filemetadata/fileservice-provider"

export interface MainContentProps {
    // files: FileMetadata[],
    path: string[]
}

export const SelectedFilesContext = createContext<FileMetadata[]>([]);
export const AllFilesContext = createContext<FileMetadata[]>([]);
export const CurrentPathContext = createContext<string[]>([]);
export default function MainContent({ path }: MainContentProps) {
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<RowSelectionState>({});
    const [renderAsGrid, setRenderAsGrid] = useState<boolean>(true);
    const selectedFileMetadata: FileMetadata[] = Object.keys(selectedItems).map(key => files[parseInt(key)]);
    const allItemsChecked: boolean = selectedFileMetadata.length == files.length;
    const indeterminate = selectedFileMetadata.length > 0 && !allItemsChecked;

    useEffect(() => {

        fileMetadataService.listDirectory("/" + path.join("/")).then(file => {
            setFiles(file);
            setIsFetching(false);
        });
    }, []);

    const onItemSelect = (index: number) => {
        setSelectedItems(prevState => {
            const idx: string = index.toString();
            if (prevState[idx]) {
                const { [idx]: _, ...rest } = prevState;
                return rest;
            } else {
                return {
                    ...prevState,
                    [index.toString()]: true
                }
            }
        })
    };


    return (
        <AllFilesContext.Provider value={files}>
            <SelectedFilesContext.Provider value={selectedFileMetadata}>
                <CurrentPathContext.Provider value={path}>
                    <Box  >
                        <ColorModeSensitiveBox marginBottom='10px' style={{ position: "sticky", top: 0, zIndex: 3, }}>

                            <BreadcrumbPath style={{ padding: '5px' }} paths={path} max_visible_items={4} paths_decoded={false} />
                            <HStack padding={"5px"} paddingBottom={"6px"}>
                                <FileButtons />
                                <Spacer />
                                {
                                    selectedFileMetadata.length > 0 ?
                                        <span>
                                            {`${selectedFileMetadata.length} selected`}
                                        </span> : <></>
                                }
                                <Checkbox size={'lg'}
                                    isIndeterminate={indeterminate}
                                    colorScheme="gray"
                                    onChange={() => {
                                        if (indeterminate) {
                                            setSelectedItems(files.reduce((accumulator: RowSelectionState, _, index) => (accumulator[index.toString()] = true, accumulator), {}))
                                        } else {
                                            if (Object.keys(selectedItems).length == 0) {
                                                setSelectedItems(files.reduce((accumulator: RowSelectionState, _, index) => (accumulator[index.toString()] = true, accumulator), {}))
                                            } else {
                                                setSelectedItems({})
                                            }
                                        }
                                    }}
                                ></Checkbox>
                                <Menu>
                                    <MenuButton as={IconButton} icon={renderAsGrid ? <BsFillGrid3X3GapFill /> : <FaList />}>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => setRenderAsGrid(false)} icon={<FaList />}>
                                            List
                                        </MenuItem>
                                        <MenuItem onClick={() => setRenderAsGrid(true)} icon={<BsFillGrid3X3GapFill />}>
                                            Grid
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                        </ColorModeSensitiveBox>
                        <Box>
                            {
                                renderAsGrid ?
                                    <FileGrid isFetching={isFetching} files={files} selection={selectedItems} onItemSelect={onItemSelect}></FileGrid> :
                                    <FileTable files={files} selection={selectedItems} selectionCallback={setSelectedItems}></FileTable>
                            }
                        </Box>
                    </Box>
                </CurrentPathContext.Provider>
            </SelectedFilesContext.Provider>
        </AllFilesContext.Provider>
    )
}