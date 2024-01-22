'use client'
import { Box, Button, CloseButton, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, Input, Radio, RadioGroup, Stack, VStack, useDisclosure } from "@chakra-ui/react";
import "../styles/_layout.css"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchBar from "./home/[[...slug]]/searchbar";


function SideBar({shouldDisappear, style}) {
    const buttonTexts = ["Profile", "Logout"]

    return (
        
        <VStack style={style} className={"sidebar " + (shouldDisappear ? "sidebar-closed" : "")}>
            {buttonTexts.map(text => <Button key={text}>{text}</Button>)}
        </VStack>
    )
}

function LayoutHeader() {

    return (
        <Flex justifyContent={"space-between"} className="header">
            <Box ><PlacementExample/></Box>
            
            <SearchBar></SearchBar>
            <Avatar  name="Kósa Balázs" ></Avatar>

        </Flex>
    )
}

function PlacementExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button colorScheme='blue'  className="sidebar-drawer-button" onClick={onOpen}>
            <HamburgerIcon/>
        </Button>
        <Drawer placement={"left"} onClose={onClose}  isOpen={isOpen}>
            
          <DrawerOverlay/>

          <DrawerContent>
            <DrawerHeader>
                <DrawerCloseButton/>
            </DrawerHeader>

            <DrawerBody style={{overflowY:"hidden"}} >
                <SideBar style={{width:"100%"}} shouldDisappear={false}/>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export function RootLayoutComponent({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <HStack className="main">
            <SideBar  shouldDisappear={true}/>

            <VStack className="main-container">
                <LayoutHeader/>
                <div className="main-content">
                    {children}
                </div>
            </VStack>
        </HStack>
    );
}
