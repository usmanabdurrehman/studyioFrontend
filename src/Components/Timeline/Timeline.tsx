"use client";

import React, { memo, useMemo, useState } from "react";
import styles from "./Timeline.module.scss";
import { useTechNews, useTimelinePosts } from "@/queries";
import { Post } from "@/types";
import { PostCard } from "../PostCard";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";
import { AddPostCard } from "../AddPostCard";
import {
  Box,
  Button,
  Flex,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const PostContent = () => {
  const { data: posts } = useTimelinePosts();
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);

  const filteredPosts = useMemo(
    () =>
      (posts || []).filter((post) => {
        if (showHiddenPosts) return true;
        return post.hidden;
      }),
    [posts, showHiddenPosts]
  );

  if (!posts)
    return (
      <Flex direction={"column"} gap={2}>
        {Array.from({ length: 3 }, () => (
          <PostCardSkeleton />
        ))}
      </Flex>
    );

  if (!posts.length)
    return (
      <p>
        Sorry. There are no posts to show. Follow some people so that their
        posts come on your timeline
      </p>
    );

  return (
    <Box>
      <Flex justifyContent={"flex-end"}>
        <Button
          leftIcon={showHiddenPosts ? <EyeSlash /> : <Eye />}
          variant="solid"
          size="sm"
          onClick={() => setShowHiddenPosts(!showHiddenPosts)}
        >
          {showHiddenPosts ? "Hide Hidden Posts" : "Show Hidden Posts"}
        </Button>
      </Flex>
      <Flex direction="column" gap={4} mt={4}>
        {filteredPosts.map((post: Post) => (
          <PostCard post={post} />
        ))}
      </Flex>
    </Box>
  );
};

const Timeline = memo(() => {
  const { data: techNews = [] } = useTechNews();

  return (
    <Flex mt={4} gap={4}>
      <Box flex="1">
        <AddPostCard />
        <Box mt={8}>
          <PostContent />
        </Box>
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
