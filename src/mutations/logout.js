import service from 'services';

const logout = async () => {
  const { data } = await service({
    url: '/user/logout',
  });
  return data;
};

export default logout;
