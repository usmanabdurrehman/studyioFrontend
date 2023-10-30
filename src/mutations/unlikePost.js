import service from 'services';

const unlikePost = async (postId) => {
  const { data } = await service({
    method: 'delete',
    url: '/user/likes',
    data: { postId },
    withCredentials: true,
  });
  return data;
};

export default unlikePost;
