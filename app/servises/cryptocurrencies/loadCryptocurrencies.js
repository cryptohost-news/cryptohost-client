import axios from 'axios';

import routes from '@/routes';

const loadCryptocurrencies = async () => {
  try {
    const { data } = await axios.get(routes.getAll('crypto-currencies'));

    return data;
  } catch (err) {
    console.error('Не удалось получить курсы валют', err);
  }
};

export default loadCryptocurrencies;
