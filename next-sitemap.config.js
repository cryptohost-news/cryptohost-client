require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

const fetchActivitiesPaths = async () => {
  try {
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/crypto-activities/paths/public`);
    return data;
  } catch (err) {
    console.error('Не удалось получить пути криптоактивностей', err);
  }
};

const fetchPostsPaths = async () => {
  try {
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/news-posts/paths/public`);
    return data;
  } catch (err) {
    console.error('Не удалось получить пути постов', err);
  }
};

const getaAdditionalPaths = async (siteUrl) => {
  try {
    const postsPaths = await fetchPostsPaths();
    const actitivitsPaths = await fetchActivitiesPaths();

    const newsUrls = postsPaths.map((path) => ({
      loc: `${siteUrl}/news/${path.params.slug}`, // Формируем URL-адрес страницы с новостью
      changefreq: 'daily', // Частота изменения страницы
      priority: 0.7, // Приоритет страницы
    }));

    const activitiesUrls = actitivitsPaths.map((path) => ({
      loc: `${siteUrl}/activities/${path.params.slug}`,
      changefreq: 'daily',
      priority: 0.7,
    }));

    return [...newsUrls, ...activitiesUrls];
  } catch (err) {
    console.error('Ошибка при генерации sitemap:', err);
    return [];
  }
};

module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  additionalPaths: async () => {
    return await getaAdditionalPaths(process.env.SITE_URL);
  },
};
