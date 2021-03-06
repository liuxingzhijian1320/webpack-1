import axios from 'axios';

const instance = axios.create({
  // baseURL: '/',
  // timeout: 1000,
});

instance.interceptors.response.use((response) => {
  console.info(response);
  if (response.data.iRet !== 1) {
    return Promise.reject(response);
  }
  return response.data;
}, error => Promise.reject(error.response || error));

export default instance;
