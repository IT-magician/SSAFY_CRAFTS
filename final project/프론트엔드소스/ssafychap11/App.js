import listhrm from "./components/listhrm.js";
import idhrm from "./components/idhrm.js";
import namehrm from "./components/namehrm.js";
import addhrm from "./components/addhrm.js";
import detailhrm from "./components/detailhrm.js";

// const routes = [
//     { path: '/route1', component: listhrm },
//     { path: '/route2', component: idhrm },
//     { path: '/route3', component: namehrm },
//     { path: '/route4', component: addhrm }
//     ,{ path: '/router5/:id', name:'router5', component: detailhrm, props:true }
// ];

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   redirect: listhrm,
    // },
    {
      path: "/route1",
      name: "listhrm",
      component: listhrm,
    },
    {
      path: "/route2",
      component: idhrm,
    },
    {
      path: "/route3",
      component: namehrm,
    },
    {
      path: "/route4",
      component: addhrm,
    },
    {
      path: "/router5/:id",
      name: "router5",
      component: detailhrm,
      props: true,
    },
  ],
});
