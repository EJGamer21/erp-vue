/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '../style.css'
import { loadProgressBar } from 'axios-progress-bar'

loadProgressBar()

Vue.use(Buefy)
Vue.use(VueSession, { persist: true })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
