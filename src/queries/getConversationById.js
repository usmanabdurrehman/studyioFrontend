import service from 'services';

const getConversationById = async (id) => {
  const { data } = await service({
    url: `/user/conversations/${id}`,
  });
  return data;
};

export default getConversationById;
