<template>
  <div class="pageinfo" >
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
    <card></card>
    <ptabbar> </ptabbar>
     
  </div>
</template>

<script>
import ptabbar from '@/components/ptabbar'
import card from '@/components/card'
import store from '@/store'

export default {
  data () {
    return {
      name:'aa'
    }
  },

  components: {
    ptabbar,card
  },
 
  methods: {
    onChange(event) {
      this.active= event.mp.detail;
      
    },
    tchange(ev){
      // this.inputvalue=ev.mp.detail;
      console.log(2,ev.mp,this.active);
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHadndle:', ev,mpvue)
      // throw {message: 'custom test'}
    }
  },
  onShow(){
    store.commit('setTabIndex','1');
  },
  mounted(){
    this.$fly.request({
        method:"post", //post/get 请求方式
        url:"http://localhost:8099/user/test",
        body:{
          wxname:'发盛世嫡妃'
        }
      }).then(res =>{
        console.log(res)
    })
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
</style>
