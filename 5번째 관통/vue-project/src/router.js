import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import signup from "./pages/signup.vue";
import signupdate from "./pages/signupdate.vue";
import Login from "./pages/Login.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index /*header: MainNavbar, footer: MainFooter*/ },
      // props: {
      //   header: { colorOnScroll: 10 },
      //   footer: { backgroundColor: 'black' }
      // }
      meta: { requiresAuth: true /*msg:*/ },
    },

    {
      path: "/login",
      name: "login",
      components: { default: Login },
      meta: { requiresAuth: false },
    },

    {
      path: "/signup",
      name: "signup",
      components: { default: signup },
    },

    {
      path: "/signupdate",
      name: "signupdate",
      components: { default: signupdate },
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
