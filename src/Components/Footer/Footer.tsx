import { Flex, Text } from "@chakra-ui/react";
import React, { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <Flex p={4} alignItems="center" justifyContent={"center"} bg="#000036">
      <Text fontSize="sm" color="white">
        Study.io, Copyright 2024
      </Text>
    </Flex>
  );
});

export default Footer;
