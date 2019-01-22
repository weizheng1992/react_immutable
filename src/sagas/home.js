import { put, take, call, fork } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import toast from "../component/toast";
import { fetchInfo, receiveInfo, receiveRecommendInfo,receiveBannersInfo ,receiveRestaurantsInfo} from "../actions/home";
import { HOME } from "../constants/apiUrl";
import axios from "../until/axios";
import { fromJS } from "immutable";

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
    yield put(receiveInfo(fromJS([])));
    yield toast("网络发生错误，请重试");
  }
}

export function* requestRecommend() {
  try {
    const typeList = yield call(axios.get, HOME.recommend);
    yield put(receiveRecommendInfo(typeList.data.list));
    const errorMessage = typeList.message;
    if (errorMessage && errorMessage !== "") {
      yield toast(errorMessage);
    }
  } catch (error) {
    yield put(receiveRecommendInfo(fromJS([])));
    yield toast("网络发生错误，请重试");
  }
}

export function* requestBanners() {
  try {
    const list = yield call(axios.get, HOME.banners);
    yield put(receiveBannersInfo(list.data.list));
    const errorMessage = list.message;
    if (errorMessage && errorMessage !== "") {
      yield toast(errorMessage);
    }
  } catch (error) {
    yield put(receiveBannersInfo(fromJS([])));
    yield toast("网络发生错误，请重试");
  }
}


export function* requestRestaurants() {
  try {
    const list = yield call(axios.get, HOME.restaurants);
    yield put(receiveRestaurantsInfo(list.data.list));
    const errorMessage = list.message;
    if (errorMessage && errorMessage !== "") {
      yield toast(errorMessage);
    }
  } catch (error) {
    yield put(receiveBannersInfo(fromJS([])));
    yield toast("网络发生错误，请重试");
  }
}



export function* watchRequestTypeList() {
  while (true) {
    yield take(types.REQUEST_DETAIL_INFO);
    yield fork(requestTypeList);
    yield fork(requestRecommend);
    yield fork(requestBanners);
    yield fork(requestRestaurants);
  }
}
