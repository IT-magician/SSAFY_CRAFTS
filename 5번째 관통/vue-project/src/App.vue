<template>
  <div id="app">
    <user-favor></user-favor>

    <!-- <router-view name="header" /> -->
    <main-navbar :colorOnScroll = "0"></main-navbar>








    <div class="wrapper">
      <router-view />
    </div>










    <main-footer :backgroundColor = "'black'"></main-footer>
    <!-- <router-view name="footer" /> -->
  </div>
</template>
<script>
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import UserFavor from './pages/UserFavor.vue'

export default {
  name:"app",
  components: {
    MainNavbar,
    MainFooter,
    UserFavor,
  },

  created(){
  }
};
</script>
