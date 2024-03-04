import { Button } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";


export function LogoutButton() {
    return (<Button onClick={() => signOut()}>
        Logout
    </Button>);
}

export function LoginButton() {
    return (<Button onClick={() => signIn()}>
        Login
    </Button>);
}

