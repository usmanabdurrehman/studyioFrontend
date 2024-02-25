"use client";

import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, GlobalConfig } from "@/Components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Study.io</title>
        <link rel="icon" type="image/svg+xml" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider>
          <GlobalConfig />
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
