import axios from 'axios';
import configs from '../configs';

let token = '';

const getAxiosConfigs = () => ({
  baseURL: configs.api,
  mode: 'no-cors',
  headers: {
    'Authorization': token,
  },
});

export const setToken = t => token = t;

export default {
  get: (url, params = {}) => axios.get(url, {
    ...getAxiosConfigs(),
    params,
  }),
  delete: (url, params = {}) => axios.delete(url, {
    ...getAxiosConfigs(),
    params,
  }),
  put: (url, data) => axios.put(url, data, {
    ...getAxiosConfigs(),
  }),
  post: (url, data) => axios.post(url, data, {
    ...getAxiosConfigs(),
  }),
  patch: (url, data) => axios.post(url, data, {
    ...getAxiosConfigs(),
  }),
};