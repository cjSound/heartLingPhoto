<template>
  <div>
    <p class="card">
      22222
    </p>
  </div>
</template>

<script>
import store from './../store'

export default {
  computed: {
    tabIndex () {
        return store.state.tabbar.tabIndex
    }
  },
  mounted(){
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
