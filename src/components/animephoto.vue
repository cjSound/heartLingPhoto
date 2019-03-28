<template>
    <div class="animephoto">
        <div class="listitem" v-for="(item,index) in list" :key="index">
            <img :src="item.photoUrl" alt="">
        </div>
    </div>
</template>

<script>
import { URL,FILE_URL } from '@/config/service.js'

export default {
    props:{
        list:{
            type:Array
        }
    },
    mounted(){
        console.log(FILE_URL)
    }
}
</script>

<style>

</style>
