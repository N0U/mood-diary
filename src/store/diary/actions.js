import moment from 'moment';
import { createAction } from 'redux-actions';
import * as selectors from './selectors';
import createFetchAction from '../../utils/fetch-actions';
import api from '../../api';

export const entriesFetching = createFetchAction('DIARY/FETCH');
export const entryCreating = createFetchAction('DIARY/CREATE');
export const entryDeleting = createFetchAction('DIARY/DELETE');
export const entriesStoring = createFetchAction('DIARY/STORE');
export const setDiaryDate = createAction('DIARY/DATE-SET', date => moment(date).toSql());

export const fetchEntries = (month) => (dispatch) => {
  const from = moment(month).startOf('month');
  const to = moment(month).endOf('month');
  dispatch(entriesFetching.start(from.valueOf()));
  return api.get('/entries', { from: from.toSql(), to: to.toSql() })
    .then(({ data }) => dispatch(entriesFetching.finish(data)))
    .catch(e => dispatch(entriesFetching.error(e)))
};

export const fetchAll = () => (dispatch) => {
  const from = moment().subtract(10, 'months').startOf('month');
  const to = moment().endOf('month');
  dispatch(entriesFetching.start(from.valueOf()));
  return api.get('/entries', { from: from.toSql(), to: to.toSql() })
    .then(({ data }) => dispatch(entriesFetching.finish(data)))
    .catch(e => dispatch(entriesFetching.error(e)))
};

export const createEntry = (entry, date) => (dispatch) => {
  console.log(entry);
  dispatch(entryCreating.start());
  return api.put(`/entries/${date}`, entry)
    .then(({ data }) => dispatch(entryCreating.finish(data)))
    .catch(e => dispatch(entryCreating.error(e)));
};

export const deleteEntry = (date) => (dispatch) => {
};

export const exportDiary = (array) => (dispatch, getState) => {
  const storeAll = (entries) => () => {
    if(entries.length > 0) {
      const e = entries[0];
      dispatch(createEntry(e, moment(e.date).toSql())).then(storeAll(entries.slice(1)));
    }
  };
  storeAll(array)();
};