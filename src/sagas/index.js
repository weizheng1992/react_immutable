


import { all, fork } from 'redux-saga/effects';

import { watchRequestTypeList } from './home';


export default function* rootSaga() {
    yield all([fork(watchRequestTypeList)]);
  }