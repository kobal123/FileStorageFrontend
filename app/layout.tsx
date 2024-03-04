import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutComponent } from "./_layout-component";
import Head from "next/head";
import { CustomChakraProvider } from "./providers";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body className={inter.className}>
        <CustomChakraProvider>
            <RootLayoutComponent >
              {children}
            </RootLayoutComponent>
        </CustomChakraProvider>
      </body>
    </html>
  );
}
