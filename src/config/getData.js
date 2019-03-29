import { URL } from './service.js'
import Fly from 'flyio/dist/npm/wx'
let fly = '';
const host = URL
if (mpvuePlatform == 'wx') {
  fly = new Fly();
}

//添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  request.url = URL + request.url;
  var logininfo = mpvue.getStorageSync('login');
  console.log('logininfo',logininfo)
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'content-type': 'application/json'
  };
  let authParams = {
    "timestamp": new Date().getTime(),
  };
  if (logininfo != null && logininfo.openid != null) {
    authParams.oid = logininfo.openid;
    authParams.skey = logininfo.sessionKey;
    authParams.wuid = logininfo.uid;
  }
  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === "") {
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body,
    ...authParams
  }
  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response.data;//请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log('请求失败', err);
    wx.hideLoading();
    if (err) {
      return "请求失败";
    };
  }
);

fly.config.baseURL = host;

export default fly;