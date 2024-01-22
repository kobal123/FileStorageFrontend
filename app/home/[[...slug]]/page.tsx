'use server'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, VStack } from "@chakra-ui/react";
import FileTable, { FileMetadata } from "./file-table";
import { ArrowUpIcon } from "@chakra-ui/icons";
import FileButtons from "./file-buttons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import getDummyFileMetadata from "@/dummy_data/filemetadata";

export default async function Page({ params }) {

    const API = "http://lcaolhost:3000/files.json";


    // make api call to backend
    // const data: FileMetadata[] = await fetch(API).then(request => request.json());
    
    const data: FileMetadata[] = getDummyFileMetadata(20);
    
    let path: string[] = []
    if (params.slug !== undefined) {
        path = params.slug;
    }



    return (
        <>
            <BreadcrumbPath paths={path} />
            <FileButtons />
            <FileTable data={data}></FileTable>
        </>
    )
}


function BreadcrumbPath({ paths }) {

    let PathsHidden = []
    let PathsVisible = []
    let shouldRenderMenu = false;
    const maxBreadcrumbItems = 4
    if (paths.length > maxBreadcrumbItems) {
        console.log("paths length " + paths.length)
        PathsHidden = paths.slice(0, paths.length - maxBreadcrumbItems);
        console.log(paths.length - maxBreadcrumbItems)
        PathsVisible = paths.slice(paths.length - maxBreadcrumbItems);
        shouldRenderMenu = true;
        console.log(PathsHidden)
        console.log(PathsVisible)
    } else {
        PathsVisible = paths.slice(0, paths.length).map(e => {
            const decoded = decodeURIComponent(e);
            console.log("decoded :" + decoded);
            return decoded;
        });
        console.log("paths visible: " + PathsVisible)
    }

    return (
        <Breadcrumb>
            {
                shouldRenderMenu ?
                    (<>
                        <BreadcrumbItem>
                            <Menu>
                                <MenuButton style={{ verticalAlign: "middle", textAlign: "center" }} as={Button}>
                                    <Image src="/three-dots.svg" width={15} height={20}></Image>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <Link href={"/home"}>Home</Link>
                                    </MenuItem>
                                    {
                                        PathsHidden.map((path, index) => {
                                            return (
                                                <MenuItem >
                                                    <Link key={path} href={"/home/" + PathsHidden.slice(0, index + 1).join("/")}>{path}</Link>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </Menu>
                        </BreadcrumbItem>
                    </>) : <></>
            }

            {shouldRenderMenu ? <></> : <BreadcrumbItem >
                <Link href={"/home"}>Home</Link>
            </BreadcrumbItem>}

            {

                PathsVisible.map((path, index) => {
                    return (
                        <BreadcrumbItem >
                            <Link key={path} href={"/home/" + PathsVisible.slice(0, index + 1).join("/")}>{path}</Link>
                        </BreadcrumbItem>
                    )
                })
            }
        </Breadcrumb>
    )
}