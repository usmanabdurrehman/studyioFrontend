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
import { memo, useCallback, useMemo, useState } from "react";
import { AddPostCard } from "../AddPostCard";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";

import { PostComments } from "../PostComments";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  GripHorizontal,
  HandThumbsUp,
  ThreeDots,
} from "react-bootstrap-icons";
import { useProgressRouter } from "@/hooks";
import SwipeableViews from "react-swipeable-views";
import { PATH } from "@/constants";

interface PostCardProps {
  post: Post;
}

const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();

  const { mutateAsync: hidePost } = useHidePost();
  const { mutateAsync: unhidePost } = useUnhidePost();

  const { mutateAsync: deletePost } = useDeletePost();

  const { refetch: refetchPostById } = usePostById(post._id, false);

  const { refetch: refetchTimeline } = useTimelinePosts();
  const { refetch: refetchProfileInfo } = useProfileInfo();

  const [showEditModal, setShowEditModal] = useState(false);

  const router = useProgressRouter();
  const pathname = usePathname();

  const redirectToTimeline = useCallback(() => {
    pathname !== PATH.TIMELINE && router.push(PATH.TIMELINE);
  }, [pathname, router]);

  const updatePostsInfo = useCallback(() => {
    refetchPostById();
    refetchTimeline();
    refetchProfileInfo();
  }, [refetchPostById, refetchTimeline, refetchProfileInfo]);

  const onLikePost = useCallback(async () => {
    await likePost(post._id);
    updatePostsInfo();
  }, [likePost, updatePostsInfo, post._id]);

  const onUnlikePost = useCallback(async () => {
    await unlikePost(post._id);
    updatePostsInfo();
  }, [unlikePost, updatePostsInfo, post._id]);

  const onDeletePost = useCallback(async () => {
    await deletePost(post._id);
    updatePostsInfo();
    redirectToTimeline();
  }, [deletePost, updatePostsInfo, redirectToTimeline, post._id]);

  const onHidePost = useCallback(async () => {
    await hidePost(post._id);
    updatePostsInfo();
  }, [hidePost, updatePostsInfo, post._id]);

  const onUnHidePost = useCallback(async () => {
    await unhidePost(post._id);
    updatePostsInfo();
  }, [unhidePost, updatePostsInfo, post._id]);

  const onEditPost = useCallback(async () => {
    setShowEditModal(true);
  }, []);

  const closeModal = useCallback(() => setShowEditModal(false), []);

  const [index, setIndex] = useState(0);

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
                <Link href={PATH.getProfilePath(post.userId)}>
                  {post?.user?.name}
                </Link>
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
                {post.hidden ? (
                  <MenuItem onClick={onUnHidePost}>Unhide</MenuItem>
                ) : (
                  <MenuItem onClick={onHidePost}>Hide</MenuItem>
                )}
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
          <Flex mt={4} pos="relative" alignItems={"center"}>
            <Flex
              pos="absolute"
              top="0"
              left="0"
              bottom="0"
              alignItems={"center"}
              zIndex="1"
            >
              <IconButton
                aria-label="previous image"
                icon={<ArrowLeft />}
                isDisabled={!index}
                size="sm"
                onClick={() => setIndex((prevIndex) => prevIndex - 1)}
              />
            </Flex>
            {/*@ts-ignore*/}
            <SwipeableViews index={index}>
              {/*@ts-ignore*/}
              {post.images.map((image) => (
                <Flex height="100%" alignItems={"center"} key={image}>
                  <Image src={image} alt="Image" height="100%" />
                </Flex>
              ))}
            </SwipeableViews>
            <Flex
              pos="absolute"
              top="0"
              right="0"
              bottom="0"
              alignItems={"center"}
              zIndex="1"
            >
              <IconButton
                aria-label="next image"
                icon={<ArrowRight />}
                isDisabled={post.images?.length - 1 === index}
                size="sm"
                onClick={() => setIndex((prevIndex) => prevIndex + 1)}
              />
            </Flex>
          </Flex>
        )}
        {!!post.files?.length && (
          <Flex gap={2} wrap="wrap" mt={4}>
            {post.files.map(({ filename }) => {
              const ext = filename?.split(".").at(-1) as DefaultExtensionType;

              return (
                <Box width={12} height={12} key={filename}>
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
                  colorScheme={post.liked ? "linkedin" : undefined}
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
