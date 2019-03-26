<script>

import {URL} from './config/service'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // if(mpvuePlatform === 'wx'){
    //   mpvue.getData =new wxFly();
    // }
    
    // mpvue.getStorageSync({key: 'logs'})
    // mpvue.setStorageSync('logs', logs)

    
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
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
/* this rule will be remove */
* {
          transition: width 2s;

  -webkit-transition: width 2s;
     -moz-transition: width 2s;
       -o-transition: width 2s;
}
</style>
