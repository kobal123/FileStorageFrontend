'use client'

import { Box, Input, Link, Stack, VStack } from "@chakra-ui/react";
import { autoUpdate, useFloating } from "@floating-ui/react-dom";
import { Result } from "postcss";
import { useEffect, useState } from "react";
import "./style.css"
import getDummyFileMetadata from "@/dummy_data/filemetadata";
import { FileMetadata } from "./file-table";

export default function SearchBar() {
    const { refs, floatingStyles } = useFloating({
        placement:"bottom",
        whileElementsMounted: autoUpdate,
        strategy:"fixed"

    });
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<FileMetadata[]>([]);
    const [error, setError] = useState(false);
    const abort = new AbortController();

    useEffect(() => {
        if (searchText.length > 2) {
            setSearchResults(getDummyFileMetadata(8));
            // const timeout = setTimeout(() => {
            //     fetch("http://localhost:8081/files?q=" + searchText)
            //     .then(results => results.json())
            //     .then(results => {
            //         setSearchResults(results);
            //     })
            //     .catch(error => {
            //         setError(true);
            //     })
            // }, 500)
            // return () =>{
            //     clearTimeout(timeout);
            // }
        }
    }, [searchText]);

    function handleOnChange(event) {
        setError(false);

        setSearchText(event.target.value);
    }

    return (
        <>
            <Input variant={"flushed"} w={[400, 600]}  onBlur={() => {setError(false); setSearchResults([])}} onChange={handleOnChange} ref={refs.setReference} type="search" placeholder="Search files"></Input>

            <VStack  bg={"black"} ref={refs.setFloating} className="searchbar-result" style={floatingStyles}>
                {
                    error ? <Box w={[200, 400, 600]}>There was an error getting the results</Box> :
                    searchResults.map((result, index) => {
                        return (
                            <Link bg={"black"} w={[200, 400, 600]} key={index} >{result.name}</Link>
                        );
                    })
                    
                }
            </VStack>
        </>
    );
}