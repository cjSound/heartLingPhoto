<template>
  <section class="dl-tabbar">
        <div class="tabbar-item">
            <div class="icon">2</div>
            <div class="name">推荐</div>
        </div>
        <div class="tabbar-item">
            <div class="icon">1</div>
            <div class="name">推荐</div>
        </div>
        <div class="tabbar-item">
            <div class="icon">3</div>
            <div class="name">推荐</div>
        </div>
  </section>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="less">
.dl-tabbar {
    display: flex;
    width: 100%;
    height: 50px;
    background: #ffffff;
    left: 0;
    bottom: 0;
    .tabbar-item{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
}
</style>
