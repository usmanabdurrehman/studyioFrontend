"use client";

import { Post } from "@/types";
import { Box, Button, Flex, IconButton, Image, Input } from "@chakra-ui/react";
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
    <div className={styles.postCard}>
      <Flex
        className={styles.cardHeader}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Box>
          <Flex gap={2} alignItems="center">
            <Image
              className={styles.profilePicture}
              src={post?.user?.profileImage}
              height={35}
              width={35}
              borderRadius={"50%"}
              alt="Profile"
            />
            <p className={styles.nameHandle}>
              {post?.user?.name}
              {/* <Link to={`/profile/${post.userId}`}>{post?.user?.name}</Link> */}
            </p>
          </Flex>
        </Box>
        <Box>
          <IconButton
            icon={<FaEllipsis />}
            aria-label={"More Post Options"}
            size="xs"
            onClick={() => {}}
          />
        </Box>
      </Flex>
      <div
        className={styles.cardBody}
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
      <form className={styles.postCardFooter} onSubmit={() => {}}>
        <Flex alignItems={"center"} gap={4} width="100%">
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

            {post.likes?.length !== 0 && (
              <p className={styles.likesCount}>{post.likes?.length}</p>
            )}
          </Box>
          <Box flex="1">
            <Input
              borderColor="#007bff"
              fontSize="xs"
              size="sm"
              width="100%"
              borderWidth={1.4}
              borderRadius="0 20px 20px 0"
              className={styles.commentInput}
              onChange={() => {}}
              value={comment}
              placeholder="Comment..."
            />
            {post.comments &&
              (showMore
                ? post.comments?.map((postComment) => (
                    <Comment comment={postComment} />
                  ))
                : post?.comments
                    .slice(0, 2)
                    .map((postComment) => <Comment comment={postComment} />))}
            {post.comments?.length > 2 && (
              <div
                onClick={toggleShowMore}
                onKeyPress={toggleShowMore}
                role="button"
                tabIndex={-1}
              >
                <p className={styles.moreText}>
                  {showMore ? "Show Less" : "Show More"}
                </p>
              </div>
            )}
          </Box>
          <Box>
            <Button type="submit" colorScheme={"blue"} size="sm">
              Comment
            </Button>
          </Box>
        </Flex>
      </form>
      {/* <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className={styles.postOptions}>
            {user._id === post.userId && (
              <>
                <div
                  className={styles.postOption}
                  onClick={() => {
                    handleClose();
                    editPost(post._id);
                  }}
                  onKeyPress={() => {
                    handleClose();
                    editPost(post._id);
                  }}
                  role="button"
                  tabIndex="-1"
                >
                  Edit
                </div>
                <div
                  className={styles.postOption}
                  onClick={() => {
                    handleClose();
                    deletePost(post._id);
                  }}
                  onKeyPress={() => {
                    handleClose();
                    deletePost(post._id);
                  }}
                  role="button"
                  tabIndex="-1"
                >
                  Delete
                </div>
              </>
            )}
            {user._id !== post.userId && (
              <div
                className={styles.postOption}
                onClick={() => {
                  handleClose();
                  post?.hidden ? unhidePost(post._id) : hidePost(post._id);
                }}
                onKeyPress={() => {
                  handleClose();
                  post?.hidden ? unhidePost(post._id) : hidePost(post._id);
                }}
                role="button"
                tabIndex="-1"
              >
                {post?.hidden ? "Unhide" : "Hide"}
              </div>
            )}
          </div>
        </Popover> */}
    </div>
  );
});

export default PostCard;
