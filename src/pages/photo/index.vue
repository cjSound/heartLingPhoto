<template>
  <div class="main-page main-photo">
    <div class="addphoto">
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
import { orderListPromise } from '@/utils/index'
import { URL } from '@/config/service.js'

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
      wx.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          var result =[];
          orderListPromise(tempFilePaths,function(data,resolve){
            wx.uploadFile({
              url: URL + 'upload/mfile',
              filePath: data,
              name: 'fileList',
              success(res) {
                let msg =JSON.parse(res.data);
                result.push(msg.data[0]);
                resolve();
              }
            })
          },function(){
            console.log(result)
          })
        }
      })
    }
  },
  created() {
    console.log(this.logs)
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
    background: #f5f8ff;
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
    .info {
      color: #3c2310;
    }
  }
}
</style>
