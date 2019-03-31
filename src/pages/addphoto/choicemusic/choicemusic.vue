<template>
	<div class="choicemusic">
		<van-search :value="pager.params.name"
		            placeholder="请输入音乐或者歌手"
		            @search="onSearch($event)" />
        <scroll-view class="scroll-view"
            scroll-y
            @scrolltolower="scroolLower" >
            <div class="music-item" v-for="(item,index) in pageList" :key="index" @click="choiceMusic(item)">
                <div class="hl-row">
                    <div class="text-center img" @click="editphoto(item)">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="column-center">
                        <div class="name">{{item.name}}</div>
                        <div class="num">{{item.signerName}}</div>
                    </div>
                </div>
            </div>
        </scroll-view>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			query: {},
			pager: {
				pageNum: 1,
				pageSize: 20,
				params: {
					name: ''
				}
			},
			pageList: []
		}
	},
	methods: {
        /**
         * 改变音乐
         */
        choiceMusic(item){
            // item.
        },
		onSearch(e) {
            var data = e.mp.detail;
            this.pager.params.name=data;
            this.pageList=[];
            this.search();
        },
        scroolLower(e){
            console.log('滑动到底部',e)
            this.pager.pageNum++;
            this.search();
        },
		search() {
			this.$fly
				.request({
					method: 'post',
					url: 'music/pager/search',
					body: this.pager
				})
				.then(res => {
					console.log(res)
					this.pageList = this.pageList.concat(res.data)
					console.log('list', this.pageList)
				})
		}
	},
	onShow() {
		console.log('choicemusic show')
		this.query = this.$root.$mp.query
		if (this.query == null || this.query.albumId == null) {
			this.query = { albumId: 24 }
        }
        this.pageList=[];
		this.search()
    },
    onHide(){
		console.log('choicemusic hide')
    },
    onUnload(){
        console.log('choicemusic onUnload')
    }
}
</script>

<style lang="less">
.choicemusic {
    .scroll-view{
        height:calc(~'100vh - 44px');
    }
	.music-item {
		margin: 10rpx;
		padding: 10rpx 0;
		border-bottom: 1px solid #e6e4e4;
		.img {
			position: relative;
			text-align: center;
			padding: 0 20rpx;
			.iconfont {
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
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: -25px -374px;
		}
		.column-center {
			font-size: 32rpx;
			height: 100rpx;
			padding-left: 30rpx;
		}
		.title {
			padding-left: 40rpx;
			font-size: 1em;
		}
		.num {
			color: #4f4f4f;
			font-size: 0.8em;
		}
	}
}
</style>
