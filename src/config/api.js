import Axios from "../until/axios";

//健康大爆炸

export const APIgetSdk = params => Axios.get("/jssdk/config", params); //获取sdk
export const APIgetWechatUser = params => Axios.get("/jssdk/user/info", params); //获取微信用户
// export const APIgetWechatShare = params => Axios.get("/weixin/share", params); //获取微信用户
export const APIgetLocationCity = params =>
  Axios.get("/area/city/location", params); //获取城市
export const APIgetHonorChains = params =>
  Axios.get("/institution/honorChains", params); //获取服务详情
export const APIgetSpecialTag = params =>
  Axios.get("/institution/specialTag", params); //获取标签详情
export const APIgetComments = params =>
  Axios.get("/institution/comments", params); //获取机构评价

export const APIgetSkuList = params =>
  Axios.get("/institution/sku/list", params); //获取机构下的商品列表
export const APIgetSkuDetail = params => Axios.get("/sku/detail", params); //获取机构下的商品列表

//order
export const APIgetBuyInfo = params => Axios.get("/order/buyInfo", params); //获取机构下的商品详情
export const APIpostPay = params => Axios.post("/order/pay", params); //支付


//分类
export const APIgetClassify = params => Axios.get("/classify/list", params); //分类列表

export const APIgetBigBangSearch = params =>
  Axios.get("/institution/search", params); //搜索结果列表
export const APIgetBigBangDetail = params =>
  Axios.get("/institution/details", params); //产品详情

//促销
export const APIgetRooms = params => Axios.get("/subject/rooms", params); //促销列表
export const APIgetSubjsells = params =>
  Axios.get("/subject/roomNames", params); //会场名称
export const APIgetSellSkus = params => Axios.get("/subject/roomSkus", params); //会场商品

//城市
export const APIgetCity = params => Axios.get("/area/city", params); //城市列表
export const APIgetSearchCity = params =>
  Axios.get("/area/city/search", params); //搜索城市

//登录 注册

export const APIpostToken = params => Axios.get("/sms/token", params); //获取token
export const APIgetCode = params => Axios.get("/sms/message", params); //获取code
export const APIgetBangding = params => Axios.get("/user/info/bangding", params); //获取code
export const APIgetLogin = params => Axios.get("/user/login", params); //微信 手机号注册登录


