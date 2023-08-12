import { AddPostCard } from "@/Components/AddPostCard/AddPostCard";
import Comment from "@/Components/Comment/Comment";
import PostCard from "@/Components/PostCard/PostCard";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <PostCard post={{}} />
    </main>
  );
}
