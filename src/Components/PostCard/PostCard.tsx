"use client";

import {
  useDeletePost,
  useHidePost,
  useLikePost,
  useUnhidePost,
  useUnlikePost,
} from "@/mutations";
import { usePostById, useProfileInfo, useTimelinePosts } from "@/queries";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { memo, useCallback, useMemo, useState } from "react";
import { AddPostCard } from "../AddPostCard";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";

import { PostComments } from "../PostComments";
import { usePathname } from "next/navigation";
import { GripHorizontal, HandThumbsUp, ThreeDots } from "react-bootstrap-icons";
import { useProgressRouter } from "@/hooks";

interface PostCardProps {
  post: Post;
}

const PostCard = memo(({ post }: PostCardProps) => {
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();

  const { mutateAsync: hidePost } = useHidePost();
  const { mutateAsync: unhidePost } = useUnhidePost();

  const { mutateAsync: deletePost } = useDeletePost();

  const { refetch: refetchPostById } = usePostById(post._id);

  const { refetch: refetchTimeline } = useTimelinePosts();
  const { refetch: refetchProfileInfo } = useProfileInfo();

  const [showEditModal, setShowEditModal] = useState(false);

  const router = useProgressRouter();
  const pathname = usePathname();

  const redirectToTimeline = useCallback(() => {
    pathname !== "/timeline" && router.push("/timeline");
  }, []);

  const updatePostsInfo = useCallback(() => {
    refetchPostById();
    refetchTimeline();
    refetchProfileInfo();
  }, [refetchPostById, refetchTimeline, refetchProfileInfo]);

  const onLikePost = useCallback(async () => {
    await likePost(post._id);
    updatePostsInfo();
  }, [likePost, updatePostsInfo]);

  const onUnlikePost = useCallback(async () => {
    await unlikePost(post._id);
    updatePostsInfo();
  }, [unlikePost, updatePostsInfo]);

  const onDeletePost = useCallback(async () => {
    await deletePost(post._id);
    updatePostsInfo();
    redirectToTimeline();
  }, [deletePost, updatePostsInfo, redirectToTimeline]);

  const onHidePost = useCallback(async () => {
    await hidePost(post._id);
    updatePostsInfo();
  }, [hidePost, updatePostsInfo, redirectToTimeline]);

  const onUnHidePost = useCallback(async () => {
    await unhidePost(post._id);
    updatePostsInfo();
  }, [hidePost, updatePostsInfo]);

  const onEditPost = useCallback(async () => {
    setShowEditModal(true);
  }, []);

  const closeModal = useCallback(() => setShowEditModal(false), []);

  return (
    <>
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
                icon={<ThreeDots />}
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
        {post.postText && (
          <Box
            mt={5}
            dangerouslySetInnerHTML={{
              __html: post.postText,
            }} /* eslint react/no-danger: 0 */
          />
        )}
        {!!post.images?.length && (
          <Flex gap={2} wrap="wrap" mt={4}>
            {post.images.map((image) => (
              <Box>
                <Image src={image} alt="Image" width="100%" />
              </Box>
            ))}
          </Flex>
        )}
        {!!post.files?.length && (
          <Flex gap={2} wrap="wrap" mt={4}>
            {post.files.map((attachment) => {
              const ext = attachment?.filename
                ?.split(".")
                .at(-1) as DefaultExtensionType;

              return (
                <Box width={12} height={12}>
                  <FileIcon extension={ext} {...defaultStyles[ext]} />
                </Box>
              );
            })}
          </Flex>
        )}
        <Box mt={5}>
          <Flex alignItems={"flexStart"} gap={4} width="100%">
            <Box>
              <Flex alignItems={"center"} gap={2}>
                <IconButton
                  icon={<HandThumbsUp />}
                  color={post.liked ? "blue" : "inherit"}
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
              </Flex>
            </Box>

            <Box flex="1">
              <PostComments post={post} />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Modal isOpen={showEditModal} onClose={closeModal} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={12}>
            <AddPostCard post={post} onSubmit={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default PostCard;
