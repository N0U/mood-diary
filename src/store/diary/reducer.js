import _ from 'lodash';
import moment from 'moment';
import { handleActions } from 'redux-actions';
import {
  isActionFetching,
  isActionSuccessful,
  isActionFailed,
} from '../../utils/fetch-actions';

import {
  entriesFetching,
  entryCreating,
  entryDeleting,
  entriesStoring,
  setDiaryDate,
} from './actions';

const initialState = {
  loading: false,
  entries: {},
  date: moment().startOf('day').toSql(),
};

export default handleActions({
  [entriesFetching]: (state, action) => {
    if(isActionFetching(action)){
      return { ...state, loading: true };
    }

    const { payload } = action;
    if(isActionSuccessful(action)) {
      const {data} = payload;
      return {
        ...state,
        loading: false,
        entries: _.assign(_.keyBy(data, x => x.date) || {}, state.entries)
      };
    }
    else
      return { ...state, loading: false, error: payload || true };
  },
  [entriesStoring]: (state, action) => {
    if(isActionFetching(action)){
      return { ...state, loading: true };
    }

    const { payload } = action;
    if(isActionSuccessful(action))
      return { ...state, loading: false };
    else
      return { ...state, loading: false, error: payload || true };
  },
  [entryCreating]: (state, action) => {
    if(isActionSuccessful(action)) {
      const { payload } = action;
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.date]: payload,
        },
      };
    }
    return state;
  },
  [entryDeleting]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      entries: _.omit(state.entries, [ payload ]),
    };
  },
  [setDiaryDate]: (state, { payload }) => {
    return {
      ...state,
      date: payload
    };
  },
}, initialState);