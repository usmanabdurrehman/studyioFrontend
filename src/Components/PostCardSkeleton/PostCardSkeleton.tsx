import React, { memo } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./PostCardSkeleton.module.scss";

const PostCardSkeleton = memo(function PostCardSkeleton() {
  return (
    <div className={styles.postCard}>
      <div className={styles.cardHeader}>
        <Skeleton className={styles.profilePicture} />
        <p className={styles.nameHandle}>
          <Skeleton width="100px" />
        </p>
      </div>
      <div className={styles.cardBody}>
        <Skeleton count={2} />
      </div>
      <div className={styles.fileContainer}>
        {Array.from({ length: 3 }, (_, i) => (
          <div className={styles.fileCard} key={i}>
            <div className={styles.fileCardIcon}>
              <Skeleton width="40px" height="60px" />
            </div>
            <div className={styles.fileName}>
              <Skeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PostCardSkeleton;
