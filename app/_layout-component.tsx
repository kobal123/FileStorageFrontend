'use client'
import { Box, Button, CloseButton, ColorMode, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, IconButton, Image, Input, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Radio, RadioGroup, SkeletonCircle, Spacer, Stack, Switch, UnorderedList, VStack, background, useColorMode, useDisclosure } from "@chakra-ui/react";
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
import { BsHouse, BsMoon, BsSun } from "react-icons/bs";
import UserStorageInfo from "./(components)/global_layout/user-storage-info";
import { FloatingComponent } from "./(components)/global_layout/file-upload-component";

export interface SideBarProps {
    shouldDisappear: boolean,
    style?: CSSProperties,
}
function SideBar({ shouldDisappear, style }: SideBarProps) {

    const { status } = useSession();
    return (
        <ColorModeSensitiveBox style={style} minWidth='250px' borderRight={'1px solid'} borderRightColor={'blackAlpha.100'} className={"sidebar " + (shouldDisappear ? "sidebar-closed" : "")}>
            <VStack marginRight={'3px'}>


                <Link href='/home' style={{ marginTop: '5px' }} ><FilestoreIcon h={"75px"} w={"150px"} cursor={'pointer'}></FilestoreIcon></Link>
                <List width={'100%'} paddingLeft={'5px'}>
                    <ListItem>

                        <Link style={{ display: 'flex', alignItems: 'center' }} href={"/home"}>
                            <ListIcon as={BsHouse}></ListIcon>
                            All files
                        </Link>
                    </ListItem>
                </List>

                {status === 'authenticated' && <LogoutButton />}
            </VStack>
            {status === 'authenticated' &&
                <>
                    <Divider
                        marginTop={'5px'}
                        marginBottom={'5px'}
                        backgroundColor={'gray.700'}
                        height={'1px'}
                    />
                    <UserStorageInfo></UserStorageInfo>
                </>
            }

        </ColorModeSensitiveBox>
    );
}


function AuthenticatedHeader() {

    const { colorMode, toggleColorMode } = useColorMode();
    return (


        <nav style={{ paddingLeft: '10px' }} className="header">
            <ColorModeSensitiveBox marginTop={'5px'} paddingRight={'10px'} paddingLeft={'10px'}>
                <HStack >
                    <HamburgerSidebar />
                    <Spacer />
                    <SearchBar></SearchBar>
                    <Spacer />
                    <HStack>
                        <IconButton aria-label="Change color mode" onClick={toggleColorMode} icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}></IconButton>
                        <LoginButtonOrAvatar />
                    </HStack>
                </HStack>
            </ColorModeSensitiveBox>
        </nav>
    )
}


function UnauthenticatedHeader() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <nav style={{ paddingLeft: '10px' }} className="header">
            <ColorModeSensitiveBox marginTop={'5px'} paddingRight={'10px'} paddingLeft={'10px'}>
                <HStack >
                    <Link href={'/'}>
                        <FilestoreIcon h={'50px'} w={'100px'}></FilestoreIcon>
                    </Link>
                    <Spacer></Spacer>
                    <Link href={'/about'}>About</Link>
                    <HStack>
                        <IconButton aria-label="Change color mode" onClick={toggleColorMode} icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}></IconButton>
                        <LoginButton></LoginButton>
                    </HStack>
                </HStack>
            </ColorModeSensitiveBox>
        </nav>
    )
}

function LoginButtonOrAvatar() {
    const { data: session, status } = useSession();
    const name: string = session?.user?.name || '';


    if (status === "authenticated") {
        return (

            <Menu>
                <Avatar as={MenuButton} size={"md"} name={name} ></Avatar>

                <MenuList>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu>
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
                        background: 'blue.400',
                        color: 'white'
                    }
                }
                className="sidebar-drawer-button"
                onClick={onOpen}>

            </IconButton>
            <Drawer size={'xs'} placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent w={'250px'} maxW={'250px'}>
                    <DrawerBody padding={0} >
                        <SideBar style={{ minWidth: "200px", width: '100%' }} shouldDisappear={false} />
                    </DrawerBody>
                    <DrawerCloseButton right={'0.25rem'} top={'0.25rem'} />
                </DrawerContent>
            </Drawer>
        </>
    )
}


function Wrapper({
    children
}: Readonly<{
    children: React.ReactNode,
}>) {
    const { status } = useSession();

    return (
        <HStack className="main" padding={'0'} margin={'0'} >
            {status === 'authenticated' && <SideBar shouldDisappear={true} />}
            <VStack className="main-container" >
                {status === 'authenticated' ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
                <main className="main-content" >
                    {children}
                </main>
            </VStack>
        </HStack>
    )
}

export function RootLayoutComponent({
    children
}: Readonly<{
    children: React.ReactNode,
}>) {
    return (
        <SessionProvider >
            <Wrapper>
                <FloatingComponent>

                    {children}
                </FloatingComponent>

            </Wrapper>
        </SessionProvider>
    );
}
