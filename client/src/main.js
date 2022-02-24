import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import vuetify from "./plugins/vuetify";
import moment from 'moment'

Vue.config.productionTip = false;
Vue.prototype.moment = moment
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
