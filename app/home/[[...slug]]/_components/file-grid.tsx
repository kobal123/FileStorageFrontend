'use client'
import { Box, Checkbox,Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react";
import Image from "next/image";

export type FileMetadata = {
    name: string;
    size: number;
    isDirectory: boolean;
    lastModified: Date;
    path: string,
    full_path: string
}
import "../style.css"
import { useRouter } from "next/navigation";
import { RowSelectionState } from "@tanstack/react-table";
import { formatBytes } from "@/util/byte-format";
import Link from "next/link";

export interface FileGridProp {
    files: FileMetadata[],
    onItemSelect: any
    selection: RowSelectionState,
    isFetching: boolean
}

function GridSkeleton({ numberOfGrids }: { numberOfGrids: number }) {
    const dummy = Array(numberOfGrids).fill(0);
    console.log(dummy);
    return (
        dummy.map(() => {
            return (<Box className="col folder">
                <Skeleton>
                    <Box className="file-name"></Box>
                </Skeleton>
                <SkeletonText width={'70%'} mt='4' noOfLines={1} skeletonHeight='3' />
            </Box>
            )
        })
    )
}

export default function FileGrid({ files, selection, onItemSelect, isFetching }: FileGridProp) {
    const router = useRouter();
    const doubleClickCallback = (file: FileMetadata) => {
        if (file.isDirectory) {
            router.push("/home" + file.full_path);
        }
    };

    const onClickCallback = (index: number) => {
        onItemSelect(index);
    };
    const isCheckboxHidden = Object.keys(selection).length == 0;
    const { colorMode } = useColorMode();

    return (
        <>
            <div className="file-container">
                <div className="wrapper" id="wrapper">
                    {
                        isFetching ? <GridSkeleton numberOfGrids={4} /> :
                            files.map((file, index) => {
                                return (
                                    <Box className="col folder"
                                        key={file.full_path}
                                        style={{ cursor: 'pointer', position: 'relative' }}
                                        onDoubleClick={() => doubleClickCallback(file)}
                                        onClick={() => onClickCallback(index)}>

                                        <Box
                                            background={colorMode === 'light' ? "#F7EFEF" : "#282828"}
                                            _hover={{ background: '#EEE8E8' }}
                                            _dark={
                                                {
                                                    _hover: {
                                                        background: '#2F2F2F'
                                                    }
                                                }
                                            }
                                            className="file-name">
                                            <Checkbox
                                                size={'lg'}
                                                position={'absolute'}
                                                top={'10px'}
                                                left={'10px'}
                                                type="checkbox"
                                                onChange={() => onItemSelect(index)}
                                                isChecked={Object.hasOwn(selection, index.toString())}
                                                className="file-select"
                                                opacity={isCheckboxHidden ? '0' : '1'}
                                            />

                                            <Image alt="Folder icon" className="folder-icon" width={100} height={100} src={file.isDirectory ? "/folder.svg" : "/file.svg"}>
                                            </Image>
                                        </Box>
                                        <div><Link href={"/home" + file.full_path}>{file.name}</Link> - {formatBytes(file.size)}</div>
                                    </Box>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

