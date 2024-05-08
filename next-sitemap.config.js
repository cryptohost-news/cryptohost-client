const { fetchActivitiesPaths } = require('@/app/servises/activities/loadCurrentActivity');
const { fetchPostsPaths } = require('@/app/servises/news/loadCurrentPost');

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
