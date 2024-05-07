import axios from 'axios';

import routes from '@/routes';

const loadPosts = async (page, pageSize, categoryIds = [], excludeIds = []) => {
  const params = {
    page,
    pageSize,
    categoryIds: JSON.stringify(categoryIds),
    excludeIds: JSON.stringify(excludeIds),
  };

  try {
    const { data } = await axios.get(routes.getAll('news-posts'), { params });

    return data;
  } catch (err) {
    console.error('Не удалось получить посты', err);
  }
};

export default loadPosts;
