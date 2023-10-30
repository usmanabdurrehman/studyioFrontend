import service from 'services';

const unhidePost = async (postId) => {
  const { data } = await service({
    url: '/user/unhidePost',
    method: 'put',
    data: { postId },
  });
  return data;
};

export default unhidePost;
