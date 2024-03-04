'use client'
import { BreadcrumbPath } from "@/app/(components)/breadcrumb-path";
import { Button, HStack, Icon, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, StepSeparator, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import FolderCreateModal from "./folder-create-modal";
import { FileMetadata } from "./file-grid";
import Image from "next/image";
import { SelectedFilesContext } from "./file-main-content";
import { AddIcon, ArrowDownIcon, ArrowUpIcon, HamburgerIcon } from "@chakra-ui/icons";
import FileCopyModal from "./file-copy-modal";
import FileMoveModal from "./file-move-modal";
import FileDeleteModal from "./file-delete-modal";
import { BsCopy, BsThreeDots, BsTrash, BsUpload } from "react-icons/bs";
import { IoMoveOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline, MdOutlineFileDownload } from "react-icons/md";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import "./style.css"


export default function FileButtons() {
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState<boolean>(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = useState<boolean>(false);
    const [isCopyModalOpen, setIsCopyModalOpen] = useState<boolean>(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const selectedFiles = useContext(SelectedFilesContext);
    return (
        <HStack>
            <Menu>
                <MenuButton leftIcon={<BsUpload />} style={{ verticalAlign: "middle", textAlign: "center" }} as={Button}>
                    Upload
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => alert('Kagebunshin')}>File</MenuItem>
                    <MenuItem>Folder</MenuItem>
                </MenuList>
            </Menu>



            <Button className="hide-lt-400" leftIcon={<HiOutlineFolderPlus />} onClick={() => setIsCreateFolderOpen(true)}>
                Create folder
            </Button>

            {
                selectedFiles.length > 0 ?
                    <Menu>
                        <MenuButton style={{ verticalAlign: "middle", textAlign: "center" }} as={IconButton} icon={<BsThreeDots />}>
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<MdOutlineFileDownload />}>Download</MenuItem>
                            <MenuItem icon={<IoMoveOutline />} onClick={() => setIsMoveModalOpen(true)}>Move</MenuItem>
                            <MenuItem icon={<BsCopy />} onClick={() => setIsCopyModalOpen(true)}>Copy</MenuItem>
                            <MenuItem className="hide-gt-400" icon={<HiOutlineFolderPlus />} onClick={() => setIsCreateFolderOpen(true)}>
                                Create folder
                            </MenuItem>

                            <MenuDivider />
                            <MenuItem icon={<BsTrash />} onClick={() => setIsDeleteModalOpen(true)}>Delete</MenuItem>
                            <MenuItem icon={<MdDriveFileRenameOutline />} onClick={() => setIsRenameModalOpen(true)}>Rename</MenuItem>
                        </MenuList>
                    </Menu> : <></>
            }


            {isCreateFolderOpen ? <FolderCreateModal isOpen={true} onClose={() => { setIsCreateFolderOpen(false) }} /> : <></>}
            {isCopyModalOpen ? <FileCopyModal isOpen={true} onClose={() => { setIsCopyModalOpen(false) }} /> : <></>}
            {isMoveModalOpen ? <FileMoveModal isOpen={true} onClose={() => { setIsMoveModalOpen(false) }} /> : <></>}
            {isDeleteModalOpen ? <FileDeleteModal isOpen={true} onClose={() => { setIsDeleteModalOpen(false) }} /> : <></>}
            {isRenameModalOpen ? <FileDeleteModal isOpen={true} onClose={() => { setIsRenameModalOpen(false) }} /> : <></>}

        </HStack>
    )
}