// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import '../style.css'
import { loadProgressBar } from 'axios-progress-bar'
import Toastr from 'vue2-toastr'
import 'vue2-toastr/dist/css/vue2-toastr.css'
import { toastConfigs } from './mixins/mixin'

loadProgressBar()

Vue.use(Toastr, toastConfigs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
