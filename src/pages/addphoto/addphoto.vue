<template>
    <div class="addphoto">
        <span class="backinfo iconfont icon-25" @click="back">返回</span>
        <img class="full-background" :src="templeate.photourl" alt="">
        <animephoto v-if="photoList.length>0" :list ="photoList"></animephoto>
        <div class="photo-tabbar">
            <div class="full"></div>
            <div class="tabbar-item"
                @click="goto('/pages/index/main','1')">
                <div class="iconfont icon-grape"></div>
                <div class="name">换背景</div>
            </div>
            <div class="tabbar-item"
                @click="addMusic">
                <div class="iconfont icon-Music"></div>
                <div class="name">选音乐</div>
            </div>
            <div class="tabbar-item"
                @click="addNewPhoto">
                <div class="iconfont icon-pic"></div>
                <div class="name">加照片</div>
            </div>
            <div class="tabbar-item"
                @click="goto('/pages/pinfo/main','3')">
                <div class="iconfont icon-Font-Szie"></div>
                <div class="name">加文字</div>
            </div>
        </div>
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
            templeate:{},
            query :{}
        }
    },
    methods:{
        addMusic(){
            
        },
        /**
         * 继续添加照片
         */
        addNewPhoto(){
            var _this =this;
            wx.chooseImage({
                success(res) {
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
                            albumId:_this.photodata.albumId,
                            wuid:_this.photodata.userId
                        },
                        success(res) {
                            let msg =JSON.parse(res.data);
                            result.push(msg.data[0]);
                            resolve();
                        }
                    })
                    },function(){
                        result.forEach(element => {
                            element.photoUrl =FILE_URL+element.photoUrl
                        });
                        _this.photoList=_this.photoList.concat(result);
                        mpvue.hideLoading();
                    })
                }
            })
        },
        back(){
            mpvue.navigateBack({delta:1})
        },
        init(){
            this.$fly.request({
                method: 'get',  
                url: 'photo/getphotobyid',
                body: {
                    blumId:this.query.albumId
                }
            }).then(res=>{
                this.photodata =res.data
                this.templeate  = mpvue.getStorageSync("templeate")[this.photodata.templateId];
            });
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
        console.log('addphoto show ',this.lock)
        this.query =this.$root.$mp.query;
        if(this.query ==null || this.query.albumId==null){
            this.query ={albumId:24}
        }
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
    .photo-tabbar {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 50px;
        color: #fff;
        border: 0 solid #ebedf0;
        z-index: 2;
        .full{
            width: 100%;
            height: 100%;
            background: #000;
            position: absolute;
            opacity: 0.4;
            z-index: -1;
            border-radius:20rpx;
            box-shadow: 1rpx 10rpx 10rpx #000;
        }
        .tabbar-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            .name {
                font-size: 28rpx;
            }
        }
        }
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
