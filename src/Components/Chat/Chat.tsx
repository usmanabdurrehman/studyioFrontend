import React, { useEffect, useRef, memo, useState, useMemo } from "react";

import SwipeableViews from "react-swipeable-views";

import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChatLeft, ChevronLeft } from "react-bootstrap-icons";
import {
  useConversationById,
  useConversationsByName,
  useConversationsByUser,
  useLoggedUser,
} from "@/queries";
import { useCreateConversation } from "@/mutations";
import { useStore } from "@/store";
import { Conversation } from "@/types";

const ChatListItem = ({
  profileImage,
  name,
  onClick,
}: {
  profileImage: string | undefined;
  name: string | undefined;
  onClick: () => void;
}) => {
  return (
    <ListItem
      h={"30px"}
      cursor="pointer"
      _hover={{ background: "#eee" }}
      onClick={onClick}
    >
      <Flex gap={2} alignItems="center">
        <Image
          src={profileImage}
          alt={`${name}'s Profile Picture`}
          width={"30px"}
          height={"30px"}
          borderRadius={4}
        />
        <Text fontSize={"xs"}>{name}</Text>
      </Flex>
    </ListItem>
  );
};

const ChatView = memo(function Chat({}) {
  const [index, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const { data: loggedUser } = useLoggedUser();
  const userId = loggedUser?._id;
  const messagesContainer = useRef<HTMLDivElement>(null);
  const { data: conversations } = useConversationsByUser();
  const { data: searchNames } = useConversationsByName(search);

  const [conversationId, setConversationId] = useState<string>();
  const { data: openedChat, isLoading: isConversationLoading } =
    useConversationById(conversationId);
  const { mutateAsync: createConversation } = useCreateConversation();

  const openedChatMember = useMemo(
    () =>
      openedChat?.participants?.find(
        (participant) => participant._id !== userId
      ),
    [openedChat, userId]
  );

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        left: 0,
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const lastOpenedChat = useRef<Conversation | null>(null);

  const { socket } = useStore();

  useEffect(() => {
    if (openedChat) {
      lastOpenedChat.current &&
        socket?.emit("leaveRoom", { id: lastOpenedChat.current?._id });
      socket?.emit("joinRoom", { id: openedChat._id });

      lastOpenedChat.current = openedChat;
    }
  }, [socket, openedChat]);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        left: 0,
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [openedChat?.messages]);

  return (
    <Flex
      width={250}
      height={400}
      borderRadius={"0 4px 0 4px"}
      overflow={"hidden"}
      border="1px solid blue"
      bg="white"
      direction={"column"}
    >
      <Flex pr={1} pl={1} alignItems={"center"} bg="#000036" h={10}>
        <Box width="20px">
          {index === 1 && (
            <IconButton
              icon={<ChevronLeft />}
              size="xs"
              aria-label="Go back"
              bg="transparent"
              color="white"
              onClick={() => {
                setConversationId(undefined);
                setSelectedIndex(0);
              }}
              _hover={{
                color: "white",
              }}
              _focus={{ bg: "transparent" }}
            />
          )}
        </Box>
        <Text flex="1" color="white" textAlign="center" fontSize="sm">
          {openedChatMember?.name || "Inbox"}
        </Text>
        <Box width="20px"></Box>
      </Flex>
      {/*@ts-ignore*/}
      <SwipeableViews
        index={index}
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
      >
        <Flex direction="column" position={"relative"} height="100%">
          <Input
            placeholder="Search..."
            value={search}
            width="100%"
            borderRadius="none"
            onChange={(e) => setSearch(e.target.value)}
            fontSize="12px"
          />
          <Box flex="1" overflow="auto" pt={2}>
            {conversations && conversations?.length ? (
              <List>
                {conversations.map((conversation) => {
                  const { name, profileImage } =
                    conversation.participants.find(
                      (participant) => participant._id !== userId
                    ) || {};
                  return (
                    <ChatListItem
                      key={name}
                      name={name}
                      profileImage={profileImage}
                      onClick={() => {
                        setConversationId(conversation?._id);
                        setSelectedIndex(1);
                      }}
                    />
                  );
                })}
              </List>
            ) : (
              !searchNames?.length && (
                <Flex
                  height="100%"
                  flex="1"
                  color="#999"
                  fontSize={13}
                  padding="0 15px"
                  alignItems={"center"}
                >
                  Sorry, you have not got any conversation yet.
                </Flex>
              )
            )}
            {searchNames && (
              <List>
                {conversations && conversations.length > 0 && (
                  <Box m={2}>
                    <Text fontWeight={"bold"} fontSize="xs">
                      More People
                    </Text>
                  </Box>
                )}
                {searchNames.map(({ name, profileImage, _id }) => (
                  <ChatListItem
                    key={name}
                    name={name}
                    profileImage={profileImage}
                    onClick={async () => {
                      const data = await createConversation(_id);
                      setConversationId(data?._id);
                      setSelectedIndex(1);
                    }}
                  />
                ))}
              </List>
            )}
          </Box>
        </Flex>
        <Flex
          height="100%"
          flexDirection={"column"}
          flex="1"
          overflow="auto"
          position="relative"
        >
          <Flex
            padding={"10px"}
            flex={"1"}
            flexDirection="column"
            overflow="auto"
            ref={messagesContainer}
          >
            {isConversationLoading && (
              <Flex flex="1" alignItems={"center"} justifyContent="center">
                <Spinner size="sm" />
              </Flex>
            )}
            {openedChat?.messages?.map(({ text, sentBy }) => (
              <Box
                key={sentBy}
                padding="5px"
                fontSize="12px"
                borderRadius="0 4px 0 4px"
                margin="10px 0"
                width="80%"
                {...(sentBy === userId
                  ? {
                      backgroundColor: "#f0eded",
                      color: "black",
                      alignSelf: "flex-start",
                    }
                  : {
                      backgroundColor: "#007bff",
                      color: "white",
                      alignSelf: "flex-end",
                    })}
              >
                {text}
              </Box>
            ))}
          </Flex>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                socket?.emit("message", {
                  message,
                  conversationId: openedChat?._id,
                });
                setMessage("");
              }}
            >
              <Input
                placeholder="Write here...."
                _placeholder={{ fontSize: "12px" }}
                fontSize="12px"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </Box>
        </Flex>
      </SwipeableViews>
    </Flex>
  );
});

export default function Chat() {
  return (
    <Popover placement="top-start" closeOnBlur={false} closeOnEsc>
      <PopoverTrigger>
        <IconButton
          aria-label="Open Chat"
          borderRadius="50%"
          colorScheme={"whatsapp"}
          icon={<ChatLeft />}
          pos="fixed"
          bottom={3}
          right={3}
          size="lg"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <ChatView />
      </PopoverContent>
    </Popover>
  );
}
