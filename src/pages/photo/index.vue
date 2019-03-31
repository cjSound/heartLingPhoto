<template>
  <div class="main-page main-photo">
    <div class="addphoto background">
      <div @click="addphoto">
        <div class="add"><span>+</span></div>
        <div class="info">制作相册</div>
      </div>
    </div>
    <div class="black-line">&nbsp</div>
    <div class="myphoto">
      <div class="title">我的相册 <span class="num">({{myphotoList.length}})</span></div>
      <div class="photo-item" v-for="(item,index) in myphotoList" :key="index">
        <div class="hl-row">
          <div class="row-item-9 text-center img" @click="editphoto(item)">
            <span class="iconfont icon-video"></span>
            <img :src="item.firstImg" alt="">
          </div>
          <div class="row-item-13 column-center">
            <div class="name">{{item.name}}</div>
            <div class="num" @click="removePhoto(item)">删除</div>
          </div>
        </div>
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
      myphotoList: []
    }
  },
  methods: {

    removePhoto(item){
      var  _this =this;
      mpvue.showModal({
        title: '提示',
        content: '确定要删除相册吗',
        success(res) {
          if (res.confirm) {
            _this.$fly.request({
              method: 'get',  
              url: 'photo/remove',
              body: {
                albumId:item.albumId
              }
            }).then(res=>{
              mpvue.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 2000
              })
              _this.getMyphoto();
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    editphoto(item){
      mpvue.navigateTo({url:'/pages/addphoto/main?albumId='+item.albumId})
    },
    /**
     * 初始化 获取相册
     */
    getMyphoto(){
      this.$fly.request({
        method: 'get',  
        url: 'photo/getphotos',
        body: {}
      }).then(res=>{
        var list =res.data;
        list!=null && list.forEach(element => {
          element.firstImg =FILE_URL+element.firstImg;
        });
        this.myphotoList =list==null?[]:list;
      });
    },
    /**
     * 上传图片   判断是否登录  promise上传
     */
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
                mpvue.hideLoading();
                mpvue.navigateTo({url:'/pages/addphoto/main?albumId='+photodata.data.albumId})
              })
          });
        }
      })
    }
  },
  onShow(){
    store.commit('setTabIndex','2');
    this.getMyphoto();
  },
  onHide(){
        console.log('photo hiden')
    }
}
</script>

<style lang='less'>
.main-photo {
  .black-line{
    height: 20rpx;
    background: #e1e4ed;
  }
  .myphoto{
    background: #fff;
    padding-top: 20rpx;
    .photo-item{
      margin: 20rpx ;
      padding: 20rpx 0;
      border: 1px solid #e6e4e4;
      border-radius: 10rpx;
      box-shadow: 3rpx 10rpx 20rpx #e6e4e4;
      .img{
        position: relative;
        text-align: center;
        .iconfont{
          position: absolute;
          top: 50%;
          color: #fff;
          margin: 0 auto;
          font-size: 2em;
          transform: translateY(-50%);
          left: 36%;
        }
      }
      // box-shadow: 
      image{
        width: 92%;
        height: 200rpx;
        border-radius: 20rpx;
      }
      .column-center{
        height: 200rpx;
        padding-left: 30rpx;
      }
    }
    .title{
      padding-left: 40rpx;
      font-size: 1em;
    }
    .num{
      color: #4f4f4f;
      font-size: 0.8em;
    }
  }
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
