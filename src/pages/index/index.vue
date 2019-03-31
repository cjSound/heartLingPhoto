<template>
	<div class="pageinfo">
		<scroll-view class="scroll-view"
		             scroll-y
		             @scrolltolower="scroolLower">
			<div class="music-item"
			     v-for="(item,index) in pageList"
			     :key="index">
				<div class="hl-row">
          <div class="">
              <img class="userImg" :src="item.avatarUrl" alt="">
          </div>
          <div class="column-center">
              <span>{{item.nickName}}</span>
            </div>
				</div>
        <div class="text-center img" @click="editphoto(item)">
          <span class="iconfont icon-video"></span>
          <img :src="item.firstImg" alt="">
        </div>
        <div class="share">
          <span class="iconfont icon-chakansvg"></span>
          <span class="num">{{item.lookNum}}</span>
          <span class="iconfont icon-good"></span>
          <span class="num">{{item.likeNum}}</span>
          
        </div>
			</div>
		</scroll-view>
		<ptabbar> </ptabbar>

	</div>
</template>

<script>
import ptabbar from '@/components/ptabbar'
import { URL,FILE_URL } from '@/config/service.js'
import store from '@/store'

export default {
	data() {
		return {
			pager: {
				pageNum: 1,
				pageSize: 20,
				params: {
					name: ''
				}
      },
      pageList:[]
		}
	},

	components: {
		ptabbar
	},

	methods: {
		scroolLower(e) {
			this.pager.pageNum++
			this.search()
    },
    editphoto(item){
      mpvue.navigateTo({url:'/pages/asharephoto/main?albumId='+item.albumId})
    },
		search() {
      if(this.pager.total!=null && this.pageList.length>=this.pager.total){
        return ;
      }
			this.$fly
				.request({
					method: 'post',
					url: 'main/index',
					body: this.pager
				})
				.then(res => {
          var list =res.data; 
          list!=null && list.forEach(element => {
            element.firstImg =FILE_URL+element.firstImg;
          });
          this.pager.total =res.total;
					this.pageList = this.pageList.concat(list)
				})
    },
    ending(){
      this.pager ={
				pageNum: 1,
				pageSize: 20,
				params: {
					name: ''
				}
			}
			this.pageList=[];
    }
	},
	onShow() {
    store.commit('setTabIndex', '1');
    this.search(); 
	},
	onHide(){
    this.ending();
  },
  onUnload(){
    this.ending();
  }
}
</script>

<style  lang="less">
.pageinfo {
  .userImg{
    width: 120rpx;
    height: 120rpx;
    border-radius: 120rpx;
  }
  .music-item{
    margin: 20rpx ;
    padding: 20rpx 0;
    border-radius: 10rpx;
    box-shadow: 3rpx 10rpx 20rpx #e6e4e4;
    .share{
      .iconfont{
        padding: 0 10px;
        padding-left: 20px;
      }
    }
    .column-center{
      height: 120rpx;
    }
    .img{
        position: relative;
        text-align: center;
        .iconfont{
          position: absolute;
          top: 50%;
          color: #fff;
          margin: 0 auto;
          font-size: 3em;
          transform: translateY(-50%);
          left: 40%;
        }
        image{
          width: 92%;
          height: 400rpx;
          border-radius: 20rpx;
        }
      }
      // box-shadow: 
      
  }
	.scroll-view {
		height: calc(~'100vh - 50px');
	}
}
</style>
