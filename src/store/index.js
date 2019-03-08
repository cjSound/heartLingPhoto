import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './tabbar/tabbar.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tabbar: tabbar,
  }
})

export default store
