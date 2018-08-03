import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import diary from './diary/reducer';
import auth from './auth/reducer';
import settings from './settings/reducer';
import storage from "redux-persist/lib/storage";

const reducers = combineReducers(
  {
    diary,
    auth: persistReducer(
      {
        key: 'auth',
        storage,
        blacklist: [
          'loading',
          'logged',
          'options'
        ],
      },
      auth,
    ),
    settings: persistReducer(
      {
        key: 'settings',
        storage,
      },
      settings,
    ),
    form: formReducer,
  },
);

const middleware = applyMiddleware(
  thunk
);

export default () => {
  let store = createStore(
      reducers,
      compose(
          middleware,
          window.devToolsExtension ?
              window.devToolsExtension() : f => f,
      ),
  );
  let persistor = persistStore(store);
  return { persistor, store };
}
