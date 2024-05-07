import axios from 'axios';

import routes from '@/routes';

const loadPromoBanner = async () => {
  // console.log('routes.newsSingle(id)', routes.newsSingle(id))
  try {
    const { data } = await axios.get(routes.getMain('promo-banners'));

    return data;
  } catch (err) {
    console.error('Не удалось получить промо-баннер', err);
  }
};

export default loadPromoBanner;
