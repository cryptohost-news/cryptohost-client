import axios from 'axios';

import routes from '@/routes';

export const fetchPostsPaths = async () => {
  try {
    const { data } = await axios.get(routes.getPaths('news-posts'));
    return data;
  } catch (err) {
    console.error('Не удалось получить пути постов', err);
  }
};

export const loadCurrentPost = async (slug) => {
  try {
    const { data } = await axios.get(routes.getOne('news-posts', slug));

    return data;
  } catch (err) {
    console.error('Не удалось получить пост', err);
  }
};
