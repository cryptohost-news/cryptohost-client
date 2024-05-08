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

module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  async generateSitemap({ siteUrl }) {
    try {
      const postsPaths = await fetchPostsPaths();
      const actitivitsPaths = await fetchActivitiesPaths();

      const newsUrls = postsPaths.map((path) => ({
        loc: `${siteUrl}/news/${path.params.slug}`, // Формируем URL-адрес страницы с новостью
        changefreq: 'daily', // Частота изменения страницы
        priority: 0.7, // Приоритет страницы
      }));

      const activitiesUrls = actitivitsPaths.map((path) => ({
        loc: `${siteUrl}/activities/${path.params.slug}`, // Формируем URL-адрес страницы с активностью
        changefreq: 'daily', // Частота изменения страницы
        priority: 0.7, // Приоритет страницы
      }));

      return {
        routes: [...newsUrls, ...activitiesUrls],
      };
    } catch (err) {
      console.error('Ошибка при генерации sitemap:', err);
      return {
        // Если произошла ошибка, вернем пустой sitemap
        routes: [], // Можно также вернуть только другие маршруты, если они доступны
      };
    }
  },
};
