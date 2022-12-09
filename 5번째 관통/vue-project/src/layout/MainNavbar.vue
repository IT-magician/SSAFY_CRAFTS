<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <router-link v-popover:popover1 class="navbar-brand" to="/">
      <h3>W-I-M-H</h3>
    </router-link>
    <template slot="navbar-menu" v-if="!checkLogin()">
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">Where Is My Home</div>
      </el-popover>
      <drop-down
        tag="li"
        title="로그인 및 회원가입"
        icon="now-ui-icons design_image"
        class="nav-item"
      >
        <!-- 회원가입 -->
        <nav-link to="/signup">
          <i class="now-ui-icons users_circle-08"></i> 회원가입
        </nav-link>

        <!-- 로그인 -->
        <nav-link to="/login">
          <!-- v-if="checkLogin()" -->
          <i class="now-ui-icons users_circle-08"></i> 로그인
        </nav-link>
        <!-- <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link> -->
      </drop-down>
    </template>

    <template slot="navbar-menu" v-if="checkLogin()">
      <!--   로그인 됨!!!   -->
      <!-- <template><h5>님 환영합니다.</h5></template> -->

      <div style="display:flex;justify-content:space-evenly;align-items: center;padding: 5px;transform: translateY(-10px);">
        
      <drop-down
        tag="li"
        title="회원정보 관리"
        icon="now-ui-icons design_image"
      >

      <nav-link>
        
        <label for="opener3" to="/profile">
          <i class="now-ui-icons users_single-02"></i> 사용자 선호 아파트 정보
        </label>
      </nav-link>
      </drop-down>

      <router-link to="/signupdate" class="nav-item">
        <i class="now-ui-icons users_circle-08"></i> 회원정보 수정
      </router-link>

      <button type="button" class="btn btn-neutral" @click="logoutFunc">
          로그아웃
      </button>
      </div>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",
  data() {
    return {
      userid: sessionStorage.getItem("mem"),
    };
  },
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
  methods: {
    checkLogin() {
      // console.log("here");
      // console.log(sessionStorage.getItem("accessToken"));
      // console.log(sessionStorage.getItem("mem"));
      return sessionStorage.getItem("accessToken");
    },

    logoutFunc() {
      let xhr = new XMLHttpRequest();
      xhr.open("get", `http://localhost//logout`, false);
      xhr.send(null);
      // console.log(xhr.status, xhr.responseText);
      if (xhr.status != 200) {
        console.log("로그아웃 실패");
        alert("로그아웃 실패");
        // this.gugun = []
        return;
      } else {
        console.log("로그아웃 성공");
        alert("정상적으로 로그아웃 되었습니다.");
        sessionStorage.removeItem("accessToken");
        this.$router.go();
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped></style>
