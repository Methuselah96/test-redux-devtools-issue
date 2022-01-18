import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { promiseMiddleware } from '@adobe/redux-saga-promise';
import { persistStore } from 'redux-persist';
import { from } from 'rxjs';

const appReducer = (state = 0, action) => {
  return 0;
};

// @TODO remove after fixing deprecated libs that are using store directly inside api calls
// eslint-disable-next-line import/no-mutable-exports
export let singletonLikeStore = null;

export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: appReducer,
    middleware: [promiseMiddleware, sagaMiddleware],
  });

  const persistor = persistStore(store);
  // @ts-ignore
  singletonLikeStore = store;
  return { store, persistor };
};

const { store } = initializeStore();

from(store).subscribe(state => {
  console.log(state);
});
