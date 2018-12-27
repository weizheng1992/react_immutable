import wx from "weixin-js-sdk";
import {
  APIgetSdk,
  APIgetLocationCity,
  APIgetWechatShare
} from "../config/api";
import { isWeiXin } from "../until/untis";
import storage from "./storage";
let weixin = isWeiXin();
const Wechat = {
  init: () => {
    if (weixin) {
      APIgetSdk({ url: encodeURIComponent(location.href.split("#")[0]) }).then(
        res => {
          wx.config({
            debug: process.env.NODE_ENV === "production" ? false : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // debug: true,
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: [
              "getLocation",
              "updateAppMessageShareData",
              "updateTimelineShareData",
              "chooseWXPay",
              "hideMenuItems",
              "hideAllNonBaseMenuItem",
              "showAllNonBaseMenuItem"
            ] // 必填，需要使用的JS接口列表
          });
        }
      );
    }
  },
  getLocation: (callBack, cancelBack) => {
    if (weixin) {
      let userLocation = storage.get("userLocation");
      if (!userLocation) {
        wx.ready(() => {
          wx.getLocation({
            type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              storage.set("location", `${res.latitude},${res.longitude}`);
              APIgetLocationCity({
                location: `${res.latitude},${res.longitude}`
              })
                .then(function(res) {
                  // alert(res.data.city);
                  callBack && callBack(res.data);
                  storage.set("locationCity", res.data);
                  storage.set("city", res.data);
                })
                .catch(function(error) {
                  console.log(error);
                });
            },
            cancel: function(res) {
              cancelBack && cancelBack();
              storage.set("cancelLocation", true);
            }
          });
        });
      }
    }
  },
  share: (
    title = "测试",
    desc = "描述",
    link,
    imgUrl = "http://species.ehealcare.com/species/healthlogo.jpg"
  ) => {
    if (weixin) {
      wx.ready(function() {
        wx.showAllNonBaseMenuItem();
        wx.updateAppMessageShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          // link: "http://species.ehealcare.com/species/#/share",
          link: `${
            location.origin
          }/species/weixin/share?url=${encodeURIComponent(link)}`,
          // link:
          //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa2b5842cf0f7c387&redirect_uri=http%3A%2F%2Fspecies.ehealcare.com%2Fspecies%2F%23%2FhealthBigBang&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function() {}
        });
        wx.updateTimelineShareData({
          title: title, // 分享标题
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
    }
  },
  hideMenu: () => {
    if (weixin) {
      wx.ready(function() {
        wx.hideMenuItems({
          menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
      });
    }
  },
  hideAllNonBaseMenu: () => {
    if (weixin) {
      wx.ready(function() {
        wx.hideAllNonBaseMenuItem();
      });
    }
  },
  chooseWXPay: (data, callBack) => {
    if (weixin) {
      wx.ready(function() {
        wx.chooseWXPay({
          timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
          package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: data.paySign, // 支付签名
          success: function(res1) {
            // 支付成功后的回调函数
            callBack && callBack();
          }
        });
      });
    }
  }
};
export default Wechat;
