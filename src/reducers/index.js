// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import home from './home';

const rootReducer = combineReducers({
    home,
});

export default rootReducer;