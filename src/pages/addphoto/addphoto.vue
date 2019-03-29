<template>
    <div class="addphoto">
        <img class="full-background" :src="templeate.photourl" alt="">
        <animephoto :list ="photoList"></animephoto>
    </div>
</template>

<script>

import {hasLogin ,animaEvent} from '@/utils/index'
import { URL,FILE_URL } from '@/config/service.js'
import store from '@/store'
import animephoto from '@/components/animephoto'


export default {
    computed: {
        photoList() {
            return store.state.photo.photoList
        }
    },
    components:{
        animephoto
    },
    data(){
        return {
            openPhoto:{},
            photoList:[],
            templeate:{}
        }
    },
    methods:{

    },
    onShow(){
        this.openPhoto =mpvue.getStorageSync("openPhoto");
        var list= mpvue.getStorageSync("photoList");
        this.templeate  = mpvue.getStorageSync("templeate")[this.openPhoto.templateId];
        console.log(this.templeate);
        if(list instanceof Array){
            list.forEach(element => {
                element.photoUrl =FILE_URL+element.photoUrl
            });
            this.photoList =list;
        }
        
        console.log(33,this.photoList)
    }
}
</script>

<style lang="less">
@import "./../../style/animations.css";
.addphoto{
    position: relative;
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
