import * as types from "../constants/ActionTypes";

export function requestInfo() {
  return {
    type: types.REQUEST_DETAIL_INFO
  };
}

export function fetchInfo() {
  return {
    type: types.FETCH_DETAIL_INFO
  };
}

export function receiveInfo(entries) {
  return {
    type: types.RECEIVE_DETAIL_INFO,
    entries
  };
}

export function receiveRecommendInfo(recommend) {
  return {
    type: types.RECEIVE_RECOMMEND_INFO,
    recommend
  };
}
