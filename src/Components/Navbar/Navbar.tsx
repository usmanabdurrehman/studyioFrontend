"use client";

import { useFetchNames } from "@/queries";
import { useUserStore } from "@/store";
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";

import { FaEllipsis, FaCircleXmark } from "react-icons/fa6";

export const Navbar = () => {
  const user = useUserStore((state) => state.user);

  const [search, setSearch] = useState("");

  const { data: names = [], isFetching } = useFetchNames(search);

  console.log({ user });

  const initialFocusRef = useRef(null);

  return (
    <Box bg="blue.400" h={"70px"} color="white">
      <Container maxW="1360" h="100%">
        <Flex h="100%" alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex alignItems={"center"} gap={4}>
              <Text fontWeight={"bold"}>
                <Link href="/timeline">Study.io</Link>
              </Text>
              <Popover
                placement="bottom"
                closeOnBlur={false}
                isOpen={!!(names?.length && search)}
                initialFocusRef={initialFocusRef}
              >
                <PopoverTrigger>
                  <InputGroup>
                    <Input
                      placeholder="Search Users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      ref={initialFocusRef}
                      _placeholder={{ color: "inherit" }}
                    />
                    <InputRightAddon>
                      <Box width={3}>
                        {isFetching && <Spinner size="sm" color="blue.500" />}
                      </Box>
                    </InputRightAddon>
                  </InputGroup>
                </PopoverTrigger>
                <PopoverContent>
                  <Flex direction={"column"} gap={2} color="black" p={2}>
                    {names?.map(({ name, _id }) => (
                      <Link color="black" href={`/profile/${_id}`}>
                        {name}
                      </Link>
                    ))}
                  </Flex>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
          <Flex alignItems={"center"} gap={4}>
            <Link href="/timeline">Timeline</Link>
            <Link href={`/profile/${user?._id}`}>{user?.name}'s Profile</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
