import axios from 'axios';

import routes from '@/routes';

export const fetchActivitiesPaths = async () => {
  try {
    const { data } = await axios.get(routes.getPaths('crypto-activities'));
    return data;
  } catch (err) {
    console.error('Не удалось получить пути криптоактивностей', err);
  }
};

export const loadCurrentActivity = async (slug) => {
  try {
    const { data } = await axios.get(routes.getOne('crypto-activities', slug));

    return data;
  } catch (err) {
    console.error('Не удалось получить криптоактивность', err);
  }
};
