<template>
    <div class="animephoto">
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
        }
    },
    data(){
        return {
            photoList:[]
        }
    },
    methods:{
        initLoop(){
            var index=0;
            setInterval(()=>{
                var prev =index-1>=0?index-1:this.photoList.length-1;
                this.photoList[index].show='pt-page-current';
                this.photoList[prev].show='';
                this.photoList[index].inClass='animated leftswing';
                this.photoList[prev].inClass='';
                index =index+1>=this.photoList.length?0:  ++index;
            },3000)
        }
    },
    mounted(){
        this.list.forEach(element => {
            this.photoList.push({
                photoUrl:element.photoUrl,
                show:'',
                inClass:'',
                choiceClass:''
            })
        });
        this.initLoop();
        console.log(32)
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
