import React, {
  useState, useEffect, useCallback, memo,
} from 'react';

import { getTimelinePosts, getTechNews } from 'queries';

import { Timeline } from 'Components';

const TimelineContainer = memo(() => {
  const [posts, setPosts] = useState(null);

  const [techNews, setTechNews] = useState([]);

  const fetchTimelinePosts = useCallback(async () => {
    const data = await getTimelinePosts();
    setPosts(data);
  }, [setPosts]);

  const fetchTechNews = useCallback(async () => {
    const { articles } = await getTechNews();
    setTechNews(articles.slice(0, 3));
  }, [setTechNews]);

  useEffect(() => {
    fetchTimelinePosts();
    fetchTechNews();
  }, [fetchTimelinePosts, fetchTechNews]);

  return (
    <Timeline
      fetchTimelinePosts={fetchTimelinePosts}
      techNews={techNews}
      posts={posts}
    />
  );
});

export default TimelineContainer;
