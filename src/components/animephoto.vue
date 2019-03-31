<template>
    <div class="animephoto">
        <span class="photonum">{{photoIndex}}/{{photoList.length}}</span>
        <span class="iconfont icon-Music music" @click="stopMusic" :style="{'transform':'rotate('+rotate+'deg)'}"></span>
        <img class="listitem" :class="[item.show,item.inClass]"
            :src="item.photoUrl" alt="" v-for="(item,index) in photoList" :key="index">
            {{index}}
        </img>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array
        },
        musicUrl:{
            type:String
        }
    },
    data(){
        return {
            photoList:[],
            photoInterval:'',
            photoIndex:'',
            audioContext:'',
            rotate:10,
            rotateInterval:''
        }
    },
    watch:{
        list:{
            handler:function(newVal,oldVal){
                this.init();
            },
            deep:true
        },
        musicUrl:function(){
            this.addMusciWork();
        }
    },
    methods:{
        stopMusic(){
            if(this.audioContext.paused){
                this.audioContext.play();
            }else{
                this.audioContext.pause();
                clearInterval(this.rotateInterval);
            }
            
        },
        initMusic(){
            this.audioContext  =this.audioContext ==''? mpvue.createInnerAudioContext():this.audioContext;
            this.audioContext.autoplay = true
            this.audioContext.loop =true;
            this.audioContext.src =this.musicUrl;
            this.audioContext.onPlay(() => {
                console.log("kaishi 播放")
                this.rotateInterval =setInterval(()=>{
                    this.rotate +=10;
                },100)
            })
            this.audioContext.onError((res) => {
                mpvue.showToast({
					title: '音乐资源缺失，请重新选择',
					icon: 'none',
					duration: 2000
				})
            })
        },
        addMusciWork(){
            this.audioContext.src =this.musicUrl;
        },
        initLoop(){
            var index=0;
            function prevNext(){
                var prev =index-1>=0?index-1:this.photoList.length-1;
                this.photoList[index].show='pt-page-current';
                this.photoList[prev].show='';
                this.photoList[index].inClass=this.photoList[index].choiceClass;
                this.photoList[prev].inClass='';
                index =index+1>=this.photoList.length?0:  ++index;
                this.photoIndex =index+1;
            }
            prevNext.call(this);
            this.photoInterval =setInterval(prevNext.bind(this),3000)
        },
        init(){
            this.photoList=[];
            this.list.forEach(element => {
                this.photoList.push({
                    photoUrl:element.photoUrl,
                    show:'',
                    inClass:'',
                    choiceClass:element.type
                })
            });
            this.initLoop();
        },
        ending(){
            clearInterval(this.photoInterval);
            clearInterval(this.rotateInterval);
            if(this.audioContext!=''){
                this.audioContext.destroy();
            }
        }
    },
    mounted(){
        this.init();
        this.initMusic();
    },
    onHide(){
        this.ending();
    },
    onUnload(){
        this.ending();
    },
    onShow(){
        
    }
}
</script>

<style lang="less">
.animephoto{
    text-align: center;
    width: 100vw;
    height: 100vh;
    position: relative;
    .music{
        position:absolute;
        right:6vw;
        top:11vh;
        z-index:3;
        background:#425d6a;
        color:#fff;
        border-radius:100rpx;
        padding:10rpx;
        border:3rpx solid #fff;

    }
    .photonum{
        position:absolute;
        top:3vh;
        z-index:2;
        color:#fff; 
    }
    image{
        width:94vw;
        height:94vh;
        border-radius: 10px;
        position: absolute;
        top: 3vh;
        left: 3vw;
        visibility: hidden;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
        transform-style: preserve-3d;
    }
    .pt-page-current{
        visibility: visible;
		z-index: 1;
    }
}
  
</style>
