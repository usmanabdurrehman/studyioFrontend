"use client";

import {
  useDeletePost,
  useHidePost,
  useLikePost,
  useUnhidePost,
  useUnlikePost,
} from "@/mutations";
import { Post } from "@/types";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { memo, useCallback } from "react";
import { FaEllipsis, FaThumbsUp } from "react-icons/fa6";

import { PostComments } from "../PostComments";

interface PostCardProps {
  post: Post;
}

const PostCard = memo(({ post }: PostCardProps) => {
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();

  const { mutateAsync: hidePost } = useHidePost();
  const { mutateAsync: unhidePost } = useUnhidePost();

  const { mutateAsync: deletePost } = useDeletePost();

  const onLikePost = useCallback(async () => {
    await likePost(post._id);
  }, []);
  const onUnlikePost = useCallback(async () => {
    await unlikePost(post._id);
  }, []);

  const onDeletePost = useCallback(async () => {
    await deletePost(post._id);
  }, []);
  const onHidePost = useCallback(async () => {
    await hidePost(post._id);
  }, []);

  const onEditPost = useCallback(async () => {
    await hidePost(post._id);
  }, []);

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
              <Link href={`/profile/${post.userId}`}>{post?.user?.name}</Link>
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
              <MenuItem onClick={onEditPost}>Edit</MenuItem>
              <MenuItem onClick={onDeletePost}>Delete</MenuItem>
              <MenuItem onClick={onHidePost}>Hide</MenuItem>
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
                if (post.liked) {
                  onUnlikePost();
                } else {
                  onLikePost();
                }
              }}
              size="sm"
              aria-label="Like Post"
            />

            {!!post.likes?.length && <p>{post.likes?.length}</p>}
          </Box>
          <Box flex="1">
            <PostComments post={post} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
});

export default PostCard;
