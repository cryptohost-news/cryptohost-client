import 'dotenv/config';

export const baseUrl = process.env.SERVER_URL; // TODO поменять URL
const apiPath = 'api';

export default {
  // CRUD
  getOne: (pathname, id) => [baseUrl, apiPath, pathname, 'public', id].join('/'),
  getAll: (pathname) => [baseUrl, apiPath, pathname, 'public'].join('/'),

  getMain: (pathname) => [baseUrl, apiPath, pathname, 'main', 'public'].join('/'),
  getPaths: (pathname) => [baseUrl, apiPath, pathname, 'paths', 'public'].join('/'),
};
