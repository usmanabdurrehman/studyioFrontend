"use client";

import { Layout } from "@/Components/Layout";
import { PostCard } from "@/Components/PostCard";
import { useProgressRouter } from "@/hooks";
import { usePostById } from "@/queries";
import { Post } from "@/types";
import React from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  const { data: post } = usePostById(params?.id);
  const router = useProgressRouter();
  if (!post) return null;

  if (post.hasOwnProperty("status")) router.push("/timeline");

  return (
    <Layout>
      <PostCard post={post as Post} />
    </Layout>
  );
}
