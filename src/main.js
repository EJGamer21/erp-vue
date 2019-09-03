import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from 'bootstrap-vue';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "../public/style.css";
import { loadProgressBar } from "axios-progress-bar";
import Toastr from "vue2-toastr";
import "vue2-toastr/dist/css/vue2-toastr.css";
import { toastConfigs } from "./mixins/mixin";

loadProgressBar();

Vue.use(BootstrapVue);
Vue.use(Toastr, toastConfigs);

Vue.config.productionTip = false;
new Vue({
    render: h => h(App)
}).$mount("#app");
