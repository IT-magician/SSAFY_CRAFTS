import Index from "./pages/index.js";
import Login from "./pages/components/LoginComponent.js";
import AccountInfo from "./pages/components/AccountInfoComponent.js";
import account from "./pages/account.js";
import portal from "./pages/portal.js";
import explore from "./pages/components/explore.js";
import house from "./pages/components/house.js";
import BoardList from "./pages/components/board_list.js";
import BoardListHouse from "./pages/components/board_list_house.js";
import BoardListExplore from "./pages/components/board_list_explore.js";
import BoardWriter from './pages/components/board_writer.js';
import BoardViewer from './pages/components/board_viewer.js'
import BoardUpdater from './pages/components/board_update.js'
import home from "./pages/components/home.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/index.html",
      meta: { requiresAuth: false /*msg:*/ },
      components: { default: Index },
    },
    {
      path: "/",
      meta: { requiresAuth: false /*msg:*/ },
      components: { default: Index },
    },

    {
      path: "/account",
      component: account,
      children: [
        {
          path: "/account/login",
          meta: { requiresAuth: false /*msg:*/ },
          component: Login,
        },
        {
          path: "/account/info/:userID",
          meta: { requiresAuth: true /*msg:*/ },
          component:  AccountInfo,
        },
      ]

    },


    {
      path: "/portal",
      meta: { requiresAuth: true /*msg:*/ },
      component: portal,
      children: [
        {
          path: "/portal/home",
          meta: { requiresAuth: true /*msg:*/ },
          component: home,
        },
        {
          path: "/portal/explore",
          meta: { requiresAuth: true /*msg:*/ },
          component: explore,
        },
        {
          path: "/portal/house",
          component: house,
        },
        {
          path: "/portal/board/list/all",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardList,
        },
        {
          path: "/portal/board/list/house",
          component: BoardListHouse,
        },
        {
          path: "/portal/board/list/explore",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardListExplore,
        },
        {
          path: "/portal/board/list/house",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardListHouse,
        },
        {
          path: "/portal/board/writer/:service_name/:service_item_id",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardWriter,
        },
        {
          path: "/portal/board/viewer/:article_id",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardViewer,
        },
        {
          path: "/portal/board/updater/:article_id",
          meta: { requiresAuth: true /*msg:*/ },
          component: BoardUpdater,
        },
      ],
    },
  ],
});

router.beforeEach(function (to, from, next) {
//   const auth = sessionStorage.getItem("auth")
console.log(sessionStorage.getItem("auth"))
  if (to.meta.requiresAuth && !sessionStorage.getItem("auth")){

    alert("로그인이 필요합니다.")
    next("/account/login")
  }
  else
    next()
});


export default router
