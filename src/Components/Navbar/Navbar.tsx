"use client";

import { useLogout } from "@/mutations/useLogout";
import {
  useFetchNames,
  useLoggedUser,
  useNotifications,
  useUnseenNotificationCount,
} from "@/queries";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
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
import { useCallback, useRef, useState } from "react";

import { useSeeNotifications } from "@/mutations";
import { NotificationAction } from "@/types";
import { Bell, BellFill } from "react-bootstrap-icons";
import { useProgressRouter } from "@/hooks";

export const Navbar = () => {
  const { data: user } = useLoggedUser();

  const [search, setSearch] = useState("");

  const { data: names = [], isFetching } = useFetchNames(search);
  const { data: notifications = [], refetch: refetchNotifications } =
    useNotifications();

  const { data: unseenNotificationCount, refetch: refetchUnseenNotifications } =
    useUnseenNotificationCount();

  const { mutateAsync: seeNotifications } = useSeeNotifications();

  const { mutateAsync: logout } = useLogout();

  const initialFocusRef = useRef(null);

  const router = useProgressRouter();

  const onNotificationClick = useCallback(async () => {
    refetchNotifications();
    await seeNotifications();
    refetchUnseenNotifications();
  }, []);

  const navigateToProfilePage = useCallback((doerId: string) => {
    router.push(`/profile/${doerId}`);
  }, []);

  const navigateToPostPage = useCallback((postId: string) => {
    router.push(`/post/${postId}`);
  }, []);

  return (
    <Box bg="#000036" h={"70px"} color="white">
      <Container maxW="1360" h="100%">
        <Flex h="100%" alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex alignItems={"center"} gap={4}>
              <Text fontWeight={"bold"} fontSize="lg">
                <Link href="/timeline">Study.io</Link>
              </Text>
              <Popover
                placement="bottom"
                closeOnBlur={false}
                isOpen={!!(names?.length && search)}
                initialFocusRef={initialFocusRef}
                onClose={() => setSearch("")}
                closeOnEsc
              >
                <PopoverTrigger>
                  <Box pos={"relative"}>
                    <Input
                      placeholder="Search Users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      ref={initialFocusRef}
                      _placeholder={{ color: "inherit", fontSize: "xs" }}
                      fontSize="xs"
                      rounded={"full"}
                      pr={10}
                    />
                    {isFetching && (
                      <Flex
                        height="100%"
                        alignItems={"center"}
                        justifyContent="center"
                        pos={"absolute"}
                        top={0}
                        right={3}
                      >
                        {isFetching && <Spinner size="sm" color="blue.500" />}
                      </Flex>
                    )}
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <Flex direction={"column"} gap={2} color="black" p={2}>
                    {names?.map(({ name, _id }) => (
                      <Link color="black" href={`/profile/${_id}`}>
                        <Text fontSize="xs">{name}</Text>
                      </Link>
                    ))}
                  </Flex>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
          <Flex alignItems={"center"} gap={4}>
            <Link href="/timeline">
              <Text fontSize="sm">Timeline</Text>
            </Link>
            <Link href={`/profile/${user?._id}`}>
              <Avatar src={user?.profileImage} size="xs" name={user?.name} />
            </Link>
            <Menu>
              <MenuButton
                onClick={onNotificationClick}
                as={IconButton}
                icon={
                  <>
                    <Avatar icon={<BellFill />} size="xs">
                      {!!unseenNotificationCount && (
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                      )}
                    </Avatar>
                  </>
                }
                rounded={"full"}
                colorScheme="gray"
                size="xs"
              />
              <MenuList color="black">
                {notifications.map(({ message, action, postId, doerId }) => (
                  <MenuItem
                    fontSize={"xs"}
                    onClick={() => {
                      action === NotificationAction.Followed
                        ? navigateToProfilePage(doerId)
                        : navigateToPostPage(postId);
                    }}
                  >
                    {message}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Button
              onClick={async () => {
                await logout();
                router.push("/signin");
              }}
              size="xs"
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
