import axios from 'axios';

import routes from '@/routes';

const loadCategories = async () => {
  try {
    const { data } = await axios.get(routes.getAll('news-categories'));

    return data;
  } catch (err) {
    console.error('Не удалось получить категории', err);
  }
};

export default loadCategories;
