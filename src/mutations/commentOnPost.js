import service from 'services';

const commentOnPost = async (comment, postId) => {
  const { data } = await service({
    method: 'post',
    url: '/user/comments',
    data: { comment, postId },
    withCredentials: true,
  });
  return data;
};

export default commentOnPost;
