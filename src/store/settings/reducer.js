import { handleActions } from 'redux-actions';

import {
  setLocale,
} from './actions';

const initialState = {
  locale: navigator.language.slice(0,2),
};

export default handleActions({
  [setLocale]: (state, { payload }) => {
    return { ...state, locale: payload || state.locale };
  },
}, initialState);