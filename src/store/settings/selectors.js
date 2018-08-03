import { createSelectors } from '../../utils/selectors';

module.exports = createSelectors({
  locale: state => state.locale,
}, 'settings');