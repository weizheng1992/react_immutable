import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";

const middlewares = [];
const { logger } = require("redux-logger");

/* global __DEV__  */
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = applyMiddleware(...middlewares)(createStore)(rootReducer)
 export default store;
