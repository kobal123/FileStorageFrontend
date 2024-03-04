'use client'
import { Box, Input, InputGroup, InputLeftElement, ListIcon, ListItem, UnorderedList, useColorMode } from "@chakra-ui/react";
import { autoUpdate, offset, size, useFloating } from "@floating-ui/react-dom";
import { useEffect, useState } from "react";
import { FileMetadata } from "../../home/[[...slug]]/_components/file-grid";
import { SearchIcon } from "@chakra-ui/icons";
import { FaFile, FaFolder } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fileMetadataService } from "@/service/filemetadata/fileservice-provider";
import ColorModeSensitiveBox from "../custom-chakra/color-mode-box";
import "./style.css"
import { GoFile } from "react-icons/go";

const SIZES = [600];

export default function SearchBar() {
    const { refs, floatingStyles } = useFloating({
        placement: "bottom",
        whileElementsMounted: autoUpdate,
        strategy: "fixed",
        middleware: [
            size(
                {
                    apply: ({ rects, elements }) => {
                        Object.assign(elements.floating.style, {
                            width: `${rects.reference.width}px`
                        });
                    },
                }
            ),
            offset(3)
        ]
    });
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<FileMetadata[]>([]);
    const [selectedSearchResult, setSelectedSearchResult] = useState<number>(-1);
    const [error, setError] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const { colorMode } = useColorMode();
    const router = useRouter();

    useEffect(() => {
        if (searchText.length > 2) {
            const timeout = setTimeout(() => {
                fileMetadataService.search(searchText)
                    // .then(results => results.json())
                    .then(results => {
                        setSearchResults(results);
                        setOverlayVisible(true)

                    })
                    .catch(error => {
                        setError(true);
                    })
            }, 300)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [searchText]);

    function handleOnChange(event: any) {
        setError(false);
        setSelectedSearchResult(-1);
        setSearchText(event.target.value);
    }
    const handleKeyPress = (event: any) => {
        switch (event.key) {
            case 'Enter':
                if (selectedSearchResult == -1 || error) break;
                const metadata: FileMetadata = searchResults[selectedSearchResult];
                // router.push("/home" + searchResults[selectedSearchResult].full_path);
                if (metadata.isDirectory) {
                    router.push("/home" + metadata.full_path);
                } else {
                    router.push('/home' + metadata.path);
                }
                setError(false);
                setSearchResults([]);
                setOverlayVisible(false);
                break;
            case 'ArrowUp':
                if (selectedSearchResult <= 0) {
                    setSelectedSearchResult(searchResults.length - 1);
                } else {
                    setSelectedSearchResult(selectedSearchResult - 1);
                }
                break;
            case 'ArrowDown':
                if (selectedSearchResult == searchResults.length - 1) {
                    setSelectedSearchResult(0);
                } else {
                    setSelectedSearchResult(selectedSearchResult + 1);
                }
                break;
            case 'Tab':
            case 'Escape':
                setError(false);
                setSearchResults([]);
                break;
            default:
                break;
        }
        console.log("current index " + selectedSearchResult)
    }

    return (
        <>
            <Box position={'fixed'} width={'100%'} height={'100%'} top={0} left={0} zIndex={1100} aria-hidden='true'
                hidden={!overlayVisible} onClick={() => {
                    setError(false);
                    setSelectedSearchResult(-1);
                    setSearchResults([])
                    setOverlayVisible(false);
                }}>
            </Box>
            <InputGroup maxW={SIZES} zIndex={1100}>
                <InputLeftElement>
                    <SearchIcon />
                </InputLeftElement>
                <Input
                    maxW={SIZES}
                    focusBorderColor={colorMode === 'light' ? 'black' : 'gray.600'}
                    borderRadius={0}
                    onKeyDown={handleKeyPress}
                    _hover={
                        {
                            borderColor: 'black',
                        }
                    }
                    _dark={
                        {
                            _hover: {
                                borderColor: 'gray.600'
                            }
                        }
                    }
                    onBlur={(e) => { return; }}
                    onChange={handleOnChange}
                    ref={refs.setReference}
                    type="search"
                    placeholder="Search files"
                    variant={'outline'}
                >
                </Input>
            </InputGroup>
            <UnorderedList
                zIndex={1100}
                hidden={error || searchResults.length == 0}
                margin={0}
                styleType={"none"}
                ref={refs.setFloating}
                className="searchbar-result-container"
                style={floatingStyles}
                border={"thin solid black"}
                // boxShadow={'0 0 0 1px #000000'}
                >
                {
                    error ? <Box maxW={SIZES}>There was an error getting the results</Box> :
                        searchResults.map((filemetadata, index) => {
                            return (
                                <ListItem
                                    cursor={'pointer'}
                                    key={filemetadata.full_path}
                                    height={'35px'}
                                    className="search-result"
                                    width={'100%'}
                                    bg={'transparent'}
                                >
                                    <ColorModeSensitiveBox
                                        width='100%'
                                        paddingLeft='10px'
                                        height='100%'
                                        bgColor={selectedSearchResult == index ? 'blue' : ''}

                                    >
                                        <Box
                                            onClick={() => {
                                                setOverlayVisible(false)
                                                setSearchResults([]);
                                                if (filemetadata.isDirectory) {
                                                    router.push("/home" + filemetadata.full_path);
                                                } else {
                                                    router.push('/home' + filemetadata.path);
                                                }
                                            }}

                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyItems: 'center',
                                                height: '100%'
                                            }}>
                                            <ListIcon as={filemetadata.isDirectory ?  FaFolder : FaFile}>
                                            </ListIcon>
                                            <span style={{ width: '100%' }}>{filemetadata.name}</span>
                                        </Box>
                                    </ColorModeSensitiveBox>
                                </ListItem>
                            );
                        })
                }
            </UnorderedList>

        </>
    );
}