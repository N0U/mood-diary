import { createSelectors } from '../../utils/selectors';

module.exports = createSelectors({
  isLoading: state => state.loading,
  entries: state => state.entries,
  diaryDate: state => state.date,
}, 'diary');