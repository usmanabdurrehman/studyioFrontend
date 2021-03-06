import React, {
  useState, useEffect, useCallback, memo,
} from 'react';

import { PostCardSkeleton } from 'Components';
import { PostCard } from 'Containers';

import { getPostById } from 'queries';

const PostFetch = memo(({ id }) => {
  const [post, setPost] = useState(null);

  const getPostHandler = useCallback(async () => {
    const data = await getPostById(id);
    setPost(data);
  }, [id, setPost]);

  useEffect(() => {
    getPostHandler();
  }, [getPostHandler]);

  return post ? (
    <PostCard post={post} fetchFunction={getPostHandler} />
  ) : (
    <PostCardSkeleton />
  );
});

export default PostFetch;
