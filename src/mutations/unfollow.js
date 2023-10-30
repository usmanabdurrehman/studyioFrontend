import service from 'services';

const unfollow = async (id) => {
  const { data } = await service({
    method: 'delete',
    url: '/user/follow',
    data: { userId: id },
  });
  return data;
};

export default unfollow;
