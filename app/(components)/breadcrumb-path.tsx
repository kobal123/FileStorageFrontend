'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Button, IconButton, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import { CSSProperties } from "react";
import { BsThreeDots } from "react-icons/bs";

export interface BreadcrumbPathProp {
    style?: CSSProperties
    paths: string[],
    max_visible_items: number,
    paths_decoded: boolean,
    onClickHandler?: (event: unknown, path:string) => any
}

export function BreadcrumbPath({paths, max_visible_items, paths_decoded, onClickHandler, style={}}: BreadcrumbPathProp) {

    let PathsHidden: string[] = []
    let PathsVisible: string[] = []
    let shouldRenderMenu: boolean = false;
    const maxBreadcrumbItems: number = max_visible_items;
    if (paths.length > maxBreadcrumbItems) {
        PathsHidden = paths.slice(0, paths.length - maxBreadcrumbItems);
        PathsVisible = paths.slice(paths.length - maxBreadcrumbItems);
        shouldRenderMenu = true;
    } else {
        if (paths_decoded) {
            PathsVisible = paths.slice(0, paths.length);
        } else {
            PathsVisible = paths.slice(0, paths.length).map(path_segment => {
                return decodeURIComponent(path_segment); 
            });
        }

    }
    // console.log("is onclick handler nulll? " + (onClickHandler === undefined))
    return (
        <Breadcrumb style={style} separator={"⁄"}>
            {
                shouldRenderMenu ?
                    (
                         <BreadcrumbItem>
                            <Menu>
                                <MenuButton borderRadius={0} size='xs'  as={IconButton} icon={<BsThreeDots />}>
                                    
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <Link key={'home'} href={"/home"}>Home</Link>
                                    </MenuItem>
                                    {
                                        PathsHidden.filter(path => path.length).map((path, index) => {
                                            return (
                                                <MenuItem key={path}>
                                                    <Link onClick={(e) => {
                                                        if (onClickHandler !== undefined) {
                                                            e.preventDefault();
                                                            onClickHandler(e, path);
                                                        }
                                                    }} href={"/home/" + PathsHidden.slice(0, index + 1).join("/")}>{path}</Link>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </Menu>
                        </BreadcrumbItem>
                    ) : <></>
            }

            {shouldRenderMenu ?
                <></> :
                <BreadcrumbItem >
                    <Link key={'home'} href={"/home"}>Home</Link>
                </BreadcrumbItem>
            }

            {

                PathsVisible.filter(path => path.length).map((path, index) => {
                    return (
                        <BreadcrumbItem key={path+index}>
                            <Link onClick={(e) => {
                                                        if (onClickHandler !== undefined) {
                                                            e.preventDefault();
                                                            onClickHandler(e, path);
                                                        }
                                                    }} href={"/home/" + PathsVisible.slice(0, index + 1).join("/")}>{path}</Link>
                        </BreadcrumbItem>
                    )
                })
            }
        </Breadcrumb>
    )
}