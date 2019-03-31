<template>
    <div class="addphoto">
        <span class="backinfo iconfont icon-25" @click="back">返回</span>
        <img class="full-background" :src="templeate.photourl" alt="">
        <animephoto v-if="photoList.length>0"  :musicUrl="musicUrl" :list ="photoList"></animephoto>
    </div>
</template>

<script>

import {hasLogin ,orderListPromise} from '@/utils/index'
import { URL,FILE_URL } from '@/config/service.js'
import store from '@/store'
import animephoto from '@/components/animephoto'


export default {
    components:{
        animephoto
    },
    data(){
        return {
            photoList:[],
            templeateList:[],
            templeate:{},
            query :{},
        }
    },
    methods:{
        back(){
            mpvue.navigateBack({delta:1})
        },
        init(){
            this.templeateList = mpvue.getStorageSync("templeate");

            //获取相册的基本信息
            this.$fly.request({
                method: 'get',
                url: 'photo/getphotobyid',
                body: {
                    blumId:this.query.albumId
                }
            }).then(res=>{
                this.photodata =res.data;
                this.musicUrl ="https://music.163.com/song/media/outer/url?id="+this.photodata.music.id+".mp3";
                this.templeate =this.templeateList[this.photodata.templateId];
            });
            
            //获取相册里面的所以的图片
            this.$fly.request({
                method: 'get',  
                url: 'photo/photo/bluminfo',
                body: {
                    blumId:this.query.albumId
                }
            }).then(res=>{
                var list  =res.data;
                if(list instanceof Array){
                    list.forEach(element => {
                        element.photoUrl =FILE_URL+element.photoUrl
                    });
                    this.photoList =list;
                }
            });
        },
        initHistory(){
            this.$fly.request({
                method: 'post',  
                url: 'photo/look/history',
                body: {
                    albumId:this.query.albumId
                }
            })
        }
    },
    onShow(){
        console.log('addphoto show ' )
        this.query =this.$root.$mp.query;
        this.init();
        this.initHistory();
    },
    onHide(){
        this.photoList =[];
        this.templeate ={};
        
    },
    onUnload(){
        this.photoList =[];
        this.templeate ={};
    }
}
</script>

<style lang="less">
@import "./../../style/animations.css";
.addphoto{
    position: relative;
    .backinfo{
        color:#ffffff;
        background:#5b6470;
        border-radius:20rpx;
        position:fixed;
        top:6vh;
        z-index:2;
        padding:4rpx 20rpx;
        font-size:32rpx;
        opacity:0.5;
        left:2vw;

    }
    .full-background{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        width:100vw;
        height:100vh;
        opacity: 0.5;
    }
}
</style>
