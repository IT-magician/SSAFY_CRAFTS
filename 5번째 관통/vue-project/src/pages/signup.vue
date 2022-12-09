<template>
  <div
    class="section section-login"
    style="background-image: url('img/bg11.jpg')"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
          </template>
          <template>
            <fg-input
              v-model="userid"
              class="no-border"
              placeholder="아이디..."
              addon-left-icon="now-ui-icons users_circle-08"
            >
            </fg-input>

            <fg-input
              v-model="userpw"
              class="no-border"
              placeholder="비밀번호..."
              addon-left-icon="now-ui-icons ui-1_lock-circle-open"
            >
            </fg-input>

            <fg-input
              v-model="username"
              class="no-border"
              placeholder="이름..."
              addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

            <fg-input
              v-model="useradr"
              class="no-border"
              placeholder="주소..."
              addon-left-icon="now-ui-icons business_bank"
            >
            </fg-input>
          </template>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg" @click="joinFunc"
              >회원 가입</n-button
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
  name: "signup",
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
      username: null,
      useradr: null,
    };
  },
  methods: {
    joinFunc() {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "get",
        `http://localhost//members/join?id=${this.userid}&pw=${this.userpw}&name=${this.username}&adr=${this.useradr}`,
        false
      );

      xhr.send(null);
      console.log(xhr.status, xhr.responseText);
      if (xhr.status == 503) {
        alert("회원정보가 이미 존재합니다.");
        return;
      } else if (xhr.status == 200) {
        alert("정상적으로 가입이되었습니다.");
        this.$router.push("/");
      } else {
        alert("회원가입이 실패했습니다.");
        this.$router.push("/");
      }
    },
  },
};
</script>
<style></style>
