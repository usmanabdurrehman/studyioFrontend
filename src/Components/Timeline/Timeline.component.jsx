import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { PostCardSkeleton } from 'Components';

import { AddPostCard, PostCard } from 'Containers';
import styles from './Timeline.module.scss';

const Timeline = memo(({ fetchTimelinePosts, techNews, posts }) => {
  const postContent = () => {
    if (posts) {
      if (posts.length === 0) {
        return (
          <p className={styles.noPosts}>
            Sorry. There are no posts to show. Follow some people so that their
            posts come on your timeline
          </p>
        );
      }
      return posts.map((post) => (
        <PostCard
          post={post}
          fetchFunction={fetchTimelinePosts}
          page="timeline"
        />
      ));
    }
    return Array(3)
      .fill('-')
      .map(() => <PostCardSkeleton />);
  };

  return (
    <div className={styles.timelineGrid}>
      <div>
        <AddPostCard fetchFunction={fetchTimelinePosts} />
        <div>{postContent()}</div>
      </div>
      <div>
        <div className={styles.techNewsCard}>
          <Typography variant="h5">Tech News</Typography>
          <ol className={styles.techNewsList}>
            {techNews.map((news) => (
              <li>{news.title}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
});

export default Timeline;
