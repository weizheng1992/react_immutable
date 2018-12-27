import * as types from '../constants/ActionTypes';


const initialState = {
   info:''
  };

  export default function category(state = initialState, action) {
    switch (action.type) {
      case types.SAVE_DETAIL_INFO:
        return Object.assign({}, state, {
          loading: false,
          info: action.info
        });
      default:
        return state;
    }
  }