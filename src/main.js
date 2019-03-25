import Vue from 'vue'
import App from './App'
import fly from './config/getData'
import wxfly from 'flyio/dist/npm/wx'
Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$fly = fly;


const app = new Vue(App)
app.$mount()
