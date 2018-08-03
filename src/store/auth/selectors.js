import { createSelectors } from '../../utils/selectors';

module.exports = createSelectors({
  isLoading: state => state.loading,
  isLogged: state => state.logged,
  token: state => state.token,
  options: state => state.options,
}, 'auth');