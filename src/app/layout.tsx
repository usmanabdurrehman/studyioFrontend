"use client";

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";
import { useKeepAlive } from "@/hooks/useKeepAlive";

const inter = Inter({ subsets: ["latin"] });

const showAlertToast = (data: unknown) => {
  const response = data as {
    status: boolean;
    alert?: { type: "success" | "error"; msg: string };
  };
  if (response?.alert) {
    const { type, msg } = response.alert;
    if (type === "success") toast.success(msg);
    else toast.error(msg);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 0,
      onSettled: showAlertToast,
    },
    mutations: {
      onSettled: showAlertToast,
      onError: () => {
        toast.error(
          "Something happened unexpectedly. Please try again in a few minutes"
        );
      },
    },
  },
});

const KeepAlive = () => {
  useKeepAlive();
  return null;
};

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

  useEffect(() => {
    toast(
      "First request to the server could take 10-15 seconds due to the server being inactive. Subsequent requests would be much faster",
      {
        autoClose: false,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        progress: 1,
        theme: "light",
        type: "info",
      }
    );
  }, []);

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
          <KeepAlive />
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
