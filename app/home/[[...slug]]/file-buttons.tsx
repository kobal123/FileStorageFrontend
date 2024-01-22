'use client'
import { Button, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";


function createFolderModal({ isOpen, onOpen, onClose }) {
    let folderName = "";


    const createFolder = () => {
        alert("folder name: " + folderName)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <Input type="text" onChange={(event) => folderName = event.target.value}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={createFolder}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}


export default function FileButtons() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack>
            <Menu>
                <MenuButton style={{ verticalAlign: "middle", textAlign: "center" }} as={Button}>
                    Upload
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => alert('Kagebunshin')}>File</MenuItem>
                    <MenuItem>Folder</MenuItem>
                </MenuList>
            </Menu>

            <Button onClick={onOpen}>Create folder</Button>
            {isOpen ? createFolderModal({ isOpen, onOpen, onClose }) : <></>}
        </HStack>
    )
}