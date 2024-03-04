'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { SessionProvider, getSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
            children
    );
}
