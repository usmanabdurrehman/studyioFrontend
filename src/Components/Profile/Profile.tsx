"use client";

import React, { memo, useCallback, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import styles from "./Profile.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Post } from "@/types";
import { useLoggedUser, useProfileInfo } from "@/queries";
import {
  useFollowPerson,
  useUnfollowPerson,
  useUpdateProfilePicture,
} from "@/mutations";
import Link from "next/link";
import { PostCard } from "../PostCard";
import { Box, Flex, IconButton, Image, Input, Spinner } from "@chakra-ui/react";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";
import { Camera, PersonFillAdd, PersonFillDash } from "react-bootstrap-icons";
import { PATH } from "@/constants";

const IMAGE_SIZE = 150;

const PostContent = memo(function PostContent({
  posts,
}: {
  posts: Post[] | undefined;
}) {
  if (!posts)
    return (
      <Box>
        {Array.from({ length: 3 }, (_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </Box>
    );

  if (posts.length === 0) {
    return (
      <Box mt={8}>
        <p>
          Sorry. There are no posts to show.{" "}
          <Link href={PATH.TIMELINE}>Make your first now</Link>
        </p>
      </Box>
    );
  }
  return (
    <Flex direction="column" gap={4}>
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </Flex>
  );
});

const Profile = memo(function Profile({ userId }: { userId: string }) {
  const { data: profileInfo, refetch: refetchProfileInfo } =
    useProfileInfo(userId);

  const { data: user } = useLoggedUser();
  const loggedUserId = user?._id;

  const { mutateAsync: follow } = useFollowPerson();
  const { mutateAsync: unfollow } = useUnfollowPerson();
  const { refetch: refetchLoggedUserInfo } = useLoggedUser();

  const onUnfollow = useCallback(async () => {
    await unfollow(userId);
    refetchProfileInfo();
  }, [unfollow, userId, refetchProfileInfo]);

  const onFollow = useCallback(async () => {
    await follow(userId);
    refetchProfileInfo();
  }, [follow, userId, refetchProfileInfo]);

  const isFollowing = !!profileInfo?.user?.isFollowing;

  const { mutateAsync: updateProfilePicture, isLoading } =
    useUpdateProfilePicture();

  const onProfilePictureSelect = useCallback(
    async (image: File) => {
      const formData = new FormData();
      formData.append("image", image);
      await updateProfilePicture(formData);
      refetchProfileInfo();
      refetchLoggedUserInfo();
    },
    [updateProfilePicture, refetchProfileInfo, refetchLoggedUserInfo]
  );

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Box p={4}>
      <Flex height={300} alignItems="center" gap={6}>
        <Flex alignItems={"center"} direction="column">
          <Box data-group pos={"relative"} width={IMAGE_SIZE}>
            {profileInfo ? (
              <Image
                src={profileInfo?.user?.profileImage || "/default.jpg"}
                alt="Profile"
                height={IMAGE_SIZE}
                width={IMAGE_SIZE}
                cursor="pointer"
                borderRadius={"sm"}
              />
            ) : (
              <Skeleton height={IMAGE_SIZE} width={IMAGE_SIZE} />
            )}
            {isLoading && (
              <Flex
                height="100%"
                width="100%"
                alignItems={"center"}
                justifyContent="center"
                pos={"absolute"}
                top={0}
                right={0}
                bg="lightgray"
                opacity={0.2}
              >
                <Spinner size="lg" />{" "}
              </Flex>
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
              onClick={() => fileRef?.current?.click()}
            />
          </Box>
          <Input
            type="file"
            display="none"
            ref={fileRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                onProfilePictureSelect(e.target.files?.[0]);
                e.target.files = null;
              }
            }}
            accept="image/*"
          />
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
          <p>{profileInfo?.user?.bio}</p>
        </Box>
      </Flex>
      <Box mt={4}>
        <PostContent posts={profileInfo?.posts} />
      </Box>
      {userId !== loggedUserId && profileInfo?.user && (
        <IconButton
          pos={"fixed"}
          bottom={"70px"}
          right={3}
          aria-label="follow/unfollow"
          position={"fixed"}
          colorScheme={isFollowing ? "whatsapp" : "linkedin"}
          icon={isFollowing ? <PersonFillDash /> : <PersonFillAdd />}
          onClick={isFollowing ? onUnfollow : onFollow}
          borderRadius="50%"
          size="lg"
        />
      )}
    </Box>
  );
});

export default Profile;
