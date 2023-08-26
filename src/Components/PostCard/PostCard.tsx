"use client";

import { Post } from "@/types";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { FaEllipsis, FaThumbsUp } from "react-icons/fa6";

import { Comment } from "../Comment";

import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  likePost: () => void;
  unlikePost: () => void;
}

const showMore = true;
const comment = "";
const toggleShowMore = () => {};

const PostCard = memo(({ post, likePost, unlikePost }: PostCardProps) => {
  const user: any = {};

  return (
    <Box
      borderRadius={12}
      boxShadow={"lg"}
      padding={"20px 30px"}
      background={"white"}
      fontSize={14}
    >
      <Flex alignItems="center" justifyContent={"space-between"}>
        <Box>
          <Flex gap={2} alignItems="center">
            <Image
              src={post?.user?.profileImage}
              height={35}
              width={35}
              borderRadius={"50%"}
              alt="Profile"
            />
            <p>
              {post?.user?.name}
              {/* <Link to={`/profile/${post.userId}`}>{post?.user?.name}</Link> */}
            </p>
          </Flex>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="More Post Options"
              icon={<FaEllipsis />}
              size="xs"
            />
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Hide</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box
        mt={5}
        dangerouslySetInnerHTML={{
          __html: post.postText,
        }} /* eslint react/no-danger: 0 */
      />
      {post.images && (
        <Flex gap={2} wrap="wrap">
          {post.images.map((image) => (
            <Box>
              <Image src={image} alt="Image" width="100%" />
            </Box>
          ))}
        </Flex>
      )}
      <Box mt={5}>
        <Flex alignItems={"flexStart"} gap={4} width="100%">
          <Box>
            <IconButton
              icon={<FaThumbsUp />}
              color="inherit"
              onClick={() => {
                if (post.liked === true) {
                  unlikePost();
                } else {
                  likePost();
                }
              }}
              size="sm"
              aria-label="Like Post"
            />

            {!!post.likes?.length && <p>{post.likes?.length}</p>}
          </Box>
          <Box flex="1">
            <Input
              borderColor="#007bff"
              fontSize="xs"
              size="sm"
              width="100%"
              borderWidth={1.4}
              borderRadius="0 20px 20px 0"
              onChange={() => {}}
              value={comment}
              placeholder="Comment..."
            />
            <Box mt={2}>
              {post.comments &&
                (showMore
                  ? post.comments?.map((postComment) => (
                      <Comment comment={postComment} />
                    ))
                  : post?.comments
                      .slice(0, 2)
                      .map((postComment) => <Comment comment={postComment} />))}
            </Box>

            {post.comments?.length > 2 && (
              <Button size="xs" onClick={toggleShowMore}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
          <Box>
            <Button type="submit" colorScheme={"blue"} size="sm">
              Comment
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
});

export default PostCard;
