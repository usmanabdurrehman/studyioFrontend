import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

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
      retry: false,
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

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};
