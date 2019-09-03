import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "../public/style.css";
import { loadProgressBar } from "axios-progress-bar";
import Toastr from "vue2-toastr";
import "vue2-toastr/dist/css/vue2-toastr.css";
import { toastConfigs } from "./mixins/mixin";

loadProgressBar();

Vue.config.productionTip = false;

Vue.use(Toastr, toastConfigs);

new Vue({
    render: h => h(App)
}).$mount("#app");
