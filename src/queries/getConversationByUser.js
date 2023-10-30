import service from 'services';

const getConversationsByUser = async () => {
  const { data } = await service({
    url: '/user/conversations',
  });
  return data;
};

export default getConversationsByUser;
