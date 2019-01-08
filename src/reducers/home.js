import * as types from "../constants/ActionTypes";

import { createReducer } from "redux-immutablejs";
import Immutable from "immutable";
const initialState = Immutable.fromJS({
  loading: false,
  entries: [],
  recommend: []
});

export default createReducer(initialState, {
  [types.FETCH_DETAIL_INFO]: state =>
    state.merge({
      loading: true
    }),
  [types.RECEIVE_DETAIL_INFO]: (state, action) =>
    state.merge({
      loading: false,
      entries: action.entries
    }),
  [types.RECEIVE_RECOMMEND_INFO]: (state, action) =>
    state.merge({
      loading: false,
      recommend: action.recommend
    })
});
