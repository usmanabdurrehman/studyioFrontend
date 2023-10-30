import service from 'services';

const editPost = async (formdata) => {
  const { data } = await service({
    url: '/user/posts',
    method: 'put',
    data: formdata,
  });
  return data;
};

export default editPost;
