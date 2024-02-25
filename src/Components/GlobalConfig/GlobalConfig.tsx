"use client";

import { useHandleSockets, useKeepAlive } from "@/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from "nprogress";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import "react-toastify/dist/ReactToastify.css";

export const GlobalConfig = () => {
  useHandleSockets();
  useKeepAlive();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    process.env.NODE_ENV !== "development" &&
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
    <>
      <NextTopLoader showSpinner={false} />
      <ToastContainer autoClose={2000} />
    </>
  );
};
