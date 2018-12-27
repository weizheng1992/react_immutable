import * as types from '../constants/ActionTypes';

export function saveInfo(info) {
    return {
      type: types.SAVE_DETAIL_INFO,
      info
    };
  }
  