"use client";

import React, { memo } from "react";
import styles from "./Timeline.module.scss";
import { useTechNews, useTimelinePosts } from "@/queries";
import { Post } from "@/types";
import { PostCard } from "../PostCard";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";
import { AddPostCard } from "../AddPostCard";
import { Box, Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";

const Timeline = memo(() => {
  const { data: posts = [] } = useTimelinePosts();
  const { data: techNews = [] } = useTechNews();

  const postContent = () => {
    if (posts) {
      if (posts.length === 0) {
        return (
          <p>
            Sorry. There are no posts to show. Follow some people so that their
            posts come on your timeline
          </p>
        );
      }
      return posts.map((post: Post) => <PostCard post={post} />);
    }
    return Array(3)
      .fill("-")
      .map(() => <PostCardSkeleton />);
  };

  return (
    <Flex mt={4} gap={4}>
      <Box flex="1">
        <AddPostCard />
        <Box mt={8}>{postContent()}</Box>
      </Box>
      <Box width={400}>
        <Box
          borderRadius={4}
          boxShadow="lg"
          p={4}
          className={styles.techNewsCard}
        >
          <Text fontSize={"2xl"}>Tech News</Text>
          <OrderedList mt={2}>
            {techNews.map((news) => (
              <ListItem>{news.title}</ListItem>
            ))}
          </OrderedList>
        </Box>
      </Box>
    </Flex>
  );
});

export default Timeline;
