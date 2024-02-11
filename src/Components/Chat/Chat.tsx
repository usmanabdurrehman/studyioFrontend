import React, { useEffect, useRef, memo, useState } from "react";

import SwipeableViews from "react-swipeable-views";

import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ArrowLeft, ChevronLeft } from "react-bootstrap-icons";

const messages: any[] = [];
const message: any = {};
const openConversation = () => {};
const onSearchChange = () => {};
const openedChat = () => {};
const openedChatMember = () => {};
const searchString = "";
const startConversation = () => {};
const sendMessage = () => {};
const goBackToChatList = () => {};
const onMessageChange = () => {};

const conversations: any[] = [];
const searchNames: any[] = [];

const Chat = memo(function Chat({}) {
  const [index, setSelectedIndex] = useState(0);
  const userId = 1;
  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        left: 0,
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

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
      <Box
        padding="10px 0"
        position={"relative"}
        textAlign={"center"}
        color={"white"}
        bg="blue"
      >
        {"Inbox"}
        {index === 1 && (
          <IconButton
            icon={<ChevronLeft />}
            aria-label="Go back"
            position="absolute"
            right="5px"
          />
        )}
      </Box>
      {/*@ts-ignore*/}
      <SwipeableViews
        index={index}
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
      >
        <Flex direction="column" position={"relative"} height="100%">
          <Input
            placeholder="Search..."
            value={searchString}
            padding={1}
            width="100%"
            borderRadius="none"
            onChange={onSearchChange}
            fontSize="11px"
          />
          {conversations && conversations?.length ? (
            <List>
              {conversations.map(({ profileImage, name }) => {
                return (
                  <ListItem key={name}>
                    <Flex gap={2}>
                      <Image
                        src={profileImage}
                        alt=""
                        width={25}
                        height={25}
                        borderRadius={4}
                      />
                      <div>{name}</div>
                    </Flex>
                  </ListItem>
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
                <Box pl={2}>
                  <h5>More People</h5>
                </Box>
              )}
              {searchNames.map(({ name, profileImage }) => (
                <ListItem key={name}>
                  <Flex gap={2}>
                    <Image
                      src={profileImage}
                      alt=""
                      width={25}
                      height={25}
                      borderRadius={4}
                    />
                    <div>{name}</div>
                  </Flex>
                </ListItem>
              ))}
            </List>
          )}
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
            {messages.map(({ text, sentBy }) => (
              <Box
                key={sentBy}
                padding="5px"
                fontSize="12px"
                borderRadius="0 4px 0 4px"
                margin="10px 0"
                width="90%"
                {...(sentBy === userId
                  ? {
                      backgroundColor: "blue",
                      color: "white",
                      alignSelf: "flex-start",
                    }
                  : {
                      backgroundColor: "#f4f4f4",
                      color: "black",
                      alignSelf: "flex-end",
                    })}
              >
                {text}
              </Box>
            ))}
          </Flex>
          <Box height={40}>
            <form onSubmit={sendMessage}>
              <Input
                placeholder="Write here...."
                value={message}
                onChange={onMessageChange}
              />
            </form>
          </Box>
        </Flex>
      </SwipeableViews>
    </Flex>
  );
});

export default Chat;
