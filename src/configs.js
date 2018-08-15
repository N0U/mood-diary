const hostname = window.location.hostname;
const isDev = hostname === 'localhost';
export default {
  env: isDev ? 'dev' : 'prod',
  api:  isDev ? 'http://mood-diary.me/api' : '/api',
  redirectUrl: window.location.origin,
};