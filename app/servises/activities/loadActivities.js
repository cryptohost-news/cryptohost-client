import axios from 'axios';

import routes from '@/routes';

const loadActivities = async (page, pageSize, excludeIds = []) => {
  const params = {
    page,
    pageSize,
    excludeIds: JSON.stringify(excludeIds),
  };

  try {
    const { data } = await axios.get(routes.getAll('crypto-activities'), { params });

    return data;
  } catch (err) {
    console.error('Не удалось получить криптоактивности', err);
  }
};

export default loadActivities;
