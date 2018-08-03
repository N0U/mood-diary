import _ from 'lodash';

export const createSelectors = (selectors, reducer) => {
  const wrapper = fn => (state, ...args) => fn(state[reducer], ...args);
  return _.mapValues(selectors, s => wrapper(s));
};

export default selectors => state =>
  _.mapValues(selectors, x => typeof x === 'function' ? x(state) : x );