import Vue from 'vue'
import App from './App'
import fly from './config/getData'


Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$fly = fly;
if(mpvuePlatform=='wx'){
    Vue.prototype.lapp = wx;
}

const app = new Vue(App)
app.$mount()
