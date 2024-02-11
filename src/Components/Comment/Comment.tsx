"use client";

import { Comment as CommentType } from "@/types";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React, { memo } from "react";

interface CommentProps {
  comment: CommentType;
}

const Comment = memo(function Comment({ comment }: CommentProps) {
  return (
    <Box>
      <Flex alignItems="center" gap={4}>
        <Box>
          <Image
            src={comment?.commenter?.profileImage}
            alt="Profile"
            borderRadius={"50%"}
            width={30}
            height={30}
          />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight={"bold"}>
            {comment?.commenter?.name}
          </Text>
          <Text fontSize="xs">{comment?.comment}</Text>
        </Box>
      </Flex>
    </Box>
  );
});

export default Comment;
