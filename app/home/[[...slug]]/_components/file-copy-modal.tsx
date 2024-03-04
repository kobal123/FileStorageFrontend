'use client'



import { BreadcrumbPath } from "@/app/(components)/breadcrumb-path";
import { createDirectory } from "@/service/filemetadata/fileservice-interface";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedFilesContext } from "./file-main-content";

export interface FileCopyModalProps {
  isOpen: boolean,
  onOpen?: () => any,
  onClose?: () => any
}

export default function FileCopyModal({ isOpen, onOpen = () => { }, onClose = () => { } }: FileCopyModalProps) {
  const selectedItems = useContext(SelectedFilesContext);
  const copy = () => {
    alert("Moving following files: " + JSON.stringify(selectedItems));
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Copying {selectedItems.length} {selectedItems.length == 1 ? 'item' : 'items'}</ModalHeader>
        <ModalCloseButton />
          
        
        <ModalBody>
        <BreadcrumbPath
          paths={['a', 'b', 'c']}
          max_visible_items={4}
          paths_decoded={true}
          onClickHandler={(e, path) => {
            console.log(`clicked path ${path}`)
          }}></BreadcrumbPath>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant='ghost' onClick={copy}>Copy</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}