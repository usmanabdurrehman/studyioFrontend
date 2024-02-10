"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { RequestLoading } from "@/Components/RequestLoading/RequestLoading";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            cacheTime: 0,
          },
          mutations: {
            onSettled: (data: any) => {
              console.log({ data });
              if (!data?.status && data?.alert) {
                const { type, msg } = data.alert;
                if (type === "success") toast.success(msg);
                else toast.error(msg);
              }
            },
          },
        },
      }),
    []
  );

  return (
    <html lang="en">
      <head>
        <title>Study.io</title>
        <link rel="icon" type="image/svg+xml" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <ToastContainer autoClose={2000} />
        <QueryClientProvider client={queryClient}>
          <RequestLoading />
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
