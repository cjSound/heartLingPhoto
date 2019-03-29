<template>
	<div class="pinfo-warp">
		<div class="userinfo background"
		     v-if="login">
			<div class="userimg">
				<img :src="userInfo.avatarUrl"
				     alt="">
			</div>
			<div class="usermsg">
				<div class="name">{{userInfo.nickName}}</div>
				<div class="name">相册 0</div>
			</div>

		</div>
		<div class="login background"
		     v-else>
			<div class="user text-center"><span class="iconfont icon-users"></span></div>
			<button type="mini"
			        class="dl-button background"
			        open-type="getUserInfo"
			        @getuserinfo="onGotUserInfo">登陆</button>
		</div>
		<ptabbar></ptabbar>
	</div>
</template>

<script>
// Use Vuex
import store from '@/store'
import ptabbar from '@/components/ptabbar'

export default {
	components: {
		ptabbar
	},
	data() {
		return {
			login: false,
      userInfo: {},
      photoList:[]
		}
	},
	created() {
		var _this = this
		mpvue.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					_this.login = true
					mpvue.getUserInfo({
						success(res) {
							_this.addUser(res.userInfo)
						}
					})
				}
			}
		})
  },
  methods: {
		/**
     * 授权 获取用户信息
     */
		onGotUserInfo(e) {
			const data = e.mp.detail
			if (data.userInfo != null) {
				this.addUser(data.userInfo)
			} else {
				mpvue.showToast({
					title: '取消授权,将无法使用服务',
					icon: 'none',
					duration: 2000
				})
			}
    },
    /**
     * 同步用户信息  并且缓存在小程序
     */
		addUser(userinfo) {
			this.login = true
			this.userInfo = userinfo
			this.$fly.request({
					method: 'post',  
					url: 'user/sysnUserInfo',
					body: userinfo
				}).then(res=>{
					console.log('同步用户信息',userinfo,res.data)
					mpvue.setStorageSync('login',res.data);
				});
    },
    initPerinfo(){
      this.$fly.request({
        method: 'get',  
        url: 'photo/getphotos',
        body: {}
      }).then(res=>{
        this.photoList =res.data;
      });
    }
	},
	onShow() {
    store.commit('setTabIndex', '3');
    this.initPerinfo();
	}
}
</script>

<style lang="less">
.pinfo-warp {
	.userinfo {
		padding: 10px 0;
		overflow: hidden;
		.userimg {
			float: left;
			padding-left: 40rpx;
			img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 40px;
			}
		}
		.usermsg {
			float: left;
			padding-left: 40rpx;
			height: 160rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
	.user {
		.iconfont {
			font-size: 1rem;
		}
	}
	.login {
		padding: 30px 0;
		.dl-button {
			border: 1rpx solid #ffffff;
		}
	}
}
</style>
