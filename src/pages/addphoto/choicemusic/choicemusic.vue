<template>
	<div class="choicemusic">
		<van-search :value="pager.params.name"
		            placeholder="请输入音乐或者歌手"
		            @search="onSearch($event)" />
        <scroll-view class="scroll-view"
            scroll-y
            @scrolltolower="scroolLower" >
            <div class="music-item" v-for="(item,index) in pageList" :key="index" >
                <div class="hl-row" >
                    <div class="text-center img"  @click="juedgMusic(item,index)">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="row-item-12 column-center"  @click="juedgMusic(item,index)">
                        <div class="name one-row">{{item.name}}</div>
                        <div class="num">{{item.signerName}}</div>
                    </div>
					<div class="column-center f-r" v-if="musicIndex === index">
						<span class="small-btn" @click="choiceMusic(item,index)">确认</span>
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
			pageList: [],
			musicIndex:'',
			audioContext:''
		}
	},
	methods: {
		initMusic(){
			this.audioContext =this.audioContext==''?mpvue.createInnerAudioContext():this.audioContext;
            this.audioContext.autoplay = true
            this.audioContext.onPlay(() => {
                this.musicIndex =this.audioContext.index;
            })
            this.audioContext.onError((res) => {
				mpvue.showToast({
					title: '音乐资源缺失，请重新选择',
					icon: 'none',
					duration: 2000
				})
            })
		},
		juedgMusic(item,index){
			var url ="https://music.163.com/song/media/outer/url?id="+item.id+".mp3";
			this.audioContext.src = url;
			this.audioContext.index =index;
		},
        /**
         * 改变音乐
         */
        choiceMusic(item,index){
			// item.
			this.musicIndex =index;
			this.$fly.request({
                method: 'post',  
                url: 'photo/change/album',
                body: {
                    albumId:this.query.albumId,
                    musicId:item.musicId
                }
            }).then(res=>{
				mpvue.showToast({
					title: '修改背景音乐成功',
					icon: 'none',
					duration: 1000,
					success(){
						mpvue.navigateBack({delta:1})
					}
				})
				
            });
        },
		onSearch(e) {
            var data = e.mp.detail;
			this.pager.params.name=data;
			this.pageNum=1;
            this.pageList=[];
            this.search();
        },
        scroolLower(e){
            console.log('滑动到底部',e)
            this.pager.pageNum++;
            this.search();
        },
		search() {
			if(this.pager.total!=null && this.pageList.length>=this.pager.total){
				return ;
			}
			this.$fly.request({
				method: 'post',
				url: 'music/pager/search',
				body: this.pager
			})
			.then(res => {
	          	this.pager.total =res.total;
				this.pageList = this.pageList.concat(res.data)
			})
		},
		ending(){
			if(this.audioContext!=''){
				this.audioContext.destroy();
			}
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
		console.log('choicemusic show')
		this.query = this.$root.$mp.query
		if (this.query == null || this.query.albumId == null) {
			this.query = { albumId: 24 }
        }
		this.search();
		this.initMusic();
    },
    onHide(){
		console.log('choicemusic hide')
    },
    onUnload(){
		console.log('choicemusic onUnload')
		this.ending();
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
