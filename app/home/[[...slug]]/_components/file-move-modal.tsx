



import { BreadcrumbPath } from "@/app/(components)/breadcrumb-path";
import { createDirectory } from "@/service/filemetadata/fileservice-interface";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CurrentPathContext, SelectedFilesContext } from "./file-main-content";
import FileModalBody from "./copy-move-modal-body";
import { fileMetadataService } from "@/service/filemetadata/fileservice-provider";
import { FileMetadata } from "./file-grid";

export interface FileMoveModalProps {
	isOpen: boolean,
	onOpen?: () => any,
	onClose?: () => any
}

export default function FileMoveModal({ isOpen, onOpen = () => { }, onClose = () => { } }: FileMoveModalProps) {

	const selectedItems: FileMetadata[] = useContext(SelectedFilesContext);
	const path: string[] = useContext(CurrentPathContext);
	const [currentPath, setCurrentPath] = useState<string[]>(path);
	const [moveToDirectory, setMoveToDirectory] = useState<FileMetadata | null>(null);
	const move = () => {
		if (moveToDirectory) {
			fileMetadataService.moveFile("/" + path.join("/"), moveToDirectory?.full_path);
		}
	}


	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Move</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<BreadcrumbPath
						paths={currentPath}
						max_visible_items={4}
						paths_decoded={true}
						onClickHandler={(e, pathSegment) => {
							const pathUpToSelectedPath: string[] = [];
							for (const currentPathSegment of currentPath) {
								if (currentPathSegment === pathSegment) {
									pathUpToSelectedPath.push(currentPathSegment);
									break;
								}
								if (currentPathSegment.length == 0) continue;
								pathUpToSelectedPath.push(currentPathSegment);
							}
							setCurrentPath(pathUpToSelectedPath);
						}} />

					<FileModalBody _path={currentPath} onSelectCallback={
						(newPath: string) => {
							const temp: string[] = newPath.split("/");
							setCurrentPath(temp.filter(pathSegment => pathSegment.length));
						}
					
						
					}
					onDirectoryChangedCallback={
						(newPath: string) => {
							const temp: string[] = newPath.split("/");
							setCurrentPath(temp.filter(pathSegment => pathSegment.length));
						}
					}
					/>

				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button variant='ghost' disabled={moveToDirectory == null} onClick={move}>Move</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}