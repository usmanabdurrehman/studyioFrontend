"use client";

import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      <Container maxW="1360">
        <Box mt={4}>{children}</Box>
      </Container>
    </Box>
  );
}
