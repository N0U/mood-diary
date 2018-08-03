import { createAction } from 'redux-actions';
import createFetchAction from '../../utils/fetch-actions';
import api, { setToken } from '../../api';
import configs from '../../configs';
import * as selectors from './selectors';

export const tokenRenewing = createFetchAction('AUTH/RENEW');
export const optionsFetching = createFetchAction('AUTH/FETCH-OPTIONS');
export const authLogout = createAction('AUTH/LOGOUT');

const fetchOptions = () => (dispatch, getStore) => {
  dispatch(optionsFetching.start());
  return api.get('/auth/options')
    .then(({ data }) => {
      dispatch(optionsFetching.finish(data));
    })
    .catch(e => {
      dispatch(optionsFetching.error(e));
    });
};

export const initAuth = () => (dispatch, getStore) => {
  dispatch(fetchOptions()).then(() => {
    let token = selectors.token(getStore());

    const urlParams = new URL(window.location.href).searchParams;
    if (urlParams.has('authorization')){
      token = urlParams.get('authorization');
      // Clear token in header
      window.history.replaceState({}, document.title, '/');
    }

    if (token) {
      setToken(token);
      dispatch(tokenRenewing.start());
      return api.get('/auth')
        .then(({data}) => {
          setToken(data['Authorization']);
          dispatch(tokenRenewing.finish(data['Authorization']));
        })
        .catch(e => {
          setToken('');
          dispatch(tokenRenewing.error(e));
        });
    } else {

    }
  });
};

export const loginOAuth2 = (url) => (dispatch, getStore) => {
  window.location.replace(url + `&state=${encodeURI(configs.redirectUrl)}`);
};