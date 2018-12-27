//获取url 参数
export function getQueryString(name) {
  let array = (location.hash || "").replace(/^\#/,'').split("?");
  if (array.length > 1) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = array[array.length-1].match(reg);
    if (r != null) return unescape(r[2]);
  }
  return null;
}


//判断是否是微信浏览器的函数
export function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  return true;
  }else{
  return false;
  }
}



export const phoneModel=()=>{
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  let isIphoneX =  /iphone/gi.test(navigator.userAgent) && (screen.height >= 812 && screen.width >= 375)
  return {isAndroid,isIOS,isIphoneX}
}

export const numToString=($num,isEnglish=true,showAdd=false)=>{
    let num;
    if($num < 1000) {
      return $num;
  } else if($num >=1000 && $num < 10000){
    num= Math.floor($num/1000)+(isEnglish?'k':'千');
  } else if ($num >= 10000&& $num < 10000000) {
    num= Math.floor($num/10000)+(isEnglish?'w':'万');
  }else if($num >= 10000000){
    num= Math.floor($num/10000000)+(isEnglish?'kw':'千万');
  }
  return `${num}${showAdd?'+':''}`
}