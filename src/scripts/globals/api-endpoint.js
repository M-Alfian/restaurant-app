import CONFIG from './config';

const API_ENDPOINT = {
  HOME_PAGE: `${CONFIG.BASE_URL}list`,
  POST_REVIEW: `${CONFIG.BASE_URL}review`,
  IMAGES: (size) => `${CONFIG.BASE_IMAGE_URL}${size}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
};

export default API_ENDPOINT;
