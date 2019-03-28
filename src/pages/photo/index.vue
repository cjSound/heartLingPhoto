<template>
  <div class="main-page main-photo">
    <div class="addphoto background">
      <div @click="addphoto">
        <div class="add"><span>+</span></div>
        <div class="info">制作相册</div>
      </div>
    </div>
    <ptabbar></ptabbar>
  </div>
</template>

<script>
import ptabbar from '@/components/ptabbar'
import { orderListPromise ,hasLogin } from '@/utils/index'
import { URL,FILE_URL } from '@/config/service.js'
import store from '@/store'

export default {
  components: {
    ptabbar
  },

  data() {
    return {
      logs: []
    }
  },
  methods: {
    addphoto() {
      var _this =this;
      var login =hasLogin();
      if(!login){
        return ;
      }
      wx.chooseImage({
        success(res) {
          _this.$fly.request({
              method:"post",  
              url:"photo/addphoto",
              body:{}
            }).then(photodata =>{
              const tempFilePaths = res.tempFilePaths;
              var result =[];
              mpvue.showLoading({
                title: '上传中'
              })
              orderListPromise(tempFilePaths,function(data,resolve){
                wx.uploadFile({
                  url: URL + 'upload/mfile',
                  filePath: data,
                  name: 'fileList',
                  formData:{
                    albumId:photodata.data.albumId,
                    wuid:photodata.data.userId
                  },
                  success(res) {
                    let msg =JSON.parse(res.data);
                    result.push(msg.data[0]);
                    resolve();
                  }
                })
              },function(){
                store.commit('setPhotoList',result);
                mpvue.setStorageSync('photoList',result);
                mpvue.setStorageSync('openPhoto',photodata.data);
                mpvue.hideLoading();
                mpvue.navigateTo({url:'/pages/addphoto/main'})
              })
          });
        }
      })
    }
  },
  onShow(){
    store.commit('setTabIndex','2');
  }
}
</script>

<style lang='less'>
.main-photo {
  .addphoto {
    display: flex;
    flex-direction: column;
    height: 150px;
    align-items: center;
    justify-content: center;
    text-align: center;
    .add {
      span {
        width: 120rpx;
        height: 120rpx;
        background: #f1df11;
        display: inline-block;
        border-radius: 120rpx;
        line-height: 110rpx;
        font-size: 80rpx;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
