<template>
    <div class="addphoto">
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
            photoList:[]
        }
    },
    methods:{

    },
    onShow(){
        this.openPhoto =mpvue.getStorageSync("openPhoto");
        var list= mpvue.getStorageSync("photoList");
        list.forEach(element => {
            element.photoUrl =FILE_URL+element.photoUrl
        });
        this.photoList =list;
        console.log(33,this.photoList)
    }
}
</script>

<style lang="less">
.addphoto{

}
</style>
