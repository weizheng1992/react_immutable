import NProgress from "nprogress";
import storage from "./storage";
import toast from "../component/toast";
import axios from "axios";

const Axios = axios.create({
  baseURL: "/species",
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前
    if (config.params && !config.params.noLoading) {
      NProgress.start();
    }
    // 若是有做鉴权token , 就给头部带上token
    // if (getCookie("token")) {
    config.headers.token = storage.get("token");
    // }
    return config;
  },
  error => {
    NProgress.done();

    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    NProgress.done();
    if (res.data && res.data.code !== 1000) {
      switch (parseInt(res.data.code)) {
        case 4444:
          //   jumpPage("bcoin://userLogin");
          return Promise.reject(res);
        default:
          //   Dialogs.toast({
          //     text:
          //       (res.data.dialog && res.data.dialog.title) ||
          //       "系统繁忙，请稍后再试",
          //     icon: "&#xe68e;",
          //     delay: 1500
          //   });
          toast(res.data.message || "系统繁忙，请稍后再试");
          return Promise.reject(res);
      }
    }
    return res;
  },
  error => {
    NProgress.done();
    if (error.code === "ECONNABORTED") {
      toast("系统繁忙，请稍后再试");
    }
    return Promise.reject(error);
  }
);

export default {
  //Post  请求方式
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },

  //GET 请求方式
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(url, { params: params })
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  }
};
