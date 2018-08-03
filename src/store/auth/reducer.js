import { handleActions } from 'redux-actions';
import {
  isActionFetching,
  isActionSuccessful,
  isActionFailed,
} from '../../utils/fetch-actions';

import {
  tokenRenewing,
  optionsFetching,
  authLogout
} from './actions';

const initialState = {
  loading: false,
  logged: false,
  options: {},
  // token
};

export default handleActions({
  [tokenRenewing]: (state, action) => {
    if(isActionFetching(action))
      return { ...state, loading: true };

    const { payload } = action;
    if(isActionSuccessful(action))
      return { ...state, loading: false, logged: true, token: payload };
    else
      return { ...state, loading: false, logged: false, token: undefined };
  },
  [optionsFetching]: (state, action) => {
    if(isActionFetching(action))
      return { ...state, loading: true };

    const { payload } = action;
    if(isActionSuccessful(action))
      return { ...state, loading: false, options: payload };
  },
  [authLogout]: (state, action) => {
    return { ...state, loading: false, logged: false, token: undefined };
  }
}, initialState);