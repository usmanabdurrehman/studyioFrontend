import service from 'services';

const getUnseenNotificationsCount = async () => {
  const { data } = await service({
    url: '/user/getUnseenNotificationsCount',
  });
  return data;
};

export default getUnseenNotificationsCount;
