const hostname = window.location.hostname;
const isDev = hostname === 'localhost';
export default {
  env: isDev ? 'dev' : 'prod',
  api:  isDev ? 'http://localhost/dev/mood-diary/api' : '/api',
  redirectUrl: window.location.origin,
};