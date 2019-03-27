<script>

import {URL} from './config/service'
export default {
  created () {
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // mpvue.getStorageSync({key: 'logs'})
    // mpvue.setStorageSync('logs', logs)
    var _this =this;

    //初次进来的 时候  登陆 获取用户唯一openid
    mpvue.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          _this.$fly.request({
              method:"get", //post/get 请求方式
              url:"wx/user/login",
              body:{
                code:res.code
              }
            }).then(res =>{
              mpvue.setStorageSync('login',res.data);
          });
        } else {
          mpvue.showToast({
            title: '登陆失败，请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  } 
}
</script>

<style lang="less">
@import "./style/iconfont.css";
@import "./style/common.less" ;

.container {
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 200rpx 0; */
}
.background{
  background: #02cfbe;
  color: #fafafa;
}
/* this rule will be remove */
* {
          transition: width 2s;

  -webkit-transition: width 2s;
     -moz-transition: width 2s;
       -o-transition: width 2s;
}
</style>
