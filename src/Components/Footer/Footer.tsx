import { Flex } from "@chakra-ui/react";
import React, { memo } from "react";

const Footer = memo(() => (
  <Flex
    p={4}
    alignItems="center"
    justifyContent={"center"}
    bg="#000036"
    color="white"
  >
    Study.io, Copyright 2024
  </Flex>
));

export default Footer;
