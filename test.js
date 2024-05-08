require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
console.log('Starting script...');

const fetchActivitiesPaths = async () => {
  console.log(`${process.env.SERVER_URL}/api/crypto-activities/paths/public`);
  try {
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/crypto-activities/paths/public`);
    // console.log('Data from fetchActivitiesPaths:', data);
    return data;
  } catch (err) {
    // console.error('Не удалось получить пути криптоактивностей', err);
    console.error('Не удалось получить пути криптоактивностей');
  }
};

const fetchPostsPaths = async () => {
  try {
    const { data } = await axios.get(`${process.env.SERVER_URL}/api/news-posts/paths/public`);
    // console.log('Data from fetchPostsPaths:', data);
    return data;
  } catch (err) {
    // console.error('Не удалось получить пути постов', err);
    console.error('Не удалось получить пути постов');
  }
};

// async function generateSitemap(siteUrl) {
//   try {
//     const postsPaths = await fetchPostsPaths();
//     const actitivitsPaths = await fetchActivitiesPaths();
//
//     const newsUrls = postsPaths.map((path) => ({
//       loc: `${siteUrl}/news/${path.params.slug}`, // Формируем URL-адрес страницы с новостью
//       changefreq: 'daily', // Частота изменения страницы
//       priority: 0.7, // Приоритет страницы
//     }));
//
//     // console.log('newsUrls', newsUrls);
//
//     const activitiesUrls = actitivitsPaths.map((path) => ({
//       loc: `${siteUrl}/activities/${path.params.slug}`, // Формируем URL-адрес страницы с активностью
//       changefreq: 'daily', // Частота изменения страницы
//       priority: 0.7, // Приоритет страницы
//     }));
//
//     return {
//       routes: [...newsUrls, ...activitiesUrls],
//     };
//   } catch (err) {
//     console.error('Ошибка при генерации sitemap:', err);
//     return {
//       // Если произошла ошибка, вернем пустой sitemap
//       routes: [], // Можно также вернуть только другие маршруты, если они доступны
//     };
//   }
// }

const generateSitemap = async () => {
  try {
    const postsPaths = await fetchPostsPaths();
    const actitivitsPaths = await fetchActivitiesPaths();

    const newsUrls = postsPaths.map((path) => ({
      loc: `${process.env.SERVER_URL}/news/${path.params.slug}`, // Формируем URL-адрес страницы с новостью
      changefreq: 'daily', // Частота изменения страницы
      priority: 0.7, // Приоритет страницы
    }));

    // console.log('newsUrls', newsUrls);

    const activitiesUrls = actitivitsPaths.map((path) => ({
      loc: `${process.env.SERVER_URL}/activities/${path.params.slug}`, // Формируем URL-адрес страницы с активностью
      changefreq: 'daily', // Частота изменения страницы
      priority: 0.7, // Приоритет страницы
    }));

    return [...newsUrls, ...activitiesUrls];
  } catch (err) {
    console.error('Ошибка при генерации sitemap:', err);
    return [];
  }
};

generateSitemap(process.env.SERVER_URL)
  .then((paths) => {
    console.log('PATHS', paths);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
