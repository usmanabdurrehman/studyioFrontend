import { Flex } from "@chakra-ui/react";
import React, { memo } from "react";

const Footer = memo(() => (
  <Flex
    p={4}
    alignItems="center"
    justifyContent={"center"}
    bg="blue"
    color="white"
  >
    Study.io, Copyright 2021
  </Flex>
));

export default Footer;
