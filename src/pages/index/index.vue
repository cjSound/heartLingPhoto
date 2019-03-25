<template>
  <div class="pageinfo" >

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    {{inputvalue}}
    <van-cell-group>
      <van-field
      v-bind:value="inputvalue"
        placeholder="请输入用户名"
        :border="false"
        @change="tchange($event)"
      />
    </van-cell-group>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <input type="file" name="filename" >上传</input>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>


    <van-tabbar v-model="active" :active="active" @change="onChange($event)">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="photo-o"  >相册</van-tabbar-item>
      <van-tabbar-item icon="friends-o"  >我的</van-tabbar-item>
    </van-tabbar>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
     
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      active:0,
      inputvalue:'你好啊',
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue132',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },
 
  methods: {
    onChange(event) {
      console.log(event.mp.detail)
      this.active= event.mp.detail;
      wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = res.data
            // do something
          }
        })
      }
    })
      console.log(333,event.mp,this.active);
    },
    tchange(ev){
      // this.inputvalue=ev.mp.detail;
      console.log(2,ev.mp,this.active);
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev,mpvue)
      // throw {message: 'custom test'}
    }
  },
  mounted(){
    console.log(this.$fly)
    this.$fly.request({
        method:"post", //post/get 请求方式
        url:"http://localhost:8099/user/test",
        body:{
          wxname:'发盛世嫡妃'
        }
      }).then(res =>{
        console.log(res)
    })
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 50px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  height:1rem;
  width:2rem;
  background-color:red;
}

.right{
  float:left;
  height:1rem;
  background-color:green;
}
</style>
