import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './tabbar/tabbar.js'
import photo from './tabbar/photo.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tabbar: tabbar,
    photo:photo
  }
})

export default store
