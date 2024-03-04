
/*
 <BreadcrumbPath 
            paths={['a','b','c']}
            max_visible_items={4}
            paths_decoded={true}
            onClickHandler={(e, path) => {
                console.log(`clicked path ${path}`)
            }}></BreadcrumbPath>
*/

import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";

export interface FolderCreateModalProps {
    isOpen: boolean,
    onOpen?: () => any,
    onClose?: () => any
}

export default function FolderCreateModal({isOpen, onOpen = () => {}, onClose = () => {}}: FolderCreateModalProps) {
    const initialRef = useRef(null)
    const [folderName, setFolderName] = useState<string>("");
    const createFolder = () => {
        alert("folder name: " + folderName)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create folder</ModalHeader>           
          <ModalCloseButton />
          <ModalBody>
                <Input ref={initialRef} type="text" onChange={(event) => setFolderName(event.target.value)}></Input>
          </ModalBody>
          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' isDisabled={folderName.length == 0} onClick={createFolder}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}