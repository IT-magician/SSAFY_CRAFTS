<template>
  <div
    class="section section-login"
    style="background-image: url('img/bg11.jpg')"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Update</h3>
          </template>
          <template>
            <fg-input
              v-model="userid"
              class="no-border"
              placeholder="아이디..."
              addon-left-icon="now-ui-icons users_circle-08"
              disabled
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
            <n-button type="neutral" round size="lg" @click="updateFunc"
              >회원 수정</n-button
            >
          </div>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg" @click="deleteFunc"
              >회원 삭제</n-button
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
  created(){
    
    try {
            
            let accessToken = sessionStorage.getItem("accessToken")
            accessToken = JSON.parse(accessToken)
            

            
            this.userid= accessToken.mem.id,
            this.userpw = accessToken.mem.pw,
      this.username= accessToken.mem.name,
      this.useradr= accessToken.mem.adr

      // console.log(accessToken.mem)
            } catch (error) {
                
            }
  },
  methods: {
    updateFunc() {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "post",
        `http://localhost//members/update?id=${this.userid}&pw=${this.userpw}&name=${this.username}&adr=${this.useradr}`,
        false
      );
      xhr.send(null);
      console.log(xhr.status);
      if (xhr.status == 200) {
        alert("수정 성공!");
        this.$router.push("/");
      } else {
        alert("수정 실패!");
        return;
      }
    },
    deleteFunc() {
      console.log("삭제 클릭");
      let xhr = new XMLHttpRequest();
      xhr.open("post", `http://localhost//members/delete?id=${this.userid}`, false);
      xhr.send(null);
      console.log(xhr.status);
      if (xhr.status == 200) {
        alert("정상적으로 삭제되었습니다.");
        sessionStorage.removeItem("accessToken")
        this.$router.push("/");
        window.location.reload()
      } else {
        alert("삭제 실패!");
        return;
      }
    },
  },
};
</script>
<style></style>
