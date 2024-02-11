"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 0,
    },
    mutations: {
      onSettled: (data) => {
        const response = data as {
          status: boolean;
          alert?: { type: "success" | "error"; msg: string };
        };
        if (response?.alert) {
          const { type, msg } = response.alert;
          if (type === "success") toast.success(msg);
          else toast.error(msg);
        }
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

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
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
