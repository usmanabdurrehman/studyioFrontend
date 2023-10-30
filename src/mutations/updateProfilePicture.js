import service from 'services';

const updateProfilePicture = async (formdata) => {
  const { data } = await service({
    method: 'post',
    url: '/user/updateProfileImage',
    data: formdata,
  });
  return data;
};

export default updateProfilePicture;
