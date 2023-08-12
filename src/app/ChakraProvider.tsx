"use client";

import { ChakraProvider } from "@chakra-ui/react";

export const ChakraProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
