"use client";

import { Layout } from "@/Components/Layout";
import { PostCard } from "@/Components/PostCard";
import { usePostById } from "@/queries";
import React from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  console.log({ params });
  const { data: post } = usePostById(params?.id);
  if (!post) return null;

  return (
    <Layout>
      <PostCard post={post} />
    </Layout>
  );
}
