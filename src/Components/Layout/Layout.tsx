"use client";

import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import Chat from "../Chat/Chat";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minHeight={"100vh"} direction={"column"} height="100%">
      <Navbar />
      <Container flex="1" maxW="1360">
        <Box mt={4} mb={4}>
          {children}
        </Box>
      </Container>
      <Chat />
      <Footer />
    </Flex>
  );
}
