import { put, take, call, fork } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import toast from "../component/toast";
import { fetchInfo, receiveInfo } from "../actions/home";
import { HOME } from "../constants/apiUrl";
import axios from "../until/axios";

export function* requestTypeList() {
  try {
    yield put(fetchInfo());
    const typeList = yield call(axios.get, HOME.entries);
    yield put(receiveInfo(typeList.data.list));
    const errorMessage = typeList.message;
    if (errorMessage && errorMessage !== "") {
      yield toast(errorMessage);
    }
  } catch (error) {
    yield put(receiveInfo([]));
    yield toast("网络发生错误，请重试");
  }
}

export function* watchRequestTypeList() {
  while (true) {
    yield take(types.REQUEST_DETAIL_INFO);
    yield fork(requestTypeList);
  }
}
