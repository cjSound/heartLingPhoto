<template>
  <div class="pageinfo" >
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
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
    }
  },
  onShow(){
    store.commit('setTabIndex','1');
  },
  created () {
  }
}
</script>

<style >

</style>
