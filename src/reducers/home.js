import * as types from '../constants/ActionTypes';


const initialState = {
  loading: false,
  entries:[]
  };

  export default function category(state = initialState, action) {

    switch (action.type) {
      case types.FETCH_DETAIL_INFO:
        return Object.assign({}, state, {
          loading: true
        });
      case types.RECEIVE_DETAIL_INFO:
        return Object.assign({}, state, {
          loading: false,
          entries: action.entries
        });
      default:
        return state;
    }
  }