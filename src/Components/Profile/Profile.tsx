"use client";

import React, { memo, useCallback } from "react";

import Skeleton from "react-loading-skeleton";
import styles from "./Profile.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Post } from "@/types";
import { useLoggedUser, useProfileInfo } from "@/queries";
import { useFollowPerson, useUnfollowPerson } from "@/mutations";
import Link from "next/link";
import { PostCard } from "../PostCard";
import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";
import { Camera, PersonFillAdd, PersonFillDash } from "react-bootstrap-icons";

const IMAGE_SIZE = 150;

const Profile = memo(({ userId }: { userId: string }) => {
  const { data: profileInfo, refetch: refetchProfileInfo } =
    useProfileInfo(userId);

  const { data: user } = useLoggedUser();
  const loggedUserId = user?._id;

  const postContent = (posts: Post[] | undefined) => {
    if (posts) {
      if (posts.length === 0) {
        return (
          <p className={styles.noPosts}>
            Sorry. There are no posts to show.{" "}
            <Link href="/timeline">Make your first now</Link>
          </p>
        );
      }
      return (
        <Flex direction="column" gap={4}>
          {posts.map((post: Post) => (
            <PostCard post={post} />
          ))}
        </Flex>
      );
    }
    return Array(3)
      .fill("-")
      .map(() => <PostCardSkeleton />);
  };

  const { mutateAsync: follow } = useFollowPerson();
  const { mutateAsync: unfollow } = useUnfollowPerson();

  const onUnfollow = useCallback(async () => {
    await unfollow(userId);
    refetchProfileInfo();
  }, []);
  const onFollow = useCallback(async () => {
    await follow(userId);
    refetchProfileInfo();
  }, []);

  const isFollowing = !!profileInfo?.user?.isFollowing;

  return (
    <Box p={4}>
      <Flex height={300} alignItems="center" gap={6}>
        <Flex alignItems={"center"} direction="column">
          <Box data-group pos={"relative"} width={IMAGE_SIZE}>
            {profileInfo?.user?.profileImage ? (
              <Image
                src={profileInfo?.user?.profileImage}
                className={styles.profilePic}
                alt="Profile"
                height={IMAGE_SIZE}
                width={IMAGE_SIZE}
              />
            ) : (
              <Skeleton height={IMAGE_SIZE} width={IMAGE_SIZE} />
            )}
            <IconButton
              zIndex={1}
              pos={"absolute"}
              bottom={2}
              right={2}
              visibility="hidden"
              _groupHover={{ visibility: "visible !important" }}
              aria-label="Edit Picture"
              icon={<Camera />}
            />
          </Box>
          <div className={styles.profileStats}>
            <h2>{profileInfo?.user?.name}</h2>
            <div className={styles.profileStatsGrid}>
              <div className={styles.profileStatsCount}>
                {profileInfo?.user?.followers.length}
              </div>
              <div className={styles.profileStatsCount}>
                {profileInfo?.user?.following.length}
              </div>
              <div className={styles.profileStatsHeader}>Followers</div>
              <div className={styles.profileStatsHeader}>Following</div>
            </div>
          </div>
        </Flex>
        <Box flex="1">
          <div className={styles.profileInfo}>
            <p>{profileInfo?.user?.bio}</p>
          </div>
        </Box>
      </Flex>
      <Box mt={4}>{postContent(profileInfo?.posts)}</Box>
      {userId !== loggedUserId && profileInfo?.user && (
        <div className={styles.fabWrapper}>
          <IconButton
            aria-label="follow/unfollow"
            pos={"absolute"}
            bottom={1}
            right={1}
            colorScheme={isFollowing ? "whatsapp" : "linkedin"}
            icon={isFollowing ? <PersonFillDash /> : <PersonFillAdd />}
            onClick={isFollowing ? onUnfollow : onFollow}
          />
        </div>
      )}
    </Box>
  );
});

export default Profile;
