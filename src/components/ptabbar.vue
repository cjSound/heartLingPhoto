<template>
  <div>
    <div class="tabbar-full"> &nbsp</div>
    <div class="dl-tabbar">
      <div class="tabbar-item"
           :class="{'active':tabIndex=='1'}"
           @click="goto('/pages/index/main','1')">
        <div class="iconfont icon-cherry"></div>
        <div class="name">推荐</div>
      </div>
      <div class="tabbar-item"
           :class="{'active':tabIndex=='2'}"
           @click="goto('/pages/photo/main','2')">
        <div class="iconfont icon-watermelon"></div>
        <div class="name">相册</div>
      </div>
      <div class="tabbar-item"
           :class="{'active':tabIndex=='3'}"
           @click="goto('/pages/pinfo/main','3')">
        <div class="iconfont icon-plum"></div>
        <div class="name">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from './../store'

export default {
  computed: {
    tabIndex() {
      return store.state.tabbar.tabIndex
    }
  },
  data() {
    return {
      index: ''
    }
  },
  methods: {
    goto(url, index) {
      if (this.tabIndex != index) {
        mpvue.redirectTo({ url })
      }
      store.commit('setTabIndex', index)
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="less">
.tabbar-full {
  height: 50px;
}
.dl-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 50px;
  color: #7d7e80;
  background: #fff;
  border: 0 solid #ebedf0;

  .active {
    color: #02cfbe;
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
</style>
