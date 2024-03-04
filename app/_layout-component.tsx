'use client'
import { Box, Button, CloseButton, ColorMode, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, IconButton, Image, Input, List, ListIcon, ListItem, Radio, RadioGroup, SkeletonCircle, Spacer, Stack, Switch, UnorderedList, VStack, background, useColorMode, useDisclosure } from "@chakra-ui/react";
import "../styles/_layout.css"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import React, { CSSProperties, useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchBar from "./(components)/global_layout/searchbar";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./(components)/buttons";
import Link from "next/link";
import ColorModeSensitiveBox from "./(components)/custom-chakra/color-mode-box";
import { FilestoreIcon } from "./(components)/filestore-icon";
import { BsHouse } from "react-icons/bs";
import UserStorageInfo from "./(components)/global_layout/user-storage-info";

export interface SideBarProps {
    shouldDisappear: boolean,
    style?: CSSProperties,
}
function SideBar({ shouldDisappear, style }: SideBarProps) {

    const { status } = useSession();
    return (
        <ColorModeSensitiveBox style={style} minWidth='250px' borderRight={'1px solid'} borderRightColor={'blackAlpha.100'} className={"sidebar " + (shouldDisappear ? "sidebar-closed" : "")}>
            <VStack marginRight={'3px'}>


                <Link href='/home' style={{marginTop:'5px'}} ><FilestoreIcon h={"75px"} w={"150px"} cursor={'pointer'}></FilestoreIcon></Link>
                <List width={'100%'} paddingLeft={'5px'}>
                    <ListItem borderBottom={'thin solid red'}>

                        <Link href={"/home"}>
                            <ListIcon as={BsHouse}></ListIcon>
                            All files
                        </Link>
                    </ListItem>
                    <ListItem>b</ListItem>
                </List>

                (status === 'authenticated' ? <LogoutButton /> : <></> )
            </VStack>
            {status === 'authenticated' ? (
                <>
                    <Divider paddingTop={'5px'} paddingBottom={'5px'}></Divider>
                    <UserStorageInfo></UserStorageInfo>
                </>
            ) : (<></>)}

        </ColorModeSensitiveBox>
    );
}


function LayoutHeader() {

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack className="header" marginTop={'5px'} paddingRight={'10px'} paddingLeft={'10px'}>
            <HamburgerSidebar />
            <Spacer />
            <SearchBar></SearchBar>
            <Spacer />
            <HStack>
                <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'}>
                </Switch>
                <LoginButtonOrAvatar />
            </HStack>

        </HStack>
    )
}

function LoginButtonOrAvatar() {
    const { data: session, status } = useSession();
    const name: string = session?.user?.name || '';


    if (status === "authenticated") {
        return (
            <Avatar size={"md"} name={name} ></Avatar>
        )
    }
    return (
        <LoginButton></LoginButton>
    )
}

function HamburgerSidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton 
            borderRadius={0} 
            aria-label="Open sidebar" 
            icon={<HamburgerIcon />} 
            _light={
                {
                    background:'blue.400',
                    color:'white'
                }
            }
            className="sidebar-drawer-button" 
            onClick={onOpen}>

            </IconButton>
            <Drawer size={'xs'} placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent  w={'250px'} maxW={'250px'}>
                    <DrawerBody padding={0} >
                        <SideBar style={{ minWidth: "200px", width: '100%' }} shouldDisappear={false} />
                    </DrawerBody>
                    <DrawerCloseButton right={'0.25rem'} top={'0.25rem'}/>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export function RootLayoutComponent({
    children
}: Readonly<{
    children: React.ReactNode,
}>) {
    // const {data: session} = useSession();
    // console.log("session from layout: " + JSON.stringify(session))
    return (
        <SessionProvider >
            <HStack className="main" padding={'0'} margin={'0'} >
                <SideBar shouldDisappear={true} />

                <VStack className="main-container" >
                    <LayoutHeader />
                    <main className="main-content" >
                        {children}

                    </main>
                </VStack>
            </HStack>
        </SessionProvider>
    );
}
