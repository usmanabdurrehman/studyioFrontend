"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { FaEllipsis, FaCircleXmark } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <Flex h={"70px"} alignItems={"center"} justifyContent={"space-between"}>
      <Flex gap={4}>
        <Text fontWeight={"bold"}>Study.io</Text>
      </Flex>
    </Flex>
  );
};
