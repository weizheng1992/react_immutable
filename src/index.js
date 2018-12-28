import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./config/router";
// import 'nprogress/nprogress.css'
import "./index.css";
import weChat from "./until/weChat";
import configureStore from "./store";
import moment from "moment";
import momentLocale from "moment/locale/zh-cn";
import { APIgetWechatUser } from "./config/api";
import storage from "./until/storage";
import rootSaga from './sagas/index';
moment.updateLocale("zh-cn", momentLocale);
weChat.init();

let user = storage.get("wechatInfo");
if (!user) {
  let array = location.search.split("&")[0];
  if (array.length > 1) {
    let code = array.split("=")[1];
    APIgetWechatUser({ code }).then(res => {
      storage.set("wechatInfo", res.data);
    });
  }
}


const store = configureStore();
store.runSaga(rootSaga);
const Index = () => (
  <Provider store={store}>
    <Router>
      <div>
        <App />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, document.querySelector("#root"));
