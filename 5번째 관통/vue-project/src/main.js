/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App.vue";
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from "./router";
import NowUiKit from "./plugins/now-ui-kit";

Vue.config.productionTip = false;

Vue.use(NowUiKit);

router.beforeEach(function (to, _, next) {console.log(sessionStorage.getItem("accessToken"))
  const access_token = sessionStorage.getItem("accessToken");

  if (!access_token) {
    if (to.meta.requiresAuth) {
      if (to.meta.msg)
        alert(to.meta.msg)
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }

});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
