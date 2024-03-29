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
import { memo, useCallback, useRef, useState } from "react";

import { useSeeNotifications } from "@/mutations";
import { NotificationAction } from "@/types";
import { BellFill } from "react-bootstrap-icons";
import { useAuth, useProgressRouter } from "@/hooks";
import { PATH } from "@/constants";
import { useStore } from "@/store";

export const Navbar = memo(function Navbar() {
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
  }, [refetchNotifications, seeNotifications, refetchUnseenNotifications]);

  const navigateToProfilePage = useCallback(
    (doerId: string) => {
      router.push(PATH.getProfilePath(doerId));
    },
    [router]
  );

  const navigateToPostPage = useCallback(
    (postId: string) => {
      router.push(PATH.getPostPath(postId));
    },
    [router]
  );

  const { handleLogout } = useAuth();
  const { setLoggedInUserId } = useStore();

  return (
    <Box
      bg="#000036"
      h={"70px"}
      color="white"
      pos="sticky"
      left={0}
      right={0}
      top={0}
      zIndex={100}
    >
      <Container maxW="1360" h="100%">
        <Flex h="100%" alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex alignItems={"center"} gap={4}>
              <Text fontWeight={"bold"} fontSize="lg">
                <Link href={PATH.TIMELINE}>Study.io</Link>
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
                      <Link
                        color="black"
                        href={PATH.getProfilePath(_id)}
                        key={_id}
                      >
                        <Text fontSize="xs">{name}</Text>
                      </Link>
                    ))}
                  </Flex>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
          <Flex alignItems={"center"} gap={4}>
            <Link href={PATH.TIMELINE}>
              <Text fontSize="sm">Timeline</Text>
            </Link>
            <Link href={PATH.getProfilePath(user?._id)}>
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
                {notifications.map(
                  ({ message, action, postId, doerId, _id }) => (
                    <MenuItem
                      key={_id}
                      fontSize={"xs"}
                      onClick={() => {
                        action === NotificationAction.Followed
                          ? navigateToProfilePage(doerId)
                          : navigateToPostPage(postId);
                      }}
                    >
                      {message}
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>

            <Button
              onClick={async () => {
                await logout();
                handleLogout();
                setLoggedInUserId(undefined);
                router.push(PATH.SIGNIN);
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
});
