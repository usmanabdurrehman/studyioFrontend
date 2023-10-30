import service from 'services';

const seeNotifications = async () => {
  const { data } = await service({
    url: '/user/seeNotifications',
  });
  return data;
};

export default seeNotifications;
