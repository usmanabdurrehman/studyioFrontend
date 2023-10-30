import axios from 'axios';

const getTechNews = async () => {
  const { data } = await axios({
    url: 'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json',
  });
  return data;
};

export default getTechNews;
