'use client'
import { Button, Highlight, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CurrentPathContext, SelectedFilesContext } from "./file-main-content";
import { FileMetadataService } from "@/service/filemetadata/fileservice-interface";
import { fileMetadataService } from "@/service/filemetadata/fileservice-provider";

export interface FileDeleteModalProps {
    isOpen: boolean,
    onOpen?: () => any,
    onClose?: () => any
}

export default function FileDeleteModal({ isOpen, onOpen = () => { }, onClose = () => { } }: FileDeleteModalProps) {
    const selectedItems = useContext(SelectedFilesContext);
    const path = useContext(CurrentPathContext);

    const deleteFile = () => {
        fileMetadataService.deleteFile("/" + path.join("/"))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedItems.length == 1 ? 'Delete file?' : `Delete ${selectedItems.length} files?`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedItems.length == 1 ?
                        <>Are you sure you want to delete <b>{selectedItems[0].name}</b>?</> :
                        <>Are you sure you want to delete {selectedItems.length} items?</>}
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={deleteFile}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}