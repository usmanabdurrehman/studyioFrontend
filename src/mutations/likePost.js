import service from 'services';

const likePost = async (postId) => {
  const { data } = await service({
    method: 'post',
    url: '/user/likes',
    data: { postId },
  });
  return data;
};

export default likePost;
