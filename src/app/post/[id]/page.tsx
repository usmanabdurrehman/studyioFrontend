"use client";

import { Layout } from "@/Components/Layout";
import { PostCard } from "@/Components/PostCard";
import { PATH } from "@/constants";
import { useProgressRouter } from "@/hooks";
import { usePostById } from "@/queries";
import { Post } from "@/types";
import React, { useEffect } from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  const { data: post } = usePostById(params?.id);
  const router = useProgressRouter();

  useEffect(() => {
    if (post?.hasOwnProperty("status")) router.push(PATH.TIMELINE);
  }, [post]);

  if (!post) return null;

  return (
    <Layout>
      <PostCard post={post as Post} />
    </Layout>
  );
}
