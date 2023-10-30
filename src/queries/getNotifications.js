import service from 'services';

const getNotifications = async () => {
  const { data } = await service({
    url: '/user/notifications',
  });
  return data;
};

export default getNotifications;
