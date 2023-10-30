import service from 'services';

const getPostById = async (id) => {
  const { data } = await service({
    url: `/user/post/${id}`,
  });
  return data;
};

export default getPostById;
