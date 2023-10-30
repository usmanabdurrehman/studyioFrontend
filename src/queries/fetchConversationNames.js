import service from 'services';

const fetchConversationNames = async (name) => {
  const { data } = await service({
    method: 'post',
    url: '/user/conversations/more',
    body: { name },
  });
  return data;
};

export default fetchConversationNames;
