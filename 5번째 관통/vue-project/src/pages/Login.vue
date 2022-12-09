<template>
  <div
    class="section section-login"
    style="background-image: url('img/bg11.jpg')"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Login</h3>
          </template>

          <div class="row" data-v-16c55344="">
            <div class="col-12" data-v-16c55344="">
              <div class="form-group no-border form-control-lg input-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <i
                      class="input-group-text now-ui-icons users_circle-08"
                    ></i>
                  </div>
                  <input
                    v-model="userid"
                    aria-describedby="addon-right addon-left"
                    placeholder="First Name..."
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="col-12" data-v-16c55344="">
              <div class="form-group no-border form-control-lg input-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <i
                      class="input-group-text now-ui-icons text_caps-small"
                    ></i>
                  </div>
                  <input
                    v-model="userpw"
                    aria-describedby="addon-right addon-left"
                    placeholder="Last Name..."
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg" @click="loginFunc"
              >로그인</n-button
            >
          </div>
        </card>
      </div>
      <div class="col text-center">
        <router-link
          to="/login"
          class="btn btn-simple btn-round btn-white btn-lg"
        >
          View Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button } from "@/components";

export default {
  name: "login",
  bodyClass: "index-page",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      userid: null,
      userpw: null,
    };
  },
  methods: {
    loginFunc() {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "get",
        `http://localhost//login?id=${this.userid}&pw=${this.userpw}`,
        false
      );
      xhr.send(null);
      if (xhr.status != 200) {
        alert("아이디나 비밀번호가 틀렸습니다.");
        // this.gugun = []
        return;
      } else {
        alert("로그인 되었습니다.");
        sessionStorage.setItem("accessToken", xhr.responseText);
        console.log(sessionStorage.getItem("accessToken"));
        console.log("userid");
        // sessionStorage.setItem("mem", userid);
        this.$router.replace("/");
        window.location.reload()
      }

      // sessionStorage.removeItem("accesToken")
    },
  },
};
</script>
<style></style>
